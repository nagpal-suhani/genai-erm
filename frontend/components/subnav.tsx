"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const items = [
  { href: "#key-features", label: "Key features" },
  { href: "#earth-observation", label: "Earth Observation & Science" },
]

export function Subnav() {
  const [active, setActive] = useState<string>(items[0].href)

  useEffect(() => {
    const onScroll = () => {
      for (const it of items) {
        const el = document.querySelector(it.href) as HTMLElement | null
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(it.href)
          break
        }
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className="sticky top-16 z-30 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "py-3 text-sm font-medium transition-colors",
              active === it.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
