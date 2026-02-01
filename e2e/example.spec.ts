import { test, expect } from '@playwright/test';

test('header has Gucchi logo and navigation items', async ({ page }) => {
  await page.goto('/');

  // Expect header to have Gucchi logo
  await expect(page.getByRole('banner').getByText('Gucchi')).toBeVisible();

  // Expect header to have navigation items
  await expect(page.getByRole('banner').getByText('自己紹介')).toBeVisible();
  await expect(page.getByRole('banner').getByText('スキル')).toBeVisible();
  await expect(page.getByRole('banner').getByText('お問い合わせ')).toBeVisible();
});
