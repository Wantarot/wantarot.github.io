import Image from "next/image";
import { CTAButtons } from "@/components/CTAButtons";
import { SectionTitle } from "@/components/SectionTitle";

const learnCards = [
  "なぜ副業で稼げる人と稼げない人がいるのか",
  "お金を稼げる状態とは何か",
  "稼げる思考と行動の作り方",
  "副業を途中で諦めないための考え方",
  "具体的に何をすれば稼げるのか",
  "行き詰まった時の対処法",
  "AIを副業にどう活用するか",
  "穴場の副業を見つける方法",
  "性格別の行動選択",
  "超NG行動例",
  "最高効率のマネタイズ方法"
];

const bonusCards = [
  {
    title: "副業上位層が辿り着く別格の効率化",
    body: "稼ぐ力を身につけた後、さらに副業上位層へ進むための思考を学べる特典。"
  },
  {
    title: "副業メンタルが折れそうな時に読む本",
    body: "行動が止まりそうな時に、再び前へ進むための考え方を整理できる特典。"
  },
  {
    title: "やれば良いのに裏マネタイズ実例",
    body: "コンサル現場から生まれた、リアルなマネタイズアイデアを収録。"
  },
  {
    title: "オフラインで読めるPDFファイル",
    body: "本書を繰り返し学習できるPDF版。移動中や外出先でも閲覧可能。"
  }
];

const forWho = [
  "副業をゼロから始めたい方",
  "副業で成果が出ず悩んでいる方",
  "副業を正しく学びたい方",
  "本気でお金を稼ぐ力を身につけたい方",
  "副業収益が伸び悩んでいる方",
  "AIを活用して副業力を高めたい方",
  "教わる側から教える側になりたい方"
];

const notForWho = [
  "楽して稼ぐ裏技だけを探している方",
  "すでに副業で十分な成果を出している方",
  "考えることや実践が苦手な方",
  "即金性だけを求めている方",
  "努力なしで結果を求める方"
];

const metrics = [
  ["23万", "総文字数"],
  ["628枚", "解説画像"],
  ["409枚", "PDF特典"],
  ["4カ月", "制作期間"],
  ["300部突破", "販売実績"],
  ["返金可", "NOTE版対応"],
  ["総合1位", "BRAIN売上"],
  ["4.57 / 評価2位", "BRAIN歴代評価"]
];

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-b from-brand-soft to-white">
        <div className="section-container py-12 sm:py-16">
          <p className="mb-4 inline-block rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-navy shadow">300部突破 / 返金可 / BRAIN総合1位 / 歴代評価2位 4.57</p>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl gradient-headline">【300部突破】「副業で稼ぐ」を徹底理解。月50万狙う副業完全実践書《読むコンサル》</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">副業を“本気で学ぶ”ための完全実践書。月50万円を現実的に狙うための思考・行動・実践手順を体系化。23万文字 / 解説画像628枚 / PDF特典409枚を収録。</p>
          <div className="mt-7">
            <CTAButtons />
          </div>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle
          eyebrow="Problem"
          title="AI時代の副業は、感覚だけでは戦いにくい。"
          subtitle="AIによってブログ・動画編集・SNS運用・プログラミングまで競争ルールが変化。片手間で結果が出る時代から、本気で学ぶ人が伸びる時代に移っています。"
        />
      </section>

      <section className="section-container pt-2">
        <SectionTitle eyebrow="共感" title="こんな悩み、ひとつでも当てはまるなら。" />
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          {["何をやっても稼げない", "強者の成功談を真似しても結果が出ない", "自分には才能がないと思ってしまう", "教材を買っても行動に落とし込めない", "AIをどう使えばいいかわからない", "途中でメンタルが折れる"].map((pain) => (
            <li key={pain} className="card py-4">😿 {pain}</li>
          ))}
        </ul>
      </section>

      <section className="section-container">
        <div className="card bg-brand-navy text-white">
          <SectionTitle
            eyebrow="Solution"
            title="本書は“ノウハウ集”ではなく、稼げる状態を作る実践書。"
            subtitle="副業で成果を出すための思考・行動を体系化。稼げる人と稼げない人の違いを明確にし、AIを活用した思考強化とマネタイズ方法まで学べます。"
          />
          <p className="mt-4 text-sm leading-relaxed text-slate-200">猫山氏の副業コンサル実績に基づく「読むコンサル」。努力と実践を前提に、再現しやすい判断軸を提示します。</p>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="学べること" title="副業で成果を狙うために必要な11テーマ" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learnCards.map((item) => (
            <article key={item} className="card text-sm font-semibold leading-relaxed">{item}</article>
          ))}
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="著者紹介" title="猫山氏｜教える力 × 稼がせる支援経験" />
        <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
          <Image src="/placeholders/author-neko.svg" alt="著者 猫山氏 プレースホルダー" width={220} height={220} className="rounded-2xl border object-cover" />
          <div className="card">
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
              <li>・国家資格系の法務コンサルティング業に従事</li>
              <li>・個人事業主の開業、売上UP、WEB集客、契約書類、SEO、商品展開を支援</li>
              <li>・副業コンサルタントとして7年間の実績</li>
              <li>・進学塾講師として8年間勤務し、難しい内容を噛み砕く指導を経験</li>
              <li>・本書は「教える力」と「稼がせる支援経験」を融合した教材</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="教材ボリューム" title="数字で見る、圧倒的な情報密度" center />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map(([num, label]) => (
            <div key={label} className="card text-center">
              <p className="text-2xl font-black text-brand-navy">{num}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="特典" title="購入者限定の4大ボーナス" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {bonusCards.map((bonus, idx) => (
            <article key={bonus.title} className="card">
              <p className="text-xs font-bold text-brand-gold">特典 {idx + 1}</p>
              <h3 className="mt-2 text-lg font-bold text-brand-navy">{bonus.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{bonus.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container grid gap-8 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="おすすめできる人" title="本気で副業力を伸ばしたいあなたへ" />
          <ul className="mt-5 space-y-2 text-sm">
            {forWho.map((item) => (
              <li key={item} className="rounded-xl bg-emerald-50 p-3 text-emerald-800">✅ {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle eyebrow="おすすめできない人" title="ミスマッチを防ぐために" />
          <ul className="mt-5 space-y-2 text-sm">
            {notForWho.map((item) => (
              <li key={item} className="rounded-xl bg-rose-50 p-3 text-rose-800">⚠️ {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="価格・販売条件" title="ルールを明確に。煽らず、誠実に。" />
        <div className="mt-6 card">
          <p className="text-3xl font-black text-brand-navy">現在価格：¥39,800〜</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>・20冊完売ごとに2,000円ずつ値上げ</li>
            <li>・最終価格：39,800円</li>
            <li>・値下げ予定なし</li>
            <li>・返金対応あり（NOTE版）</li>
          </ul>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="FAQ" title="購入前によくある質問" />
        <div className="mt-6 space-y-4">
          {[
            ["初心者でも読めますか？", "はい。副業をゼロから学びたい方にも向けた内容です。ただし、楽して稼ぐ裏技集ではなく、思考と実践を重視した教材です。"],
            ["すぐに稼げますか？", "即金性を保証する教材ではありません。副業で成果を出すための考え方、行動、実践手順を体系的に学ぶ教材です。"],
            ["AIの使い方も学べますか？", "はい。AIに作業を任せるだけでなく、AIと一緒に思考し、副業の判断力や実行力を高める活用方法も扱います。"],
            ["どんな人に向いていますか？", "副業を本気で学びたい方、これまで成果が出なかった方、稼ぐ力を根本から鍛えたい方に向いています。"],
            ["返金対応はありますか？", "NOTE版では返金対応があります。購入前に販売ページ上の条件を必ず確認してください。"]
          ].map(([q, a]) => (
            <details key={q} className="card group">
              <summary className="cursor-pointer list-none font-bold text-brand-navy">Q. {q}</summary>
              <p className="mt-2 text-sm text-slate-600">A. {a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section-container pb-20">
        <div className="rounded-3xl bg-brand-navy p-8 text-white">
          <h2 className="text-2xl font-black leading-tight sm:text-3xl">AI時代の副業を、感覚ではなく“戦略”で攻略する。</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">副業は、もはや片手間で勝てる領域ではありません。だからこそ、稼ぐための思考・行動・実践手順を体系的に学ぶ価値があります。本気で副業を変えたい方は、今すぐ本書をご確認ください。猫山のユーモアも、ちょっとだけ添えておきます。</p>
          <div className="mt-6">
            <CTAButtons compact />
          </div>
        </div>
      </section>
    </main>
  );
}
