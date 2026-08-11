"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  CONTACT_DETAILS,
  CONTACT_INTRO,
  CONTACT_SOCIAL_LINKS,
  ENQUIRY_TOPICS,
  PHONE_COUNTRY_CODES,
} from "@/config/contact";

import { SidebarLogo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

import ChevronDownIcon from "@/assets/svgs/common/chevron-down";
import SendIcon from "@/assets/svgs/common/send";

// Labels sit above the control with an 8px gap here, not the 4px `Field` uses.
const LABEL = "mb-8 block";

// What this form adds on top of the shared <Input>: the softer placeholder and
// the gold focus ring.
const FIELD_EXTRA =
  "font-normal duration-200 placeholder:text-navy-800/40 focus-visible:ring-2 focus-visible:ring-gold-400/25";

// The dial-code button, the topic select and the message textarea aren't
// <input>s, so they wear the same skin by hand.
const FIELD = cn(
  "block h-42 w-full min-w-0 rounded-[11px] border border-border-default bg-surface px-16 py-8 text-body text-text-primary outline-none transition-colors focus:border-gold-400 focus-visible:border-gold-400",
  FIELD_EXTRA
);

const FLAG = "h-14 w-20 shrink-0 rounded-xs ring-1 ring-black/10";

// Icon tiles — the contact rows and the social links share the same chip.
const TILE =
  "flex size-44 shrink-0 items-center justify-center rounded-[12px] bg-[#1A4059]";

const DETAIL_LABEL =
  "text-[10px]/[14px] font-bold tracking-[1.5px] text-white/50 uppercase";

// A native <option> can't hold an image, so the dial code runs on a custom
// listbox — that's the only way the flags show up in the open list too.
function DialCodeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selected =
    PHONE_COUNTRY_CODES.find(({ code }) => code === value) ??
    PHONE_COUNTRY_CODES[0];
  const SelectedFlag = selected.Flag;

  // Click-away and Escape close the list.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full max-w-104 min-[1290px]:shrink-0">
      {/* Keeps the value in the form payload now that the select is gone */}
      <input type="hidden" name="dialCode" value={value} />

      <button
        type="button"
        id="contact-dial-code"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country dialling code — ${selected.label} ${selected.code}`}
        className={cn(
          FIELD,
          "flex cursor-pointer items-center justify-center gap-6 px-8"
        )}
      >
        <SelectedFlag className={FLAG} />
        {selected.code}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Country dialling code"
          className="absolute top-[calc(100%+4px)] left-0 z-20 max-h-224 w-full overflow-y-auto rounded-[11px] border border-border-default bg-surface p-4 shadow-[0_12px_32px_0_rgba(8,34,53,0.12)]"
        >
          {PHONE_COUNTRY_CODES.map(({ code, label, Flag }) => (
            <li key={code} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={code === value}
                aria-label={`${label} ${code}`}
                onClick={() => {
                  onChange(code);
                  setOpen(false);
                }}
                className={cn(
                  "text-body-xs md:text-body flex w-full font-semibold cursor-pointer items-center justify-center gap-6 rounded-lg px-4 py-8 text-text-primary transition-colors duration-200 hover:bg-[#FAF6F2]",
                  code === value && "bg-[#FAF6F2]"
                )}
              >
                <Flag className={FLAG} />
                {code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Enquiry form + project desk, ported from the marketing site's
 * `contact-us/_sections/contact-form` so both surfaces stay identical.
 */
export default function ContactFormSection() {
  const [dialCode, setDialCode] = useState(PHONE_COUNTRY_CODES[0].code);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: wire up to the enquiry endpoint / server action.
  };

  return (
    <div className="grid overflow-hidden rounded-[20px] border border-border-subtle shadow-[0_20px_60px_0_rgba(8,34,53,0.08)] xl:grid-cols-[1fr_384px] lg:rounded-3xl">
      {/* ── Enquiry form ─────────────────────────────────────── */}
      <div className="bg-surface p-16 pb-32 md:p-24 lg:p-32">
        <form onSubmit={handleSubmit} className="flex flex-col gap-16">
          <div className="grid gap-x-14 gap-y-16 lg:gap-y-24 md:grid-cols-2">
            <div>
              <Label htmlFor="contact-name" className={LABEL}>
                Full name
              </Label>
              <Input
                id="contact-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Anil Ambani"
                className={FIELD_EXTRA}
              />
            </div>

            <div>
              <Label htmlFor="contact-email" className={LABEL}>
                Email
              </Label>
              <Input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="anilambani@gmail.com"
                className={FIELD_EXTRA}
              />
            </div>

            <div>
              <Label htmlFor="contact-phone" className={LABEL}>
                Phone number
              </Label>

              <div className="flex gap-8">
                {/* Chevron-less: the box reads as a prefix on the number
                    beside it, not as a field of its own. */}
                <DialCodeSelect value={dialCode} onChange={setDialCode} />

                <Input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel-national"
                  placeholder="98765 43210"
                  className={FIELD_EXTRA}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="contact-topic" className={LABEL}>
                Regarding
              </Label>

              <div className="relative">
                <select
                  id="contact-topic"
                  name="topic"
                  defaultValue={ENQUIRY_TOPICS[0]}
                  className={`${FIELD} cursor-pointer appearance-none pr-48`}
                >
                  {ENQUIRY_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>

                <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-16 size-16 -translate-y-1/2 [&_path]:stroke-text-secondary" />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="contact-message" className={LABEL}>
                Message
              </Label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Hi team, I'd like to schedule a site visit for Villa 12 next week and confirm the possession timeline."
                className={`${FIELD} h-109 resize-none overflow-y-auto sm:h-124`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-body-xs text-text-secondary">
              We&rsquo;ll reply to your registered email.
            </p>

            <Button
              type="submit"
              width="full"
              className="hover:text-gold-300 font-medium uppercase transition-all duration-250 hover:-translate-y-1 sm:w-auto"
            >
              <SendIcon className="text-gold-300 size-16 shrink-0" />
              Send message
            </Button>
          </div>
        </form>
      </div>

      {/* ── Project desk ─────────────────────────────────────── */}
      <div
        className="bg-[#0E2C47] px-16 pt-32 pb-16 lg:p-32"
        style={{ backgroundImage: "var(--gradient-sidebar)" }}
      >
        <div className="xl:max-w-303">
          <SidebarLogo className="h-40 w-auto" />

          <p className="text-body-xs mt-8 text-[rgba(255,255,255,0.72)]">
            {CONTACT_INTRO}
          </p>

          <ul className="mt-16 flex max-w-290 flex-col gap-16 sm:max-w-full lg:mt-24 lg:gap-24">
            {CONTACT_DETAILS.map(({ label, value, href, Icon }) => (
              <li key={label} className="flex items-center gap-14">
                <span className={TILE}>
                  <Icon className="text-gold-300 size-19" />
                </span>

                <div className="min-w-0">
                  <p className={DETAIL_LABEL}>{label}</p>

                  {href ? (
                    <a
                      href={href}
                      className="hover:text-gold-300 text-body-xs sm:text-body mt-4 block font-semibold break-words text-text-inverse transition-colors duration-200"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-body-xs sm:text-body mt-4 text-[rgba(255,255,255,0.85)]">
                      {value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <h2 className={`${DETAIL_LABEL} mt-16 lg:mt-24`}>Follow us</h2>

          <ul className="mt-8 flex items-center gap-8 lg:gap-10">
            {CONTACT_SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className={cn(
                    TILE,
                    "hover:text-gold-300 size-40 rounded-[11px] border border-[#2A4256] bg-[#152F42] text-text-inverse transition-colors duration-200 hover:bg-white/15"
                  )}
                >
                  <Icon className="size-18" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
