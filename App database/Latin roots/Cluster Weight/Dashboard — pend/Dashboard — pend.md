---
status: unread
type: root_dashboard
---
# Dashboard — pend
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pend-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to hang or weigh”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Lifting a dense iron dumbbell and feeling its heavy downward pull.</span>
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

The root **pend** means to hang or weigh. It refers to suspending something from above so that it swings freely. In English, this root forms words such as *depend*, *suspend*, *pendulum*, and *pendant*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to hang or weigh
> The root **pend** means to hang or weigh. It refers to suspending something from above so that it swings freely. In English, this root forms words such as *depend*, *suspend*, *pendulum*, and *pendant*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To hang or weigh</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Lifting a dense iron dumbbell and feeling its heavy downward pull.</mark>
> - **Everyday Connection**: Think of familiar words like *depend* and *suspend*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pend** comes from a Latin word that means *"to hang or weigh"*.
  - At its core, it describes the action of hang or weigh.

- **The Big Picture Idea**:
  - Picture lifting a dense iron dumbbell and feeling its heavy downward pull.
  - Whenever you see **pend** in an English word, think of **to hang or weigh**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to hang or weigh).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Depend**: To be controlled or determined by.
  - **Suspend**: To hang something from somewhere.
  - **Pendulum**: An everyday English word showing the root's idea of *to hang or weigh*.
  - **Pendant**: A piece of jewelry that hangs from a chain worn around the neck.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pend</mark>, think of <mark class="hl-def">to hang or weigh</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `pend-`: Present verbal stem ("to hang / weigh").
  - `pens-` (< Latin *pēnsum*): Participial and payment stem (*pension, expensive, compensate*).
  - `pois-` (Old French reduction < *pēnsum*): *poise*.
- **Prefix Machinery**:
  - `de-` ("down from"): *depend, dependent, dependence, independence*.
  - `sub-` ("under, up"): *suspend, suspension, suspense*.
  - `ad-` ("to, toward"): *append, appendage, appendix*.
  - `com-` ("together"): *compendium, compensate*.
  - `dis-` ("apart, out"): *dispense, dispensation*.
  - `ex-` ("out"): *expend, expenditure, expensive*.

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
                      ┌── Physical Suspension: pendant, pendent, pending, suspend, suspension, poise
                      │
   [pend] ────────────┼── Reliance & Autonomy: depend, dependent, dependence, independence
 (Hang / Weigh / Pay) │
                      ├── Commerce & Finance: expend, expenditure, expensive, pension, compensate, dispense
                      │
                      └── Thought & Synthesis: pensive, compendium, compendious, appendix, suspense
```

---

## 🔀 4. Prefix & Combining Dynamics on pend
- **`de-` + `pend`**: *depend* — to hang down from; rely on for support or outcome.
- **`sus-` + `pend`**: *suspend* — to hang from above; temporarily halt.
- **`com-` + `pens-` + `-ate`**: *compensate* — to balance opposing pans of a scale with payment.
- **`ex-` + `pend`**: *expend* — to weigh out money or energy.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Economics & Corporate Finance**: Capital *expenditures* (CapEx); *pension* funds; *expensive* overhead.
- **Civil & Tort Law**: Workers' *compensation*; punitive damages; legal *dispensations*.
- **Literature & Cinema**: Narrative *suspense*; cliffhangers; *compendiums* of folklore.
- **Anatomy & Zoology**: Vermiform *appendix*; *appendages* (limbs, antennae).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[append]] | verb | **1.** Add to the very end.<br>**2.** Fix to; attach. | *"The extracts which we append describe better the closing scenes of her life than we can."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[appendage]] | noun | **1.** An external body part that projects from the body.<br>**2.** A natural prolongation or projection from a part of an organism either animal or plant. | *"The latter faithful appendage is also invariably a part of the old girl’s presence out of doors."* — Charles Dickens, *Bleak House* |
| [[appendaged]] | adjective | **1.** Having an appendage. | *"In academic literature, appendaged designates having an appendage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appendant]] | adjective | **1.** Affixed as an appendage. | *"An impression of this seal on red wax is appendant to a conventual lease, temp."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[appendectomy]] | noun | **1.** Surgical removal of the vermiform appendix. | *"In academic literature, appendectomy designates surgical removal of the vermiform appendix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appendicectomy]] | noun | **1.** Surgical removal of the vermiform appendix. | *"In academic literature, appendicectomy designates surgical removal of the vermiform appendix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appendicitis]] | noun | **1.** Inflammation of the vermiform appendix. | *"Drury's floor was that Dorrie's pretty, sluttish little mother had been whisked off to the Cottage Hospital with appendicitis an hour earlier."* — Anthony Pryde, *Nightfall* |
| [[appendicle]] | noun | **1.** A small appendage. | *"In academic literature, appendicle designates a small appendage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appendicular]] | adjective | **1.** Relating to or consisting of an appendage or appendages; especially the limbs. | *"In academic literature, appendicular designates relating to or consisting of an appendage or appendages; especially the limbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appendicularia]] | noun | **1.** Free-swimming tadpole-shaped pelagic tunicate resembling larvae of other tunicates. | *"In academic literature, appendicularia designates free-swimming tadpole-shaped pelagic tunicate resembling larvae of other tunicates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appendix]] | noun | **1.** Supplementary material that is collected and appended at the back of a book.<br>**2.** A vestigial process that extends from the lower end of the cecum and that resembles a small pouch. | *"My master hath appointed me to go to Saint Luke’s to bid the priest be ready to come against you come with your appendix. [_Exit._] LUCENTIO."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compendious]] | adjective | **1.** Briefly giving the gist of something. | *"I’ll get a crucible, and into it, and dissolve myself down to one small, compendious vertebra."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[compendium]] | noun | **1.** A publication containing a variety of works.<br>**2.** A concise but comprehensive summary of a larger work. | *"Maclean's _Compendium of Kafir Laws and Customs_; Cape Town, 1866, p. 98)."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[depend]] | verb | **1.** Be contingent upon (something that is elided).<br>**2.** Have faith or confidence in. | *"Then need I not to fear the worst of wrongs, When in the least of them my life hath end, I see, a better state to me belongs Than that, which on thy humour doth depend."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dependability]] | noun | **1.** The quality of being dependable or reliable. | *"In academic literature, dependability designates the quality of being dependable or reliable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dependable]] | adjective | **1.** Worthy of reliance or trust.<br>**2.** Worthy of being depended on. | *"Often enough have I found the auxiliaries good soldiers, but never so steadily dependable as the Romans."* — Jack London, *The Jacket (The Star-Rover)* |
| [[dependableness]] | noun | **1.** The quality of being dependable or reliable. | *"In academic literature, dependableness designates the quality of being dependable or reliable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dependably]] | adverb | **1.** In a faithful manner. | *"In academic literature, dependably designates in a faithful manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dependance]] | noun | **1.** Being abnormally tolerant to and dependent on something that is psychologically or physically habit-forming (especially alcohol or narcotic drugs).<br>**2.** The state of relying on or being controlled by someone or something else. | *"Religion, my honoured Madam, has not only been all my life my chief dependance, but my dearest enjoyment."* — Robert Burns, *The Letters of Robert Burns* |
| [[dependant]] | noun | **1.** A person who relies on another person for support (especially financial support).<br>**2.** Contingent on something else. | *"I am an heire, sweet Ladie, How ever I appeare a poore dependant; Love you with honour, I shall love so ever; Is your eye ambitious?"* — John Fletcher, *The Elder Brother* |
| [[dependence]] | noun | **1.** The state of relying on or being controlled by someone or something else.<br>**2.** Being abnormally tolerant to and dependent on something that is psychologically or physically habit-forming (especially alcohol or narcotic drugs). | *"Yet, ne’ertheless, My spritely brethren, I propend to you In resolution to keep Helen still; For ’tis a cause that hath no mean dependence Upon our joint and several dignities."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dependency]] | noun | **1.** The state of relying on or being controlled by someone or something else.<br>**2.** Being abnormally tolerant to and dependent on something that is psychologically or physically habit-forming (especially alcohol or narcotic drugs). | *"Let me report to him Your sweet dependency, and you shall find A conqueror that will pray in aid for kindness Where he for grace is kneeled to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dependent]] | noun | **1.** A person who relies on another person for support (especially financial support).<br>**2.** Relying on or requiring a person or thing for support, supply, or what is needed. | *"He would on the whole admit nature to be a good idea (a little low, perhaps, when not enclosed with a park-fence), but an idea dependent for its execution on your great county families."* — Charles Dickens, *Bleak House* |
| [[ependyma]] | noun | **1.** Thin epithelial membrane lining the ventricles of the brain and the spinal cord canal. | *"In academic literature, ependyma designates thin epithelial membrane lining the ventricles of the brain and the spinal cord canal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expend]] | verb | **1.** Use up, consume fully.<br>**2.** Pay out. | *"If it will please you To show us so much gentry and good will As to expend your time with us awhile, For the supply and profit of our hope, Your visitation shall receive such thanks As fits a king’s remembrance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expendable]] | adjective | **1.** Suitable to be expended.<br>**2.** (used of funds) remaining after taxes. | *"You're telling me we're expendable?" "You're in covert intelligence work, Brad, and you'll be in the enemy's camp."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[expender]] | noun | **1.** Someone who spends money to purchase goods or services. | *"In academic literature, expender designates someone who spends money to purchase goods or services."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expending]] | noun | **1.** The act of spending money for goods or services.<br>**2.** Use up, consume fully. | *"One night I was sitting in the chimney corner with my slate, expending great efforts on the production of a letter to Joe."* — Charles Dickens, *Great Expectations* |
| [[expenditure]] | noun | **1.** Money paid out; an amount spent.<br>**2.** The act of spending money for goods or services. | *"The number of little acts of thoughtless expenditure which Richard justified by the recovery of his ten pounds, and the number of times he talked to me as if he had saved or realized that amount, would form a sum in simple addition."* — Charles Dickens, *Bleak House* |
| [[impend]] | verb | **1.** Be imminent or about to happen. | *"Honeythunder began to impend, must have been highly gratifying to the feelings of that distinguished man."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[impendence]] | noun | **1.** The state of being imminent and liable to happen soon. | *"In academic literature, impendence designates the state of being imminent and liable to happen soon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impendency]] | noun | **1.** The state of being imminent and liable to happen soon. | *"In academic literature, impendency designates the state of being imminent and liable to happen soon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impendent]] | adjective | **1.** Close in time; about to occur. | *"Well thou didst advise, Yet not for thy advise or threats I fly These wicked Tents devoted, least the wrauth Impendent, raging into sudden flame Distinguish not: for soon expect to feel His Thunder on thy head, devouring fire."* — John Milton, *Paradise Lost* |
| [[impending]] | verb | **1.** Be imminent or about to happen.<br>**2.** Close in time; about to occur. | *"Maxa assured them, however, that she understood the preparations for their impending trip and said that she would not disturb them longer than was necessary."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[independence]] | noun | **1.** Freedom from control or influence of another or others.<br>**2.** The successful ending of the american revolution. | *"Go to my lawyer (you remember where; you have been there before) and show your independence now, will you?"* — Charles Dickens, *Bleak House* |
| [[independency]] | noun | **1.** Freedom from control or influence of another or others. | *"It would, indeed, be a relief,” I thought, “if I had ever so small an independency; I never can bear being dressed like a doll by Mr."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[independent]] | noun | **1.** A neutral or uncommitted person (especially in politics).<br>**2.** A writer or artist who sells services to different employers without a long-term contract with any of them. | *"She firmly held the little girl's hand, for there was no telling what she might undertake otherwise, and the less independent Lippo held his mother's other hand, so that the two older brothers were obliged to accommodate their steps to the rest."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[interdepend]] | verb | **1.** Be connected. | *"In academic literature, interdepend designates be connected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interdependence]] | noun | **1.** A reciprocal relation between interdependent entities (objects or individuals or groups). | *"Ignoring past differences, he emphasized common interests, interdependence of peoples and nations, and benefits through collective efforts to meet the needs of the dispersed communities of humankind."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[interdependency]] | noun | **1.** A reciprocal relation between interdependent entities (objects or individuals or groups). | *"In academic literature, interdependency designates a reciprocal relation between interdependent entities (objects or individuals or groups)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interdependent]] | adjective | **1.** Mutually dependent. | *"They are interdependent." Unfolding his clasped hands, Narval's fingers drummed the desk."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[pendant]] | noun | **1.** An adornment that hangs from a piece of jewelry (necklace or earring).<br>**2.** Branched lighting fixture; often ornate; hangs from the ceiling. | *"Sometime we see a cloud that’s dragonish, A vapour sometime like a bear or lion, A towered citadel, a pendant rock, A forked mountain, or blue promontory With trees upon’t, that nod unto the world And mock our eyes with air."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pendent]] | noun | **1.** An adornment that hangs from a piece of jewelry (necklace or earring).<br>**2.** Branched lighting fixture; often ornate; hangs from the ceiling. | *"I asked, ‘Sophie, what are you doing?’ No one answered; but a form emerged from the closet; it took the light, held it aloft, and surveyed the garments pendent from the portmanteau. ‘Sophie!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[pending]] | adjective | **1.** Awaiting conclusion or confirmation. | *"I have just called to see you,” said Gabriel, pending her further speech."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[pendragon]] | noun | **1.** The supreme war chief of the ancient britons. | *"Not to be gone from hence; for once I read That stout Pendragon in his litter sick Came to the field and vanquished his foes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pendulous]] | adjective | **1.** Having branches or flower heads that bend downward. | *"Now all the plagues that in the pendulous air Hang fated o’er men’s faults light on thy daughters!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pendulum]] | noun | **1.** An apparatus consisting of an object mounted so that it swings freely under the influence of gravity. | *"Unfortunately the erratic crumb did not improve his narrative powers, and a supplementary hindrance was that of a sneeze, jerking from his pocket his rather large watch, which dangled in front of the young man pendulum-wise."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[perpendicular]] | noun | **1.** A straight line at right angles to another line.<br>**2.** A gothic style in 14th and 15th century england; characterized by vertical lines and a four-centered (tudor) arch and fan vaulting. | *"Owen, Owen, the same; and his son-in-law Mortimer, and old Northumberland, and that sprightly Scot of Scots, Douglas, that runs a-horseback up a hill perpendicular— PRINCE."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perpendicularity]] | noun | **1.** The relation of opposition between things at right angles.<br>**2.** The quality of being at right angles to a given line or plane (especially the plane of the horizon). | *"His square-framed perpendicularity showed more fully now than in the crowd and bustle of the market-house."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[perpendicularly]] | adverb | **1.** Straight up or down without a break.<br>**2.** In a perpendicular manner. | *"Ten masts at each make not the altitude Which thou hast perpendicularly fell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resuspend]] | verb | **1.** Put back into suspension. | *"In academic literature, resuspend designates put back into suspension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stipend]] | noun | **1.** A sum of money allotted on a regular basis; usually for some specific purpose. | *"Whereas from our present _via media_--facilitation of divorce--can only result the era when the young lady in reduced circumstances will no longer turn governess but will be open to engagement as wife at a reasonable stipend."* — Francis Thompson, *Shelley: An Essay* |
| [[stipendiary]] | noun | **1.** (united kingdom) a paid magistrate (appointed by the home secretary) dealing with police cases.<br>**2.** Pertaining to or of the nature of a stipend or allowance. | *"On his at length responding, he was shown by a miserably shabby and underpaid stipendiary Philanthropist (who could hardly have done worse if he had taken service with a declared enemy of the human race) to Mr."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[suspend]] | verb | **1.** Hang freely.<br>**2.** Cause to be held in suspension in a fluid. | *"Suspend thy purpose, if thou didst intend To make this creature fruitful!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suspended]] | verb | **1.** Hang freely.<br>**2.** Cause to be held in suspension in a fluid. | *"The town awakes; the great tee-totum is set up for its daily spin and whirl; all that unaccountable reading and writing, which has been suspended for a few hours, recommences."* — Charles Dickens, *Bleak House* |
| [[suspender]] | noun | **1.** Elastic straps that hold trousers up (usually used in the plural). | *"Between him and the grave there was seldom anything more than a single suspender and the hope of a meal which would at the same time support life and make it insupportable."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[unappendaged]] | adjective | **1.** Not having an appendage. | *"In academic literature, unappendaged designates not having an appendage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undependability]] | noun | **1.** The trait of not being dependable or reliable. | *"In academic literature, undependability designates the trait of not being dependable or reliable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undependable]] | adjective | **1.** Not worthy of reliance or trust.<br>**2.** Liable to be erroneous or misleading. | *"In academic literature, undependable designates not worthy of reliance or trust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undependableness]] | noun | **1.** The trait of not being dependable or reliable. | *"In academic literature, undependableness designates the trait of not being dependable or reliable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undependably]] | adverb | **1.** In an unfaithful undependable unreliable manner. | *"In academic literature, undependably designates in an unfaithful undependable unreliable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexpendable]] | adjective | **1.** Not suitable to be expended. | *"In academic literature, unexpendable designates not suitable to be expended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexpended]] | adjective | **1.** (of financial resources) not spent.<br>**2.** Not used up. | *"There was, it might be said, the energy of her mother’s unexpended family, as well as the natural energy of Tess’s years, rekindled after the experience which had so overwhelmed her for the time."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Weight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PEND
  </div>
</div>
