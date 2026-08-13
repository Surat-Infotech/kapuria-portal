import { Montserrat, Playfair_Display } from "next/font/google";

import { RouteLoader } from "@/components/common/route-loader";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// Italic is loaded because the display headings ("Sign in to your account",
// "My Properties") are set in Playfair italic.
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Kapuria Portal",
  description: "Kapuria buyer portal — drawings, photos and documents.",
  // Every icon lives in `public/favicons/`, so the app-router file
  // conventions (app/icon.png, app/apple-icon.png) do not apply and the
  // tags are declared here instead.
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body>
        {children}
        <RouteLoader />
      </body>
    </html>
  );
}
