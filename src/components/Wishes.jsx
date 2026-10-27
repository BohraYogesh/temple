import Reveal from "./Reveal";
import { weddingConfig as c } from "../weddingConfig";

const base = import.meta.env.BASE_URL;
const image = (name) => `${base}images/${name}`;

const WISHES_BG = "bg3.webp";

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[52%] w-[52%] fill-none stroke-white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 21l1.6-5A8.5 8.5 0 1 1 8 19.4L3 21z" />
    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2-1.9.6z" />
  </svg>
);

export default function Wishes() {
  const w = c.wishes;

  return (
    <section className="relative isolate overflow-hidden bg-maroon">
      {/* Poori background image (ratio apne aap sahi rehta hai) */}
      <img
        src={image(WISHES_BG)}
        alt=""
        aria-hidden="true"
        className="block h-auto w-full"
      />

      {/* Content image ke upar, arch ke andar */}
      <div
        className="absolute inset-0 z-10"
        style={{ containerType: "inline-size" }}
      >
        <Reveal className="mx-auto flex h-full w-full flex-col items-center px-[8%] pt-[6%] text-center">
          {/* Will You Join Us? */}
          <p
            className="mt-[6%] font-luxurious leading-[0.9]"
            style={{ color: "#6B1F2A", fontSize: "7cqw" }}
          >
            {w.script}
            <br />
            {w.script2}
          </p>

          {/* Paragraph */}
          <p
            className="mt-[4%] w-[58%] font-inter font-medium leading-[1.35]"
            style={{ color: "#5A1A1A", fontSize: "1.9cqw" }}
          >
            {w.text}
          </p>

          {/* WhatsApp button */}
          <a
            href={w.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="mt-[7%] grid aspect-square w-[10%] place-items-center rounded-[22%] shadow-lg transition hover:scale-110"
            style={{ background: "#4A0F1F" }}
          >
            <WhatsAppIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
