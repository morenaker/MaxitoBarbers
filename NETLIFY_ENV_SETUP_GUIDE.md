# Návod: Nastavení Environment Variables na Netlify

## 🔴 Problém, který jsme vyřešili

Váš web nefungoval na Netlify, protože:
1. **Vite config** nedefinoval EmailJS proměnné → nebyly dostupné v kódu
2. **geminiService.ts** používal `process.env` místo `import.meta.env` → nefunguje v prohlížeči
3. **netlify.toml** měl prázdné proměnné → přepisovaly UI nastavení
4. **Chyběl VITE_ prefix** u Gemini klíče → Vite ho neexportoval

## ✅ Co jsme opravili

### 1. **vite.config.ts** - Přidáno všech 5 proměnných
```typescript
define: {
  'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
  'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY),
  'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(env.VITE_EMAILJS_SERVICE_ID),
  'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID),
  'import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_CONTACT_TEMPLATE_ID)
}
```

### 2. **geminiService.ts** - Správný přístup k API klíči
```typescript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });
```

### 3. **netlify.toml** - Odstraněny prázdné proměnné
Nyní obsahuje jen komentář s instrukcemi, aby se proměnné nenastavovaly na prázdné stringy.

### 4. **.env.local** a **env.local.template** - Přidán VITE_ prefix
```
VITE_GEMINI_API_KEY=...
VITE_EMAILJS_PUBLIC_KEY=...
```

---

## 🚀 Postup nastavení na Netlify

### Krok 1: Pushněte změny na GitHub
```bash
git add .
git commit -m "Fix: Opravit environment variables pro Netlify"
git push origin main
```

### Krok 2: Jděte do Netlify Dashboard
1. Přihlaste se na [Netlify](https://app.netlify.com)
2. Vyberte váš web (maxito-barbers)
3. Jděte na **Site settings** (v levém menu)
4. Klikněte na **Build & deploy**
5. Rozbalte **Environment** sekci

### Krok 3: Přidejte/upravte environment variables

Měli byste mít tyto proměnné (zkontrolujte, že už tam jsou):

| Proměnná | Hodnota | Popis |
|----------|---------|-------|
| `VITE_GEMINI_API_KEY` | `AIzaSyBCBej2IZtPFQY7zyNfFMICjki-RQQSC5E` | Gemini API klíč |
| `VITE_EMAILJS_PUBLIC_KEY` | `xmCR180EjvKajciP-` | EmailJS public key |
| `VITE_EMAILJS_SERVICE_ID` | `service_vdxluuk` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_648codi` | EmailJS šablona pro booking |
| `VITE_EMAILJS_CONTACT_TEMPLATE_ID` | `template_hfh1aho` | EmailJS šablona pro kontakt |

**DŮLEŽITÉ:** Všechny proměnné musí mít prefix `VITE_` (kromě těch, které jsou jen pro backend)!

### Krok 4: Spusťte nový build
1. Jděte na **Deploys** v Netlify
2. Klikněte na **Trigger deploy** → **Deploy site**
3. Čekejte, až se build dokončí (2-3 minuty)

### Krok 5: Testujte
1. Otevřete váš web
2. Klikněte na AI chat (pravý dolní roh) - měl by fungovat
3. Vyplňte kontaktní formulář - měl by se odeslat

---

## 🔍 Troubleshooting

### Stále nefungují emaily?
1. Zkontrolujte, že máte všechny 5 proměnných v Netlify
2. Zkontrolujte, že hodnoty jsou správné (bez mezer na začátku/konci)
3. Zkontrolujte v **Network** tabu v DevTools, jestli se EmailJS volání posílá
4. Zkontrolujte EmailJS dashboard, jestli jsou šablony správně nastaveny

### AI chat nefunguje?
1. Otevřete **Console** v DevTools (F12)
2. Hledejte chybu obsahující "VITE_GEMINI_API_KEY"
3. Zkontrolujte, že `VITE_GEMINI_API_KEY` je v Netlify environment variables
4. Zkontrolujte, že API klíč je správný

### Build se nezdařil?
1. Jděte na **Deploys** a klikněte na poslední deploy
2. Rozbalte **Deploy log** a hledejte chyby
3. Nejčastěji je to chyba v TypeScript - zkontrolujte, jestli se projekt builduje lokálně: `npm run build`

---

## 📝 Lokální testování

Chcete-li testovat lokálně, ujistěte se, že máte správný `.env.local`:

```bash
# .env.local
VITE_GEMINI_API_KEY=AIzaSyBCBej2IZtPFQY7zyNfFMICjki-RQQSC5E
VITE_EMAILJS_PUBLIC_KEY=xmCR180EjvKajciP-
VITE_EMAILJS_SERVICE_ID=service_vdxluuk
VITE_EMAILJS_TEMPLATE_ID=template_648codi
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_hfh1aho
```

Pak spusťte:
```bash
npm install
npm run dev
```

---

## 🎯 Klíčové principy Vite + Netlify

1. **VITE_ prefix je povinný** - Vite automaticky exportuje jen proměnné s `VITE_` prefixem
2. **Vite config musí definovat proměnné** - Musíte je přidat do `define` sekce
3. **import.meta.env se používá v kódu** - Nikdy ne `process.env` v prohlížeči
4. **netlify.toml by neměl mít prázdné proměnné** - Používejte Netlify UI místo toho

---

## 📞 Potřebujete pomoc?

Pokud stále něco nefunguje:
1. Zkontrolujte build log v Netlify
2. Zkontrolujte browser console (F12)
3. Zkontrolujte, že všechny 5 proměnných jsou v Netlify UI
4. Zkuste vymazat cache a znovu deployovat

Hodně štěstí! 🚀
