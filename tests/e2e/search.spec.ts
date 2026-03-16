import { expect, test } from '@playwright/test';

test('search navigates to a game details page', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Search');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('minecraft');

  const firstResult = page.locator('.dropdown-item').first();
  await expect(firstResult).toBeVisible({ timeout: 20000 });
  await firstResult.click();

  await expect(page).toHaveURL(/\/gameDetails\/\d+/, { timeout: 10000 });
});
