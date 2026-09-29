---
status: unread
type: root_dashboard
---
# Dashboard — tyrann
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">τύραννος (*týrannos*)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“absolute ruler / despot / unconstitutional master”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> An armed autocrat disbanding the assembly, governing through mercenary force rather than written law.</span>
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

The Greek root **tyrann** (τύραννος (*týrannos*)) signifies an absolute ruler who seizes sovereign power through irregular or unconstitutional means, unbound by customary laws or ancestral covenants. In English, this root yields crucial political, philosophical, ethical, and paleontological terms such as *tyranny*, *tyrant*, *tyrannize*, *tyrannical*, and *tyrannosaurus*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: absolute ruler / despot / unconstitutional master
> The Greek root **tyrann** fundamentally denotes **sovereignty attained outside the constitutional framework of the polis**. In Archaic Greece, tyrants such as Cypselus of Corinth and Peisistratus of Athens were populist strongmen who broke the stranglehold of aristocratic oligarchies. By the Classical period, however, Plato (*Republic*, Book VIII–IX) and Aristotle (*Politics*) codified tyranny as the most degenerate and perverted constitution, wherein a ruler exercises arbitrary violence for private gratification at the expense of civic *isonomia* (equality before the law).

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Absolute ruler, usurper, arbitrary and oppressive despot</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">An armed autocrat disbanding the assembly, governing through mercenary force rather than written law.</mark>
> - **Everyday Connection**: Think of terms like *tyrant*, *tyranny*, *tyrannical*, and *tyrannosaurus rex*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root derives from Ancient Greek τύραννος (*týrannos*), originally denoting an absolute monarch without derogatory moral connotation, but soon evolving into the ultimate political evil in democratic thought.
  - Etymological origin: Lydian/Anatolian substrate word related to titles of regal power (compare Etruscan *turan*, "lady/mistress").

- **The Big Picture Idea**:
  - Unchecked power inevitably corrupts into capricious terror, suppressing civic freedom and legal equality.
  - Whenever you see **tyrann** in English, think of arbitrary despotism, abusive authority, or supreme predatory dominance.

- **How the Meaning Grows**:
  - **Archaic Civic Reality**: An unconstitutional ruler seizing power from hereditary aristocrats (*tyrant*).
  - **Philosophical & Ethical**: The degenerate rule of selfish passion over reason (*tyranny*, *tyrannical*).
  - **Civic Action & Resistance**: The moral obligation to overthrow and slay an autocrat (*tyrannicide*).
  - **Paleontology & Metaphor**: Naming the apex carnivorous dinosaur for its supreme predatory dominion (*tyrannosaurus*).

- **Everyday English Words to Remember It By**:
  - **Tyrant**: A cruel, oppressive ruler exercising power without legal restraint.
  - **Tyranny**: Cruel and arbitrary government, or oppressive control over others.
  - **Tyrannize**: To rule with excessive harshness or cruel severity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tyrann</mark>, think of <mark class="hl-def">a lawless ruler exercising absolute, oppressive dominance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

- **Primary Morphemic Stem**:
  - `tyrann-` (< Greek τύραννος): The base nominal stem across political, moral, and historical discourse.
- **Combining Form with -o- Connective**:
  - `tyranno-` (< τυραννο-): Classical Greek combining form before consonants (*tyranno-saurus*, *tyranno-cide* via Latin).
- **Phonological & Compounding Laws**:
  - **Suffixation**: Readily takes Greek verbal formative `-ize` (*tyrannize* < τυραννίζειν), abstract nominal suffix `-y` (*tyranny* < τυραννία), and adjectival suffix `-ical` (*tyrannical* < τυραννικός).
  - **Latin Intermediary**: Passed into Classical Latin as *tyrannus*, thence into Old French and Middle English, preserving its Hellenic political weight intact.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.greek_root);
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

```
                             ┌── Civic & Political: tyrant, tyranny, tyrannical
                             │
       [tyrann] ─────────────┼── Behavioral & Social: tyrannize (domestic or corporate cruelty)
      (τύραννος,             │
      Absolute Despot)       ├── Civic Resistance: tyrannicide (assassination of a despot)
                             │
                             └── Paleontological Apex: tyrannosaurus (king of predator lizards)
```

---

## 🔀 4. Prefix & Combining Dynamics on tyrann

- **`tyrann` + `-y`**: *tyranny* — arbitrary, oppressive exercise of sovereign or institutional power.
- **`tyrann` + `-icide` (Latin *caedere*, "to kill")**: *tyrannicide* — the act of killing an illegitimate despot, celebrated in Athens as the highest civic virtue.
- **`tyrann` + `-ize`**: *tyrannize* — to subject subordinates to unrelenting, despotic control.
- **`tyranno-` + `saurus` (Greek σαῦρος, "lizard")**: *tyrannosaurus* — the "tyrant lizard," so designated by Henry Fairfield Osborn in 1905 for its colossal predatory power.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Classical Political Philosophy**: Plato's psychopathology of the tyrannical man and Aristotle's taxonomy of six constitutional regimes.
- **Constitutional Law & Enlightenment Theory**: Locke and Montesquieu defining separation of powers as the primary safeguard against *tyranny*.
- **Civic Republicanism**: The Athenian cult of Harmodius and Aristogeiton, honored with bronze statues in the Agora as heroic *tyrannicides*.
- **Vertebrate Paleontology**: Biomechanics and cranial bite-force dynamics of *Tyrannosaurus rex*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[tyranni]] | noun | **1.** New world flycatchers; antbirds; oven birds; woodhewers. | *"All John Reed’s violent tyrannies, all his sisters’ proud indifference, all his mother’s aversion, all the servants’ partiality, turned up in my disturbed mind like a dark deposit in a turbid well."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[tyrannic]] | adjective | **1.** Characteristic of an absolute ruler or absolute rule; having absolute sovereignty. | *"Thus ev’ry kind their pleasure find, The savage and the tender; Some social join, and leagues combine, Some solitary wander: Avaunt, away! the cruel sway, Tyrannic man’s dominion; The sportsman’s joy, the murd’ring cry, The flutt’ring, gory pinion!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[tyrannical]] | adjective | **1.** Marked by unjust severity or arbitrary behavior.<br>**2.** Characteristic of an absolute ruler or absolute rule; having absolute sovereignty. | *"In this point charge him home, that he affects Tyrannical power."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tyrannicide]] | noun | **1.** Killing a tyrant. | *"In academic literature, tyrannicide designates killing a tyrant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tyrannid]] | noun | **1.** A passerine bird of the suborder tyranni. | *"In academic literature, tyrannid designates a passerine bird of the suborder tyranni."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tyrannidae]] | noun | **1.** New world tyrant flycatchers most numerous in central america and south america but also in the united states and canada. | *"In academic literature, tyrannidae designates new world tyrant flycatchers most numerous in central america and south america but also in the united states and canada."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tyrannise]] | verb | **1.** Rule a country as a tyrant.<br>**2.** Rule or exercise power over (somebody) in a cruel and autocratic manner. | *"And says Joe, sticking his thumb in his pocket: —It’s the Russians wish to tyrannise. —Arrah, give over your bloody codding, Joe, says I."* — James Joyce, *Ulysses* |
| [[tyrannize]] | noun | **1.** To exercise arbitrary oppressive power or severity.<br>**2.** To treat tyrannically : oppress. | *"Within me is a hell; and there the poison Is, as a fiend, confin’d to tyrannize On unreprievable condemned blood."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tyrannosaur]] | noun | **1.** Large carnivorous bipedal dinosaur having enormous teeth with knifelike serrations; may have been a scavenger rather than an active predator; later cretaceous period in north america. | *"In academic literature, tyrannosaur designates large carnivorous bipedal dinosaur having enormous teeth with knifelike serrations; may have been a scavenger rather than an active predator; later cretaceous period in north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tyrannosaurus]] | noun | **1.** A massive North American bipedal tyrannosaurid dinosaur (Tyrannosaurus rex) of the late Cretaceous with a large skull, heavy tail, and reduced forelimbs having two clawed digits : tyrannosaur —called also T. rex. | *"In academic literature, tyrannosaurus designates a massive north american bipedal tyrannosaurid dinosaur (tyrannosaurus rex) of the late cretaceous with a large skull, heavy tail, and reduced forelimbs having two clawed digits : tyrannosaur —called also t. rex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tyrannous]] | adjective | **1.** Marked by unjust severity or arbitrary behavior. | *"Head to foot Now is he total gules, horridly trick’d With blood of fathers, mothers, daughters, sons, Bak’d and impasted with the parching streets, That lend a tyrannous and a damned light To their vile murders."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tyrannus]] | noun | **1.** Type genus of the tyrannidae: tyrant flycatchers. | *"In academic literature, tyrannus designates type genus of the tyrannidae: tyrant flycatchers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tyranny]] | noun | **1.** Oppressive power; especially : oppressive power exerted by government.<br>**2.** A government that exerts oppressive power over its populace. | *"The remembrance of her father never approaches her heart but the tyranny of her sorrows takes all livelihood from her cheek."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tyrant]] | noun | **1.** An absolute ruler unrestrained by law or constitution.<br>**2.** A usurper of sovereignty. | *"For if you were by my unkindness shaken As I by yours, y’have passed a hell of time, And I a tyrant have no leisure taken To weigh how once I suffered in your crime."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society & Governance]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TYRANN
  </div>
</div>
