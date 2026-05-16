import { ScrollReveal } from './ScrollReveal'
import { AnchorIcon, CompassIcon } from './icons'

type Item = {
  group?: 'harbor' | 'customer' | null
  title?: string | null
  body?: string | null
  id?: string | null
}

type AudiencesProps = {
  audiences:
    | {
        eyebrow?: string | null
        heading?: string | null
        lede?: string | null
        harborLabel?: string | null
        harborSubtitle?: string | null
        customerLabel?: string | null
        customerSubtitle?: string | null
        items?: Item[] | null
      }
    | null
    | undefined
}

export const Audiences = ({ audiences }: AudiencesProps) => {
  if (!audiences) return null

  const all = audiences.items ?? []
  const harbor = all.filter((i) => (i.group ?? 'harbor') === 'harbor')
  const customer = all.filter((i) => i.group === 'customer')

  return (
    <section id="audience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          {audiences.eyebrow && <p className="eyebrow mb-4">{audiences.eyebrow}</p>}
          <div className="mb-16 max-w-3xl md:mb-24">
            {audiences.heading && (
              <h2 className="heading-display text-4xl leading-[1.05] md:text-6xl">
                {audiences.heading}
              </h2>
            )}
            {audiences.lede && (
              <p className="mt-6 max-w-2xl text-lg text-reup-mist/65 md:text-xl">
                {audiences.lede}
              </p>
            )}
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <AudienceGroup
            kind="harbor"
            label={audiences.harborLabel ?? 'For Harbors'}
            subtitle={audiences.harborSubtitle}
            items={harbor}
          />
          <AudienceGroup
            kind="customer"
            label={audiences.customerLabel ?? 'For End Customers'}
            subtitle={audiences.customerSubtitle}
            items={customer}
          />
        </div>
      </div>
    </section>
  )
}

const AudienceGroup = ({
  kind,
  label,
  subtitle,
  items,
}: {
  kind: 'harbor' | 'customer'
  label: string
  subtitle?: string | null
  items: Item[]
}) => {
  if (!items.length) return null

  const GroupIcon = kind === 'harbor' ? AnchorIcon : CompassIcon

  return (
    <ScrollReveal delay={kind === 'customer' ? 150 : 0}>
      <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.025] via-white/[0.01] to-transparent p-6 md:p-8">
        {/* Group label */}
        <header className="mb-6 flex items-center gap-4 border-b border-reup-spark/10 pb-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-reup-spark/25 bg-reup-spark/[0.07]">
            <GroupIcon size={22} />
          </span>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-reup-spark">
              {kind === 'harbor' ? 'B2B · Partners' : 'B2C · Service'}
            </p>
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl">{label}</h3>
            {subtitle && <p className="mt-1 text-sm text-reup-mist/55">{subtitle}</p>}
          </div>
        </header>

        {/* Items list */}
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={item.id ?? i}
              className="group rounded-2xl border border-white/[0.04] bg-white/[0.015] p-5 transition-all duration-300 hover:border-reup-spark/30 hover:bg-white/[0.03] md:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-reup-spark/30 font-mono text-[0.7rem] text-reup-spark">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  {item.title && (
                    <h4 className="mb-1.5 font-display text-lg font-bold text-white md:text-xl">
                      {item.title}
                    </h4>
                  )}
                  {item.body && (
                    <p className="text-sm text-reup-mist/65 md:text-base">{item.body}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Ambient corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(57,229,199,0.16) 0%, transparent 60%)',
            filter: 'blur(20px)',
          }}
        />
      </div>
    </ScrollReveal>
  )
}
