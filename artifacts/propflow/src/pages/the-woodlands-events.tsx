import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { getGetEventsQueryKey, useGetEvents, type CalendarEvent } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { ArrowRight, CalendarDays, ExternalLink, Home, MapPin, Music, RefreshCw, Sparkles, TreePine } from "lucide-react";
import { absoluteUrl } from "@/config/site";

const sources = [
  { title: "Visit The Woodlands Events", description: "The live feed used on this page, published by the official local tourism organization.", url: "https://www.visitthewoodlands.com/events/" },
  { title: "The Woodlands Township Calendar", description: "Township meetings, parks programs, festivals, markets, and public activities.", url: "https://www.thewoodlandstownship-tx.gov/Events-directory" },
  { title: "Cynthia Woods Mitchell Pavilion", description: "The official schedule for concerts, symphony performances, and performing arts events.", url: "https://www.woodlandscenter.org/events" },
  { title: "Market Street Events", description: "Live music, seasonal programming, and gatherings at Market Street.", url: "https://shopatmarketstreet.com/whats-happening/events/" },
  { title: "Woodlands Online Events", description: "A broad local calendar covering classes, family events, entertainment, and business gatherings.", url: "https://www.woodlandsonline.com/evps/" },
  { title: "Hello Woodlands Calendar", description: "Community event coverage across The Woodlands and Montgomery County.", url: "https://hellowoodlands.com/calendar/" },
] as const;

const lifestyleCategories = [
  ["Pavilion nights", "Major tours, free performing arts, and symphony events make Town Center a strong live-entertainment anchor.", Music],
  ["Market Street & Waterway", "Dining, patios, shopping, walkability, and public programming shape the Town Center lifestyle.", Sparkles],
  ["Parks & community", "Trails, pools, markets, parks, and Township programming are part of daily life across the villages.", TreePine],
  ["Relocation weekends", "A current local calendar helps visiting buyers test-drive the area instead of seeing only houses.", Home],
] as const;

type Filter = "all" | "today" | "weekend" | "pavilion";

function centralDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function addDays(dateKey: string, days: number): string {
  const date = new Date(`${dateKey}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function weekendRange(today: string): [string, string] {
  const day = new Date(`${today}T12:00:00Z`).getUTCDay();
  const fridayOffset = day === 6 ? -1 : day === 0 ? -2 : 5 - day;
  const friday = addDays(today, fridayOffset);
  return [friday, addDays(friday, 2)];
}

function formatEventDate(dateKey: string): { day: string; date: string } {
  const date = new Date(`${dateKey}T12:00:00Z`);
  return {
    day: new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }).format(date),
    date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(date),
  };
}

function matchesFilter(event: CalendarEvent, filter: Filter, today: string, weekend: [string, string]): boolean {
  if (filter === "today") return event.date === today;
  if (filter === "weekend") return event.date >= weekend[0] && event.date <= weekend[1];
  if (filter === "pavilion") return event.categories.some((category) => category.toLowerCase().includes("pavilion"));
  return true;
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`text-[11px] font-bold uppercase tracking-[0.3em] ${light ? "text-[#d7b56d]" : "text-[#6f4b0d]"}`}>{children}</p>;
}

export default function TheWoodlandsEvents() {
  const [filter, setFilter] = useState<Filter>("all");
  const query = useGetEvents({
    query: {
      queryKey: getGetEventsQueryKey(),
      staleTime: 5 * 60 * 1000,
      refetchInterval: 15 * 60 * 1000,
      refetchOnWindowFocus: true,
      retry: 2,
    },
  });
  const today = centralDateKey();
  const weekend = weekendRange(today);
  const events = query.data?.events ?? [];
  const visibleEvents = useMemo(
    () => events.filter((event) => matchesFilter(event, filter, today, weekend)),
    [events, filter, today, weekend[0], weekend[1]],
  );
  const updatedAt = query.data?.fetchedAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Chicago" }).format(new Date(query.data.fetchedAt))
    : null;
  const schema = query.data ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The Woodlands Events Brief",
    url: absoluteUrl("/the-woodlands-events"),
    dateModified: query.data.fetchedAt,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: query.data.events.slice(0, 12).map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "Event", name: event.title, startDate: event.date, url: event.url, eventStatus: "https://schema.org/EventScheduled" },
      })),
    },
  } : null;

  return (
    <>
      <Helmet>
        <title>The Woodlands Events | Automatically Updated Local Calendar</title>
        <meta name="description" content="An automatically refreshed Woodlands events brief sourced from the official Visit The Woodlands calendar." />
        <link rel="canonical" href={absoluteUrl("/the-woodlands-events")} />
        {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
      </Helmet>

      <section className="bg-[#050505] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <Eyebrow light>The Woodlands Events</Eyebrow>
            <h1 className="mt-7 max-w-5xl font-serif text-[clamp(3.5rem,7vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.04em]">The local brief, automatically refreshed.</h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-white/76">Current public events from the official Visit The Woodlands calendar, refreshed every 15 minutes and linked directly to the publisher.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-14 rounded-none bg-[#c69a44] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white"><a href="#upcoming"><CalendarDays className="mr-2 h-4 w-4" /> Current Events</a></Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-white/55 bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black"><a href="#sources">Source Calendars</a></Button>
            </div>
          </div>
          <div className="border border-[#c69a44]/35 bg-[#11100d] p-7" aria-live="polite">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]"><RefreshCw className={`h-4 w-4 ${query.isFetching ? "animate-spin" : ""}`} /> Live calendar status</p>
            {query.isLoading ? <p className="mt-5 text-lg leading-8 text-white/72">Checking the official calendar...</p> : query.isError ? <p className="mt-5 text-lg leading-8 text-white/72">The live feed is temporarily unavailable. Use the official source links below while it reconnects.</p> : <p className="mt-5 text-lg leading-8 text-white/72">{query.data?.stale ? "Showing the last successful update" : "Connected to Visit The Woodlands"}{updatedAt ? ` - updated ${updatedAt}` : ""}.</p>}
          </div>
        </div>
      </section>

      <section id="upcoming" className="scroll-mt-24 bg-white py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div><Eyebrow>Live Feed</Eyebrow><h2 className="mt-5 font-serif text-5xl font-semibold md:text-7xl">What is happening now.</h2></div>
            <div className="flex flex-wrap gap-2" aria-label="Filter events">
              {([['all', 'All upcoming'], ['today', 'Today'], ['weekend', 'This weekend'], ['pavilion', 'Pavilion']] as const).map(([value, label]) => (
                <button key={value} type="button" onClick={() => setFilter(value)} aria-pressed={filter === value} className={`border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition ${filter === value ? "border-black bg-black text-white" : "border-black/20 bg-white hover:border-black"}`}>{label}</button>
              ))}
            </div>
          </div>

          {query.isLoading ? (
            <div className="mt-10 border-y border-black/15 py-14 text-center text-neutral-600" role="status">Loading current events...</div>
          ) : query.isError ? (
            <div className="mt-10 border-y border-black/15 py-14 text-center"><p className="text-lg text-neutral-700">Current event records could not be loaded.</p><a href={sources[0].url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f4b0d]">Open the official calendar <ExternalLink className="ml-2 h-4 w-4" /></a></div>
          ) : visibleEvents.length === 0 ? (
            <div className="mt-10 border-y border-black/15 py-14 text-center text-neutral-700">No events match this filter. Choose another view or check the official calendar.</div>
          ) : (
            <div className="mt-10 divide-y divide-black/10 border-y border-black/15" data-testid="live-events-list">
              {visibleEvents.map((event) => {
                const formatted = formatEventDate(event.date);
                return (
                  <a key={`${event.id}-${event.date}`} href={event.url} target="_blank" rel="noopener noreferrer" className="group grid gap-4 py-7 transition hover:bg-[#f7f3ec] hover:px-5 md:grid-cols-[130px_1fr_0.7fr_auto] md:items-center">
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f4b0d]">{formatted.day}</p><p className="mt-1 font-serif text-3xl font-semibold">{formatted.date}</p></div>
                    <div><h3 className="font-serif text-2xl font-semibold">{event.title}</h3>{event.summary ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{event.summary}</p> : null}</div>
                    <p className="flex items-start gap-2 text-sm text-neutral-600"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#9b6d1d]" />{event.categories.length ? event.categories.join(" / ") : "The Woodlands"}</p>
                    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f4b0d]">Event details<ExternalLink className="ml-2 h-3.5 w-3.5" /></span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="sources" className="scroll-mt-24 bg-[#f7f3ec] py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><div><Eyebrow>Source Calendars</Eyebrow><h2 className="mt-5 font-serif text-5xl font-semibold md:text-7xl">Go to the publisher.</h2></div><p className="max-w-3xl text-lg leading-8 text-neutral-700">The event feed above refreshes from Visit The Woodlands. These additional publisher links provide the broadest local coverage and remain the authority for changes and tickets.</p></div>
          <div className="mt-12 grid gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {sources.map((source) => <a key={source.title} href={source.url} target="_blank" rel="noopener noreferrer" className="group min-h-64 bg-white p-7 transition hover:bg-black hover:text-white"><ExternalLink className="h-5 w-5 text-[#9b6d1d]" /><h3 className="mt-10 font-serif text-3xl font-semibold">{source.title}</h3><p className="mt-4 leading-7 text-neutral-600 transition group-hover:text-white/70">{source.description}</p></a>)}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0a08] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9"><Eyebrow light>Why It Matters</Eyebrow><div className="mt-10 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">{lifestyleCategories.map(([title, copy, Icon]) => <article key={title} className="bg-[#0b0a08] p-7"><Icon className="h-5 w-5 text-[#d7b56d]" /><h2 className="mt-12 font-serif text-3xl font-semibold">{title}</h2><p className="mt-5 leading-7 text-white/68">{copy}</p></article>)}</div><Button asChild variant="outline" className="mt-9 h-13 rounded-none border-white/50 bg-transparent px-7 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black"><Link href="/communities/the-woodlands">Explore The Woodlands <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
      </section>

      <section className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-start"><div><Eyebrow>Planning a Move?</Eyebrow><h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.96] md:text-7xl">Make the visit count.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">Share your timing and priorities. Josh can help organize a focused community and home-search conversation around your visit.</p></div><LeadForm leadType="relocation" showArea title="Plan a Woodlands conversation" subtitle="Tell Josh when you are visiting and what matters most." buttonText="Contact Josh" /></div>
      </section>
    </>
  );
}
