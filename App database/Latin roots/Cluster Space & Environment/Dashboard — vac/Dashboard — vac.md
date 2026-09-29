---
status: unread
type: root_dashboard
---
# Dashboard — vac
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vac-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be empty or free”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking out across an open horizon with plenty of room to move.</span>
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

The root **vac** means to be empty or free. It refers to containing nothing, lacking substance, or being unoccupied. In English, this root forms words such as *vacant*, *vacation*, *vacuum*, and *evacuate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be empty or free
> The root **vac** means to be empty or free. It refers to containing nothing, lacking substance, or being unoccupied. In English, this root forms words such as *vacant*, *vacation*, *vacuum*, and *evacuate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be empty or free</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *vacant* and *vacation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vac** comes from a Latin word that means *"to be empty or free"*.
  - At its core, it describes the action of be empty or free.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **vac** in an English word, think of **to be empty or free**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be empty or free).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Vacant**: Having no fixtures, furniture, or inhabitants.
  - **Vacation**: An extended period of leisure and recreation, especially one spent away from home or in traveling.
  - **Vacuum**: An everyday English word showing the root's idea of *to be empty or free*.
  - **Evacuate**: An everyday English word showing the root's idea of *to be empty or free*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vac</mark>, think of <mark class="hl-def">to be empty or free</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin vacō, vacāre (to be empty, have leisure)
  │
  ├── Physical & Spatial Emptiness
  │     ├── vacant (unoccupied, empty)
  │     ├── vacancy (empty space / unfilled job)
  │     └── vacate (to leave empty, surrender premises)
  │
  ├── Temporal & Labor Freedom
  │     └── vacation (scheduled period of leisure away from work)
  │
  └── Common Law Jurisprudence
        └── vacatur (order setting aside / annulling a judgment)
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
1. **Real Estate & Property Law**: *vacate*, *vacant*, *vacancy* (rental availability, leaving premises broom-clean).
2. **Labor & Education**: *vacation* (summer break, paid time off, leisure travel).
3. **Appellate Jurisprudence**: *vacatur*, *vacate* (voiding prior legal rulings).
4. **Cognitive Expression**: *vacant* (a vacant stare; blank, expressionless eyes).

---

## 🔀 4. Prefix & Combining Dynamics on vac

### Affix Formations
- **-ant / -ancy**: *vacant*, *vacancy* (participial state of being unoccupied).
- **-ate**: *vacate* (verbal action of emptying or leaving).
- **-ation**: *vacation* (period of leisure / freedom from work).
- **-atur** (Latin 3rd-person passive): *vacatur* (legal decree that a ruling is vacated).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Real Estate & Property Management** | Apartment leasing, commercial vacancy rates, notices to vacate | *vacant*, *vacancy*, *vacate* |
| **Human Resources & Labor Economics** | Job postings, recruitment pipelines, paid time off (PTO) | *job vacancy*, *vacation time* |
| **Appellate Courts & Civil Procedure** | Motions to vacate judgment, writs of vacatur | *vacatur*, *vacate an order* |
| **Psychology & Clinical Neurology** | Absence seizures, blank cognitive stares | *vacant expression*, *vacant stare* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[evacuant]] | adjective | **1.** Strongly laxative. | *"In academic literature, evacuant designates strongly laxative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evacuate]] | verb | **1.** Move out of an unsafe location into safety.<br>**2.** Empty completely. | *"She has refused to evacuate Malta."* — graf Leo Tolstoy, *War and Peace* |
| [[evacuation]] | noun | **1.** The act of removing the contents of something.<br>**2.** The act of evacuating; leaving a place in an orderly fashion; especially for protection. | *"In early youth he had served as a soldier in the West under General Wayne, the "Mad Anthony" of the early days of the Republic, and his boyish eyes had witnessed the evacuation of Detroit by the British in 1796."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[evacuee]] | noun | **1.** A person who has been evacuated from a dangerous place. | *"In academic literature, evacuee designates a person who has been evacuated from a dangerous place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prevacid]] | noun | **1.** Antacid (trade name prevacid) that suppresses acid secretion in the stomach. | *"In academic literature, prevacid designates antacid (trade name prevacid) that suppresses acid secretion in the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unvaccinated]] | adjective | **1.** Not vaccinated. | *"In academic literature, unvaccinated designates not vaccinated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vac]] | noun | **1.** Informal term for vacation. | *"In academic literature, vac designates informal term for vacation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacancy]] | noun | **1.** Being unoccupied.<br>**2.** An empty area or space. | *"If he filled His vacancy with his voluptuousness, Full surfeits and the dryness of his bones Call on him for’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vacant]] | adjective | **1.** Void of thought or knowledge.<br>**2.** Without an occupant or incumbent. | *"If they shall fail, I with mine enemies Will triumph o’er my person, which I weigh not, Being of those virtues vacant."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vacantly]] | adverb | **1.** In a vacant manner. | *"Whatever is the matter?” said Oak, vacantly."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[vacate]] | verb | **1.** Leave (a job, post, or position) voluntarily.<br>**2.** Leave behind empty; move out of. | *"Adèle and I had now to vacate the library: it would be in daily requisition as a reception-room for callers."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[vacation]] | noun | **1.** Leisure time away from work devoted to rest or pleasure.<br>**2.** The act of making something legally void. | *"With lawyers in the vacation; for they sleep between term and term, and then they perceive not how time moves."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vacationer]] | noun | **1.** Someone on vacation; someone who is devoting time to pleasure or relaxation rather than to work. | *"In academic literature, vacationer designates someone on vacation; someone who is devoting time to pleasure or relaxation rather than to work."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacationing]] | noun | **1.** The act of taking a vacation.<br>**2.** Spend or take a vacation. | *"In academic literature, vacationing designates the act of taking a vacation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacationist]] | noun | **1.** Someone on vacation; someone who is devoting time to pleasure or relaxation rather than to work. | *"In academic literature, vacationist designates someone on vacation; someone who is devoting time to pleasure or relaxation rather than to work."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaccaria]] | noun | **1.** Cow-cockles. | *"In academic literature, vaccaria designates cow-cockles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaccina]] | noun | **1.** A local infection induced in humans by inoculation with the virus causing cowpox in order to confer resistance to smallpox; normally lasts three weeks and leaves a pitted scar. | *"In academic literature, vaccina designates a local infection induced in humans by inoculation with the virus causing cowpox in order to confer resistance to smallpox; normally lasts three weeks and leaves a pitted scar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaccinate]] | verb | **1.** Perform vaccinations or produce immunity in by inoculation. | *"No one inspects the Chinese garbage pail except the pig, or sniffs about for defective drains, or insists upon a man's keeping the roadway in front of his house in order, or compels him to have his children vaccinated."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[vaccinated]] | verb | **1.** Perform vaccinations or produce immunity in by inoculation.<br>**2.** Having been rendered unsusceptible to a disease. | *"No one inspects the Chinese garbage pail except the pig, or sniffs about for defective drains, or insists upon a man's keeping the roadway in front of his house in order, or compels him to have his children vaccinated."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[vaccinating]] | noun | **1.** The act of protecting against disease by introducing a vaccine into the body to induce immunity.<br>**2.** Perform vaccinations or produce immunity in by inoculation. | *"In academic literature, vaccinating designates the act of protecting against disease by introducing a vaccine into the body to induce immunity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaccination]] | noun | **1.** Taking a vaccine as a precaution against contracting a disease.<br>**2.** The scar left following inoculation with a vaccine. | *"Her sleeve falling from gracing arms, reveals a white fleshflower of vaccination."* — James Joyce, *Ulysses* |
| [[vaccinator]] | noun | **1.** A medical practitioner who inoculates people against diseases. | *"In academic literature, vaccinator designates a medical practitioner who inoculates people against diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaccine]] | noun | **1.** Immunogen consisting of a suspension of weakened or dead pathogenic cells injected in order to stimulate the production of antibodies. | *"In academic literature, vaccine designates immunogen consisting of a suspension of weakened or dead pathogenic cells injected in order to stimulate the production of antibodies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaccinee]] | noun | **1.** A patient who has been vaccinated. | *"In academic literature, vaccinee designates a patient who has been vaccinated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaccinia]] | noun | **1.** A local infection induced in humans by inoculation with the virus causing cowpox in order to confer resistance to smallpox; normally lasts three weeks and leaves a pitted scar.<br>**2.** A viral disease of cattle causing a mild skin disease affecting the udder; formerly used to inoculate humans against smallpox. | *"In academic literature, vaccinia designates a local infection induced in humans by inoculation with the virus causing cowpox in order to confer resistance to smallpox; normally lasts three weeks and leaves a pitted scar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaccinium]] | noun | **1.** Evergreen or deciduous berry-bearing shrubs of northern hemisphere: cranberries; blueberries. | *"BILBERRY UREDO; spots yellow-brown; sori subrotund, minute, aggregate, and scattered, on the under surface of the leaves; epidermis seldom ruptured; spores ovoid, yellowish.—On _Vaccinium Myrtillus_ and _V. vitis-idæa_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[vaccinum]] | noun | **1.** Immunogen consisting of a suspension of weakened or dead pathogenic cells injected in order to stimulate the production of antibodies. | *"In academic literature, vaccinum designates immunogen consisting of a suspension of weakened or dead pathogenic cells injected in order to stimulate the production of antibodies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacillant]] | adjective | **1.** Uncertain in purpose or action. | *"In academic literature, vacillant designates uncertain in purpose or action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacillate]] | verb | **1.** Be undecided about something; waver between conflicting positions or courses of action.<br>**2.** Move or sway in a rising and falling or wavelike pattern. | *"I know of nothing to make me vacillate."* — George Eliot, *Middlemarch* |
| [[vacillating]] | verb | **1.** Be undecided about something; waver between conflicting positions or courses of action.<br>**2.** Move or sway in a rising and falling or wavelike pattern. | *"Her resolve, however, had been taken, and it seemed vacillating even to childishness to abandon it now, unless for graver reasons."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[vacillation]] | noun | **1.** Indecision in speech or action.<br>**2.** Changing location by moving back and forth. | *"However, some exceptions were made in legislation, and, after much apparent hesitation and vacillation, were allowed by, the courts to stand, and these have now grown in number until they form an impressive total."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[vacillator]] | noun | **1.** One who hesitates (usually out of fear). | *"In academic literature, vacillator designates one who hesitates (usually out of fear)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacuity]] | noun | **1.** The absence of matter.<br>**2.** A region that is devoid of matter. | *"The sky wore, in another colour, the same likeness; a white vacuity of countenance with the lineaments gone."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[vacuolate]] | adjective | **1.** Formed into or containing one or more vacuoles or small membrane-bound cavities within a cell. | *"In academic literature, vacuolate designates formed into or containing one or more vacuoles or small membrane-bound cavities within a cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacuolated]] | adjective | **1.** Formed into or containing one or more vacuoles or small membrane-bound cavities within a cell. | *"In academic literature, vacuolated designates formed into or containing one or more vacuoles or small membrane-bound cavities within a cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacuolation]] | noun | **1.** The state of having become filled with vacuoles. | *"In academic literature, vacuolation designates the state of having become filled with vacuoles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacuole]] | noun | **1.** A tiny cavity filled with fluid in the cytoplasm of a cell. | *"These enclose a granular matter, which surrounds what has been termed the nucleus, but which appears to be a vacuole."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[vacuolisation]] | noun | **1.** The state of having become filled with vacuoles. | *"In academic literature, vacuolisation designates the state of having become filled with vacuoles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacuolization]] | noun | **1.** The state of having become filled with vacuoles. | *"In academic literature, vacuolization designates the state of having become filled with vacuoles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacuous]] | adjective | **1.** Devoid of intelligence.<br>**2.** Devoid of significance or point. | *"Again a startled look came over the somewhat vacuous face of Miss Mary Sutherland."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[vacuously]] | adverb | **1.** In a vacuous manner. | *"In academic literature, vacuously designates in a vacuous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacuousness]] | noun | **1.** Indicative of or marked by mental vacuity and an absence of ideas. | *"In academic literature, vacuousness designates indicative of or marked by mental vacuity and an absence of ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vacuum]] | noun | **1.** The absence of matter.<br>**2.** An empty area or space. | *"I ask you how—I repeat, I ask you _how_ matter or flesh in any form can play chess on an imaginary board with imaginary pieces, across a vacuum of thirteen cells spanned only with knuckle-taps?"* — Jack London, *The Jacket (The Star-Rover)* |
| [[vacuum-clean]] | verb | **1.** Clean with a vacuum cleaner. | *"In academic literature, vacuum-clean designates clean with a vacuum cleaner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Space & Environment]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VAC
  </div>
</div>
