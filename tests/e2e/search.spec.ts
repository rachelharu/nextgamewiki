import { expect, test } from '@playwright/test';

test('search navigates to a game details page', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Search');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('minecraft');

  const firstResult = page.locator('button.dropdown-item').first();
  await expect(firstResult).toBeVisible({ timeout: 20000 });
  await Promise.all([
    page.waitForURL(/\/gameDetails\/\d+/, { timeout: 30000 }),
    firstResult.click(),
  ]);

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 });
});
