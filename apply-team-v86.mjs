import fs from 'node:fs';

const contentPath = 'src/content.js';
const stylesPath = 'src/styles.css';

if (!fs.existsSync(contentPath)) {
  console.error('Brak src/content.js — uruchom ten plik z katalogu głównego projektu.');
  process.exit(1);
}

let content = fs.readFileSync(contentPath, 'utf8');
const original = content;

function findObjectRangeByName(source, name) {
  const patterns = [
    `name: '${name}'`,
    `name: "${name}"`,
  ];
  let nameIndex = -1;
  for (const p of patterns) {
    nameIndex = source.indexOf(p);
    if (nameIndex !== -1) break;
  }
  if (nameIndex === -1) return null;

  let start = nameIndex;
  while (start >= 0 && source[start] !== '{') start--;
  if (start < 0) return null;

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < source.length; i++) {
    const ch = source[i];

    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      continue;
    }

    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return { start, end: i + 1 };
    }
  }
  return null;
}

function replaceProp(block, prop, valueLiteral) {
  const re = new RegExp(`(^\\s*${prop}:\\s*)(['"\`])([\\s\\S]*?)\\2(\\s*,?)`, 'm');
  if (re.test(block)) return block.replace(re, `$1${valueLiteral}$4`);
  return block.replace(/\n(\s*)}\s*$/, `\n$1  ${prop}: ${valueLiteral},\n$1}`);
}

const kariRange = findObjectRangeByName(content, 'Kari');
if (!kariRange) {
  console.error('Nie znalazłem osoby o nazwie Kari w src/content.js. Niczego nie zmieniono.');
  process.exit(1);
}

let kari = content.slice(kariRange.start, kariRange.end);
kari = replaceProp(kari, 'role', `'Co-Founder · Head of Marketing · Customer Delivery'`);
kari = replaceProp(
  kari,
  'bio',
  `'Współtworzy kierunek DigitalMap, odpowiada za marketing i za to, jak klient przechodzi przez cały proces — od pierwszego kontaktu po dostarczenie diagnozy i rekomendacji. Łączy perspektywę biznesową, marketingową i customer delivery, żeby końcowa rekomendacja prowadziła do konkretnej decyzji i była dobrze dowieziona.'`
);

if (/featured:\s*(true|false)/.test(kari)) {
  kari = kari.replace(/featured:\s*(true|false)/, 'featured: true');
} else {
  kari = kari.replace(/\n(\s*)}\s*$/, '\n$1  featured: true,\n$1}');
}

content = content.slice(0, kariRange.start) + kari + content.slice(kariRange.end);

const evaExists = /name:\s*['"]Eva['"]/.test(content);
const mattExists = /name:\s*['"]Matt['"]/.test(content);

if (!evaExists || !mattExists) {
  const updatedKariRange = findObjectRangeByName(content, 'Kari');
  if (!updatedKariRange) {
    console.error('Po aktualizacji nie udało się ponownie znaleźć karty Kari.');
    process.exit(1);
  }

  let additions = '';

  if (!evaExists) {
    additions += `,
    {
      initials: 'E',
      name: 'Eva',
      role: 'SEO · Link Building',
      bio: 'SEO i link building z perspektywy autorytetu domeny, jakości profilu linków i widoczności organicznej. Pomaga ocenić, gdzie firma traci potencjał poza samą stroną i które działania mogą realnie wzmacniać pozycję marki w wyszukiwarce.',
      photo: '',
    }`;
  }

  if (!mattExists) {
    additions += `,
    {
      initials: 'M',
      name: 'Matt',
      role: 'SEO',
      bio: 'SEO z perspektywy struktury serwisu, intencji wyszukiwania i treści. Pomaga wskazać, gdzie widoczność organiczna nie wykorzystuje potencjału i które zmiany powinny dostać pierwszeństwo.',
      photo: '',
    }`;
  }

  content =
    content.slice(0, updatedKariRange.end) +
    additions +
    content.slice(updatedKariRange.end);
}

if (content === original) {
  console.error('Nie wprowadzono żadnych zmian.');
  process.exit(1);
}

fs.copyFileSync(contentPath, `${contentPath}.before-v86.bak`);
fs.writeFileSync(contentPath, content);

if (fs.existsSync(stylesPath)) {
  let styles = fs.readFileSync(stylesPath, 'utf8');
  const marker = '/* V86 — team layout for 2 featured leaders */';

  if (!styles.includes(marker)) {
    fs.copyFileSync(stylesPath, `${stylesPath}.before-v86.bak`);
    styles += `

${marker}
@media (min-width: 1100px) {
  .team-members.team-members--text-only {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 14px;
  }

  .team-members--text-only .team-member {
    grid-column: span 2;
  }

  .team-members--text-only .team-member--featured {
    grid-column: span 5;
    min-height: 315px;
  }
}

@media (min-width: 720px) and (max-width: 1099px) {
  .team-members.team-members--text-only {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .team-members--text-only .team-member,
  .team-members--text-only .team-member--featured {
    grid-column: auto;
  }
}
`;
    fs.writeFileSync(stylesPath, styles);
  }
}

const finalContent = fs.readFileSync(contentPath, 'utf8');
const checks = {
  kariRole: finalContent.includes('Co-Founder · Head of Marketing · Customer Delivery'),
  kariFeatured: /name:\s*['"]Kari['"][\s\S]{0,900}?featured:\s*true/.test(finalContent),
  eva: /name:\s*['"]Eva['"]/.test(finalContent),
  matt: /name:\s*['"]Matt['"]/.test(finalContent),
};

console.log('V86 zastosowane:', checks);
if (!Object.values(checks).every(Boolean)) process.exit(2);
