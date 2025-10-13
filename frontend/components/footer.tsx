import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Overview</p>
            <ul className="grid gap-2">
              <li>
                <Link href="#" className="hover:underline">
                  Mission
                </Link>
              </li>
              <li>
                <Link href="#key-features" className="hover:underline">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="#earth-observation" className="hover:underline">
                  Science
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Capabilities</p>
            <ul className="grid gap-2">
              <li>
                <Link href="#" className="hover:underline">
                  AI Image Analysis
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Metrics & Trends
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Predictive Modeling
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Report Generation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Resources</p>
            <ul className="grid gap-2">
              <li>
                <Link href="#" className="hover:underline">
                  Feature Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  API
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Contact</p>
            <ul className="grid gap-2">
              <li>
                <a href="mailto:hello@example.com" className="hover:underline">
                  hello@example.com
                </a>
              </li>
              <li>
                <a href="tel:+10000000000" className="hover:underline">
                  +1 (000) 000-0000
                </a>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Request a Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="font-medium text-foreground">GenAI Earth Resource Monitor</p>
            <p className="text-xs">© {new Date().getFullYear()} GenAI Earth Resource Monitor. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
