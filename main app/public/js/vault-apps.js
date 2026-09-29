/**
 * Native Vault Apps:
 * 1. Notes Studio (Notes-Dashboard plugin — standalone tab & ```notes-dashboard note embed)
 * 2. Quick Scratchpad (Instant thought capture -> Vault Markdown note)
 */

const STUDIO_TEMPLATES = {
  blank: {
    name: '📄 Blank Note',
    tags: 'note',
    content: (title) => `# ${title || 'Untitled Note'}\n\nWrite your thoughts here...\n`
  },
  vocabulary: {
    name: '👑 Vocabulary / Concept',
    tags: 'vocabulary-master, lexicon',
    content: (title) => `# ${title || 'New Vocabulary Word'}

> [!book] 📖 Definitions & Semantic Range
> 1. **Primary Definition**: 
> 2. **Nuance & Register**: 

---

## 💬 Contextual Usage & Examples
- *"Example sentence demonstrating ${title || 'the word'} in context."*

## 🔗 Morphological & Semantic Connections
- **Synonyms**: 
- **Antonyms**: 

> [!status] 🎯 **Status:** \`INPUT[inlineSelect(option(unread, 🔴 Unread), option(learning, 🟡 Learning), option(learned, 🟢 Learned)):status]\`
`
  },
  grammar: {
    name: '🖋️ Grammar & Rhetoric Lesson',
    tags: 'grammar, rhetoric',
    content: (title) => `# ${title || 'New Grammar Lesson'}

> [!abstract] 🧱 Core Foundation
> **Core Concept**: 
> **Master Rule**: 

---

## 1. Structural Mechanics

| Pattern | Function | Example |
| :--- | :--- | :--- |
| **Form A** | Primary usage | *Example sentence* |

---

## 2. Diagnostic Guardrails

| Incorrect (❌) | Correct (✅) | Diagnostic Principle |
| :--- | :--- | :--- |
| *Draft error* | *Polished sentence* | Explanation |

> [!status] 🎯 **Status:** \`INPUT[inlineSelect(option(unread, 🔴 Unread), option(learning, 🟡 Learning), option(learned, 🟢 Learned)):status]\`
`
  },
  philosophy: {
    name: '🦉 Philosophical Inquiry',
    tags: 'philosophy, inquiry',
    content: (title) => `# ${title || 'New Philosophical Inquiry'}

> [!abstract] Core Philosophical Foundation
> **Central Thesis**: 
> **Dialectical Principle**: 

---

## 1. Core Mechanics & Dialectic


## 2. Thought Experiment
> [!example] Case Deconstruction
> Describe the thought experiment here...

## 3. Daily Philosophical Inquiry
> [!question] Reflective Dialogue
> 

> [!status] 🎯 **Status:** \`INPUT[inlineSelect(option(unread, 🔴 Unread), option(learning, 🟡 In Dialogue), option(learned, 🟢 Mastered)):status]\`
`
  },
  checklist: {
    name: '✅ Study Action Plan',
    tags: 'study-plan, tasks',
    content: (title) => `# ${title || 'Study Action Plan'}

> [!tip] 🎯 Focus Objectives
> Key study targets for this session:

- [ ] Review 1 Classical Root Dashboard
- [ ] Drill 3 Expressive Vocabulary Cards
- [ ] Complete 1 Grammar or Philosophy Inquiry
`
  }
};

export function renderNotesStudio(containerEl, controller, config = {}) {
  const defaultFolder = config.folder || 'Basic English';
  const defaultTemplate = config.template || 'vocabulary';

  const folders = [
    'Basic English',
    'Advanced english',
    'English vocabulary master',
    'Greek roots',
    'Latin roots',
    'Philosophy',
    'Templates'
  ];

  const wrap = document.createElement('div');
  wrap.className = 'zen-hud-card';
  wrap.style.cssText = 'max-width:920px; margin:20px auto; padding:24px 28px;';

  wrap.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-bottom:1px solid var(--web-border); padding-bottom:16px; margin-bottom:18px;">
      <div>
        <div style="font-size:11px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:var(--web-accent);">VAULT STUDIO APP</div>
        <h2 style="margin:2px 0 0 0; font-size:22px; font-weight:800; color:var(--web-text-primary);">🚀 Notes Creation & Template Studio</h2>
      </div>
      <div style="font-size:12px; color:var(--web-text-muted); background:var(--web-surface-1); padding:6px 12px; border-radius:999px; border:1px solid var(--web-border);">
        📚 ${controller.runtime.allHydratedPages.length.toLocaleString()} Total Vault Notes
      </div>
    </div>

    <div style="margin-bottom:16px;">
      <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--web-text-muted); margin-bottom:8px;">1. Select Note Template</div>
      <div id="studio-tpl-bar" style="display:flex; gap:8px; flex-wrap:wrap;"></div>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; margin-bottom:14px;">
      <div style="display:flex; flex-direction:column; gap:5px;">
        <label style="font-size:11.5px; font-weight:700; color:var(--web-text-secondary);">Note Title</label>
        <div style="display:flex; gap:6px;">
          <input id="studio-title" type="text" placeholder="e.g. Syntactic Inversion" style="flex:1; background:var(--web-surface-1); color:var(--web-text-primary); border:1px solid var(--web-border); border-radius:6px; padding:8px 11px; font-size:13.5px;">
          <button id="studio-date-btn" title="Append Today's Date" style="padding:6px 10px; font-size:11.5px;">+ Date</button>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:5px;">
        <label style="font-size:11.5px; font-weight:700; color:var(--web-text-secondary);">Target Discipline Folder</label>
        <select id="studio-folder" style="background:var(--web-surface-1); color:var(--web-text-primary); border:1px solid var(--web-border); border-radius:6px; padding:8px 11px; font-size:13.5px;">
          <option value="">Vault Root (/)</option>
          ${folders.map(f => `<option value="${f}" ${f === defaultFolder ? 'selected' : ''}>${f}</option>`).join('')}
        </select>
      </div>

      <div style="display:flex; flex-direction:column; gap:5px;">
        <label style="font-size:11.5px; font-weight:700; color:var(--web-text-secondary);">Initial Study Status</label>
        <select id="studio-status" style="background:var(--web-surface-1); color:var(--web-text-primary); border:1px solid var(--web-border); border-radius:6px; padding:8px 11px; font-size:13.5px;">
          <option value="unread">🔴 Unread</option>
          <option value="learning">🟡 Learning</option>
          <option value="learned">🟢 Learned</option>
        </select>
      </div>
    </div>

    <div style="display:flex; flex-direction:column; gap:5px; margin-bottom:14px;">
      <label style="font-size:11.5px; font-weight:700; color:var(--web-text-secondary);">YAML Tags (comma-separated)</label>
      <input id="studio-tags" type="text" value="vocabulary-master, lexicon" style="background:var(--web-surface-1); color:var(--web-text-primary); border:1px solid var(--web-border); border-radius:6px; padding:7px 11px; font-size:13px;">
    </div>

    <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
      <label style="font-size:11.5px; font-weight:700; color:var(--web-text-secondary);">Markdown Body</label>
      <textarea id="studio-body" rows="12" style="width:100%; background:var(--web-surface-1); color:var(--web-text-primary); border:1px solid var(--web-border); border-radius:8px; padding:14px; font-family:var(--web-font-mono); font-size:13px; line-height:1.6; resize:vertical;"></textarea>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:10px;">
      <button id="studio-save-btn" class="mod-cta" style="padding:8px 20px; font-weight:700;">💾 Create & Open Note in Vault</button>
    </div>
  `;

  containerEl.innerHTML = '';
  containerEl.appendChild(wrap);

  let activeTpl = STUDIO_TEMPLATES[defaultTemplate] ? defaultTemplate : 'blank';
  const tplBar = wrap.querySelector('#studio-tpl-bar');
  const titleInput = wrap.querySelector('#studio-title');
  const tagsInput = wrap.querySelector('#studio-tags');
  const bodyArea = wrap.querySelector('#studio-body');

  function applyTemplate(tplKey) {
    activeTpl = tplKey;
    const tpl = STUDIO_TEMPLATES[tplKey];
    tagsInput.value = tpl.tags;
    bodyArea.value = tpl.content(titleInput.value.trim());
    renderTplButtons();
  }

  function renderTplButtons() {
    tplBar.innerHTML = '';
    for (const [key, tpl] of Object.entries(STUDIO_TEMPLATES)) {
      const btn = document.createElement('button');
      btn.textContent = tpl.name;
      if (key === activeTpl) btn.className = 'mod-cta';
      btn.addEventListener('click', () => applyTemplate(key));
      tplBar.appendChild(btn);
    }
  }

  applyTemplate(activeTpl);

  titleInput.addEventListener('input', () => {
    const firstLineMatch = bodyArea.value.match(/^#\s+.*$/m);
    if (firstLineMatch) {
      bodyArea.value = bodyArea.value.replace(/^#\s+.*$/m, `# ${titleInput.value.trim() || 'Untitled Note'}`);
    }
  });

  wrap.querySelector('#studio-date-btn').addEventListener('click', () => {
    const today = new Date().toISOString().slice(0, 10);
    titleInput.value = `${titleInput.value.trim()} (${today})`.trim();
    titleInput.dispatchEvent(new Event('input'));
  });

  wrap.querySelector('#studio-save-btn').addEventListener('click', async () => {
    const rawTitle = titleInput.value.trim() || `Note ${new Date().toISOString().slice(0, 10)}`;
    const cleanTitle = rawTitle.replace(/[\\/:*?"<>|]/g, '-');
    const folder = wrap.querySelector('#studio-folder').value;
    const status = wrap.querySelector('#studio-status').value;
    const tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean);
    const fullPath = folder ? `${folder}/${cleanTitle}.md` : `${cleanTitle}.md`;

    const yaml = [
      '---',
      `status: ${status}`,
      ...(tags.length ? ['tags:', ...tags.map(t => `  - ${t}`)] : []),
      '---',
      '',
      bodyArea.value
    ].join('\n');

    await controller.saveNoteContent(fullPath, yaml, false);
    controller.showNotice(`Created ${fullPath}`);
    controller.openNote(fullPath);
  });
}

export function renderQuickScratchpad(containerEl, controller) {
  const savedScratch = localStorage.getItem('obsidian_web_scratchpad') || '';
  const wrap = document.createElement('div');
  wrap.className = 'zen-hud-card';
  wrap.style.cssText = 'max-width:860px; margin:20px auto; padding:24px 28px; display:flex; flex-direction:column; gap:14px; min-height:72vh;';

  wrap.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-bottom:1px solid var(--web-border); padding-bottom:14px;">
      <div>
        <div style="font-size:11px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:var(--web-accent);">VAULT SCRATCHPAD</div>
        <h2 style="margin:2px 0 0 0; font-size:20px; font-weight:800; color:var(--web-text-primary);">⚡ Quick Study Scratchpad</h2>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <span id="scratch-count" style="font-size:12px; color:var(--web-text-muted);">0 words · 0 chars</span>
        <button id="scratch-dump-btn" class="mod-cta">📥 Save to Daily Study Note</button>
      </div>
    </div>
    <textarea id="scratch-area" placeholder="Jot down etymological connections, example sentences, philosophical arguments, or study notes... (auto-saved locally)" style="flex:1; width:100%; min-height:380px; background:var(--web-surface-1); color:var(--web-text-primary); border:1px solid var(--web-border); border-radius:10px; padding:18px; font-family:var(--web-font-mono); font-size:14px; line-height:1.7; resize:vertical;"></textarea>
  `;

  containerEl.innerHTML = '';
  containerEl.appendChild(wrap);

  const area = wrap.querySelector('#scratch-area');
  const countEl = wrap.querySelector('#scratch-count');
  area.value = savedScratch;

  const updateCount = () => {
    const val = area.value;
    const words = val.trim() ? val.trim().split(/\s+/).length : 0;
    countEl.textContent = `${words} words · ${val.length} chars`;
    localStorage.setItem('obsidian_web_scratchpad', val);
  };
  updateCount();
  area.addEventListener('input', updateCount);

  wrap.querySelector('#scratch-dump-btn').addEventListener('click', async () => {
    const text = area.value.trim();
    if (!text) {
      controller.showNotice('Scratchpad is empty');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    const targetPath = `Basic English/Study Scratchpad - ${today}.md`;
    const entry = `\n## 📝 Scratchpad Entry (${new Date().toLocaleTimeString()})\n\n${text}\n\n---\n`;
    await controller.saveNoteContent(targetPath, entry, true);
    controller.showNotice(`Saved to ${targetPath}`);
    controller.openNote(targetPath);
  });
}
