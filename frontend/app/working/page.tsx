export default function WorkingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">How it works</p>
        <h1 className="font-display text-3xl font-semibold text-foreground">Inside GenAI Earth Resource Monitor</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          From satellite imagery to plain-language insights: our pipeline computes metrics, detects changes, and
          forecasts trends.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <article className="rounded-lg border border-border/50 bg-card p-5">
          <h2 className="font-display text-xl font-semibold text-foreground">AI Image Analysis</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Classifies forests, urban areas, and water bodies. Extracts polygons and computes surface coverage.
          </p>
        </article>
        <article className="rounded-lg border border-border/50 bg-card p-5">
          <h2 className="font-display text-xl font-semibold text-foreground">Metrics & Trends</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Calculates change percentages over time and highlights statistically significant shifts.
          </p>
        </article>
        <article className="rounded-lg border border-border/50 bg-card p-5">
          <h2 className="font-display text-xl font-semibold text-foreground">Predictive Modeling</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Forecasts deforestation, urban growth, and water depletion using time-series models.
          </p>
        </article>
      </section>

      <section className="mt-10 rounded-lg border border-border/50 bg-card p-6">
        <h2 className="font-display text-xl font-semibold text-foreground">Plain-Language Reporting</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Generates simple summaries and actionable recommendations for decision-makers across agencies and NGOs.
        </p>
      </section>
    </main>
  )
}
