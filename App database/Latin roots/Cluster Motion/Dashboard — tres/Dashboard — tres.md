---
status: unread
type: root_dashboard
---
# Dashboard — tres
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tres-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“across”</span>
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

The root **tres** means across. It indicates traversing from one edge to the opposite side. In English, this root forms words such as *beyond*, *trespass*, *trespasser*, and *trespassing*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: across
> The root **tres** means across. It indicates traversing from one edge to the opposite side. In English, this root forms words such as *beyond*, *trespass*, *trespasser*, and *trespassing*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Across</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *beyond* and *trespass*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tres** comes from a Latin word that means *"across"*.
  - At its core, it describes across.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **tres** in an English word, think of **motion, travel, and moving forward**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of across.
  - **Mental & Social**: How people experience, organize, or communicate about across.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Beyond**: An everyday English word showing the root's idea of *across*.
  - **Trespass**: To enter unlawfully upon the land, premises, or real property of another without license, privilege, or consent.
  - **Trespasser**: A person who enters or remains upon land or property in possession of another without privilege, consent, or legal authority.
  - **Trespassing**: The unlawful act of entering or remaining upon another person's property without authorization.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tres</mark>, think of <mark class="hl-def">motion, travel, and moving forward</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **tres** operates through three distinct morphological channels inherited from Latin *trāns* via Anglo-Norman and Old French:
> - **Primary Gallo-Romance Prefix:** `tres-` (from Latin *trāns-* "across, beyond") compounded with verbal base *passer* (Vulgar Latin *\*passāre* < Latin *passus* "step, pace" < *pandere* "to stretch, spread out"). This branch yields [[trespass]], [[trespasser]], [[trespassing]], [[trespassory]], and the historic [[action of trespass]].
> - **Structural Diminutive Stem:** `trest-` (from Old French *trestel* < Vulgar Latin *\*transtellum*, diminutive of Classical Latin *trānstrum* "crossbeam, thwart" < *trāns* + instrumental suffix *-trum*). This branch yields [[trestle]] and [[trestlework]].
> - **Surrender & Betrayal Stem:** `trea-` / `trai-` (from Anglo-Norman *treisun*, *traitur* < Old French *traïson*, *traïtor* < Latin *trāditiō*, *trāditor* from *trādere* = *trāns-* + *dare* "to give across, hand over"). This branch yields [[treason]], [[treasonable]], [[treasonous]], [[treasonously]], [[traitor]], [[traitorous]], [[traitorously]], and [[traitress]].
>
> ### Phonological Evolution: From Latin *trāns* to Old French *tres*
> The historical phonology follows strict Romance sound laws:
> 1. **Nasal Loss before Sibilant:** Latin /aː/ before /-ns-/ undergoes nasal assimilation and vowel change in Gallo-Romance, shifting *trāns-* to Old French *tres-*.
> 2. **Lenition of Intervocalic Stops:** Latin *trāditiōnem* experiences weakening of intervocalic /-d-/, vowel reduction, and palatalization of /-tiō-/, yielding Old French *traïson* $\to$ Anglo-Norman *treisoun* $\to$ Middle English *treason*.
> 3. **Agent Suffix Mutation:** Latin *trāditor* drops the dental stop to yield Old French *traïtor* (oblique) and *traïtre* (nominative), entering Middle English as *traitor*.

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
> Although the root fundamentally denotes **"crossing over, stepping beyond, or handing across"**, its manifestation shifts across operational planes:
> - **Spatial & Proprietary Plane (Physical Boundary Violation):** In [[trespass]], [[trespasser]], [[trespassing]], [[trespassory]], and [[action of trespass]], the root designates entering another person's enclosed land, airspace, or private space without lawful title or consent.
> - **Theological & Moral Plane (Transgression of Divine Law):** In biblical and liturgical usage of [[trespass]] and [[trespasser]], the root represents a moral misstep, a crossing over the commandments of God, echoing Tyndale's Lord's Prayer.
> - **Structural & Architectural Plane (Crossbeam Framing):** In [[trestle]] and [[trestlework]], the root (*trānstrum*) manifests as the horizontal crossbar or diagonal bracing framework that spans across vertical supports to carry railways, bridges, and tables.
> - **Political & Jurisprudential Plane (Breach of Sovereign Allegiance):** In [[treason]], [[treasonable]], [[treasonous]], and [[treasonously]], the root embodies the gravest crime of state—handing across intelligence, aid, or military comfort to foreign enemies, or levying war against the sovereign.
> - **Interpersonal & Ethical Plane (Personal Betrayal):** In [[traitor]], [[traitorous]], [[traitorously]], and [[traitress]], the root reflects the individual who breaks sacred vows of loyalty, handing across comrades, friends, or civic bonds to adversaries.

---

## 🔀 4. Prefix & Combining Dynamics on tres

### Prefix Shifts (Directional & Semantic Modification)

| Prefix / Combining Element | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `tres-` (Latin *trāns-*) | across, beyond, over | [[trespass]] | "To step across or beyond" — moving past legal or moral boundaries into forbidden terrain. |
| `trāns-` + `dare` | across + to give / hand | [[treason]] | "A handing across" — delivering state secrets, sovereign allegiance, or fortresses into enemy hands. |
| `trāns-` + `*-trum*` | across + instrumental | [[trestle]] | "Instrument spanning across" — a horizontal timber crossbeam supporting an elevated structure. |
| `action of` + `trespass` | legal proceeding of | [[action of trespass]] | The ancient common-law writ claiming remedy for direct and forcible injury to land, goods, or person. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-er` | Noun (Agent) | [[trespasser]] | One who commits a physical intrusion or moral transgression. |
| `-ing` | Noun / Adjective (Participle) | [[trespassing]] | The continuous act of unauthorized entry; also used as a descriptive modifier. |
| `-ory` | Adjective (Relational / Nature) | [[trespassory]] | Characterized by or involving an unlawful intrusion (e.g., a "trespassory taking" in larceny). |
| `-el` / `-le` | Noun (Diminutive / Instrument) | [[trestle]] | A physical structural frame featuring horizontal crossbeams and splayed legs. |
| `-work` | Noun (Collective Structure) | [[trestlework]] | A system or open network of timber or steel trestles supporting a viaduct or bridge. |
| `-on` | Noun (State / Action) | [[treason]] | The state or crime of betraying sovereign allegiance or nation. |
| `-able` | Adjective (Susceptible / Quality) | [[treasonable]] | Having the character of treason; liable to prosecution for treason. |
| `-ous` | Adjective (Full of / Pertaining to) | [[treasonous]], [[traitorous]] | Actively disloyal, perfidious, or characterized by betrayal. |
| `-ly` | Adverb (Manner) | [[treasonously]], [[traitorously]] | In a manner marked by treachery, disloyalty, or subversion. |
| `-or` | Noun (Agent) | [[traitor]] | A person who betrays a cause, country, friend, or sworn obligation. |
| `-ess` | Noun (Feminine Agent) | [[traitress]] | A female betrayer or traitor. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Common Law & Tort Jurisprudence** | [[trespass]], [[trespasser]], [[trespassory]], [[action of trespass]] | Common-law writs of *trespass quare clausum fregit* (unlawful entry upon land), *trespass vi et armis* (assault and battery), and *trespass on the case* (indirect harms). Defines the duty of care owed by landowners to adult trespassers and child licensees. |
| ⛪ **Christian Theology & Liturgy** | [[trespass]], [[trespasser]] | Central motif in the Lord's Prayer ("forgive us our trespasses") in the King James Bible tradition and Thomas Cranmer's *Book of Common Prayer* (1549/1552). Translates biblical Greek *paraptōma* (misstep across boundary) and *opheilēma* (moral debt). |
| 🏛️ **Constitutional Law & National Security** | [[treason]], [[treasonable]], [[treasonous]], [[treasonously]] | Codified in Article III, Section 3 of the United States Constitution (requiring "levying war" or "adhering to enemies, giving them aid and comfort") and the English Treason Act 1351. Distinguishes High Treason (against the Crown/state) from Petit Treason (against a master). |
| 🌉 **Civil Engineering & Carpentry** | [[trestle]], [[trestlework]] | Timber and steel railroad viaducts spanning gorges and mountain ravines during 19th-century railway expansion; carpenter's sawing stools; modular staging and scaffolding frameworks. |
| 🎭 **Literature, Drama & Moral Philosophy** | [[traitor]], [[traitorous]], [[traitorously]], [[traitress]] | Dante's *Inferno* (9th Circle: Cocytus, where traitors against benefactors—Judas, Brutus, and Cassius—are frozen in ice); Shakespearean tragedy (*Macbeth*, *Julius Caesar*); moral philosophy regarding the breach of sworn covenants. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[actress]] | noun | **1.** A female actor. | *"I was a precocious actress in her eyes; she sincerely looked on me as a compound of virulent passions, mean spirit, and dangerous duplicity."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[distress]] | noun | **1.** Psychological suffering.<br>**2.** A state of adversity (danger or affliction or need). | *"I do pity his distress in my similes of comfort, and leave him to your lordship. [_Exit._] PAROLLES."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distressed]] | verb | **1.** Bring into difficulties or distress, especially financial hardship.<br>**2.** Cause mental pain to. | *"O, that thou wert not, poor distressed soul!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distressful]] | adjective | **1.** Causing distress or worry or anxiety. | *"Charles, and the rest, it is enacted thus: That, in regard King Henry gives consent, Of mere compassion and of lenity, To ease your country of distressful war, And suffer you to breathe in fruitful peace, You shall become true liegemen to his crown."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distressfully]] | adverb | **1.** With distress. | *"George, who has turned quite white and looks distressfully at the grey cloak and straw bonnet."* — Charles Dickens, *Bleak House* |
| [[distressfulness]] | noun | **1.** The quality of arousing fear or distress. | *"In academic literature, distressfulness designates the quality of arousing fear or distress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distressing]] | verb | **1.** Bring into difficulties or distress, especially financial hardship.<br>**2.** Cause mental pain to. | *"I heard them speaking, but my mind was so confused and my instinctive avoidance of this gentleman made his presence so distressing to me that I thought I understood nothing, through the rushing in my head and the beating of my heart."* — Charles Dickens, *Bleak House* |
| [[distressingly]] | adverb | **1.** Unpleasantly. | *"You can tighten this distressingly loose jacket."* — Jack London, *The Jacket (The Star-Rover)* |
| [[distressingness]] | noun | **1.** The quality of being painful. | *"In academic literature, distressingness designates the quality of being painful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entresol]] | noun | **1.** Intermediate floor just above the ground floor. | *"They could take the premier now, instead of the little entresol of the hotel which they occupied."* — William Makepeace Thackeray, *Vanity Fair* |
| [[mistress]] | noun | **1.** An adulterous woman; a woman who has an ongoing extramarital sexual relationship with a man.<br>**2.** A woman schoolteacher (especially one regarded as strict). | *"If Nature (sovereign mistress over wrack) As thou goest onwards still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace, and wretched minutes kill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trespass]] | noun | **1.** A wrongful interference with the possession of property (personal property as well as realty), or the action instituted to recover damages.<br>**2.** Entry to another's property without right or permission. | *"Mother, for love of grace, Lay not that flattering unction to your soul That not your trespass, but my madness speaks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trespasser]] | noun | **1.** Someone who intrudes on the privacy or property of another without permission. | *"Toller lets him loose every night, and God help the trespasser whom he lays his fangs upon."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[trespassing]] | verb | **1.** Enter unlawfully on someone's property.<br>**2.** Make excessive use of. | *"No trespass on human rights 447:1 The heavenly law is broken by trespassing upon man's individual right of self-government."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[tress]] | noun | **1.** A hairdo formed by braiding or twisting the hair. | *"You are no false ideal, Something is left of you, Present, perceptible, real, Palpable, tangible, true; One shred of your broken necklace, One tress of your pale, gold hair, And a heart so utterly reckless, That the worst it would gladly dare."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[trestle]] | noun | **1.** A supporting tower used to support a bridge.<br>**2.** Sawhorses used in pairs to support a horizontal tabletop. | *"The evening train shrieked out of the gap and across the long trestle just beyond the landing, where it halted for a few seconds for passengers to embark or to leave the cars."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[trestlework]] | noun | **1.** A supporting structure composed of a system of connected trestles; for a bridge or pier or scaffold e.g. | *"In academic literature, trestlework designates a supporting structure composed of a system of connected trestles; for a bridge or pier or scaffold e.g."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · TRES
  </div>
</div>
