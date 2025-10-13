export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-18 mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
      <h2 id="contact-title" className="mt-2 font-display text-2xl font-semibold text-foreground">
        Get in touch
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Have questions or want a personalized demo? Send us a note and we’ll get back within one business day.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <form className="rounded-lg border border-border/50 bg-card p-4">
          <label className="block text-sm text-foreground">
            Name
            <input
              className="mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
              placeholder="Your name"
            />
          </label>
          <label className="mt-4 block text-sm text-foreground">
            Email
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
              placeholder="you@company.com"
            />
          </label>
          <label className="mt-4 block text-sm text-foreground">
            Message
            <textarea
              className="mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
              rows={4}
              placeholder="How can we help?"
            />
          </label>
          <button
            type="button"
            className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Send
          </button>
        </form>
        <div className="rounded-lg border border-border/50 bg-card p-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Contact details</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              Email:{" "}
              <a className="hover:text-foreground" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="hover:text-foreground" href="tel:+10000000000">
                +1 (000) 000-0000
              </a>
            </li>
            <li>Office: 123 Earth Ave, Sustainability City</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
