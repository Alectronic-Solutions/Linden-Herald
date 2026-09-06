type Props = {
  kicker: string;
  title: string;
  blurb?: string;
};

export default function PageHeader({ kicker, title, blurb }: Props) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="kicker text-cherry">{kicker}</p>
      <h1 className="mt-3 font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] sm:text-[3.4rem]">
        {title}
      </h1>
      {blurb && (
        <p className="mt-5 font-display text-lg leading-relaxed text-ink-muted sm:text-xl">
          {blurb}
        </p>
      )}
      <div className="rule-double mt-8" />
    </header>
  );
}
