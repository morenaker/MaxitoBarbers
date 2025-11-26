# Shrnutí změn pro Netlify nasazení

## Přidané soubory

### 1. `netlify.toml` (NOVÝ)
Kritická konfigurace pro Netlify. Obsahuje:
- Build příkaz: `npm run build`
- Publish directory: `dist`
- Redirect pravidla pro SPA (všechny routy → index.html)
- Placeholder pro environment proměnné

## Doporučené změny v kódu

### 1. `vite.config.ts` (OPRAVA)

**Aktuální stav:** Konfiguruje pouze `GEMINI_API_KEY` a `VITE_EMAILJS_PUBLIC_KEY`

**Doporučená oprava:**
```typescript
define: {
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY),
  'process.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(env.VITE_EMAILJS_SERVICE_ID),
  'process.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID),
  'process.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_CONTACT_TEMPLATE_ID),
},
```

**NEBO** (lepší přístup - už v kódu máš):
Používej `import.meta.env.VITE_*` přímo v komponentách - Vite to automaticky zpřístupňuje.

## Kroky k nasazení

1. **Pushni změny na GitHub:**
   ```bash
   git add netlify.toml NETLIFY_DEPLOYMENT_GUIDE.md CHANGES_SUMMARY.md
   git commit -m "Add Netlify configuration and deployment guide"
   git push origin main
   ```

2. **V Netlify Dashboard:**
   - Připoj GitHub repozitář (pokud ještě není připojen)
   - Přidej Environment Variables (viz NETLIFY_DEPLOYMENT_GUIDE.md)
   - Spusť deploy

## Klíčové problémy, které to řeší

| Problém | Řešení |
|---------|--------|
| Prázdná stránka | `netlify.toml` s build konfigurací |
| Routy nefungují | Redirect pravidla v `netlify.toml` |
| API klíče nejsou dostupné | Environment Variables v Netlify |
| Netlify neví jak buildovat | Build command v `netlify.toml` |

## Ověření

Po nasazení zkontroluj:
- [ ] Stránka se načte s obsahem
- [ ] Navigace funguje (klikání na menu)
- [ ] Formuláře fungují (Kontakt, Rezervace)
- [ ] AI Chat funguje
- [ ] Obrázky se načítají správně
