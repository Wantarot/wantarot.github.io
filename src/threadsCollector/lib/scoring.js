export const DEFAULT_KEYWORDS = ["恋愛", "復縁", "引き寄せ", "潜在意識", "波動", "運命", "ツインレイ"];

const LOVE_KEYWORDS = ["恋愛", "復縁", "片思い", "彼", "彼女", "結婚"];
const SPIRITUAL_KEYWORDS = ["引き寄せ", "波動", "宇宙", "潜在意識", "ツインレイ", "エネルギー"];

function countMatches(text, keywords) {
  return keywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0);
}

export function buildLoveSpiScore(postText = "") {
  const normalized = postText.replace(/\s+/g, " ").trim();
  const loveScore = countMatches(normalized, LOVE_KEYWORDS);
  const spiritualScore = countMatches(normalized, SPIRITUAL_KEYWORDS);
  const balancedBonus = loveScore >= 2 && spiritualScore >= 2 ? 3 : 0;
  const totalScore = loveScore * 2 + spiritualScore * 2 + balancedBonus;

  return {
    love_score: loveScore,
    spiritual_score: spiritualScore,
    love_spi_score: totalScore,
    is_priority_post: loveScore >= 1 && spiritualScore >= 1,
  };
}
