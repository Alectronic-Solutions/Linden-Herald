"use client";

import { useCallback, useRef, useState, type FormEvent, type ReactNode } from "react";
import Modal from "@/components/Modal";
import { formEndpoint, formEndpointNoScript, site } from "@/data/site";

type Props = {
  subject: string;
  submitLabel: string;
  children: ReactNode;
  note?: string;
  /** Replaces the confirmation card's body for forms that promise something specific. */
  confirmation?: ReactNode;
};

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Posts to FormSubmit so the newsroom receives submissions by email.
 * No server, no database, nothing extra to maintain.
 *
 * The form carries a real action and method, so with JavaScript unavailable the
 * submit still reaches FormSubmit as an ordinary POST and lands on FormSubmit's
 * own thank-you page. With JavaScript we intercept it and confirm in place.
 *
 * Success opens a modal card. The form has just been reset, so there is nothing
 * left on screen to read and a line of text beside the button is easy to miss.
 * Failure stays inline: the reader's answers are still in the fields, and the
 * useful thing is to leave them there next to the phone number.
 */
export default function HeraldForm({ subject, submitLabel, children, note, confirmation }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const closeConfirmation = useCallback(() => setStatus("idle"), []);

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
      // The submit button keeps focus through a failure, so moving to the alert
      // announces it without taking anyone away from the form they must retry.
      errorRef.current?.focus();
    }
  }

  return (
    <>
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

        {/*
          Seven forms on this site marked their required fields with a red
          asterisk and nowhere said so. The mark is decoration for assistive
          technology, which reads `required` instead; this sentence is for
          everybody reading the page with their eyes.
        */}
        <p className="font-body text-[0.95rem] text-ink-muted">
          Fields marked <span className="font-semibold text-cherry">*</span> are required.
          Everything else is optional.
        </p>

        {children}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            ref={submitRef}
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
            ref={errorRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={
              status === "error"
                ? "font-body text-[1rem] text-cherry focus:outline-none"
                : "sr-only"
            }
          >
            {status === "error" &&
              `That did not go through. Please call ${site.phone} and we will take it by phone.`}
          </p>
        </div>

        {note && (
          <p className="pt-1 font-label text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
            {note}
          </p>
        )}
      </form>

      <Modal
        open={status === "sent"}
        onClose={closeConfirmation}
        kicker="Received"
        title="Thank you for submitting"
        returnFocusRef={submitRef}
      >
        {confirmation ?? (
          <p>
            The newsroom has your message and will follow up. If it is urgent, call {site.phone} —
            the line is answered at any hour.
          </p>
        )}
      </Modal>
    </>
  );
}
