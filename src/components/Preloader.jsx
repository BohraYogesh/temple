import { useEffect, useState } from "react";
import { weddingConfig as c } from "../weddingConfig";
import { loadImage } from "../utils/preload";

const CRITICAL = [c.images.sky, c.images.hero, c.images.plant].filter(Boolean);

export default function Preloader({ children }) {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let alive = true;
    const finish = () => alive && setReady(true);
    const timer = setTimeout(finish, 6000); // safety: 6 sec baad bhi site khul jaye

    const jobs = CRITICAL.map((src) => loadImage(src).then(() => alive && setLoaded((n) => n + 1)));
    jobs.push(document.fonts ? document.fonts.ready : Promise.resolve());
    Promise.all(jobs).then(() => { clearTimeout(timer); finish(); });

    return () => { alive = false; clearTimeout(timer); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [gone]);

  const pct = Math.round((loaded / CRITICAL.length) * 100);

  return (
    <>
      {ready && children}
      {!gone && (
        <div
          onTransitionEnd={() => ready && setGone(true)}
          className="fixed inset-0 z-[100] grid place-items-center bg-cream transition-opacity duration-700"
          style={{ opacity: ready ? 0 : 1, pointerEvents: ready ? "none" : "auto" }}
        >
          <div className="w-64 text-center">
            <p className="font-script text-5xl text-maroon">{c.couple.groom} &amp; {c.couple.bride}</p>
            <div className="mt-6 h-1 overflow-hidden rounded-full bg-gold/30">
              <div className="h-full rounded-full bg-gold transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}