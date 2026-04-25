// One-off: add a sensible default artPos per character so the
// hero image crops to a face / upper-body framing.

import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(import.meta.dirname, '..', 'data');

// Body-type guesses based on official Strive proportions.
// Lower % = crop higher (face shows), higher % = lower body.
const positions = {
  sol:   '8%',   // tall + bulky
  ky:    '10%',  // tall slim
  may:   '14%',  // short
  axl:   '10%',
  chipp: '8%',
  pot:   '4%',   // very tall
  fau:   '4%',   // very tall
  mll:   '12%',
  zat:   '10%',
  ram:   '12%',
  leo:   '8%',
  nag:   '6%',   // very tall
  gio:   '12%',
  anj:   '10%',
  ino:   '12%',
  gld:   '6%',   // very tall + bulky
  jko:   '12%',
  cos:   '12%',
  bkn:   '12%',
  tst:   '6%',   // tall
  bgt:   '14%',  // short
  sin:   '8%',
  bed:   '8%',
  ask:   '14%',  // short
  jhn:   '8%',
  elp:   '12%',
  aba:   '12%',
  sly:   '8%',
  dzy:   '12%',
  ven:   '10%',
  uni:   '12%',
  luc:   '14%',  // short
  jam:   '12%'
};

let updated = 0;
for (const [slug, pos] of Object.entries(positions)) {
  const file = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.artPos = pos;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  updated++;
}
console.log(`Updated artPos on ${updated} characters`);
