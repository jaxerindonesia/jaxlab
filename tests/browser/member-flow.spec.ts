import { test, expect } from '@playwright/test';

test('invalid login uses Sonner and affiliate accepts multiple photos', async ({ page }) => {
  await page.route('**/api/members/login', (route) => route.fulfill({ status: 401, json: { error: 'Email atau password salah. Silakan periksa kembali.' } }));
  await page.goto('/member/auth');
  await page.getByPlaceholder('nama@email.com').fill('test@example.invalid');
  await page.getByPlaceholder('Minimal 6 karakter').fill('incorrect');
  await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
  await expect(page.locator('[data-sonner-toast]')).toContainText('Email atau password salah');
  await page.getByRole('button', { name: 'Register', exact: true }).click();
  await expect(page.getByLabel('Foto pendukung affiliate', { exact: true })).toHaveCount(0);
  await page.getByRole('radio', { name: 'Ya', exact: true }).check();
  const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');
  await page.getByLabel('Foto pendukung affiliate', { exact: true }).setInputFiles([{ name: 'one.png', mimeType: 'image/png', buffer }, { name: 'two.png', mimeType: 'image/png', buffer }]);
  await expect(page.getByAltText('Foto pendukung 2', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Hapus foto pendukung 1', exact: true }).click();
  await expect(page.getByAltText('Foto pendukung 2', { exact: true })).toHaveCount(0);
  await page.getByRole('radio', { name: 'Tidak', exact: true }).check();
  await expect(page.getByLabel('Foto pendukung affiliate', { exact: true })).toHaveCount(0);
  await page.getByRole('link', { name: 'Beli Sekarang' }).last().click();
  await expect(page).toHaveURL(/\/products$/);
});

test('account cart count follows account changes and expires after 24 hours', async ({ page }) => {
  await page.clock.install();
  let owner = 'account-a';
  await page.route('**/api/members/cart', (route) => route.fulfill({ json: { memberId: owner, items: [{ productId: 'test-product', qty: owner === 'account-a' ? 2 : 5 }] } }));
  await page.route('**/api/products', (route) => route.fulfill({ json: [{ id: 'test-product', name: 'Test product', price: 10000, category: 'Test', images: [], weightGrams: 1000, weightEstimated: false }] }));
  await page.goto('/products');
  await expect(page.getByRole('heading', { name: 'Test product', exact: true })).toBeVisible();
  await page.evaluate(() => {
    localStorage.setItem('jaxlab_member', JSON.stringify({ id: 'account-a', name: 'Account A', email: 'a@example.invalid', expiresAt: new Date(Date.now() + 86400000).toISOString() }));
    window.dispatchEvent(new Event('jaxlab:auth-changed'));
  });
  await expect(page.getByRole('button', { name: 'Keranjang, 2 item', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Keranjang, 2 item', exact: true }).click();
  await expect(page.getByText('Test product', { exact: true })).toBeVisible();
  owner = 'account-b';
  await page.evaluate(() => {
    localStorage.setItem('jaxlab_member', JSON.stringify({ id: 'account-b', name: 'Account B', email: 'b@example.invalid', expiresAt: new Date(Date.now() + 86400000).toISOString() }));
    window.dispatchEvent(new Event('jaxlab:auth-changed'));
  });
  await expect(page.getByRole('button', { name: 'Keranjang, 5 item', exact: true })).toBeVisible();
  await expect(page.getByText(/Rp\s*50\.000/).first()).toBeVisible();
  await page.clock.fastForward(86400001);
  await expect(page.getByRole('button', { name: 'Keranjang, 0 item', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Masuk untuk Melanjutkan' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('jaxlab_member'))).toBeNull();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('jaxlab_cart:account-a')!)[0].qty)).toBe(2);
});
