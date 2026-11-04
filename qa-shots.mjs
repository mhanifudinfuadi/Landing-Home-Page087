export default async function run(page, ui) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(2000);
  const shoot = async (name) => {
    await page.screenshot({ path: `./shot-${name}.png` });
  };
  const info = {};
  await shoot("hero");
  // scroll through sections and capture
  const ids = ["planets", "scanner", "kuis", "bandingkan", "destinasi"];
  for (const id of ids) {
    await page.evaluate((i) => document.getElementById(i).scrollIntoView(), id);
    await page.waitForTimeout(1500);
    await shoot(id);
    info[id] = await page.evaluate((i) => {
      const el = document.getElementById(i);
      const r = el.getBoundingClientRect();
      return { height: Math.round(r.height), top: Math.round(r.top) };
    }, id);
  }
  info.overflow = await page.evaluate(() => document.documentElement.scrollWidth);
  info.innerWidth = await page.evaluate(() => window.innerWidth);
  return info;
}
