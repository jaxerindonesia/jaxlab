# React + TypeScript + Vite

## Email SMTP

Fitur lupa password dan verifikasi email memakai SMTP. Isi nilai berikut di `.env` server (jangan commit file ini):

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=alamat-email-anda@example.com
SMTP_PASSWORD=password-atau-app-password
SMTP_FROM="Jaxlab Indonesia <alamat-email-anda@example.com>"
PUBLIC_BASE_URL=https://domain-anda.example
```

Untuk Gmail atau Google Workspace, gunakan `smtp.gmail.com`, port `587`, dan **App Password** 16 karakter. Aktifkan 2-Step Verification pada akun `SMTP_USER`, buka `https://myaccount.google.com/apppasswords`, buat App Password baru (misalnya bernama `Jaxlab SMTP`), lalu masukkan 16 karakter yang dibuat Google ke `SMTP_PASSWORD` tanpa spasi. Password akun Google biasa tidak dapat dipakai. Jika menu App Passwords tidak tersedia, administrator Google Workspace harus mengizinkannya atau menyediakan SMTP relay. Untuk email domain lain, gunakan host SMTP, username, password, dan port yang diberikan penyedia hosting email. Port `587` memakai STARTTLS; port `465` memakai TLS langsung.

Setelah `.env` diisi, jalankan:

```bash
npm run smtp:verify
npm run dev
```

Perintah `smtp:verify` hanya menguji koneksi dan autentikasi SMTP, tidak mengirim email. Untuk uji pengiriman, buka halaman login member, pilih lupa password, lalu masukkan email member yang terdaftar. Pastikan `PUBLIC_BASE_URL` adalah URL publik HTTPS agar tautan reset dapat digunakan.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
