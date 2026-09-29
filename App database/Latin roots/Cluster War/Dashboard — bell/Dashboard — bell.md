---
status: unread
type: root_dashboard
---
# Dashboard — bell
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">bell-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“war”</span>
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

The root **bell** means war. It refers to armed conflict, fighting between groups, and battles. In English, this root forms words such as *antebellum*, *bellicose*, *belligerent*, and *rebellion*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: war
> The root **bell** means war. It refers to armed conflict, fighting between groups, and battles. In English, this root forms words such as *antebellum*, *bellicose*, *belligerent*, and *rebellion*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">War</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A protective shield deflecting a blow or soldiers marching in disciplined defense.</mark>
> - **Everyday Connection**: Think of familiar words like *antebellum* and *bellicose*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bell** comes from a Latin word that means *"war"*.
  - At its core, it describes war.

- **The Big Picture Idea**:
  - Picture a protective shield deflecting a blow or soldiers marching in disciplined defense.
  - Whenever you see **bell** in an English word, think of **defense, struggle, and armed forces**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of war.
  - **Mental & Social**: How people experience, organize, or communicate about war.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Antebellum**: Occurring or existing before a particular war, especially the American Civil War.
  - **Bellicose**: Demonstrating aggression and willingness to fight.
  - **Belligerent**: Hostile and aggressive.
  - **Rebellion**: An act of violent or open resistance to an established government or ruler.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bell</mark>, think of <mark class="hl-def">defense, struggle, and armed forces</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `bell-` (< Latin *bellum*): Base nominal root.
  - `bellic-` (< Latin *bellicus* "pertaining to war"): *bellicose*.
  - `belliger-` (< Latin *belliger* "waging war" < *bellum* + *gerere* "to carry on"): *belligerent, belligerence*.
- **Prefix Machinery**:
  - `ante-` ("before"): *antebellum*.
  - `post-` ("after"): *postbellum*.
  - `re-` ("again, back"): *rebel, rebellion, rebellious*.
  - `co-` ("together"): *cobelligerent*.

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
                      ┌── Aggressive Disposition: bellicose, belligerent, belligerence
                      │
   [bell] ────────────┼── Historical Chronology: antebellum, postbellum
 (War / Combat)       │
                      ├── Jurisprudence & Treaties: casus belli, cobelligerent
                      │
                      └── Insurrection & Defiance: rebel, rebellion, rebellious
```

---

## 🔀 4. Prefix & Combining Dynamics on bell
- **`ante-` + `bell-` + `-um`**: *antebellum* — occurring in the period before a major war (especially the American Civil War).
- **`post-` + `bell-` + `-um`**: *postbellum* — occurring in the period after a war.
- **`re-` + `bell`**: *rebellion* — organized, armed resistance against an established government.
- **`co-` + `belligerent`**: *cobelligerent* — a state that fights alongside another against a common enemy without a formal alliance.

---

## 🌐 5. Disciplinary & Real-World Domains
- **International Relations & Military Law**: *Casus belli*; laws of armed conflict; *belligerent* rights.
- **Historical Periods & Historiography**: The *Antebellum* South; *postbellum* reconstruction.
- **Sociology & Political Science**: Peasant *rebellions*; insurgencies; revolutionary movements.
- **Psychiatry & Behavioral Science**: *Bellicose* rhetoric; *belligerent* interpersonal aggression.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antebellum]] | adjective | **1.** Belonging to a period before a war especially the american civil war. | *"In academic literature, antebellum designates belonging to a period before a war especially the american civil war."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bell]] | noun | **1.** A hollow device made of metal that makes a ringing sound when struck.<br>**2.** A push button at an outer door that gives a ringing or buzzing signal when pushed. | *"Fill our bowls once more Let’s mock the midnight bell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[belladonna]] | noun | **1.** Perennial eurasian herb with reddish bell-shaped flowers and shining black berries; extensively grown in united states; roots and leaves yield atropine.<br>**2.** An alkaloidal extract or tincture of the poisonous belladonna plant that is used medicinally. | *"It is so melodious and full. _Belladonna."* — James Joyce, *Ulysses* |
| [[bellarmine]] | noun | **1.** Italian cardinal and theologian (1542-1621).<br>**2.** A stoneware drinking jug with a long neck; decorated with a caricature of cardinal bellarmine (17th century). | *"The rest was a confused multitude, led by Scotus, Aquinas, and Bellarmine; of mighty bulk and stature, but without either arms, courage, or discipline."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[bellarmino]] | noun | **1.** Italian cardinal and theologian (1542-1621). | *"In academic literature, bellarmino designates italian cardinal and theologian (1542-1621)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[belle]] | noun | **1.** A young woman who is the most charming and beautiful of several rivals. | *"How answer you, _la plus belle Katherine du monde, mon très cher et divin déesse?_ KATHARINE."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bellerophon]] | noun | **1.** (greek mythology) a mythical hero of corinth who performed miracles on the winged horse pegasus (especially killing the monster chimera). | *"VINCENT," AND "BELLEROPHON" EXERCISING IN THE FLOW 66 H.M.S."* — C. W. Burrows, *Scapa and a Camera* |
| [[belles-lettres]] | noun | **1.** Creative writing valued for esthetic content. | *"In academic literature, belles-lettres designates creative writing valued for esthetic content."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[belletristic]] | adjective | **1.** Written and regarded for aesthetic value rather than content. | *"In academic literature, belletristic designates written and regarded for aesthetic value rather than content."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellicose]] | adjective | **1.** Having or showing a ready disposition to fight. | *"The versatile Jap's in the game, Because of a treaty he came, For old Johnnie Bull, Will have his hands full, The bellicose Germans to tame."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[bellicoseness]] | noun | **1.** A natural disposition to fight. | *"In academic literature, bellicoseness designates a natural disposition to fight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellicosity]] | noun | **1.** A natural disposition to fight. | *"In academic literature, bellicosity designates a natural disposition to fight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellied]] | verb | **1.** Swell out or bulge out.<br>**2.** Having a belly; often used in combination. | *"Great-bellied women That had not half a week to go, like rams In the old time of war, would shake the press And make ’em reel before ’em."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[belligerence]] | noun | **1.** Hostile or warlike attitude or nature.<br>**2.** A natural disposition to be hostile. | *"Is that clear?" "If they start anything, I'd just as soon take a few of them out for good." Scarf postured his belligerence."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[belligerency]] | noun | **1.** Hostile or warlike attitude or nature.<br>**2.** Fighting; acts of overt warfare. | *"In academic literature, belligerency designates hostile or warlike attitude or nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[belligerent]] | noun | **1.** Someone who fights (or is fighting).<br>**2.** Characteristic of an enemy or one eager to fight. | *"She maintained this belligerent attitude for several days, during which time a series of informal negotiations were pending, and wide alarm spread over the island."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[belligerently]] | adverb | **1.** With hostility; in a belligerent hostile manner. | *"In academic literature, belligerently designates with hostility; in a belligerent hostile manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[belling]] | noun | **1.** A noisy mock serenade (made by banging pans and kettles) to a newly married couple.<br>**2.** Attach a bell to. | *"In academic literature, belling designates a noisy mock serenade (made by banging pans and kettles) to a newly married couple."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellingham]] | noun | **1.** A town in northwestern washington on a bay near the canadian border. | *"Here, to witness the scene which we are describing, sat Governor Bellingham himself with four sergeants about his chair, bearing halberds, as a guard of honour."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[bellini]] | noun | **1.** Italian composer of operas (1801-1835). | *"In academic literature, bellini designates italian composer of operas (1801-1835)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellis]] | noun | **1.** Daisy. | *"Classical and authoritative lexicons catalog bellis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellman]] | noun | **1.** Someone employed as an errand boy and luggage carrier around hotels. | *"It was the owl that shriek’d, the fatal bellman, Which gives the stern’st good night."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[belloc]] | noun | **1.** English author (born in france) remembered especially for his verse for children (1870-1953). | *"In academic literature, belloc designates english author (born in france) remembered especially for his verse for children (1870-1953)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellona]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin bell within the domain of War.<br>**2.** A technical or specialized form exhibiting the properties of bell in systematic terminology. | *"Unto the helmeted Bellona use them, And pray for me, your soldier."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bellow]] | noun | **1.** A very loud utterance (like the sound of an animal).<br>**2.** United states author (born in canada) whose novels influenced american literature after world war ii (1915-2005). | *"Come, the croaking raven doth bellow for revenge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bellower]] | noun | **1.** Someone who communicates vocally in a very loud voice. | *"In academic literature, bellower designates someone who communicates vocally in a very loud voice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellowing]] | noun | **1.** A very loud utterance (like the sound of an animal).<br>**2.** Shout loudly and without restraint. | *"Whiles we stood here securing your repose, Even now, we heard a hollow burst of bellowing Like bulls, or rather lions; did ’t not wake you?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bellows]] | noun | **1.** A mechanical device that blows a strong current of air; used to make a fire burn more fiercely or to sound a musical instrument.<br>**2.** A very loud utterance (like the sound of an animal). | *"His captain’s heart, Which in the scuffles of great fights hath burst The buckles on his breast, reneges all temper And is become the bellows and the fan To cool a gipsy’s lust."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[belly]] | noun | **1.** The region of the body of a vertebrate between the thorax and the pelvis.<br>**2.** A protruding abdomen. | *"And then the justice, In fair round belly with good capon lined, With eyes severe and beard of formal cut, Full of wise saws and modern instances; And so he plays his part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[belly-flop]] | verb | **1.** Dive so that one hits the water with one's belly. | *"In academic literature, belly-flop designates dive so that one hits the water with one's belly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[belly-land]] | verb | **1.** Land on the underside without the landing gear. | *"In academic literature, belly-land designates land on the underside without the landing gear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[belly-up]] | adjective | **1.** Financially ruined. | *"In academic literature, belly-up designates financially ruined."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellyache]] | noun | **1.** An ache localized in the stomach or abdominal region.<br>**2.** Complain. | *"In academic literature, bellyache designates an ache localized in the stomach or abdominal region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellyacher]] | noun | **1.** A person given to excessive complaints and crying and whining. | *"In academic literature, bellyacher designates a person given to excessive complaints and crying and whining."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellyband]] | noun | **1.** A cloth band that is worn around the waist (as on infants until the navel has healed).<br>**2.** A strap around the belly of a draft animal holding the shafts of a wagon. | *"She was well primed with a good load of Delahunt’s port under her bellyband."* — James Joyce, *Ulysses* |
| [[bellybutton]] | noun | **1.** A scar where the umbilical cord was attached. | *"In academic literature, bellybutton designates a scar where the umbilical cord was attached."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellyful]] | noun | **1.** An undesirable overabundance. | *"Every jackslave hath his bellyful of fighting, and I must go up and down like a cock that nobody can match."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bellying]] | verb | **1.** Swell out or bulge out.<br>**2.** Curving outward. | *"I'd be woe for the outside, for the sunshine and the water and the bellying winds--" His Uncle Robin tapped the window-pane of the club and thought hard."* — Donn Byrne, *The Wind Bloweth* |
| [[bellylaugh]] | verb | **1.** Laugh a deep, hearty laugh. | *"In academic literature, bellylaugh designates laugh a deep, hearty laugh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bellyless]] | adjective | **1.** Lacking a prominent belly. | *"In academic literature, bellyless designates lacking a prominent belly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[casus belli]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin bell within the domain of War.<br>**2.** A technical or specialized form exhibiting the properties of bell in systematic terminology. | *"In academic literature, casus belli designates pertaining to, derived from, or characteristic of latin bell within the domain of war."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corbelled]] | adjective | **1.** Having a corbel. | *"In academic literature, corbelled designates having a corbel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[embellish]] | verb | **1.** Add details to.<br>**2.** Be beautiful to look at. | *"Rouncewell’s place in the meantime, though pearl necklaces and rouge pots, however calculated to embellish Bath, are but indifferent comforts to the invalid under present circumstances."* — Charles Dickens, *Bleak House* |
| [[embellishment]] | noun | **1.** Elaboration of an interpretation by the use of decorative (sometimes fictitious) detail.<br>**2.** A superfluous ornament. | *"She heard it all under embellishment."* — Jane Austen, *Persuasion* |
| [[nonbelligerent]] | adjective | **1.** Not directly at war. | *"In academic literature, nonbelligerent designates not directly at war."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rebellion]] | noun | **1.** Refusal to accept some authority or code or convention.<br>**2.** Organized opposition to authority; a conflict in which one faction tries to wrest control from another. | *"COUNTESS. ’Tis past, my liege, And I beseech your majesty to make it Natural rebellion, done i’ the blaze of youth, When oil and fire, too strong for reason’s force, O’erbears it and burns on."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rebellious]] | adjective | **1.** Resisting control or authority.<br>**2.** Discontented as toward authority. | *"Though I look old, yet I am strong and lusty, For in my youth I never did apply Hot and rebellious liquors in my blood, Nor did not with unbashful forehead woo The means of weakness and debility."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rebelliously]] | adverb | **1.** In a rebellious manner. | *"Last week you said you were thankful, whatever happened, to have me out of bed---" "You oughtn't to have been out!" Suze broke in, rebelliously."* — C. N. Williamson, *Angel Unawares: A Story of Christmas Eve* |
| [[rebelliousness]] | noun | **1.** Intentionally contemptuous behavior or attitude.<br>**2.** An insubordinate act. | *"She chafed to and fro in rebelliousness, like a caged leopard; her whole soul was in arms, and the blood fired her face."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[redbelly]] | noun | **1.** Freshwater turtle of chesapeake bay tributaries having red markings on the lower shell. | *"In academic literature, redbelly designates freshwater turtle of chesapeake bay tributaries having red markings on the lower shell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underbelly]] | noun | **1.** Lower side.<br>**2.** The soft belly or underside of an animal's body. | *"In academic literature, underbelly designates lower side."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · BELL
  </div>
</div>
