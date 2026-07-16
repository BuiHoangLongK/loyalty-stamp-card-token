import { expect, test } from '@playwright/test';

test.describe('StampChain E2E', () => {
  test('landing page has two-panel layout', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('two-panel-layout')).toBeVisible();
    await page.screenshot({ path: 'screen-shot/01-landing.jpg', type: 'jpeg', quality: 85 });
  });

  test('stamp card visual renders on landing', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('stamp-card').first()).toBeVisible();
    await page.screenshot({ path: 'screen-shot/02-stamp-card.jpg', type: 'jpeg', quality: 85 });
  });

  test('QR / merchant section renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('qr-section')).toBeVisible();
    await page.screenshot({ path: 'screen-shot/03-qr.jpg', type: 'jpeg', quality: 85 });
  });

  test('merchant dashboard shows customer list', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByTestId('customer-list')).toBeVisible();
    await page.screenshot({ path: 'screen-shot/04-dashboard.jpg', type: 'jpeg', quality: 85 });
  });

  test('dashboard exposes clawback control', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByTestId('clawback-btn').first()).toBeVisible();
    await page.screenshot({ path: 'screen-shot/05-clawback.jpg', type: 'jpeg', quality: 85 });
  });

  test('customer stamp card page loads', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /view a customer card/i });
    if (await link.count()) {
      await link.first().click();
      await expect(page.getByTestId('stamp-card').first()).toBeVisible();
    }
    await page.screenshot({ path: 'screen-shot/06-customer.jpg', type: 'jpeg', quality: 85 });
  });

  test('mobile viewport renders stamp card', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.getByTestId('stamp-card').first()).toBeVisible();
    await page.screenshot({ path: 'screen-shot/07-mobile.jpg', type: 'jpeg', quality: 85 });
  });
});
