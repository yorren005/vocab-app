---
aliases:
  - Latin Progress
  - Latin Learning Progress
  - Latin Roots Progress Tracker
tags:
  - dashboard
---

# 🏛️ Latin Roots — Learning Progress Dashboard

> [!abstract] 📊 Automated Learning Progress Tracker
> Automatically aggregates learning status across **Derived Words ➔ Latin Roots ➔ Clusters ➔ Overall Latin Knowledge Base**.
> 
> **Metadata Convention**:
> - `status: unread` (default for untagged words)
> - `status: learning` (currently studying)
> - `status: learned` (mastered)
> 
> **Interactive Callout Snippet** (paste into any derived word note):
> `> [!status] 🎯 **Status:** \`\`INPUT[inlineSelect(option(unread, 🔴 Unread), option(learning, 🟡 Learning), option(learned, 🟢 Learned)):status]\`\``

---

## 📈 Overall Latin Progress

```dataviewjs
const pages = dv.pages('"Latin roots"').where(p => p.latin_root);
const total = pages.length;
let learned = 0;
let learning = 0;
let unread = 0;

for (let p of pages) {
    if (p.status === "learned") learned++;
    else if (p.status === "learning") learning++;
    else unread++;
}

const pct = total > 0 ? ((learned / total) * 100).toFixed(2) : "0.00";
const learningPct = total > 0 ? ((learning / total) * 100).toFixed(2) : "0.00";

dv.paragraph('\n' +
'<div class="zen-hud-card" style="background:var(--zen-bg-card, #ffffff); border:1px solid var(--zen-border, #e6dfd3); border:1px solid var(--zen-border, #e6dfd3); border-radius:4px; padding:20px 24px; margin:16px 0 24px; box-shadow:var(--zen-shadow, 0 4px 18px rgba(40,35,30,0.05));">\n' +
'  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:18px;">\n' +
'    <div style="display:flex; flex-direction:column; gap:4px;">\n' +
'      <div style="display:flex; align-items:center; gap:8px;">\n' +
'        <span style="font-weight:800; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:var(--zen-vermillion, #c23b2b); font-family:Georgia, serif;">LATIN ROOTS GRAND MASTERY HUD</span>\n' +
'      </div>\n' +
'      <div style="font-size:20px; font-weight:800; color:var(--zen-ink, #1f1f1e); letter-spacing:-0.2px;">Derived Latin Vocabulary <span style="font-size:12px; font-weight:500; color:var(--text-muted); font-family:Georgia, serif;">(' + (total) + ' items)</span></div>\n' +
'    </div>\n' +
'    <div style="display:flex; align-items:center; gap:16px; background:var(--zen-bg-subtle, #f4f0e7); border:1px solid var(--zen-border, #e6dfd3); padding:10px 20px; border-radius:6px; border:1px solid var(--zen-border, #e6dfd3); box-shadow:none;">\n' +
'      <div style="position:relative; width:58px; height:58px; display:flex; align-items:center; justify-content:center;">\n' +
'        <svg style="width:58px; height:58px; transform:rotate(-90deg);" viewBox="0 0 36 36">\n' +
'          <path stroke="var(--zen-border-subtle, rgba(128,128,128,0.18))" stroke-width="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>\n' +
'          <path stroke="var(--apple-green, #30D158)" stroke-width="3.5" stroke-dasharray="' + (pct) + ', 100" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style="filter:drop-shadow(0 0 3px var(--zen-moss-glow));"/>\n' +
'        </svg>\n' +
'        <span style="position:absolute; font-family:Georgia, serif; font-size:12px; font-weight:800; color:var(--zen-ink, #1f1f1e);">' + (pct) + '%</span>\n' +
'      </div>\n' +
'      <div>\n' +
'        <div style="font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--text-muted); font-family:Georgia, serif;">Mastery Dial</div>\n' +
'        <div style="font-size:15px; font-weight:800; color:var(--zen-moss, #2b6d3b); font-family:Georgia, serif;">' + (learned) + ' / ' + (total) + '</div>\n' +
'        <div style="font-size:10px; color:var(--text-faint);">' + (learning) + ' study · ' + (unread) + ' unread</div>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:12px; padding-top:12px; border-top:1px solid var(--zen-border-subtle, #f0eae0);">\n' +
'    <div style="background:var(--zen-bg-subtle, #f4f0e7); border:1px solid var(--zen-border, #e6dfd3); padding:12px 16px; border-radius:4px; border:1px solid var(--zen-border, #e6dfd3); display:flex; justify-content:space-between; align-items:center;">\n' +
'      <span style="font-size:12px; color:var(--text-muted);">🟢 Mastered</span>\n' +
'      <span style="font-family:Georgia, serif; font-size:15px; font-weight:800; color:var(--zen-moss, #2b6d3b);">' + (learned) + '</span>\n' +
'    </div>\n' +
'    <div style="background:var(--zen-bg-subtle, #f4f0e7); border:1px solid var(--zen-border, #e6dfd3); padding:12px 16px; border-radius:4px; border:1px solid var(--zen-border, #e6dfd3); display:flex; justify-content:space-between; align-items:center;">\n' +
'      <span style="font-size:12px; color:var(--text-muted);">🟡 Studying</span>\n' +
'      <span style="font-family:Georgia, serif; font-size:15px; font-weight:800; color:var(--zen-ochre, #b58514);">' + (learning) + '</span>\n' +
'    </div>\n' +
'    <div style="background:var(--zen-bg-subtle, #f4f0e7); border:1px solid var(--zen-border, #e6dfd3); padding:12px 16px; border-radius:4px; border:1px solid var(--zen-border, #e6dfd3); display:flex; justify-content:space-between; align-items:center;">\n' +
'      <span style="font-size:12px; color:var(--text-muted);">🔴 Unread</span>\n' +
'      <span style="font-family:Georgia, serif; font-size:15px; font-weight:800; color:var(--text-faint);">' + (unread) + '</span>\n' +
'    </div>\n' +
'  </div>\n' +
'</div>\n' +
'');
```

---

## 🧭 Cluster Progress

```dataviewjs
const pages = dv.pages('"Latin roots"').where(p => p.latin_root);
const clusterMap = new Map();

for (let p of pages) {
    const isLearned = p.status === "learned";
    const isLearning = p.status === "learning";

    const parts = p.file.folder.replace(/\\/g, '/').split('/');
    const clusterName = (parts.length > 1 && parts[1].startsWith('Cluster')) ? parts[1] : (p.cluster ? p.cluster.fileName : "Other");
    
    if (!clusterMap.has(clusterName)) {
        clusterMap.set(clusterName, { total: 0, learned: 0, learning: 0 });
    }
    const cData = clusterMap.get(clusterName);
    cData.total++;
    if (isLearned) cData.learned++;
    else if (isLearning) cData.learning++;
}

const clusterPages = dv.pages('"Latin roots"').where(p => p.file.name.startsWith("Cluster ") && p.file.folder.replace(/\\/g, '/').split('/').length === 2);
const clusterInfoMap = new Map();
for (let cp of clusterPages) {
    clusterInfoMap.set(cp.file.name, {
        status: cp.status || "unread",
        path: cp.file.path
    });
}

const rows = [];
for (let [name, data] of clusterMap.entries()) {
    const pctVal = data.total > 0 ? (data.learned / data.total) * 100 : 0;
    const pct = pctVal.toFixed(1) + "%";
    
    const lPct = data.total > 0 ? (data.learned / data.total) * 100 : 0;
    const gPct = data.total > 0 ? (data.learning / data.total) * 100 : 0;
    const miniBar = '<div style="display:flex; width:55px; height:4px; background:var(--background-modifier-border); border-radius:999px; overflow:hidden; gap:1px;"><div style="width:' + (lPct) + '%; background:var(--color-green, #a6e3a1);"></div><div style="width:' + (gPct) + '%; background:var(--color-yellow, #f9e2af);"></div></div>';
    
    const clusterPath = 'Latin roots/' + (name) + '/' + (name) + '.md';
    const cInfo = clusterInfoMap.get(name) || { status: "unread", path: clusterPath };
    const rawStatus = cInfo.status;
    
    if(!document.getElementById('apple-toggle-css')){const s=document.createElement('style');s.id='apple-toggle-css';s.textContent=':root{--apple-red:#FF375F;--apple-red-glow:rgba(255,55,95,0.45);--apple-amber:#FF9F0A;--apple-amber-glow:rgba(255,159,10,0.45);--apple-green:#30D158;--apple-green-glow:rgba(48,209,88,0.45)}.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--background-secondary,#111624);border:1px solid var(--background-modifier-border,#232d42);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--text-muted,#3b4b6b);transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.35)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:48px;height:18px;background:var(--background-primary,#090d17);border-radius:999px;border:1px solid var(--background-modifier-border,#1c2436);display:flex;align-items:center;justify-content:space-between;padding:0 6px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--text-faint,#334155);opacity:.6}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:14px;height:14px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:5px;height:5px;border-radius:999px;background:#fff;box-shadow:0 0 4px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--apple-red);box-shadow:0 0 12px var(--apple-red),0 0 20px var(--apple-red-glow)}.apple-c .halo-c.p1{transform:translateX(15px);background:var(--apple-amber);box-shadow:0 0 12px var(--apple-amber),0 0 20px var(--apple-amber-glow)}.apple-c .halo-c.p2{transform:translateX(30px);background:var(--apple-green);box-shadow:0 0 12px var(--apple-green),0 0 20px var(--apple-green-glow)}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:48px}.apple-c .label.unread{color:var(--apple-red)}.apple-c .label.learning{color:var(--apple-amber)}.apple-c .label.learned{color:var(--apple-green)}';document.head.appendChild(s);}
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

    toggle.addEventListener('click', async (e) => {
        e.stopPropagation();
        curIdx = (curIdx + 1) % 3;
        const nxt = states[curIdx];
        const halo = track.querySelector('.halo-c');
        halo.className = 'halo-c ' + nxt.p;
        label.className = 'label ' + nxt.cls;
        label.textContent = nxt.label;

        const file = app.vault.getAbstractFileByPath(cInfo.path);
        if (file) {
            await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
            new Notice('' + (name) + ': marked ' + (nxt.key) + '');
        }
    });

    const clusterLink = dv.fileLink(clusterPath, false, name);
    rows.push([clusterLink, toggle, miniBar, data.learned, data.learning, data.total, pct]);
}

rows.sort((a, b) => {
    const pctA = parseFloat(a[6]);
    const pctB = parseFloat(b[6]);
    if (pctB !== pctA) return pctB - pctA;
    return String(a[0]).localeCompare(String(b[0]));
});

dv.table(["Cluster", "Cluster Status Toggle", "Progress", "Learned", "Learning", "Total", "% Complete"], rows);
```

---

## 🌿 Latin Root Progress

```dataviewjs
if(!document.getElementById('apple-toggle-css')){const s=document.createElement('style');s.id='apple-toggle-css';s.textContent=':root{--apple-red:#FF375F;--apple-red-glow:rgba(255,55,95,0.45);--apple-amber:#FF9F0A;--apple-amber-glow:rgba(255,159,10,0.45);--apple-green:#30D158;--apple-green-glow:rgba(48,209,88,0.45)}.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--background-secondary,#111624);border:1px solid var(--background-modifier-border,#232d42);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--text-muted,#3b4b6b);transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.35)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:48px;height:18px;background:var(--background-primary,#090d17);border-radius:999px;border:1px solid var(--background-modifier-border,#1c2436);display:flex;align-items:center;justify-content:space-between;padding:0 6px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--text-faint,#334155);opacity:.6}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:14px;height:14px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:5px;height:5px;border-radius:999px;background:#fff;box-shadow:0 0 4px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--apple-red);box-shadow:0 0 12px var(--apple-red),0 0 20px var(--apple-red-glow)}.apple-c .halo-c.p1{transform:translateX(15px);background:var(--apple-amber);box-shadow:0 0 12px var(--apple-amber),0 0 20px var(--apple-amber-glow)}.apple-c .halo-c.p2{transform:translateX(30px);background:var(--apple-green);box-shadow:0 0 12px var(--apple-green),0 0 20px var(--apple-green-glow)}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:48px}.apple-c .label.unread{color:var(--apple-red)}.apple-c .label.learning{color:var(--apple-amber)}.apple-c .label.learned{color:var(--apple-green)}';document.head.appendChild(s);}
function makeAppleToggle(rawStatus, filePath, fileName) {
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

    toggle.addEventListener('click', async (e) => {
        e.stopPropagation();
        curIdx = (curIdx + 1) % 3;
        const nxt = states[curIdx];
        const halo = track.querySelector('.halo-c');
        halo.className = 'halo-c ' + nxt.p;
        label.className = 'label ' + nxt.cls;
        label.textContent = nxt.label;

        const file = app.vault.getAbstractFileByPath(filePath);
        if (file) {
            await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
            new Notice('' + (fileName) + ': marked ' + (nxt.key) + '');
        }
    });
    return toggle;
}

const pages = dv.pages('"Latin roots"').where(p => p.latin_root);
const rootMap = new Map();

for (let p of pages) {
    const isLearned = p.status === "learned";
    const isLearning = p.status === "learning";

    const parts = p.file.folder.replace(/\\/g, '/').split('/');
    const clusterName = (parts.length > 1 && parts[1].startsWith('Cluster')) ? parts[1] : "Other";
    
    const rootPath = p.latin_root ? p.latin_root.path : "Unknown";
    const rootName = p.latin_root ? p.latin_root.fileName : "Unknown";
    
    if (!rootMap.has(rootPath)) {
        rootMap.set(rootPath, { link: p.latin_root, name: rootName, cluster: clusterName, path: rootPath, total: 0, learned: 0, learning: 0 });
    }
    const rData = rootMap.get(rootPath);
    rData.total++;
    if (isLearned) rData.learned++;
    else if (isLearning) rData.learning++;
}

const rootPages = dv.pages('"Latin roots"').where(p => p.type === "root_dashboard" || (p.file.name.startsWith("Dashboard — ") && !p.file.name.includes("Roots")));
const rootStatusMap = new Map();
for (let rp of rootPages) {
    rootStatusMap.set(rp.file.name, { status: rp.status || "unread", path: rp.file.path });
}

const rows = [];
for (let [rPath, data] of rootMap.entries()) {
    const pctVal = data.total > 0 ? (data.learned / data.total) * 100 : 0;
    const pct = pctVal.toFixed(1) + "%";
    
    const lPct = data.total > 0 ? (data.learned / data.total) * 100 : 0;
    const gPct = data.total > 0 ? (data.learning / data.total) * 100 : 0;
    const miniBar = '<div style="display:flex; width:55px; height:4px; background:var(--background-modifier-border); border-radius:999px; overflow:hidden; gap:1px;"><div style="width:' + (lPct) + '%; background:var(--color-green, #a6e3a1);"></div><div style="width:' + (gPct) + '%; background:var(--color-yellow, #f9e2af);"></div></div>';
    
    const rInfo = rootStatusMap.get(data.name) || { status: "unread", path: data.path };
    const toggle = makeAppleToggle(rInfo.status, rInfo.path, data.name);

    rows.push([data.link, toggle, data.cluster, miniBar, data.learned, data.learning, data.total, pct]);
}

rows.sort((a, b) => {
    const pctA = parseFloat(a[7]);
    const pctB = parseFloat(b[7]);
    if (pctB !== pctA) return pctB - pctA;
    return a[2].localeCompare(b[2]) || String(a[0]).localeCompare(String(b[0]));
});

dv.table(["Latin Root", "Root Status Toggle", "Cluster", "Progress", "Learned", "Learning", "Total", "% Complete"], rows);
```

---

## 🟡 Words Currently In Progress

```dataviewjs
if(!document.getElementById('apple-toggle-css')){const s=document.createElement('style');s.id='apple-toggle-css';s.textContent=':root{--apple-red:#FF375F;--apple-red-glow:rgba(255,55,95,0.45);--apple-amber:#FF9F0A;--apple-amber-glow:rgba(255,159,10,0.45);--apple-green:#30D158;--apple-green-glow:rgba(48,209,88,0.45)}.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--background-secondary,#111624);border:1px solid var(--background-modifier-border,#232d42);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--text-muted,#3b4b6b);transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.35)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:48px;height:18px;background:var(--background-primary,#090d17);border-radius:999px;border:1px solid var(--background-modifier-border,#1c2436);display:flex;align-items:center;justify-content:space-between;padding:0 6px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--text-faint,#334155);opacity:.6}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:14px;height:14px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:5px;height:5px;border-radius:999px;background:#fff;box-shadow:0 0 4px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--apple-red);box-shadow:0 0 12px var(--apple-red),0 0 20px var(--apple-red-glow)}.apple-c .halo-c.p1{transform:translateX(15px);background:var(--apple-amber);box-shadow:0 0 12px var(--apple-amber),0 0 20px var(--apple-amber-glow)}.apple-c .halo-c.p2{transform:translateX(30px);background:var(--apple-green);box-shadow:0 0 12px var(--apple-green),0 0 20px var(--apple-green-glow)}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:48px}.apple-c .label.unread{color:var(--apple-red)}.apple-c .label.learning{color:var(--apple-amber)}.apple-c .label.learned{color:var(--apple-green)}';document.head.appendChild(s);}
function makeAppleToggle(rawStatus, filePath, fileName) {
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

    toggle.addEventListener('click', async (e) => {
        e.stopPropagation();
        curIdx = (curIdx + 1) % 3;
        const nxt = states[curIdx];
        const halo = track.querySelector('.halo-c');
        halo.className = 'halo-c ' + nxt.p;
        label.className = 'label ' + nxt.cls;
        label.textContent = nxt.label;

        const file = app.vault.getAbstractFileByPath(filePath);
        if (file) {
            await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
            new Notice('' + (fileName) + ': marked ' + (nxt.key) + '');
        }
    });
    return toggle;
}

const learningWords = dv.pages('"Latin roots"').where(p => p.status === "learning");
if (learningWords.length === 0) {
    dv.paragraph("*No words currently marked as 'learning'. Open any derived word note and set its status to 🟡 Learning.*");
} else {
    const rows = learningWords.map(p => {
        const toggle = makeAppleToggle(p.status, p.file.path, p.file.name);
        return [p.file.link, toggle, p.latin_root, p.cluster];
    });
    dv.table(["Word", "Word Status Toggle", "Latin Root", "Cluster"], rows);
}
```

---

## 🟢 Words Mastered (Learned)

```dataviewjs
if(!document.getElementById('apple-toggle-css')){const s=document.createElement('style');s.id='apple-toggle-css';s.textContent=':root{--apple-red:#FF375F;--apple-red-glow:rgba(255,55,95,0.45);--apple-amber:#FF9F0A;--apple-amber-glow:rgba(255,159,10,0.45);--apple-green:#30D158;--apple-green-glow:rgba(48,209,88,0.45)}.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--background-secondary,#111624);border:1px solid var(--background-modifier-border,#232d42);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--text-muted,#3b4b6b);transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.35)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:48px;height:18px;background:var(--background-primary,#090d17);border-radius:999px;border:1px solid var(--background-modifier-border,#1c2436);display:flex;align-items:center;justify-content:space-between;padding:0 6px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--text-faint,#334155);opacity:.6}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:14px;height:14px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:5px;height:5px;border-radius:999px;background:#fff;box-shadow:0 0 4px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--apple-red);box-shadow:0 0 12px var(--apple-red),0 0 20px var(--apple-red-glow)}.apple-c .halo-c.p1{transform:translateX(15px);background:var(--apple-amber);box-shadow:0 0 12px var(--apple-amber),0 0 20px var(--apple-amber-glow)}.apple-c .halo-c.p2{transform:translateX(30px);background:var(--apple-green);box-shadow:0 0 12px var(--apple-green),0 0 20px var(--apple-green-glow)}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:48px}.apple-c .label.unread{color:var(--apple-red)}.apple-c .label.learning{color:var(--apple-amber)}.apple-c .label.learned{color:var(--apple-green)}';document.head.appendChild(s);}
function makeAppleToggle(rawStatus, filePath, fileName) {
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

    toggle.addEventListener('click', async (e) => {
        e.stopPropagation();
        curIdx = (curIdx + 1) % 3;
        const nxt = states[curIdx];
        const halo = track.querySelector('.halo-c');
        halo.className = 'halo-c ' + nxt.p;
        label.className = 'label ' + nxt.cls;
        label.textContent = nxt.label;

        const file = app.vault.getAbstractFileByPath(filePath);
        if (file) {
            await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
            new Notice('' + (fileName) + ': marked ' + (nxt.key) + '');
        }
    });
    return toggle;
}

const learnedWords = dv.pages('"Latin roots"').where(p => p.status === "learned");
if (learnedWords.length === 0) {
    dv.paragraph("*No words currently marked as 'learned'. Open any derived word note and set its status to 🟢 Learned.*");
} else {
    const rows = learnedWords.map(p => {
        const toggle = makeAppleToggle(p.status, p.file.path, p.file.name);
        return [p.file.link, toggle, p.latin_root, p.cluster];
    });
    dv.table(["Word", "Word Status Toggle", "Latin Root", "Cluster"], rows);
}
```

