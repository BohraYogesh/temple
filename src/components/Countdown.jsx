import { useEffect, useState } from "react";
import { weddingConfig as c } from "../weddingConfig";

const calc = () => {
  const t = Math.max(0, new Date(c.weddingDate) - Date.now());

  return [
    ["D", Math.floor(t / 864e5)],
    ["H", Math.floor(t / 36e5) % 24],
    ["M", Math.floor(t / 6e4) % 60],
    ["S", Math.floor(t / 1e3) % 60],
  ];
};

const BASE = import.meta.env.BASE_URL;
const STORY_IMAGES = [1, 2, 3, 4].map((n) => `${BASE}images/story${n}.webp`);

// Har image ka tilt (degree): seedhi, left, seedhi, right
const TILTS = [0, -20, 0, 20];

const SQUARE_SIZE = "26cqw"; // square ki final size
const STEP_MS = 380; // nayi image kitni der baad aaye
const GROW_MS = 380; // zoom in ka time
const SHRINK_MS = 340; // purani image ke jaane ka time
const VISIBLE = 2; // ek saath kitni images dikhein (3rd aane par 1st jaye)

export default function Countdown() {
  const [left, setLeft] = useState(calc);
  const [spot, setSpot] = useState(null); // { x, y, id } (% me)
  const [layers, setLayers] = useState([]); // [{ key, src, tilt, leaving }]

  const bg = `${BASE}images/bg5.webp`;

  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  // Jab bhi nayi jagah touch ho: purani hatao, nayi jagah se loop shuru
  useEffect(() => {
    if (!spot) return;

    let count = 0;
    let list = [];
    const timeouts = [];

    const addLayer = () => {
      const index = count % STORY_IMAGES.length;
      const key = `${spot.id}-${count}`;
      count += 1;

      // Agar VISIBLE se zyada ho rahi hain to sabse purani ko jaane do
      const active = list.filter((l) => !l.leaving);
      if (active.length >= VISIBLE) {
        const oldest = active[0];
        list = list.map((l) =>
          l.key === oldest.key ? { ...l, leaving: true } : l,
        );

        timeouts.push(
          setTimeout(() => {
            list = list.filter((l) => l.key !== oldest.key);
            setLayers([...list]);
          }, SHRINK_MS),
        );
      }

      list = [
        ...list,
        {
          key,
          src: STORY_IMAGES[index],
          tilt: TILTS[index % TILTS.length],
          leaving: false,
        },
      ];

      setLayers([...list]);
    };

    setLayers([]);
    addLayer();
    const timer = setInterval(addLayer, STEP_MS);

    return () => {
      clearInterval(timer);
      timeouts.forEach(clearTimeout);
    };
  }, [spot]);

  const handleTouchArea = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y, id: Date.now() });
  };

  return (
    <footer className="relative isolate w-full overflow-hidden bg-[#F1D9BD] text-center">
      <style>{`
        @keyframes squarePop {
          0%   { transform: translate(-50%, -50%) scale(0.02) rotate(calc(var(--tilt) - 12deg)); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(var(--tilt)); opacity: 1; }
        }
        @keyframes squareOut {
          0%   { transform: translate(-50%, -50%) scale(1) rotate(var(--tilt)); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.02) rotate(calc(var(--tilt) + 14deg)); opacity: 0; }
        }
      `}</style>

      {/* Background: in-flow, original ratio, no crop */}
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none block h-auto w-full"
      />

      {/* Content overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ containerType: "inline-size" }}
      >
        {/* Counting the Days */}
        <p
          className="absolute left-1/2 top-[8%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-luxurious font-normal leading-none"
          style={{ color: "#6B1F2A", fontSize: "8cqw" }}
        >
          {c.countdown.script}
        </p>

        {/* Timer row */}
        <div
          className="absolute left-1/2 top-[14.5%] flex -translate-x-1/2 items-start justify-center"
          aria-label="Countdown"
        >
          {left.map(([l, v], i) => (
            <div key={l} className="flex items-start">
              <div className="flex flex-col items-center">
                <div
                  className="grid place-items-center rounded-[22%] bg-white"
                  style={{ width: "11.8cqw", height: "11.4cqw" }}
                >
                  <span
                    className="leading-none"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      color: "#2B1A1A",
                      fontSize: "4.6cqw",
                      fontFeatureSettings: '"lnum" 1, "tnum" 1',
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    {String(v).padStart(2, "0")}
                  </span>
                </div>

                <span
                  className="font-inter font-normal leading-none"
                  style={{
                    color: "#3A2A2A",
                    fontSize: "2cqw",
                    marginTop: "2.2cqw",
                  }}
                >
                  {l}
                </span>
              </div>

              {i < left.length - 1 && (
                <span
                  className="flex items-center justify-center font-inter leading-none"
                  style={{
                    width: "6.2cqw",
                    height: "11.4cqw",
                    paddingTop: "5cqw",
                    color: "#6B1F2A",
                    fontSize: "2.4cqw",
                  }}
                  aria-hidden="true"
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Touch here for Magic (sirf text) */}
        <p
          className="pointer-events-none absolute left-1/2 top-[30.4%] z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-luxurious font-normal leading-none"
          style={{ color: "#6B1F2A", fontSize: "7.5cqw" }}
        >
          {c.countdown.magic}
        </p>

        {/* Touch area: text ke neeche poora hissa */}
        <div
          className="absolute inset-x-0 bottom-0 top-[34%] z-10 cursor-pointer overflow-hidden"
          onPointerDown={handleTouchArea}
          style={{ touchAction: "manipulation" }}
        >
          {spot &&
            layers.map((layer) => (
              <img
                key={layer.key}
                src={layer.src}
                alt=""
                aria-hidden="true"
                draggable="false"
                className="pointer-events-none absolute object-cover"
                style={{
                  "--tilt": `${layer.tilt}deg`,
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                  borderRadius: "1.2cqw",
                  animation: layer.leaving
                    ? `squareOut ${SHRINK_MS}ms cubic-bezier(0.55, 0, 0.7, 0.3) both`
                    : `squarePop ${GROW_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both`,
                }}
              />
            ))}
        </div>
      </div>
    </footer>
  );
}