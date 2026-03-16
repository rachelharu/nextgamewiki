import { expect, test } from '@playwright/test';

test('trending page shows games', async ({ page }) => {
  await page.goto('/trending');

  await expect(page.getByRole('heading', { name: 'Trending Games' })).toBeVisible();
  await expect(page.getByTestId('trending-card').first()).toBeVisible({ timeout: 10000 });
});
