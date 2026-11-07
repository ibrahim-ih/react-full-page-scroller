import { test, expect, Page } from '@playwright/test'

const scrollY = (page: Page): Promise<number> =>
  page.evaluate(() => Math.round(window.scrollY))
const viewportHeight = (page: Page): Promise<number> =>
  page.evaluate(() => window.innerHeight)

async function expectPage(page: Page, index: number): Promise<void> {
  const height = await viewportHeight(page)
  await expect.poll(() => scrollY(page)).toBe(index * height)
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('React Full Page Scroller')).toBeVisible()
})

test('renders three full-viewport pages and navigation', async ({ page }) => {
  const height = await viewportHeight(page)
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  expect(total).toBe(height * 3)
  for (const title of ['Title 1', 'Title 2', 'Title 3']) {
    await expect(page.getByText(title, { exact: true })).toBeVisible()
  }
  await expectPage(page, 0)
})

test('has no console errors or failed requests on load', async ({ page }) => {
  const problems: string[] = []
  page.on('console', (m) => m.type() === 'error' && problems.push(m.text()))
  page.on('pageerror', (e) => problems.push(e.message))
  page.on('requestfailed', (r) => problems.push(`failed: ${r.url()}`))
  await page.reload()
  await expect(page.getByText('React Full Page Scroller')).toBeVisible()
  expect(problems).toEqual([])
})

test('navigation buttons jump to the matching page', async ({ page }) => {
  await page.getByText('Title 3', { exact: true }).click()
  await expectPage(page, 2)
  await expect(page.getByText('Section 3')).toBeInViewport()

  // Wait out the one-second scroll lock before navigating again.
  await page.waitForTimeout(1100)
  await page.getByText('Title 1', { exact: true }).click()
  await expectPage(page, 0)
  await expect(page.getByText('React Full Page Scroller')).toBeInViewport()
})

test('mouse wheel scrolls one page at a time in both directions', async ({
  page
}) => {
  await page.mouse.move(640, 360)
  await page.mouse.wheel(0, 100)
  await expectPage(page, 1)
  await expect(page.getByText('USAGE')).toBeInViewport()

  await page.waitForTimeout(1100)
  await page.mouse.wheel(0, -100)
  await expectPage(page, 0)
})

test('does not scroll past the first or last page', async ({ page }) => {
  await page.mouse.move(640, 360)
  await page.mouse.wheel(0, -100)
  await page.waitForTimeout(300)
  await expectPage(page, 0)

  await page.getByText('Title 3', { exact: true }).click()
  await expectPage(page, 2)
  await page.waitForTimeout(1100)
  await page.mouse.wheel(0, 100)
  await page.waitForTimeout(300)
  await expectPage(page, 2)
})

test('scroll lock keeps a rapid burst of wheel events to one page', async ({
  page
}) => {
  await page.mouse.move(640, 360)
  for (let i = 0; i < 5; i++) await page.mouse.wheel(0, 100)
  await expectPage(page, 1)
  await page.waitForTimeout(300)
  await expectPage(page, 1)
})
