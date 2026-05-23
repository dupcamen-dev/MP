import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 375, height: 812 },
  isMobile: true,
  hasTouch: true,
});

const page = await context.newPage();
page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

await page.goto('https://mp-omega-seven.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(3000);

// Get initial card
let cards = await page.evaluate(() => {
  const cells = document.querySelectorAll('.carousel-cell');
  return [...cells].map((c, i) => ({ i, opacity: c.style.opacity, transform: c.style.transform }));
});
console.log('Before scroll (initial):');
cards.filter(c => c.opacity === '1').forEach(c => console.log(`  Card ${c.i} visible`));

// Scroll a bit to advance first card
await page.evaluate(() => window.scrollBy(0, 200));
await page.waitForTimeout(300);

cards = await page.evaluate(() => {
  const cells = document.querySelectorAll('.carousel-cell');
  return [...cells].map((c, i) => ({ i, opacity: c.style.opacity, transform: c.style.transform }));
});
console.log('After scroll 200px:');
cards.filter(c => c.opacity === '1').forEach(c => console.log(`  Card ${c.i} visible`));

// Scroll more
await page.evaluate(() => window.scrollBy(0, 400));
await page.waitForTimeout(300);

cards = await page.evaluate(() => {
  const cells = document.querySelectorAll('.carousel-cell');
  return [...cells].map((c, i) => ({ i, opacity: c.style.opacity, transform: c.style.transform }));
});
console.log('After scroll 600px:');
cards.filter(c => c.opacity === '1').forEach(c => console.log(`  Card ${c.i} visible`));

// Scroll a lot more to try to reach last card
const swipeText = await page.$$eval('span', els => {
  const s = els.find(s => s.textContent.includes('SWIPE'));
  return s ? s.textContent : 'NOT FOUND';
});
console.log('SWIPE text:', swipeText);

// Scroll to bottom to trigger carousel done
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(500);

const swipeText2 = await page.$$eval('span', els => {
  const s = els.find(s => s.textContent.includes('SWIPE'));
  return s ? s.textContent : 'NOT FOUND';
});
console.log('At bottom - SWIPE text:', swipeText2);

cards = await page.evaluate(() => {
  const cells = document.querySelectorAll('.carousel-cell');
  return [...cells].map((c, i) => ({ i, opacity: c.style.opacity, transform: c.style.transform }));
});
console.log('At bottom - visible cards:');
cards.filter(c => c.opacity === '1').forEach(c => console.log(`  Card ${c.i} visible`));

// Check if carouselDone was set
const carouselDone = await page.evaluate(() => {
  const el = document.querySelector('.carousel-3d');
  return el ? el.style.touchAction : 'N/A';
});
console.log('touchAction after scroll:', carouselDone);

await browser.close();
