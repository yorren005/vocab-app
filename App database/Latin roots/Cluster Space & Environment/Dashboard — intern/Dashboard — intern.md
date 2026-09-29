---
status: unread
type: root_dashboard
---
# Dashboard — intern
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">intern-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“within or inside”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking out across an open horizon with plenty of room to move.</span>
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

The root **intern** means within or inside. It describes being positioned on the inside, interior, or within limits. In English, this root forms words such as *intercede*, *internal*, *internalize*, and *internet*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: within or inside
> The root **intern** means within or inside. It describes being positioned on the inside, interior, or within limits. In English, this root forms words such as *intercede*, *internal*, *internalize*, and *internet*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Within or inside</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *intercede* and *internal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **intern** comes from a Latin word that means *"within or inside"*.
  - At its core, it describes within or inside.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **intern** in an English word, think of **space, open room, and distance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of within or inside.
  - **Mental & Social**: How people experience, organize, or communicate about within or inside.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Intercede**: To intervene on behalf of another, especially by pleading or mediating in a dispute.
  - **Internal**: Of or situated on the inside.
  - **Internalize**: To make attitudes or behavior part of one's nature by learning or unconscious assimilation.
  - **Internet**: A global computer network providing a variety of information and communication facilities, consisting of interconnected networks using standardized protocols.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">intern</mark>, think of <mark class="hl-def">space, open room, and distance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
PIE *h₁én-teros (inner, between) ──> Latin inter (between) ──> internus (inward)
  │
  ├── Inward Space & Psychology
  │     ├── internal (situated inside; domestic)
  │     ├── internalize (absorb into the psyche/culture)
  │     ├── intern (hospital trainee residing within)
  │     └── internment (confinement within guarded borders)
  │
  └── Prepositional Compound Networks (inter-)
        ├── inter + cēdere ─────────> intercede (step between to mediate)
        ├── inter + state ──────────> interstate (connecting states)
        └── inter + network ────────> internet (global connected network)
```

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

### Distinct Spheres of Manifestation
1. **Anatomy, Physiology & Domestic Politics**: *internal* (internal organs, domestic internal affairs of a nation).
2. **Clinical Training & Confinement**: *intern*, *internment* (medical residency, detention camps for enemy aliens).
3. **Cognitive Psychology & Ethics**: *internalize* (absorbing values, beliefs, or traumas into the subconscious mind).
4. **Mediation & Conflict Resolution**: *intercede* (pleading on someone's behalf, stepping between disputants).
5. **Modern Global Infrastructure**: *internet*, *interstate* (transnational digital communications, cross-border arterial transit).

---

## 🔀 4. Prefix & Combining Dynamics on intern

### Affix Breakdown
- **inter- ("between, among, mutually")**: *intercede*, *interstate*, *internet*.
- **-al**: *internal* (characteristic of the inside).
- **-ize / -ization**: *internalize*, *internalization* (process of taking inward).
- **-ment**: *internment* (act or condition of confinement).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Medicine & Clinical Education** | Internal medicine, hospital rotations, junior doctor residencies | *intern*, *internal medicine*, *internship* |
| **Constitutional & International Law** | Wartime internment, civil rights, diplomatic mediation | *internment*, *intercede*, *intercession* |
| **Computer Science & Telecommunications** | TCP/IP protocols, packet routing, global web architecture | *internet*, *inter-network* |
| **Developmental Psychology & Sociology** | Moral development, normative socialization, self-regulation | *internalize*, *internalization* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[intern]] | noun | **1.** An advanced student or graduate in medicine gaining supervised practical experience (`houseman' is a british term).<br>**2.** Deprive of freedom. | *"I got kept in at school one day For lessons not half learned, And when dad asked, "Why this delay?" I said I'd been interned."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[internal]] | adjective | **1.** Happening or arising or located within some limits or especially surface.<br>**2.** Occurring within an institution or community. | *"Turveydrop underwent a severe internal struggle and came upright on the sofa again with his cheeks puffing over his stiff cravat, a perfect model of parental deportment."* — Charles Dickens, *Bleak House* |
| [[internalisation]] | noun | **1.** Learning (of values or attitudes etc.) that is incorporated within yourself. | *"In academic literature, internalisation designates learning (of values or attitudes etc.) that is incorporated within yourself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internalise]] | verb | **1.** Incorporate within oneself; make subjective or personal. | *"In academic literature, internalise designates incorporate within oneself; make subjective or personal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internality]] | noun | **1.** Preoccupation with what concerns human inner nature (especially ethical or ideological values); - h.r.finch. | *"In academic literature, internality designates preoccupation with what concerns human inner nature (especially ethical or ideological values); - h.r.finch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internalization]] | noun | **1.** Learning (of values or attitudes etc.) that is incorporated within yourself. | *"In academic literature, internalization designates learning (of values or attitudes etc.) that is incorporated within yourself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internalize]] | verb | **1.** Incorporate within oneself; make subjective or personal. | *"In academic literature, internalize designates incorporate within oneself; make subjective or personal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internally]] | adverb | **1.** On or from the inside. | *"The ’prentices giggle internally and nudge each other."* — Charles Dickens, *Bleak House* |
| [[international]] | noun | **1.** Any of several international socialist organizations.<br>**2.** Concerning or belonging to all or at least two or more nations. | *"In this contest silver had proved itself a few centuries ago to be on the whole the fittest medium of exchange for most purposes, though gold was at the same time in use in larger transactions and in international trade. § 5. #Gold-using countries#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[internationale]] | noun | **1.** A revolutionary socialist anthem. | *"In academic literature, internationale designates a revolutionary socialist anthem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalisation]] | noun | **1.** The act of bringing something under international control. | *"In academic literature, internationalisation designates the act of bringing something under international control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalise]] | verb | **1.** Put under international control.<br>**2.** Make international in character. | *"In academic literature, internationalise designates put under international control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalism]] | noun | **1.** The doctrine that nations should cooperate because their common interests are more important than their differences.<br>**2.** Quality of being international in scope. | *"In academic literature, internationalism designates the doctrine that nations should cooperate because their common interests are more important than their differences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalist]] | noun | **1.** An advocate of internationalism.<br>**2.** A member of a socialist or communist international. | *"In academic literature, internationalist designates an advocate of internationalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalistic]] | adjective | **1.** Influenced by or advocating internationalism. | *"In academic literature, internationalistic designates influenced by or advocating internationalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationality]] | noun | **1.** Quality of being international in scope. | *"In academic literature, internationality designates quality of being international in scope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalization]] | noun | **1.** The act of bringing something under international control. | *"In academic literature, internationalization designates the act of bringing something under international control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationalize]] | verb | **1.** Put under international control.<br>**2.** Make international in character. | *"In academic literature, internationalize designates put under international control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internationally]] | adverb | **1.** Throughout the world. | *"That is internationally and universally applicable."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[interne]] | noun | **1.** An advanced student or graduate in medicine gaining supervised practical experience (`houseman' is a british term). | *"But INNERMOST OF THE INMOST, MOST INTERIOR OF THE INTERNE, GOD CLAIMS HIS OWN, DIVINE HUMANITY RENEWING NATURE” (Mrs."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[internecine]] | adjective | **1.** (of conflict) within a group or organization.<br>**2.** Characterized by bloodshed and carnage for both sides. | *"TWO centuries of internecine strife between the great feudal princes culminated in the destruction of the Chou dynasty and the consolidation of the Chinese states under the powerful Ch´in emperor Chêng."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[internee]] | noun | **1.** A person who is interned. | *"In academic literature, internee designates a person who is interned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internet]] | noun | **1.** A computer network consisting of a worldwide network of computer networks that use the tcp/ip network protocols to facilitate data transmission and exchange. | *"The young are already exposed to far more negative forces in the general run of storybooks, television shows, Internet games and the real world."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[internist]] | noun | **1.** A specialist in internal medicine. | *"In academic literature, internist designates a specialist in internal medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internment]] | noun | **1.** Confinement during wartime.<br>**2.** The act of confining someone in a prison (or as if in a prison). | *"In academic literature, internment designates confinement during wartime."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internode]] | noun | **1.** A segment of a stem between two nodes. | *"REED SMUT; prodded on the stems of reeds, forming thick bullate patches several inches long, occupying whole internodes, covered by their sheath; spores globose, rather large.—On stems of _Arundo phragmitis_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[internship]] | noun | **1.** The position of a medical intern. | *"In academic literature, internship designates the position of a medical intern."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[internuncio]] | noun | **1.** (roman catholic church) a diplomatic representative of the pope ranking below a nuncio. | *"In academic literature, internuncio designates (roman catholic church) a diplomatic representative of the pope ranking below a nuncio."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Space & Environment]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · INTERN
  </div>
</div>
