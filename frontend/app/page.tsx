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
      <section id="key-features" aria-labelledby="ground-control-heading" className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-center text-xs uppercase tracking-wide text-muted-foreground">What does this feature</p>
        <h2 id="ground-control-heading" className="mt-2 text-center text-2xl font-bold md:text-3xl">
          Key features
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          Orchestrating satellite constellations and processing the data they collect to deliver actionable insights to
          decision‑makers around the world.
        </p>

        {/* Feature grid - row 1 */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <FeatureCard
            title="AI Image Analysis"
            description="Classifies forests, urban areas, and water bodies from multi‑spectral imagery. Detects change regions with explainable overlays."
            imageQuery="satellite%20imagery%20classification%20map%20overlay"
          />
          <FeatureCard
            title="Metrics Computation"
            description="Calculates change percentages and trends over time at national, regional, and site scales with transparent methods."
            imageQuery="geospatial%20dashboard%20metrics%20charts"
          />
          <FeatureCard
            title="Predictive Modeling"
            description="Forecasts deforestation, urban growth, and water depletion using time‑series models tuned to local conditions."
            imageQuery="predictive%20map%20forecast%20raster%20layers"
          />
        </div>

        {/* Feature grid - row 2 */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <FeatureCard
            title="Report Generation"
            description="Produces plain‑language briefings and recommendations for decision‑makers—combining trends, current metrics, and forecasts."
            imageQuery="report%20document%20summary%20with%20charts"
          />
          <FeatureCard
            title="Change History Explorer"
            description="Browse historical baselines with interactive timelines to validate interventions and quantify impact."
            imageQuery="time-series%20map%20slider%20environment"
          />
          <FeatureCard
            title="Geospatial API"
            description="Standards‑based endpoints deliver tiles, vector data, and insights for integration with existing systems."
            imageQuery="api%20endpoint%20map%20integration%20architecture"
          />
        </div>
      </section>

      <FeatureBanner />

      {/* Earth Observation & Science */}
      <section id="earth-observation" aria-labelledby="eo-heading" className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-center text-xs uppercase tracking-wide text-muted-foreground">
          Earth Observation &amp; Science
        </p>
        <h2 id="eo-heading" className="mt-2 text-center text-2xl font-semibold md:text-3xl">
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
