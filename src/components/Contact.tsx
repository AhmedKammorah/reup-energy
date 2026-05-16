import { ScrollReveal } from './ScrollReveal'

type ContactProps = {
  contact:
    | {
        heading?: string | null
        lede?: string | null
        email?: string | null
      }
    | null
    | undefined
}

export const Contact = ({ contact }: ContactProps) => {
  if (!contact) return null

  return (
    <section id="contact" className="relative py-32 md:py-44">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(57,229,199,0.18) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <ScrollReveal>
          <p className="eyebrow mb-5">Contact</p>
          {contact.heading && (
            <h2 className="heading-display mb-6 text-5xl leading-[1.05] md:text-7xl">
              {contact.heading}
            </h2>
          )}
          {contact.lede && (
            <p className="mx-auto mb-12 max-w-2xl text-lg text-reup-mist/70 md:text-xl">
              {contact.lede}
            </p>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-3 rounded-full border border-reup-spark/30 bg-reup-spark/5 px-7 py-4 font-display text-lg font-bold text-white backdrop-blur transition-all duration-300 hover:border-reup-spark hover:bg-reup-spark hover:text-reup-deep hover:shadow-[0_0_60px_rgba(57,229,199,0.4)] md:text-xl"
            >
              {contact.email}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
