"use client";

import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const FaqItem = ({ item, open, onToggle }) => (
  <div
    className={cn(
      // No padding here — the question row and the answer are spaced
      // independently (20/18 vs 46/22/20), so each owns its own.
      "relative cursor-pointer rounded-[14px] border bg-surface transition-colors has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-gold-400",
      open ? "border-gold-300" : "border-border-subtle"
    )}
  >
    <h3>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${item.id}-panel`}
        className="flex w-full cursor-pointer items-center gap-14 px-16 lg:px-20 py-16 lg:py-17 text-left outline-none after:absolute after:inset-0 after:content-['']"
      >
        {/* 16 + the 10 gap puts the question at 46 from the card edge, which
            is where the answer below it starts. */}
        <span className="w-auto text-body-xs font-bold text-text-accent">
          {item.number}
        </span>
        <span className="flex-1 font-semibold text-text-primary text-body">
          {item.question}
        </span>
        <ChevronDownIcon
          className={cn(
            "mt-4 size-20 shrink-0 text-text-secondary transition-transform duration-200 ease-out",
            open && "rotate-180"
          )}
        />
      </button>
    </h3>

    <div
      id={`${item.id}-panel`}
      aria-hidden={!open}
      className={cn(
        "relative z-10 grid cursor-auto transition-[grid-template-rows] duration-300 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="overflow-hidden">
        <p className="pe-16 lg:pe-22 pb-16 lg:pb-20 ps-46 text-body-xs text-text-secondary">
          {item.answer}
        </p>
      </div>
    </div>
  </div>
);

export { FaqItem };
