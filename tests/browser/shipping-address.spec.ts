import { test, expect } from '@playwright/test';

const location = (id: number, name: string) => ({ id, label: `${name}, Jakarta, 12345`, subdistrict_name: name, district_name: 'Kecamatan Uji', city_name: 'Jakarta', province_name: 'DKI Jakarta', zip_code: '12345' });

test('registration can select destinations beyond the first page and enter a business address', async ({ page }) => {
  await page.route('**/api/shipping/destinations?*', route => {
    const offset = new URL(route.request().url()).searchParams.get('offset');
    return route.fulfill({ json: offset === '10' ? [location(11, 'Kelurahan Tujuan')] : Array.from({ length: 10 }, (_, i) => location(i + 1, `Wilayah ${i}`)) });
  });
  await page.goto('/member/auth');
  await page.getByRole('button', { name: 'Register', exact: true }).click();
  await page.getByLabel('Cari wilayah pengiriman', { exact: true }).fill('Jakarta');
  await page.getByRole('button', { name: 'Hasil berikutnya' }).click();
  await page.getByRole('button', { name: /Kelurahan Tujuan/ }).click();
  await expect(page.getByPlaceholder('Kode pos', { exact: true })).toHaveValue('12345');
  await page.getByLabel('Detail Alamat', { exact: true }).fill('Jaxer Indonesia, Jalan Contoh No. 10');
  await expect(page.getByLabel('Detail Alamat', { exact: true })).toHaveValue('Jaxer Indonesia, Jalan Contoh No. 10');
  await expect(page.getByText(/Wilayah dipilih:/)).toContainText('Kelurahan Tujuan');
});

test('destination search displays failures and supports retry', async ({ page }) => {
  let fail = true;
  await page.route('**/api/shipping/destinations?*', route => route.fulfill(fail ? { status: 502, json: { error: 'Pencarian sementara gagal' } } : { json: [location(1, 'Tujuan')] }));
  await page.goto('/member/auth');
  await page.getByRole('button', { name: 'Register', exact: true }).click();
  await page.getByLabel('Cari wilayah pengiriman', { exact: true }).fill('12345');
  await expect(page.getByRole('alert')).toContainText('Pencarian sementara gagal');
  fail = false;
  await page.getByRole('button', { name: 'Coba lagi', exact: true }).click();
  await expect(page.getByRole('button', { name: /Tujuan/ })).toBeVisible();
});

test('checkout lets an existing member change destination and sends the detailed address to WhatsApp', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('jaxlab_member', JSON.stringify({ id: 'buyer', name: 'Pembeli', email: 'buyer@example.invalid', phoneWa: '08123', address: 'Alamat Lama', shippingDestinationId: 1, shippingDestination: 'Wilayah Lama', expiresAt: new Date(Date.now() + 86400000).toISOString() }));
    localStorage.setItem('jaxlab_cart:buyer', JSON.stringify([{ productId: 'p1', qty: 1 }]));
  });
  let savedItems = [{ productId: 'p1', qty: 1 }];
  await page.route('**/api/members/cart', route => {
    if (route.request().method() === 'PUT') savedItems = route.request().postDataJSON().items;
    return route.fulfill({ json: { memberId: 'buyer', items: savedItems } });
  });
  await page.route('**/api/products', route => route.fulfill({ json: [{ id: 'p1', name: 'Minyak', price: 50000, weightGrams: 1000, images: [], category: 'Oil' }] }));
  await page.route('**/api/shipping/destinations?*', route => route.fulfill({ json: [location(22, 'Wilayah Baru')] }));
  await page.route('**/api/shipping/costs', route => route.fulfill({ json: [{ code: 'jne', service: 'REG', cost: 15000, etd: '2 hari' }] }));
  let whatsapp = '';
  await page.route('https://wa.me/**', route => { whatsapp = route.request().url(); return route.abort(); });
  await page.goto('/cart');
  await page.getByLabel('Cari wilayah pengiriman', { exact: true }).fill('Wilayah Baru');
  await page.getByRole('button', { name: /Wilayah Baru/ }).click();
  await page.getByLabel('Detail Alamat', { exact: true }).fill('Jaxer Indonesia, Jalan Contoh No. 10');
  await page.getByRole('button', { name: /jne.*REG/i }).click();
  await page.getByRole('button', { name: 'Bayar Online', exact: true }).click();
  await expect.poll(() => whatsapp).toContain('https://wa.me/628131536969');
  const message = new URL(whatsapp).searchParams.get('text')!;
  expect(message).toContain('Alamat: Jaxer Indonesia, Jalan Contoh No. 10');
  expect(message).toContain('Alamat: Jaxer Indonesia, Jalan Contoh No. 10, Wilayah Baru, Jakarta, 12345');
  expect(message).toContain('Pengirim: Jaxlab Indonesia');
  expect(message).not.toContain('Tujuan:');
  expect(message).not.toContain('Kode pos:');
  await expect.poll(() => savedItems).toEqual([]);
  const storage = await page.context().storageState();
  const cart = storage.origins.flatMap(origin => origin.localStorage).find(item => item.name === 'jaxlab_cart:buyer');
  expect(JSON.parse(cart!.value)).toEqual([]);
  expect(message).not.toContain('Alamat Lama');
});
