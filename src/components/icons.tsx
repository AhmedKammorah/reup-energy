import type { SVGProps, ReactElement } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size: number) =>
  ({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  }) as const

/* ────────── Bolt (Power / kW) ────────── */
export const BoltIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <defs>
      <linearGradient id="reup-bolt-grad" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0" stopColor="#39E5C7" />
        <stop offset="1" stopColor="#4CCFA6" />
      </linearGradient>
    </defs>
    <path
      d="M13.4 2.2 5.6 12.4a.7.7 0 0 0 .56 1.12h4.6L9.8 21.4a.6.6 0 0 0 1.06.46l8.06-11.5a.7.7 0 0 0-.57-1.1h-4.69l1.2-6.7a.6.6 0 0 0-1.06-.46Z"
      fill="url(#reup-bolt-grad)"
    />
    <path
      d="M13.4 2.2 5.6 12.4a.7.7 0 0 0 .56 1.12h4.6L9.8 21.4a.6.6 0 0 0 1.06.46l8.06-11.5a.7.7 0 0 0-.57-1.1h-4.69l1.2-6.7a.6.6 0 0 0-1.06-.46Z"
      stroke="#0A1F33"
      strokeOpacity="0.2"
      strokeWidth="0.5"
    />
  </svg>
)

/* ────────── Shield · Wave (Marine-grade IP67) ────────── */
export const ShieldWaveIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path
      d="M12 2.5 4.5 5v6.4c0 4.7 3.2 8.4 7.5 10.1 4.3-1.7 7.5-5.4 7.5-10.1V5L12 2.5Z"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M7 13.2c1.2-1 2 .8 3.2 0s1.6-1.8 2.8-1 1.8 1.6 3.2 1"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 16.4c1-.8 1.6.6 2.6 0s1.4-1.4 2.4-.8 1.6 1.2 2.6.8"
      stroke="#39E5C7"
      strokeOpacity="0.5"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

/* ────────── Silent (Silent at the dock) ────────── */
export const SilentIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path
      d="M11.3 4.5 6.6 8.3H3.8a1 1 0 0 0-1 1v5.4a1 1 0 0 0 1 1h2.8l4.7 3.8a.6.6 0 0 0 1-.46V4.96a.6.6 0 0 0-1-.46Z"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="m16 9 5 6m0-6-5 6"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

/* ────────── Tap (One-tap booking) ────────── */
export const TapIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    {/* Concentric ripples */}
    <circle cx="12" cy="12" r="3" stroke="#39E5C7" strokeWidth="1.5" />
    <path
      d="M7.5 7.5a6.5 6.5 0 0 0 0 9"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    <path
      d="M16.5 7.5a6.5 6.5 0 0 1 0 9"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    <path
      d="M4.5 4.5a10 10 0 0 0 0 15"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.35"
    />
    <path
      d="M19.5 4.5a10 10 0 0 1 0 15"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.35"
    />
    {/* Center filled dot */}
    <circle cx="12" cy="12" r="1.4" fill="#39E5C7" />
  </svg>
)

/* ────────── Anchor (Harbor partners) ────────── */
export const AnchorIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="5.5" r="1.8" stroke="#39E5C7" strokeWidth="1.5" />
    <path d="M12 7.3v12.2" stroke="#39E5C7" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.5 10h7" stroke="#39E5C7" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M4.5 14.5c.4 3 3.6 5 7.5 5s7.1-2 7.5-5"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M3 14.5h3M18 14.5h3" stroke="#39E5C7" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/* ────────── Compass (Captains / Owners) ────────── */
export const CompassIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="12" r="9" stroke="#39E5C7" strokeWidth="1.5" />
    <path
      d="m14.2 9.8-4.4 1.4-1.4 4.4 4.4-1.4 1.4-4.4Z"
      fill="#39E5C7"
      fillOpacity="0.15"
      stroke="#39E5C7"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="0.9" fill="#39E5C7" />
  </svg>
)

/* ────────── Map for icons used in Strip via CMS key ────────── */
export const ICON_MAP = {
  bolt: BoltIcon,
  shield: ShieldWaveIcon,
  silent: SilentIcon,
  tap: TapIcon,
  anchor: AnchorIcon,
  compass: CompassIcon,
} as const

export type IconKey = keyof typeof ICON_MAP

export const Icon = ({
  name,
  size = 22,
  className,
}: {
  name?: string | null
  size?: number
  className?: string
}) => {
  if (!name) return null
  const key = name.trim().toLowerCase()
  const Cmp = (ICON_MAP as Record<string, (props: IconProps) => ReactElement>)[key]
  if (!Cmp) {
    // Backward compat: render literal (emoji / text) if the CMS still holds an emoji
    return <span className={className}>{name}</span>
  }
  return <Cmp size={size} className={className} />
}
