import { test, expect } from '@playwright/test'

const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173'
const BACKEND = process.env.BACKEND_URL || 'http://localhost:9000'

test.describe('Storefront', () => {
  test('home page loads', async ({ page }) => {
    await page.goto(FRONTEND)
    await expect(page.getByRole('heading', { name: /welcome to tzel/i })).toBeVisible()
  })

  test('menu loads items from API', async ({ page }) => {
    await page.goto(`${FRONTEND}/menu`)
    await expect(page.getByRole('heading', { name: /crafted to perfection/i })).toBeVisible({ timeout: 15_000 })
    await expect(page.locator('article').first()).toBeVisible({ timeout: 15_000 })
  })

  test('login and register pages', async ({ page }) => {
    await page.goto(`${FRONTEND}/login`)
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
    await page.goto(`${FRONTEND}/register`)
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible()
  })

  test('promotions page', async ({ page }) => {
    await page.goto(`${FRONTEND}/promotions`)
    await expect(page.getByRole('heading', { name: /promotions/i })).toBeVisible()
  })
})

test.describe('Admin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BACKEND}/login`)
    await page.locator('#email').fill('admin@tzelcafe.local')
    await page.locator('#password').fill('Admin@8498')
    await page.getByRole('button', { name: /log in/i }).click()
    await page.waitForURL(/\/admin/)
  })

  test('dashboard loads', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /overview/i })).toBeVisible()
  })

  test('profile content is not hidden behind sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(`${BACKEND}/admin/profile`)

    const sidebar = page.locator('#admin-sidebar')
    const main = page.locator('.admin-main')
    const profileHeading = page.getByRole('heading', { name: /my profile/i })

    await expect(profileHeading).toBeVisible()

    const sidebarBox = await sidebar.boundingBox()
    const mainBox = await main.boundingBox()
    const headingBox = await profileHeading.boundingBox()

    expect(sidebarBox).not.toBeNull()
    expect(mainBox).not.toBeNull()
    expect(headingBox).not.toBeNull()

    // Main column must start at or after the sidebar ends (no overlap)
    expect(mainBox!.x).toBeGreaterThanOrEqual(sidebarBox!.x + sidebarBox!.width - 2)
    expect(headingBox!.x).toBeGreaterThanOrEqual(sidebarBox!.x + sidebarBox!.width - 2)

    await expect(page.getByText(/profile details/i)).toBeVisible()
    await expect(page.getByText(/change password/i)).toBeVisible()
  })

  test('admin nav pages respond', async ({ page }) => {
    const paths = ['/admin/orders', '/admin/categories', '/admin/menu-items', '/admin/promotions']
    for (const path of paths) {
      await page.goto(`${BACKEND}${path}`)
      await expect(page.locator('#admin-sidebar')).toBeVisible()
      await expect(page.locator('.admin-main')).toBeVisible()
    }
  })
})
