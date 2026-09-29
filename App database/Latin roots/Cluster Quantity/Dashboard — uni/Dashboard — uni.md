---
status: unread
type: root_dashboard
---
# Dashboard — uni
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">uni-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“one”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking at a large overflowing basket filled to the brim with goods.</span>
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

The root **uni** means one. It describes a single unit, one individual, or items joined into unity. In English, this root forms words such as *unique*, *unit*, *unitary*, and *unite*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: one
> The root **uni** means one. It describes a single unit, one individual, or items joined into unity. In English, this root forms words such as *unique*, *unit*, *unitary*, and *unite*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">One</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *unique* and *unit*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **uni** comes from a Latin word that means *"one"*.
  - At its core, it describes one.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **uni** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of one.
  - **Mental & Social**: How people experience, organize, or communicate about one.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Unique**: Being the only one of its kind.
  - **Unit**: An individual thing or person regarded as single and complete.
  - **Unitary**: Forming a single or undivided entity.
  - **Unite**: To come or bring together for a common purpose or action.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">uni</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Cardinal Stem:** *ūn-* (nominative *ūnus*, genitive *ūnīus*, dative *ūnī*) $	o$ *unit, unitary, unity, unique*.

- **Verbal Stem:** *ūnī-* (*ūniō, ūnīre, ūnītum*) $	o$ *unite, united, disunity, reunite, reunion*.

- **Factitive Form:** *ūnificāre* (*ūnus* + *facere*) $	o$ *unify, unification, unifier*.

- **Cosmic Compound:** *ūni-* + *vertere, versus* $	o$ *universe, universal, universality, university*.

- **Compounding Matrix:**

  - *ūni-* + *animus* ("mind, spirit") $	o$ *unanimous, unanimity*.

  - *ūni-* + *cornū* ("horn") $	o$ *unicorn*.

  - *ūni-* + *forma* ("shape, form") $	o$ *uniform, uniformity*.

  - *ūni-* + *sonus* ("sound") $	o$ *unison*.

  - *ūni-* + *latus* ("side") $	o$ *unilateral*.

  - *ūni-* + *cyclus* ("wheel") $	o$ *unicycle*.



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



### 1. Mathematical Units & Measurement

- *unit* (an individual thing or person regarded as single and complete; a standard measure).

- *unitary* (forming a single or undivided entity).

- *unique* (being the only one of its kind; unlike anything else).



### 2. Social, Political & Labor Solidarity

- *union* (the action of joining together; a trade union; a political federation).

- *unite* (to come or bring together for a common purpose or action).

- *unity* (the state of being united or joined as a whole).

- *reunion* (a gathering of people who have been apart).

- *unanimity* (agreement by all people involved; complete consensus).

- *unanimous* (fully in agreement).



### 3. Cosmic Reality & Higher Education

- *universe* (all existing matter and space considered as a whole; the cosmos).

- *universal* (done by or affecting everyone or everything).

- *universality* (the quality of being universal or existing everywhere).

- *university* (a high-level educational institution comprising academic faculties).



### 4. Geometry, Mechanics & Design

- *uniform* (remaining the same in all cases and at all times; identical distinctive clothing).

- *uniformity* (the quality or state of being uniform).

- *unilateral* (performed by or affecting only one person, group, or country).

- *unidirectional* (moving or operating in a single direction only).

- *unison* (simultaneous performance of action or speech; singing at the same pitch).



---



## 🔀 4. Prefix & Combining Dynamics on uni



| Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|

| *ūnus* + *-itās* | **unity** | The state of unbroken oneness | *"The national leader appealed for political unity amid the economic crisis."* |

| *ūni-* + *facere* | **unify** | Making multiple parts into one | *"Bismarck employed strategic diplomacy to unify the German states in 1871."* |

| *ūni-* + *animus* + *-ous* | **unanimous** | Possessing a single unified mind | *"The Supreme Court delivered a unanimous decision upholding civil liberties."* |

| *ūni-* + *forma* | **uniform** | Having a single identical shape | *"Cadets stood at rigid attention in immaculate ceremonial uniform."* |

| *ūni-* + *latus* + *-al* | **unilateral** | Acting through a single side only | *"The superpower faced international rebuke for taking unilateral military action."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Political Science & Constitutional Law:** *European Union*, *unilateral vs multilateral foreign policy*, *unanimity rule in voting*.

- 🔬 **Cosmology & Astrophysics:** *expanding universe*, *universal gravitational constant* ($G$).

- 💻 **Computer Science & Mathematics:** *Unicode* (universal character encoding), *unit test* (testing isolated single components), *unitary matrix*.

- 🎓 **Higher Education & Academia:** *university governance*, *universal curriculum*.

- 🎵 **Music & Acoustics:** *singing in unison* (identical pitch across all vocal parts).



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[disunify]] | verb | **1.** Break up or separate. | *"In academic literature, disunify designates break up or separate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disunion]] | noun | **1.** The termination or destruction of union. | *"HAMILTON To the People of the State of New York: The three last numbers of this paper have been dedicated to an enumeration of the dangers to which we should be exposed, in a state of disunion, from the arms and arts of foreign nations."* — Alexander Hamilton, *The Federalist Papers* |
| [[disunite]] | verb | **1.** Part; cease or break association with.<br>**2.** Force, take, or pull apart. | *"But it was a strong composure a fool could disunite!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disunited]] | verb | **1.** Part; cease or break association with.<br>**2.** Force, take, or pull apart. | *"By a Monarch’s heaven-struck fate, By a disunited State, By a generous Prince’s wrongs."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[disunity]] | noun | **1.** Lack of unity (usually resulting from dissension). | *"In academic literature, disunity designates lack of unity (usually resulting from dissension)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonuniform]] | adjective | **1.** Not homogeneous. | *"In academic literature, nonuniform designates not homogeneous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonuniformity]] | noun | **1.** The quality of being diverse and interesting. | *"In academic literature, nonuniformity designates the quality of being diverse and interesting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonunion]] | adjective | **1.** Not belonging to or not allowing affiliation with a trade union. | *"In academic literature, nonunion designates not belonging to or not allowing affiliation with a trade union."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonunionised]] | adjective | **1.** Not affiliated in a trade union. | *"In academic literature, nonunionised designates not affiliated in a trade union."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonunionized]] | adjective | **1.** Not affiliated in a trade union. | *"In academic literature, nonunionized designates not affiliated in a trade union."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reunification]] | noun | **1.** The act of coming together again. | *"In academic literature, reunification designates the act of coming together again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reunify]] | verb | **1.** Unify again, as of a country. | *"In academic literature, reunify designates unify again, as of a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reunion]] | noun | **1.** A party of former associates who have come together again.<br>**2.** The act of coming together again. | *"The theory of Sacrifice implies the need of reunion with God."* — T. R. Glover, *The Jesus of History* |
| [[reunite]] | verb | **1.** Have a reunion; unite again.<br>**2.** Unify again, as of a country. | *"They were under a yoke,—I could free them: they were scattered,—I could reunite them: the independence, the affluence which was mine, might be theirs too."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[subunit]] | noun | **1.** A monetary unit that is valued at a fraction (usually one hundredth) of the basic monetary unit. | *"In academic literature, subunit designates a monetary unit that is valued at a fraction (usually one hundredth) of the basic monetary unit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uniat]] | noun | **1.** A member of the uniat church. | *"In academic literature, uniat designates a member of the uniat church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uniate]] | noun | **1.** A member of the uniat church.<br>**2.** Of or relating to former eastern christian or orthodox churches that have been received under the jurisdiction of the church of rome but retain their own rituals and practices and canon law. | *"In academic literature, uniate designates a member of the uniat church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unicameral]] | adjective | **1.** Composed of one legislative body. | *"In academic literature, unicameral designates composed of one legislative body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unicef]] | noun | **1.** An agency of the united nations responsible for programs to aid education and the health of children and mothers in developing countries. | *"In academic literature, unicef designates an agency of the united nations responsible for programs to aid education and the health of children and mothers in developing countries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unicellular]] | adjective | **1.** Having or consisting of a single cell. | *"In academic literature, unicellular designates having or consisting of a single cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unicorn]] | noun | **1.** An imaginary creature represented as a white horse with a long horn growing from its forehead. | *"Here’s a unicorn’s head—there’s nothing in that."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unicuspid]] | adjective | **1.** Having a single cusp or point. | *"In academic literature, unicuspid designates having a single cusp or point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unicycle]] | noun | **1.** A vehicle with a single wheel that is driven by pedals.<br>**2.** Ride a unicycle. | *"In academic literature, unicycle designates a vehicle with a single wheel that is driven by pedals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unicyclist]] | noun | **1.** A person who rides a unicycle. | *"In academic literature, unicyclist designates a person who rides a unicycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unification]] | noun | **1.** An occurrence that involves the production of a union.<br>**2.** The state of being joined or united or linked. | *"There should be a unification of various kinds of insurance in one general plan and under one general administration for the whole state."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[uniform]] | noun | **1.** Clothing of distinctive design worn by members of a particular group as a means of identification.<br>**2.** Provide with uniforms. | *"He was only half dressed—in plain clothes, I observed, not in uniform—and his hair was unbrushed, and he looked as wild as his room."* — Charles Dickens, *Bleak House* |
| [[uniformed]] | verb | **1.** Provide with uniforms.<br>**2.** Dressed in a uniform. | *"Another effect of public instability is the unreasonable advantage it gives to the sagacious, the enterprising, and the moneyed few over the industrious and uniformed mass of the people."* — Alexander Hamilton, *The Federalist Papers* |
| [[uniformise]] | verb | **1.** Make uniform. | *"In academic literature, uniformise designates make uniform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uniformity]] | noun | **1.** A condition in which everything is regular and unvarying.<br>**2.** The quality of lacking diversity or variation (even to the point of boredom). | *"On the speckled side of his face he has no eyebrow, and on the other side he has a bushy black one, which want of uniformity gives him a very singular and rather sinister appearance."* — Charles Dickens, *Bleak House* |
| [[uniformize]] | verb | **1.** Make uniform. | *"In academic literature, uniformize designates make uniform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uniformly]] | adverb | **1.** In a uniform manner. | *"Seen by the dim light of the dips, their number to me appeared countless, though not in reality exceeding eighty; they were uniformly dressed in brown stuff frocks of quaint fashion, and long holland pinafores."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[uniformness]] | noun | **1.** The quality of lacking diversity or variation (even to the point of boredom). | *"In academic literature, uniformness designates the quality of lacking diversity or variation (even to the point of boredom)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unify]] | verb | **1.** Become one.<br>**2.** To bring or combine together or with something else. | *"The hope has long been entertained by economists that a conception of the whole problem of value would be attained that would coördinate and unify the various "laws,"--those of rent, wages, interest, etc."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[unifying]] | verb | **1.** Become one.<br>**2.** To bring or combine together or with something else. | *"The word "trust" originally applied, and still in legal usage applies, to a particular form of organization, that of a board of trustees holding the stock, and thus unifying the control, of two or more formerly separate enterprises."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unilateral]] | adjective | **1.** Involving only one part or side.<br>**2.** Tracing descent from either the paternal or the maternal line only. | *"In academic literature, unilateral designates involving only one part or side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unilateralism]] | noun | **1.** The doctrine that nations should conduct their foreign affairs individualistically without the advice or involvement of other nations. | *"In academic literature, unilateralism designates the doctrine that nations should conduct their foreign affairs individualistically without the advice or involvement of other nations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unilateralist]] | noun | **1.** An advocate of unilateralism. | *"In academic literature, unilateralist designates an advocate of unilateralism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unilaterally]] | adverb | **1.** In a unilateral manner; by means of one part or party. | *"In academic literature, unilaterally designates in a unilateral manner; by means of one part or party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unilluminated]] | adjective | **1.** Without illumination. | *"Upon opening my eyes then, and coming out of my own pleasant and self-created darkness into the imposed and coarse outer gloom of the unilluminated twelve-o’clock-at-night, I experienced a disagreeable revulsion."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[unilluminating]] | adjective | **1.** Failing to inform or clarify. | *"In academic literature, unilluminating designates failing to inform or clarify."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimaginable]] | adjective | **1.** Totally unlikely. | *"Ha, ha, ha!” To hear him say all this with unimaginable energy, one might have thought him the angriest of mankind."* — Charles Dickens, *Bleak House* |
| [[unimaginably]] | adverb | **1.** To an unimaginable extent. | *"FOURFOLD OBJECTIVE TO PRESENT REQUIREMENTS Not ours, however, to unriddle the workings of a distant future, or to dwell upon the promised glories of a God-impelled and unimaginably potent Revelation."* — Effendi Shoghi, *Citadel of Faith* |
| [[unimaginative]] | adjective | **1.** Deficient in originality or creativity; lacking powers of invention.<br>**2.** Dealing only with concrete facts. | *"Before we had made an end of this talk my father and the other squires came in, and we ceased our ghost stories, ashamed to speak of such matters before these new-comers—hard-headed, unimaginative men, who had no sympathy with idle legends."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[unimaginatively]] | adverb | **1.** In a matter-of-fact manner.<br>**2.** Without imagination. | *"In academic literature, unimaginatively designates in a matter-of-fact manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimagined]] | adjective | **1.** Not imagined even in a dream. | *"The frightful deeds that were to be soon done, were probably unimagined at that time in the brains of the doers."* — Charles Dickens, *A Tale of Two Cities* |
| [[unimodal]] | adjective | **1.** Having a single mode. | *"In academic literature, unimodal designates having a single mode."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimpaired]] | adjective | **1.** Not damaged or diminished in any respect. | *"He is in a helpless condition as to his lower, and nearly so as to his upper, limbs, but his mind is unimpaired."* — Charles Dickens, *Bleak House* |
| [[unimpassioned]] | adjective | **1.** Free from emotional appeal; marked by reasonableness. | *"What had been the engrossing world had dissolved into an uninteresting outer dumb-show; while here, in this apparently dim and unimpassioned place, novelty had volcanically started up, as it had never, for him, started up elsewhere."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unimpeachable]] | adjective | **1.** Beyond doubt or reproach.<br>**2.** Free of guilt; not subject to blame. | *"A low carriage, bowling along still more rapidly behind a horse of unimpeachable breed, overtook and passed them."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unimpeachably]] | adverb | **1.** Without question. | *"Marriage, like religion and erudition, nay, like authorship itself, was fated to become an outward requirement, and Edward Casaubon was bent on fulfilling unimpeachably all requirements."* — George Eliot, *Middlemarch* |
| [[unimpeded]] | adjective | **1.** Not slowed or prevented. | *"It must be owned that neither Laura nor Lawrence obeyed her, and they were rewarded, while she felt about for the top rung, with an unimpeded view of two very pretty legs."* — Anthony Pryde, *Nightfall* |
| [[unimportance]] | noun | **1.** The state of being humble and unimportant.<br>**2.** The quality of not being important or worthy of note. | *"Looking into Napoleon’s eyes Prince Andrew thought of the insignificance of greatness, the unimportance of life which no one could understand, and the still greater unimportance of death, the meaning of which no one alive could understand or explain."* — graf Leo Tolstoy, *War and Peace* |
| [[unimportant]] | adjective | **1.** Not important.<br>**2.** Devoid of importance, meaning, or force. | *"If you remember anything so unimportant—which is not to be expected—you would recollect that my first thought in the affair was directly opposed to her remaining here.” Dismiss the Dedlock patronage from consideration?"* — Charles Dickens, *Bleak House* |
| [[unimposing]] | adjective | **1.** Lacking in impressiveness. | *"The scene is unimposing; there is nought Of grandeur or magnificence displayed; But by its quiet prettiness is brought A sense of calm enjoyment--hill and glade And peaceful meadow, all alike suggest Sweet thoughts of still serenity and rest."* — Wilfred S. Skeats, *The song of the exile* |
| [[unimpregnated]] | adjective | **1.** Not having been fertilized. | *"In academic literature, unimpregnated designates not having been fertilized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimpressed]] | adjective | **1.** Not moved to serious regard. | *"But as ever before, the pagan harpooneers remained almost wholly unimpressed; or if impressed, it was only with a certain magnetism shot into their congenial hearts from inflexible Ahab’s."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[unimpressionable]] | adjective | **1.** Not sensitive or susceptible to impression. | *"But unimpressionable natures are not so soon softened, nor are natural antipathies so readily eradicated."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unimpressive]] | adjective | **1.** Not capable of impressing. | *"In academic literature, unimpressive designates not capable of impressing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimpressively]] | adverb | **1.** In an unimpressive manner. | *"In academic literature, unimpressively designates in an unimpressive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimprisoned]] | adjective | **1.** Free from confinement or physical restraint. | *"In academic literature, unimprisoned designates free from confinement or physical restraint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimproved]] | adjective | **1.** Not made more desirable or valuable or profitable; especially not made ready for use or marketing.<br>**2.** (of land) not cleared of trees and brush; in the wild or natural state. | *"Of the total in farms a little more than one-half was improved, 478,000,000 acres altogether, a per capita average of 5.2 acres; and a little less than one-half was unimproved, 400,000,000 acres altogether, a per capita average of 4.3 acres."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unincorporated]] | adjective | **1.** Not organized and maintained as a legal corporation. | *"In academic literature, unincorporated designates not organized and maintained as a legal corporation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unindustrialised]] | adjective | **1.** Not converted to industrialism. | *"In academic literature, unindustrialised designates not converted to industrialism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unindustrialized]] | adjective | **1.** Not converted to industrialism. | *"In academic literature, unindustrialized designates not converted to industrialism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninebriated]] | adjective | **1.** Not inebriated. | *"In academic literature, uninebriated designates not inebriated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninfected]] | adjective | **1.** Free from sepsis or infection. | *"He found her uninfected by the rage for diversion and dissipation; for noise, tumult, gewgaws, glitter, and extravagance."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[uninflected]] | adjective | **1.** (of the voice) not inflected.<br>**2.** Not inflected. | *"He often exercises a liberty in the collocation of his words which is beyond what an uninflected language like the English admits of, without more or less obscurity."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[uninfluenced]] | adjective | **1.** Not influenced or affected; - v.l.parrington. | *"What other body would be likely to feel CONFIDENCE ENOUGH IN ITS OWN SITUATION, to preserve, unawed and uninfluenced, the necessary impartiality between an INDIVIDUAL accused, and the REPRESENTATIVES OF THE PEOPLE, HIS ACCUSERS?"* — Alexander Hamilton, *The Federalist Papers* |
| [[uninfluential]] | adjective | **1.** Not influential. | *"I did not want to quarrel with anyone, influential or uninfluential."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[uninformative]] | adjective | **1.** Lacking information. | *"In academic literature, uninformative designates lacking information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninformatively]] | adverb | **1.** In an uninformative manner. | *"In academic literature, uninformatively designates in an uninformative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninformed]] | adjective | **1.** Not informed; lacking in knowledge or information. | *"You cannot suppose me uninformed."* — Jane Austen, *Mansfield Park* |
| [[uninhabitable]] | adjective | **1.** Not fit for habitation. | *"Uninhabitable, and almost inaccessible,— SEBASTIAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uninhabited]] | adjective | **1.** Not having inhabitants; not lived in. | *"His course brought him in sight of the Island of Ascension, at that time uninhabited, and _never visited by any ship_, except for the purpose of collecting turtles, which abound on the coast."* — Classic Author, *The wonders of prayer* |
| [[uninhibited]] | adjective | **1.** Not inhibited or restrained. | *"In academic literature, uninhibited designates not inhibited or restrained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninitiate]] | noun | **1.** People who have not been introduced to the mysteries of some field or activity.<br>**2.** Not initiated; deficient in relevant experience. | *"It came from the direction of a small dark object under the plantation hedge—a shepherd’s hut—now presenting an outline to which an uninitiated person might have been puzzled to attach either meaning or use."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[uninitiated]] | adjective | **1.** Not initiated; deficient in relevant experience. | *"It came from the direction of a small dark object under the plantation hedge—a shepherd’s hut—now presenting an outline to which an uninitiated person might have been puzzled to attach either meaning or use."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[uninjectable]] | adjective | **1.** (used of drugs) not capable of being injected. | *"In academic literature, uninjectable designates (used of drugs) not capable of being injected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninjured]] | adjective | **1.** Not injured physically or mentally. | *"Weevle and Guppy good morning, assures them of the satisfaction with which he sees them uninjured, and accompanies Mrs."* — Charles Dickens, *Bleak House* |
| [[uninominal]] | adjective | **1.** Based on the system of having only one member from each district (as of a legislature). | *"In academic literature, uninominal designates based on the system of having only one member from each district (as of a legislature)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninquiring]] | adjective | **1.** Not inquiring.<br>**2.** Deficient in curiosity. | *"In academic literature, uninquiring designates not inquiring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninquisitive]] | adjective | **1.** Not inquiring.<br>**2.** Deficient in curiosity. | *"Sedley was of so easy and uninquisitive a nature that she wasn't even jealous."* — William Makepeace Thackeray, *Vanity Fair* |
| [[uninspired]] | adjective | **1.** Having no intellectual or emotional or spiritual excitement.<br>**2.** Deficient in originality or creativity; lacking powers of invention. | *"It was her custom to read the Bible from duty, and then turn to these uninspired volumes for the kindling of a higher devotion."* — Classic Author, *The wonders of prayer* |
| [[uninspiring]] | adjective | **1.** Depressing to the spirit. | *"I love the making of interiors, and if Pastimes must be fitted beautifully to do justice to itself, still more would it be needful to turn the uninspiring "flat" into a haven of comfort and cheer."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[uninstructed]] | adjective | **1.** Lacking information or instruction. | *"When an uninstructed multitude attempts to see with its eyes, it is exceedingly apt to be deceived."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[uninstructive]] | adjective | **1.** Failing to instruct. | *"In academic literature, uninstructive designates failing to instruct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninstructively]] | adverb | **1.** In an uninformative manner. | *"In academic literature, uninstructively designates in an uninformative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninsurability]] | noun | **1.** The quality of being uninsurable; the conditions under which an insurance company will refuse to issue insurance to an applicant (based on standards set by the insurance company). | *"In academic literature, uninsurability designates the quality of being uninsurable; the conditions under which an insurance company will refuse to issue insurance to an applicant (based on standards set by the insurance company)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninsurable]] | adjective | **1.** Not capable of being insured or not eligible to be insured. | *"In academic literature, uninsurable designates not capable of being insured or not eligible to be insured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninsured]] | adjective | **1.** Not covered by insurance. | *"In academic literature, uninsured designates not covered by insurance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintegrated]] | adjective | **1.** Not integrated; not taken into or made a part of a whole.<br>**2.** Separated or isolated from others or a main group. | *"In academic literature, unintegrated designates not integrated; not taken into or made a part of a whole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintelligent]] | adjective | **1.** Lacking intelligence. | *"We will give you sleepy drinks, that your senses, unintelligent of our insufficience, may, though they cannot praise us, as little accuse us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unintelligently]] | adverb | **1.** In an unintelligent manner. | *"In academic literature, unintelligently designates in an unintelligent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintelligibility]] | noun | **1.** Nonsense that is simply incoherent and unintelligible.<br>**2.** Incomprehensibility as a consequence of being unintelligible. | *"I'd--" His voice husked into unintelligibility, and he had to begin again."* — Algis Budrys, *Citadel* |
| [[unintelligible]] | adjective | **1.** Poorly articulated or enunciated, or drowned by noise.<br>**2.** Not clearly understood or expressed. | *"Trius doesn't do." "Come now, Mäzli," said Leonore, for she had the feeling that this peculiar revelation might be followed by others as unintelligible."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[unintelligibly]] | adverb | **1.** In an unintelligible manner. | *"He had known many disagreeable fathers before, and often been struck with the inconveniences they occasioned, but never, in the whole course of his life, had he seen one of that class so unintelligibly moral, so infamously tyrannical as Sir Thomas."* — Jane Austen, *Mansfield Park* |
| [[unintended]] | adjective | **1.** Not deliberate. | *"A result usually unintended is the derangement of business and of the existing distribution of incomes."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unintentional]] | adjective | **1.** Without deliberate intent; - george macdonald.<br>**2.** Not done with purpose or intent. | *"I am excessively concerned that he should have any regard for me—but indeed it has been quite unintentional on my side; I never had the smallest idea of it."* — Jane Austen, *Northanger Abbey* |
| [[unintentionally]] | adverb | **1.** Without intention; in an unintentional manner. | *"Thus much indeed he was obliged to acknowledge: that he had been constant unconsciously, nay unintentionally; that he had meant to forget her, and believed it to be done."* — Jane Austen, *Persuasion* |
| [[uninterested]] | adjective | **1.** Not having or showing interest.<br>**2.** Having no care or interest in knowing. | *"Tulkinghorn in his methodical, subdued, uninterested way, “first, whether you have any of Captain Hawdon’s writing?” “First, whether I have any of Captain Hawdon’s writing, sir,” repeats Mr."* — Charles Dickens, *Bleak House* |
| [[uninteresting]] | adjective | **1.** Arousing no interest or attention or curiosity or excitement.<br>**2.** Characteristic or suggestive of an institution especially in being uniform or dull or unimaginative. | *"Moreover, the Weatherbury folk were by no means uninteresting intrinsically."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[uninterestingly]] | adverb | **1.** In an uninteresting manner. | *"In academic literature, uninterestingly designates in an uninteresting manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninterestingness]] | noun | **1.** Inability to capture or hold one's interest. | *"In academic literature, uninterestingness designates inability to capture or hold one's interest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninterrupted]] | adjective | **1.** Having undisturbed continuity.<br>**2.** Continuing in time or space without interruption; - james jeans. | *"Two days had passed in uninterrupted work, and Apollonie had accomplished what she had set out to do."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[uninterruptedly]] | adverb | **1.** Without interruption. | *"Beaming with joy, Loneli now sat beside Mäzli, who was telling uninterruptedly about Salo."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[unintimidated]] | adjective | **1.** Not shrinking from danger. | *"In academic literature, unintimidated designates not shrinking from danger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintoxicated]] | adjective | **1.** Not inebriated. | *"In academic literature, unintoxicated designates not inebriated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintrusive]] | adjective | **1.** Not interfering or meddling. | *"In academic literature, unintrusive designates not interfering or meddling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninucleate]] | adjective | **1.** Having one nucleus. | *"In academic literature, uninucleate designates having one nucleus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninventive]] | adjective | **1.** Deficient in originality or creativity; lacking powers of invention. | *"In academic literature, uninventive designates deficient in originality or creativity; lacking powers of invention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninvited]] | adjective | **1.** Unwelcome and unwanted. | *"If you had a blue-eyed daughter you wouldn’t like ME to come, uninvited, on HER birthday?’ But he stayed.” Mr."* — Charles Dickens, *Bleak House* |
| [[uninvitedly]] | adverb | **1.** Without invitation. | *"This was strangely heightened at times by the ragged Elijah’s diabolical incoherences uninvitedly recurring to me, with a subtle energy I could not have before conceived of."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[uninviting]] | adjective | **1.** Neither attractive nor tempting.<br>**2.** Not tempting. | *"There was no want of respect in the young man’s address; and Fanny’s reception of it was so proper and modest, so calm and uninviting, that he had nothing to censure in her."* — Jane Austen, *Mansfield Park* |
| [[uninvolved]] | adjective | **1.** Not involved.<br>**2.** Showing lack of emotional involvement; - j.s.perelman. | *"In academic literature, uninvolved designates not involved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unio]] | noun | **1.** Type genus of the family unionidae. | *"In academic literature, unio designates type genus of the family unionidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[union]] | noun | **1.** An organization of employees formed to bargain with the employer.<br>**2.** The united states (especially the northern states during the american civil war). | *"This union shall do more than battery can To our fast-closed gates; for at this match, With swifter spleen than powder can enforce, The mouth of passage shall we fling wide ope, And give you entrance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unionidae]] | noun | **1.** Freshwater mussels found worldwide. | *"In academic literature, unionidae designates freshwater mussels found worldwide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unionisation]] | noun | **1.** Act of forming labor unions. | *"In academic literature, unionisation designates act of forming labor unions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unionise]] | verb | **1.** Recruit for a union or organize into a union.<br>**2.** Form or join a union. | *"In academic literature, unionise designates recruit for a union or organize into a union."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unionised]] | verb | **1.** Recruit for a union or organize into a union.<br>**2.** Form or join a union. | *"In academic literature, unionised designates recruit for a union or organize into a union."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unionism]] | noun | **1.** The system or principles and theory of labor unions. | *"Aside from its effects upon the wage-bargain, unionism finds its greatest justification is in its unspectacular fraternal, mutual-benefit, and educational functions."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unionist]] | noun | **1.** A worker who belongs to a trade union. | *"It is quite evident that Miss Breckinridge improved this occasion to air her loyal sentiments and give such help and courage to Unionists as lay in her power."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[unionization]] | noun | **1.** Act of forming labor unions. | *"In academic literature, unionization designates act of forming labor unions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unionize]] | verb | **1.** Recruit for a union or organize into a union.<br>**2.** Form or join a union. | *"In academic literature, unionize designates recruit for a union or organize into a union."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unionized]] | verb | **1.** Recruit for a union or organize into a union.<br>**2.** Form or join a union. | *"In academic literature, unionized designates recruit for a union or organize into a union."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uniovular]] | adjective | **1.** Having a single ovule. | *"In academic literature, uniovular designates having a single ovule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uniovulate]] | adjective | **1.** Having a single ovule. | *"In academic literature, uniovulate designates having a single ovule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unique]] | adjective | **1.** Radically distinctive and without equal.<br>**2.** (followed by `to') applying exclusively to a given category or condition or locality. | *"A call was accordingly addressed to him, and it was backed up by representations of an almost unique character and weight."* — John Cairns, *Principal Cairns* |
| [[uniquely]] | adverb | **1.** So as to be unique. | *"It is not too much, I think, to assert that Goethe could never have become so uniquely great, not even through the splendid versatility of his genius, but for that incomparable self-control, which he made the watchword of his life."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[uniqueness]] | noun | **1.** The quality of being one of a kind. | *"Nevertheless, such Things do acquire uniqueness over time, and even if no longer of practical use, they represent an individual's, a family's, or a community's history and perhaps, grandeur."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[unironed]] | adjective | **1.** (of linens or clothes) not ironed. | *"In academic literature, unironed designates (of linens or clothes) not ironed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unisex]] | adjective | **1.** Not distinguished on the basis of sex. | *"In academic literature, unisex designates not distinguished on the basis of sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unisexual]] | adjective | **1.** Relating to only one sex or having only one type of sexual organ; not hermaphroditic. | *"In academic literature, unisexual designates relating to only one sex or having only one type of sexual organ; not hermaphroditic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unison]] | noun | **1.** Corresponding exactly.<br>**2.** Occurring together or simultaneously. | *"Here we be, ’a b’lieve,” was echoed in shrill unison."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unit]] | noun | **1.** Any division of quantity accepted as a standard of measurement or exchange.<br>**2.** An individual or group or structure or other entity regarded as a structural or functional constituent of a whole. | *"We mean by standard money that kind, no matter what its form, which serves in any country as the unit in which the value of other kinds of money is expressed."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unitard]] | noun | **1.** A tight-fitting garment of stretchy material that covers the body from the shoulders to the thighs (and may have long sleeves or legs reaching down to the ankles); worn by ballet dancers and acrobats for practice or performance. | *"In academic literature, unitard designates a tight-fitting garment of stretchy material that covers the body from the shoulders to the thighs (and may have long sleeves or legs reaching down to the ankles); worn by ballet dancers and acrobats for practice or performance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unitarian]] | noun | **1.** Adherent of unitarianism.<br>**2.** Of or relating to or characterizing unitarianism. | *"Minchin for his part liked to keep the mental windows open and objected to fixed limits; if the Unitarian brewer jested about the Athanasian Creed, Dr."* — George Eliot, *Middlemarch* |
| [[unitarianism]] | noun | **1.** Christian doctrine that stresses individual freedom of belief and rejects the trinity. | *"In academic literature, unitarianism designates christian doctrine that stresses individual freedom of belief and rejects the trinity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unitary]] | adjective | **1.** Relating to or characterized by or aiming toward unity.<br>**2.** Of or pertaining to or involving the use of units. | *"The Tathagata knows this unitary essential Law, that is to say, Deliverance, Abandonment, Extinction, final Nirvana of eternal rest, ending in return to the Void."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[unite]] | verb | **1.** Act in concert or unite in a common purpose or belief.<br>**2.** Become one. | *"For Thou hast given me in this beauteous face A world of earthly blessings to my soul, If sympathy of love unite our thoughts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[united]] | verb | **1.** Act in concert or unite in a common purpose or belief.<br>**2.** Become one. | *"ARCHBISHOP. ’Tis very true, And therefore be assured, my good Lord Marshal, If we do now make our atonement well, Our peace will, like a broken limb united, Grow stronger for the breaking."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unitedly]] | adverb | **1.** With cooperation and interchange. | *"To tell the truth they were somewhat inclined to be lazy, but a perfect tumult of hilarity prevailed; and they worked together so unitedly, and seemed actuated by such an instinct of friendliness, that it was truly beautiful to behold."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[uniting]] | noun | **1.** The combination of two or more commercial companies.<br>**2.** The act of making or becoming a single unit. | *"Instead of pushing his fortune in the line marked out for the heir of the house of Elliot, he had purchased independence by uniting himself to a rich woman of inferior birth."* — Jane Austen, *Persuasion* |
| [[unitisation]] | noun | **1.** (psychology) the configuration of smaller units of information into large coordinated units.<br>**2.** The act of packaging cargo into unit loads. | *"In academic literature, unitisation designates (psychology) the configuration of smaller units of information into large coordinated units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unitise]] | verb | **1.** Divide (bulk material) and process as units.<br>**2.** Make into a unit. | *"In academic literature, unitise designates divide (bulk material) and process as units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unitization]] | noun | **1.** (psychology) the configuration of smaller units of information into large coordinated units.<br>**2.** The act of packaging cargo into unit loads. | *"In academic literature, unitization designates (psychology) the configuration of smaller units of information into large coordinated units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unitize]] | verb | **1.** Divide (bulk material) and process as units.<br>**2.** Make into a unit. | *"In academic literature, unitize designates divide (bulk material) and process as units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unity]] | noun | **1.** An undivided or unbroken completeness or totality with nothing wanting.<br>**2.** The smallest whole number or a numeral representing this number. | *"If I were bound to divine of this unity, I would not prophesy so."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Quantity]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · UNI
  </div>
</div>
