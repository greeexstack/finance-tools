"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const CONTACT_EMAIL =
  "query.cratoo@gmail.com";

const SUBJECT =
  "Finance Tools Feedback";

const MAILTO_URL =
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    SUBJECT,
  )}`;

const GMAIL_URL =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CONTACT_EMAIL,
  )}&su=${encodeURIComponent(
    SUBJECT,
  )}`;

const OUTLOOK_URL =
  `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    CONTACT_EMAIL,
  )}&subject=${encodeURIComponent(
    SUBJECT,
  )}`;

type ContactEmailProps = {
  variant: "icon" | "text";
  behavior?:
    | "direct"
    | "chooser"
    | "responsive";
};

export default function ContactEmail({
  variant,
  behavior = "direct",
}: ContactEmailProps) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const supportsChooser =
    behavior === "chooser" ||
    behavior === "responsive";

  useEffect(() => {
    if (!supportsChooser) {
      return;
    }

    function handlePointerDown(
      event: PointerEvent,
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [supportsChooser]);

  useEffect(() => {
    if (!supportsChooser) {
      return;
    }

    function handleEscape(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [supportsChooser]);

  const sharedClasses =
    variant === "icon"
      ? "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      : "inline-flex items-center gap-2 text-sm font-medium text-indigo-300 transition hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30";

  const content = (
    <>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          variant === "icon"
            ? "h-5 w-5"
            : "h-4 w-4 shrink-0"
        }
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
        />

        <path d="m3 7 9 6 9-6" />
      </svg>

      {variant === "text" && (
        <span>
          {CONTACT_EMAIL}
        </span>
      )}
    </>
  );

  function handleContactClick(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    /*
     * "direct" always follows mailto.
     * "chooser" always opens the chooser.
     *
     * "responsive" checks the viewport at the
     * moment of the click:
     * - desktop: prevent mailto and show chooser
     * - mobile: allow the normal mailto navigation
     */
    if (behavior === "direct") {
      return;
    }

    if (behavior === "responsive") {
      const isDesktop =
        window.matchMedia(
          "(min-width: 768px)",
        ).matches;

      if (!isDesktop) {
        return;
      }

      event.preventDefault();
    } else {
      event.preventDefault();
    }

    setIsOpen(
      (open) => !open,
    );
  }

  if (
    behavior === "direct"
  ) {
    return (
      <a
        href={MAILTO_URL}
        aria-label={
          variant === "icon"
            ? "Email us"
            : `Email ${CONTACT_EMAIL}`
        }
        title={
          variant === "icon"
            ? "Email us"
            : undefined
        }
        className={sharedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <a
        href={MAILTO_URL}
        onClick={handleContactClick}
        aria-label={
          variant === "icon"
            ? "Email us"
            : `Email ${CONTACT_EMAIL}`
        }
        aria-haspopup="dialog"
        aria-expanded={
          behavior === "responsive"
            ? isOpen
            : isOpen
        }
        title={
          variant === "icon"
            ? "Email us"
            : undefined
        }
        className={sharedClasses}
      >
        {content}
      </a>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Email options"
          className={`absolute z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-[0_12px_32px_rgba(15,23,42,0.14)] ${
            variant === "icon"
              ? "right-0"
              : "left-0"
          }`}
        >
          <p className="text-sm font-semibold text-slate-900">
            Contact Finance Tools
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Choose how you would like to
            send your message.
          </p>

          <div className="mt-3 grid gap-2">
            <a
              href={GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                setIsOpen(false)
              }
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              Gmail
            </a>

            <a
              href={OUTLOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                setIsOpen(false)
              }
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              Outlook
            </a>
          </div>

          <p className="mt-3 text-[11px] leading-4 text-slate-400">
            Both options use{" "}
            {CONTACT_EMAIL} and pre-fill
            the subject.
          </p>
        </div>
      )}
    </div>
  );
}