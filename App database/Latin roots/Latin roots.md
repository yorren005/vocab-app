---
aliases:
  - Latin Roots
  - Latin root
  - Dashboard — Latin Roots
tags:
  - latin-roots
  - master-dashboard
  - etymology
banner: "[[banner.jpg]]"
banner_y: 0.5
banner_icon: 📜
---

# Latin roots — Master Map of Content (MOC)

> [!abstract] 🏛️ Vault Master Index
> **Scope:** Classical & Medieval Latin morphological foundations of the English lexicon.  
> **Architecture:** 60 Semantic Clusters · 782+ Root Dashboards · Exhaustive Derived Vocabulary.  
> **Tracker:** 📊 [[Latin Learning Progress|Open Learning Progress Dashboard]]

---

## 📋 Master Root Directory

- **[[Master Table — Latin Roots]]** — Complete directory of all canonical Latin roots.

---

## 🛠️ Morphological Reference Manuals & Guides

Essential methodologies for dissecting, assembling, and mastering Latinate English vocabulary:

1. **[[The Core Formula & Connective Tissue]]** — The fundamental compounding equation (Prefix + Root + Connector -i- + Suffix), euphonic bonding, and vowel elision.
2. **[[Advanced Root Rules (Internal Shifts)]]** — Medial vowel weakening (a/e -> i), consonant assimilation, the Two-Stem System, and rhotacism.
3. **[[Prefix latin]]** — Complete directory of all 26+ Latin prefixes, spatial vectors, and phonetic assimilation matrices.
4. **[[Suffix latin]]** — Full structural taxonomy of Latin nominal, adjectival, and verbal suffixes.
5. **[[The 4-Step Dissection Method]]** — Standardized 4-step word deconstruction algorithm with diagnostic protocols.
6. **[[Latin Word Construction and Deconstruction]]** — Comprehensive visual guide and flowcharts for morpheme interaction.
7. **[[Latin Construction & Deconstruction Atlas]]** — Worked multi-disciplinary case studies across Medicine, Law, Science, and Academia.

---

## 🧭 Semantic Clusters Index (60 Clusters)

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
  { num: "01", name: "Cluster Action", focus: 'Doing, making, working, laboring (*facere, agere, laborare*)' },
  { num: "02", name: "Cluster Action & State", focus: 'Physical operations, states of being, crafts' },
  { num: "03", name: "Cluster Anatomy & Clinical Medicine", focus: 'Organs, physiological systems, medical terms' },
  { num: "04", name: "Cluster Animal & Plant", focus: 'Fauna and flora root stems' },
  { num: "05", name: "Cluster Animal Adjectives & Biological", focus: 'Zoological taxonomy and organismal traits (*bov-, can-, lup-*)' },
  { num: "06", name: "Cluster Asking & Seeking", focus: 'Inquiring, demanding, praying (*rogare, quaerere, petere*)' },
  { num: "07", name: "Cluster Binding", focus: 'Tying, fastening, connecting (*ligare, nectere, stringere*)' },
  { num: "08", name: "Cluster Body", focus: 'Somatic forms, limbs, physical organs' },
  { num: "09", name: "Cluster Body & State", focus: 'Somatic conditions, health, physical constitution' },
  { num: "10", name: "Cluster Botany, Minerals & Elements", focus: 'Plant structures, earths, metals, stones' },
  { num: "11", name: "Cluster Building & Dwelling", focus: 'Architecture, habitation, construction (*aedificare, habitare*)' },
  { num: "12", name: "Cluster Carrying", focus: 'Bearing, transporting, conveying (*portare, ferre, vehere*)' },
  { num: "13", name: "Cluster Clothing & Covering", focus: 'Garments, armor, shelters, veils (*vestire, tegere, velare*)' },
  { num: "14", name: "Cluster Color & Appearance", focus: 'Pigments, shades, visual traits (*albus, niger, ruber*)' },
  { num: "15", name: "Cluster Death", focus: 'Mortality, destruction, tombs (*mori, caedere, nex*)' },
  { num: "16", name: "Cluster Destruction", focus: 'Ruin, breaking, tearing down (*ruere, frangere, delere*)' },
  { num: "17", name: "Cluster Emotion", focus: 'Passions, feelings, temperaments (*sentire, pati, amare*)' },
  { num: "18", name: "Cluster Equality", focus: 'Sameness, balance, parity (*aequus, par, similis*)' },
  { num: "19", name: "Cluster Faith", focus: 'Trust, belief, fidelity (*fides, credere, jurare*)' },
  { num: "20", name: "Cluster Fire, Heat & Ash", focus: 'Combustion, warmth, thermal states (*ignis, ardere, calere*)' },
  { num: "21", name: "Cluster Food, Eating & Drink", focus: 'Nutrition, consumption, thirst (*edere, vorare, bibere*)' },
  { num: "22", name: "Cluster General", focus: 'General vocabulary, core Latin foundations, miscellaneous stems' },
  { num: "23", name: "Cluster Giving & Receiving", focus: 'Gifts, trade, debts, generosity (*dare, tribuere, capere*)' },
  { num: "24", name: "Cluster Good & Bad", focus: 'Value, virtue, corruption (*bonus, bene, malus, pravus*)' },
  { num: "25", name: "Cluster Greek-Latin Hybrid", focus: 'Cross-linguistic morphemes and Hellenic-Latin loanwords' },
  { num: "26", name: "Cluster Holding", focus: 'Gripping, retaining, possessing (*tenere, habere, prehendere*)' },
  { num: "27", name: "Cluster Law", focus: 'Statutes, justice, testimony, oaths (*lex, jus, testis*)' },
  { num: "28", name: "Cluster Law, Justice & Feudal", focus: 'Governance, decrees, feudal hierarchy, court procedure' },
  { num: "29", name: "Cluster Life", focus: 'Vitality, breath, growth, age (*vita, vivere, anima, nasci*)' },
  { num: "30", name: "Cluster Light", focus: 'Radiance, clarity, shining, vision (*lux, lucere, clarus*)' },
  { num: "31", name: "Cluster Mind & Knowledge", focus: 'Cognition, wisdom, intellect, memory (*mens, scire, noscere*)' },
  { num: "32", name: "Cluster Motion", focus: 'Moving, walking, yielding, driving (*movere, cedere, vadere*)' },
  { num: "33", name: "Cluster Movement & Speed", focus: 'Velocity, haste, rushing, delay (*currere, celer, tardus*)' },
  { num: "34", name: "Cluster Nature", focus: 'Earth, water, air, cosmic phenomena (*terra, aqua, aer, sol*)' },
  { num: "35", name: "Cluster Number & Measure", focus: 'Digits, arithmetic stems, proportions (*unus, duo, metiri*)' },
  { num: "36", name: "Cluster Objects & Forms", focus: 'Geometric shapes, dimensions, substances (*forma, figura*)' },
  { num: "37", name: "Cluster Order", focus: 'Sequence, ranking, classification (*ordo, series, gradus*)' },
  { num: "38", name: "Cluster Placing", focus: 'Setting, depositing, standing (*ponere, locare, statuere*)' },
  { num: "39", name: "Cluster Power", focus: 'Strength, dominance, rulership (*posse, valere, regere*)' },
  { num: "40", name: "Cluster Quantity", focus: 'Size, abundance, scarcity (*multus, magnus, parvus*)' },
  { num: "41", name: "Cluster Sacred", focus: 'Divinity, holiness, rituals, curses (*sacer, sanctus, divus*)' },
  { num: "42", name: "Cluster Sending", focus: 'Dispatching, emitting, casting (*mittere, jactare, legare*)' },
  { num: "43", name: "Cluster Senses & Perception", focus: 'Hearing, tasting, smelling, touching (*audire, gustare, tangere*)' },
  { num: "44", name: "Cluster Separation & Loosening", focus: 'Parting, cutting, dissolving (*secare, solvere, scindere*)' },
  { num: "45", name: "Cluster Sight", focus: 'Looking, observing, spectacles (*videre, specere, intueri*)' },
  { num: "46", name: "Cluster Sleep, Rest & Stillness", focus: 'Slumber, tranquility, pauses (*dormire, quies, sistere*)' },
  { num: "47", name: "Cluster Society", focus: 'Companionship, public life, civics (*socius, civis, populus*)' },
  { num: "48", name: "Cluster Space & Environment", focus: 'Distance, regions, enclosures, boundaries (*spatium, limes*)' },
  { num: "49", name: "Cluster Speech", focus: 'Utterance, tone, dialogue, voice (*loqui, fari, vox*)' },
  { num: "50", name: "Cluster Speech & Communication", focus: 'Discourse, declarations, proclamations (*dicere, clamare*)' },
  { num: "51", name: "Cluster Structure", focus: 'Frameworks, weaving, carpentry, fabric (*struere, texere*)' },
  { num: "52", name: "Cluster Thought", focus: 'Deliberation, opinion, deciding, judging (*putare, censere, judicare, cernere*)' },
  { num: "53", name: "Cluster Time", focus: 'Eras, seasons, durations, perpetuity (*tempus, annus, aevum*)' },
  { num: "54", name: "Cluster Touch", focus: 'Physical contact, hardness, softness (*tangere, palpare, durus, pungere*)' },
  { num: "55", name: "Cluster Truth, Deception & Error", focus: 'Honesty, reality, fallacies, tricks (*verus, fallere, fingere, errare*)' },
  { num: "56", name: "Cluster Turning", focus: 'Rotation, conversion, twisting (*vertere, torquere, volvere, mutare*)' },
  { num: "57", name: "Cluster Virtue", focus: 'Moral excellence, integrity, valor (*virtus, probus, decus, bonus*)' },
  { num: "58", name: "Cluster War", focus: 'Arms, conflict, martial power (*arma, bellum, pugnare*)' },
  { num: "59", name: "Cluster Weight", focus: 'Heaviness, gravity, balance, weighing (*pondus, gravis, pendere, baros*)' },
  { num: "60", name: "Cluster Writing", focus: 'Inscriptions, texts, books, records (*scribere, codex, littera, signare*)' }
];

const clusterPages = dv.pages('"Latin roots"').where(p => p.file.name.startsWith("Cluster ") && p.file.folder.replace(/\\/g, '/').split('/').length === 2);
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

// Fetch all Latin words and aggregate per cluster
const words = dv.pages('"Latin roots"').where(p => p.latin_root || (p.file.folder.includes("Cluster ") && !p.file.name.startsWith("Dashboard") && !p.file.name.startsWith("Cluster")));
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
      '<div style="display:inline-flex; align-items:center; border:1px solid var(--zen-vermillion,#e05244); color:var(--zen-vermillion,#e05244); font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:2px 7px; border-radius:2px; margin-bottom:4px; background:var(--zen-vermillion-glow,rgba(224,82,68,0.1));">Latin Roots Grand Mastery HUD</div>' +
      '<div style="font-family:Georgia,serif; font-size:24px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.3px;">Latin Morphological Foundations <span style="font-size:13px; font-weight:400; color:var(--zen-muted,#86848c); font-style:italic;">(' + grandTotal + ' vocabulary words)</span></div>' +
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
    '<div id="latin-cluster-filter-pills" style="display:flex; gap:8px; flex-wrap:wrap;"></div>' +
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

// Prepare Cluster Items List
const currentPath = dv.currentFilePath || (dv.current() && dv.current().file ? dv.current().file.path : "Latin roots/Latin roots.md");

const allClusters = [];
for (let c of clusterData) {
    const clusterPath = 'Latin roots/' + c.name + '/' + c.name + '.md';
    const cInfo = clusterInfoMap.get(c.name) || { status: "unread", path: clusterPath };
    const wData = wordStats.get(c.name) || { total: 0, learned: 0, learning: 0 };
    allClusters.push({
        num: c.num,
        name: c.name,
        path: clusterPath,
        status: cInfo.status,
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

        const tdFocus = document.createElement('td');
        tdFocus.style = "padding:10px 14px; font-size:12px; color:var(--zen-ink-soft,#b0afb4); border-bottom:1px dotted var(--zen-border,#2d2d34);";
        tdFocus.textContent = c.focus;

        tr.appendChild(tdNum);
        tr.appendChild(tdLink);
        tr.appendChild(tdToggle);
        tr.appendChild(tdProg);
        tr.appendChild(tdFocus);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    listContainer.appendChild(table);
}

// Render Filter Tabs
const pillsBox = hud.querySelector('#latin-cluster-filter-pills');
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
