import { Router, type IRouter } from "express";

const router: IRouter = Router();
const FEED_URL = "https://www.visitthewoodlands.com/event/rss/";
const CACHE_TTL_MS = 15 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8_000;
const MAX_EVENTS = 24;

export type CalendarEvent = {
  id: string;
  title: string;
  url: string;
  date: string;
  categories: string[];
  summary: string | null;
};

type EventCache = {
  events: CalendarEvent[];
  fetchedAt: string;
  expiresAt: number;
};

let cache: EventCache | null = null;
let refreshPromise: Promise<EventCache> | null = null;

function decodeEntities(value: string): string {
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, code: string) => {
    if (code.startsWith("#x")) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return named[code.toLowerCase()] ?? entity;
  });
}

function unwrap(value: string): string {
  return decodeEntities(value.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "").trim());
}

function tagValue(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? unwrap(match[1]) : null;
}

function plainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function centralDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function parseEventsRss(xml: string, now = new Date()): CalendarEvent[] {
  const today = centralDate(now);
  const latest = new Date(now.getTime() + 62 * 24 * 60 * 60 * 1000);
  const latestDate = centralDate(latest);

  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map((match): CalendarEvent | null => {
      const item = match[1];
      const title = tagValue(item, "title");
      const url = tagValue(item, "link");
      const published = tagValue(item, "pubDate");
      if (!title || !url || !published || !url.startsWith("https://www.visitthewoodlands.com/event/")) return null;

      const parsedDate = new Date(published);
      if (Number.isNaN(parsedDate.getTime())) return null;
      const date = centralDate(parsedDate);
      if (date < today || date > latestDate) return null;

      const categories = [...item.matchAll(/<category(?:\s[^>]*)?>([\s\S]*?)<\/category>/gi)]
        .map((category) => unwrap(category[1]).trim())
        .filter(Boolean)
        .slice(0, 4);
      const description = tagValue(item, "description");
      const summary = description
        ? plainText(description)
            .replace(/^.*?\d{2}\/\d{2}\/\d{4}(?:\s+to\s+\d{2}\/\d{2}\/\d{4})?\s*-\s*/i, "")
            .slice(0, 220)
        : "";

      return {
        id: url,
        title: plainText(title),
        url,
        date,
        categories,
        summary: summary || null,
      };
    })
    .filter((event): event is CalendarEvent => event !== null)
    .filter((event, index, events) => events.findIndex((candidate) => candidate.id === event.id && candidate.date === event.date) === index)
    .slice(0, MAX_EVENTS);
}

async function refreshEvents(): Promise<EventCache> {
  const response = await fetch(FEED_URL, {
    headers: {
      Accept: "application/rss+xml, application/xml;q=0.9",
      "User-Agent": "JoshWisdomRealtor.com event calendar/1.0",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) throw new Error(`Calendar feed returned ${response.status}`);
  const events = parseEventsRss(await response.text());
  if (events.length === 0) throw new Error("Calendar feed returned no current events");

  const fetchedAt = new Date().toISOString();
  cache = { events, fetchedAt, expiresAt: Date.now() + CACHE_TTL_MS };
  return cache;
}

function getFreshEvents(): Promise<EventCache> {
  if (cache && cache.expiresAt > Date.now()) return Promise.resolve(cache);
  if (!refreshPromise) {
    refreshPromise = refreshEvents().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

router.get("/events", async (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=900");
  try {
    const result = await getFreshEvents();
    res.json({ ...result, source: "Visit The Woodlands" });
  } catch (error) {
    if (cache) {
      req.log.warn({ err: error }, "calendar refresh failed; serving cached events");
      res.setHeader("Warning", '110 - "Calendar feed response is stale"');
      res.json({ ...cache, source: "Visit The Woodlands", stale: true });
      return;
    }
    req.log.error({ err: error }, "calendar refresh failed");
    res.status(503).json({ error: "The live calendar is temporarily unavailable." });
  }
});

export default router;
