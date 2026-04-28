import Link from "next/link";
import { CTA_LINKS } from "@/lib/ctaLinks";

type CTAButtonsProps = {
  compact?: boolean;
};

export function CTAButtons({ compact }: CTAButtonsProps) {
  return (
    <div className={compact ? "grid gap-3 sm:grid-cols-3" : "grid gap-3 md:max-w-xl sm:grid-cols-2"}>
      <Link href={CTA_LINKS.primary} className="rounded-xl bg-brand-gold px-6 py-3 text-center text-sm font-bold text-brand-navy transition hover:opacity-90">
        販売ページを見る
      </Link>
      <Link href={CTA_LINKS.refund} className="rounded-xl bg-brand-navy px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-900">
        返金対応つきで購入する
      </Link>
      <Link href={CTA_LINKS.secondary} className="rounded-xl border border-brand-navy px-6 py-3 text-center text-sm font-bold text-brand-navy transition hover:bg-slate-50 sm:col-span-2 md:col-span-1">
        今すぐ内容を確認する
      </Link>
    </div>
  );
}
