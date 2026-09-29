---
status: unread
type: cluster_dashboard
---
# Cluster Good & Bad

```dataviewjs
// Ensure Apple Toggle CSS is injected and synchronized
let s = document.getElementById('apple-toggle-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'apple-toggle-css';
    document.head.appendChild(s);
}
s.textContent = '.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--zen-toggle-bg,#27272e);border:1px solid var(--zen-border,#2d2d34);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--zen-muted,#86848c);transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.15)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:44px;height:16px;background:var(--zen-toggle-track,#1e1e24);border-radius:999px;border:1px solid var(--zen-border-subtle,#24242a);display:flex;align-items:center;justify-content:space-between;padding:0 5px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--zen-muted,#86848c);opacity:.5}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:4px;height:4px;border-radius:999px;background:#fff;box-shadow:0 0 3px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--zen-vermillion,#e05244);box-shadow:0 0 8px var(--zen-vermillion-glow,rgba(224,82,68,0.35))}.apple-c .halo-c.p1{transform:translateX(14px);background:var(--zen-ochre,#d49c24);box-shadow:0 0 8px rgba(212,156,36,0.35)}.apple-c .halo-c.p2{transform:translateX(28px);background:var(--zen-moss,#429e57);box-shadow:0 0 8px var(--zen-moss-glow,rgba(66,158,87,0.35))}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:44px}.apple-c .label.unread{color:var(--zen-vermillion,#e05244)}.apple-c .label.learning{color:var(--zen-ochre,#d49c24)}.apple-c .label.learned{color:var(--zen-moss,#429e57)}';

// Robust path and file resolution
const currentPath = dv.currentFilePath || (dv.current() && dv.current().file ? dv.current().file.path : "");
const folder = currentPath.includes('/') ? currentPath.substring(0, currentPath.lastIndexOf('/')) : (dv.current() && dv.current().file ? dv.current().file.folder : "");
const rawFileName = currentPath ? currentPath.substring(currentPath.lastIndexOf('/') + 1).replace(/\.md$/, '') : (dv.current() && dv.current().file ? dv.current().file.name : "");
const clusterName = rawFileName;
const cur = dv.current();
const rawStatus = (cur && cur.status) ? cur.status : "unread";

const isEnglish = folder.includes("English vocabulary master");
const isLatin = folder.includes("Latin roots");

let t = 0, l = 0, g = 0, u = 0, lPct = "0.0", gPct = "0.0";
let typeLabel = "Root Dashboards";

if (isEnglish) {
    let words = [];
    if (folder) {
        try {
            words = dv.pages('"' + folder + '"').where(n => n.cluster && n.type !== "cluster_dashboard" && n.type !== "semantic_field");
        } catch (e) { words = []; }
    }
    t = words ? words.length : 0;
    l = (words && t > 0) ? words.where(n => n.status === "learned").length : 0;
    g = (words && t > 0) ? words.where(n => n.status === "learning").length : 0;
    typeLabel = "Vocabulary Words";
} else {
    // Latin & Greek: Progress bar tracks NUMBER OF ROOT DASHBOARDS LEARNED!
    let dashboards = [];
    if (folder) {
        try {
            dashboards = dv.pages('"' + folder + '"').where(n => n.type === "root_dashboard" || (n.file.name.startsWith("Dashboard") && !n.file.name.includes("Roots") && n.file.name !== clusterName));
        } catch (e) { dashboards = []; }
    }
    t = dashboards ? dashboards.length : 0;
    l = (dashboards && t > 0) ? dashboards.where(n => n.status === "learned").length : 0;
    g = (dashboards && t > 0) ? dashboards.where(n => n.status === "learning").length : 0;
    typeLabel = "Root Dashboards";
}

u = t - l - g;
lPct = t > 0 ? ((l / t) * 100).toFixed(1) : "0.0";
gPct = t > 0 ? ((g / t) * 100).toFixed(1) : "0.0";

const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
];

let curIdx = states.findIndex(s => s.key === rawStatus);
if (curIdx === -1) curIdx = 0;

const toggle = document.createElement('div');
toggle.className = 'apple-c';
toggle.title = 'Click to glide: unread ➔ learning ➔ learned';

const track = document.createElement('div');
track.className = 'track-c';
track.innerHTML = '<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ' + states[curIdx].p + '"><div class="core-dot"></div></div>';

const label = document.createElement('span');
label.className = 'label ' + states[curIdx].cls;
label.textContent = states[curIdx].label;

toggle.appendChild(track);
toggle.appendChild(label);

const cleanCluster = clusterName.replace('Cluster ', '');
const isMastered = (curIdx === 2 || (t > 0 && l === t));

toggle.addEventListener('click', async (e) => {
    e.stopPropagation();
    curIdx = (curIdx + 1) % 3;
    const nxt = states[curIdx];
    track.querySelector('.halo-c').className = 'halo-c ' + nxt.p;
    label.className = 'label ' + nxt.cls;
    label.textContent = nxt.label;

    const seal = container.querySelector('.hanko-seal');
    if (seal) {
        if (nxt.key === 'learned') {
            seal.style.opacity = "0.95";
            seal.style.transform = "rotate(-3deg) scale(1)";
        } else {
            seal.style.opacity = "0.25";
            seal.style.transform = "rotate(-6deg) scale(0.92)";
        }
    }

    const file = app.vault.getAbstractFileByPath(currentPath);
    if (file) {
        await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
        new Notice(clusterName + ': marked ' + nxt.key);
    }
});

// Container element
const container = document.createElement('div');
container.className = 'zen-hud-card';
container.style = "background:var(--zen-bg-card,#1a1a1e); color:var(--zen-ink,#ececec); border:1px solid var(--zen-border,#2d2d34); border-radius:10px; padding:24px 28px; margin:16px 0 24px; box-shadow:var(--zen-shadow,0 6px 24px rgba(0,0,0,0.4)); position:relative; box-sizing:border-box;";

const stampText = isEnglish ? 'English Vocabulary Cluster' : (isLatin ? 'Latin Root Cluster' : 'Greek Root Cluster');

container.innerHTML = '' +
  '<div style="position:absolute; top:14px; right:28px; font-family:Georgia,serif; font-size:48px; font-weight:300; color:var(--zen-muted,#86848c); line-height:1; pointer-events:none; user-select:none; opacity:0.25;">' + cleanCluster + '</div>' +
  '<div style="display:inline-flex; align-items:center; border:1px solid var(--zen-vermillion,#e05244); color:var(--zen-vermillion,#e05244); font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:2px 7px; border-radius:2px; margin-bottom:6px; background:var(--zen-vermillion-glow,rgba(224,82,68,0.1));">' + stampText + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:28px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.5px; line-height:1.2;">' + cleanCluster + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:14px; font-style:italic; color:var(--zen-muted,#86848c); margin-top:3px;">' + stampText + ' · Tracking ' + t + ' ' + typeLabel + ' in this Cluster</div>' +
  '<div style="width:100%; height:1px; background:linear-gradient(to right, var(--zen-ink,#ececec) 25%, transparent 95%); opacity:0.15; margin:16px 0;"></div>' +
  '<div style="display:grid; grid-template-columns:auto 1fr auto; gap:28px; align-items:center; margin:12px 0 16px;">' +
    '<div style="position:relative; width:68px; height:68px; display:flex; align-items:center; justify-content:center;">' +
      '<svg style="width:68px; height:68px; transform:rotate(-90deg);" viewBox="0 0 36 36">' +
        '<path stroke="var(--zen-border-subtle,#24242a)" stroke-width="3.6" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
        '<path stroke="var(--zen-moss,#429e57)" stroke-width="3.8" stroke-linecap="round" fill="none" stroke-dasharray="' + lPct + ', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
      '</svg>' +
      '<div style="position:absolute; font-family:Georgia,serif; font-size:14px; font-weight:700; color:var(--zen-ink,#ececec);">' + lPct + '%</div>' +
    '</div>' +
    '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ink,#ececec); line-height:1;">' + t + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">' + typeLabel + '</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-moss,#429e57); line-height:1;">' + l + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Mastered</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ochre,#d49c24); line-height:1;">' + g + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Studying</div></div>' +
    '</div>' +
    '<div class="hanko-seal" style="width:42px; height:42px; border:2px solid var(--zen-vermillion,#e05244); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--zen-vermillion,#e05244); font-family:Georgia,serif; font-size:20px; font-weight:700; user-select:none; transition:all .35s; opacity:' + (isMastered ? '0.95' : '0.25') + '; transform:' + (isMastered ? 'rotate(-3deg) scale(1)' : 'rotate(-6deg) scale(0.92)') + ';" title="Cluster Mastery Seal (熟)">熟</div>' +
  '</div>' +
  '<div style="width:100%; height:3px; background:var(--zen-border-subtle,#24242a); border-radius:2px; overflow:hidden; margin:14px 0; display:flex; gap:1px;">' +
    '<div style="height:100%; background:var(--zen-moss,#429e57); border-radius:2px 0 0 2px; width:' + lPct + '%;"></div>' +
    '<div style="height:100%; background:var(--zen-ochre,#d49c24); width:' + gPct + '%;"></div>' +
  '</div>' +
'';

const toggleRow = document.createElement('div');
toggleRow.style = "display:flex; justify-content:space-between; align-items:center; padding-top:6px; margin-top:4px;";

const toggleLabel = document.createElement('span');
toggleLabel.style = "font-size:10px; text-transform:uppercase; letter-spacing:1.2px; color:var(--zen-muted,#86848c); font-weight:600;";
toggleLabel.textContent = "Cluster Study Status";

toggleRow.appendChild(toggleLabel);
toggleRow.appendChild(toggle);

container.appendChild(toggleRow);
dv.container.appendChild(container);
```

## 📋 Roots in this Cluster

```dataviewjs
// Ensure Apple Toggle CSS is injected and synchronized
let s = document.getElementById('apple-toggle-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'apple-toggle-css';
    document.head.appendChild(s);
}
s.textContent = '.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--zen-toggle-bg,#27272e);border:1px solid var(--zen-border,#2d2d34);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--zen-muted,#86848c);transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.15)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:44px;height:16px;background:var(--zen-toggle-track,#1e1e24);border-radius:999px;border:1px solid var(--zen-border-subtle,#24242a);display:flex;align-items:center;justify-content:space-between;padding:0 5px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--zen-muted,#86848c);opacity:.5}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:4px;height:4px;border-radius:999px;background:#fff;box-shadow:0 0 3px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--zen-vermillion,#e05244);box-shadow:0 0 8px var(--zen-vermillion-glow,rgba(224,82,68,0.35))}.apple-c .halo-c.p1{transform:translateX(14px);background:var(--zen-ochre,#d49c24);box-shadow:0 0 8px rgba(212,156,36,0.35)}.apple-c .halo-c.p2{transform:translateX(28px);background:var(--zen-moss,#429e57);box-shadow:0 0 8px var(--zen-moss-glow,rgba(66,158,87,0.35))}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:44px}.apple-c .label.unread{color:var(--zen-vermillion,#e05244)}.apple-c .label.learning{color:var(--zen-ochre,#d49c24)}.apple-c .label.learned{color:var(--zen-moss,#429e57)}';

function makeProgressBar(learned, learning, total) {
    const lPct = total > 0 ? ((learned / total) * 100).toFixed(1) : "0.0";
    const gPct = total > 0 ? ((learning / total) * 100).toFixed(1) : "0.0";
    
    const wrap = document.createElement('div');
    wrap.style = "display:flex; align-items:center; gap:8px; min-width:150px;";
    
    const track = document.createElement('div');
    track.style = "flex:1; height:4px; background:var(--zen-border-subtle,#24242a); border-radius:999px; overflow:hidden; display:flex; gap:1px; border:1px solid var(--zen-border,#2d2d34);";
    
    const lBar = document.createElement('div');
    lBar.style = "width:" + lPct + "%; background:var(--zen-moss,#429e57); border-radius:999px 0 0 999px;";
    
    const gBar = document.createElement('div');
    gBar.style = "width:" + gPct + "%; background:var(--zen-ochre,#d49c24);";
    
    track.appendChild(lBar);
    track.appendChild(gBar);
    wrap.appendChild(track);
    
    const pctLabel = document.createElement('span');
    pctLabel.style = "font-size:11px; font-weight:700; color:" + (learned > 0 ? "var(--zen-moss,#429e57)" : "var(--zen-muted,#86848c)") + "; min-width:38px; text-align:right;";
    pctLabel.textContent = lPct + "%";
    wrap.appendChild(pctLabel);
    
    const countLabel = document.createElement('span');
    countLabel.style = "font-size:10px; color:var(--zen-muted,#86848c); min-width:48px;";
    countLabel.textContent = "(" + learned + "/" + total + ")";
    wrap.appendChild(countLabel);
    
    return wrap;
}

const currentPath = dv.currentFilePath || (dv.current() && dv.current().file ? dv.current().file.path : "");
const folder = currentPath.includes('/') ? currentPath.substring(0, currentPath.lastIndexOf('/')) : (dv.current() && dv.current().file ? dv.current().file.folder : "");

let rootPages = [];
if (folder) {
    try {
        rootPages = dv.pages('"' + folder + '"').where(n => n.type === "root_dashboard" || (n.file.name.startsWith("Dashboard") && !n.file.name.includes("Roots")));
    } catch(e) { rootPages = []; }
}

const rootMap = new Map();
let rLearned = 0, rLearning = 0, rUnread = 0;

for (let rp of rootPages) {
    const rawStatus = rp.status || "unread";
    rootMap.set(rp.file.name, {
        link: rp.file.link,
        name: rp.file.name,
        path: rp.file.path,
        status: rawStatus,
        total: 0,
        learned: 0,
        learning: 0
    });
    if (rawStatus === "learned") rLearned++;
    else if (rawStatus === "learning") rLearning++;
    else rUnread++;
}
const rTotal = rootMap.size;

let words = [];
if (folder) {
    try {
        words = dv.pages('"' + folder + '"').where(n => n.latin_root || n.greek_root);
    } catch(e) { words = []; }
}

for (let w of words) {
    let rName = null;
    const rProp = w.latin_root || w.greek_root;
    if (rProp) {
        if (rProp.path) {
            const parts = rProp.path.replace(/\\/g, '/').replace(/\.md$/, '').split('/');
            rName = parts[parts.length - 1];
        } else {
            rName = String(rProp).replace(/^\[\[/, '').replace(/\]\]$/, '').split('|')[0].replace(/\.md$/, '').replace(/\\/g, '/').split('/').pop();
        }
    }
    if (!rName || !rootMap.has(rName)) {
        const fName = w.file.folder.replace(/\\/g, '/').split('/').pop();
        if (rootMap.has(fName)) rName = fName;
    }
    if (rName && rootMap.has(rName)) {
        const d = rootMap.get(rName);
        d.total++;
        if (w.status === "learned") d.learned++;
        else if (w.status === "learning") d.learning++;
    }
}

const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
];

function makeRootToggle(d) {
    let curIdx = states.findIndex(s => s.key === d.status);
    if (curIdx === -1) curIdx = 0;

    const toggle = document.createElement('div');
    toggle.className = 'apple-c';
    toggle.title = 'Click to glide: unread ➔ learning ➔ learned';

    const track = document.createElement('div');
    track.className = 'track-c';
    track.innerHTML = '<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ' + states[curIdx].p + '"><div class="core-dot"></div></div>';

    const label = document.createElement('span');
    label.className = 'label ' + states[curIdx].cls;
    label.textContent = states[curIdx].label;

    toggle.appendChild(track);
    toggle.appendChild(label);

    toggle.addEventListener('click', async (e) => {
        e.stopPropagation();
        curIdx = (curIdx + 1) % 3;
        const nxt = states[curIdx];
        const halo = track.querySelector('.halo-c');
        halo.className = 'halo-c ' + nxt.p;
        label.className = 'label ' + nxt.cls;
        label.textContent = nxt.label;
        d.status = nxt.key;

        const file = app.vault.getAbstractFileByPath(d.path);
        if (file) {
            await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
            new Notice(d.name + ': marked ' + nxt.key);
        }
    });
    return toggle;
}

// Filter Bar Container
const filterBar = document.createElement('div');
filterBar.style = "display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin:20px 0 12px; padding-top:12px; border-top:1px solid var(--zen-border,#2d2d34);";

const barLabel = document.createElement('div');
barLabel.style = "font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:var(--zen-muted,#86848c); font-family:Georgia,serif;";
barLabel.textContent = "Root Dashboards in this Cluster:";

const pillsBox = document.createElement('div');
pillsBox.style = "display:flex; gap:8px; flex-wrap:wrap;";

filterBar.appendChild(barLabel);
filterBar.appendChild(pillsBox);
dv.container.appendChild(filterBar);

// List Container
const listContainer = document.createElement('div');
dv.container.appendChild(listContainer);

const allRoots = Array.from(rootMap.values()).sort((a, b) => a.name.localeCompare(b.name));
let activeFilter = 'all';

function renderFilteredRoots(filter) {
    listContainer.innerHTML = '';
    const filtered = allRoots.filter(r => {
        if (filter === 'all') return true;
        return r.status === filter;
    });

    if (filtered.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.style = "padding:20px; text-align:center; color:var(--zen-muted,#86848c); font-style:italic; font-family:Georgia,serif; background:var(--zen-bg-card,#1a1a1e); border:1px dashed var(--zen-border,#2d2d34); border-radius:8px;";
        emptyMsg.textContent = "No root dashboards currently marked as '" + filter + "'.";
        listContainer.appendChild(emptyMsg);
        return;
    }

    const table = document.createElement('table');
    table.style = "width:100%; border-collapse:separate; border-spacing:0; margin:8px 0; border:1px solid var(--zen-border,#2d2d34); border-radius:6px; overflow:hidden; background:var(--zen-bg-card,#1a1a1e);";

    const thead = document.createElement('thead');
    thead.innerHTML = '<tr style="background:var(--zen-bg-subtle,#222227);">' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left;">Root Dashboard</th>' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left; width:140px;">Root Toggle</th>' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left; width:220px;">Derived Words Progress</th>' +
    '</tr>';
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let r of filtered) {
        const tr = document.createElement('tr');
        tr.style = "border-bottom:1px dotted var(--zen-border,#2d2d34);";

        const cleanName = r.name.replace(/^Dashboard\s*—\s*/, '');
        const tdLink = document.createElement('td');
        tdLink.style = "padding:10px 14px; border-bottom:1px dotted var(--zen-border,#2d2d34); font-weight:600;";
        const a = document.createElement('a');
        a.className = 'internal-link';
        a.setAttribute('data-href', r.name);
        a.href = r.name;
        a.textContent = cleanName;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            app.workspace.openLinkText(r.name, currentPath, false);
        });
        tdLink.appendChild(a);

        const tdToggle = document.createElement('td');
        tdToggle.style = "padding:10px 14px; border-bottom:1px dotted var(--zen-border,#2d2d34);";
        tdToggle.appendChild(makeRootToggle(r));

        const tdProg = document.createElement('td');
        tdProg.style = "padding:10px 14px; border-bottom:1px dotted var(--zen-border,#2d2d34);";
        tdProg.appendChild(makeProgressBar(r.learned, r.learning, r.total));

        tr.appendChild(tdLink);
        tr.appendChild(tdToggle);
        tr.appendChild(tdProg);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    listContainer.appendChild(table);
}

const tabs = [
    { key: 'all', label: 'All (' + rTotal + ')', color: 'var(--zen-ink,#ececec)' },
    { key: 'unread', label: '🔴 Unread (' + rUnread + ')', color: 'var(--zen-vermillion,#e05244)' },
    { key: 'learning', label: '🟡 Learning (' + rLearning + ')', color: 'var(--zen-ochre,#d49c24)' },
    { key: 'learned', label: '🟢 Learned (' + rLearned + ')', color: 'var(--zen-moss,#429e57)' }
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
        renderFilteredRoots(activeFilter);
    });
    pillsBox.appendChild(btn);
});

renderFilteredRoots(activeFilter);

```
