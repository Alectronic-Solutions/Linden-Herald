"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { formEndpoint, formEndpointNoScript, site } from "@/data/site";

type Props = {
  subject: string;
  submitLabel: string;
  children: ReactNode;
  note?: string;
};

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Posts to FormSubmit so the newsroom receives submissions by email.
 * No server, no database, nothing extra to maintain.
 *
 * The form carries a real action and method, so with JavaScript unavailable the
 * submit still reaches FormSubmit as an ordinary POST. With JavaScript we
 * intercept it and keep the reader on the page.
 */
export default function HeraldForm({ subject, submitLabel, children, note }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const statusRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      // FormSubmit answers 200 with {"success":"false"} for an address that has
      // not been confirmed yet, so the status code on its own is not enough.
      const result = (await response.json()) as { success?: boolean | string };
      const delivered = result.success === true || result.success === "true";
      if (!response.ok || !delivered) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
    // reset() blanks every field while focus sits on the submit button. Move
    // focus to the outcome so keyboard and screen-reader users are not stranded.
    statusRef.current?.focus();
  }

  return (
    <form onSubmit={onSubmit} action={formEndpointNoScript} method="POST" className="space-y-4">
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      {/* Honeypot. Hidden from people and from assistive technology alike. */}
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {children}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          className="btn-primary"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? "Sending..." : submitLabel}
        </button>
        {/*
          A live region has to be in the DOM before its content changes, or the
          update is announced unreliably. This paragraph is always present and
          only its text changes.
        */}
        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={cnStatus(status)}
        >
          {status === "sent" && "Thank you. The newsroom has your message and will follow up."}
          {status === "error" && (
            <>That did not go through. Please call {site.phone} and we will take it by phone.</>
          )}
        </p>
      </div>

      {note && (
        <p className="pt-1 font-label text-[0.74rem] uppercase tracking-[0.14em] text-ink-faint">
          {note}
        </p>
      )}
    </form>
  );
}

function cnStatus(status: Status) {
  const base = "font-body text-[0.95rem] transition-opacity duration-200 focus:outline-none";
  if (status === "sent") return `${base} text-herald opacity-100`;
  if (status === "error") return `${base} text-cherry opacity-100`;
  // Kept in the tree but out of the layout when there is nothing to say.
  return `${base} sr-only opacity-0`;
}
