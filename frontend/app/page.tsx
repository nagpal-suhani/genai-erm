import { Hero } from "@/components/hero"
import { Subnav } from "@/components/subnav"
import { FeatureCard } from "@/components/feature-card"
import { FeatureBanner } from "@/components/feature-banner"
import ContactSection from "@/components/contact-section"

export default function Page() {
  return (
    <main>
      <Hero
        title="GenAI Earth Resource Monitor"
        subtitle="GenAI provides end‑to‑end earth resource monitoring — from ground control systems to on‑orbit sensors — to keep our customers informed and ahead of change."
        imageAlt="Technicians preparing an on-orbit instrument"
      />

      <section className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
        <p>
          Home / Key features / <span className="text-foreground">GenAI Earth Resource Monitor</span>
        </p>
      </section>

      <Subnav />

      {/* Ground Control Section */}
      <section
        id="key-features"
        aria-labelledby="ground-control-heading"
        className="scroll-mt-20 mx-auto max-w-6xl px-4 py-12"
      >
        <p className="text-center text-xs uppercase tracking-wide text-muted-foreground">What does this feature</p>
        <h2 id="ground-control-heading" className="mt-2 text-center text-2xl font-black md:text-3xl">
          Key features
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          Orchestrating satellite constellations and processing the data they collect to deliver actionable insights to
          decision‑makers around the world.
        </p>

        {/* Feature grid - row 1 */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3">
          <FeatureCard
            title="Predictions for Future"
            description="Forecast land use changes and environmental trends using advanced AI models."
            imageQuery="../key-features/future-predict.jpg"
          />
          <FeatureCard
            title="Summaries of Land Use"
            description="Generate concise summaries of land cover, urbanization, and natural resources."
            imageQuery="../key-features/land-use.jpg"
          />
          <FeatureCard
            title="Report & Summary Generation"
            description="Create downloadable reports and executive summaries for stakeholders."
            imageQuery="../key-features/summary-generation.jpg"
          />
          <FeatureCard
            title="Visualization"
            description="Visualize changes with interactive maps, charts, and image overlays."
            imageQuery="../key-features/visualiz.jpg"
          />
          <FeatureCard
            title="Multi-Year Comparisons"
            description="Compare land use and cover across years for trend analysis."
            imageQuery="../key-features/multi-year.jpg"
          />
          <FeatureCard
            title="Interactive Maps"
            description="Explore change layers, overlay timelines, and toggle data layers to answer specific on‑the‑ground questions."
            imageQuery="../key-features/interactive-maps.jpg"
          />
        </div>
      </section>

      <FeatureBanner />

      {/* Earth Observation & Science */}
      <section
        id="earth-observation"
        aria-labelledby="eo-heading"
        className="scroll-mt-20 mx-auto max-w-6xl px-4 py-12"
      >
        <p className="text-center text-xs uppercase tracking-wide text-muted-foreground">
          Earth Observation &amp; Science
        </p>
        <h2 id="eo-heading" className="mt-2 text-center text-2xl font-black md:text-3xl">
          Earth Observation &amp; Science
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          Our space‑based active and passive sensing technologies are at the cutting edge of data collection for Earth
          observation. GENAI Earth Resource Monitor fuses these streams to generate actionable, accessible insight.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <img
            src="/environmental-testing-of-satellite-instrument.jpg"
            alt="Environmental testing of a satellite instrument"
            className="h-auto w-full rounded-xl border object-cover"
          />
          <div className="flex flex-col justify-center gap-4">
            <h3 className="text-xl font-semibold">Proposed Solution • 04/09</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              By combining easy‑to‑understand analysis, predictions, and recommendations, this platform helps
              governments, NGOs, and researchers make smarter, more proactive decisions for a sustainable future.
            </p>
            <ul className="grid gap-3 text-sm">
              <li>
                <span className="font-medium text-foreground">AI Image Analysis</span> — Classifies forests, urban
                areas, and water bodies.
              </li>
              <li>
                <span className="font-medium text-foreground">Metrics Computation</span> — Calculates change percentages
                and trends over time.
              </li>
              <li>
                <span className="font-medium text-foreground">Predictive Modeling</span> — Forecasts environmental
                changes.
              </li>
              <li>
                <span className="font-medium text-foreground">Report Generation</span> — Produces plain‑language
                summaries with recommendations.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Add a dedicated Contact section to anchor from navbar */}
      <ContactSection />
    </main>
  )
}
