'use client'

import { useEffect, useState } from 'react'
import { Logo } from './Logo'

type NavLink = { label?: string | null; href?: string | null; id?: string | null }

export const Nav = ({ navLinks }: { navLinks: NavLink[] | null | undefined }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'pt-3' : 'pt-5'
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'max-w-3xl rounded-full border border-reup-spark/15 bg-reup-deep/80 px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl'
            : 'max-w-7xl border border-transparent px-6 py-4 md:px-10'
        }`}
      >
        <a href="/" className="shrink-0">
          <Logo compact={scrolled} />
        </a>
        <nav className="flex items-center gap-2 text-sm md:gap-1">
          {(navLinks ?? []).map((link, i) => (
            <a
              key={link.id ?? i}
              href={link.href ?? '#'}
              className="hidden rounded-full px-3 py-1.5 text-reup-mist/80 transition hover:bg-white/5 hover:text-reup-spark md:inline-block"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-reup-spark px-4 py-1.5 font-semibold text-reup-deep transition hover:shadow-[0_0_30px_rgba(57,229,199,0.4)]"
          >
            Contact
            <span aria-hidden>→</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
