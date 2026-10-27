import { useRef, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

import Reveal from "./Reveal";
import { weddingConfig as c } from "../weddingConfig";

const BASE = import.meta.env.BASE_URL;

const eventImages = [
  "images/haldi.webp",
  "images/mehndi.webp",
  "images/sangeet.webp",
  "images/wedding.webp",
  "images/reception.webp",
];

const getImagePath = (index) =>
  `${BASE}${eventImages[index % eventImages.length]}`;

const fmt = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Events() {
  const [i, setI] = useState(0);
  const touchStart = useRef(0);

  const events = c.events ?? [];
  const n = events.length;

  if (n === 0) return null;

  const e = events[i];

  const go = (direction) => {
    setI((current) => (current + direction + n) % n);
  };

  return (
    <section
      id="events"
      className="relative isolate overflow-hidden px-3 py-12 sm:px-6 sm:py-20 lg:px-10 lg:py-16"
      style={{
        backgroundImage: `url("${BASE}images/bg.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Background overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#fff7e9]/10" />

      {/* Mobile: narrow card | Desktop: wide card */}
      <Reveal className="mx-auto w-full max-w-[390px] sm:max-w-[430px] lg:max-w-[1100px] xl:max-w-[1280px]">
        {/* Outer gold frame */}
        <div className="rounded-[2.5rem] border-[5px] border-[#d8c18a] bg-[#fffaf0]/95 p-[5px] shadow-[0_12px_40px_rgba(20,35,70,0.30)]">
          {/* Inner navy frame */}
          <div className="rounded-[2.1rem] border-[3px] border-[#103b88] p-[3px]">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#d5ad50] bg-[#fffdf8] px-3 pb-6 pt-3 sm:px-4 sm:pt-4 lg:px-10 lg:pb-12 lg:pt-6">
              {/* Event header */}
              <div className="mb-3 flex items-center justify-between gap-2 px-1 lg:mb-4 lg:px-0">
                <p className="font-ui text-sm font-semibold text-[#1761bd] sm:text-base">
                  {e.tag}
                </p>

                <Star
                  size={23}
                  fill="#1761bd"
                  stroke="#1761bd"
                  className="shrink-0"
                />
              </div>

              {/* Body: mobile stacked, desktop 2 columns */}
              <div className="lg:grid lg:grid-cols-[minmax(320px,38%)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
                {/* Event image */}
                <div className="rounded-[1.6rem] border-[3px] border-[#e0ad39] bg-white p-[3px] shadow-sm">
                  <div className="relative overflow-hidden rounded-[1.3rem] border-2 border-[#123f91]">
                    <div
                      key={i}
                      className="relative"
                      onTouchStart={(event) => {
                        touchStart.current = event.touches[0].clientX;
                      }}
                      onTouchEnd={(event) => {
                        const distance =
                          event.changedTouches[0].clientX - touchStart.current;

                        if (Math.abs(distance) > 40) {
                          go(distance < 0 ? 1 : -1);
                        }
                      }}
                    >
                      <img
                        src={getImagePath(i)}
                        alt={e.title}
                        loading="eager"
                        className="aspect-[4/4.4] w-full object-cover object-center"
                      />

                      {/* Slider controls */}
                      <div className="absolute inset-x-0 bottom-2 flex items-center justify-between px-2 sm:bottom-3 sm:px-3 lg:justify-start lg:gap-3">
                        <button
                          type="button"
                          onClick={() => go(-1)}
                          aria-label="Previous event"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#bba66e] bg-white/95 text-[#0961d4] shadow-md transition hover:scale-105 sm:h-12 sm:w-12"
                        >
                          <ChevronLeft size={25} strokeWidth={2.5} />
                        </button>

                        <div className="flex max-w-[55%] items-center justify-center gap-1.5 lg:order-3 lg:ml-auto lg:max-w-none">
                          {events.map((event, index) => (
                            <button
                              type="button"
                              key={`${event.title}-${index}`}
                              onClick={() => setI(index)}
                              aria-label={`Show ${event.title}`}
                              aria-current={index === i ? "true" : undefined}
                              className={`h-2.5 rounded-full transition-all duration-300 ${
                                index === i
                                  ? "w-5 bg-[#103b88]"
                                  : "w-2.5 bg-white/90 shadow-sm"
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => go(1)}
                          aria-label="Next event"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#bba66e] bg-white/95 text-[#0961d4] shadow-md transition hover:scale-105 sm:h-12 sm:w-12 lg:order-2"
                        >
                          <ChevronRight size={25} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event details */}
                <div className="px-0 pb-2 pt-5 font-ui text-[#392a1d] sm:px-1 sm:pt-6 lg:px-0 lg:pb-0 lg:pt-2">
                  <h2 className="break-words text-[clamp(2.3rem,10vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#33251a] lg:text-[clamp(3rem,4.8vw,5rem)]">
                    {e.title}
                  </h2>

                  {/* Date, Time, Venue: mobile stacked, desktop one row */}
                  <div className="mt-5 flex flex-col gap-1.5 text-[#51463c] lg:mt-6 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-8 lg:gap-y-2">
                    {/* Date */}
                    <div className="flex items-start gap-2.5 lg:items-center">
                      <CalendarDays
                        size={19}
                        className="mt-0.5 shrink-0 text-[#1671ed] lg:mt-0"
                      />
                      <p className="text-sm leading-6 sm:text-base lg:text-lg">
                        {fmt(e.date)}
                      </p>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-2.5 lg:items-center">
                      <Clock3
                        size={19}
                        className="mt-0.5 shrink-0 text-[#1671ed] lg:mt-0"
                      />
                      <p className="text-sm leading-6 sm:text-base lg:text-lg">
                        {e.time}
                      </p>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start gap-2.5 lg:items-center">
                      <MapPin
                        size={19}
                        className="mt-0.5 shrink-0 text-[#1671ed] lg:mt-0"
                      />
                      <p className="break-words text-sm leading-6 sm:text-base lg:text-lg">
                        {e.venue}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 font-body text-lg leading-snug text-[#51463c] sm:text-xl lg:mt-6 lg:max-w-[40rem]">
                    {e.description}
                  </p>

                  {/* Location button */}
                  <a
                    href={e.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full border border-[#e2b54f] bg-[#103b88] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7a263a] focus:outline-none focus:ring-2 focus:ring-[#e2b54f] focus:ring-offset-2 lg:mt-7"
                  >
                    View Location
                  </a>
                </div>
              </div>

              {/* Decorative stars */}
              <div className="pointer-events-none absolute left-3 top-2 hidden text-[#e5b33e] lg:block">
                <Star size={17} fill="currentColor" />
              </div>

              <div className="pointer-events-none absolute bottom-2 left-3 text-[#e5b33e]">
                <Star size={17} fill="currentColor" />
              </div>

              <div className="pointer-events-none absolute bottom-2 right-3 text-[#e5b33e]">
                <Star size={17} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}