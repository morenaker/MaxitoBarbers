import { Benefit, Variant } from "./types";

export const VARIANTS: Variant[] = [
  {
    id: 'thin-skin',
    title: 'Ultra Thin Skin (0.03mm)',
    description: 'Nejrealističtější varianta na trhu. Membrána je tak tenká, že splyne s pokožkou a je na dotek neznatelná. Ideální pro ty, kteří chtějí odhalené čelo.',
    durability: '2-3 měsíce',
    realism: 'Extrémní',
    image: 'photo/model1.jpg'
  },
  {
    id: 'lace',
    title: 'Swiss Lace (Krajka)',
    description: 'Perfektní prodyšnost. Ideální pro sportovce a aktivní životní styl. Uzlíky jsou bělené pro neviditelný vzhled.',
    durability: '3-4 měsíce',
    realism: 'Vysoká',
    image: 'photo/model2.jpg'
  },
  {
    id: 'mono',
    title: 'Monofilament + Poly',
    description: 'Kombinace odolnosti a přirozenosti. Střed tvoří odolná síťovina, okraje jsou z polyuretanu pro snadné lepení a čištění.',
    durability: '6+ měsíců',
    realism: 'Střední',
    image: 'photo/model3.jpg'
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: "Okamžitá proměna",
    description: "Během dvou hodin odejdete s plnými vlasy. Žádné čekání na výsledky transplantace.",
    icon: "clock"
  },
  {
    title: "Neviditelné spoje",
    description: "Používáme nejmodernější techniky lepení a střihu, díky kterým je přechod nerozeznatelný.",
    icon: "eye-off"
  },
  {
    title: "Život bez omezení",
    description: "S naším systémem můžete plavat, sportovat a žít naplno bez obav z posunutí.",
    icon: "activity"
  },
  {
    title: "Konzultace na míru",
    description: "Maxim Schejbal osobně navrhne řešení přesně pro váš typ obličeje a životní styl.",
    icon: "user-check"
  }
];

export const AI_SYSTEM_INSTRUCTION = `
Jsi virtuální asistent pro Maxito Barbers a Maxima Schejbala. Jsi expert na pánská tupé (vlasové náhrady/systémy).
Tvým cílem je edukovat zákazníky a zbavit je obav.
Odpovídej česky, stručně, profesionálně a s pochopením (je to citlivé téma).

Klíčové informace, které máš:
- Nabízíme varianty: Ultra Thin Skin (nejrealističtější, menší životnost), Swiss Lace (prodyšné, sport), Mono (odolné).
- Životnost se pohybuje od 2 do 6 měsíců podle typu.
- S vlasy se dá plavat, sprchovat i sportovat.
- Cena se řeší individuálně na konzultaci (neříkej přesné částky, jen že je to investice do sebevědomí).
- Údržba (přeplošování) je nutná cca každé 3-4 týdny.
- Nabízíme online konzultaci přes Teams.

Pokud se zeptají na rezervaci, odkaž je na sekci "Rezervace" nebo formulář níže.
`;