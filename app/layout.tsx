import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "【300部突破】副業で稼ぐを徹底理解｜月50万狙う副業完全実践書《読むコンサル》",
  description:
    "副業を本気で学びたい方向けに、月50万円を現実的に狙うための思考・行動・実践手順を体系化。23万文字・解説画像628枚・PDF特典409枚の実践書。",
  openGraph: {
    title: "副業で稼ぐを徹底理解｜読むコンサル",
    description:
      "300部突破。副業で成果を出すための判断軸と実践手順を、AI時代に合わせて学べる実践書。",
    images: [
      {
        url: "/placeholders/ogp-cover.svg",
        width: 1200,
        height: 630,
        alt: "読むコンサル OGP"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "副業で稼ぐを徹底理解｜読むコンサル",
    description: "月50万円を現実的に狙うための思考・行動・実践手順を体系化。",
    images: ["/placeholders/ogp-cover.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
