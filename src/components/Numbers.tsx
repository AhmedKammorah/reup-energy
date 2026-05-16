import { ScrollReveal } from './ScrollReveal'

type Item = {
  value?: string | null
  unit?: string | null
  label?: string | null
  footnote?: string | null
  id?: string | null
}

type NumbersProps = {
  numbers:
    | {
        eyebrow?: string | null
        heading?: string | null
        items?: Item[] | null
      }
    | null
    | undefined
}

export const Numbers = ({ numbers }: NumbersProps) => {
  if (!numbers?.items?.length) return null

  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <div className="mb-14 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {numbers.eyebrow && <p className="eyebrow mb-4">{numbers.eyebrow}</p>}
              {numbers.heading && (
                <h2 className="heading-display text-4xl leading-[1.05] md:text-6xl">
                  {numbers.heading}
                </h2>
              )}
            </div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-reup-spark/40 to-transparent md:block md:ml-10 md:mb-3" />
          </div>
        </ScrollReveal>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-reup-spark/15 bg-reup-spark/10 md:grid-cols-3">
          {numbers.items.map((item, i) => (
            <ScrollReveal
              key={item.id ?? i}
              delay={i * 120}
              className="flex flex-col justify-between bg-reup-deep p-8 md:p-10"
            >
              <div className="mb-10 flex items-baseline gap-2">
                <span className="heading-display text-6xl text-white md:text-7xl">
                  {item.value}
                </span>
                {item.unit && (
                  <span className="font-display text-2xl text-reup-spark md:text-3xl">
                    {item.unit}
                  </span>
                )}
              </div>
              <div>
                {item.label && (
                  <p className="mb-1 text-base font-medium text-reup-mist md:text-lg">
                    {item.label}
                  </p>
                )}
                {item.footnote && (
                  <p className="text-sm text-reup-mist/50">{item.footnote}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
