"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAdminPage = pathname.startsWith("/admin");

  if (isAuthPage || isAdminPage) return null;

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              {siteConfig.name}
            </div>
            <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/mentors" className="hover:text-foreground">Browse Mentors</Link></li>
              <li><Link href="/register" className="hover:text-foreground">Become a Mentor</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-foreground">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
