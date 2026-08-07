import { PortalShell } from "@/components/layout/portal-shell";

import { FaqView } from "./_components/faq-view";

export const metadata = {
  title: "FAQs — Kapuria Portal",
};

const user = {
  initials: "AA",
  name: "Anil Ambani",
  meta: "Buyer · 2 properties",
};

// Categories render in this order; question numbers run continuously across
// them (01…11), which is why the numbering is assigned at render, not here.
const categories = [
  {
    title: "General",
    items: [
      {
        question: "How can I contact Kapuria Developers?",
        answer:
          "Reach your dedicated project desk at care@kapuria.com or +91 172 543 1234, Mon–Sat 10:00–18:00 IST. You can also use the Contact Information page in this portal to send a message tied to your villa.",
      },
      {
        question: "What is Kapuria Developers known for?",
        answer:
          "Low-density villa communities built to a single specification — no phased downgrades between the show home and handover. Every project is delivered with landscaped commons, underground services and a documented materials list.",
      },
      {
        question: "How long has Kapuria been in business?",
        answer:
          "Kapuria Developers was established in 2023 and has been building in the Mohali–Chandigarh belt since. The team behind it has delivered residential projects in the region for over two decades.",
      },
      {
        question: "Where are your projects located?",
        answer:
          "Our current communities are in Sector 120, Mohali, within twenty minutes of Chandigarh International Airport. Upcoming phases are listed on your My Properties page as they open.",
      },
    ],
  },
  {
    title: "Features & Amenities",
    items: [
      {
        question: "What amenities are included in the villas?",
        answer:
          "Each villa includes a private swimming pool, landscaped garden, terrace, barbecue area, jacuzzi, home gym and covered parking. Full specifications are on your Blueprints page.",
      },
      {
        question: "Are the villas furnished?",
        answer:
          "Villas are handed over fully fitted — modular kitchen, wardrobes, sanitaryware, lighting and climate control. Loose furniture is not included, though our design desk can put you in touch with a partner studio.",
      },
      {
        question: "Can I customise the layout?",
        answer:
          "Internal finishes, joinery and the layout of non-structural walls can be changed until the interiors stage. Structural changes and anything affecting the façade are not permitted — raise a request with your project manager and we will confirm the cut-off date for your unit.",
      },
      {
        question: "What materials are used in construction?",
        answer:
          "RCC frame with AAC block walls, double-glazed windows, Italian marble in living areas and engineered hardwood in bedrooms. The complete schedule, brand by brand, is attached to your Legal Documents page.",
      },
    ],
  },
  {
    title: "Documents & Handover",
    items: [
      {
        question: "Where do I find my legal documents?",
        answer:
          'All contracts, permits and warranties are on the Legal Documents page, with clear status badges. Anything marked "Awaiting signature" needs your action.',
      },
      {
        question: "How do I download my drawings and photos?",
        answer:
          "Open the property from My Properties and use the Blueprints or Photos tab. Individual files download on their own, and each set can be pulled down as a single archive.",
      },
      {
        question: "What happens at possession?",
        answer:
          "You walk the villa with your project manager, we log any snags and fix them before keys change hands. You then receive the possession letter, warranty pack and utility connections — all of which appear in this portal the same day.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <PortalShell user={user}>
      <FaqView categories={categories} />
    </PortalShell>
  );
}
