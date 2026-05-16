import { Logo } from './Logo'

type FooterProps = {
  footer:
    | {
        copyright?: string | null
        note?: string | null
      }
    | null
    | undefined
}

export const Footer = ({ footer }: FooterProps) => (
  <footer className="relative border-t border-reup-spark/10 bg-[#061320] px-6 py-16 md:px-10">
    {/* Wave decoration */}
    <svg
      aria-hidden
      className="absolute -top-px left-0 w-full"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
    >
      <path
        d="M0 30 C 360 60, 720 0, 1080 30 S 1440 60, 1440 30"
        stroke="rgba(57,229,199,0.15)"
        strokeWidth="1"
        fill="none"
      />
    </svg>

    <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center text-reup-mist/60 md:flex-row md:justify-between md:text-left">
      <div className="flex items-center gap-3">
        <Logo />
      </div>
      <div className="flex flex-col items-center gap-1 md:items-end">
        {footer?.copyright && <p className="text-sm">{footer.copyright}</p>}
        {footer?.note && <p className="text-xs text-reup-mist/35">{footer.note}</p>}
      </div>
    </div>
  </footer>
)
