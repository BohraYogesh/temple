import { useEffect } from "react";
import { weddingConfig as c } from "./weddingConfig";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import Invite from "./components/Invite";
import Events from "./components/Events";
import Venue from "./components/Venue";
import Story from "./components/Story";
// import Rsvp from "./components/Rsvp";
import Social from "./components/Social";
import Countdown from "./components/Countdown";
import Wishes from "./components/Wishes";
import MusicToggle from "./components/MusicToggle";
import { preloadQueue } from "./utils/preload";

/* Hero ke baad baaki sab images, scroll ke order me, background me */
function PreloadRest() {
  useEffect(() => {
    const i = c.images;
    const list = [
      i.frame, i.ganesh, i.inviteBg,           // Invite
      i.eventsBg, ...c.events.map((e) => e.image), // Events
      ...Object.values(i),                      // bachi hui sab (duplicates apne aap hat jate hain)
    ];
    const run = () => preloadQueue(list, 3);
    const id = "requestIdleCallback" in window
      ? requestIdleCallback(run, { timeout: 2500 })
      : setTimeout(run, 800);
    return () => ("cancelIdleCallback" in window ? cancelIdleCallback(id) : clearTimeout(id));
  }, []);
  return null;
}

export default function App() {
  useEffect(() => {
    document.title = c.meta.title;
  }, []);

  const t = c.theme;
  const vars = {
    "--c-maroon": t.maroon,
    "--c-gold": t.gold,
    "--c-cream": t.cream,
    "--c-navy": t.navy,
    "--c-ink": t.ink,
  };

  return (
    <Preloader>
      <main style={vars} className="min-h-screen bg-cream">
        <PreloadRest />
        <Hero />
        <Invite />
        <Events />
        <Venue />
        <Story />
        {/* <Rsvp /> */}
        <Wishes />
        <Social />
        <Countdown />
        <MusicToggle />
      </main>
    </Preloader>
  );
}