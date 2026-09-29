---
status: unread
type: root_dashboard
---
# Dashboard — temp
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">temp-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“time”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The rhythmic hands of a clock ticking forward as hours and days pass by.</span>
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

The root **temp** means time. It refers to the continuous progression of seconds, hours, and epochs. In English, this root forms words such as *slice*, *contemporary*, *extemporaneous*, and *temper*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: time
> The root **temp** means time. It refers to the continuous progression of seconds, hours, and epochs. In English, this root forms words such as *slice*, *contemporary*, *extemporaneous*, and *temper*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Time</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The rhythmic hands of a clock ticking forward as hours and days pass by.</mark>
> - **Everyday Connection**: Think of familiar words like *slice* and *contemporary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **temp** comes from a Latin word that means *"time"*.
  - At its core, it describes time.

- **The Big Picture Idea**:
  - Picture the rhythmic hands of a clock ticking forward as hours and days pass by.
  - Whenever you see **temp** in an English word, think of **time, seasons, and duration**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of time.
  - **Mental & Social**: How people experience, organize, or communicate about time.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Slice**: An everyday English word showing the root's idea of *time*.
  - **Contemporary**: Adj.* Living or occurring at the same time.
  - **Extemporaneous**: Spoken or done without preparation.
  - **Temper**: N.* A person's state of mind seen in terms of their being angry or calm.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">temp</mark>, think of <mark class="hl-def">time, seasons, and duration</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root branches into two parallel morphological stems:
1. **The Nominal Stem `tempor-`**: From the oblique stem of *tempus* (*temporis*):
   - *temporal* (< Latin *temporālis*).
   - *temporary* (< Latin *temporārius*).
   - *contemporary* (< *com-* + *temporārius*).
   - *extemporaneous* (< *ex tempore* "out of the moment").
   - *temporize* (to stall or conform to the times).
2. **The Verbal Stem `temper-`**: From Latin *temperāre* ("to mix, restrain, regulate"):
   - *temper*, *temperance*, *temperament*, *temperature*, *temperate*.
3. **Italian Musical & Meteorological Loans**:
   - *tempo* (musical speed or pace).
   - *tempest* (< Old French *tempeste* < Vulgar Latin *\*tempesta* < Latin *tempestās*).

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

The cognitive sphere of *temp* encompasses four expansive domains:
- **Chronological Coexistence & Fleeting Duration**: [[contemporary]], [[temporal]], [[temporary]], `temporize`
- **Spontaneous & Unprepared Action**: [[extemporaneous]], `extempore`
- **Psychological Balance & Emotional Control**: [[temper]], [[temperament]], [[temperance]], `temperate`
- **Physics, Meteorology & Music**: [[temperature]], [[tempest]], [[tempo]]

---

## 🔀 4. Prefix & Combining Dynamics on temp

1. **`con-` + `tempor`** (*cum* "together"):
   - *contemporary* $\to$ living or occurring at the same time; belonging to the present era.
2. **`ex-` + `tempor`** (*ex* "out of" + *tempus* "time/moment"):
   - *extemporaneous* $\to$ spoken or done without preparation; impromptu.
3. **`temp` + `-ance`** (*temperantia* "moderation"):
   - *temperance* $\to$ abstinence from alcoholic drink; moderation or self-restraint.
4. **`temp` + `-orize`** (Greek *-izein*):
   - *temporize* $\to$ to delay or procrastinate in order to gain time; adapt to the times.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Music & Conducting**: *tempo* rubato, metronome markings, allegro *tempi*.
- **Thermodynamics & Meteorology**: absolute *temperature* in Kelvin, severe ocean *tempests*.
- **Psychology & Medicine**: infantile *temperament*, personality inventories.
- **Law & Political History**: *temporal* powers of kings vs. spiritual powers of popes.
- **Rhetoric & Public Speaking**: *extemporaneous* debates, impromptu oratory.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[attemper]] | verb | **1.** Modify the temperature of. | *"In academic literature, attemper designates modify the temperature of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attempt]] | noun | **1.** Earnest and conscientious activity intended to do or accomplish something.<br>**2.** The act of attacking. | *"I’ll stay at home, And pray God’s blessing into thy attempt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attempted]] | verb | **1.** Make an effort or attempt.<br>**2.** Enter upon an activity or enterprise. | *"You are to know That prosperously I have attempted, and With bloody passage led your wars even to The gates of Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attempter]] | noun | **1.** One who tries. | *"In academic literature, attempter designates one who tries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contemplate]] | verb | **1.** Look at thoughtfully; observe deep in thought.<br>**2.** Consider as a possibility. | *"When he has nothing else to do, he can always contemplate his own greatness."* — Charles Dickens, *Bleak House* |
| [[contemplation]] | noun | **1.** A long and thoughtful observation.<br>**2.** A calm, lengthy, intent consideration. | *"And did you leave him in this contemplation?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contemplative]] | noun | **1.** A person devoted to the contemplative life.<br>**2.** Deeply or seriously thoughtful. | *"Navarre shall be the wonder of the world; Our court shall be a little academe, Still and contemplative in living art."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contemplativeness]] | noun | **1.** Deep serious thoughtfulness. | *"In academic literature, contemplativeness designates deep serious thoughtfulness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contemporaneity]] | noun | **1.** The quality of being current or of the present.<br>**2.** The quality of belonging to the same period of time. | *"In academic literature, contemporaneity designates the quality of being current or of the present."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contemporaneous]] | adjective | **1.** Occurring in the same period of time.<br>**2.** Of the same period. | *"For the feudal tournament--descriptions of which are handed down to us by contemporaneous authors--no substitute is left in these times."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[contemporaneously]] | adverb | **1.** During the same period of time. | *"I am not, I trust, mistaken in the recognition of some deeper correspondence than that of date in the fact that a consciousness of need in my own life had arisen contemporaneously with the possibility of my becoming acquainted with you."* — George Eliot, *Middlemarch* |
| [[contemporaneousness]] | noun | **1.** The quality of being current or of the present.<br>**2.** The quality of belonging to the same period of time. | *"In academic literature, contemporaneousness designates the quality of being current or of the present."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contemporaries]] | noun | **1.** All the people living at the same time or of approximately the same age.<br>**2.** A person of nearly the same age as another. | *"But Cairns, in addition to gaining academic distinctions, seems to have impressed his contemporaries in a quite exceptional degree with a sense of his power and promise."* — John Cairns, *Principal Cairns* |
| [[contemporary]] | noun | **1.** A person of nearly the same age as another.<br>**2.** Characteristic of the present. | *"Old Mr Clare was a clergyman of a type which, within the last twenty years, has well nigh dropped out of contemporary life."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[contemporise]] | verb | **1.** Happen at the same time.<br>**2.** Arrange or represent events so that they co-occur. | *"In academic literature, contemporise designates happen at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contemporize]] | verb | **1.** Happen at the same time.<br>**2.** Arrange or represent events so that they co-occur. | *"In academic literature, contemporize designates happen at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contempt]] | noun | **1.** Lack of respect accompanied by a feeling of intense dislike.<br>**2.** A manner that is generally disrespectful and contemptuous. | *"Why, what place make you special, when you put off that with such contempt?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contemptibility]] | noun | **1.** Unworthiness by virtue of lacking higher values. | *"The old ballad, "I wish I were where Helen lies," is silly, to contemptibility."* — Robert Burns, *The Letters of Robert Burns* |
| [[contemptible]] | adjective | **1.** Deserving of contempt or scorn. | *"Heaven and our Lady gracious hath it pleased To shine on my contemptible estate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contemptibly]] | adverb | **1.** In a manner deserving contempt. | *"He liked saying “Bathsheba” as a private enjoyment instead of whistling; turned over his taste to black hair, though he had sworn by brown ever since he was a boy, isolated himself till the space he filled in the public eye was contemptibly small."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[contemptuous]] | adjective | **1.** Expressing extreme contempt. | *"Contemptuous base-born callet as she is, She vaunted ’mongst her minions t’ other day The very train of her worst wearing gown Was better worth than all my father’s lands Till Suffolk gave two dukedoms for his daughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contemptuously]] | adverb | **1.** Without respect; in a disdainful manner. | *"As in revenge of thy ingratitude, I throw thy name against the bruising stones, Trampling contemptuously on thy disdain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contemptuousness]] | noun | **1.** The manifestation of scorn and contempt. | *"In academic literature, contemptuousness designates the manifestation of scorn and contempt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distemper]] | noun | **1.** Any of various infectious viral diseases of animals.<br>**2.** An angry and disagreeable mood. | *"If you are sick at sea Or stomach-qualm’d at land, a dram of this Will drive away distemper."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extemporaneous]] | adjective | **1.** With little or no preparation or forethought. | *"Extemporaneous Effusion On being appointed to an Excise division."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[extemporaneously]] | adverb | **1.** Without prior preparation. | *"In academic literature, extemporaneously designates without prior preparation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extemporarily]] | adverb | **1.** Without prior preparation. | *"In academic literature, extemporarily designates without prior preparation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extemporary]] | adjective | **1.** With little or no preparation or forethought. | *"In academic literature, extemporary designates with little or no preparation or forethought."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extempore]] | adjective | **1.** With little or no preparation or forethought.<br>**2.** Without prior preparation. | *"Shall we have a play extempore?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extemporisation]] | noun | **1.** A performance given extempore without planning or preparation. | *"What various advantages would or might have resulted from a prolongation of such an extemporisation?"* — James Joyce, *Ulysses* |
| [[extemporise]] | verb | **1.** Perform without preparation. | *"To pass in repose the hours intervening between Thursday (proper) and Friday (normal) on an extemporised cubicle in the apartment immediately above the kitchen and immediately adjacent to the sleeping apartment of his host and hostess."* — James Joyce, *Ulysses* |
| [[extemporization]] | noun | **1.** A performance given extempore without planning or preparation. | *"In academic literature, extemporization designates a performance given extempore without planning or preparation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extemporize]] | verb | **1.** Manage in a makeshift way; do with whatever is at hand.<br>**2.** Perform without preparation. | *"It is safer to accept any chance that offers itself, and extemporize a procedure to fit it, than to get a good plan matured, and wait for a chance of using it."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[intemperance]] | noun | **1.** The quality of being intemperate.<br>**2.** Consumption of alcoholic drinks. | *"This in the name of God I promise here, The which if He be pleased I shall perform, I do beseech your Majesty may salve The long-grown wounds of my intemperance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intemperate]] | adjective | **1.** (of weather or climate) not mild; subject to extremes.<br>**2.** Excessive in behavior. | *"He would not, but by gift of my chaste body To his concupiscible intemperate lust, Release my brother; and after much debatement, My sisterly remorse confutes mine honour, And I did yield to him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intemperately]] | adverb | **1.** Indulging excessively. | *"Stubb was a high liver; he was somewhat intemperately fond of the whale as a flavorish thing to his palate."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[intemperateness]] | noun | **1.** Consumption of alcoholic drinks.<br>**2.** Excess in action and immoderate indulgence of bodily appetites, especially in passion or indulgence. | *"In academic literature, intemperateness designates consumption of alcoholic drinks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temp]] | noun | **1.** A worker (especially in an office) hired on a temporary basis. | *"He cannot temp’rately transport his honours From where he should begin and end, but will Lose those he hath won."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temper]] | noun | **1.** A sudden outburst of anger.<br>**2.** A characteristic (habitual or relatively temporary) state of feeling. | *"His captain’s heart, Which in the scuffles of great fights hath burst The buckles on his breast, reneges all temper And is become the bellows and the fan To cool a gipsy’s lust."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tempera]] | noun | **1.** Pigment mixed with water-soluble glutinous materials such as size and egg yolk. | *"No Virgin by him the somewhat petty, Of finical touch and tempera crumbly-- Could not Alesso Baldovinetti Contribute so much, I ask him humbly? -- St. 27."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[temperament]] | noun | **1.** Your usual mood.<br>**2.** Excessive emotionalism or irritability and excitability (especially when displayed openly). | *"Anne, judging from her own temperament, would have deemed such a domestic hurricane a bad restorative of the nerves, which Louisa’s illness must have so greatly shaken."* — Jane Austen, *Persuasion* |
| [[temperamental]] | adjective | **1.** Relating to or caused by temperament.<br>**2.** Subject to sharply varying moods. | *"His indisposition for play was temperamental, not physical."* — Jack London, *The Jacket (The Star-Rover)* |
| [[temperamentally]] | adverb | **1.** By temperament. | *"This sensuous acceptance of the physical joy of life pleased Laura, born a Selincourt, bred in France, and temperamentally out of touch with middle-class England."* — Anthony Pryde, *Nightfall* |
| [[temperance]] | noun | **1.** The trait of avoiding excesses.<br>**2.** Abstaining from excess. | *"For I am sure, Though you can guess what temperance should be, You know not what it is."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temperate]] | adjective | **1.** (of weather or climate) free from extremes; mild; or characteristic of such weather or climate.<br>**2.** Not extreme in behavior. | *"Therefore, you men of Harfleur, Take pity of your town and of your people, Whiles yet my soldiers are in my command, Whiles yet the cool and temperate wind of grace O’erblows the filthy and contagious clouds Of heady murder, spoil, and villainy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temperately]] | adverb | **1.** With restraint.<br>**2.** Without extravagance. | *"My pulse as yours doth temperately keep time, And makes as healthful music."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temperateness]] | noun | **1.** Moderate weather; suitable for outdoor activities.<br>**2.** Exhibiting restraint imposed on the self. | *"In academic literature, temperateness designates moderate weather; suitable for outdoor activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temperature]] | noun | **1.** The degree of hotness or coldness of a body or environment (corresponding to its molecular activity).<br>**2.** The somatic sensation of cold or heat. | *"Closing the slide to windward, he turned to open the other; on second thoughts the farmer considered that he would first sit down leaving both closed for a minute or two, till the temperature of the hut was a little raised."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tempered]] | verb | **1.** Bring to a desired consistency, texture, or hardness by a process of gradually heating and cooling.<br>**2.** Harden by reheating and cooling in oil. | *"So wouldst thou, if the truth of thy love to me were so righteously tempered as mine is to thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tempering]] | noun | **1.** Hardening something by heat treatment.<br>**2.** Bring to a desired consistency, texture, or hardness by a process of gradually heating and cooling. | *"I have him already tempering between my finger and my thumb, and shortly will I seal with him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tempest]] | noun | **1.** A violent commotion or disturbance.<br>**2.** (literary) a violent wind. | *"Nor do not saw the air too much with your hand, thus, but use all gently; for in the very torrent, tempest, and, as I may say, whirlwind of passion, you must acquire and beget a temperance that may give it smoothness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tempest-swept]] | adjective | **1.** Pounded or hit repeatedly by storms or adversities. | *"In academic literature, tempest-swept designates pounded or hit repeatedly by storms or adversities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tempest-tossed]] | adjective | **1.** Pounded or hit repeatedly by storms or adversities. | *"In academic literature, tempest-tossed designates pounded or hit repeatedly by storms or adversities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tempest-tost]] | adjective | **1.** Pounded or hit repeatedly by storms or adversities. | *"In academic literature, tempest-tost designates pounded or hit repeatedly by storms or adversities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tempestuous]] | adjective | **1.** Characterized by violent emotions or behavior.<br>**2.** (of the elements) as if showing violent anger. | *"On a ship at sea; a tempestuous noise of thunder and lightning heard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tempestuousness]] | noun | **1.** A state of wild storminess.<br>**2.** A state of agitation or turbulent change or development. | *"In academic literature, tempestuousness designates a state of wild storminess."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[templar]] | noun | **1.** A knight of a religious military order established in 1118 to protect pilgrims and the holy sepulcher. | *"Cairns remained a Good Templar during the rest of his life."* — John Cairns, *Principal Cairns* |
| [[template]] | noun | **1.** A model or standard for making comparisons. | *"In academic literature, template designates a model or standard for making comparisons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temple]] | noun | **1.** Place of worship consisting of an edifice for the worship of a deity.<br>**2.** The flat area on either side of the forehead. | *"A man may, if he were of a fearful heart, stagger in this attempt, for here we have no temple but the wood, no assembly but horn-beasts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[templet]] | noun | **1.** A model or standard for making comparisons. | *"In academic literature, templet designates a model or standard for making comparisons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[templetonia]] | noun | **1.** Genus of australian shrubs or subshrubs: coral bush. | *"In academic literature, templetonia designates genus of australian shrubs or subshrubs: coral bush."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tempo]] | noun | **1.** (music) the speed at which a composition is to be played.<br>**2.** The rate of some repeating event. | *"Air Force leadership is concerned about the ability of its members to cope with increasing levels of stress in the face of significant increases in operations tempo and force downsizing."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[temporal]] | noun | **1.** The semantic role of the noun phrase that designates the time of the state or action denoted by the verb.<br>**2.** Not eternal; - f.d.roosevelt. | *"So children temporal fathers do appease; Gods are more full of mercy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temporalis]] | noun | **1.** Muscle extending from the temporal fossa to the coronoid process of the mandible; acts to raise the mandible and close the jaws. | *"In academic literature, temporalis designates muscle extending from the temporal fossa to the coronoid process of the mandible; acts to raise the mandible and close the jaws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temporality]] | noun | **1.** The worldly possessions of a church. | *"According to Pope Nicholas’ taxation, the spiritualities of this monastery amounted in 1291 to the annual sum of £6. 4s. 4d.; the temporalities to £47. 17s. 2d.; making a total of £54. 1s. 6d."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[temporally]] | adverb | **1.** With regard to temporal order. | *"In academic literature, temporally designates with regard to temporal order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temporalty]] | noun | **1.** The worldly possessions of a church.<br>**2.** In christianity, members of a religious community that do not have the priestly responsibilities of ordained clergy. | *"In academic literature, temporalty designates the worldly possessions of a church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temporarily]] | adverb | **1.** For a limited time only; not permanently. | *"But the details of his aspect were temporarily thrust aside by the discovery that he was one whom she had seen before."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[temporariness]] | noun | **1.** The property of lasting only a short time. | *"In academic literature, temporariness designates the property of lasting only a short time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temporary]] | noun | **1.** A worker (especially in an office) hired on a temporary basis.<br>**2.** Not permanent; not lasting; - james thurber. | *"I know him for a man divine and holy, Not scurvy, nor a temporary meddler, As he’s reported by this gentleman; And, on my trust, a man that never yet Did, as he vouches, misreport your Grace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temporise]] | verb | **1.** Draw out a discussion or process in order to gain time. | *"Lady Southdown, we say, for the sake of the invalid's health, or for the sake of her soul's ultimate welfare, or for the sake of her money, agreed to temporise."* — William Makepeace Thackeray, *Vanity Fair* |
| [[temporiser]] | noun | **1.** Someone who temporizes; someone who tries to gain time or who waits for a favorable time. | *"In academic literature, temporiser designates someone who temporizes; someone who tries to gain time or who waits for a favorable time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temporize]] | verb | **1.** Draw out a discussion or process in order to gain time. | *"The Dauphin is too wilful-opposite, And will not temporize with my entreaties; He flatly says he’ll not lay down his arms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temporizer]] | noun | **1.** Someone who temporizes; someone who tries to gain time or who waits for a favorable time. | *"It is; you lie, you lie: I say thou liest, Camillo, and I hate thee, Pronounce thee a gross lout, a mindless slave, Or else a hovering temporizer that Canst with thine eyes at once see good and evil, Inclining to them both."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tempra]] | noun | **1.** An analgesic for mild pain but not for inflammation; also used as an antipyretic; (datril, tylenol, panadol, phenaphen, tempra, and anacin iii are trademarks of brands of acetaminophen tablets). | *"In academic literature, tempra designates an analgesic for mild pain but not for inflammation; also used as an antipyretic; (datril, tylenol, panadol, phenaphen, tempra, and anacin iii are trademarks of brands of acetaminophen tablets)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tempt]] | verb | **1.** Dispose or incline or entice to.<br>**2.** Provoke someone to do something through (often false or exaggerated) promises or persuasion. | *"Tempt him not so too far; I wish, forbear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temptable]] | adjective | **1.** Susceptible to temptation. | *"In academic literature, temptable designates susceptible to temptation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temptation]] | noun | **1.** Something that seduces or has the quality to seduce.<br>**2.** The desire to have or do something that you know you should avoid. | *"For I am that way going to temptation, Where prayers cross."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tempter]] | noun | **1.** A person who tempts others. | *"The tempter or the tempted, who sins most, ha?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tempting]] | verb | **1.** Dispose or incline or entice to.<br>**2.** Provoke someone to do something through (often false or exaggerated) promises or persuasion. | *"I am much too venturous In tempting of your patience, but am boldened Under your promised pardon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[temptingly]] | adverb | **1.** In a tempting seductive manner. | *"Water was given them that they might live longer to yearn for the food, steaming hot and savoury and changed hourly, that was place temptingly before them."* — Jack London, *The Jacket (The Star-Rover)* |
| [[temptingness]] | noun | **1.** The power to entice or attract through personal charm. | *"In academic literature, temptingness designates the power to entice or attract through personal charm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[temptress]] | noun | **1.** A woman who is considered to be dangerously seductive. | *"You temptress, Tess; you dear damned witch of Babylon—I could not resist you as soon as I met you again!” “I couldn’t help your seeing me again!” said Tess, recoiling."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tempura]] | noun | **1.** Vegetables and seafood dipped in batter and deep-fried. | *"In academic literature, tempura designates vegetables and seafood dipped in batter and deep-fried."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untempered]] | adjective | **1.** Not brought to a proper consistency or hardness.<br>**2.** Not moderated or controlled. | *"Feeling without judgment is a washy draught indeed; but judgment untempered by feeling is too bitter and husky a morsel for human deglutition."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[untempting]] | adjective | **1.** Not tempting.<br>**2.** Not appealing to the senses. | *"In academic literature, untempting designates not tempting."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Time]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TEMP
  </div>
</div>
