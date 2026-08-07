// Next.js serves this at /manifest.webmanifest and links it automatically.
// The icons live in `public/favicons/`, alongside every other favicon.
export default function manifest() {
  return {
    name: "Kapuria Portal",
    short_name: "Kapuria",
    description: "Kapuria buyer portal — drawings, photos and documents.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e9",
    theme_color: "#082235",
    icons: [
      {
        src: "/favicons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
