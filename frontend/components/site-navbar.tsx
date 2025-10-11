"use client"

import Link from "next/link"
import { useState } from "react"

export default function SiteNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8" aria-label="Main">
        <Link href="/" className="flex items-center gap-2" aria-label="GenAI Earth Resource Monitor home">
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            GenAI Earth Resource Monitor
          </span>
        </Link>

        <button
          className="inline-flex items-center justify-center rounded-md border border-border/60 px-3 py-2 text-sm text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#overview" className="text-sm text-foreground/80 hover:text-foreground">
            Overview
          </Link>
          <Link href="/#features" className="text-sm text-foreground/80 hover:text-foreground">
            Features
          </Link>
          <Link href="/working" className="text-sm text-foreground/80 hover:text-foreground">
            Working
          </Link>
          <Link href="/#contact" className="text-sm text-foreground/80 hover:text-foreground">
            Contact
          </Link>
          <Link
            href="/#contact"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            Get a Demo
          </Link>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border/50 md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 lg:px-8">
            <div className="flex flex-col gap-3">
              <Link onClick={() => setOpen(false)} href="/#overview" className="text-sm text-foreground/90">
                Overview
              </Link>
              <Link onClick={() => setOpen(false)} href="/#features" className="text-sm text-foreground/90">
                Features
              </Link>
              <Link onClick={() => setOpen(false)} href="/working" className="text-sm text-foreground/90">
                Working
              </Link>
              <Link onClick={() => setOpen(false)} href="/#contact" className="text-sm text-foreground/90">
                Contact
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/#contact"
                className="mt-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
              >
                Get a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
