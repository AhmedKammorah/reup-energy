import { ChargeMeter } from './ChargeMeter'
import { ScrollReveal } from './ScrollReveal'

type Step = { num?: string | null; title?: string | null; body?: string | null; id?: string | null }
type HowProps = {
  how:
    | {
        heading?: string | null
        lede?: string | null
        steps?: Step[] | null
      }
    | null
    | undefined
}

export const HowItWorks = ({ how }: HowProps) => {
  if (!how) return null

  return (
    <section id="how" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <p className="eyebrow mb-4">How it works</p>
          <div className="mb-14 max-w-3xl md:mb-20">
            {how.heading && (
              <h2 className="heading-display text-4xl leading-[1.05] md:text-6xl">
                {how.heading}
              </h2>
            )}
            {how.lede && (
              <p className="mt-6 max-w-2xl text-lg text-reup-mist/65 md:text-xl">{how.lede}</p>
            )}
          </div>
        </ScrollReveal>

        <div className="grid items-start gap-14 lg:grid-cols-12">
          {/* Left: numbered steps */}
          <div className="lg:col-span-7 space-y-3">
            {(how.steps ?? []).map((step, i) => (
              <ScrollReveal key={step.id ?? i} delay={i * 100}>
                <article className="group relative flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-reup-spark/30 hover:bg-white/[0.04] md:p-8">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="font-display text-2xl text-reup-spark/70 transition-colors group-hover:text-reup-spark">
                      {step.num}
                    </div>
                    {i < (how.steps?.length ?? 0) - 1 && (
                      <div className="mt-3 h-12 w-px bg-gradient-to-b from-reup-spark/30 to-transparent md:h-16" />
                    )}
                  </div>
                  <div>
                    {step.title && (
                      <h3 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl">
                        {step.title}
                      </h3>
                    )}
                    {step.body && (
                      <p className="text-base text-reup-mist/65 md:text-lg">{step.body}</p>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: operating console */}
          <ScrollReveal delay={200} className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-reup-mist/40">
              <span className="font-mono">Live</span>
              <span className="h-px flex-1 bg-white/10" />
              <span className="font-mono">Mock session</span>
            </div>
            <ChargeMeter />
            <p className="mt-4 text-xs text-reup-mist/40">
              A simulated ReUP session — real telemetry replaces this once we go live.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
