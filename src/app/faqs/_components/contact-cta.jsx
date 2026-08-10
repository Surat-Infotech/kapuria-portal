import Link from "next/link";

import { Button } from "@/components/ui/button";

// Deliberately local rather than added to @/components/icons: this is the FAQ
// banner's own bubble, and the sidebar's ContactIcon is a different drawing.
// Stroke is currentColor so it tracks the button label.
const ChatBubbleIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
    <path
      d="M13.9993 7.66683C14.0001 8.57139 13.7707 9.46127 13.3328 10.2528C12.8949 11.0443 12.2629 11.7114 11.4962 12.1914C10.7295 12.6715 9.85333 12.9486 8.95005 12.9968C8.04677 13.0449 7.14608 12.8626 6.33268 12.4668L2.66602 13.3335L3.53268 10.0002C3.22326 8.6122 3.47788 7.15816 4.24053 5.95793C5.00318 4.7577 6.21138 3.90958 7.59935 3.60016C8.98732 3.29075 10.4414 3.54537 11.6416 4.30801C12.8418 5.07066 13.6899 6.27887 13.9993 7.66683Z"
      stroke="currentColor"
      strokeWidth={1.8}
    />
  </svg>
);

// Navy closing banner: stacks on mobile with a full-width gold pill, sits
// side by side from lg up.
const ContactCta = () => (
  <div className="flex flex-col gap-18 rounded-[18px] bg-navy-800 px-28 py-24 lg:flex-row lg:items-center lg:justify-between">
    <div className="flex flex-col gap-2 lg:gap-4">
      <h2 className="text-[17px]/[21px] font-semibold text-text-inverse lg:text-h4">
        Still have a question?
      </h2>
      <p className="text-[13px]/[19px] lg:text-body-xs text-white/70">
        Reach your project team directly — most replies land within a business
        day.
      </p>
    </div>

    <Button
      asChild
      className="w-full bg-gold-300 text-navy-900 font-semibold hover:bg-gold-400 lg:w-auto"
    >
      <Link href="/contact">
        <ChatBubbleIcon className="size-16 shrink-0" />
        Contact us
      </Link>
    </Button>
  </div>
);

export { ContactCta };
