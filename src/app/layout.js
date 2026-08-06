import { Montserrat, Playfair_Display } from "next/font/google";
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
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
