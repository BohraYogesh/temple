import { useEffect, useRef } from "react";
import SmartImage from "./SmartImage";
import { weddingConfig as c } from "../weddingConfig";

/* ===== Reference screenshot: 495 x 857 =====
   k  = temple + text ka unit (screen height/width se limit hota hai)
   kp = plant ka unit (bade screen par thoda bada hota hai taaki side me jagah bhare) */
const REF_W = 495;
const REF_H = 857;

const PLANT_W = 495;       // plant ki width
const PLANT_BOTTOM = -163; // negative = plant neeche screen ke bahar jata hai
const PLANT_GROW = 1.3;    // bade screen par plant kitna bada ho sakta hai (1 = mobile jaisa, 1.6 = aur bada)

const TEMPLE_W = 450;      // temple ki width
const TEMPLE_BOTTOM = 0;   // 0 = bilkul bottom se start
const TEMPLE_H = (TEMPLE_W * 1024) / 677;
const TEMPLE_CROWN = (TEMPLE_H * 81) / 1024;

const TEXT_TOP = 61;
const TEMPLE_DROP = 0.35;  // crown screen ke top ko chhune ke baad temple neeche sarakne ki speed
const TEXT_SINK = 0.55;    // text temple ke piche neeche sarakne ki speed
const GOLD = "#f4d98a";

const k = (n) => `calc(var(--k) * ${n})`;
const kp = (n) => `calc(var(--kp) * ${n})`;

export default function Hero() {
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    let raf = 0;
    const update = () => {
      const kk = Math.min(window.innerWidth / REF_W, window.innerHeight / REF_H);
      const H = el.offsetHeight;
      const scroll = Math.min(Math.max(0, window.scrollY), H);
      const crownTop = H - (TEMPLE_BOTTOM + TEMPLE_H - TEMPLE_CROWN) * kk;
      el.style.setProperty("--temple", `${(Math.max(0, scroll - crownTop) * TEMPLE_DROP).toFixed(1)}px`);
      el.style.setProperty("--text", `${(scroll * TEXT_SINK).toFixed(1)}px`);
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const serif = { fontFamily: "Marcellus, serif" };
  const nameStyle = { ...serif, fontSize: k(60), lineHeight: 1, letterSpacing: ".01em" };
  const smallStyle = { ...serif, color: GOLD, fontSize: k(14), lineHeight: k(14), marginTop: k(8), letterSpacing: ".08em" };
  const tagStyle = { fontFamily: "Poppins, sans-serif", fontWeight: 600, color: GOLD, fontSize: k(7), lineHeight: k(22), marginTop: k(4), letterSpacing: ".06em" };

  return (
    <header
      ref={wrap}
      className="relative h-screen overflow-hidden bg-[#1a8cf0]"
      style={{
        height: "100dvh",
        "--k": `min(calc(100vw / ${REF_W}), calc(100dvh / ${REF_H}))`,
        "--kp": `max(var(--k), min(calc(100vw / ${REF_W}), calc(100dvh / ${REF_H} * ${PLANT_GROW})))`,
      }}
    >
      {/* SKY */}
      <SmartImage src={c.images.sky} alt="" className="absolute inset-0 z-0 h-full w-full object-cover" />

      {/* TEXT (temple ke piche) */}
      <div
        className="absolute inset-x-0 z-10 text-center text-white will-change-transform"
        style={{
          top: k(TEXT_TOP),
          transform: "translate3d(0, var(--text, 0px), 0)",
          textShadow: "0 1px 6px rgba(0,0,0,.18)",
        }}
      >
        <h1 className="animate-rise" style={nameStyle}>{c.couple.groom.toUpperCase()}</h1>
        <p className="animate-rise" style={{ ...smallStyle, animationDelay: ".25s" }}>WEDS</p>
        <h1 className="animate-rise" style={{ ...nameStyle, animationDelay: ".5s" }}>{c.couple.bride.toUpperCase()}</h1>
        <p className="animate-rise" style={{ ...tagStyle, animationDelay: ".8s" }}>{c.couple.tagline}</p>
      </div>

      {/* TEMPLE */}
      <div
        className="absolute left-1/2 z-20 will-change-transform"
        style={{
          width: k(TEMPLE_W),
          aspectRatio: "677 / 1024",
          bottom: k(TEMPLE_BOTTOM),
          transform: "translate3d(-50%, var(--temple, 0px), 0)",
        }}
      >
        <SmartImage src={c.images.hero} alt="Temple gopuram" style={{ display: "block", width: "100%", height: "100%" }} />
      </div>

      {/* PLANT: bottom me fix. kp unit se bade screen par bada hota hai, bachi jagah par mirror copy */}
      <div
        className="pointer-events-none absolute left-1/2 z-30"
        style={{
          width: kp(PLANT_W),
          aspectRatio: "1355 / 2048",
          bottom: kp(PLANT_BOTTOM),
          transform: "translateX(-50%)",
        }}
      >
        {[-2, -1, 0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{ transform: `translateX(${i * 100}%) scaleX(${i % 2 === 0 ? 1 : -1})` }}
          >
            <SmartImage src={c.images.plant} alt="" style={{ display: "block", width: "100%", height: "100%" }} />
          </div>
        ))}
      </div>
    </header>
  );
}