const categoryPalette = {
  Electronics: { bg: "#DCEBFF", accent: "#0F5FE6" },
  Audio: { bg: "#E3F4FF", accent: "#0E7490" },
  Fashion: { bg: "#FFE8EF", accent: "#BE185D" },
  Shoes: { bg: "#F5EFFF", accent: "#7C3AED" },
  Watches: { bg: "#F4F1EA", accent: "#7C5A2C" },
  Home: { bg: "#E9F8F1", accent: "#047857" },
  "Home Decor": { bg: "#FFF4E5", accent: "#B45309" },
  Beauty: { bg: "#FFEAF4", accent: "#BE185D" },
  "Sports & Fitness": { bg: "#E8FFF3", accent: "#059669" }
};

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const getCategoryFallbackImage = (category = "Products", label = "UrbanMart") => {
  const palette = categoryPalette[category] || { bg: "#EAF1FB", accent: "#0F5FE6" };
  const safeCategory = escapeXml(category);
  const safeLabel = escapeXml(label);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${palette.bg}" />
          <stop offset="100%" stop-color="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)" />
      <rect x="80" y="80" width="1040" height="640" rx="34" fill="none" stroke="${palette.accent}" stroke-width="6" opacity="0.35" />
      <text x="600" y="370" text-anchor="middle" font-size="72" font-family="Arial, Helvetica, sans-serif" fill="${palette.accent}" font-weight="700">${safeCategory}</text>
      <text x="600" y="445" text-anchor="middle" font-size="34" font-family="Arial, Helvetica, sans-serif" fill="#33537A" opacity="0.9">${safeLabel}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
