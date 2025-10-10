"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type HeroProps = {
  title: string
  subtitle?: string
  imageAlt?: string
  className?: string
}

export function Hero({ title, subtitle, imageAlt = "Satellite operations", className }: HeroProps) {
  return (
    <header className={cn("w-full", className)}>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-pretty text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mt-3 max-w-3xl text-balance text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="relative mx-auto mt-2 max-w-6xl overflow-hidden rounded-xl border bg-card">
        {/* Use a large hero placeholder image */}
        <Image
          src="/high-resolution-satellite-assembly-laboratory.jpg"
          alt={imageAlt}
          width={1200}
          height={520}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
    </header>
  )
}
