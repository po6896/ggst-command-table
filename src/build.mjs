// Build static HTML pages from data/*.json.
// One page per character (sol.html, ky.html, ...) plus index.html
// pointing at Sol as the default landing.

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dataDir = path.join(root, 'data');

// ---------- Load characters ----------

const chars = fs.readdirSync(dataDir)
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf-8')))
  .sort((a, b) => a.no - b.no);

// ---------- Color helpers ----------

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
function lighten(hex, amount = 64) {
  const { r, g, b } = hexToRgb(hex);
  const cl = v => Math.max(0, Math.min(255, v + amount));
  return `#${cl(r).toString(16).padStart(2, '0')}${cl(g).toString(16).padStart(2, '0')}${cl(b).toString(16).padStart(2, '0')}`;
}
function rgba(hex, a) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}
function deriveColors(hex) {
  return {
    char: hex,
    char2: lighten(hex, 56),
    bg: rgba(hex, 0.10),
    line: rgba(hex, 0.45)
  };
}

// ---------- Section renderers ----------

function renderRoster(chars, activeSlug) {
  return chars.map(c => {
    const cls = c.slug === activeSlug ? ' class="active"' : '';
    return `  <a href="${c.slug}.html"${cls} title="${c.nameJp} / ${c.name}"><img src="assets/sd/${c.sdIcon}" alt="${c.name}" loading="lazy"></a>`;
  }).join('\n');
}

function renderTagBadge(tag) {
  if (tag === 'low') return '<span class="tag low">下</span>';
  if (tag === 'high') return '<span class="tag high">上</span>';
  return '<span class="tag">中</span>';
}

function renderCmd(item) {
  // item has: btn, cmd (numpad prefix like "5"/"2"), or mod ("近"/"遠"/"空")
  const btnHtml = `<span class="key-${item.btn}">${item.btn === 'h' ? 'H' : item.btn.toUpperCase()}</span>`;
  if (item.mod) return `<span class="cmd"><span class="mod">${item.mod}</span>${btnHtml}</span>`;
  return `<span class="cmd">${item.cmd ?? ''}${btnHtml}</span>`;
}

function renderNormalCell(item) {
  if (item.stack) {
    return `        <div class="cell stack">
${item.stack.map(sub => `          <div class="sub"><div class="top">${renderCmd(sub)}${renderTagBadge(sub.tag)}</div><div class="meta">${sub.meta}</div></div>`).join('\n')}
        </div>`;
  }
  return `        <div class="cell"><div class="top">${renderCmd(item)}${renderTagBadge(item.tag)}</div><div class="meta">${item.meta}</div></div>`;
}

function renderNormals(normals) {
  return `      <div class="normals">
        <div class="colhead"></div>
        <div class="colhead">P</div>
        <div class="colhead">K</div>
        <div class="colhead">S</div>
        <div class="colhead">H</div>
        <div class="colhead">D</div>

        <div class="rowhead">立</div>
${normals.stand.map(renderNormalCell).join('\n')}

        <div class="rowhead">屈</div>
${normals.crouch.map(renderNormalCell).join('\n')}

        <div class="rowhead">空</div>
${normals.air.map(renderNormalCell).join('\n')}
      </div>`;
}

// note内 ／区切り or "ラベル (派生／派生／…)" を span ピルへ展開
// 半角 / は分割しない (「前/後ろ投げ」「S無敵 / HS回復」など 2要素1組の書式を保つため)
function renderNote(note) {
  if (!note) return '';
  const m = note.match(/^(.+?)\s*\(\s*(.+?)\s*\)\s*$/);
  if (m) {
    const lead = m[1].trim();
    const items = m[2].split(/\s*／\s*/).map(s => s.trim()).filter(Boolean);
    if (items.length >= 2) {
      return `<span class="note-lead">${lead}</span>${items.map(i => `<span class="note-pill">${i}</span>`).join('')}`;
    }
  }
  const items = note.split(/\s*／\s*/).map(s => s.trim()).filter(Boolean);
  if (items.length > 1) {
    return items.map(i => `<span class="note-pill">${i}</span>`).join('');
  }
  return note;
}

function renderMove(m) {
  const prefix = m.prefix ? `<span class="prefix">${m.prefix}</span>` : '';
  const repeat = m.repeat ? `<span class="repeat">${m.repeat}</span>` : '';
  return `        <div class="move"><span class="input"><svg class="motion-icon"><use href="#m-${m.icon}"/></svg>${prefix}${repeat}<span class="btn">${m.btnHtml}</span></span><span class="name">${m.name}</span><span class="note">${renderNote(m.note)}</span></div>`;
}

function renderOd(m) {
  const prefix = m.prefix ? `<span class="prefix">${m.prefix}</span>` : '';
  const repeat = m.repeat ? `<span class="repeat">${m.repeat}</span>` : '';
  const fill = m.tension ?? 50;
  return `        <div class="move od">
          <span class="od-flag">Overdrive <span class="od-cost"><span class="tension-bar"><span class="fill" style="width:${fill}%"></span></span>${fill}%</span></span>
          <span class="input"><svg class="motion-icon"><use href="#m-${m.icon}"/></svg>${prefix}${repeat}<span class="btn">${m.btnHtml}</span></span>
          <span class="name">${m.name}</span>
          <span class="note">${renderNote(m.note)}</span>
        </div>`;
}

function renderSpecials(items, cols) {
  const cls = `specials cols-${cols}`;
  return `      <div class="${cls}">
${items.map(renderMove).join('\n')}
      </div>`;
}

function renderOdSection(items) {
  return `      <div class="specials cols-2">
${items.map(renderOd).join('\n')}
      </div>`;
}

const SYSTEM_COMMON = [
  { icon: 'dir',    btnHtml: '+ <span class="key-h">HS</span>',                                                                              name: '投げ',                       note: '前/後ろ投げ ／ 近距離' },
  { icon: 'button', btnHtml: '<span class="key-d">D</span>',                                                                                  name: 'ダスト',                     note: '中段始動 ／ 全キャラ共通' },
  { icon: 'button', btnHtml: '<span class="key-p">P</span> + <span class="key-k">K</span>',                                                   name: 'フォルトレスディフェンス',   note: 'ガード中 ／ テンション消費' },
  { icon: 'button', btnHtml: '<span class="key-p">P</span> + <span class="key-k">K</span> + <span class="key-s">S</span>',                    name: 'ロマンキャンセル',           note: '攻撃中 ／ テンション 50%' },
  { icon: 'button', btnHtml: '<span class="key-d">D</span> 系入力',                                                                            name: 'サイクバースト',             note: '被弾中 ／ 1ラウンド 1回' }
];

function renderCombos(combos) {
  return `        <ol>
${combos.map(c => `          <li><span class="tag">${c.tag}</span><span class="seq">${c.seqHtml}</span></li>`).join('\n')}
        </ol>`;
}

function renderStub() {
  return `      <div class="stub-notice">
        <h2>準備中</h2>
        <p>このキャラクターの技データはまだ登録されていません。</p>
        <p class="muted">data/{slug}.json を編集してビルドし直すとここが埋まります。</p>
      </div>`;
}

// ---------- Page template ----------

function renderPage(char, allChars) {
  const colors = deriveColors(char.color);
  const isStub = char.stub === true;
  const stats = char.stats ?? {};
  const archetype = char.archetype ?? '—';

  const heroBody = isStub
    ? ''
    : `      <dl class="hero-stats">
        <dt>防御<small>低=堅</small></dt>
        <dd>
          <span class="stat-bar"><span class="fill" style="width:${stats.defensePct ?? 50}%"></span></span>
          <span class="num">${stats.defense != null ? stats.defense.toFixed(2) : '?'}</span>${stats.defenseNote ? `<span class="sub">${stats.defenseNote.replace(/基準.*$/, '基準')}</span>` : ''}
        </dd>

        <dt>根性</dt>
        <dd>
          <span class="stat-pips">${pips(stats.gutsLevel ?? 0, 5)}</span>
          <span class="num">${stats.guts ?? '?'}</span>
        </dd>

        <dt>ダッシュ</dt>
        <dd>
          <span class="stat-icon">${stats.dashIcon ?? '&gt;&gt;'}</span>
          <span class="num">${stats.dash ?? '?'}</span>
        </dd>

        <dt>レンジ</dt>
        <dd>
          <span class="stat-pips">${pips(stats.rangeLevel ?? 2, 3)}</span>
          <span class="num">${stats.range ?? '?'}</span>
        </dd>
      </dl>

      <section class="hero-combos">
        <h3>基本コンボ</h3>
${char.combos ? renderCombos(char.combos) : '        <p class="muted" style="font-size:11px;color:var(--text-4);">未登録</p>'}
      </section>${char.mechanic ? `

      <section class="hero-mechanic">
        <h3>固有システム</h3>
        <span class="mech-name">${char.mechanic.name}</span>
        <p>${char.mechanic.desc}</p>
      </section>` : ''}`;

  const content = isStub
    ? renderStub()
    : `    <details class="sect" open>
      <summary><h2>通常技</h2><span class="count">${normalCount(char.normals)}</span><span class="accent-bar"></span></summary>
${renderNormals(char.normals)}
    </details>

    <details class="sect" open>
      <summary><h2>必殺技</h2><span class="count">${char.specials.length}</span><span class="accent-bar"></span></summary>
${renderSpecials(char.specials, 7)}
    </details>

    <details class="sect" open>
      <summary><h2>覚醒必殺技</h2><span class="count">${char.overdrives.length}</span><span class="accent-bar"></span></summary>
${renderOdSection(char.overdrives)}
    </details>

    <details class="sect" open>
      <summary><h2>システム共通</h2><span class="count">${SYSTEM_COMMON.length}</span><span class="accent-bar"></span></summary>
      <div class="specials cols-5">
${SYSTEM_COMMON.map(renderMove).join('\n')}
      </div>
    </details>`;

  return PAGE_SHELL({
    char,
    colors,
    rosterHtml: renderRoster(allChars, char.slug),
    heroBody,
    content,
    archetype,
    isStub
  });
}

function pips(level, max = 3) {
  return Array.from({ length: max }, (_, idx) => idx + 1)
    .map(i => `<span class="${i <= level ? 'on' : ''}"></span>`).join('');
}

function normalCount(normals) {
  let n = 0;
  for (const row of [normals.stand, normals.crouch, normals.air]) {
    for (const item of row) {
      if (item.stack) n += item.stack.length;
      else n++;
    }
  }
  return n;
}

// ---------- HTML shell (CSS + structure) ----------

const STYLE_BLOCK = fs.readFileSync(path.join(import.meta.dirname, 'style.css'), 'utf-8');
const SVG_DEFS = fs.readFileSync(path.join(import.meta.dirname, 'svg-defs.html'), 'utf-8');

function PAGE_SHELL({ char, colors, rosterHtml, heroBody, content, archetype, isStub }) {
  const charTokens = `--char:${colors.char};--char-2:${colors.char2};--char-bg:${colors.bg};--char-line:${colors.line};`;
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${char.name} — GGST Command List</title>
<link rel="icon" type="image/png" href="assets/sd/${char.sdIcon}">
<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&display=swap">
<style>
${STYLE_BLOCK}
</style>
</head>
<body style="${charTokens}">

${SVG_DEFS}

<header class="topbar">
  <div class="brand">
    <img class="brand-logo" src="assets/logo/logo_ggst_pos.png" alt="GUILTY GEAR -STRIVE-">
    <span class="pipe"></span>
    <span class="title">Command List</span>
  </div>
</header>

<nav class="roster" aria-label="キャラクター一覧">
${rosterHtml}
</nav>

<main class="layout">

  <aside class="hero">
    <div class="hero-art">
      <img src="assets/full/${char.fullArt}" alt="${char.name}" style="object-position: center ${char.artPos ?? '12%'};">
    </div>
    <div class="hero-body">
      <div class="role">No. ${String(char.no).padStart(2, '0')} / ${archetype}</div>
      <h1>${char.name}</h1>
      <span class="jp">${char.nameJp}</span>
${heroBody}
    </div>
  </aside>

  <div class="content">
${content}
  </div>
</main>

<footer>
  <div class="row">
    <span class="legend">
      <span class="key mid">中</span> ガード可
      <span class="sep">／</span>
      <span class="key low">下</span> 下段
      <span class="sep">／</span>
      <span class="key high">上</span> 中段
    </span>
    <span class="btn-legend">
      ボタン:
      <span class="key-p">P</span>
      <span class="key-k">K</span>
      <span class="key-s">S</span>
      <span class="key-h">HS</span>
      <span class="key-d">D</span>
    </span>
  </div>
  <div class="row">
    <span>アイコンはレバー軌跡 — 矢印が最終入力方向</span>
    <span>通常技は H, 必殺技は HS 表記（同ボタン）</span>
    <span>RC = ロマンキャンセル</span>
  </div>
  <span class="credit">キャラクター素材・ロゴ: GUILTY GEAR -STRIVE- 公式ファンキット ／ © ARC SYSTEM WORKS</span>
</footer>

</body>
</html>
`;
}

// ---------- Build loop ----------

let built = 0;
for (const char of chars) {
  const html = renderPage(char, chars);
  fs.writeFileSync(path.join(root, `${char.slug}.html`), html, 'utf-8');
  built++;
  if (char.slug === 'sol') {
    fs.writeFileSync(path.join(root, 'index.html'), html, 'utf-8');
  }
}
console.log(`Built ${built} character pages + index.html`);
