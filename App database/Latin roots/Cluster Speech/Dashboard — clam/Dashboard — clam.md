---
status: unread
type: root_dashboard
---
# Dashboard — clam
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">clam-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to cry out or shout”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Speaking words clearly so that an audience understands every sentence.</span>
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

The root **clam** means to cry out or shout. It indicates moving outward from an interior or emerging into view. In English, this root forms words such as *clamor*, *claim*, *exclaim*, and *proclaim*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to cry out or shout
> The root **clam** means to cry out or shout. It indicates moving outward from an interior or emerging into view. In English, this root forms words such as *clamor*, *claim*, *exclaim*, and *proclaim*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To cry out or shout</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Speaking words clearly so that an audience understands every sentence.</mark>
> - **Everyday Connection**: Think of familiar words like *clamor* and *claim*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **clam** comes from a Latin word that means *"to cry out or shout"*.
  - At its core, it describes the action of cry out or shout.

- **The Big Picture Idea**:
  - Picture speaking words clearly so that an audience understands every sentence.
  - Whenever you see **clam** in an English word, think of **to cry out or shout**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to cry out or shout).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Clamor**: A loud and confused noise, especially that of people shouting vehemently.
  - **Claim**: An everyday English word showing the root's idea of *to cry out or shout*.
  - **Exclaim**: An everyday English word showing the root's idea of *to cry out or shout*.
  - **Proclaim**: To announce officially or publicly in an explicit or authoritative manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">clam</mark>, think of <mark class="hl-def">to cry out or shout</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin clāmor (outcry) & clāmāre (to shout)
  │
  ├── Pure Acoustic Uproar
  │     ├── clamor (noisy outcry; loud demand)
  │     └── clamorous (making a loud, confused noise)
  │
  ├── Public Praise & Shouting
  │     ├── acclaim (praise enthusiastically)
  │     └── acclamation (loud shout of collective approval)
  │
  ├── Official Public Announcements
  │     ├── proclaim (announce officially/publicly)
  │     └── proclamation (public official decree)
  │
  └── Specialized Classical Nouns
        ├── exclamation (sudden cry; punctuation mark !)
        ├── declamation (rhetorical dramatic speech)
        └── reclamation (act of returning to cultivation/utility)
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
1. **Public Praise & Elections**: *acclaim*, *acclamation* (standing ovations, election by unanimous acclaim).
2. **State Decrees & Law**: *proclaim*, *proclamation* (Emancipation Proclamation, royal decrees).
3. **Noisy Uproar & Protest**: *clamor*, *clamorous* (crowd noise, persistent public outcry for reform).
4. **Rhetoric & Punctuation**: *declamation*, *exclamation* (theatrical delivery, exclamation points).
5. **Land Engineering**: *reclamation* (converting swamps or deserts into fertile farmland).

---

## 🔀 4. Prefix & Combining Dynamics on clam

### Prefix Formations
- **ad- ("to, toward") + clam-**: *acclaim*, *acclamation* (shouting approval toward someone).
- **pro- ("forth, before all") + clam-**: *proclaim*, *proclamation* (shouting forth before the public).
- **ex- ("out") + clam-**: *exclamation* (crying out).
- **de- ("thoroughly") + clam-**: *declamation* (systematic formal oration).
- **re- ("back, again") + clam-**: *reclamation* (calling back into use).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Constitutional History & Statecraft** | Presidential proclamations, royal charters, electoral acclamation | *proclaim*, *proclamation*, *acclamation* |
| **Journalism & Political Advocacy** | Public outcry, editorial campaigns, civil rights movements | *clamor*, *clamorous* |
| **Grammar & Typography** | Exclamation mark, exclamatory syntax | *exclamation*, *exclamation point* |
| **Environmental Engineering** | Wetland reclamation, Bureau of Reclamation dam projects | *reclamation*, *land reclamation* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acclamation]] | noun | **1.** Enthusiastic approval. | *"To this chair the Synod summoned him by acclamation, and, having accepted its call, he began his new work in the following August."* — John Cairns, *Principal Cairns* |
| [[clam]] | noun | **1.** Burrowing marine mollusk living on sand or mud; the shell closes with viselike firmness.<br>**2.** A piece of paper money worth one dollar. | *"In all the clam’rous cry of starving want, They dun Benevolence with shameless front; Oblige them, patronise their tinsel lays— They persecute you all your future days!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[clamant]] | adjective | **1.** Conspicuously and offensively loud; given to vehement outcry.<br>**2.** Demanding attention; ; ; - h.l.mencken. | *"The doom of the Regent and Council shows singularly the total interruption of justice at this calamitous period, even in the most clamant cases of oppression."* — Walter Scott, *Ivanhoe: A Romance* |
| [[clamatores]] | noun | **1.** Used in some classification systems; a suborder or superfamily nearly coextensive with suborder tyranni; passeriformes having relatively simple vocal organs and little power of song; clamatorial birds. | *"In academic literature, clamatores designates used in some classification systems; a suborder or superfamily nearly coextensive with suborder tyranni; passeriformes having relatively simple vocal organs and little power of song; clamatorial birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clamatorial]] | adjective | **1.** Of or relating to clamatores. | *"In academic literature, clamatorial designates of or relating to clamatores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clammily]] | adverb | **1.** In a clammy manner. | *"In academic literature, clammily designates in a clammy manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clamminess]] | noun | **1.** Unpleasant wetness. | *"In academic literature, clamminess designates unpleasant wetness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clammy]] | adjective | **1.** Unpleasantly cool and humid. | *"During the progress of this dialogue there was a nervous twitching of Boldwood’s tightly closed lips, and his face became bathed in a clammy dew."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[clammyweed]] | noun | **1.** Strong-scented herb common in southern united states covered with intermixed gland and hairs. | *"In academic literature, clammyweed designates strong-scented herb common in southern united states covered with intermixed gland and hairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clamor]] | noun | **1.** A loud harsh or strident noise.<br>**2.** Loud and persistent outcry from many people. | *"Just after dark that day, when one watch had retired below, a clamor was heard in the forecastle; and the two trembling traitors running up, besieged the cabin door, saying they durst not consort with the crew."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[clamoring]] | noun | **1.** Loud and persistent outcry from many people.<br>**2.** Make loud demands. | *"It must have been like this in ancient Paris when Villon thieved and sang, and the wolves came clamoring at the gates ... and the crusaders in warm Palestine...."* — Donn Byrne, *The Wind Bloweth* |
| [[clamorous]] | adjective | **1.** Conspicuously and offensively loud; given to vehement outcry. | *"I will be more jealous of thee than a Barbary cock-pigeon over his hen, more clamorous than a parrot against rain, more new-fangled than an ape, more giddy in my desires than a monkey."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[clamorously]] | adverb | **1.** In manner that attracts attention. | *"A baneful promiscuous intercourse of the sexes is hereby avoided, and virtue, without being clamorously invoked, is, as it were, unconsciously practised."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[clamour]] | noun | **1.** Loud and persistent outcry from many people.<br>**2.** Utter or proclaim insistently and noisily. | *"And from this time, For what he did before Corioles, call him, With all th’ applause and clamour of the host, Caius Martius Coriolanus!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[clamouring]] | noun | **1.** Loud and persistent outcry from many people.<br>**2.** Utter or proclaim insistently and noisily. | *"The cry for blood rang through the court, and all were clamouring for crucifixion."* — Jack London, *The Jacket (The Star-Rover)* |
| [[clams]] | noun | **1.** Informal terms for money.<br>**2.** Burrowing marine mollusk living on sand or mud; the shell closes with viselike firmness. | *"They are only beginning to be developed artificially by the propagation of oysters, clams, and fish."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[clamshell]] | noun | **1.** The shell of a clam.<br>**2.** A dredging bucket with hinges like the shell of a clam. | *"The number 4 clamshell panels drew back and slipped aside."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[declamation]] | noun | **1.** Vehement oratory.<br>**2.** Recitation of a speech from memory with studied gestures and intonation as an exercise in elocution or rhetoric. | *"Boldwood has shot my husband.” Her statement of the fact in such quiet and simple words came with more force than a tragic declamation, and had somewhat the effect of setting the distorted images in each mind present into proper focus."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[declamatory]] | adjective | **1.** Ostentatiously lofty in style. | *"This fixed idea of the rhapsodist was delivered with animated enthusiasm, in a manner entirely declamatory, for he had plainly no skill as a dialectician."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[exclamation]] | noun | **1.** An abrupt excited utterance.<br>**2.** A loud complaint or protest or reproach. | *"Fie! what man of good temper would endure this tempest of exclamation?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exclamatory]] | adjective | **1.** Sudden and strong. | *"Conversation was exclamatory for a little while with gaps of wonderment; and then the Editor got fervent in his curiosity."* — H. G. Wells, *The Time Machine* |
| [[proclamation]] | noun | **1.** A formal public statement.<br>**2.** The formal act of proclaiming; giving public notice. | *"Now to all sense ’tis gross You love my son; invention is asham’d, Against the proclamation of thy passion To say thou dost not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reclamation]] | noun | **1.** The conversion of wasteland into land suitable for use of habitation or cultivation.<br>**2.** Rescuing from error and returning to a rightful course. | *"The reclamation of dunams of waste arenary soil, proposed in the prospectus of Agendath Netaim, Bleibtreustrasse, Berlin, W. 15, by the cultivation of orange plantations and melonfields and reafforestation."* — James Joyce, *Ulysses* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CLAM
  </div>
</div>
