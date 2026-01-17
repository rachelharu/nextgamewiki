import { expect, test } from '@playwright/test';

test('search navigates to a game details page', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const searchInput = page.getByPlaceholder('Search');
  await searchInput.fill('halo');

  const firstResult = page.locator('.dropdown-item').first();
  await expect(firstResult).toBeVisible({ timeout: 10000 });
  await firstResult.click();

  await expect(page).toHaveURL(/\/gameDetails\/\d+/);
});
