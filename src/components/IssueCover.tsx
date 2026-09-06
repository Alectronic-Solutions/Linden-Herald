import { formatShortDate } from "@/lib/utils";

/**
 * Rendered stand-in for an issue cover. Swap for real page-one thumbnails
 * generated from each PDF once the archive is wired up.
 */
export default function IssueCover({
  date,
  volume,
  number,
}: {
  date: string;
  volume: number;
  number: number;
}) {
  // Deterministic column fill so every cover looks like a different front page
  const seed = Number(date.replace(/-/g, "")) % 97;
  const line = (i: number, base: number) => `${base - ((seed + i * 13) % 22)}%`;

  return (
    <div className="flex aspect-[3/4] w-full flex-col bg-newsprint-white p-2.5 ring-1 ring-rule-strong">
      <p className="text-center font-display text-[0.66rem] font-black leading-none tracking-tight text-ink">
        The Linden Herald
      </p>
      <div className="mt-1 border-y border-ink/70 py-[2px] text-center font-label text-[0.46rem] uppercase tracking-[0.08em] text-ink/70">
        {formatShortDate(date)} &middot; Vol. {volume} No. {number}
      </div>

      <div className="mt-1.5 flex flex-1 gap-1.5" aria-hidden>
        {/* Lead well */}
        <div className="flex flex-[2] flex-col">
          <div className="h-[7px] w-full bg-ink/75" />
          <div className="mt-[3px] h-[7px] bg-ink/75" style={{ width: line(1, 92) }} />
          <div className="mt-1.5 h-[38%] w-full bg-gradient-to-br from-herald/55 to-ink/45" />
          <div className="mt-1.5 flex flex-1 gap-1">
            <div className="flex flex-1 flex-col gap-[3px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-[2px] bg-ink/35" style={{ width: line(i, 100) }} />
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-[3px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-[2px] bg-ink/35" style={{ width: line(i + 5, 100) }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="flex flex-1 flex-col gap-[3px] border-l border-rule pl-1.5">
          <div className="h-[5px] w-full bg-cherry/70" />
          <div className="h-[2px] bg-ink/35" style={{ width: line(2, 96) }} />
          <div className="h-[2px] bg-ink/35" style={{ width: line(3, 88) }} />
          <div className="h-[2px] bg-ink/35" style={{ width: line(4, 94) }} />
          <div className="mt-1 h-[18%] w-full bg-harvest/40" />
          <div className="mt-1 h-[5px] w-full bg-ink/60" />
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-[2px] bg-ink/30" style={{ width: line(i + 2, 98) }} />
          ))}
          <div className="mt-auto h-[14%] w-full border border-ink/30 bg-ink/[0.06]" />
        </div>
      </div>
    </div>
  );
}
