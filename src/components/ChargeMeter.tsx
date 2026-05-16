'use client'

import { useEffect, useState } from 'react'

type Phase = {
  state: string
  power: number
  kwh: number
  duration: number
  status: 'idle' | 'transit' | 'connected' | 'charging' | 'complete'
}

const SCRIPT: Phase[] = [
  { state: 'Requested', power: 0, kwh: 0, duration: 1600, status: 'idle' },
  { state: 'Dispatched · ETA 18 min', power: 0, kwh: 0, duration: 2200, status: 'transit' },
  { state: 'Operator at berth A12', power: 0, kwh: 0, duration: 1800, status: 'connected' },
  { state: 'Charging', power: 48, kwh: 0, duration: 5200, status: 'charging' },
  { state: 'Session complete', power: 0, kwh: 120, duration: 2400, status: 'complete' },
]

export const ChargeMeter = () => {
  const [step, setStep] = useState(0)
  const [tickKwh, setTickKwh] = useState(0)

  // Cycle through phases
  useEffect(() => {
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % SCRIPT.length)
      setTickKwh(0)
    }, SCRIPT[step].duration)
    return () => clearTimeout(t)
  }, [step])

  // During the "charging" phase, animate the kWh ticker
  useEffect(() => {
    const phase = SCRIPT[step]
    if (phase.status !== 'charging') return
    let raf = 0
    const start = performance.now()
    const duration = phase.duration
    const target = 120
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setTickKwh(target * t)
      if (t < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [step])

  const phase = SCRIPT[step]
  const displayKwh =
    phase.status === 'complete' ? phase.kwh : phase.status === 'charging' ? tickKwh : 0
  const pct = Math.min(100, (displayKwh / 120) * 100)

  const statusColor: Record<Phase['status'], string> = {
    idle: 'bg-reup-warning',
    transit: 'bg-reup-warning',
    connected: 'bg-reup-spark',
    charging: 'bg-reup-ok',
    complete: 'bg-reup-ok',
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-reup-spark/15 bg-gradient-to-br from-reup-deep to-reup-marine p-7 shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:p-9">
      {/* Top: status row */}
      <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.25em]">
        <div className="flex items-center gap-2 text-reup-mist/50">
          <span className="font-mono">MPU · M-001</span>
        </div>
        <div className="flex items-center gap-2 text-reup-mist/80">
          <span className={`relative inline-block h-2 w-2 rounded-full ${statusColor[phase.status]}`}>
            <span
              className={`absolute inset-0 animate-ping rounded-full ${statusColor[phase.status]} opacity-60`}
            />
          </span>
          {phase.state}
        </div>
      </div>

      {/* Center: live readouts */}
      <div className="mb-6 grid grid-cols-3 gap-4 border-y border-white/5 py-6">
        <Readout label="Power" value={phase.power.toFixed(0)} unit="kW" />
        <Readout
          label="Delivered"
          value={displayKwh.toFixed(displayKwh >= 100 ? 0 : 1)}
          unit="kWh"
        />
        <Readout label="Target" value="120" unit="kWh" muted />
      </div>

      {/* Progress arc */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-reup-mist/50">
          <span className="font-mono">Session progress</span>
          <span className="font-mono">{pct.toFixed(0)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full bg-gradient-to-r from-reup-spark to-reup-ok transition-all duration-300 ease-out"
            style={{ width: `${pct}%`, boxShadow: '0 0 18px rgba(57,229,199,0.5)' }}
          />
        </div>
      </div>

      {/* Mini timeline */}
      <div className="grid grid-cols-5 gap-2 text-[0.65rem] uppercase tracking-[0.15em] text-reup-mist/30 md:gap-3">
        {SCRIPT.map((p, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 truncate ${
              i === step ? 'text-reup-spark' : i < step ? 'text-reup-mist/60' : ''
            }`}
          >
            <span
              className={`h-1 w-1 shrink-0 rounded-full ${
                i <= step ? 'bg-reup-spark' : 'bg-reup-mist/20'
              }`}
            />
            <span className="truncate">{['Request', 'Dispatch', 'Arrive', 'Charge', 'Done'][i]}</span>
          </div>
        ))}
      </div>

      {/* Side ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(57,229,199,0.35) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  )
}

const Readout = ({
  label,
  value,
  unit,
  muted = false,
}: {
  label: string
  value: string
  unit: string
  muted?: boolean
}) => (
  <div>
    <p className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-reup-mist/40">{label}</p>
    <p className={`flex items-baseline gap-1 font-display font-extrabold ${muted ? 'text-reup-mist/40' : 'text-white'}`}>
      <span className="text-3xl md:text-4xl">{value}</span>
      <span className="text-sm text-reup-spark md:text-base">{unit}</span>
    </p>
  </div>
)
