# Lanjutan tugas: callback JaxPay (Tahap 1)

Terima kasih atas auditnya. Prompt sebelumnya terpotong, jadi ABAIKAN prompt lama dan pakai yang ini.

## KONTEKS
Pembayaran: website → JaxPay → Espay. Callback Espay ditangani JaxPay, bukan repo ini. Repo ini: Express + TypeScript + Prisma. Tugas: tambahkan endpoint penerima notifikasi pembayaran dari JaxPay.

## TAHAP 1 (kerjakan sekarang): HANYA MENAMBAH. JANGAN MENGHAPUS APA PUN.
Callback lama (POST /api/orders/xendit-webhook dan POST /api/orders/payment-notification) TETAP dibiarkan, karena checkout di src/api/routes/orders.ts masih membuat invoice Xendit/Midtrans. Menghapusnya sekarang akan membuat pembayaran yang masuk tidak menandai order lunas. Penghapusan adalah Tahap 2, nanti, dan bukan bagian tugas ini.

## ATURAN UTAMA (WAJIB)
- DILARANG mengubah atau merusak website dan sistem yang sudah ada (UI, alur checkout, auth, schema Prisma, migrasi, config, dependency, callback lama).
- Satu-satunya perubahan pada file yang sudah ada: (1) satu baris `app.use(...)` (plus satu baris import) di src/api/index.ts, (2) satu baris di .env.example. Tidak ada refactor atau perubahan lain pada file existing, termasuk src/api/routes/orders.ts.
- Jangan menambah dependency (cukup `crypto` bawaan Node dan `express`).
- Jangan menyentuh pembuatan pembayaran/checkout.
- Jangan menjalankan apa pun terhadap database production.
- Kerjakan di branch baru: `chore/jaxpay-callback`.

## KONTRAK WEBHOOK (kamu DIIZINKAN lanjut dengan ini, jangan berhenti menunggu spesifikasi)
- Path: POST /api/payments/jaxpay/callback (kita yang menentukan; JaxPay memanggil callback_url yang didaftarkan).
- Signature: HMAC-SHA256 dari body mentah dengan JAXPAY_WEBHOOK_SECRET, hex, header X-Signature (boleh berawalan "sha256="). Ini ASUMSI dan sengaja diisolasi di satu file supaya mudah diganti.
- Payload: field payment di root atau di dalam "data": reference_id, id, status (PENDING|PAID|EXPIRED|FAILED|CANCELLED), amount (integer), paid_at. Juga ASUMSI, terisolasi di parser.
- Response sukses: HTTP 200 `{"success":true}`. Retry adalah urusan JaxPay; endpoint harus idempotent.
- Endpoint fail-closed: signature tidak cocok → 401, tidak ada order yang berubah.

## LANGKAH 1: PERIKSA SEBELUM MENULIS (laporkan singkat)
a. Urutan middleware di src/api/index.ts: di mana `express.json()` dipasang. Signature butuh body MENTAH, jadi router JaxPay harus dipasang SEBELUM body parser JSON global, tanpa mengubah middleware lain.
b. Apakah ada middleware global (auth, CORS, rate limit, CSRF) di /api yang akan memblokir request server-ke-server ke /api/payments/jaxpay/callback. Jika ada, laporkan; jangan ubah middleware tersebut.
c. Konvensi folder dan cara import Prisma client di repo; sesuaikan path file baru di bawah.

## LANGKAH 2: BUAT 3 FILE BARU (sesuaikan lokasi/import dengan konvensi repo)

### File 1: src/api/lib/jaxpayWebhook.ts

```ts
import crypto from "crypto";

export function verifyJaxpaySignature(
  rawBody: string,
  headerValue: string | undefined,
  secret: string
): boolean {
  if (!secret || !headerValue) return false;
  const received = headerValue.replace(/^sha256=/i, "").trim().toLowerCase();
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export type JaxpayStatus = "PENDING" | "PAID" | "EXPIRED" | "FAILED" | "CANCELLED";

export type JaxpayNotification = {
  event?: string;
  paymentId?: string;
  referenceId: string;
  status: JaxpayStatus;
  amount: number;
  paidAt?: string;
  raw: Record<string, unknown>;
};

const VALID_STATUS: JaxpayStatus[] = ["PENDING", "PAID", "EXPIRED", "FAILED", "CANCELLED"];

export function parseJaxpayPayload(body: Record<string, unknown>): JaxpayNotification | null {
  const d = (body.data && typeof body.data === "object" ? body.data : body) as Record<string, unknown>;
  const referenceId = typeof d.reference_id === "string" ? d.reference_id : "";
  const status = String(d.status ?? "").toUpperCase() as JaxpayStatus;
  const amount = Number(d.amount);
  if (!referenceId || !VALID_STATUS.includes(status) || !Number.isFinite(amount)) return null;
  return {
    event: typeof body.event === "string" ? body.event : undefined,
    paymentId: typeof d.id === "string" ? d.id : undefined,
    referenceId,
    status,
    amount,
    paidAt: typeof d.paid_at === "string" ? d.paid_at : undefined,
    raw: body,
  };
}
```

### File 2: src/api/services/jaxpayOrder.ts

Ini satu-satunya titik sambung ke sistem yang ada. Isi `applyJaxpayNotification` dengan MEMINDAHKAN (salin persis, tanpa mengubah perilaku) logika penandaan lunas dari callback lama di orders.ts. Jangan memanggil atau memodifikasi kode di orders.ts; salin logikanya ke file baru ini.

Aturan:
- Cari order dengan `paymentRef === n.referenceId`. Tidak ketemu → `{ result: "not_found" }`.
- `n.amount` tidak sama dengan `order.totalAmount` → `{ result: "amount_mismatch" }`.
- Idempotent: gunakan pola `prisma.order.updateMany` dengan kondisi status belum lunas, persis seperti callback lama. Hanya jika `count > 0` jalankan pemrosesan lanjutan (referral: referralSetting, referralReward, dan efek samping lain yang dilakukan callback lama). Jika count 0 → `{ result: "already_processed" }`.
- `n.status === "PAID"` → tandai lunas dengan logika lama → `{ result: "updated" }`.
- EXPIRED/FAILED/CANCELLED → pakai nilai paymentStatus yang SUDAH ADA di sistem (lihat bagaimana callback lama menangani expired/failed). Jika tidak ada padanannya, jangan ubah order, kembalikan `already_processed`, dan laporkan.
- PENDING → abaikan, `already_processed`.
- Field `paymentProvider`: ikuti nilai/enum yang sudah ada. Jika enum membatasi nilai, JANGAN menambah nilai baru dan JANGAN mengubah schema; biarkan field itu seperti pada order, lalu laporkan.
- Jika ada bagian yang tidak yakin, biarkan stub di bawah (membalas not_found, sehingga tidak ada order berubah) dan jelaskan apa yang perlu disambungkan. Jangan menebak skema.

Kerangka:

```ts
import type { JaxpayNotification } from "../lib/jaxpayWebhook";

export type JaxpayOrderResult =
  | { result: "updated" }
  | { result: "already_processed" }
  | { result: "not_found" }
  | { result: "amount_mismatch" };

export async function applyJaxpayNotification(
  _n: JaxpayNotification
): Promise<JaxpayOrderResult> {
  return { result: "not_found" }; // GANTI sesuai aturan di atas
}
```

### File 3: src/api/routes/jaxpay.ts

```ts
import express, { Router, Request, Response } from "express";
import { parseJaxpayPayload, verifyJaxpaySignature } from "../lib/jaxpayWebhook";
import { applyJaxpayNotification } from "../services/jaxpayOrder";

const router = Router();

// express.raw agar signature dihitung dari byte asli request
router.post(
  "/callback",
  express.raw({ type: "*/*", limit: "1mb" }),
  async (req: Request, res: Response) => {
    const secret = process.env.JAXPAY_WEBHOOK_SECRET || "";
    if (!secret) {
      console.error("[jaxpay-callback] JAXPAY_WEBHOOK_SECRET belum diisi");
      return res.status(500).json({ success: false, error: "server not configured" });
    }

    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : "";

    if (!verifyJaxpaySignature(rawBody, req.header("x-signature"), secret)) {
      return res.status(401).json({ success: false, error: "invalid signature" });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return res.status(400).json({ success: false, error: "invalid json" });
    }

    const notification = parseJaxpayPayload(body);
    if (!notification) {
      return res.status(400).json({ success: false, error: "invalid payload" });
    }

    try {
      const { result } = await applyJaxpayNotification(notification);

      if (result === "not_found") {
        console.warn("[jaxpay-callback] order tidak ditemukan:", notification.referenceId);
        return res.status(404).json({ success: false, error: "order not found" });
      }
      if (result === "amount_mismatch") {
        console.error("[jaxpay-callback] amount tidak cocok:", notification.referenceId);
        return res.status(422).json({ success: false, error: "amount mismatch" });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("[jaxpay-callback] error", err);
      return res.status(500).json({ success: false, error: "internal error" });
    }
  }
);

export default router;
```

## LANGKAH 3: PASANG ROUTE (satu-satunya edit di file existing)

Di src/api/index.ts tambahkan import dan SATU baris `app.use`, diletakkan SEBELUM `express.json()` global:

```ts
import jaxpayRouter from "./routes/jaxpay";
app.use("/api/payments/jaxpay", jaxpayRouter);
```

Jika ternyata `express.json()` global dipasang di tempat yang membuat ini tidak mungkin tanpa mengubah middleware lain, berhenti dan laporkan; jangan mengubah body parser global.

## LANGKAH 4: ENV

Tambahkan hanya ke .env.example:

```
JAXPAY_WEBHOOK_SECRET=
```

## LANGKAH 5: VERIFIKASI

1. Type-check, lint, dan build (frontend dan backend) lolos seperti sebelum perubahan.
2. Skrip uji lokal di luar folder aplikasi (jangan di-commit), memakai secret DUMMY dan database lokal/mock, bukan production: signature valid → 200 (atau 404 selama stub belum disambungkan); signature salah → 401; body bukan JSON → 400; payload tidak lengkap → 400; kirim ulang notifikasi yang sama → tidak ada efek ganda (termasuk referral).
3. Pastikan callback Xendit dan Midtrans lama masih berfungsi persis seperti sebelumnya.
4. `git status` hanya boleh menunjukkan: 3 file baru, src/api/index.ts (2 baris), .env.example (1 baris). File PROMPT_JAXPAY.md ini tidak boleh ikut ter-commit.

## LAPORAN AKHIR

File baru, perubahan di file existing (tampilkan diff-nya), hasil pemeriksaan Langkah 1 (urutan body parser, middleware yang berpotensi memblokir), bagaimana `applyJaxpayNotification` disambungkan atau apa yang masih perlu saya sambungkan, hasil build/test, dan cara rollback (`git checkout Forxendit` atau hapus branch).
