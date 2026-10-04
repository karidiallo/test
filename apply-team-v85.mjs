import fs from 'node:fs';

const contentPath = 'src/content.js';
const stylesPath = 'src/styles.css';

if (!fs.existsSync(contentPath) || !fs.existsSync(stylesPath)) {
  console.error('Nie znaleziono src/content.js lub src/styles.css. Uruchom skrypt z katalogu głównego projektu.');
  process.exit(1);
}

let content = fs.readFileSync(contentPath, 'utf8');
let styles = fs.readFileSync(stylesPath, 'utf8');

fs.copyFileSync(contentPath, `${contentPath}.before-v85.bak`);
fs.copyFileSync(stylesPath, `${stylesPath}.before-v85.bak`);

const kariPattern = /\{\s*initials:\s*['"]K['"],\s*name:\s*['"]Kari['"],[\s\S]*?\n\s*\},/m;
const kariBlock = `{
      initials: 'K',
      name: 'Kari',
      role: 'Co-Founder · Head of Marketing · Customer Delivery',
      bio: 'Współprowadzenie firmy, kierunek marketingowy i odpowiedzialność za doświadczenie klienta od pierwszego kontaktu po dostarczenie rekomendacji. Pilnuje, żeby strategia przekładała się na jasne decyzje, sprawną komunikację i dobrze dowieziony proces.',
      photo: '',
      featured: true,
    },`;

if (!kariPattern.test(content)) {
  console.error('Nie znalazłem obecnej karty Kari w src/content.js. Niczego nie zmieniono.');
  process.exit(1);
}

content = content.replace(kariPattern, kariBlock);

if (!/name:\s*['"]Eva['"]/.test(content)) {
  const evaMatt = `
    {
      initials: 'E',
      name: 'Eva',
      role: 'SEO · Link Building',
      bio: 'Widoczność organiczna poza stroną, profil linków i budowanie autorytetu domeny. Wspiera ocenę jakości źródeł oraz możliwości wzmacniania pozycji firmy w wynikach wyszukiwania.',
      photo: '',
    },
    {
      initials: 'M',
      name: 'Matt',
      role: 'SEO',
      bio: 'Widoczność organiczna, struktura serwisu i treści z perspektywy wyszukiwarki. Pomaga wskazać, gdzie SEO traci potencjał i które zmiany warto traktować jako priorytet.',
      photo: '',
    },`;
  content = content.replace(kariBlock, `${kariBlock}${evaMatt}`);
}

const marker = '/* V85 — TEAM: 2 leaders + specialist grid */';
if (!styles.includes(marker)) {
  styles += `

${marker}
@media (min-width: 1281px) {
  .team-members.team-members--text-only {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 14px;
  }

  .team-members--text-only .team-member {
    grid-column: span 2;
  }

  .team-members--text-only .team-member--featured {
    grid-column: span 5;
    min-height: 320px;
  }
}

@media (min-width: 901px) and (max-width: 1280px) {
  .team-members.team-members--text-only {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .team-members--text-only .team-member {
    grid-column: span 2;
  }

  .team-members--text-only .team-member--featured {
    grid-column: span 3;
  }
}

@media (max-width: 900px) {
  .team-members--text-only .team-member,
  .team-members--text-only .team-member--featured {
    grid-column: auto;
  }
}
`;
}

fs.writeFileSync(contentPath, content);
fs.writeFileSync(stylesPath, styles);

console.log('V85 gotowe.');
console.log('• Kari: Co-Founder · Head of Marketing · Customer Delivery + czarna karta');
console.log('• Eva: SEO · Link Building');
console.log('• Matt: SEO');
console.log('• Układ desktop: 2 karty leadership + 5 kart specjalistów');
console.log('Backupy: src/content.js.before-v85.bak i src/styles.css.before-v85.bak');
