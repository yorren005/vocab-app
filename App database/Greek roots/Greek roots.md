---
aliases:
  - Greek Roots
  - Greek root
  - Dashboard — Greek Roots
tags:
  - greek-roots
  - master-dashboard
  - etymology
banner: "[[banner.jpg]]"
banner_y: 0.5
banner_icon: 🏛️
---

# Greek roots — Master Map of Content (MOC)

> [!abstract] 🏛️ Vault Master Index
> **Scope:** Classical, Hellenistic, and Byzantine Greek morphological foundations of the English lexicon.  
> **Architecture:** 30 Semantic Clusters · 810 Canonical Root Dashboards · Exhaustive Derived Vocabulary.  
> **Tracker:** 📊 [[Greek Learning Progress|Open Learning Progress Dashboard]]

---

## 📋 Master Root Directory

- **[[Master Table — Greek Roots]]** — Complete directory of all 810 canonical Greek roots indexed 1–810.

---

## 🛠️ Morphological Reference Manuals & Guides

Essential methodologies for dissecting, assembling, and mastering Hellenic English vocabulary:

1. **[[The Core Formula & Connective Tissue]]** — The fundamental compounding equation (Prefix + Root₁ + Connector -o- + Root₂ / Suffix), euphonic bonding, and vowel elision.
2. **[[Advanced Greek Root Rules (Internal Shifts & Transliteration)]]** — Greek vowel ablaut (apophony), classical transliteration matrices, and nasal assimilation rules.
3. **[[Prefix Greek]]** — Comprehensive catalog of Greek directional, spatial, and intensive prefixes.
4. **[[Suffix Greek]]** — Full structural taxonomy of Greek nominal, adjectival, and verbal suffixes.
5. **[[The 4-Step Dissection Method]]** — Standardized 4-step word deconstruction algorithm with diagnostic protocols.
6. **[[Greek Word Construction and Deconstruction]]** — Comprehensive visual guide and flowcharts for morpheme interaction.
7. **[[Greek Construction & Deconstruction Atlas]]** — Worked multi-disciplinary case studies across Medicine, Science, Philosophy, and Academia.

---

## 🧭 Semantic Clusters Index (30 Clusters)

```dataviewjs
// Ensure Apple Toggle CSS is injected and synchronized
let s = document.getElementById('apple-toggle-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'apple-toggle-css';
    document.head.appendChild(s);
}
s.textContent = '.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--zen-toggle-bg,#27272e);border:1px solid var(--zen-border,#2d2d34);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--zen-muted,#86848c);transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.15)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:44px;height:16px;background:var(--zen-toggle-track,#1e1e24);border-radius:999px;border:1px solid var(--zen-border-subtle,#24242a);display:flex;align-items:center;justify-content:space-between;padding:0 5px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--zen-muted,#86848c);opacity:.5}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:4px;height:4px;border-radius:999px;background:#fff;box-shadow:0 0 3px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--zen-vermillion,#e05244);box-shadow:0 0 8px var(--zen-vermillion-glow,rgba(224,82,68,0.35))}.apple-c .halo-c.p1{transform:translateX(14px);background:var(--zen-ochre,#d49c24);box-shadow:0 0 8px rgba(212,156,36,0.35)}.apple-c .halo-c.p2{transform:translateX(28px);background:var(--zen-moss,#429e57);box-shadow:0 0 8px var(--zen-moss-glow,rgba(66,158,87,0.35))}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:44px}.apple-c .label.unread{color:var(--zen-vermillion,#e05244)}.apple-c .label.learning{color:var(--zen-ochre,#d49c24)}.apple-c .label.learned{color:var(--zen-moss,#429e57)}';

const clusterData = [
  { num: "01", name: "Cluster Action", roots: 35, focus: "Doing, making, driving, working, creating (*prassein, poiein, ergon*)" },
  { num: "02", name: "Cluster Animals & Zoology", roots: 39, focus: "Fauna, beasts, birds, insects, reptiles (*zoion, theri-, ornis, ichthys*)" },
  { num: "03", name: "Cluster Art, Craft & Design", roots: 17, focus: "Skill, craftsmanship, carving, painting (*techne, glyphein, graphein*)" },
  { num: "04", name: "Cluster Beginning & Primacy", roots: 8, focus: "Origins, leadership, first principles, ancient states (*arche, protos, palaios*)" },
  { num: "05", name: "Cluster Body & Physiology", roots: 97, focus: "Somatic anatomy, organs, physiological systems (*soma, kardia, encephalon*)" },
  { num: "06", name: "Cluster Cognition & Mind", roots: 15, focus: "Intellect, thought, memory, consciousness (*nous, phren, psyche, mneme*)" },
  { num: "07", name: "Cluster Earth & Geology", roots: 22, focus: "Terrestrial strata, rocks, caves, soils (*ge, petra, lithos, spelaion*)" },
  { num: "08", name: "Cluster Feeling & Sensation", roots: 27, focus: "Emotion, passion, suffering, perception (*pathos, aisthesis, phobos*)" },
  { num: "09", name: "Cluster Form & Space", roots: 156, focus: "Geometry, dimensions, spatial relations, positions (*morphe, schema, topos*)" },
  { num: "10", name: "Cluster Law & Order", roots: 10, focus: "Custom, justice, rulership, governance (*nomos, dike, kratos, arche*)" },
  { num: "11", name: "Cluster Life & Vitality", roots: 15, focus: "Organic life, generation, growth, vitality (*bios, zoe, physis, genesis*)" },
  { num: "12", name: "Cluster Light & Vision", roots: 28, focus: "Radiance, vision, color, illumination (*phos, opsis, chroma, leukos*)" },
  { num: "13", name: "Cluster Medicine & Pathology", roots: 32, focus: "Pathology, therapies, healing, disease (*nosos, therapeia, iatros, trauma*)" },
  { num: "14", name: "Cluster Motion & Direction", roots: 19, focus: "Kinetic force, velocity, direction, course (*kinesis, dynamis, dromos*)" },
  { num: "15", name: "Cluster Nature & Cosmos", roots: 15, focus: "Cosmic order, heavens, celestial spheres (*kosmos, ouranos, astron, helios*)" },
  { num: "16", name: "Cluster Number & Mathematics", roots: 49, focus: "Quantities, ratios, metrics, calculation (*metron, arithmos, logos*)" },
  { num: "17", name: "Cluster Physics & Chemistry", roots: 25, focus: "Elements, physical materials, matter, reaction (*hyle, pyr, aer, therme*)" },
  { num: "18", name: "Cluster Plants & Botany", roots: 31, focus: "Flora, leaves, flowers, seeds, roots (*phyton, phyllon, anthos, sperma*)" },
  { num: "19", name: "Cluster Power, Strength & Dominion", roots: 4, focus: "Might, force, sovereignty, command (*kratos, dynamis, sthenos, arche*)" },
  { num: "20", name: "Cluster Science & Inquiry", roots: 7, focus: "Investigation, research, empirical study, method (*zetesis, historia, episteme*)" },
  { num: "21", name: "Cluster Self & Identity", roots: 10, focus: "Individuality, personhood, internal state, sameness (*autos, idios, homos*)" },
  { num: "22", name: "Cluster Society & Governance", roots: 37, focus: "Humanity, demographics, civic order, polity (*anthropos, demos, ethnos, polis*)" },
  { num: "23", name: "Cluster Sound & Auditory", roots: 14, focus: "Acoustics, tone, resonance, vocalization (*phone, echo, tone, akouein*)" },
  { num: "24", name: "Cluster Speech & Language", roots: 13, focus: "Discourse, words, rhetoric, dialect (*logos, epos, glossa, lexis*)" },
  { num: "25", name: "Cluster Structure & Form", roots: 9, focus: "Architecture, framework, morphology, support (*tekton, schema, stereos*)" },
  { num: "26", name: "Cluster Time & Chronology", roots: 25, focus: "Temporal flow, eras, hours, cycles (*chronos, kairos, aion, hora*)" },
  { num: "27", name: "Cluster Turning & Transformation", roots: 8, focus: "Rotation, revolution, change, metamorphosis (*tropos, strophe, helix*)" },
  { num: "28", name: "Cluster War & Conflict", roots: 9, focus: "Strife, struggle, battle, weapons (*polemos, mache, agon, hoplon*)" },
  { num: "29", name: "Cluster Water & Hydrology", roots: 19, focus: "Fluids, oceans, rivers, moisture (*hydor, thalassa, potamos, hygros*)" },
  { num: "30", name: "Cluster Writing & Script", roots: 15, focus: "Scripts, literature, notation, engraving (*graphein, gramma, biblion, glyph*)" }
];

const clusterPages = dv.pages('"Greek roots"').where(p => p.file.name.startsWith("Cluster ") && p.file.folder.replace(/\\/g, '/').split('/').length === 2);
const clusterInfoMap = new Map();
let clusterLearned = 0, clusterLearning = 0, clusterUnread = 0;

for (let cp of clusterPages) {
    const st = cp.status || "unread";
    clusterInfoMap.set(cp.file.name, {
        status: st,
        path: cp.file.path
    });
    if (st === "learned") clusterLearned++;
    else if (st === "learning") clusterLearning++;
    else clusterUnread++;
}
const clusterTotal = clusterData.length;

// Fetch all Greek words and aggregate per cluster
const words = dv.pages('"Greek roots"').where(p => p.greek_root || (p.file.folder.includes("Cluster ") && !p.file.name.startsWith("Dashboard") && !p.file.name.startsWith("Cluster")));
const wordStats = new Map();
let grandTotal = 0, grandLearned = 0, grandLearning = 0;

for (let w of words) {
    const normFolder = w.file.folder.replace(/\\/g, '/');
    const parts = normFolder.split('/');
    const cName = parts.length > 1 ? parts[1] : null;
    if (cName && cName.startsWith("Cluster ")) {
        if (!wordStats.has(cName)) wordStats.set(cName, { total: 0, learned: 0, learning: 0 });
        const d = wordStats.get(cName);
        d.total++;
        grandTotal++;
        if (w.status === "learned") { d.learned++; grandLearned++; }
        else if (w.status === "learning") { d.learning++; grandLearning++; }
    }
}

// Top Grand Progress HUD
const gPct = grandTotal > 0 ? ((grandLearned / grandTotal) * 100).toFixed(1) : "0.0";
const gStudyPct = grandTotal > 0 ? ((grandLearning / grandTotal) * 100).toFixed(1) : "0.0";

const hud = document.createElement('div');
hud.className = 'zen-hud-card';
hud.style = "background:var(--zen-bg-card,#1a1a1e); border:1px solid var(--zen-border,#2d2d34); border-radius:10px; padding:24px 28px; margin:16px 0 24px; box-shadow:var(--zen-shadow,0 6px 24px rgba(0,0,0,0.4));";

hud.innerHTML = '' +
  '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:18px;">' +
    '<div style="display:flex; flex-direction:column; gap:4px;">' +
      '<div style="display:inline-flex; align-items:center; border:1px solid var(--zen-vermillion,#e05244); color:var(--zen-vermillion,#e05244); font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:2px 7px; border-radius:2px; margin-bottom:4px; background:var(--zen-vermillion-glow,rgba(224,82,68,0.1));">Greek Roots Grand Mastery HUD</div>' +
      '<div style="font-family:Georgia,serif; font-size:24px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.3px;">Greek Morphological Foundations <span style="font-size:13px; font-weight:400; color:var(--zen-muted,#86848c); font-style:italic;">(' + grandTotal + ' vocabulary words)</span></div>' +
    '</div>' +
    '<div style="display:flex; align-items:center; gap:16px; background:var(--zen-bg-subtle,#222227); border:1px solid var(--zen-border,#2d2d34); padding:10px 20px; border-radius:6px;">' +
      '<div style="position:relative; width:56px; height:56px; display:flex; align-items:center; justify-content:center;">' +
        '<svg style="width:56px; height:56px; transform:rotate(-90deg);" viewBox="0 0 36 36">' +
          '<path stroke="var(--zen-border-subtle,#24242a)" stroke-width="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
          '<path stroke="var(--zen-moss,#429e57)" stroke-width="3.6" stroke-dasharray="' + gPct + ', 100" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
        '</svg>' +
        '<span style="position:absolute; font-family:Georgia,serif; font-size:12px; font-weight:700; color:var(--zen-ink,#ececec);">' + gPct + '%</span>' +
      '</div>' +
      '<div>' +
        '<div style="font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c);">Overall Mastery</div>' +
        '<div style="font-family:Georgia,serif; font-size:18px; font-weight:700; color:var(--zen-moss,#429e57); line-height:1.2;">' + grandLearned + ' / ' + grandTotal + '</div>' +
        '<div style="font-size:10px; color:var(--zen-muted,#86848c); margin-top:2px;">' + grandLearning + ' studying · ' + (grandTotal - grandLearned - grandLearning) + ' unread</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div style="width:100%; height:1px; background:linear-gradient(to right, var(--zen-ink,#ececec) 25%, transparent 95%); opacity:0.15; margin:14px 0;"></div>' +
  '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:12px;">' +
    '<div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:1.2px; color:var(--zen-muted,#86848c);">Filter Clusters By Status:</div>' +
    '<div id="greek-cluster-filter-pills" style="display:flex; gap:8px; flex-wrap:wrap;"></div>' +
  '</div>';

dv.container.appendChild(hud);

const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
];

function makeAppleToggle(rawStatus, filePath, clusterName) {
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
            new Notice(clusterName + ': marked ' + nxt.key);
        }
    });
    return toggle;
}

function makeProgressBar(learned, learning, total) {
    const lPct = total > 0 ? ((learned / total) * 100).toFixed(1) : "0.0";
    const gPct = total > 0 ? ((learning / total) * 100).toFixed(1) : "0.0";
    
    const wrap = document.createElement('div');
    wrap.style = "display:flex; align-items:center; gap:10px; min-width:160px;";
    
    const track = document.createElement('div');
    track.style = "flex:1; height:5px; background:var(--zen-border-subtle,#24242a); border-radius:999px; overflow:hidden; display:flex; gap:1px; border:1px solid var(--zen-border,#2d2d34);";
    
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
    countLabel.style = "font-size:10px; color:var(--zen-muted,#86848c); min-width:55px;";
    countLabel.textContent = "(" + learned + "/" + total + ")";
    wrap.appendChild(countLabel);
    
    return wrap;
}

const currentPath = dv.currentFilePath || (dv.current() && dv.current().file ? dv.current().file.path : "Greek roots/Greek roots.md");

// Fetch all Greek root dashboards and aggregate per cluster
const rootDashboards = dv.pages('"Greek roots"').where(p => p.type === "root_dashboard" || (p.file.name.startsWith("Dashboard — ") && !p.file.name.includes("Roots")));
const rootCounts = new Map();
for (let r of rootDashboards) {
    const normFolder = r.file.folder.replace(/\\/g, '/');
    const parts = normFolder.split('/');
    const cName = parts.length > 1 ? parts[1] : null;
    if (cName && cName.startsWith("Cluster ")) {
        rootCounts.set(cName, (rootCounts.get(cName) || 0) + 1);
    }
}

// Prepare Cluster Items List
const allClusters = [];
for (let c of clusterData) {
    const clusterPath = 'Greek roots/' + c.name + '/' + c.name + '.md';
    const cInfo = clusterInfoMap.get(c.name) || { status: "unread", path: clusterPath };
    const wData = wordStats.get(c.name) || { total: 0, learned: 0, learning: 0 };
    allClusters.push({
        num: c.num,
        name: c.name,
        path: clusterPath,
        status: cInfo.status,
        roots: rootCounts.get(c.name) || c.roots,
        focus: c.focus,
        wData: wData
    });
}

// Interactive List View Container
const listContainer = document.createElement('div');
listContainer.style = "margin-top:16px;";
dv.container.appendChild(listContainer);

let activeFilter = 'all';

function renderFilteredClusters(filter) {
    listContainer.innerHTML = '';
    const filtered = allClusters.filter(c => {
        if (filter === 'all') return true;
        return c.status === filter;
    });

    if (filtered.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.style = "padding:24px; text-align:center; color:var(--zen-muted,#86848c); font-style:italic; font-family:Georgia,serif; background:var(--zen-bg-card,#1a1a1e); border:1px dashed var(--zen-border,#2d2d34); border-radius:8px;";
        emptyMsg.textContent = "No clusters currently marked as '" + filter + "'.";
        listContainer.appendChild(emptyMsg);
        return;
    }

    const table = document.createElement('table');
    table.style = "width:100%; border-collapse:separate; border-spacing:0; margin:8px 0; border:1px solid var(--zen-border,#2d2d34); border-radius:6px; overflow:hidden; background:var(--zen-bg-card,#1a1a1e);";

    const thead = document.createElement('thead');
    thead.innerHTML = '<tr style="background:var(--zen-bg-subtle,#222227);">' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left; width:45px;">#</th>' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left;">Semantic Cluster</th>' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left; width:130px;">Status Toggle</th>' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left; width:180px;">Vocabulary Progress</th>' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left; width:80px;">Roots</th>' +
      '<th style="padding:10px 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--zen-muted,#86848c); border-bottom:1px solid var(--zen-border,#2d2d34); text-align:left;">Core Focus & Themes</th>' +
    '</tr>';
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let c of filtered) {
        const tr = document.createElement('tr');
        tr.style = "border-bottom:1px dotted var(--zen-border,#2d2d34);";

        const tdNum = document.createElement('td');
        tdNum.style = "padding:10px 14px; font-size:11px; color:var(--zen-muted,#86848c); border-bottom:1px dotted var(--zen-border,#2d2d34);";
        tdNum.textContent = c.num;

        const tdLink = document.createElement('td');
        tdLink.style = "padding:10px 14px; border-bottom:1px dotted var(--zen-border,#2d2d34); font-weight:600;";
        const a = document.createElement('a');
        a.className = 'internal-link';
        a.setAttribute('data-href', c.name);
        a.href = c.name;
        a.textContent = c.name;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            app.workspace.openLinkText(c.name, currentPath, false);
        });
        tdLink.appendChild(a);

        const tdToggle = document.createElement('td');
        tdToggle.style = "padding:10px 14px; border-bottom:1px dotted var(--zen-border,#2d2d34);";
        tdToggle.appendChild(makeAppleToggle(c.status, c.path, c.name));

        const tdProg = document.createElement('td');
        tdProg.style = "padding:10px 14px; border-bottom:1px dotted var(--zen-border,#2d2d34);";
        tdProg.appendChild(makeProgressBar(c.wData.learned, c.wData.learning, c.wData.total));

        const tdRoots = document.createElement('td');
        tdRoots.style = "padding:10px 14px; font-size:11px; color:var(--zen-muted,#86848c); border-bottom:1px dotted var(--zen-border,#2d2d34);";
        tdRoots.textContent = c.roots;

        const tdFocus = document.createElement('td');
        tdFocus.style = "padding:10px 14px; font-size:12px; color:var(--zen-ink-soft,#b0afb4); border-bottom:1px dotted var(--zen-border,#2d2d34);";
        tdFocus.textContent = c.focus;

        tr.appendChild(tdNum);
        tr.appendChild(tdLink);
        tr.appendChild(tdToggle);
        tr.appendChild(tdProg);
        tr.appendChild(tdRoots);
        tr.appendChild(tdFocus);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    listContainer.appendChild(table);
}

// Render Filter Tabs
const pillsBox = hud.querySelector('#greek-cluster-filter-pills');
const tabs = [
    { key: 'all', label: 'All (' + clusterTotal + ')', color: 'var(--zen-ink,#ececec)' },
    { key: 'unread', label: '🔴 Unread (' + clusterUnread + ')', color: 'var(--zen-vermillion,#e05244)' },
    { key: 'learning', label: '🟡 Learning (' + clusterLearning + ')', color: 'var(--zen-ochre,#d49c24)' },
    { key: 'learned', label: '🟢 Learned (' + clusterLearned + ')', color: 'var(--zen-moss,#429e57)' }
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
        renderFilteredClusters(activeFilter);
    });
    pillsBox.appendChild(btn);
});

renderFilteredClusters(activeFilter);



```
