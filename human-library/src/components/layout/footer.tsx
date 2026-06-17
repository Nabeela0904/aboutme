"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Globe, Mail, Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  platform: [
    { label: "Browse mentors", href: "/mentors" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Categories", href: "/#categories" },
    { label: "Become a mentor", href: "/signup" },
  ],
  company: [
    { label: "About us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/register";
  const isAdminPage = pathname.startsWith("/admin");

  if (isAuthPage || isAdminPage) return null;

  return (
    <footer className="border-t bg-[#f7f5f2]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">{siteConfig.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold">Stay in the loop</p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-xl bg-white"
                />
                <Button type="submit" className="shrink-0 rounded-xl">
                  Subscribe
                </Button>
              </form>
            </div>

            <div className="mt-6 flex gap-3">
              {[
                { icon: Share2, href: "#", label: "Share" },
                { icon: Globe, href: "#", label: "Website" },
                { icon: Mail, href: `mailto:${siteConfig.contact.email}`, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Topics</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/mentors?category=${cat.id}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Made with care for curious humans everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
