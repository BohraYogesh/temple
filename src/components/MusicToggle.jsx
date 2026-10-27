import { useRef, useState } from 'react'
import { weddingConfig as c } from '../weddingConfig'
export default function MusicToggle() {
  const audio = useRef(null)
  const [on, setOn] = useState(false)
  const [ok, setOk] = useState(true)
  if (!ok || !c.music) return null
  const toggle = () => {
    const a = audio.current
    if (on) { a.pause(); setOn(false) } else a.play().then(() => setOn(true)).catch(() => setOk(false))
  }
  return (
    <>
      <audio ref={audio} src={import.meta.env.BASE_URL + c.music} loop preload="none" onError={() => setOk(false)} />
      <button onClick={toggle} aria-label={on ? 'Pause music' : 'Play music'} className="absolute left-4 bottom-16 z-20 grid h-12 w-12 place-items-center rounded-full bg-white/80 text-navy shadow-lg backdrop-blur hover:scale-105 transition">
        {on ? '❚❚' : '▶'}
      </button>
    </>
  )
}
