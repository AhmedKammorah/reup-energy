type Props = {
  className?: string
  compact?: boolean
}

export const Logo = ({ className, compact = false }: Props) => (
  <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
    <svg
      width={compact ? 22 : 26}
      height={compact ? 22 : 26}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="reup-bolt" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#39E5C7" />
          <stop offset="1" stopColor="#4CCFA6" />
        </linearGradient>
      </defs>
      {/* wave base */}
      <path
        d="M2 22 C 7 18, 11 26, 16 22 S 25 18, 30 22"
        stroke="#39E5C7"
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2 27 C 7 23, 11 31, 16 27 S 25 23, 30 27"
        stroke="#39E5C7"
        strokeOpacity="0.2"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* lightning bolt */}
      <path
        d="M18 3 L7 18 L14.5 18 L12 28 L24 12 L16.5 12 L18 3 Z"
        fill="url(#reup-bolt)"
      />
    </svg>
    <span className="font-display text-[1.3rem] font-extrabold tracking-tight leading-none">
      Re<span className="text-reup-spark">UP</span>
      <span className="text-reup-spark">.</span>
    </span>
  </span>
)
