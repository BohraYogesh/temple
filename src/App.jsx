import { useEffect } from "react";
import { weddingConfig as c } from "./weddingConfig";
import Hero from "./components/Hero";
import Invite from "./components/Invite";
import Events from "./components/Events";
import Venue from "./components/Venue";
import Story from "./components/Story";
// import Rsvp from "./components/Rsvp";
import Social from "./components/Social";
import Countdown from "./components/Countdown";
import Wishes from "./components/Wishes";

export default function App() {
  useEffect(() => {
    document.title = c.meta.title;
    const t = c.theme;
    Object.entries({
      maroon: t.maroon,
      gold: t.gold,
      cream: t.cream,
      navy: t.navy,
      ink: t.ink,
    }).forEach(([k, v]) =>
      document.documentElement.style.setProperty(`--c-${k}`, v),
    );
  }, []);
  // Set variables synchronously for first paint too
  const t = c.theme;
  const vars = {
    "--c-maroon": t.maroon,
    "--c-gold": t.gold,
    "--c-cream": t.cream,
    "--c-navy": t.navy,
    "--c-ink": t.ink,
  };
  return (
    <main style={vars} className="min-h-screen bg-cream">
      <Hero />
      <Invite />
      <Events />
      <Venue />
      <Story />
      {/* <Rsvp /> */}
      <Wishes />
      <Social />
      <Countdown />
    </main>
  );
}
