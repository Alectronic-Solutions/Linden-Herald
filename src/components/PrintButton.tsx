"use client";

import { useEffect } from "react";

/**
 * Prints the current page. Hidden from the printed output itself. Harmless
 * without JavaScript, since the page is print-styled either way and a reader can
 * always fall back to the browser's own print command.
 *
 * With `sheetOnly`, the body is flagged for the duration of the print so the
 * stylesheet can drop everything except the `.print-sheet` block. Printing the
 * subscription coupon used to produce four sheets of masthead, rate cards and
 * the online form wrapped around the one thing the reader wanted.
 */
export default function PrintButton({
  label = "Print this page",
  sheetOnly = false,
}: {
  label?: string;
  sheetOnly?: boolean;
}) {
  useEffect(() => {
    if (!sheetOnly) return;
    // afterprint does not fire reliably everywhere, so clear the flag on both.
    const clear = () => document.body.classList.remove("printing-sheet");
    window.addEventListener("afterprint", clear);
    return () => {
      window.removeEventListener("afterprint", clear);
      clear();
    };
  }, [sheetOnly]);

  return (
    <button
      type="button"
      onClick={() => {
        if (sheetOnly) document.body.classList.add("printing-sheet");
        window.print();
        if (sheetOnly) {
          // Safari returns from print() synchronously without firing afterprint.
          window.setTimeout(() => document.body.classList.remove("printing-sheet"), 500);
        }
      }}
      className="no-print btn-outline"
    >
      {label}
    </button>
  );
}
