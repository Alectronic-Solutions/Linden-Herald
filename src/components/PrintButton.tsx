"use client";

/**
 * Prints the current page. Hidden from the printed output itself. Harmless
 * without JavaScript, since the page is print-styled either way and a reader can
 * always fall back to the browser's own print command.
 */
export default function PrintButton({ label = "Print this page" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="no-print btn-outline text-xs">
      {label}
    </button>
  );
}
