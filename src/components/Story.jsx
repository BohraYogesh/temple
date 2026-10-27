import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { weddingConfig as c } from "../weddingConfig";

const base = import.meta.env.BASE_URL;
const image = (name) => `${base}images/${name}`;

const FRAME_ROTATE = 90;
const FRAME_RATIO = 0.74;
const BG_WIDTH_PERCENT = 106;

// Photo alignment inside the frame
const PHOTO_INSET = {
  top: "12%",
  right: "13%",
  bottom: "10%",
  left: "14%",
};

const SLIDE_MS = 3500;

export default function Story() {
  const s = c.story;
  const photos = s.photos ?? [];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce || photos.length < 2) return;

    const id = setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, SLIDE_MS);

    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <section className="relative isolate overflow-hidden bg-maroon text-center">
      {/* Background: in-flow, to poori height dikhegi (section isi se banta hai) */}
      <img
        src={image("bg2.webp")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none block h-auto max-w-none"
        style={{
          width: `${BG_WIDTH_PERCENT}%`,
          marginLeft: `${-(BG_WIDTH_PERCENT - 100) / 2}%`,
        }}
      />

      {/* Content overlay: sab kuch image ki width ke hisaab se scale hota hai */}
      <div
        className="absolute inset-0 z-10"
        style={{ containerType: "inline-size" }}
      >
        <Reveal className="mx-auto flex h-full w-full flex-col items-center px-[5cqw] py-[8cqw]">
          {/* Meet The */}
          <h2
            className="font-elsie font-normal leading-tight"
            style={{ color: "#EAD7BD", fontSize: "3.8cqw" }}
          >
            {s.heading}
          </h2>

          {/* Bride & Groom */}
          <p
            className="font-luxurious font-normal leading-[0.9]"
            style={{ color: "#D7B480", fontSize: "7.5cqw" }}
          >
            {s.script}
          </p>

          {/* Our Story */}
          <p
            className="mt-[10cqw] font-luxurious font-normal leading-none"
            style={{ color: "#D1B17A", fontSize: "6cqw" }}
          >
            {s.subheading}
          </p>

          {/* Story paragraph */}
          <p
            className="mt-[6cqw] w-[46%] font-inter font-semibold leading-[1.2]"
            style={{ color: "#461010", fontSize: "1.7cqw" }}
          >
            {s.text}
          </p>

          {/* Frame + slideshow */}
          <div
            className="relative mt-[6cqw] w-[44%]"
            style={{
              aspectRatio: FRAME_RATIO,
              containerType: "size",
            }}
          >
            {/* Slideshow photos */}
            <div className="absolute overflow-hidden" style={PHOTO_INSET}>
              {photos.map((name, index) => (
                <img
                  key={name}
                  src={image(name)}
                  alt="The couple"
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  style={{
                    opacity: index === active ? 1 : 0,
                    display: "block",
                  }}
                />
              ))}
            </div>

            {/* Frame above photos */}
            <img
              src={image("frame2.webp")}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 max-w-none"
              style={
                FRAME_ROTATE === 90
                  ? {
                      width: "100cqh",
                      height: "100cqw",
                      transform: "translate(-50%, -50%) rotate(90deg)",
                    }
                  : {
                      width: "100%",
                      height: "100%",
                      transform: "translate(-50%, -50%)",
                    }
              }
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
