import { ScrollReveal } from './ScrollReveal'

type Item = {
  name?: string | null
  location?: string | null
  status?: 'prospect' | 'mou' | 'active' | null
  id?: string | null
}

type PilotProps = {
  pilotMarinas:
    | {
        eyebrow?: string | null
        heading?: string | null
        lede?: string | null
        items?: Item[] | null
      }
    | null
    | undefined
}

const statusLabel: Record<NonNullable<Item['status']>, string> = {
  prospect: 'In conversation',
  mou: 'MOU signed',
  active: 'Live',
}

const statusDot: Record<NonNullable<Item['status']>, string> = {
  prospect: 'bg-reup-warning',
  mou: 'bg-reup-spark',
  active: 'bg-reup-ok',
}

export const PilotMarinas = ({ pilotMarinas }: PilotProps) => {
  if (!pilotMarinas?.items?.length) return null

  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <div className="mb-14 flex flex-col items-start gap-4 md:mb-20">
            {pilotMarinas.eyebrow && <p className="eyebrow mb-1">{pilotMarinas.eyebrow}</p>}
            {pilotMarinas.heading && (
              <h2 className="heading-display max-w-3xl text-4xl leading-[1.05] md:text-6xl">
                {pilotMarinas.heading}
              </h2>
            )}
            {pilotMarinas.lede && (
              <p className="mt-2 max-w-2xl text-lg text-reup-mist/65 md:text-xl">
                {pilotMarinas.lede}
              </p>
            )}
          </div>
        </ScrollReveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pilotMarinas.items.map((item, i) => {
            const status = item.status ?? 'prospect'
            return (
              <ScrollReveal key={item.id ?? i} delay={i * 60}>
                <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-reup-spark/30 md:p-8">
                  <div>
                    <div className="mb-6 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-reup-mist/60">
                      <span className={`relative inline-block h-1.5 w-1.5 rounded-full ${statusDot[status]}`}>
                        <span
                          className={`absolute inset-0 animate-ping rounded-full ${statusDot[status]} opacity-60`}
                        />
                      </span>
                      {statusLabel[status]}
                    </div>
                    <h3 className="mb-1 font-display text-2xl font-bold text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-reup-mist/55">{item.location}</p>
                  </div>

                  {/* Decorative compass arrow */}
                  <div className="mt-8 flex items-center justify-between">
                    <div className="h-px flex-1 bg-gradient-to-r from-reup-spark/20 to-transparent" />
                    <span className="ml-3 font-mono text-xs text-reup-mist/30">
                      0{(i % 9) + 1}
                    </span>
                  </div>

                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(57,229,199,0.25) 0%, transparent 60%)',
                      filter: 'blur(20px)',
                    }}
                  />
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
