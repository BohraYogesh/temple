import { useRef, useState } from "react";
import { weddingConfig as c } from "../weddingConfig";

export default function MusicToggle() {
  const audio = useRef(null);
  const [on, setOn] = useState(false);
  const [ok, setOk] = useState(true);

  if (!ok || !c.music) return null;

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      a.play().then(() => setOn(true)).catch(() => setOk(false));
    }
  };

  return (
    <div
      className="fixed z-50"
      style={{
        left: "max(16px, env(safe-area-inset-left))",
        bottom: "max(16px, env(safe-area-inset-bottom))",
      }}
    >
      {/* chhoti pulse ring ka animation */}
      <style>{`
        @keyframes musicPulse {
          0%   { transform: scale(1);    opacity: .55; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>

      <audio
        ref={audio}
        src={import.meta.env.BASE_URL + c.music}
        loop
        preload="none"
        onError={() => setOk(false)}
      />

      {/* pulse ring: sirf music bajte waqt */}
      {on && (
        <span
          className="absolute inset-0 rounded-full bg-[#d9b98a]"
          style={{ animation: "musicPulse 1.8s ease-out infinite" }}
        />
      )}

      <button
        onClick={toggle}
        aria-label={on ? "Pause music" : "Play music"}
        className="relative grid h-[44px] w-[44px] place-items-center rounded-full border-2 border-white/90 text-white shadow-[0_5px_14px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition duration-200 hover:scale-105 active:scale-95"
        style={{ background: "linear-gradient(145deg, #dcbf93 0%, #b88f5e 100%)" }}
      >
        {on ? (
          <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current drop-shadow-sm">
            <rect x="6" y="5" width="4" height="14" rx="1.2" />
            <rect x="14" y="5" width="4" height="14" rx="1.2" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-[2px] h-[17px] w-[17px] fill-current drop-shadow-sm">
            <path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}