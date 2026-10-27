import { useState } from "react";
import Reveal from "./Reveal";
import { weddingConfig as c } from "../weddingConfig";

const REF_W = 490;
const REF_H = 857;

const BLUE = "#2f86d4";
const GOLD = "#e9bb62";
const GREY = "#7b7b7b";
const INK = "#4a4a4a";

const base = import.meta.env.BASE_URL;

const y = (px) => `${(px / REF_H) * 100}%`;

function Block({ top, delay = 0, children }) {
  return (
    <div
      className="absolute inset-x-0 text-center"
      style={{
        top: y(top),
        transform: "translateY(-50%)",
      }}
    >
      <Reveal delay={delay}>{children}</Reveal>
    </div>
  );
}

export default function Invite() {
  const i = c.invite;
  const [frameFailed, setFrameFailed] = useState(false);

  const serif = {
    fontFamily: "'Libre Baskerville', serif",
  };

  const display = {
    fontFamily: "'Gilda Display', serif",
  };

  const small = {
    ...serif,
    fontSize: "max(8px, 1.95cqw)",
    lineHeight: 1.4,
    color: INK,
  };

  const bigName = {
    ...display,
    fontSize: "10.8cqw",
    lineHeight: 1,
    color: GOLD,
    letterSpacing: ".01em",
    overflowWrap: "anywhere",
  };

  return (
    <section
      id="invite"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#dbe6f1" }}
    >
      {/* frame-1.webp is the ONLY frame/background image */}
      <div
        className="relative mx-auto w-full"
        style={{
          containerType: "inline-size",
          aspectRatio: `${REF_W} / ${REF_H}`,
          backgroundImage: frameFailed
            ? "none"
            : `url("${base + c.images.frame}")`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {frameFailed && (
          <div
            className="absolute inset-0 border-4 bg-[#fff7e9]"
            style={{ borderColor: GOLD }}
          />
        )}

        {/* CONTENT */}
        <div className="absolute inset-0">
          {/* Ganesh */}
          <Block top={214}>
            <img
              src={base + c.images.ganesh}
              alt="Ganesh"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="mx-auto block h-auto"
              style={{ width: "12cqw" }}
            />
          </Block>

          {/* Blessing */}
          <Block top={272} delay={100}>
            <p
              className="mx-auto"
              style={{
                ...display,
                fontSize: "clamp(11px, 2.2cqw, 15px)",
                lineHeight: 1.3,
                color: GREY,
                maxWidth: "65%",
                overflowWrap: "break-word",
              }}
            >
              {i.blessing}
            </p>
          </Block>

          {/* Invitation script */}
          <Block top={340} delay={150}>
            <h2
              className="font-luxurious"
              style={{
                fontSize: "13.5cqw",
                lineHeight: 1.1,
                color: BLUE,
              }}
            >
              {i.script}
            </h2>
          </Block>

          {/* Host details */}
          <Block top={418} delay={200}>
            <div
              className="mx-auto"
              style={{
                width: "70%",
                maxWidth: "70%",
              }}
            >
              {i.host.map((line, index) => (
                <p
                  key={`${line}-${index}`}
                  className="font-abhaya"
                  style={{
                    fontSize: "clamp(7px, 1.35cqw, 12px)",
                    lineHeight: 1.35,
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    textAlign: "center",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </Block>

          {/* Groom */}
          <Block top={497} delay={250}>
            <h3
              className="font-junge"
              style={{
                ...bigName,
                fontFamily: "Junge, serif",
              }}
            >
              {c.couple.groom.toUpperCase()}
            </h3>
          </Block>

          {/* And */}
          <Block top={543} delay={300}>
            <p
              className="font-amethysta"
              style={{
                fontSize: "5.4cqw",
                lineHeight: 1,
                color: BLUE,
              }}
            >
              {i.and}
            </p>
          </Block>

          {/* Bride */}
          <Block top={592} delay={350}>
            <h3
              className="font-junge"
              style={{
                ...bigName,
                fontFamily: "Junge, serif",
              }}
            >
              {c.couple.bride.toUpperCase()}
            </h3>
          </Block>

          {/* Bride side */}
          <Block top={663} delay={400}>
            <div
              className="mx-auto"
              style={{
                width: "74%",
                maxWidth: "74%",
              }}
            >
              {i.brideSide.map((line, index) => (
                <p
                  key={`${line}-${index}`}
                  className="font-abhaya"
                  style={{
                    fontSize: "clamp(7px, 1.55cqw, 12px)",
                    lineHeight: 1.35,
                    fontWeight: index % 2 === 0 ? 700 : 400,
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    textAlign: "center",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </Block>

          {/* Events CTA */}
          <Block top={724} delay={450}>
            <a
              href="#events"
              className="inline-block max-w-[85%] font-ebgaramond transition-opacity hover:opacity-70"
              style={{
                fontWeight: 700,
                fontSize: "max(12px, 2.8cqw)",
                lineHeight: 1.4,
                color: BLUE,
              }}
            >
              {i.cta}
            </a>
          </Block>
        </div>
      </div>
    </section>
  );
}
