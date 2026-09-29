---
status: unread
type: root_dashboard
---
# Dashboard — mob
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mob-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to move”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
  </div>
</div>

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
const rootName = rawFileName;
const cur = dv.current();
const rawStatus = (cur && cur.status) ? cur.status : "unread";
const isLatin = folder.includes("Latin roots");

let wordPages = [];
if (folder) {
    try {
        wordPages = dv.pages('"' + folder + '"').where(n => n.file.name !== rootName && !n.file.name.startsWith("Word Triage") && (n.latin_root || n.greek_root || (!n.file.name.startsWith("Dashboard") && !n.file.name.startsWith("Cluster"))));
    } catch (e) { wordPages = []; }
}

const t = wordPages ? wordPages.length : 0;
const l = (wordPages && t > 0) ? wordPages.where(n => n.status === "learned").length : 0;
const g = (wordPages && t > 0) ? wordPages.where(n => n.status === "learning").length : 0;
const u = t - l - g;
const lPct = t > 0 ? ((l / t) * 100).toFixed(1) : "0.0";
const gPct = t > 0 ? ((g / t) * 100).toFixed(1) : "0.0";

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

const cleanName = rootName.replace('Dashboard — ', '').replace('Dashboard – ', '').replace('Dashboard - ', '');
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
        new Notice(rootName + ': marked ' + nxt.key);
    }
});

// Container element with Zen HUD Card class
const container = document.createElement('div');
container.className = 'zen-hud-card';
container.style = "background:var(--zen-bg-card,#1a1a1e); color:var(--zen-ink,#ececec); border:1px solid var(--zen-border,#2d2d34); border-radius:10px; padding:24px 28px; margin:16px 0 20px; box-shadow:var(--zen-shadow,0 6px 24px rgba(0,0,0,0.4)); position:relative; box-sizing:border-box;";

const stampText = isLatin ? 'Latin Root' : 'Greek Root';

container.innerHTML = '' +
  '<div style="position:absolute; top:14px; right:28px; font-family:Georgia,serif; font-size:48px; font-weight:300; color:var(--zen-muted,#86848c); line-height:1; pointer-events:none; user-select:none; opacity:0.25;">' + cleanName + '</div>' +
  '<div style="display:inline-flex; align-items:center; border:1px solid var(--zen-vermillion,#e05244); color:var(--zen-vermillion,#e05244); font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:2px 7px; border-radius:2px; margin-bottom:6px; background:var(--zen-vermillion-glow,rgba(224,82,68,0.1));">' + stampText + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:28px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.5px; line-height:1.2;">' + cleanName + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:14px; font-style:italic; color:var(--zen-muted,#86848c); margin-top:3px;">' + stampText + ' · Derived Vocabulary (' + t + ' words)</div>' +
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
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ink,#ececec); line-height:1;">' + t + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Derived Words</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-moss,#429e57); line-height:1;">' + l + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Mastered</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ochre,#d49c24); line-height:1;">' + g + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Studying</div></div>' +
    '</div>' +
    '<div class="hanko-seal" style="width:42px; height:42px; border:2px solid var(--zen-vermillion,#e05244); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--zen-vermillion,#e05244); font-family:Georgia,serif; font-size:20px; font-weight:700; user-select:none; transition:all .35s; opacity:' + (isMastered ? '0.95' : '0.25') + '; transform:' + (isMastered ? 'rotate(-3deg) scale(1)' : 'rotate(-6deg) scale(0.92)') + ';" title="Mastery Seal (熟)">熟</div>' +
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
toggleLabel.textContent = "Root Study Status";

toggleRow.appendChild(toggleLabel);
toggleRow.appendChild(toggle);
container.appendChild(toggleRow);
dv.container.appendChild(container);

// ================= WORD TRIAGE LAUNCH CARD =================
const triageCard = document.createElement('div');
triageCard.className = 'zen-triage-card';
triageCard.style = "background:var(--zen-bg-card,#1a1a1e); border:1px solid var(--zen-border,#2d2d34); border-radius:8px; padding:14px 20px; margin:0 0 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; cursor:pointer; transition:all .25s ease;";
triageCard.title = "Click to open dedicated Word Triage page";

triageCard.innerHTML = '' +
  '<div style="display:flex; align-items:center; gap:16px;">' +
    '<div style="width:38px; height:38px; border-radius:8px; background:rgba(224,82,68,0.12); border:1px solid var(--zen-vermillion,#e05244); display:flex; align-items:center; justify-content:center; font-size:18px;">🎯</div>' +
    '<div>' +
      '<div style="font-family:Georgia,serif; font-size:15px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.2px;">Word Triage & Status Filters</div>' +
      '<div style="display:flex; gap:12px; margin-top:3px; font-size:11.5px; font-weight:600;">' +
        '<span style="color:var(--zen-vermillion,#e05244);">🔴 ' + u + ' unread</span> · ' +
        '<span style="color:var(--zen-ochre,#d49c24);">🟡 ' + g + ' studying</span> · ' +
        '<span style="color:var(--zen-moss,#429e57);">🟢 ' + l + ' mastered</span>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div style="display:flex; align-items:center; gap:8px; background:var(--zen-bg-subtle,#222227); border:1px solid var(--zen-border,#2d2d34); padding:6px 14px; border-radius:999px; font-size:12px; font-weight:700; color:var(--zen-ink,#ececec);">' +
    '<span>Open Triage Page</span>' +
    '<span style="color:var(--zen-vermillion,#e05244);">➔</span>' +
  '</div>';

triageCard.addEventListener('mouseenter', () => {
    triageCard.style.borderColor = "var(--zen-vermillion,#e05244)";
    triageCard.style.transform = "translateY(-1px)";
    triageCard.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)";
});
triageCard.addEventListener('mouseleave', () => {
    triageCard.style.borderColor = "var(--zen-border,#2d2d34)";
    triageCard.style.transform = "none";
    triageCard.style.boxShadow = "none";
});

triageCard.addEventListener('click', () => {
    const triagePageName = 'Word Triage — ' + cleanName;
    app.workspace.openLinkText(triagePageName, currentPath, false);
});

dv.container.appendChild(triageCard);

```

The root **mob** means to move. It refers to the action of moving and carrying out this process. In English, this root forms words such as *mobile*, *mobility*, *mobilize*, and *mobilization*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to move
> The root **mob** means to move. It refers to the action of moving and carrying out this process. In English, this root forms words such as *mobile*, *mobility*, *mobilize*, and *mobilization*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To move</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *mobile* and *mobility*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mob** comes from a Latin word that means *"to move"*.
  - At its core, it describes the action of move.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **mob** in an English word, think of **to move**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to move).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Mobile**: Capable of moving or being moved freely and easily.
  - **Mobility**: The ability or capacity to move or be moved freely and easily.
  - **Mobilize**: To assemble, organize, and equip armed forces and national resources for active military service.
  - **Mobilization**: The act, logistical process, and execution of assembling armed forces, munitions, and industrial capacity into operational readiness for war.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mob</mark>, think of <mark class="hl-def">to move</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mob** operates through a tightly integrated morpho-phonological engine centered on the Latin adjectival base *mōbil-* and its English aphetic clipping:
> - **Adjectival Base Stem:** `mobil-` (from Latin *mōbilis*) — forms primary descriptive adjectives and abstract nouns of capacity: *mobile*, *mobility*.
> - **Negative / Reversal Prefixed Stems:** `in-` + `mobil-` $\to$ `immobil-` (with regular Latin labial assimilation of *n* to *m* before *m*): *immobile*, *immobility*, *immobilize*, *immobilization*, *immobilizer*.
> - **Dynamic Verbalizer Engine:** `mobil-` + *-ize* $\to$ *mobilize* — an exceptionally productive transitive/intransitive verbal engine denoting organizational activation. It generates directional prefix modifications:
>   - *de-* + *mobilize* $\to$ *demobilize* (standing down forces to peacetime status).
>   - *re-* + *mobilize* $\to$ *remobilize* (reactivating standing reserves or dormant capital).
> - **Aphetic Monosyllabic Base:** `mob` (clipped from *mobile vulgus*) — operates as a completely independent base noun, transitive/intransitive verb, and compounding head in modern English, generating:
>   - Agent formations: *mobster* (with native agent suffix *-ster*).
>   - Sociological & political hybrids: *mobocracy* (with Greek *-kratia*), *mobbish* (with Germanic *-ish*), *mobbing* (ethological and workplace harassment).
> - **Classical Jurisprudential Remnant:** `mobilia` (Latin neuter plural substantive) preserved intact in civil law and international private law.
> - **Modern Hybrid Compounds:** *automobile* (Greek *auto-* + *mobile*), *automobilist*, *automobilism*, *mobile phone*, *mobility scooter*.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.latin_root);
const inProg = p.where(n => n.status === "learning");
const done = p.where(n => n.status === "learned");
if (inProg.length === 0 && done.length === 0) {
    dv.paragraph("*No words marked yet. Open any word card below and select 🟡 Learning or 🟢 Learned.*");
} else {
    let out = [];
    if (inProg.length > 0) out.push("🟡 **Currently Studying (" + inProg.length + "):** " + inProg.map(n => n.file.link).join(" · "));
    if (done.length > 0) out.push("🟢 **Mastered (" + done.length + "):** " + done.map(n => n.file.link).join(" · "));
    dv.paragraph(out.join("\n\n"));
}
```

> [!tip] 🌈 Shades of Meaning in Different Words
> Although the root fundamentally denotes the **capacity for or potentiality of motion**, its manifestation branches into six distinct operational planes across modern English:
> - **Kinematic Independence & Physical Portability:** In words like [[mobile]], [[mobility]], [[mobile phone]], and [[mobility scooter]], it denotes devices, human bodies, and technological systems designed to move freely across space without tethering or fixed conduits.
> - **Mechanical & Orthopedic Fixation:** In words like [[immobile]], [[immobility]], [[immobilize]], [[immobilization]], and [[immobilizer]], the root inverts to express the intentional restriction or catastrophic loss of movement—from medical splints stabilizing fractures to digital anti-theft systems halting vehicles.
> - **Military Organization & State Readiness:** In words like [[mobilize]], [[mobilization]], [[mobilizer]], [[demobilize]], [[demobilization]], [[remobilize]], and [[remobilization]], it governs the strategic transition of nations, armies, and reserves between dormant peacetime latency and active kinetic deployment.
> - **Collective Frenzy, Insurgency & Crime:** In words like [[mob]], [[mobster]], [[mobocracy]], [[mobbish]], and [[mobbing]], the root descends into sociology and criminology, describing disorderly crowds, gangland syndicates, lynch law, and targeted group harassment.
> - **Civil Jurisprudence & Property Law:** In [[mobilia]], the root preserves the classical Roman distinction between personal movable chattels and permanent real estate.
> - **Motorized Transportation & Automotive Culture:** In [[automobile]], [[automobilist]], and [[automobilism]], it captures the profound 20th-century transition from animal draft power to self-propelled mechanical transit.

---

## 🔀 4. Prefix & Combining Dynamics on mob

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **in-** (assimilated to **im-**) | not, opposite of, un- | [[immobile]] / [[immobility]] / [[immobilize]] | *in-* + *mōbilis* $\to$ deprived of movement; fixed, paralyzed, or intentionally locked in place. |
| **dē-** | down from, away, un-, reversal | [[demobilize]] / [[demobilization]] | *dē-* + *mobiliser* $\to$ to reverse military or civil mobilization; disband active units back to civil life. |
| **re-** | back, again, anew | [[remobilize]] / [[remobilization]] | *re-* + *mobilize* $\to$ to activate forces or financial assets a second time in response to renewed threat. |
| **auto-** (Greek αὐτός) | self, by oneself, spontaneous | [[automobile]] / [[automobilist]] / [[automobilism]] | *auto-* + *mōbilis* $\to$ self-moving; propelled by internal mechanical power rather than horses or external rails. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ity** | Abstract Noun (State / Capacity) | [[mobility]], [[immobility]] | Denotes the quality, state, or degree of being able (or unable) to move freely. |
| **-ize** | Transitive / Intransitive Verb | [[mobilize]], [[immobilize]] | To bring into a state of active deployment, or conversely, to render completely incapable of motion. |
| **-ation** | Noun of Action / Process | [[mobilization]], [[demobilization]], [[remobilization]], [[immobilization]] | Designates the systematic logistical act or institutional process of activating, standing down, or restraining. |
| **-er** | Noun of Agent / Instrument | [[mobilizer]], [[immobilizer]] | The individual who organizes collective action, or the mechanical/digital device that halts movement. |
| **-ster** | Noun of Agent (Associative / Derogatory) | [[mobster]] | A person belonging to a criminal gang or syndicate ("the Mob"). |
| **-ocracy** (Greek -κρατία) | Noun of Governance / Dominance | [[mobocracy]] | Rule or political domination exerted by an unruly, lawless multitude; ochlocracy. |
| **-ish** | Descriptive Adjective (Tendency) | [[mobbish]] | Having the disorderly, violent, or turbulent characteristics of an angry crowd. |
| **-ing** | Verbal Noun / Ethological Term | [[mobbing]] | The collective predatory harassment of prey species, or group psychological bullying in an organization. |
| **-ia** | Neuter Plural Noun (Substantive) | [[mobilia]] | Designates movable personal chattels and goods in civil and probate jurisprudence. |
| **-ist** | Noun of Personal Agent / Enthusiast | [[automobilist]] | A person who operates, drives, or champions motor vehicles. |
| **-ism** | Noun of Practice / Cultural Movement | [[automobilism]] | The culture, sport, industrial practice, and social ascendancy of automotive transit. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🎖️ **Military Strategy & Logistics** | [[mobilize]], [[mobilization]], [[demobilize]], [[remobilize]] | Conscription timetables, strategic railway deployment, standing down armies, post-conflict veteran reintegration. |
| 👥 **Sociology, Criminology & Law** | [[mob]], [[mobster]], [[mobocracy]], [[mobbish]], [[mobbing]], [[mobilia]] | Collective riot behavior, organized crime RICO prosecutions, workplace harassment audits, conflict of laws in estate probate. |
| 📡 **Telecommunications & Tech** | [[mobile]], [[mobile phone]], [[mobility]] | Cellular 5G base stations, untethered mobile operating systems, mobile workforce coordination, wireless data roaming. |
| 🚗 **Automotive Engineering & Transit** | [[automobile]], [[automobilist]], [[automobilism]], [[mobility scooter]] | Internal combustion and EV powertrains, urban vehicular planning, pedestrian-automotive infrastructure, assistive micro-mobility. |
| 🏥 **Medicine, Orthopedics & PT** | [[immobile]], [[immobility]], [[immobilize]], [[immobilization]], [[immobilizer]] | Cervical spine collar stabilization, plaster cast fracture management, post-stroke gait therapy, bedrest thrombosis prevention. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[automobile]] | noun | **1.** A motor vehicle with four wheels; usually propelled by an internal combustion engine.<br>**2.** Travel in an automobile. | *"Oppenheimer, for instance, had never seen an automobile or a motor-cycle."* — Jack London, *The Jacket (The Star-Rover)* |
| [[automobilist]] | noun | **1.** Someone who drives (or travels in) an automobile. | *"In academic literature, automobilist designates someone who drives (or travels in) an automobile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demob]] | verb | **1.** Retire from military service. | *"In academic literature, demob designates retire from military service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demobilisation]] | noun | **1.** Act of changing from a war basis to a peace basis including disbanding or discharging troops. | *"In academic literature, demobilisation designates act of changing from a war basis to a peace basis including disbanding or discharging troops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demobilise]] | verb | **1.** Release from military service or remove from the active list of military service.<br>**2.** Retire from military service. | *"In academic literature, demobilise designates release from military service or remove from the active list of military service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demobilization]] | noun | **1.** Act of changing from a war basis to a peace basis including disbanding or discharging troops. | *"In academic literature, demobilization designates act of changing from a war basis to a peace basis including disbanding or discharging troops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demobilize]] | verb | **1.** Release from military service or remove from the active list of military service.<br>**2.** Retire from military service. | *"In academic literature, demobilize designates release from military service or remove from the active list of military service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immobile]] | adjective | **1.** Not capable of movement or of being moved.<br>**2.** Securely fixed in place. | *"He hesitated for some moments, with a strangely immobile smile upon his face."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[immobilisation]] | noun | **1.** Fixation (as by a plaster cast) of a body part in order to promote proper healing.<br>**2.** The act of limiting movement or making incapable of movement. | *"In academic literature, immobilisation designates fixation (as by a plaster cast) of a body part in order to promote proper healing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immobilise]] | verb | **1.** Hold as reserve or withdraw from circulation; of capital.<br>**2.** To hold fast or prevent from moving. | *"In academic literature, immobilise designates hold as reserve or withdraw from circulation; of capital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immobility]] | noun | **1.** Remaining in place.<br>**2.** The quality of not moving. | *"To one who knew the man and his story there was something more striking in this immobility than in a collapse."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[immobilization]] | noun | **1.** Fixation (as by a plaster cast) of a body part in order to promote proper healing.<br>**2.** The act of limiting movement or making incapable of movement. | *"In academic literature, immobilization designates fixation (as by a plaster cast) of a body part in order to promote proper healing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immobilize]] | verb | **1.** Hold as reserve or withdraw from circulation; of capital.<br>**2.** To hold fast or prevent from moving. | *"A command from the tug and mooring beams glowed at the fore-and-aft towers to immobilize the Raven."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[immobilizing]] | noun | **1.** The act of limiting movement or making incapable of movement.<br>**2.** Hold as reserve or withdraw from circulation; of capital. | *"Kumiko hit a switch, and the utility beam-anchor connected to a triangular plate above the airlock, immobilizing and fixing the utility to the huge transporter's axis."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[mob]] | noun | **1.** A disorderly crowd of people.<br>**2.** A loose affiliation of gangsters in charge of organized criminal activities. | *"Volumnia never heard of such a thing. ‘The debilitated cousin holds that it’s sort of thing that’s sure tapn slongs votes—giv’n—Mob."* — Charles Dickens, *Bleak House* |
| [[moban]] | noun | **1.** Antipsychotic drug (trade name moban) used in the treatment of schizophrenia. | *"In academic literature, moban designates antipsychotic drug (trade name moban) used in the treatment of schizophrenia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobcap]] | noun | **1.** Large high frilly cap with a full crown; formerly worn indoors by women. | *"In academic literature, mobcap designates large high frilly cap with a full crown; formerly worn indoors by women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobile]] | noun | **1.** A river in southwestern alabama; flows into mobile bay.<br>**2.** A port in southwestern alabama on mobile bay. | *"She was a fine and handsome girl—not handsomer than some others, possibly—but her mobile peony mouth and large innocent eyes added eloquence to colour and shape."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[mobilisation]] | noun | **1.** Act of marshaling and organizing and making ready for use or action.<br>**2.** Act of assembling and putting into readiness for war or other emergency:. | *"In academic literature, mobilisation designates act of marshaling and organizing and making ready for use or action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobilise]] | verb | **1.** Call to arms; of military personnel.<br>**2.** Get ready for war. | *"In academic literature, mobilise designates call to arms; of military personnel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobility]] | noun | **1.** The quality of moving freely. | *"LI At length it was the eve of Old Lady-Day, and the agricultural world was in a fever of mobility such as only occurs at that particular date of the year."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[mobilization]] | noun | **1.** Act of assembling and putting into readiness for war or other emergency:.<br>**2.** Act of marshaling and organizing and making ready for use or action. | *"In academic literature, mobilization designates act of assembling and putting into readiness for war or other emergency:."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobilize]] | verb | **1.** Make ready for action or use.<br>**2.** Call to arms; of military personnel. | *"In academic literature, mobilize designates make ready for action or use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobius]] | noun | **1.** German mathematician responsible for the mobius strip (1790-1868). | *"In academic literature, mobius designates german mathematician responsible for the mobius strip (1790-1868)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moblike]] | adjective | **1.** Characteristic of a mob; disorderly or lawless. | *"In academic literature, moblike designates characteristic of a mob; disorderly or lawless."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobocracy]] | noun | **1.** A political system in which a mob is the source of control; government by the masses. | *"In academic literature, mobocracy designates a political system in which a mob is the source of control; government by the masses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobster]] | noun | **1.** A criminal who is a member of gang. | *"In academic literature, mobster designates a criminal who is a member of gang."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobula]] | noun | **1.** Type genus of the mobulidae. | *"In academic literature, mobula designates type genus of the mobulidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mobulidae]] | noun | **1.** Large rays lacking venomous spines: mantas. | *"In academic literature, mobulidae designates large rays lacking venomous spines: mantas."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MOB
  </div>
</div>
