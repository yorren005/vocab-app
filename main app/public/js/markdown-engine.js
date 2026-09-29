/**
 * Obsidian Flavored Markdown (OFM) Parser & Interactive Post-Processor
 * Supports:
 * - YAML Frontmatter & cssclasses
 * - Obsidian Banners (banner, banner_icon, banner_y)
 * - DataviewJS codeblocks (```dataviewjs) & Notes Studio embeds (```notes-dashboard)
 * - Obsidian Callouts (> [!type], collapsible > [!type]-, multi-column >> [!note])
 * - Meta Bind inlineSelect (`INPUT[inlineSelect(...):status]`) -> Live Apple Glide Toggle
 * - Obsidian Tables with escaped wikilink pipes `[[path\|alias]]`
 * - Wikilinks `[[target#heading|alias]]`, ==highlights==, <mark class="hl-..."></mark>, inline LaTeX
 */

const CALLOUT_ICONS = {
  abstract: '📋',
  summary: '📋',
  tldr: '⚡',
  info: 'ℹ️',
  note: '📝',
  tip: '💡',
  hint: '💡',
  success: '✅',
  check: '✅',
  question: '❓',
  warning: '⚠️',
  caution: '⚠️',
  danger: '🚨',
  error: '🚨',
  example: '🔬',
  quote: '💬',
  cite: '💬',
  book: '📖',
  status: '🎯'
};

const BANNER_MAP = {
  '00 Language Hub.md': { src: '/assets/banners/language-hub.jpg', icon: '🏛️', y: 0.45 },
  'Basic English/Basic English.md': { src: '/assets/banners/basic-english.jpg', icon: '🧱', y: 0.5 },
  'Advanced english/Advanced english.md': { src: '/assets/banners/advanced-english.jpg', icon: '🖋️', y: 0.5 },
  'English vocabulary master/English vocabulary master.md': { src: '/assets/banners/vocabulary-master.jpg', icon: '👑', y: 0.5 },
  'Greek roots/Greek roots.md': { src: '/assets/banners/greek-roots.jpg', icon: '🏛️', y: 0.5 },
  'Latin roots/Latin roots.md': { src: '/assets/banners/latin-roots.jpg', icon: '📜', y: 0.5 },
  'Philosophy/Philosophy.md': { src: '/assets/banners/philosophy.jpg', icon: '🦉', y: 0.38 }
};

export function extractFrontmatterAndBody(rawMarkdown) {
  const text = String(rawMarkdown || '').replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) {
    return { frontmatter: {}, body: text };
  }
  const endIdx = text.indexOf('\n---', 4);
  if (endIdx === -1) {
    return { frontmatter: {}, body: text };
  }
  const yamlPart = text.slice(4, endIdx);
  const body = text.slice(endIdx + 4).replace(/^\n+/, '');
  const fm = {};
  let currentKey = null;
  let currentList = null;

  for (const line of yamlPart.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!currentList) {
        currentList = [];
        fm[currentKey] = currentList;
      }
      currentList.push(cleanVal(listMatch[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      const v = kv[2].trim();
      if (!v) {
        currentList = [];
        fm[currentKey] = currentList;
      } else {
        currentList = null;
        fm[currentKey] = cleanVal(v);
      }
    }
  }
  return { frontmatter: fm, body };
}

function cleanVal(v) {
  let s = String(v || '').trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  return s;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

function slugifyHeading(text) {
  return String(text || '')
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

/**
 * Render full Obsidian Note HTML + collect DataviewJS blocks, Headings (Outline), and Outgoing Links
 */
export function renderObsidianMarkdown(rawMarkdown, notePath, runtime) {
  const { frontmatter, body } = extractFrontmatterAndBody(rawMarkdown);
  const dataviewBlocks = [];
  const dashboardBlocks = [];
  const codeBlocks = [];
  const headings = [];
  const outgoingLinks = new Set();

  // 1. Extract fenced codeblocks (```dataviewjs, ```notes-dashboard, ```lang)
  // Also handle codeblocks inside blockquote lines (e.g. > ```dataviewjs)
  let processed = body.replace(/^(?:>\s*)?```([a-zA-Z0-9_-]*)\n([\s\S]*?)^(?:>\s*)?```/gm, (_, lang, code) => {
    const cleanLang = (lang || '').trim().toLowerCase();
    const cleanCode = code.replace(/^>\s?/gm, '');
    if (cleanLang === 'dataviewjs') {
      const id = dataviewBlocks.length;
      dataviewBlocks.push(cleanCode);
      return `\n\n@@DVJS_SLOT_${id}@@\n\n`;
    }
    if (cleanLang === 'notes-dashboard') {
      const id = dashboardBlocks.length;
      dashboardBlocks.push(cleanCode);
      return `\n\n@@DASHBOARD_SLOT_${id}@@\n\n`;
    }
    const id = codeBlocks.length;
    codeBlocks.push({ lang: cleanLang, code: cleanCode });
    return `\n\n@@CODE_SLOT_${id}@@\n\n`;
  });

  // 2. Parse block-level structures line by line
  const lines = processed.split('\n');
  const htmlOut = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Slot placeholders
    const dvMatch = trimmed.match(/^@@DVJS_SLOT_(\d+)@@$/);
    if (dvMatch) {
      htmlOut.push(`<div class="dataviewjs-container" data-dv-index="${dvMatch[1]}"></div>`);
      i++;
      continue;
    }

    const dashMatch = trimmed.match(/^@@DASHBOARD_SLOT_(\d+)@@$/);
    if (dashMatch) {
      htmlOut.push(`<div class="notes-dashboard-embed-slot" data-dash-index="${dashMatch[1]}"></div>`);
      i++;
      continue;
    }

    const codeMatch = trimmed.match(/^@@CODE_SLOT_(\d+)@@$/);
    if (codeMatch) {
      const cb = codeBlocks[Number(codeMatch[1])];
      htmlOut.push(
        `<pre class="language-${escapeAttr(cb.lang || 'text')}"><code class="language-${escapeAttr(cb.lang || 'text')}">${escapeHtml(cb.code.replace(/\n$/, ''))}</code></pre>`
      );
      i++;
      continue;
    }

    // Horizontal Rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      htmlOut.push('<hr>');
      i++;
      continue;
    }

    // Headings (H1 - H6)
    const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      const level = hMatch[1].length;
      const rawTitle = hMatch[2].trim();
      const slug = slugifyHeading(rawTitle);
      headings.push({ level, text: rawTitle.replace(/\[\[([^\]|]+\|)?([^\]]+)\]\]/g, '$2').replace(/[*_`]/g, ''), id: slug });
      htmlOut.push(`<h${level} id="${escapeAttr(slug)}">${ renderInline(rawTitle, notePath, runtime, outgoingLinks) }</h${level}>`);
      i++;
      continue;
    }

    // Callouts or Blockquotes (`> ...`)
    if (trimmed.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ''));
        i++;
      }
      // Check if next line is an immediate dataviewjs slot belonging to a callout (like in Dashboard — punct.md line 258!)
      if (i < lines.length && /^@@DVJS_SLOT_\d+@@$/.test(lines[i].trim())) {
        quoteLines.push(lines[i].trim());
        i++;
      }
      htmlOut.push(renderCalloutOrBlockquote(quoteLines, notePath, runtime, outgoingLinks));
      continue;
    }

    // Markdown Pipe Tables
    if (trimmed.startsWith('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      htmlOut.push(renderTable(tableLines, notePath, runtime, outgoingLinks));
      continue;
    }

    // Raw HTML block (e.g. <div ...> ... </div>, <details> ... </details>)
    if (/^<(div|details|section|table|style|svg)\b/i.test(trimmed)) {
      const htmlLines = [];
      while (i < lines.length && lines[i].trim() !== '') {
        htmlLines.push(lines[i]);
        i++;
      }
      const rawHtml = htmlLines.join('\n');
      htmlOut.push(processLinksInRawHtml(rawHtml, notePath, runtime, outgoingLinks));
      continue;
    }

    // Unordered or Ordered Lists
    if (/^(\s*)([-*+]|\d+\.)\s+/.test(line)) {
      const listLines = [];
      while (i < lines.length && (/^(\s*)([-*+]|\d+\.)\s+/.test(lines[i]) || (lines[i].startsWith('  ') && lines[i].trim()))) {
        listLines.push(lines[i]);
        i++;
      }
      htmlOut.push(renderList(listLines, notePath, runtime, outgoingLinks));
      continue;
    }

    // Standard Paragraph
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('|') &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim()) &&
      !/^(\s*)([-*+]|\d+\.)\s+/.test(lines[i]) &&
      !/^@@(DVJS|DASHBOARD|CODE)_SLOT_\d+@@$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      htmlOut.push(`<p>${paraLines.map(l => renderInline(l, notePath, runtime, outgoingLinks)).join('<br>')}</p>`);
    } else {
      i++;
    }
  }

  // Hero Banner resolution
  const bannerCfg = resolveBanner(notePath, frontmatter);
  let bannerHtml = '';
  if (bannerCfg) {
    const posY = bannerCfg.y !== undefined ? Number(bannerCfg.y) * 100 : 50;
    bannerHtml = `
      <div class="obsidian-banner-wrapper">
        <div class="obsidian-banner-img-clip">
          <img class="obsidian-banner-img" src="${escapeAttr(bannerCfg.src)}" alt="Note Banner" style="object-position: center ${posY}%;" onerror="this.closest('.obsidian-banner-wrapper').style.display='none'">
        </div>
        ${bannerCfg.icon ? `<div class="obsidian-banner-icon">${escapeHtml(bannerCfg.icon)}</div>` : ''}
      </div>
    `;
  }

  return {
    frontmatter,
    html: bannerHtml + htmlOut.join('\n'),
    dataviewBlocks,
    dashboardBlocks,
    headings,
    outgoingLinks: Array.from(outgoingLinks)
  };
}

function resolveBanner(notePath, fm) {
  if (BANNER_MAP[notePath]) return BANNER_MAP[notePath];
  if (fm.banner) {
    const clean = String(fm.banner).replace(/^\[\[|\]\]$/g, '').trim();
    const resolvedPath = clean.includes('/') ? clean : `${notePath.slice(0, notePath.lastIndexOf('/') + 1)}${clean}`;
    return {
      src: `/api/asset?path=${encodeURIComponent(resolvedPath)}`,
      icon: fm.banner_icon || '',
      y: fm.banner_y ?? 0.5
    };
  }
  return null;
}

function renderCalloutOrBlockquote(quoteLines, notePath, runtime, outgoingLinks) {
  const firstLine = quoteLines[0] || '';
  const calloutMatch = firstLine.match(/^\[!([a-zA-Z0-9_-]+)\]([+-])?\s*(.*)$/);

  if (!calloutMatch) {
    const innerHtml = quoteLines.map(l => renderInline(l, notePath, runtime, outgoingLinks)).join('<br>');
    return `<blockquote>${innerHtml}</blockquote>`;
  }

  const type = calloutMatch[1].toLowerCase();
  const foldFlag = calloutMatch[2] || '';
  const rawTitle = calloutMatch[3] || type.charAt(0).toUpperCase() + type.slice(1);
  const icon = CALLOUT_ICONS[type] || '📌';
  const isCollapsible = foldFlag === '-' || foldFlag === '+';
  const isCollapsed = foldFlag === '-';

  const contentLines = quoteLines.slice(1);
  let bodyHtml = '';

  // Support multi-column nested callouts
  if ((type === 'multi-column' || type === 'columns') && contentLines.some(l => l.trim().startsWith('>'))) {
    const subBlocks = [];
    let currentSub = [];
    for (const cl of contentLines) {
      if (cl.trim().startsWith('>')) {
        const stripped = cl.replace(/^\s*>\s?/, '');
        if (stripped.match(/^\[![a-zA-Z0-9_-]+\]/) && currentSub.length > 0) {
          subBlocks.push(currentSub);
          currentSub = [stripped];
        } else {
          currentSub.push(stripped);
        }
      }
    }
    if (currentSub.length) subBlocks.push(currentSub);
    bodyHtml = subBlocks.map(sb => renderCalloutOrBlockquote(sb, notePath, runtime, outgoingLinks)).join('\n');
  } else {
    bodyHtml = renderCalloutInnerLines(contentLines, notePath, runtime, outgoingLinks);
  }

  const titleRendered = renderInline(rawTitle, notePath, runtime, outgoingLinks);

  return `
    <div class="callout ${isCollapsible ? 'is-collapsible' : ''} ${isCollapsed ? 'is-collapsed' : ''}" data-callout="${escapeAttr(type)}">
      <div class="callout-title">
        <span class="callout-icon">${icon}</span>
        <span class="callout-title-inner">${titleRendered}</span>
        ${isCollapsible ? '<span class="callout-fold-icon">▼</span>' : ''}
      </div>
      ${bodyHtml ? `<div class="callout-content">${bodyHtml}</div>` : ''}
    </div>
  `;
}

function renderCalloutInnerLines(lines, notePath, runtime, outgoingLinks) {
  if (!lines.length) return '';
  const chunks = [];
  let listBuf = [];

  const flushList = () => {
    if (listBuf.length) {
      chunks.push(renderList(listBuf, notePath, runtime, outgoingLinks));
      listBuf = [];
    }
  };

  for (const l of lines) {
    const t = l.trim();
    if (!t) {
      flushList();
      continue;
    }
    const dvMatch = t.match(/^@@DVJS_SLOT_(\d+)@@$/);
    if (dvMatch) {
      flushList();
      chunks.push(`<div class="dataviewjs-container" data-dv-index="${dvMatch[1]}"></div>`);
      continue;
    }
    if (/^(\s*)([-*+]|\d+\.)\s+/.test(l)) {
      listBuf.push(l);
      continue;
    }
    flushList();
    chunks.push(`<p>${renderInline(l, notePath, runtime, outgoingLinks)}</p>`);
  }
  flushList();
  return chunks.join('\n');
}

function renderTable(tableLines, notePath, runtime, outgoingLinks) {
  const splitRow = (rowStr) => {
    // Protect escaped pipes `\|` and pipes inside `[[...]]`
    const safe = rowStr
      .replace(/\\\|/g, '@@ESCAPED_PIPE@@')
      .replace(/\[\[([^\]]+)\]\]/g, m => m.replace(/\|/g, '@@WIKI_PIPE@@'));
    const trimmed = safe.replace(/^\||\|$/g, '');
    return trimmed.split('|').map(c =>
      c.trim()
        .replace(/@@ESCAPED_PIPE@@/g, '|')
        .replace(/@@WIKI_PIPE@@/g, '|')
    );
  };

  const headers = splitRow(tableLines[0]);
  const bodyRows = tableLines.slice(2).map(splitRow);

  let html = '<div class="table-scroll-wrapper"><table><thead><tr>';
  for (const h of headers) {
    html += `<th>${renderInline(h, notePath, runtime, outgoingLinks)}</th>`;
  }
  html += '</tr></thead><tbody>';
  for (const row of bodyRows) {
    html += '<tr>';
    for (let c = 0; c < headers.length; c++) {
      html += `<td>${renderInline(row[c] ?? '', notePath, runtime, outgoingLinks)}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table></div>';
  return html;
}

function renderList(listLines, notePath, runtime, outgoingLinks) {
  const isOrdered = /^\s*\d+\.\s+/.test(listLines[0]);
  const tag = isOrdered ? 'ol' : 'ul';
  let html = `<${tag}>`;

  for (const line of listLines) {
    const itemText = line.replace(/^(\s*)([-*+]|\d+\.)\s+/, '');
    const taskMatch = itemText.match(/^\[([ xX])\]\s+(.*)$/);
    if (taskMatch) {
      const checked = taskMatch[1].toLowerCase() === 'x';
      html += `<li class="task-list-item ${checked ? 'is-checked' : ''}"><input type="checkbox" ${checked ? 'checked' : ''}> ${renderInline(taskMatch[2], notePath, runtime, outgoingLinks)}</li>`;
    } else {
      html += `<li>${renderInline(itemText, notePath, runtime, outgoingLinks)}</li>`;
    }
  }
  html += `</${tag}>`;
  return html;
}

function unresolvedClass(runtime, resolvedPath) {
  return runtime && runtime.pagesByPath && !runtime.pagesByPath.has(resolvedPath) ? ' is-unresolved' : '';
}

function processLinksInRawHtml(rawHtml, notePath, runtime, outgoingLinks) {
  return rawHtml.replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (_, target, hash, alias) => {
    const cleanTarget = target.replace(/\\$/g, '').trim();
    const resolved = runtime.resolveLinkPath(cleanTarget, notePath);
    outgoingLinks.add(resolved);
    const label = alias ? alias.trim() : cleanTarget.split('/').pop().replace(/\.md$/i, '');
    return `<a class="internal-link${unresolvedClass(runtime, resolved)}" data-href="${escapeAttr(resolved)}" ${hash ? `data-heading="${escapeAttr(hash)}"` : ''} href="/?note=${encodeURIComponent(resolved)}">${escapeHtml(label)}</a>`;
  });
}

/**
 * Inline Markdown & Obsidian syntax renderer
 */
export function renderInline(text, notePath, runtime, outgoingLinks) {
  if (!text) return '';
  let str = String(text);

  // 1. Meta Bind inlineSelect (`INPUT[inlineSelect(...):status]`) including nested option(...) parens and optional instructional snippet wrapper
  str = str.replace(/`?>\s*\[!status\][^`\n]*?\\?`{0,2}INPUT\[inlineSelect\(([\s\S]*?)\):([a-zA-Z0-9_-]+)\]\\?`{0,3}/g, (_, optsRaw, propName) => {
    return `<span class="meta-bind-status-mount" data-prop="${escapeAttr(propName)}"></span>`;
  });
  str = str.replace(/\\?`{0,2}INPUT\[inlineSelect\(([\s\S]*?)\):([a-zA-Z0-9_-]+)\]\\?`{0,2}/g, (_, optsRaw, propName) => {
    return `<span class="meta-bind-status-mount" data-prop="${escapeAttr(propName)}"></span>`;
  });

  // 2. Protect inline code `` `...` ``
  const inlineCodes = [];
  str = str.replace(/`([^`]+)`/g, (_, code) => {
    // Check if the inline code itself is a wikilink like `[[Basic English/...]]` (as in 00 Language Hub.md lines 270-296!)
    if (/^\[\[[^\]]+\]\]$/.test(code.trim())) {
      return code.trim();
    }
    const id = inlineCodes.length;
    inlineCodes.push(code);
    return `@@INLINE_CODE_${id}@@`;
  });

  // 3. Wikilinks `[[target#heading|alias]]` (also handling escaped `\|`)
  str = str.replace(/\[\[([^\]|#\\]+)\\?(?:#([^\]|\\]+)\\?)?(?:\|([^\]]+))?\]\]/g, (_, target, hash, alias) => {
    const cleanTarget = target.trim();
    const resolved = runtime.resolveLinkPath(cleanTarget, notePath);
    if (outgoingLinks) outgoingLinks.add(resolved);
    const label = alias ? alias.trim() : cleanTarget.split('/').pop().replace(/\.md$/i, '');
    return `<a class="internal-link${unresolvedClass(runtime, resolved)}" data-href="${escapeAttr(resolved)}" ${hash ? `data-heading="${escapeAttr(hash)}"` : ''} href="/?note=${encodeURIComponent(resolved)}">${escapeHtml(label)}</a>`;
  });

  // 4. External Markdown links `[label](url)`
  str = str.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, url) => {
    return `<a class="external-link" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  });

  // 5. Inline LaTeX Math `$...$`
  str = str.replace(/\$([^$]+)\$/g, (_, math) => {
    const renderedMath = math
      .replace(/\\to\b/g, '→')
      .replace(/\\rightarrow\b/g, '→')
      .replace(/\\leftarrow\b/g, '←')
      .replace(/\\leftrightarrow\b/g, '↔')
      .replace(/\\Rightarrow\b/g, '⇒')
      .replace(/\\times\b/g, '×');
    return `<span class="math-inline" style="font-family:Georgia,serif; font-style:italic;">${renderedMath}</span>`;
  });

  // 6. Highlights `==text==`
  str = str.replace(/==([^=]+)==/g, '<mark class="cm-highlight">$1</mark>');

  // 7. Bold + Italic, Bold, Italic, Strikethrough
  str = str.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  str = str.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  str = str.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  str = str.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  // 8. Restore inline code
  str = str.replace(/@@INLINE_CODE_(\d+)@@/g, (_, idx) => {
    return `<code class="cm-inline-code">${escapeHtml(inlineCodes[Number(idx)])}</code>`;
  });

  return str;
}

/**
 * Mount interactive Apple Glide 3-State Toggle into any `.meta-bind-status-mount` or header container
 */
export function createAppleStatusToggle(currentStatus, onCycleStatus) {
  const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
  ];
  let curIdx = states.findIndex(s => s.key === currentStatus);
  if (curIdx === -1) curIdx = 0;

  const toggle = document.createElement('div');
  toggle.className = 'apple-c';
  toggle.title = 'Click to glide: unread ➔ learning ➔ learned';

  const track = document.createElement('div');
  track.className = 'track-c';
  track.innerHTML = `<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ${states[curIdx].p}"><div class="core-dot"></div></div>`;

  const label = document.createElement('span');
  label.className = `label ${states[curIdx].cls}`;
  label.textContent = states[curIdx].label;

  toggle.appendChild(track);
  toggle.appendChild(label);

  toggle.addEventListener('click', async (e) => {
    e.stopPropagation();
    curIdx = (curIdx + 1) % 3;
    const nxt = states[curIdx];
    const halo = track.querySelector('.halo-c');
    if (halo) halo.className = `halo-c ${nxt.p}`;
    label.className = `label ${nxt.cls}`;
    label.textContent = nxt.label;
    if (onCycleStatus) {
      await onCycleStatus(nxt.key);
    }
  });

  return toggle;
}
