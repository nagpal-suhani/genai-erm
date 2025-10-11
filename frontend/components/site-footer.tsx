import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/50 bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-4 md:px-6 lg:px-8">
        <div>
          <h4 className="font-display text-base font-semibold text-foreground">GenAI Earth Resource Monitor</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            AI-powered monitoring of forests, urban areas, and water bodies with trends, metrics, and forecasts.
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-foreground">Product</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
            </li>
            <li>
              <Link href="/working" className="text-muted-foreground hover:text-foreground">
                Working
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="text-muted-foreground hover:text-foreground">
                Request Demo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-foreground">Solutions</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/#use-cases" className="text-muted-foreground hover:text-foreground">
                Government
              </Link>
            </li>
            <li>
              <Link href="/#use-cases" className="text-muted-foreground hover:text-foreground">
                NGOs
              </Link>
            </li>
            <li>
              <Link href="/#use-cases" className="text-muted-foreground hover:text-foreground">
                Researchers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-foreground">Contact</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground">
                hello@example.com
              </a>
            </li>
            <li>
              <a href="tel:+10000000000" className="text-muted-foreground hover:text-foreground">
                +1 (000) 000-0000
              </a>
            </li>
            <li>
              <Link href="/#contact" className="text-muted-foreground hover:text-foreground">
                Contact Form
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} GenAI Earth Resource Monitor. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
