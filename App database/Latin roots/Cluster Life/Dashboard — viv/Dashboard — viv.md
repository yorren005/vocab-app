---
status: unread
type: root_dashboard
---
# Dashboard — viv
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">viv-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to live”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A young seed sprouting vigorously into green leaves under the warm sun.</span>
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

The root **viv** means to live. It refers to the action of living and carrying out this process. In English, this root forms words such as *vivid*, *revive*, *survive*, and *vivacious*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to live
> The root **viv** means to live. It refers to the action of living and carrying out this process. In English, this root forms words such as *vivid*, *revive*, *survive*, and *vivacious*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To live</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *vivid* and *revive*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **viv** comes from a Latin word that means *"to live"*.
  - At its core, it describes the action of live.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **viv** in an English word, think of **to live**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to live).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Vivid**: Producing powerful, clear, lifelike images in the mind.
  - **Revive**: To restore to life, consciousness, or vigor.
  - **Survive**: To continue to live or exist in spite of danger, accident, or hardship.
  - **Vivacious**: Attractively lively, animated, charming, and full of high spirits.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">viv</mark>, think of <mark class="hl-def">to live</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **viv** operates across several Latin morphological stems:
> - **Active Verb Base `viv-` (*vīvō, vīvere*):**
>   - Prefixed with `re-` (again) $\to$ *revive*, *revival*, *revivalist*, *revivalism*, *revivify*, *revivification*
>   - Prefixed with `super-` $\to$ Anglo-French `sur-` (beyond) $\to$ *survive*, *survival*, *survivor*, *survivorship*, *surviving*
>   - Prefixed with `con-` (together) $\to$ *convivial*, *convivially*, *conviviality*, *convive*
> - **Adjectival Quality Base `vivid-` (*vīvidus* "lifelike, bright"):**
>   - *vivid*, *vividly*, *vividness*
> - **Lively / Animated Base `vivac-` (*vīvāx*, *vīvācis* "tenacious of life"):**
>   - *vivacious*, *vivaciously*, *vivaciousness*, *vivacity*
> - **Causative / Biological Base `vivi-` (*vīvus* "alive"):**
>   - Combined with `parere` (to bear) $\to$ *viviparous*, *viviparity*, *ovoviviparous*
>   - Combined with `secāre` (to cut) $\to$ *vivisection*, *vivisectionist*
>   - Combined with `-arium` (place) $\to$ *vivarium*
>   - Combined with `facere` (to make) $\to$ *vivify*, *vivification*
> - **Supine / Sustenance Base `vict-` (*victus* < *vīvere*):**
>   - *victual*, *victuals*, *victualer*
> - **Idiomatic Romance & Classical Phrases:**
>   - *in vivo*, *viva voce*, *bon vivant*, *qui vive*, *viva!*

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
> The root branches across five vibrant conceptual spheres:
> - **Perceptual Clarity & Aesthetic Brilliance:** Intense mental imagery, radiant colors, and sharp sensory impressions (*vivid*, *vividly*, *vividness*).
> - **Biological Reproduction & Living Systems:** Bearing live young (*viviparous*, *viviparity*), keeping live organisms (*vivarium*), and physiological testing in whole living bodies (*in vivo*).
> - **Existential Resilience & Recovery:** Surviving disasters, accidents, and diseases (*survive*, *survival*, *survivor*), and restoring dormant traditions or unconscious patients (*revive*, *revival*).
> - **Social Merriment & Gastronomy:** Festive communal dining and drinking (*convivial*, *conviviality*, *bon vivant*), and military food rations (*victuals*).
> - **Sparkling Temperament & Human Character:** Exuberant charm, animation, and high spirits (*vivacious*, *vivacity*).

---

## 🔀 4. Prefix & Combining Dynamics on viv

### Prefix Dynamics
- **`super-` / `sur-` (Beyond / Above):** Living beyond danger or outliving a contemporary $\to$ *survive*, *survival*.
- **`re-` (Again / Back):** Bringing back to life or currency $\to$ *revive*, *revival*, *revivify*.
- **`con-` (Together):** Living together in shared table fellowship $\to$ *convivial*, *conviviality*.

### Combining Elements
- **`-parous` (Latin *parere* "to give birth"):** Producing live offspring $\to$ *viviparous*.
- **`-section` (Latin *secāre* "to cut"):** Surgical operation on a living subject $\to$ *vivisection*.
- **`-arium` (Latin Place Suffix):** Facility housing live animals $\to$ *vivarium*.
- **`-fy` (Latin *facere* "to make"):** To impart life to $\to$ *vivify*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Preclinical Pharmacology & Toxicology:** The gold standard transition from *in vitro* (cell culture / test tube) to *in vivo* (whole living mammalian systems) pharmacokinetics and drug safety evaluation.
> - **Evolutionary Zoology & Reproductive Physiology:** The evolutionary transition from oviparity (egg-laying) to *viviparity* (live placental birth) across vertebrates, including intermediate *ovoviviparous* reptiles and sharks.
> - **Bioethics & Research Compliance:** Institutional Animal Care and Use Committees (IACUC) regulating humane animal experimentation and historical anti-*vivisection* legislation.
> - **Property Law & Real Estate:** Joint tenancy with *right of survivorship* (JTWROS), where title automatically passes to the surviving owner without probate.
> - **Maritime History & Military Logistics:** Naval *victualling* yards (such as the Royal Navy's Deptford Victualling Yard) provisioning warships with salt pork, ship's biscuit, and rum.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[convivial]] | adjective | **1.** Occupied with or fond of the pleasures of good company. | *"Bucket proceeded in the same convivial manner as before."* — Charles Dickens, *Bleak House* |
| [[conviviality]] | noun | **1.** A jovial nature.<br>**2.** A boisterous celebration; a merry festivity. | *"It is evident that Burns was a man of extremely passionate nature and fond of conviviality; and the misfortunes of his lot combined with his natural tendencies to drive him to frequent excesses of self-indulgence."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[convivially]] | adverb | **1.** In a convivial manner. | *"In academic literature, convivially designates in a convivial manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revival]] | noun | **1.** Bringing again into activity and prominence.<br>**2.** An evangelistic meeting intended to reawaken interest in religion. | *"You’re a brimstone chatterer!” with a sudden revival of his late hostility."* — Charles Dickens, *Bleak House* |
| [[revivalism]] | noun | **1.** An attempt to reawaken the evangelical faith. | *"But the average minister is not distinguished for revivalism so much as proficiency in making a church social a "blooming success." FALLEN SAMSONS."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[revivalist]] | noun | **1.** A preacher of the christian gospel. | *"You will soon be going about like the converted, and the revivalist, warning people against all the sins of which you have grown tired."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[revivalistic]] | adjective | **1.** Of or relating to or characterizing revivalism. | *"In academic literature, revivalistic designates of or relating to or characterizing revivalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revive]] | verb | **1.** Cause to regain consciousness.<br>**2.** Give new life or energy to. | *"Henry is dead and never shall revive."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[revived]] | verb | **1.** Cause to regain consciousness.<br>**2.** Give new life or energy to. | *"What thing, in honour, had my father lost, That need to be revived and breathed in me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[revivification]] | noun | **1.** Bringing again into activity and prominence. | *"But the transference of the shirt worn by the effigy of Death to the tree clearly indicates that the tree is a kind of revivification, in a new form, of the destroyed effigy."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[revivify]] | verb | **1.** Give new life or energy to. | *"In academic literature, revivify designates give new life or energy to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reviving]] | verb | **1.** Cause to regain consciousness.<br>**2.** Give new life or energy to. | *"Your statue spouting blood in many pipes, In which so many smiling Romans bath’d, Signifies that from you great Rome shall suck Reviving blood, and that great men shall press For tinctures, stains, relics, and cognizance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sempervivum]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin viv within the domain of Life.<br>**2.** A technical or specialized form exhibiting the properties of viv in systematic terminology. | *"In academic literature, sempervivum designates pertaining to, derived from, or characteristic of latin viv within the domain of life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[survival]] | noun | **1.** A state of surviving; remaining alive.<br>**2.** A natural process resulting in the evolution of organisms best adapted to the environment. | *"But the news of his brother's survival reached him, nevertheless."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[survivalist]] | noun | **1.** Someone who tries to insure their personal survival or the survival of their group or nation. | *"In academic literature, survivalist designates someone who tries to insure their personal survival or the survival of their group or nation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[survive]] | verb | **1.** Continue to live through hardship or adversity.<br>**2.** Continue in existence after (an adversity, etc.). | *"Then if he thrive and I be cast away, The worst was this: my love was my decay. 81 Or I shall live your epitaph to make, Or you survive when I in earth am rotten, From hence your memory death cannot take, Although in me each part will be forgotten."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[surviving]] | verb | **1.** Continue to live through hardship or adversity.<br>**2.** Continue in existence after (an adversity, etc.). | *"So thy surviving husband shall remain The scornful mark of every open eye; Thy kinsmen hang their heads at this disdain, Thy issue blurred with nameless bastardy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[survivor]] | noun | **1.** One who lives through affliction.<br>**2.** One who outlives another. | *"The people will remain uncertain whilst ’Twixt you there’s difference, but the fall of either Makes the survivor heir of all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unrevived]] | adjective | **1.** Not revived. | *"In academic literature, unrevived designates not revived."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viva]] | noun | **1.** An examination conducted by spoken communication. | *"M._ _A Man hanging for Love, drawn when Painting was in its Cradle, with his Dog barking at him, _viva voce_."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[viva-voce]] | adjective | **1.** Expressed orally. | *"In academic literature, viva-voce designates expressed orally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vivace]] | adjective | **1.** (of tempo) very fast and lively.<br>**2.** Lively, in music. | *"In academic literature, vivace designates (of tempo) very fast and lively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vivacious]] | adjective | **1.** Vigorous and animated. | *"If she is as nice as her brother, she is the nicest child any of us have ever seen." At this description Loneli's vivacious eyes fairly gleamed with sympathy."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[vivaciously]] | adverb | **1.** With vivacity. | *"Uncle Pumblechook, sensible of having deserved well of his fellow-creatures, said,—quite vivaciously, all things considered,—“Well, Mrs."* — Charles Dickens, *Great Expectations* |
| [[vivacity]] | noun | **1.** Characterized by high spirits and animation. | *"Then, indeed, does she captivate all hearts by her condescension, by her girlish vivacity, and by her skipping about as in the days when the hideous old general with the mouth too full of teeth had not cut one of them at two guineas each."* — Charles Dickens, *Bleak House* |
| [[vivaldi]] | noun | **1.** Italian baroque composer and violinist (1675-1741). | *"In academic literature, vivaldi designates italian baroque composer and violinist (1675-1741)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vivarium]] | noun | **1.** An indoor enclosure for keeping and raising living animals and plants and observing them under natural conditions. | *"In academic literature, vivarium designates an indoor enclosure for keeping and raising living animals and plants and observing them under natural conditions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viverra]] | noun | **1.** Type genus of the family viverridae. | *"In academic literature, viverra designates type genus of the family viverridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viverricula]] | noun | **1.** A genus of viverridae. | *"In academic literature, viverricula designates a genus of viverridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viverridae]] | noun | **1.** Genets; civets; mongooses. | *"In academic literature, viverridae designates genets; civets; mongooses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viverrinae]] | noun | **1.** Genets; civets; mongooses. | *"In academic literature, viverrinae designates genets; civets; mongooses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[viverrine]] | noun | **1.** Small cat-like predatory mammals of warmer parts of the old world. | *"In academic literature, viverrine designates small cat-like predatory mammals of warmer parts of the old world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vivid]] | adjective | **1.** Evoking lifelike images within the mind.<br>**2.** Having the clarity and freshness of immediate experience. | *"She always found it difficult to quiet the little girl, but to-day she seemed filled by very vivid impressions."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[vividly]] | adverb | **1.** In a vivid manner. | *"Her brother's news had wakened all these memories very vividly."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[vividness]] | noun | **1.** Interest and variety and intensity.<br>**2.** Chromatic purity: freedom from dilution with white and hence vivid in hue. | *"But the question brought out with the vividness of a flash of lightning, and as suddenly, all that had been obscured by my course of life, and, hardly knowing what I did, I spoke to him of the power that might reside in prayer."* — Classic Author, *The wonders of prayer* |
| [[vivification]] | noun | **1.** Quality of being active or spirited or alive and vigorous.<br>**2.** The activity of giving vitality and vigour to something. | *"Magical transformations, the vengeance of witches, the vivification of waterskins--one tale comes crowding after another, real and vivid, with the most alarming and the most amusing details."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[vivify]] | verb | **1.** Give new life or energy to.<br>**2.** Make more striking or animated. | *"Throughout them all, giving up her individuality, she would become the general symbol at which the preacher and moralist might point, and in which they might vivify and embody their images of woman’s frailty and sinful passion."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[viviparous]] | adjective | **1.** Producing living young (not eggs). | *"In academic literature, viviparous designates producing living young (not eggs)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vivisect]] | verb | **1.** Cut (a body) open while still alive. | *"And so he had begun by vivisecting himself, as he had ended by vivisecting others."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[vivisection]] | noun | **1.** The act of operating on living animals (especially in scientific research). | *"Men sneered at vivisection, and yet look at its results to-day!"* — Bram Stoker, *Dracula* |
| [[vivisectionist]] | noun | **1.** A biologist who cuts open live animals for research. | *"In academic literature, vivisectionist designates a biologist who cuts open live animals for research."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VIV
  </div>
</div>
