type CTA = { label?: string | null; href?: string | null }
type Pill = { label?: string | null; id?: string | null }
type HeroProps = {
  hero:
    | {
        eyebrow?: string | null
        heading?: string | null
        headingHighlight?: string | null
        lede?: string | null
        primaryCTA?: CTA | null
        secondaryCTA?: CTA | null
        audiencePills?: Pill[] | null
      }
    | null
    | undefined
}

export const Hero = ({ hero }: HeroProps) => {
  if (!hero) return null

  return (
    <section className="relative isolate overflow-hidden pb-28 pt-40 md:pb-36 md:pt-52">
      {/* Animated SVG ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <svg
          className="absolute right-[-10%] top-[10%] h-[80%] w-[80%] opacity-70"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="hero-orb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#39E5C7" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#39E5C7" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#39E5C7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hero-line" x1="0" y1="0" x2="600" y2="600">
              <stop offset="0" stopColor="#39E5C7" stopOpacity="0" />
              <stop offset="0.5" stopColor="#39E5C7" stopOpacity="0.5" />
              <stop offset="1" stopColor="#39E5C7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="300" r="220" fill="url(#hero-orb)" />
          <g stroke="url(#hero-line)" strokeWidth="0.8" fill="none" opacity="0.6">
            <circle cx="300" cy="300" r="160" />
            <circle cx="300" cy="300" r="240" />
            <circle cx="300" cy="300" r="320" />
          </g>
        </svg>

        {/* Subtle wave at the base */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0 140 C 200 100, 360 180, 600 140 S 1000 100, 1200 140 S 1400 160, 1440 140 L 1440 200 L 0 200 Z"
            fill="rgba(14,58,95,0.4)"
          />
          <path
            d="M0 160 C 200 130, 360 190, 600 160 S 1000 130, 1200 160 S 1400 180, 1440 160"
            stroke="rgba(57,229,199,0.3)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        {hero.eyebrow && (
          <p className="eyebrow mb-7 fade-in-up" style={{ animationDelay: '0.05s' }}>
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-reup-spark align-middle shadow-[0_0_12px_rgba(57,229,199,0.8)]" />
            {hero.eyebrow}
          </p>
        )}
        <h1
          className="heading-display mb-7 max-w-5xl text-[3.25rem] leading-[1.02] md:text-[5.5rem] lg:text-[6.5rem] fade-in-up"
          style={{ animationDelay: '0.18s' }}
        >
          {hero.heading}
          {hero.headingHighlight && (
            <>
              <br />
              <span className="relative inline-block text-reup-spark">
                {hero.headingHighlight}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-reup-spark/80 via-reup-spark/40 to-transparent"
                />
              </span>
            </>
          )}
        </h1>
        {hero.lede && (
          <p
            className="mb-11 max-w-2xl text-lg text-reup-mist/75 md:text-xl fade-in-up"
            style={{ animationDelay: '0.32s' }}
          >
            {hero.lede}
          </p>
        )}
        <div className="flex flex-wrap gap-3 fade-in-up" style={{ animationDelay: '0.46s' }}>
          {hero.primaryCTA?.label && (
            <a href={hero.primaryCTA.href ?? '#'} className="btn-primary group">
              <span>{hero.primaryCTA.label}</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          )}
          {hero.secondaryCTA?.label && (
            <a href={hero.secondaryCTA.href ?? '#'} className="btn-secondary">
              {hero.secondaryCTA.label}
            </a>
          )}
        </div>

        {/* Audience pills — the dual-audience signal */}
        {hero.audiencePills && hero.audiencePills.length > 0 && (
          <div
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-reup-mist/40">
              Built for
            </span>
            <span className="h-px w-6 bg-reup-mist/20" />
            {hero.audiencePills.map((pill, i) => (
              <span
                key={pill.id ?? i}
                className="rounded-full border border-reup-spark/15 bg-reup-spark/[0.04] px-3 py-1 text-xs font-medium text-reup-mist/85 transition-colors hover:border-reup-spark/40 hover:text-reup-spark"
              >
                {pill.label}
              </span>
            ))}
          </div>
        )}

        {/* Decorative scroll cue */}
        <div
          className="mt-20 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-reup-mist/40 fade-in-up md:flex"
          style={{ animationDelay: '0.75s' }}
        >
          <span className="h-px w-12 bg-reup-mist/30" />
          Scroll
        </div>
      </div>
    </section>
  )
}
