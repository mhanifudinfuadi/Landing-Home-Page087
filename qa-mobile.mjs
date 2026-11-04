export default async function run(page, ui) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(2500);
  const vw = await page.evaluate(() => window.innerWidth);
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  const overflow = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1)) {
        // ignore elements inside overflow-hidden marquee
        out.push({
          tag: el.tagName,
          cls: (el.className && el.className.baseVal === undefined ? el.className : "").toString().slice(0, 90),
          left: Math.round(r.left),
          right: Math.round(r.right),
          text: (el.textContent || "").trim().slice(0, 40),
        });
      }
    });
    return out.slice(0, 40);
  });
  return { vw, scrollW, overflow };
}
