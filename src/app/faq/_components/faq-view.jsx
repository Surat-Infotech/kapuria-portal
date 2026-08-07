"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/common/page-header";
import { ChevronDownIcon, SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ContactCta } from "./contact-cta";
import { FaqItem } from "./faq-item";

// Numbering runs across categories, not within them: General ends at 04 and
// Features & Amenities picks up at 05. Numbers are assigned before filtering
// so a search never renumbers the questions that stay on screen.
const numberItems = (categories) => {
  let count = 0;

  return categories.map((category) => ({
    ...category,
    items: category.items.map((item) => {
      count += 1;
      return {
        ...item,
        id: `faq-${count}`,
        number: String(count).padStart(2, "0"),
      };
    }),
  }));
};

const FaqView = ({ categories }) => {
  const numbered = useMemo(() => numberItems(categories), [categories]);

  // Keyed on the unfiltered categories so a search can never leave a hidden
  // question open behind the one the user just clicked.
  const siblingIds = useMemo(
    () =>
      new Map(
        numbered.map((category) => [
          category.title,
          category.items.map((item) => item.id),
        ])
      ),
    [numbered]
  );

  const [query, setQuery] = useState("");
  // First question of every category opens by default, as in the design.
  const [openIds, setOpenIds] = useState(
    () => new Set(numbered.map((category) => category.items[0]?.id).filter(Boolean))
  );

  const term = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!term) return numbered;

    return numbered
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          `${item.question} ${item.answer}`.toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [numbered, term]);

  const visibleIds = results.flatMap((category) =>
    category.items.map((item) => item.id)
  );
  // "Expand All" flips to "Collapse All" only once everything on screen is open.
  const allExpanded =
    visibleIds.length > 0 && visibleIds.every((id) => openIds.has(id));

  // One answer open per category: opening a question closes whichever of its
  // siblings was open. Other categories keep their own open question.
  const toggleItem = (id, category) =>
    setOpenIds((current) => {
      const next = new Set(current);
      const wasOpen = next.has(id);

      siblingIds.get(category)?.forEach((sibling) => next.delete(sibling));
      if (!wasOpen) next.add(id);

      return next;
    });

  const toggleAll = () =>
    setOpenIds((current) => {
      const next = new Set(current);
      visibleIds.forEach((id) => (allExpanded ? next.delete(id) : next.add(id)));
      return next;
    });

  return (
    <div className="flex flex-col gap-24 px-16 pt-22 pb-52 lg:px-34 lg:pt-32 lg:pb-56">
      <PageHeader
        eyebrow="Support"
        accent="Frequently"
        title="Asked Questions"
        description="Answers about your villa, documents and handover. Can’t find it? Your project team is one message away."
      />

      <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex h-42 w-full items-center gap-8 rounded-[11px] border border-border-default bg-surface px-16 py-8 focus-within:border-gold-400 lg:w-320">
          <SearchIcon className="size-16 shrink-0 text-text-secondary" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documents…"
            aria-label="Search frequently asked questions"
            className="min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>

        {/* The design drops this control on mobile — search carries that view. */}
        <Button
          variant="secondary"
          onClick={toggleAll}
          disabled={visibleIds.length === 0}
          className="hidden rounded-[10px] w-127 justify-center px-18 py-12 gap-8 text-[#6A7680] lg:flex"
        >
          {allExpanded ? "Collapse All" : "Expand All"}
          {/* Arrow points the way the click will move things: up on
              "Expand All", down on "Collapse All". */}
          <ChevronDownIcon
            className={cn(
              "size-15 shrink-0 text-text-secondary transition-transform duration-200 ease-out",
              !allExpanded && "rotate-180"
            )}
          />
        </Button>
      </div>

      {results.length > 0 ? (
        <div className="flex flex-col gap-32">
          {results.map((category) => (
            <section key={category.title} className="flex flex-col gap-16">
              <div className="flex items-center gap-8">
                <h2 className="font-playfair text-[18px]/[26px] italic text-text-accent font-medium">
                  {category.title}
                </h2>
                <span className="shrink-0 text-[12px]/[18px] text-text-secondary">
                  {category.items.length}{" "}
                  {category.items.length === 1 ? "question" : "questions"}
                </span>
                <div className="h-px flex-1 bg-border-default" />
              </div>

              <div className="flex flex-col gap-10">
                {category.items.map((item) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    open={openIds.has(item.id)}
                    onToggle={() => toggleItem(item.id, category.title)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="rounded-[14px] border border-border-subtle bg-surface px-20 py-32 text-center">
          <p className="text-body font-semibold text-text-primary">
            No questions match “{query.trim()}”.
          </p>
          <p className="pt-4 text-body text-text-secondary">
            Try a different word, or message your project team below.
          </p>
        </div>
      )}

      <ContactCta />
    </div>
  );
};

export { FaqView };
