---
status: unread
type: root_dashboard
---
# Dashboard — milit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">milit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“soldier”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A protective shield deflecting a blow or soldiers marching in disciplined defense.</span>
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

The root **milit** means soldier. It refers to armed soldiers, fighting forces, or military service. In English, this root forms words such as *military*, *militia*, *militant*, and *militarize*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: soldier
> The root **milit** means soldier. It refers to armed soldiers, fighting forces, or military service. In English, this root forms words such as *military*, *militia*, *militant*, and *militarize*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Soldier</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A protective shield deflecting a blow or soldiers marching in disciplined defense.</mark>
> - **Everyday Connection**: Think of familiar words like *military* and *militia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **milit** comes from a Latin word that means *"soldier"*.
  - At its core, it describes soldier.

- **The Big Picture Idea**:
  - Picture a protective shield deflecting a blow or soldiers marching in disciplined defense.
  - Whenever you see **milit** in an English word, think of **defense, struggle, and armed forces**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of soldier.
  - **Mental & Social**: How people experience, organize, or communicate about soldier.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Military**: Relating to or characteristic of soldiers or armed forces.
  - **Militia**: A military force that is raised from the civil population to supplement a regular army in an emergency.
  - **Militant**: Combative and aggressive in support of a political or social cause, and typically favoring extreme, violent, or confrontational methods.
  - **Militarize**: To equip or train for military service.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">milit</mark>, think of <mark class="hl-def">defense, struggle, and armed forces</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `milit-` (< Latin *mīles* / *mīlitis*): Base nominal and verbal root.
- **Prefix Machinery**:
  - `de-` ("down, un-"): *demilitarize, demilitarization*.
- **Suffixal Formations**:
  - `-ary`: *military*.
  - `-ant` / `-ancy`: *militant, militancy*.
  - `-ate`: *militate*.
  - `-ia`: *militia*.
  - `-ism` / `-ist`: *militarism, militarist*.

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
```
                      ┌── State Armed Forces: military, militarize, militarism, militarist
                      │
   [milit] ───────────┼── Irregular & Activist Zeal: militant, militancy, militia
 (Soldier / Service)  │
                      ├── Abstract Evidential Weight: militate (militate against)
                      │
                      └── Peace Treaties & Zones: demilitarize, demilitarization
```

---

## 🔀 4. Prefix & Combining Dynamics on milit
- **`milit-` + `-ary`**: *military* — relating to soldiers, arms, or armed war.
- **`milit-` + `-ate`**: *militate* — to exert a strong influence or operate as an argument against.
- **`de-` + `militarize`**: *demilitarize* — to remove military forces and weaponry from an area.
- **`milit-` + `-ant`**: *militant* — combative, aggressive in support of a political or social cause.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Defense & National Security**: Joint Chiefs of Staff; *military* doctrines; civil-*military* relations.
- **International Diplomacy**: The Korean *Demilitarized* Zone (DMZ); arms control treaties.
- **Constitutional Law**: Second Amendment (*well-regulated militia*); National Guard units.
- **Political Ideology**: 20th-century Prussian and Japanese *militarism*; activist *militancy*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[demilitarise]] | verb | **1.** Do away with the military organization and potential of.<br>**2.** Remove offensive capability from. | *"In academic literature, demilitarise designates do away with the military organization and potential of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demilitarize]] | verb | **1.** Do away with the military organization and potential of.<br>**2.** Remove offensive capability from. | *"In academic literature, demilitarize designates do away with the military organization and potential of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militainment]] | noun | **1.** Entertainment with military themes in which the department of defense is celebrated. | *"In academic literature, militainment designates entertainment with military themes in which the department of defense is celebrated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militance]] | noun | **1.** A militant aggressiveness. | *"In academic literature, militance designates a militant aggressiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militancy]] | noun | **1.** A militant aggressiveness. | *"In academic literature, militancy designates a militant aggressiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militant]] | noun | **1.** A militant reformer.<br>**2.** Disposed to warfare or hard-line policies. | *"Stafford, by temperament and training a member of the Church Militant, clearly felt a trifle disappointed, but he had little petty vanity and accepted Val's amendment without a murmur."* — Anthony Pryde, *Nightfall* |
| [[militarily]] | adverb | **1.** With respect to the military. | *"The Korean War, in which the Soviet Union and Communist China openly supported and militarily joined North Korea against the United Nations, was launched the following year."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[militarisation]] | noun | **1.** Act of assembling and putting into readiness for war or other emergency:. | *"In academic literature, militarisation designates act of assembling and putting into readiness for war or other emergency:."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militarise]] | verb | **1.** Lend a military character to (a country), as by building up a military force.<br>**2.** Adopt for military use. | *"In academic literature, militarise designates lend a military character to (a country), as by building up a military force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militarised]] | verb | **1.** Lend a military character to (a country), as by building up a military force.<br>**2.** Adopt for military use. | *"In academic literature, militarised designates lend a military character to (a country), as by building up a military force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militarism]] | noun | **1.** A political orientation of a people or a government to maintain a strong military force and to be prepared to use it aggressively to defend or promote national interests. | *"Population and militarism. § 16."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[militarist]] | noun | **1.** A person who advocates war or warlike policies. | *"You are deceived, my lord; this is Monsieur Parolles, the gallant militarist (that was his own phrase), that had the whole theoric of war in the knot of his scarf, and the practice in the chape of his dagger."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[militaristic]] | adjective | **1.** Imbued with militarism. | *"In academic literature, militaristic designates imbued with militarism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militarization]] | noun | **1.** Act of assembling and putting into readiness for war or other emergency:. | *"In academic literature, militarization designates act of assembling and putting into readiness for war or other emergency:."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militarize]] | verb | **1.** Lend a military character to (a country), as by building up a military force.<br>**2.** Adopt for military use. | *"In academic literature, militarize designates lend a military character to (a country), as by building up a military force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[militarized]] | verb | **1.** Lend a military character to (a country), as by building up a military force.<br>**2.** Adopt for military use. | *"In academic literature, militarized designates lend a military character to (a country), as by building up a military force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[military]] | noun | **1.** The military forces of a nation.<br>**2.** Of or relating to the study of the principles of warfare. | *"Is there no military policy how virgins might blow up men?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[militate]] | verb | **1.** Have force or influence; bring about an effect or change. | *"She felt that she had spoken as impressively as it was necessary to do, and that in using the superior word “militate” she had thrown a noble drapery over a mass of particulars which were still evident enough."* — George Eliot, *Middlemarch* |
| [[militia]] | noun | **1.** Civilians trained as soldiers but not part of the regular army.<br>**2.** The entire body of physically fit civilians eligible by law for military service; ; --united states constitution. | *"As I learned afterward, the Board of Prison Directors had been summoned by telegraph, and two companies of state militia were being rushed to the prison."* — Jack London, *The Jacket (The Star-Rover)* |
| [[militiaman]] | noun | **1.** A member of the militia; serves only during emergencies. | *"But a militiaman got there before him."* — graf Leo Tolstoy, *War and Peace* |
| [[nonmilitary]] | adjective | **1.** Not associated with soldiers or the military. | *"The intrusion of Pierre’s nonmilitary figure in a white hat made an unpleasant impression at first."* — graf Leo Tolstoy, *War and Peace* |
| [[remilitarisation]] | noun | **1.** The act of militarizing again. | *"In academic literature, remilitarisation designates the act of militarizing again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remilitarise]] | verb | **1.** Militarize anew. | *"In academic literature, remilitarise designates militarize anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remilitarization]] | noun | **1.** The act of militarizing again. | *"In academic literature, remilitarization designates the act of militarizing again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remilitarize]] | verb | **1.** Militarize anew. | *"In academic literature, remilitarize designates militarize anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiliterate]] | adjective | **1.** Literate but poorly informed.<br>**2.** Barely able to read and write. | *"In academic literature, semiliterate designates literate but poorly informed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmilitary]] | adjective | **1.** Not associated with soldiers or the military. | *"I must ask someone who knows,” he thought, and addressed an officer who was looking with curiosity at his huge unmilitary figure."* — graf Leo Tolstoy, *War and Peace* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster War]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MILIT
  </div>
</div>
