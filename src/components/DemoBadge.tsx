export default function DemoBadge() {
  return (
    <div className="no-print bg-ink text-newsprint-white">
      <div className="wrap flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-1.5 text-center">
        <span className="kicker text-harvest-light">Design Preview</span>
        <span className="font-body text-[0.8rem] text-newsprint-deep/80">
          Proposed redesign concept prepared for the Linden Herald. Sample stories and photographs
          stand in for the paper&apos;s own reporting.
        </span>
      </div>
    </div>
  );
}
