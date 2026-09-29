---
type: word_triage
root: "[[Dashboard — pepon]]"
cluster: "[[Cluster Plants & Botany]]"
tags:
  - vocabulary-triage
  - greek-roots
---

<div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0 14px; border-bottom:1px solid var(--zen-border-subtle,#24242a); font-size:12px; color:var(--zen-muted,#86848c);">
  <div>← Back to [[Dashboard — pepon|Dashboard — pepon]] · [[Cluster Plants & Botany|Cluster Plants & Botany]] · [[Greek roots|Greek Roots MOC]]</div>
  <div style="font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-vermillion,#e05244); font-size:10px;">Word Triage Station</div>
</div>

# 🎯 Word Triage — pepon
<span style="font-size:1.15em; color:var(--zen-muted,#86848c); font-family:Georgia,serif; font-style:italic;">Dedicated vocabulary triage station for Greek root <b>pepon</b>.</span>

```dataviewjs
// Ensure Apple Toggle CSS is injected and synchronized
let s = document.getElementById('apple-toggle-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'apple-toggle-css';
    document.head.appendChild(s);
}
s.textContent = '.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--zen-toggle-bg,#27272e);border:1px solid var(--zen-border,#2d2d34);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--zen-muted,#86848c);transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.15)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:44px;height:16px;background:var(--zen-toggle-track,#1e1e24);border-radius:999px;border:1px solid var(--zen-border-subtle,#24242a);display:flex;align-items:center;justify-content:space-between;padding:0 5px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--zen-muted,#86848c);opacity:.5}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:4px;height:4px;border-radius:999px;background:#fff;box-shadow:0 0 3px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--zen-vermillion,#e05244);box-shadow:0 0 8px var(--zen-vermillion-glow,rgba(224,82,68,0.35))}.apple-c .halo-c.p1{transform:translateX(14px);background:var(--zen-ochre,#d49c24);box-shadow:0 0 8px rgba(212,156,36,0.35)}.apple-c .halo-c.p2{transform:translateX(28px);background:var(--zen-moss,#429e57);box-shadow:0 0 8px var(--zen-moss-glow,rgba(66,158,87,0.35))}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:44px}.apple-c .label.unread{color:var(--zen-vermillion,#e05244)}.apple-c .label.learning{color:var(--zen-ochre,#d49c24)}.apple-c .label.learned{color:var(--zen-moss,#429e57)}';

const currentPath = dv.currentFilePath || (dv.current() && dv.current().file ? dv.current().file.path : "");
const folder = currentPath.includes('/') ? currentPath.substring(0, currentPath.lastIndexOf('/')) : (dv.current() && dv.current().file ? dv.current().file.folder : "");

let wordPages = [];
if (folder) {
    try {
        wordPages = dv.pages('"' + folder + '"').where(n => !n.file.name.startsWith("Dashboard") && !n.file.name.startsWith("Word Triage") && !n.file.name.startsWith("Cluster") && (n.latin_root || n.greek_root || (!n.file.name.startsWith("Dashboard") && !n.file.name.startsWith("Cluster"))));
    } catch (e) { wordPages = []; }
}

const t = wordPages ? wordPages.length : 0;
const l = (wordPages && t > 0) ? wordPages.where(n => n.status === "learned").length : 0;
const g = (wordPages && t > 0) ? wordPages.where(n => n.status === "learning").length : 0;
const u = t - l - g;

const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
];

function makeWordToggle(wObj) {
    let curIdx = states.findIndex(s => s.key === wObj.status);
    if (curIdx === -1) curIdx = 0;

    const tog = document.createElement('div');
    tog.className = 'apple-c';
    tog.title = 'Click to glide: unread ➔ learning ➔ learned';

    const trk = document.createElement('div');
    trk.className = 'track-c';
    trk.innerHTML = '<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ' + states[curIdx].p + '"><div class="core-dot"></div></div>';

    const lbl = document.createElement('span');
    lbl.className = 'label ' + states[curIdx].cls;
    lbl.textContent = states[curIdx].label;

    tog.appendChild(trk);
    tog.appendChild(lbl);

    tog.addEventListener('click', async (e) => {
        e.stopPropagation();
        curIdx = (curIdx + 1) % 3;
        const nxt = states[curIdx];
        trk.querySelector('.halo-c').className = 'halo-c ' + nxt.p;
        lbl.className = 'label ' + nxt.cls;
        lbl.textContent = nxt.label;
        wObj.status = nxt.key;

        const file = app.vault.getAbstractFileByPath(wObj.path);
        if (file) {
            await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
            new Notice(wObj.name + ': marked ' + nxt.key);
        }
    });
    return tog;
}

// Build word objects list
const wordList = [];
for (let p of wordPages) {
    wordList.push({
        name: p.file.name,
        path: p.file.path,
        link: p.file.link,
        status: p.status || "unread"
    });
}
wordList.sort((a, b) => a.name.localeCompare(b.name));

// Filter Bar Container
const filterBar = document.createElement('div');
filterBar.style = "display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin:20px 0 16px; padding:12px 18px; background:var(--zen-bg-card,#1a1a1e); border:1px solid var(--zen-border,#2d2d34); border-radius:8px;";

const barLabel = document.createElement('div');
barLabel.style = "font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); font-family:Georgia,serif;";
barLabel.textContent = "Word Triage Filter:";

const pillsBox = document.createElement('div');
pillsBox.style = "display:flex; gap:8px; flex-wrap:wrap;";

filterBar.appendChild(barLabel);
filterBar.appendChild(pillsBox);
dv.container.appendChild(filterBar);

const wordsListContainer = document.createElement('div');
wordsListContainer.style = "margin-bottom:30px;";
dv.container.appendChild(wordsListContainer);

let activeFilter = 'all';

function renderFilteredWords(filter) {
    wordsListContainer.innerHTML = '';
    const filtered = wordList.filter(w => {
        if (filter === 'all') return true;
        return w.status === filter;
    });

    if (filtered.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.style = "padding:24px; text-align:center; color:var(--zen-muted,#86848c); font-style:italic; font-family:Georgia,serif; background:var(--zen-bg-card,#1a1a1e); border:1px dashed var(--zen-border,#2d2d34); border-radius:8px;";
        emptyMsg.textContent = "No derived words currently marked as '" + filter + "'.";
        wordsListContainer.appendChild(emptyMsg);
        return;
    }

    const grid = document.createElement('div');
    grid.style = "display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:10px;";

    for (let w of filtered) {
        const card = document.createElement('div');
        card.style = "background:var(--zen-bg-card,#1a1a1e); border:1px solid var(--zen-border,#2d2d34); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition:all .2s ease;";
        card.title = "Click to open [[" + w.name + "]]";

        card.addEventListener('mouseenter', () => {
            card.style.borderColor = "var(--zen-vermillion,#e05244)";
            card.style.transform = "translateY(-1px)";
            card.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = "var(--zen-border,#2d2d34)";
            card.style.transform = "none";
            card.style.boxShadow = "none";
        });

        // Clicking the card opens that word note in Obsidian!
        card.addEventListener('click', () => {
            app.workspace.openLinkText(w.name, currentPath, false);
        });

        const wordLink = document.createElement('span');
        wordLink.style = "font-family:Georgia,serif; font-size:14px; font-weight:600; color:var(--zen-ink,#ececec); text-decoration:none;";
        wordLink.textContent = w.name;

        card.appendChild(wordLink);
        card.appendChild(makeWordToggle(w));
        grid.appendChild(card);
    }
    wordsListContainer.appendChild(grid);
}

const tabs = [
    { key: 'all', label: 'All (' + t + ')', color: 'var(--zen-ink,#ececec)' },
    { key: 'unread', label: '🔴 Unread (' + u + ')', color: 'var(--zen-vermillion,#e05244)' },
    { key: 'learning', label: '🟡 Learning (' + g + ')', color: 'var(--zen-ochre,#d49c24)' },
    { key: 'learned', label: '🟢 Learned (' + l + ')', color: 'var(--zen-moss,#429e57)' }
];

tabs.forEach(t => {
    const btn = document.createElement('button');
    btn.style = "background:var(--zen-bg-subtle,#222227); border:1px solid var(--zen-border,#2d2d34); border-radius:999px; padding:4px 12px; font-size:11px; font-weight:600; cursor:pointer; color:var(--zen-muted,#86848c); transition:all .2s ease;";
    btn.textContent = t.label;

    if (t.key === activeFilter) {
        btn.style.borderColor = t.color;
        btn.style.color = t.color;
        btn.style.background = "rgba(255,255,255,0.06)";
    }

    btn.addEventListener('click', () => {
        activeFilter = t.key;
        pillsBox.querySelectorAll('button').forEach((b, idx) => {
            const tb = tabs[idx];
            if (tb.key === activeFilter) {
                b.style.borderColor = tb.color;
                b.style.color = tb.color;
                b.style.background = "rgba(255,255,255,0.06)";
            } else {
                b.style.borderColor = "var(--zen-border,#2d2d34)";
                b.style.color = "var(--zen-muted,#86848c)";
                b.style.background = "var(--zen-bg-subtle,#222227)";
            }
        });
        renderFilteredWords(activeFilter);
    });
    pillsBox.appendChild(btn);
});

renderFilteredWords(activeFilter);

```
