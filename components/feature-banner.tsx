import Image from "next/image"
import { Button } from "@/components/ui/button"

export function FeatureBanner() {
  return (
    <section aria-labelledby="feature" className="mx-auto my-12 max-w-6xl px-4">
      <div className="grid grid-cols-1 overflow-hidden rounded-xl border md:grid-cols-2">
        <div className="bg-primary p-8 text-primary-foreground">
          <p className="text-xs uppercase tracking-wide opacity-90">Feature Story</p>
          <h3 id="feature" className="mt-2 text-pretty text-2xl font-semibold md:text-3xl">
            What it’s like to watch a launch in person
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed">
            Experience the mission pipeline—from imagery downlink to real-time alerts—through an interactive launch demo
            tailored for decision-makers.
          </p>
          <Button className="mt-6">Read More</Button>
        </div>
        <div className="relative h-64 w-full md:h-full">
          <Image src="/night-rocket-launch-long-exposure.jpg" alt="Rocket launch at night" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
