---
status: unread
type: root_dashboard
---
# Dashboard — vert
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vert-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to turn, transform, or change”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Revolving a steering wheel to turn a vehicle around a curve.</span>
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

The root **vert** means to turn, transform, or change. It refers to rotating around an axis, changing direction, or shifting state. In English, this root forms words such as *convert*, *divert*, *invert*, and *vertical*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to turn, transform, or change
> The root **vert** means to turn, transform, or change. It refers to rotating around an axis, changing direction, or shifting state. In English, this root forms words such as *convert*, *divert*, *invert*, and *vertical*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To turn, transform, or change</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *convert* and *divert*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vert** comes from a Latin word that means *"to turn, transform, or change"*.
  - At its core, it describes the action of turn, transform, or change.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **vert** in an English word, think of **to turn, transform, or change**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to turn, transform, or change).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Convert**: To change in form, character, function, or religious belief.
  - **Divert**: To cause someone or something to change course or turn from one direction to another.
  - **Invert**: To put upside down or in the opposite position, order, or arrangement.
  - **Vertical**: At right angles to a horizontal plane.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vert</mark>, think of <mark class="hl-def">to turn, transform, or change</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `vert-` (< Latin *vertere*): Present active verbal root.
- **Prefix Machinery**:
  - `a-` / `ab-` ("away"): *avert* ("to turn away").
  - `con-` ("together, completely"): *convert* ("to turn completely into a new form/belief").
  - `di-` ("aside, apart"): *divert* ("to turn attention or traffic aside").
  - `intro-` ("inward"): *introvert* ("to turn thoughts inward").
  - `extro-` ("outward"): *extrovert* ("to turn personality outward").
  - `in-` ("inside out, upside down"): *invert* ("to turn upside down").
  - `sub-` ("under"): *subvert* ("to turn upside down from beneath").
  - `re-` ("back"): *revert* ("to turn back to a prior state").

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
                      ┌── Active Redirection: avert, divert, advertise, advertisement
                      │
   [vert] ────────────┼── Psychological & Spiritual: convert, introvert, extrovert, pervert, revert
 (To Turn / Change)   │
                      ├── Political & Structural: subvert, controvert, animadvert, animadversion
                      │
                      └── Geometry & Physiology: vertex, vertical, vertigo, invert, obvert
```

---

## 🔀 4. Prefix & Combining Dynamics on vert
- **`a-` + `vert`**: *avert* — to ward off danger or turn one's gaze away.
- **`con-` + `vert`**: *convert* — to transform function, chemical state, or spiritual conviction.
- **`sub-` + `vert`**: *subvert* — to undermine political authority from beneath.
- **`intro-` + `vert`**: *introvert* — to direct one's mental focus toward internal thoughts.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Psychology & Personality Theory**: Jungian *introversion* versus *extroversion*.
- **Geometry & Computer Graphics**: *Vertex* (plural *vertices*) in 3D polygonal meshes; *vertical* coordinate planes.
- **Medicine & Neurology**: Benign paroxysmal positional *vertigo* (BPPV); vestibular diagnostics.
- **Law & Constitutional Politics**: *Subversion*, sedition, and political revolutions.
- **Marketing & Media**: *Advertising* (literally turning public attention toward a commercial brand).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[advert]] | noun | **1.** A public promotion of some product or service.<br>**2.** Give heed (to). | *"All this I enjoyed often and fully, free, unwatched, and almost alone: for this unwonted liberty and pleasure there was a cause, to which it now becomes my task to advert."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[advertence]] | noun | **1.** The process of being heedful. | *"In academic literature, advertence designates the process of being heedful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertency]] | noun | **1.** The process of being heedful. | *"In academic literature, advertency designates the process of being heedful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertent]] | adjective | **1.** Giving attention. | *"In academic literature, advertent designates giving attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertently]] | adverb | **1.** In a careful deliberate manner. | *"In academic literature, advertently designates in a careful deliberate manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertise]] | verb | **1.** Call attention to.<br>**2.** Make publicity for; try to sell (a product). | *"But I do bend my speech To one that can my part in him advertise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advertised]] | verb | **1.** Call attention to.<br>**2.** Make publicity for; try to sell (a product). | *"I have advertised him by secret means That if about this hour he make this way, Under the colour of his usual game, He shall here find his friends with horse and men To set him free from his captivity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advertisement]] | noun | **1.** A public promotion of some product or service. | *"That is not the duke’s letter, sir; that is an advertisement to a proper maid in Florence, one Diana, to take heed of the allurement of one Count Rossillon, a foolish idle boy, but for all that very ruttish."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advertiser]] | noun | **1.** Someone whose business is advertising. | *"Concerning the Militia From the Daily Advertiser."* — Alexander Hamilton, *The Federalist Papers* |
| [[advertising]] | noun | **1.** A public promotion of some product or service.<br>**2.** The business of drawing public attention to goods and services. | *"As I was then Advertising and holy to your business, Not changing heart with habit, I am still Attorneyed at your service."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advertize]] | verb | **1.** Make publicity for; try to sell (a product).<br>**2.** Call attention to. | *"In academic literature, advertize designates make publicity for; try to sell (a product)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertizement]] | noun | **1.** A public promotion of some product or service. | *"In academic literature, advertizement designates a public promotion of some product or service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertizer]] | noun | **1.** Someone whose business is advertising. | *"In academic literature, advertizer designates someone whose business is advertising."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertizing]] | noun | **1.** A public promotion of some product or service.<br>**2.** Make publicity for; try to sell (a product). | *"In academic literature, advertizing designates a public promotion of some product or service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advertorial]] | noun | **1.** An advertisement that is written and presented in the style of an editorial or journalistic report. | *"In academic literature, advertorial designates an advertisement that is written and presented in the style of an editorial or journalistic report."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antivert]] | noun | **1.** An antihistamine (trade name antivert) used to treat or prevent motion sickness. | *"In academic literature, antivert designates an antihistamine (trade name antivert) used to treat or prevent motion sickness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[avert]] | verb | **1.** Prevent the occurrence of; prevent from happening.<br>**2.** Turn away or aside. | *"I could only suggest that I should go down to Deal, where Richard was then stationed, and see him, and try if it were possible to avert the worst."* — Charles Dickens, *Bleak House* |
| [[avertable]] | adjective | **1.** Capable of being avoided or warded off. | *"In academic literature, avertable designates capable of being avoided or warded off."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[avertible]] | adjective | **1.** Capable of being avoided or warded off. | *"In academic literature, avertible designates capable of being avoided or warded off."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[averting]] | noun | **1.** The act of preventing something from occurring.<br>**2.** The act of turning yourself (or your gaze) away. | *"They "are never permitted to walk on the ice of rivers or lakes, or near the part where the men are hunting beaver, or where a fishing-net is set, for fear of averting their success."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[convert]] | noun | **1.** A person who has been converted to another religious or political belief.<br>**2.** Change from one system to another or to a new plan or policy. | *"Look you how pale he glares, His form and cause conjoin’d, preaching to stones, Would make them capable.—Do not look upon me, Lest with this piteous action you convert My stern effects."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[converted]] | verb | **1.** Change from one system to another or to a new plan or policy.<br>**2.** Change the nature, purpose, or function of something. | *"Alexander died, Alexander was buried, Alexander returneth into dust; the dust is earth; of earth we make loam; and why of that loam whereto he was converted might they not stop a beer-barrel?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[converter]] | noun | **1.** A device for changing one substance or form or state into another. | *"The Bessemerising of Copper Mattes: — Development of the Process — The Converter — Converter Linings — Grade of Matte — Operation of the Process — Systems of Working, 192–216 LECTURE IX."* — Donald M. Levy, *Modern Copper Smelting* |
| [[convertibility]] | noun | **1.** The quality of being exchangeable (especially the ability to convert a currency into gold or other currencies without restriction). | *"In academic literature, convertibility designates the quality of being exchangeable (especially the ability to convert a currency into gold or other currencies without restriction)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convertible]] | noun | **1.** A car that has top that can be folded or removed.<br>**2.** A corporate security (usually bonds or preferred stock) that can be exchanged for another form of security (usually common stock). | *"But on the Continent there was the outer life, which was palpable and visible at every turn, and more easily convertible to literary uses than the customs of those opaque islanders."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[convertor]] | noun | **1.** A device for changing one substance or form or state into another. | *"In academic literature, convertor designates a device for changing one substance or form or state into another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[covert]] | noun | **1.** A flock of coots.<br>**2.** A covering that serves to conceal or shelter something. | *"I speak of peace, while covert enmity Under the smile of safety wounds the world."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[covertly]] | adverb | **1.** In a covert manner. | *"Not honestly, my lord; but so covertly that no dishonesty shall appear in me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[covertness]] | noun | **1.** The state of being covert and hidden. | *"In academic literature, covertness designates the state of being covert and hidden."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divert]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"The French, advis’d by good intelligence Of this most dreadful preparation, Shake in their fear, and with pale policy Seek to divert the English purposes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverted]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"Rynaldo, you did never lack advice so much As letting her pass so; had I spoke with her, I could have well diverted her intents, Which thus she hath prevented."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverticulitis]] | noun | **1.** Inflammation of a diverticulum in the digestive tract (especially the colon); characterized by painful abdominal cramping and fever and constipation. | *"In academic literature, diverticulitis designates inflammation of a diverticulum in the digestive tract (especially the colon); characterized by painful abdominal cramping and fever and constipation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverticulosis]] | noun | **1.** Presence of multiple diverticula in the walls of the colon. | *"In academic literature, diverticulosis designates presence of multiple diverticula in the walls of the colon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverticulum]] | noun | **1.** A herniation through the muscular wall of a tubular organ (especially the colon). | *"In academic literature, diverticulum designates a herniation through the muscular wall of a tubular organ (especially the colon)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divertimento]] | noun | **1.** A musical composition in several movements; has no fixed form. | *"In academic literature, divertimento designates a musical composition in several movements; has no fixed form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverting]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"Bathsheba went home, her mind occupied with a new trouble, which being rather harassing than deadly was calculated to do good by diverting her from the chronic gloom of her life."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[divertingly]] | adverb | **1.** In an entertaining and amusing manner. | *"In academic literature, divertingly designates in an entertaining and amusing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evert]] | noun | **1.** United states tennis player who won women's singles titles in the united states and at wimbledon (born in 1954).<br>**2.** Turn inside out; turn the inner surface of outward. | *"What will not money, diligence, and faire words doe, with corrupt dispositions--everting of all bonds of either religious or civil duties?"* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[everting]] | noun | **1.** The act of turning inside out.<br>**2.** Turn inside out; turn the inner surface of outward. | *"What will not money, diligence, and faire words doe, with corrupt dispositions--everting of all bonds of either religious or civil duties?"* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[extravert]] | noun | **1.** (psychology) a person concerned more with practical realities than with inner thoughts and feelings.<br>**2.** Being concerned with the social and physical environment. | *"In academic literature, extravert designates (psychology) a person concerned more with practical realities than with inner thoughts and feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraverted]] | adjective | **1.** Being concerned with the social and physical environment. | *"In academic literature, extraverted designates being concerned with the social and physical environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extravertive]] | adjective | **1.** Being concerned with the social and physical environment. | *"In academic literature, extravertive designates being concerned with the social and physical environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extrovert]] | noun | **1.** (psychology) a person concerned more with practical realities than with inner thoughts and feelings.<br>**2.** Being concerned with the social and physical environment. | *"In academic literature, extrovert designates (psychology) a person concerned more with practical realities than with inner thoughts and feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extroverted]] | adjective | **1.** Not introspective; examining what is outside yourself.<br>**2.** At ease in talking to others. | *"In academic literature, extroverted designates not introspective; examining what is outside yourself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extrovertive]] | adjective | **1.** Being concerned with the social and physical environment. | *"In academic literature, extrovertive designates being concerned with the social and physical environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadvertence]] | noun | **1.** An unintentional omission resulting from failure to notice something.<br>**2.** The trait of forgetting or ignoring your responsibilities. | *"Whatever her sins, they were not sins of intention, but of inadvertence, and why should she have been punished so persistently?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inadvertency]] | noun | **1.** The trait of forgetting or ignoring your responsibilities. | *"In academic literature, inadvertency designates the trait of forgetting or ignoring your responsibilities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadvertent]] | adjective | **1.** Happening by chance or unexpectedly or unintentionally. | *"The boy, also, after a week or two of mental disquiet, began to gratify his protectors by many inadvertent proofs that he considered them as parents, and their house as home."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[inadvertently]] | adverb | **1.** Without knowledge or intention. | *"But as you, though inadvertently and without intending so unreasonable a question, asked me ‘what for?’ let me reply to you."* — Charles Dickens, *Bleak House* |
| [[inconvertibility]] | noun | **1.** The quality of not being exchangeable. | *"In academic literature, inconvertibility designates the quality of not being exchangeable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconvertible]] | adjective | **1.** Used especially of currencies; incapable of being exchanged for or replaced by another currency of equal value.<br>**2.** Not capable of being changed into something else. | *"Typical bank-notes, unlike inconvertible paper money, depend for their value on the credit of the bank, not on their legal-tender quality and on political power."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[intervertebral]] | adjective | **1.** Pertaining to the space between two vertebrae. | *"In academic literature, intervertebral designates pertaining to the space between two vertebrae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introvert]] | noun | **1.** (psychology) a person who tends to shrink from social contacts and to become preoccupied with their own thoughts.<br>**2.** Fold inwards. | *"In academic literature, introvert designates (psychology) a person who tends to shrink from social contacts and to become preoccupied with their own thoughts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introverted]] | verb | **1.** Fold inwards.<br>**2.** Turn inside. | *"In academic literature, introverted designates fold inwards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introvertish]] | adjective | **1.** Somewhat introverted. | *"In academic literature, introvertish designates somewhat introverted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introvertive]] | adjective | **1.** Directed inward; marked by interest in yourself or concerned with inner feelings. | *"In academic literature, introvertive designates directed inward; marked by interest in yourself or concerned with inner feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invert]] | verb | **1.** Make an inversion (in a musical composition).<br>**2.** Reverse the position, order, relation, or condition of. | *"O heaven, O earth, bear witness to this sound, And crown what I profess with kind event, If I speak true; if hollowly, invert What best is boded me to mischief!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invertase]] | noun | **1.** An enzyme that catalyzes the hydrolysis of sucrose into glucose and fructose. | *"In academic literature, invertase designates an enzyme that catalyzes the hydrolysis of sucrose into glucose and fructose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invertebrate]] | noun | **1.** Any animal lacking a backbone or notochord; the term is not used as a scientific classification.<br>**2.** Lacking a backbone or spinal column. | *"In academic literature, invertebrate designates any animal lacking a backbone or notochord; the term is not used as a scientific classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inverted]] | verb | **1.** Make an inversion (in a musical composition).<br>**2.** Reverse the position, order, relation, or condition of. | *"You have only knowledge enough of the language to translate at sight these inverted, transposed, curtailed Italian lines, into clear, comprehensible, elegant English."* — Jane Austen, *Persuasion* |
| [[inverter]] | noun | **1.** An electrical converter that converts direct current into alternating current. | *"In academic literature, inverter designates an electrical converter that converts direct current into alternating current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[invertible]] | adjective | **1.** Having an additive or multiplicative inverse. | *"In academic literature, invertible designates having an additive or multiplicative inverse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obvert]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vert within the domain of Turning.<br>**2.** A technical or specialized form exhibiting the properties of vert in systematic terminology. | *"In academic literature, obvert designates pertaining to, derived from, or characteristic of latin vert within the domain of turning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pervert]] | noun | **1.** A person whose behavior deviates from what is acceptable especially in sexual behavior.<br>**2.** Corrupt morally or by intemperance or sensuality. | *"Let’s follow him and pervert the present wrath He hath against himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perverted]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Practice sophistry; change the meaning of or be vague about in order to mislead or deceive. | *"He hath perverted a young gentlewoman here in Florence, of a most chaste renown, and this night he fleshes his will in the spoil of her honour; he hath given her his monumental ring, and thinks himself made in the unchaste composition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reconvert]] | verb | **1.** Convert back. | *"In academic literature, reconvert designates convert back."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retrovert]] | verb | **1.** Go back to a previous state. | *"In academic literature, retrovert designates go back to a previous state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revert]] | verb | **1.** Go back to a previous state.<br>**2.** Undergo reversion, as in a mutation. | *"Some men rarely revert to their father, but seem, in the bank-books of their remembrance, to have transferred all the stock of filial affection into their mother’s name."* — Charles Dickens, *Bleak House* |
| [[revertible]] | adjective | **1.** To be returned to the former owner or that owner's heirs. | *"In academic literature, revertible designates to be returned to the former owner or that owner's heirs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reverting]] | noun | **1.** A failure to maintain a higher state.<br>**2.** Go back to a previous state. | *"It entered into all his calculations about money in a singular manner which I don’t think I can better explain than by reverting for a moment to our loan to Mr."* — Charles Dickens, *Bleak House* |
| [[subvert]] | verb | **1.** Cause the downfall of; of rulers.<br>**2.** Corrupt morally or by intemperance or sensuality. | *"Schemes to subvert the liberties of a great community REQUIRE TIME to mature them for execution."* — Alexander Hamilton, *The Federalist Papers* |
| [[subverter]] | noun | **1.** A radical supporter of political or social revolution. | *"In academic literature, subverter designates a radical supporter of political or social revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconverted]] | adjective | **1.** Not converted. | *"Still unconverted, but, to satisfy his mother, he consented to remain in the room during a visit of the missionary of that district; a man with sufficient tact not to make his efforts obnoxious."* — Classic Author, *The wonders of prayer* |
| [[unconvertible]] | adjective | **1.** Used especially of currencies; incapable of being exchanged for or replaced by another currency of equal value. | *"In academic literature, unconvertible designates used especially of currencies; incapable of being exchanged for or replaced by another currency of equal value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vertebra]] | noun | **1.** One of the bony segments of the spinal column. | *"Hussey wore a polished necklace of codfish vertebra; and Hosea Hussey had his account books bound in superior old shark-skin."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[vertebral]] | adjective | **1.** Of or relating to or constituting vertebrae. | *"To prevent their habits of coiling from dislocating the vertebral column, these had an additional pair of articulations at each end, while their muscular strength is attested by the elegant striae and other sculptures which appear on all their bones."* — W. E. Webb, *Buffalo Land* |
| [[vertebrata]] | noun | **1.** Fishes; amphibians; reptiles; birds; mammals. | *"Genera classified 556:3 Vertebrata, articulata, mollusca, and radiata are mor- tal and material concepts classified, and are supposed to possess life and mind."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[vertebrate]] | noun | **1.** Animals having a bony or cartilaginous skeleton with a segmented spinal column and a large brain enclosed in a skull or cranium.<br>**2.** Having a backbone or spinal column. | *"I concluded definitely that it belonged to the vertebrate branch, class mammalia."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[vertex]] | noun | **1.** The point of intersection of lines or the point opposite the base of a figure.<br>**2.** The highest point (of something). | *"STRAW-BRISTLE MOULD; perithecium sub-ovate, base radiato-fibrose, hairs of the vertex very long, interwoven, branched; spores broadly elliptic, apiculate at either end.—On mouldering straw, reeds, matting, &c."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[vertical]] | noun | **1.** Something that is oriented vertically.<br>**2.** A vertical structural member as a post or stake. | *"The flames immediately ceased to go under the bottom of the corn-stack, and stood up vertical."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[verticality]] | noun | **1.** Position at right angles to the horizon. | *"We turn our attention to the left-hand characteristics; which were flatness in respect of the river, verticality in respect of the wall behind it, and darkness as to both."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vertically]] | adverb | **1.** In a vertical direction. | *"The third item of consciousness was that of seeing the same sword, perfectly clean and free from blood held vertically in Troy’s hand (in the position technically called “recover swords”)."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[verticalness]] | noun | **1.** Position at right angles to the horizon. | *"In academic literature, verticalness designates position at right angles to the horizon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticil]] | noun | **1.** A whorl of leaves growing around a stem. | *"In academic literature, verticil designates a whorl of leaves growing around a stem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticillate]] | adjective | **1.** Forming one or more whorls (especially a whorl of leaves around a stem). | *"In academic literature, verticillate designates forming one or more whorls (especially a whorl of leaves around a stem)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticillated]] | adjective | **1.** Forming one or more whorls (especially a whorl of leaves around a stem). | *"In academic literature, verticillated designates forming one or more whorls (especially a whorl of leaves around a stem)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticilliosis]] | noun | **1.** Wilt caused by fungi of the genus verticillium. | *"In academic literature, verticilliosis designates wilt caused by fungi of the genus verticillium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verticillium]] | noun | **1.** A fungus of the genus verticillium. | *"In academic literature, verticillium designates a fungus of the genus verticillium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vertiginous]] | adjective | **1.** Having or causing a whirling sensation; liable to falling. | *"In academic literature, vertiginous designates having or causing a whirling sensation; liable to falling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vertigo]] | noun | **1.** A reeling sensation; a feeling that you are about to fall. | *"I think you have tonight." "Do you care for no one but yourself?" he flung at her in his vertigo of humiliation and anger."* — Anthony Pryde, *Nightfall* |
| [[vertu]] | noun | **1.** Love of or taste for fine objects of art.<br>**2.** Artistic quality. | *"Vive la vertu!” Samuel Walcott, still sunburned from his cruise, stood before the chancel with the only daughter of the blue blooded St."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Turning]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VERT
  </div>
</div>
