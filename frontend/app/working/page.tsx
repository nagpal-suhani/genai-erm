export default function WorkingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
      <header className="mb-8">
        {/* <p className="text-xs uppercase tracking-widest text-muted-foreground">How it works</p> */}
        <h1 className="font-display text-4xl font-black text-foreground">how it works?</h1>
        <p className="mt-0 max-w-2xl text-sm text-muted-foreground">
          From the ML Model, to the wesbite's backend and frontend, here's how it all comes together.
        </p>
      </header>

      {/* Input the 3 images using multer */}
      <form
        action="http://127.0.0.1:8080/api/upload/"
        method="post"
        encType="multipart/form-data"
        className="mt-6"
      >
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Year-1 photo", "Year-2 photo", "Year-3 photo"].map((label, i) => (
            <label
              key={i}
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border/50 bg-card p-6 text-center cursor-pointer hover:border-primary/60"
            >
              <div className="flex h-28 w-full max-w-xs flex-col items-center justify-center rounded-md bg-muted/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11l2 2 4-4" />
                </svg>
                <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground">PNG / JPG • recommended 1024×1024</p>
              </div>

              <input
                type="file"
                name="images"
                accept="image/*"
                required
                className="sr-only"
              />

              <span className="mt-1 inline-block rounded bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                Click to choose file
              </span>
            </label>
          ))}
        </section>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Upload three images: any years of satellite photos of the same location.
          </p>
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Upload images
          </button>
        </div>
      </form>

{/* Commenting out not-related-do not remove but */}
      {/* <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
      </section> */}

      {/* <section className="mt-10 rounded-lg border border-border/50 bg-card p-6">
        <h2 className="font-display text-xl font-semibold text-foreground">Plain-Language Reporting</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Generates simple summaries and actionable recommendations for decision-makers across agencies and NGOs.
        </p>
      </section> */}


    </main>
  )
}
