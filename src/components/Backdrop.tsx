export const Backdrop = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {/* Top-right spark glow */}
    <div
      className="absolute -top-[20vh] -right-[20vw] h-[80vh] w-[80vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(57,229,199,0.18) 0%, transparent 60%)',
        filter: 'blur(60px)',
      }}
    />
    {/* Mid-left deep marine */}
    <div
      className="absolute top-[40vh] -left-[20vw] h-[70vh] w-[70vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(14,58,95,0.55) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }}
    />
    {/* Bottom right subtle warm */}
    <div
      className="absolute bottom-[-15vh] right-[10vw] h-[60vh] w-[60vw] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(245,183,74,0.06) 0%, transparent 60%)',
        filter: 'blur(80px)',
      }}
    />
    {/* Subtle noise / grid */}
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="reup-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#E8EEF2" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#reup-grid)" />
    </svg>
  </div>
)

export const SectionSeparator = ({ flip = false }: { flip?: boolean }) => (
  <div aria-hidden className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''}`}>
    <svg
      className="block h-12 w-full md:h-16"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 40 C 240 80, 480 0, 720 40 S 1200 80, 1440 40 L 1440 80 L 0 80 Z"
        fill="rgba(57,229,199,0.04)"
      />
      <path
        d="M0 60 C 240 100, 480 20, 720 60 S 1200 100, 1440 60"
        stroke="rgba(57,229,199,0.18)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  </div>
)
