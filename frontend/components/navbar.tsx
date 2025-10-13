"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/genai-erm-logo.png"
              alt="GenAI Earth Resource Monitor logo"
              width={28}
              height={28}
              className="opacity-90"
              priority
            />
            <span className="font-display font-semibold tracking-tight">GenAI Earth Resource Monitor</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            className="text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            href="/#key-features"
          >
            What We Do
          </Link>
          <Link
            className="text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            href="/#earth-observation"
          >
            Science
          </Link>
          <Link
            className="text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            href="/working"
          >
            Working
          </Link>
          <Link
            className="text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            href="/#contact"
          >
            Contact
          </Link>
        </nav>

        {/* <div className="hidden md:block">
          <Button variant="default" size="sm">
            Get a Demo
          </Button>
        </div> */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 grid gap-4">
                <Link href="/#key-features" className="text-foreground text-sm uppercase tracking-wide">
                  What We Do
                </Link>
                <Link href="/#earth-observation" className="text-foreground text-sm uppercase tracking-wide">
                  Science
                </Link>
                <Link href="/working" className="text-foreground text-sm uppercase tracking-wide">
                  Working
                </Link>
                <Link href="/#contact" className="text-foreground text-sm uppercase tracking-wide">
                  Contact
                </Link>
                <Button className="mt-2">Get a Demo</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
