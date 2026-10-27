import { useState } from 'react'
import Reveal from './Reveal'
import { weddingConfig as c } from '../weddingConfig'
const field = 'w-full rounded-xl border border-gold/60 bg-white/80 px-4 py-3 font-ui text-sm outline-none focus:ring-2 focus:ring-gold'
export default function Rsvp() {
  const r = c.rsvp
  const [f, setF] = useState({ name: '', guests: '1', attending: 'yes', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const text = `RSVP for ${c.couple.groom} & ${c.couple.bride}%0AName: ${f.name}%0AAttending: ${f.attending}%0AGuests: ${f.guests}%0AMessage: ${f.message}`
    window.open(`https://wa.me/${r.whatsappNumber}?text=${text}`, '_blank')
    setSent(true)
  }
  return (
    <section className="px-4 py-16 sm:py-24 bg-cream">
      <Reveal className="mx-auto max-w-md text-center">
        <p className="font-script text-6xl text-maroon">{r.script}</p>
        <h2 className="font-display text-navy mb-1">{r.heading}</h2>
        <p className="mb-6 text-sm">{r.note}</p>
        {sent ? (
          <p className="rounded-xl bg-gold/20 p-6 font-display text-maroon">Thank you, {f.name}! We look forward to seeing you.</p>
        ) : (
          <form onSubmit={submit} className="space-y-3 text-left">
            <input required className={field} placeholder="Your name" value={f.name} onChange={set('name')} />
            <div className="grid grid-cols-2 gap-3">
              <select className={field} value={f.attending} onChange={set('attending')}><option value="yes">Joyfully attending</option><option value="no">Regretfully declining</option></select>
              <input type="number" min="1" max="10" className={field} value={f.guests} onChange={set('guests')} aria-label="Number of guests" />
            </div>
            <textarea rows="3" className={field} placeholder="A message for the couple" value={f.message} onChange={set('message')} />
            <button className="w-full rounded-full bg-maroon py-3 font-ui text-sm font-semibold text-cream hover:bg-navy transition">Send RSVP on WhatsApp</button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
