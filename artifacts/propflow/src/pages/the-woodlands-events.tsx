import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  Home,
  MapPin,
  Music,
  Sparkles,
  Ticket,
  TreePine,
} from "lucide-react";

type CuratedEvent = {
  date: string;
  day: string;
  time: string;
  title: string;
  venue: string;
  area: string;
  category: string;
  source: string;
  href: string;
  note?: string;
  featured?: boolean;
};

const sourceUrls = {
  township: "https://www.thewoodlandstownship-tx.gov/Events-directory",
  woodlandsOnline: "https://www.woodlandsonline.com/evps/",
  pavilion: "https://www.woodlandscenter.org/events",
  marketStreet: "https://shopatmarketstreet.com/whats-happening/events/",
  visit: "https://www.visitthewoodlands.com/events/",
  helloWoodlands: "https://hellowoodlands.com/calendar/",
  automotive: "https://www.woodlandsonline.com/evps/evlist2.cfm?classid=44",
};

const todaysEvents: CuratedEvent[] = [
  {
    date: "Jun 25",
    day: "Thursday",
    time: "9:00 AM - 3:00 PM",
    title: "Alley Theatre Imagination Lab Camp",
    venue: "Cynthia Woods Mitchell Pavilion",
    area: "Town Center",
    category: "Arts / Family",
    source: "The Pavilion",
    href: sourceUrls.pavilion,
    featured: true,
  },
  {
    date: "Jun 25",
    day: "Thursday",
    time: "Today",
    title: "Entwined Exhibition",
    venue: "The Woodlands Arts Council",
    area: "The Woodlands",
    category: "Arts",
    source: "Visit The Woodlands",
    href: sourceUrls.visit,
  },
  {
    date: "Jun 25",
    day: "Thursday",
    time: "Today",
    title: "Splash, Sirens and Snow Cones",
    venue: "May Valley Sprayground",
    area: "The Woodlands",
    category: "Family / Community",
    source: "The Woodlands Township",
    href: sourceUrls.township,
  },
  {
    date: "Jun 25",
    day: "Thursday",
    time: "6:00 PM",
    title: "Pop at the Pool",
    venue: "Falconwing Pool",
    area: "Indian Springs area",
    category: "Family / Pool",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
  {
    date: "Jun 25",
    day: "Thursday",
    time: "Evening",
    title: "Girls Night Out: Summer Glow Night",
    venue: "Magnolia Ritual - Texas Apothecary",
    area: "Magnolia",
    category: "Lifestyle",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
  {
    date: "Jun 25",
    day: "Thursday",
    time: "Match day",
    title: "World Cup Experience - USA vs Turkey",
    venue: "Sawyer Park Icehouse",
    area: "Spring",
    category: "Sports / Watch Party",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
];

const weekendEvents: CuratedEvent[] = [
  {
    date: "Jun 26",
    day: "Friday",
    time: "6:30 PM - 8:00 PM",
    title: "Sarah Kelly Music School Concert",
    venue: "Market Street",
    area: "Town Center",
    category: "Live Music",
    source: "Market Street",
    href: sourceUrls.marketStreet,
    featured: true,
  },
  {
    date: "Jun 26",
    day: "Friday",
    time: "Evening",
    title: "90's Night with Good Time Muffin",
    venue: "Sawyer Park Icehouse",
    area: "Spring",
    category: "Live Music",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
  {
    date: "Jun 27",
    day: "Saturday",
    time: "7:00 PM",
    title: "Hilary Duff: the lucky me tour",
    venue: "Cynthia Woods Mitchell Pavilion",
    area: "Town Center",
    category: "Concert",
    source: "The Pavilion",
    href: sourceUrls.pavilion,
    featured: true,
  },
  {
    date: "Jun 27",
    day: "Saturday",
    time: "Morning",
    title: "The Woodlands Farmers Market",
    venue: "Grogan's Mill Shopping Center",
    area: "Grogan's Mill",
    category: "Market",
    source: "The Woodlands Township",
    href: sourceUrls.township,
  },
  {
    date: "Jun 27",
    day: "Saturday",
    time: "9:00 AM - Noon",
    title: "BioBlitz BioBash",
    venue: "Rob Fleming Recreation Center",
    area: "Creekside Park",
    category: "Outdoors / Family",
    source: "The Woodlands Township",
    href: sourceUrls.township,
  },
  {
    date: "Jun 27",
    day: "Saturday",
    time: "10:00 AM",
    title: "Fairy Day 2026",
    venue: "The Woodlands Children's Museum",
    area: "Panther Creek",
    category: "Family",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
    note: "Check the source before going; some calendar entries show multiple Fairy Day times.",
  },
  {
    date: "Jun 27",
    day: "Saturday",
    time: "Midday",
    title: "Ice Cream Social & Open House at iCode",
    venue: "iCode The Woodlands",
    area: "Research Forest",
    category: "Family / Kids",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
  {
    date: "Jun 28",
    day: "Sunday",
    time: "Confirm time",
    title: "Learn To Kayak With Confidence",
    venue: "Riva Row Boat House",
    area: "The Waterway",
    category: "Outdoor Recreation",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
];

const upcomingEvents: CuratedEvent[] = [
  {
    date: "Jun 29 - Jul 2",
    day: "Mon-Thu",
    time: "All week",
    title: "Let Freedom Chalk",
    venue: "The Woodlands Township",
    area: "The Woodlands",
    category: "Seasonal / Family",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
  {
    date: "Jun 29 - Jul 3",
    day: "Mon-Fri",
    time: "Camp week",
    title: "Shark Tank: Create & Pitch Your Own Product",
    venue: "iCode The Woodlands",
    area: "Research Forest",
    category: "Kids Camp",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
  {
    date: "Jul 1",
    day: "Wednesday",
    time: "6:00 PM",
    title: "Sweet & Sour Summer Series - Watermelon Sweet",
    venue: "Township Recreation Center",
    area: "Lake Woodlands",
    category: "Family",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
  },
  {
    date: "Jul 3",
    day: "Friday",
    time: "8:00 PM",
    title: "Star-Spangled Salute",
    venue: "Cynthia Woods Mitchell Pavilion",
    area: "Town Center",
    category: "Free Symphony Show",
    source: "The Pavilion",
    href: sourceUrls.pavilion,
    featured: true,
  },
  {
    date: "Jul 4",
    day: "Saturday",
    time: "Holiday evening",
    title: "Red, Hot & Blue Festival and Fireworks Extravaganza",
    venue: "Multiple Woodlands locations",
    area: "The Woodlands",
    category: "Fourth of July",
    source: "Woodlands Online",
    href: sourceUrls.woodlandsOnline,
    featured: true,
  },
  {
    date: "Jul 4 - Jul 5",
    day: "Weekend",
    time: "Holiday weekend",
    title: "Market Street July 4th Celebration",
    venue: "Market Street",
    area: "Town Center",
    category: "Shopping / Lifestyle",
    source: "Market Street",
    href: sourceUrls.marketStreet,
  },
  {
    date: "Jul 5",
    day: "Sunday",
    time: "2:00 PM",
    title: "Outlaw Music Festival",
    venue: "Cynthia Woods Mitchell Pavilion",
    area: "Town Center",
    category: "Concert",
    source: "The Pavilion",
    href: sourceUrls.pavilion,
  },  {
    date: "Jul 5",
    day: "Sunday",
    time: "6:00 AM - 10:00 AM",
    title: "The Woodlands Cars & Coffee for a Cause",
    venue: "Market Street",
    area: "Town Center",
    category: "Cars / Coffee",
    source: "Woodlands Online",
    href: sourceUrls.automotive,
    featured: true,
  },
  {
    date: "Jul 11",
    day: "Saturday",
    time: "9:00 AM - 1:00 PM",
    title: "Car Show",
    venue: "Bespoke Auto Pros",
    area: "Magnolia",
    category: "Cars / Automotive",
    source: "Woodlands Online",
    href: "https://www.woodlandsonline.com/evps/evitem.cfm?evid=206312",
  },
  {
    date: "Aug 2",
    day: "Sunday",
    time: "6:00 AM - 10:00 AM",
    title: "The Woodlands Cars & Coffee for a Cause",
    venue: "Market Street",
    area: "Town Center",
    category: "Cars / Coffee",
    source: "Woodlands Online",
    href: sourceUrls.automotive,
  },  {
    date: "Jul 10",
    day: "Friday",
    time: "Evening",
    title: "Encanto with Live Ballet Folklorico",
    venue: "Cynthia Woods Mitchell Pavilion",
    area: "Town Center",
    category: "Free Performing Arts",
    source: "The Pavilion",
    href: sourceUrls.pavilion,
  },
  {
    date: "Jul 15",
    day: "Wednesday",
    time: "Evening",
    title: "Game On! A Symphony of Sport",
    venue: "Cynthia Woods Mitchell Pavilion",
    area: "Town Center",
    category: "Free Symphony Show",
    source: "The Pavilion",
    href: sourceUrls.pavilion,
  },
  {
    date: "Jul 18",
    day: "Saturday",
    time: "7:30 PM",
    title: "Flatland Cavalry: Work of Heart Tour",
    venue: "Cynthia Woods Mitchell Pavilion",
    area: "Town Center",
    category: "Concert",
    source: "The Pavilion",
    href: sourceUrls.pavilion,
  },
];

const allCuratedEvents = [...todaysEvents, ...weekendEvents, ...upcomingEvents];

const privateBriefEvents = [
  todaysEvents[1],
  weekendEvents[0],
  weekendEvents[2],
  upcomingEvents[3],
  upcomingEvents[4],
  upcomingEvents[6],
  upcomingEvents[8],
];

const briefFilters = [
  { label: "Private Brief", href: "#current-calendars" },
  { label: "Today", href: "#today" },
  { label: "This Weekend", href: "#this-weekend" },
  { label: "Pavilion", href: "#pavilion-events" },
  { label: "Auto", href: "#pavilion-events" },
  { label: "Full Scan", href: "#full-local-scan" },
];

const eventSources = [
  {
    title: "The Woodlands Township Calendar",
    description: "Public meetings, parks programs, neighborhood events, festivals, farmers markets, and Township-run activities.",
    url: sourceUrls.township,
  },
  {
    title: "Visit The Woodlands Events",
    description: "Lifestyle events, arts, dining, shopping, seasonal activities, and visitor-friendly things to do.",
    url: sourceUrls.visit,
  },
  {
    title: "Cynthia Woods Mitchell Pavilion",
    description: "Concerts, Houston Symphony events, performing arts nights, and major live entertainment in The Woodlands.",
    url: sourceUrls.pavilion,
  },
  {
    title: "Market Street Events",
    description: "Shopping, dining, live music, seasonal events, art shows, and community gatherings near Town Center.",
    url: sourceUrls.marketStreet,
  },
  {
    title: "Woodlands Online Events",
    description: "A broad community calendar with local classes, family events, holiday events, concerts, and business gatherings.",
    url: sourceUrls.woodlandsOnline,
  },  {
    title: "Cars & Automotive Events",
    description: "Cars & Coffee, local car shows, automotive meetups, and enthusiast events around The Woodlands area.",
    url: sourceUrls.automotive,
  },
  {
    title: "Hello Woodlands Calendar",
    description: "Local guides and community event coverage across The Woodlands and Montgomery County area.",
    url: sourceUrls.helloWoodlands,
  },
];

const lifestyleCategories = [
  ["Concerts & Pavilion Nights", "Pavilion nights, free performing arts, major tours, and symphony events give buyers a reason to picture weekends here.", Music],
  ["Market Street & Waterway", "Dining, shopping, patios, walkability, and events near Market Street and The Waterway define the Town Center lifestyle.", Sparkles],
  ["Parks & Family Events", "Parks, pools, trails, camps, farmers markets, and Township programming are part of the everyday Woodlands draw.", TreePine],
  ["Relocation Weekends", "For buyers visiting from out of town, a good event calendar can make one weekend feel like a real test drive of the area.", Home],
];

const seasonalGuides = [
  ["Spring", "Art events, patio weather, golf, parks, school visits, and early relocation trips."],
  ["Summer", "Pavilion shows, Fourth of July, splash pads, pool season, camps, and Waterway evenings."],
  ["Fall", "Outdoor festivals, football weekends, school calendars, Market Street nights, and cooler showings."],
  ["Holiday", "Tree lightings, holiday markets, The Ice Rink, family visits, and end-of-year moves."],
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "The Woodlands Private Local Brief",
  url: "https://thewoodlandslistingagent.com/the-woodlands-events",
  description: "A curated private local calendar brief for The Woodlands, Texas from Josh Wisdom Realtor.",
  about: ["The Woodlands TX events", "The Woodlands lifestyle", "The Woodlands real estate"],
  mainEntity: {
    "@type": "ItemList",
    name: "Curated The Woodlands events",
    itemListElement: allCuratedEvents.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.title,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.venue,
          address: event.area,
        },
        url: event.href,
        description: `${event.day}, ${event.date} - ${event.category} at ${event.venue}. Source: ${event.source}.`,
      },
    })),
  },
};

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`text-[11px] font-bold uppercase tracking-[0.34em] ${light ? "text-[#d7b56d]" : "text-[#9b6d1d]"}`}>{children}</p>;
}

function EventCard({ event, dark = false }: { event: CuratedEvent; dark?: boolean }) {
  const mutedText = dark ? "text-white/58" : "text-neutral-600";
  const titleText = dark ? "text-white" : "text-black";

  return (
    <a
      href={event.href}
      target="_blank"
      rel="noreferrer"
      className={`group grid gap-x-4 gap-y-1 py-2.5 text-sm transition hover:px-2 md:grid-cols-[164px_minmax(280px,1.15fr)_minmax(250px,0.85fr)_118px] md:items-center ${
        dark ? "text-white hover:bg-white/[0.035]" : "text-black hover:bg-white"
      }`}
    >
      <div className="flex min-w-[154px] items-center gap-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] text-[#a97822]">
        <span>{event.day.slice(0, 3)}</span>
        <span className="h-px w-2 shrink-0 bg-[#c69a44]/60" />
        <span>{event.date}</span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`text-base font-semibold leading-tight tracking-[-0.01em] md:text-[17px] ${titleText}`}>{event.title}</h3>
          {event.featured && <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#a97822]">Pick</span>}
        </div>
        {event.note && <p className={`mt-0.5 text-[11px] leading-4 ${dark ? "text-white/45" : "text-neutral-500"}`}>{event.note}</p>}
      </div>

      <div className={`flex flex-col gap-0.5 text-xs leading-4 md:text-[13px] ${mutedText}`}>
        <p className="flex gap-1.5"><Clock className="mt-0.5 h-3 w-3 shrink-0 text-[#c69a44]" /> {event.time}</p>
        <p className="flex gap-1.5"><MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#c69a44]" /> {event.venue} - {event.area}</p>
      </div>

      <div className="flex items-center justify-between gap-3 md:justify-end">
        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#a97822] md:text-right">{event.category}</span>
        <ExternalLink className="h-3 w-3 shrink-0 text-[#a97822] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}
export default function TheWoodlandsEvents() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Brief | Private Local Calendar for The Woodlands</title>
        <meta name="description" content="A private-style Woodlands local brief with curated events, Pavilion dates, Market Street happenings, and lifestyle intelligence from Josh Wisdom Realtor." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/the-woodlands-events" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="relative mx-auto grid min-h-[74vh] max-w-[1500px] gap-14 px-5 py-16 md:px-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <Eyebrow light>The Woodlands Brief</Eyebrow>
            <h1 className="mt-7 max-w-5xl font-serif text-[clamp(3.4rem,7vw,8.2rem)] font-semibold leading-[0.86] tracking-[-0.035em]">Private local intelligence, already filtered.</h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-white/76">A selective Woodlands-area brief for clients who want the signal: worthwhile dates, lifestyle anchors, and source links without digging through public calendars.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-14 rounded-none bg-[#c69a44] px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-black hover:bg-[#e1c06f]"><a href="#current-calendars"><CalendarDays className="mr-2 h-4 w-4" /> Private Brief</a></Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-white/55 bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-white hover:bg-white hover:text-black"><a href="#this-weekend">Weekend Picks</a></Button>
            </div>
            <p className="mt-7 flex max-w-2xl items-start gap-3 text-sm leading-6 text-white/56"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#d7b56d]" /> Curated snapshot last checked June 25, 2026. The full source is still linked for tickets, changes, and final details.</p>
          </div>
          <div className="border border-[#c69a44]/35 bg-[#11100d] p-5 shadow-2xl shadow-black/35">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/The_Woodlands_Waterway_(5050352741).jpg?width=1400" alt="The Woodlands Waterway in The Woodlands, Texas" className="h-[480px] w-full object-cover opacity-90" loading="eager" />
            <div className="mt-5 grid gap-px bg-white/12 sm:grid-cols-3">
              {["Brief", "Weekend", "Upcoming"].map((label, index) => (
                <div key={label} className="bg-[#050505] p-5">
                  <p className="font-serif text-4xl font-semibold text-white">{index === 0 ? todaysEvents.length : index === 1 ? weekendEvents.length : upcomingEvents.length}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="current-calendars" className="bg-white py-10 text-black md:py-14">
        <div className="mx-auto max-w-[1500px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black pb-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Eyebrow>Private Brief</Eyebrow>
              <h2 className="mt-5 font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-7xl">Worth knowing now.</h2>
            </div>
            <div>
              <p className="max-w-3xl text-base leading-7 text-neutral-700">A tighter edit of the local calendar: the events most likely to matter for a relocation weekend, a client visit, a Pavilion night, or a polished Woodlands lifestyle conversation.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {briefFilters.map((filter) => (
                  <a key={filter.label} href={filter.href} className="border border-black/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:border-black hover:bg-black hover:text-white">{filter.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 divide-y divide-black/10 border-b border-black/10">
            {privateBriefEvents.map((event) => <EventCard key={`brief-${event.date}-${event.title}`} event={event} />)}
          </div>
        </div>
      </section>

      <section id="today" className="bg-[#f8f5ef] py-10 text-black md:py-14">
        <div className="mx-auto max-w-[1500px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Eyebrow>Thursday, June 25, 2026</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-5xl">Today in The Woodlands.</h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-neutral-700">The complete local scan for today, kept compact so it is useful instead of showy.</p>
          </div>
          <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
            {todaysEvents.map((event) => <EventCard key={`${event.date}-${event.title}`} event={event} />)}
          </div>
        </div>
      </section>

      <section id="this-weekend" className="bg-[#050505] py-10 text-white md:py-14">
        <div className="mx-auto max-w-[1500px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Eyebrow light>June 26 - 28</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-5xl">Weekend picks.</h2>
            </div>
            <p className="max-w-3xl text-xl leading-9 text-white/72">Concerts, Market Street, outdoor plans, and family-friendly options, narrowed into a clean weekend agenda.</p>
          </div>
          <div className="mt-4 divide-y divide-white/12 border-y border-white/12">
            {weekendEvents.map((event) => <EventCard key={`${event.date}-${event.title}`} event={event} dark />)}
          </div>
        </div>
      </section>

      <section id="pavilion-events" className="bg-[#f8f5ef] py-10 text-black md:py-14">
        <div className="mx-auto max-w-[1500px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Eyebrow>Next Dates To Know</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-5xl">Coming up next.</h2>
            </div>
            <p className="max-w-3xl text-xl leading-9 text-neutral-700">Bigger upcoming dates around the Fourth of July, Pavilion season, camps, and summer activities across The Woodlands area.</p>
          </div>
          <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
            {upcomingEvents.map((event) => <EventCard key={`${event.date}-${event.title}`} event={event} />)}
          </div>
        </div>
      </section>

      <section id="full-local-scan" className="bg-white py-10 text-black md:py-14">
        <div className="mx-auto max-w-[1500px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Eyebrow>Full Local Scan</Eyebrow>
              <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-7xl">Source calendars.</h2>
            </div>
            <p className="max-w-3xl text-xl leading-9 text-neutral-700">These links stay here as backup for tickets, cancellations, venue rules, and newly added events. The curated list above is meant to save visitors the first round of searching.</p>
          </div>
          <div className="mt-14 grid gap-px bg-neutral-200 md:grid-cols-2 lg:grid-cols-3">
            {eventSources.map((source) => (
              <a key={source.title} href={source.url} target="_blank" rel="noreferrer" className="group bg-[#f8f5ef] p-8 transition hover:bg-black hover:text-white">
                <ExternalLink className="h-5 w-5 text-[#9b6d1d] transition group-hover:text-[#d7b56d]" />
                <h3 className="mt-10 font-serif text-4xl font-semibold leading-none">{source.title}</h3>
                <p className="mt-5 leading-7 text-neutral-700 transition group-hover:text-white/72">{source.description}</p>
                <span className="mt-8 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#9b6d1d] transition group-hover:text-[#d7b56d]">Open calendar <ArrowRight className="ml-3 h-4 w-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f5ef] py-10 text-black md:py-14">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-9 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Eyebrow>Why Events Matter</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-7xl">Lifestyle is part of the real estate decision.</h2>
            <p className="mt-7 text-lg leading-8 text-neutral-700">Buyers compare more than bedrooms and square footage. They compare restaurants, concerts, schools, parks, commute patterns, walkability, and weekend routines.</p>
          </div>
          <div className="grid gap-px bg-black/15 md:grid-cols-2">
            {lifestyleCategories.map(([title, copy, Icon]) => {
              const CategoryIcon = Icon as typeof Music;
              return (
                <article key={title as string} className="bg-white p-8">
                  <CategoryIcon className="h-7 w-7 text-[#9b6d1d]" />
                  <h3 className="mt-10 font-serif text-4xl font-semibold">{title as string}</h3>
                  <p className="mt-5 leading-8 text-neutral-700">{copy as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-10 text-white md:py-14">
        <div className="mx-auto max-w-[1500px] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <Eyebrow light>Seasonal Guide</Eyebrow>
              <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-7xl">When The Woodlands feels most active.</h2>
            </div>
            <p className="max-w-3xl text-xl leading-9 text-white/72">Seasonal activity can shape first impressions, showing traffic, relocation weekends, and how a buyer understands the area.</p>
          </div>
          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-4">
            {seasonalGuides.map(([season, copy]) => (
              <article key={season} className="bg-[#050505] p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">{season}</p>
                <p className="mt-10 leading-8 text-white/76">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 text-black md:py-14">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <Eyebrow>Local Real Estate Help</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-7xl">Planning a move around The Woodlands lifestyle?</h2>
            <p className="mt-7 text-lg leading-8 text-neutral-700">Tell Josh what kind of weekends, commute, schools, parks, dining, and neighborhood feel matter to you. He can help compare areas before you spend time touring the wrong homes.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-neutral-700">
              {["The Woodlands", "Tomball", "Spring", "Magnolia", "Conroe", "North Houston"].map((area) => (
                <span key={area} className="border border-black/15 px-4 py-3"><MapPin className="mr-2 inline h-4 w-4 text-[#9b6d1d]" />{area}</span>
              ))}
            </div>
          </div>
          <LeadForm leadType="relocation" showArea title="Ask about events, neighborhoods, or relocation" subtitle="Share what kind of lifestyle you want near The Woodlands and Josh will help you narrow the right areas." buttonText="Ask Josh" />
        </div>
      </section>
    </>
  );
}