import { Icon } from './icons'

type StripItem = { icon?: string | null; label?: string | null; id?: string | null }

export const Strip = ({ items }: { items: StripItem[] | null | undefined }) => {
  if (!items?.length) return null

  return (
    <section className="relative">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-3 border-y border-reup-spark/10 bg-gradient-to-r from-reup-marine/0 via-reup-marine/30 to-reup-marine/0 px-6 py-5 backdrop-blur-sm md:gap-x-3">
        {items.map((item, i) => (
          <div
            key={item.id ?? i}
            className="group flex items-center gap-3 rounded-full border border-transparent px-3 py-1.5 text-sm text-reup-mist/85 transition-colors hover:border-reup-spark/15 hover:bg-white/[0.02] md:gap-3.5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-reup-spark/20 bg-reup-spark/[0.06] transition-all duration-300 group-hover:border-reup-spark/50 group-hover:bg-reup-spark/10 group-hover:shadow-[0_0_18px_rgba(57,229,199,0.35)]">
              <Icon name={item.icon} size={18} />
            </span>
            <span className="font-medium tracking-tight">{item.label}</span>
            {i < items.length - 1 && (
              <span
                aria-hidden
                className="ml-1 hidden h-4 w-px bg-gradient-to-b from-transparent via-reup-spark/25 to-transparent md:inline-block"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
