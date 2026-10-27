import { useEffect, useRef } from "react";

export default function Venue() {
  const sectionRef = useRef(null);
  const coupleRef = useRef(null);

  const base = import.meta.env.BASE_URL;
  const image = (name) => `${base}images/${name}`;

  useEffect(() => {
    const section = sectionRef.current;
    const couple = coupleRef.current;
    if (!section || !couple) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // 1 = section ka top screen ke bottom par aate hi animation shuru.
    // Section ka bottom screen ke bottom par pahunchte hi couple neeche pahunch jaata hai.
    const START = 1;
    const OFFSET_TOP = -150;
    const OFFSET_BOTTOM = -50;

    let target = 0;
    let current = 0;
    let raf = 0;

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * START - rect.top) / rect.height;
      target = Math.min(1, Math.max(0, raw));
    };

    const render = () => {
      current += (target - current) * (reduceMotion ? 1 : 0.1);
      if (Math.abs(target - current) < 0.0005) current = target;

      const travel = Math.max(0, section.clientHeight - couple.offsetHeight);
      const y = OFFSET_TOP + current * (travel - OFFSET_TOP + OFFSET_BOTTOM);
      couple.style.transform = `translate3d(-50%, ${y}px, 0)`;

      raf = requestAnimationFrame(render);
    };

    readProgress();
    render();

    window.addEventListener("scroll", readProgress, { passive: true });
    window.addEventListener("resize", readProgress);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readProgress);
      window.removeEventListener("resize", readProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-sky-300 sm:min-h-0"
      style={{
        backgroundImage: `url("${image("sky2.webp")}")`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Tablet/desktop: full sky image, in-flow, section iski height ka banta hai (no crop) */}
      <img
        src={image("sky2.webp")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none hidden h-auto w-full sm:block"
      />

      {/* Moving clouds */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={image("cloud.webp")}
          alt=""
          className="venue-cloud venue-cloud-one"
        />
        <img
          src={image("cloud.webp")}
          alt=""
          className="venue-cloud venue-cloud-two"
        />
        <img
          src={image("cloud.webp")}
          alt=""
          className="venue-cloud venue-cloud-three"
        />
      </div>

      {/* Full-width temple */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <img
          src={image("temple2.webp")}
          alt="Temple"
          className="h-full w-full object-fill"
        />
      </div>

      {/* Couple: section ke top se bottom tak */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <img
          ref={coupleRef}
          src={image("couple.webp")}
          alt="Wedding couple"
          className="absolute left-1/2 top-0 w-[48%] max-w-[280px] object-contain sm:w-[32%] sm:max-w-[320px]"
          style={{
            transform: "translate3d(-50%, 0, 0)",
            willChange: "transform",
          }}
        />
      </div>
    </section>
  );
}
