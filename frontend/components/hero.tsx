"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import ReactCompareImage from "react-compare-image";
// Import local visualization image so Next.js can optimize/resolve it
import img1 from '../../model/analysis_results/visualizations/madagascar_2003_segmentation_mask.png'
import img2 from '../../model/images/madagascar_2003.png'

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
        {/* <Image
          src={img2}
          alt={imageAlt}
          width={1200}
          height={520}
          className="h-auto w-full object-cover"
          priority
        /> */}
        
        <ReactCompareImage
          leftImage={img1.src}
          rightImage={img2.src}
        />

      </div>
    </header>
  )
}
