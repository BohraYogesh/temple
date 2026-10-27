import Reveal from "./Reveal";
import { weddingConfig as c } from "../weddingConfig";

const base = import.meta.env.BASE_URL;
const image = (name) => `${base}images/${name}`;

const SOCIAL_BG = "bg4.webp";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[55%] w-[55%] fill-none stroke-white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="white" />
  </svg>
);

export default function Social() {
  return (
    <section className="relative isolate overflow-hidden bg-maroon">
      {/* Poori background image (ratio apne aap sahi rehta hai, cut nahi hoti) */}
      <img
        src={image(SOCIAL_BG)}
        alt=""
        aria-hidden="true"
        className="block h-auto w-full"
      />

      {/* Content image ke upar */}
      <div
        className="absolute inset-0 z-10"
        style={{ containerType: "inline-size" }}
      >
        <Reveal className="mx-auto flex h-full w-full flex-col items-center px-[8%] pt-[12%] text-center">
          {/* Instagram (script) */}
          <p
            className="mt-[2%] font-luxurious leading-none"
            style={{ color: "#6B1F2A", fontSize: "6.5cqw" }}
          >
            {c.social.script}
          </p>

          {/* Hashtag */}
          <h2
            className="mt-[1%] font-elsie font-normal leading-tight"
            style={{ color: "#5A1A1A", fontSize: "5cqw" }}
          >
            {c.meta.hashtag}
          </h2>

          {/* Instagram button */}
          <a
            href={c.meta.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="mt-[3.5%] grid aspect-square w-[8.5%] place-items-center rounded-[22%] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg transition hover:scale-110"
          >
            <InstagramIcon />
          </a>

          {/* Tap here */}
          <p
            className="mt-[1.5%] font-inter tracking-widest"
            style={{ color: "#5A1A1A", fontSize: "1.6cqw" }}
          >
            {c.social.tap}
          </p>
        </Reveal>
      </div>
    </section>
  );
}