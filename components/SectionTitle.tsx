type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export function SectionTitle({ eyebrow, title, subtitle, center }: SectionTitleProps) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-gold">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold leading-tight text-brand-navy sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base leading-relaxed text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
