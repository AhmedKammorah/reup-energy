import { ScrollReveal } from './ScrollReveal'

type Item = { title?: string | null; body?: string | null; id?: string | null }
type WhyProps = {
  why:
    | {
        heading?: string | null
        items?: Item[] | null
      }
    | null
    | undefined
}

export const WhyReUP = ({ why }: WhyProps) => {
  if (!why) return null

  return (
    <section id="why" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <div className="mb-14 max-w-3xl md:mb-20">
            <p className="eyebrow mb-4">Why ReUP</p>
            {why.heading && (
              <h2 className="heading-display text-4xl leading-[1.05] md:text-6xl">{why.heading}</h2>
            )}
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {(why.items ?? []).map((item, i) => (
            <ScrollReveal key={item.id ?? i} delay={i * 100}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-8 transition-all duration-300 hover:-translate-y-1 hover:border-reup-spark/30 md:p-10">
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-reup-spark/30 bg-reup-spark/5">
                  <div className="h-1.5 w-1.5 rounded-full bg-reup-spark shadow-[0_0_10px_rgba(57,229,199,0.7)]" />
                </div>
                {item.title && (
                  <h3 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl">
                    {item.title}
                  </h3>
                )}
                {item.body && (
                  <p className="text-base text-reup-mist/65 md:text-lg">{item.body}</p>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
