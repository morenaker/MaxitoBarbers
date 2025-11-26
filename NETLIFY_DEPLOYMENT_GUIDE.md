# Návod na nasazení Maxito Barbers na Netlify

## Problém, který jsi měl

Tvůj projekt se na Netlify načítá jako prázdná stránka. Příčina je následující:

1. **Chybí `netlify.toml`** - Netlify neví, jak projekt buildovat a kde najít výstupní soubory
2. **Chybí redirect pravidla** - Single Page Application (SPA) potřebuje přesměrovat všechny routy na `index.html`
3. **Chybí konfigurace environment proměnných** - Netlify neví, kde najít API klíče

## Řešení

### 1. Přidej `netlify.toml` do projektu

Soubor `netlify.toml` už byl přidán do tvého projektu. Obsahuje:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  VITE_EMAILJS_PUBLIC_KEY = ""
  VITE_EMAILJS_SERVICE_ID = ""
  VITE_EMAILJS_TEMPLATE_ID = ""
  VITE_EMAILJS_CONTACT_TEMPLATE_ID = ""
  GEMINI_API_KEY = ""
```

**Co to dělá:**
- `[build]` - Říká Netlify, aby spustil `npm run build` a publikoval složku `dist`
- `[[redirects]]` - Všechny neznámé routy se přesměrují na `index.html` (důležité pro React Router)
- `[context.production.environment]` - Definuje environment proměnné

### 2. Nastav Environment Variables v Netlify

Jdi do Netlify Dashboard → Site Settings → Environment Variables a přidej:

| Klíč | Hodnota |
|------|---------|
| `VITE_EMAILJS_PUBLIC_KEY` | Tvůj EmailJS public key |
| `VITE_EMAILJS_SERVICE_ID` | Tvůj EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Tvůj EmailJS booking template ID |
| `VITE_EMAILJS_CONTACT_TEMPLATE_ID` | Tvůj EmailJS contact template ID |
| `GEMINI_API_KEY` | Tvůj Google Gemini API klíč |

**Jak to najít:**
- **EmailJS**: Přihlaš se na https://www.emailjs.com/ → Account → API Keys
- **Gemini API**: Přihlaš se na https://ai.google.dev/ → Get API Key

### 3. Aktualizuj vite.config.ts (DŮLEŽITÉ)

Tvůj `vite.config.ts` má chybu. Měl by vypadat takto:

```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY),
      'process.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(env.VITE_EMAILJS_SERVICE_ID),
      'process.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID),
      'process.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_CONTACT_TEMPLATE_ID),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
```

**Nebo ještě lépe - používej `import.meta.env` v kódu:**

V `App.tsx` máš:
```typescript
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
```

To je správně! Vite automaticky zpřístupňuje proměnné s prefixem `VITE_`.

### 4. Postup nasazení na Netlify

1. **Pushni změny na GitHub:**
   ```bash
   git add .
   git commit -m "Add Netlify configuration"
   git push origin main
   ```

2. **Připoj GitHub repozitář k Netlify:**
   - Jdi na https://app.netlify.com
   - Klikni "Add new site" → "Import an existing project"
   - Vyber GitHub a tvůj repozitář `morenaker/MaxitoBarbers`

3. **Netlify automaticky detekuje:**
   - Build command: `npm run build` (z `netlify.toml`)
   - Publish directory: `dist` (z `netlify.toml`)

4. **Přidej Environment Variables:**
   - V Netlify Dashboard → Site Settings → Environment Variables
   - Přidej všechny klíče z tabulky výše

5. **Spusť nový build:**
   - Klikni "Trigger deploy" nebo pushni nový commit

## Kontrola

Po nasazení by mělo fungovat:
- ✅ Stránka se načte s obsahem
- ✅ Navigace funguje
- ✅ Formuláře odesílají emaily
- ✅ AI chat funguje

## Troubleshooting

### Stránka se stále načítá prázdná
- Zkontroluj Build logs v Netlify (Deploys → Build log)
- Zkontroluj Browser console (F12) - jsou tam chyby?

### Formuláře nefungují
- Zkontroluj, že máš správně nastavené Environment Variables
- Zkontroluj EmailJS konfiguraci

### AI Chat nefunguje
- Zkontroluj, že máš `GEMINI_API_KEY` nastavenou v Netlify

## Poznámky

- **Node version**: Netlify používá Node 18+ (mělo by být OK)
- **Build time**: Prvnímu buildu může trvat déle (2-3 minuty)
- **Cache**: Pokud se změny neprojevují, zkus "Clear cache and deploy"

Pokud to stále nefunguje, pošli mi link na Netlify build log!
