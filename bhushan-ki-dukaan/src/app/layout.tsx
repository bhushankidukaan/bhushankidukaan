import type { Metadata } from "next";
import { EB_Garamond, Hanken_Grotesk } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhushan Ki Dukaan | Event Management & Costumes in Belagavi",
  description:
    "Rent or buy traditional costumes and book event management for weddings, festivals and cultural ceremonies in Belagavi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${garamond.variable} ${hanken.variable} scroll-smooth antialiased`}>
      <head>
        {/* Icon font - not available through next/font. display=block stops icon names flashing as text */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-full bg-cream text-ink font-sans pb-20 sm:pb-0">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
