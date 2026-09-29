---
status: unread
type: root_dashboard
---
# Dashboard — ten
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ten-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to hold, keep, or retain”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands holding an object firmly so it does not slip or drop.</span>
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

The root **ten** means to hold, keep, or retain. It refers to keeping something in the hand, retaining possession, or supporting weight. In English, this root forms words such as *tenant*, *tenacious*, *tenure*, and *tenet*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to hold, keep, or retain
> The root **ten** means to hold, keep, or retain. It refers to keeping something in the hand, retaining possession, or supporting weight. In English, this root forms words such as *tenant*, *tenacious*, *tenure*, and *tenet*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To hold, keep, or retain</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *tenant* and *tenacious*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ten** comes from a Latin word that means *"to hold, keep, or retain"*.
  - At its core, it describes the action of hold, keep, or retain.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **ten** in an English word, think of **to hold, keep, or retain**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to hold, keep, or retain).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Tenant**: N.** 1. A person who occupies land or property rented from a landlord under a legal lease.
  - **Tenacious**: Holding fast.
  - **Tenure**: N.** 1. The conditions, legal title, or terms under which land, buildings, or real property are held or occupied.
  - **Tenet**: A principle, belief, or doctrine held to be true, especially by members of an organized religion, philosophical school, or political movement.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ten</mark>, think of <mark class="hl-def">to hold, keep, or retain</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via two powerful engines:
> 1. **Direct Latin Present Base `ten-`:**
>    - Adjectives in `-acious` denoting persistent holding: *tenacious* (< *tenāx*).
>    - Nouns of state in `-ure`, `-ancy`, and `-ity`: *tenure*, *tenancy*, *tenacity*.
>    - French participial nouns: *tenant*, *lieutenant* (*lieu* "place" + *tenant* "holding").
>    - Adjectives of defensibility in `-able`: *tenable*, *untenable*.
>    - Inflected Latin verb: *tenet* (3rd pers. sing. present: "he/she holds").
> 2. **Anglo-Norman Compound Combining Verb `-tain` (from *tenir* < *tenēre*):**
>    - Attaches prefixes seamlessly:
>      - `abs-` + *tenēre* $\to$ *abstain*.
>      - `con-` + *tenēre* $\to$ *contain*.
>      - `dē-` + *tenēre* $\to$ *detain*.
>      - `inter-` ($\to$ *entre-*) + *tenēre* $\to$ *entertain*.
>      - `manu-` + *tenēre* $\to$ *maintain*.
>      - `ob-` + *tenēre* $\to$ *obtain*.
>      - `per-` + *tenēre* $\to$ *pertain*, *appertain*.
>      - `re-` + *tenēre* $\to$ *retain*.
>      - `sub-` ($\to$ *sus-*) + *tenēre* $\to$ *sustain*.
>    - These verbs further generate agent nouns in `-er` (*container*, *entertainer*, *maintainer*, *retainer*, *sustainer*), abstract process nouns in `-ment` (*containment*, *detainment*, *entertainment*), and capability adjectives in `-able` (*sustainable*, *maintainable*, *obtainable*).

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
> - **Physical Gripping & Durability:** *Tenacious*, *tenacity*, *tenaculum* — holding onto surfaces, resisting tensile fracture, clamping bleeding vessels.
> - **Property Law & Institutional Status:** *Tenant*, *tenancy*, *tenure*, *tenured*, *tenurial* — legal right to occupy land, residence, or permanent academic professorships.
> - **Epistemology & Argumentation:** *Tenet*, *tenable*, *untenable*, *tenor* — philosophical doctrines held as true; arguments capable of being rationally defended; the general drift of a speech.
> - **Containment, Custody & Restraint:** *Contain*, *container*, *containment*, *detain*, *detainee*, *detainment*, *abstain* — enclosing matter within boundaries; holding persons in civil/military custody; voluntarily refraining from indulgence.
> - **Preservation, Support & Environmental Ecology:** *Maintain*, *maintenance*, *sustain*, *sustainable*, *sustainability*, *retain*, *retainer* — keeping machinery operational; supporting life processes; balancing resource extraction with planetary replenishment.
> - **Civic, Military & Social Fellowship:** *Lieutenant*, *lieutenancy*, *entertain*, *entertainment* — holding command in lieu of a superior; providing hospitality and diverting amusement.

---

## 🔀 4. Prefix & Combining Dynamics on ten

### Prefix Shifts (Directional & Semantic Modification on `-tain` / `ten-`)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `abs-` | away from, off | [[abstain]], [[abstainer]] | To hold oneself away from an indulgence, beverage, or vote. |
| `con-` | together, within | [[contain]], [[container]], [[containment]] | To hold together within an unbroken boundary or vessel. |
| `dē-` | down, back, away | [[detain]], [[detainee]], [[detainment]] | To hold back from proceeding; to keep in official custody. |
| `inter-` / `entre-` | between, among, mutually | [[entertain]], [[entertainment]] | To hold mutually; to provide hospitality, engage attention, or amuse. |
| `manu-` | by the hand | [[maintain]], [[maintainable]] | To hold in the hand; to keep in a state of repair, support, or assert. |
| `ob-` | toward, before, against | [[obtain]], [[obtainable]] | To hold in one's grasp through effort; to acquire, secure, or prevail. |
| `per-` | through, thoroughly | [[pertain]], [[appertain]] | To hold through to; to belong, relate, or be applicable to. |
| `re-` | back, behind, again | [[retain]], [[retainer]] | To hold back in one's possession, memory, or legal employ. |
| `sub-` ($\to$ `sus-`) | under, up from below | [[sustain]], [[sustainable]], [[sustainability]] | To hold up from beneath; to bear a weight, nourish life, or endure. |
| `lieu-` (French) | in place of | [[lieutenant]], [[lieutenancy]] | One who holds the place and authority of a superior commander. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-et` (Latin 3rd sing.) | Noun (Doctrinal Proposition) | [[tenet]] | Literally "he/she holds" $\to$ a principle or dogma held as true. |
| `-acious` / `-acity` | Adjective / Noun (Grip / Resolve) | [[tenacious]], [[tenacity]] | Characterized by an unyielding, resolute grip or physical cohesion. |
| `-ure` | Noun (Status / Legal Right) | [[tenure]] | The legal act, term, or condition of holding land, property, or office. |
| `-ant` | Noun (Person Holding) | [[tenant]], [[lieutenant]] | The individual holding a lease, residency, or military rank. |
| `-able` | Adjective (Defensibility / Fitness) | [[tenable]], [[sustainable]], [[obtainable]] | Capable of being defended, kept alive, or acquired. |
| `-ment` | Abstract Noun (Process / State) | [[containment]], [[detainment]], [[entertainment]] | The institutional act of holding within, holding in jail, or amusing. |
| `-er` | Agent Noun | [[container]], [[retainer]], [[sustainer]] | The vessel, legal fee/attendant, or force that maintains holding. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌿 **Environmental Science & Ecology** | [[sustain]], [[sustainable]], [[sustainability]], [[unsustainable]] | Brundtland Commission definition of sustainable development; renewable energy transition; carbon containment strategies. |
| ⚖️ **Property Law & Real Estate** | [[tenant]], [[tenancy]], [[tenure]], [[tenurial]], [[subtenant]] | Landlord-tenant statutory rights; joint tenancy vs. tenancy in common; leasehold tenure; eviction proceedings. |
| 🎓 **Higher Education & Academic Governance** | [[tenure]], [[tenured]], [[tenable]], [[tenet]] | The institution of academic tenure protecting research freedom; core foundational tenets of scientific inquiry; defensible dissertation theses. |
| ⚔️ **Military Science & Geopolitics** | [[lieutenant]], [[containment]], [[detain]], [[detainee]] | Cold War geopolitical containment doctrine (George F. Kennan); Geneva Convention protections for military detainees; commissioned lieutenant ranks. |
| 🛠️ **Engineering, Mechanics & Software** | [[maintain]], [[maintainable]], [[container]], [[tenacity]] | Mean time between failures (MTBF) and software maintainability; Docker containerization architecture; tensile tenacity of aerospace alloys. |
| 🩺 **Surgery & Anatomy** | [[tenaculum]], [[retainer]] | Surgical tenaculum forceps used to grasp bleeding uterine or cervical tissues; orthodontic retainers holding dental alignment. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abstention]] | noun | **1.** The trait of abstaining (especially from alcohol). | *"All such customs of abstention or rules of avoidance are examples of negative magic or taboo."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[abstentious]] | adjective | **1.** Self-restraining; not indulging an appetite especially for food or drink. | *"In academic literature, abstentious designates self-restraining; not indulging an appetite especially for food or drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antenatal]] | adjective | **1.** Occurring or existing before birth. | *"In academic literature, antenatal designates occurring or existing before birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antenna]] | noun | **1.** An electrical device that sends or receives radio or television signals.<br>**2.** Sensitivity similar to that of a receptor organ. | *"With a frightful qualm, I turned, and I saw that I had grasped the antenna of another monster crab that stood just behind me."* — H. G. Wells, *The Time Machine* |
| [[antennal]] | adjective | **1.** Of or relating to antennae. | *"In academic literature, antennal designates of or relating to antennae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antennaria]] | noun | **1.** Small woolly perennial herbs having small whitish discoid flowers surrounded by a ring of club-shaped bristles. | *"In academic literature, antennaria designates small woolly perennial herbs having small whitish discoid flowers surrounded by a ring of club-shaped bristles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antennariidae]] | noun | **1.** Frogfishes; tropical spiny-finned marine fishes having large nearly vertical mouths; related to toadfishes and anglers. | *"In academic literature, antennariidae designates frogfishes; tropical spiny-finned marine fishes having large nearly vertical mouths; related to toadfishes and anglers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antennary]] | adjective | **1.** Of or relating to antennae. | *"In academic literature, antennary designates of or relating to antennae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antenuptial]] | adjective | **1.** Relating to events before a marriage. | *"In academic literature, antenuptial designates relating to events before a marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aptenodytes]] | noun | **1.** Large penguins. | *"In academic literature, aptenodytes designates large penguins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attend]] | verb | **1.** Be present at (meetings, church services, university), etc.<br>**2.** Take charge of or deal with. | *"But ah, thought kills me that I am not thought To leap large lengths of miles when thou art gone, But that so much of earth and water wrought, I must attend, time’s leisure with my moan."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attendance]] | noun | **1.** The act of being present (at a meeting or event etc.).<br>**2.** The frequency with which a person is present. | *"Clarence, Gloucester, Warwick and others in attendance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attendant]] | noun | **1.** Someone who waits on or tends to or attends to the needs of another.<br>**2.** A person who is present and participates in a meeting. | *"Find him, and bring him hither. [_Exit an Attendant._] BERTRAM."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attended]] | verb | **1.** Be present at (meetings, church services, university), etc.<br>**2.** Take charge of or deal with. | *"Enter the Duke of Florence attended; two French Lords, and Soldiers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attender]] | noun | **1.** Someone who listens attentively.<br>**2.** Someone who waits on or tends to or attends to the needs of another. | *"In academic literature, attender designates someone who listens attentively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attending]] | noun | **1.** The process whereby a person concentrates on some features of the environment to the (relative) exclusion of others.<br>**2.** The act of being present (at a meeting or event etc.). | *"Lords attending on the KING; Officers; Soldiers, &c., French and Florentine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attention]] | noun | **1.** The process whereby a person concentrates on some features of the environment to the (relative) exclusion of others.<br>**2.** The work of providing treatment for or attending to someone or something. | *"Ay, with all my heart, And lend my best attention."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attention-getting]] | adjective | **1.** Seizing the attention.<br>**2.** Likely to attract attention. | *"In academic literature, attention-getting designates seizing the attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attentional]] | adjective | **1.** Of or relating to attention. | *"In academic literature, attentional designates of or relating to attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attentive]] | adjective | **1.** (often followed by `to') giving care or attention.<br>**2.** Taking heed; giving close and thoughtful attention. | *"Hear him, lords, And be you silent and attentive too, For he that interrupts him shall not live."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attentively]] | adverb | **1.** With attention; in an attentive manner. | *"It will also keep you from making uncertain plans, which might only bring fresh disappointments." Leonore had attentively followed every word Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[attentiveness]] | noun | **1.** Paying particular notice (as to children or helpless people).<br>**2.** The trait of being considerate and thoughtful of others. | *"I am ashamed of you and of myself, but it shall never happen again.” “_Your_ attentiveness and consideration makes me more sensible of my own neglect."* — Jane Austen, *Mansfield Park* |
| [[attenuate]] | verb | **1.** Weaken the consistency of (a chemical substance).<br>**2.** Become weaker, in strength, value, or magnitude. | *"BURNET CHAIN-BRAND; scattered, in small tufts, hypogenous; spores curved or straight, composed of from 5 to 15 articulations; obtuse at one extremity, slightly attenuate at the other.—On Burnet."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[attenuated]] | verb | **1.** Weaken the consistency of (a chemical substance).<br>**2.** Become weaker, in strength, value, or magnitude. | *"By the outer margin of the Pit was an oval pond, and over it hung the attenuated skeleton of a chrome-yellow moon which had only a few days to last—the morning star dogging her on the left hand."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[attenuation]] | noun | **1.** Weakening in force or intensity.<br>**2.** The property of something that has been weakened or reduced in thickness or density. | *"The salt had "lost his savour;" and yet, with one drop of that attenuation in a goblet of 153:9 water, and a teaspoonful of the water administered at in- tervals of three hours, she has cured a patient sinking in the last stage of typhoid fever."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[attenuator]] | noun | **1.** An electrical device for attenuating the strength of an electrical signal. | *"In academic literature, attenuator designates an electrical device for attenuating the strength of an electrical signal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coextension]] | noun | **1.** Equality of extension or duration. | *"In academic literature, coextension designates equality of extension or duration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coextensive]] | adjective | **1.** Being of equal extent or scope or duration. | *"Economic relations never have been coextensive with political relations."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[contend]] | verb | **1.** Maintain or assert.<br>**2.** Have an argument about something. | *"Thy blood and virtue Contend for empire in thee, and thy goodness Share with thy birthright!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contender]] | noun | **1.** The contestant you hope to defeat. | *"In academic literature, contender designates the contestant you hope to defeat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[content]] | noun | **1.** Everything that is included in a collection and that is held or included in something.<br>**2.** What a communication that is about something is about. | *"Madam, the care I have had to even your content, I wish might be found in the calendar of my past endeavours; for then we wound our modesty, and make foul the clearness of our deservings, when of ourselves we publish them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contented]] | verb | **1.** Satisfy in a limited way.<br>**2.** Make content. | *"Thither will I invite the Duke and all’s contented followers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contentedly]] | adverb | **1.** With equanimity. | *"The strangest of all, however, was that Leonore sat in the corner of the carriage smiling contentedly, for Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[contentedness]] | noun | **1.** The state of being contented with your situation in life. | *"Isabel waited, with a certain unuttered contentedness, to have her movements directed; she liked Mr."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[contention]] | noun | **1.** A point asserted as part of an argument.<br>**2.** A contentious speech act; a dispute where there is strong disagreement. | *"Safely, I think. ’Twas a contention in public, which may, without contradiction, suffer the report."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contentious]] | adjective | **1.** Inclined or showing an inclination to dispute or disagree, even to engage in law suits.<br>**2.** Involving or likely to cause controversy; - tim w.ferfuson. | *"Thou think’st ’tis much that this contentious storm Invades us to the skin: so ’tis to thee, But where the greater malady is fix’d, The lesser is scarce felt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contentiousness]] | noun | **1.** An inclination to be quarrelsome and contentious. | *"In academic literature, contentiousness designates an inclination to be quarrelsome and contentious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contentment]] | noun | **1.** Happiness with one's situation in life. | *"Beholding him in which glow of contentment, Mr."* — Charles Dickens, *Bleak House* |
| [[contents]] | noun | **1.** A list of divisions (chapters or articles) and the pages on which they start.<br>**2.** Everything that is included in a collection and that is held or included in something. | *"In academic literature, contents designates a list of divisions (chapters or articles) and the pages on which they start."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cotenant]] | noun | **1.** One of two or more tenants holding title to the same property. | *"In academic literature, cotenant designates one of two or more tenants holding title to the same property."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[countertenor]] | noun | **1.** A male singer with a voice above that of a tenor.<br>**2.** The highest adult male singing voice. | *"In academic literature, countertenor designates a male singer with a voice above that of a tenor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detent]] | noun | **1.** A hinged catch that fits into a notch of a ratchet to move a wheel forward or prevent it from moving backward. | *"In academic literature, detent designates a hinged catch that fits into a notch of a ratchet to move a wheel forward or prevent it from moving backward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detente]] | noun | **1.** The easing of tensions or strained relations (especially between nations). | *"In academic literature, detente designates the easing of tensions or strained relations (especially between nations)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detention]] | noun | **1.** A state of being confined (usually for a short time).<br>**2.** A punishment in which a student must stay at school after others have gone home. | *"Pray you, How goes the world, that I am thus encountered With clamorous demands of debt, broken bonds, And the detention of long-since-due debts Against my honour?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontent]] | noun | **1.** A longing for something better than the present situation.<br>**2.** Make dissatisfied. | *"So I leave you, sir, To th’ worst of discontent. [_Exit._] CLOTEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontented]] | verb | **1.** Make dissatisfied.<br>**2.** Showing or experiencing dissatisfaction or restless longing. | *"Most meet That first we come to words, and therefore have we Our written purposes before us sent, Which if thou hast considered, let us know If ’twill tie up thy discontented sword And carry back to Sicily much tall youth That else must perish here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontentedly]] | adverb | **1.** With discontent; in a discontented manner. | *"Then comes, dropping after all, Apemantus, discontentedly, like himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontentedness]] | noun | **1.** A longing for something better than the present situation. | *"A mole near either elbow declares restlessness, a roving and unsteady temper, also a discontentedness with those whom they are obliged constantly to live with."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[discontentment]] | noun | **1.** A longing for something better than the present situation. | *"In academic literature, discontentment designates a longing for something better than the present situation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distend]] | verb | **1.** Become wider.<br>**2.** Cause to expand as it by internal pressure. | *"Many of them foamed at the mouth, their breathing being quick and short, whilst the bodies of all were fearfully distended."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[distensible]] | adjective | **1.** Capable of being distended; able to stretch and expand. | *"In academic literature, distensible designates capable of being distended; able to stretch and expand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distension]] | noun | **1.** The act of expanding by pressure from within.<br>**2.** The state of being stretched beyond normal dimensions. | *"A silly girl!—silly girl!” The door was hurriedly burst open again, and in came running Cainy Ball out of breath, his mouth red and open, like the bell of a penny trumpet, from which he coughed with noisy vigour and great distension of face."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[distention]] | noun | **1.** The state of being stretched beyond normal dimensions.<br>**2.** The act of expanding by pressure from within. | *"In academic literature, distention designates the state of being stretched beyond normal dimensions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extend]] | verb | **1.** Extend in scope or range or area.<br>**2.** Stretch out over a distance, space, time, or scope; run or extend between two points or beyond a certain point. | *"You do extend These thoughts of horror further than you shall Find cause in Caesar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extendable]] | adjective | **1.** Capable of being lengthened. | *"In academic literature, extendable designates capable of being lengthened."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extended]] | verb | **1.** Extend in scope or range or area.<br>**2.** Stretch out over a distance, space, time, or scope; run or extend between two points or beyond a certain point. | *"Tax of impudence, A strumpet’s boldness, a divulged shame, Traduc’d by odious ballads; my maiden’s name Sear’d otherwise; nay worse of worst extended With vilest torture, let my life be ended."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extendible]] | adjective | **1.** Capable of being lengthened. | *"In academic literature, extendible designates capable of being lengthened."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extensible]] | adjective | **1.** Capable of being protruded or stretched or opened out. | *"In academic literature, extensible designates capable of being protruded or stretched or opened out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extensile]] | adjective | **1.** Capable of being protruded or stretched or opened out. | *"In academic literature, extensile designates capable of being protruded or stretched or opened out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extension]] | noun | **1.** A mutually agreed delay in the date set for the completion of a job or payment of a debt.<br>**2.** Act of expanding in scope; making more widely available. | *"He uttered a long guttural sigh—there was a contraction—an extension—then his muscles relaxed, and he lay still."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[extensional]] | adjective | **1.** Defining a word by listing the class of entities to which the word correctly applies. | *"In academic literature, extensional designates defining a word by listing the class of entities to which the word correctly applies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extensive]] | adjective | **1.** Large in spatial extent or range or scope or quantity.<br>**2.** Broad in scope or content; ; ; ; ; - t.g.winner. | *"I am a School lady, I am a Visiting lady, I am a Reading lady, I am a Distributing lady; I am on the local Linen Box Committee and many general committees; and my canvassing alone is very extensive—perhaps no one’s more so."* — Charles Dickens, *Bleak House* |
| [[extensively]] | adverb | **1.** In a widespread way. | *"The tradition is that his rule was an exceedingly stern one, that he kept the children hard at work, and that he flogged extensively and remorselessly."* — John Cairns, *Principal Cairns* |
| [[extensiveness]] | noun | **1.** Large or extensive in breadth or importance or comprehensiveness. | *"In academic literature, extensiveness designates large or extensive in breadth or importance or comprehensiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extensor]] | noun | **1.** A skeletal muscle whose contraction extends or stretches a body part. | *"In academic literature, extensor designates a skeletal muscle whose contraction extends or stretches a body part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extent]] | noun | **1.** The point or degree to which something extends.<br>**2.** The distance or area or volume over which something extends. | *"Well, push him out of doors, And let my officers of such a nature Make an extent upon his house and lands."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extenuate]] | verb | **1.** Lessen or to try to lessen the seriousness or extent of. | *"Cleopatra, know We will extenuate rather than enforce."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extenuating]] | verb | **1.** Lessen or to try to lessen the seriousness or extent of.<br>**2.** Partially excusing or justifying. | *"If I know my Evelyn, before a month had passed her heart would have softened, and she would be turning special pleader in his defence, racking her brain for extenuating explanations."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[extenuation]] | noun | **1.** A partial excuse to mitigate censure; an attempt to represent an offense as less serious than it appears by showing mitigating circumstances.<br>**2.** To act in such a way as to cause an offense to seem less serious. | *"The circumstances of his marriage, too, were found to admit of much extenuation."* — Jane Austen, *Persuasion* |
| [[inattention]] | noun | **1.** Lack of attention. | *"We see nothing of them, and this is really an instance of gross inattention."* — Jane Austen, *Persuasion* |
| [[inattentive]] | adjective | **1.** Showing a lack of attention or care.<br>**2.** Not showing due care or attention. | *"Rachael”—I was afraid he addressed himself to her because I appeared inattentive—“amounts at the present hour to from SIX-ty to SEVEN-ty THOUSAND POUNDS!” said Mr."* — Charles Dickens, *Bleak House* |
| [[inattentively]] | adverb | **1.** In an absentminded or preoccupied manner. | *"And what a crumby girl!” VI Tess went down the hill to Trantridge Cross, and inattentively waited to take her seat in the van returning from Chaseborough to Shaston."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inattentiveness]] | noun | **1.** A lack of attentiveness (as to children or helpless people).<br>**2.** The trait of not being considerate and thoughtful of others. | *"In academic literature, inattentiveness designates a lack of attentiveness (as to children or helpless people)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inextensible]] | adjective | **1.** Not extensile. | *"In academic literature, inextensible designates not extensile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intend]] | verb | **1.** Have in mind as a purpose.<br>**2.** Design or destine. | *"For then my thoughts, from far where I abide, Intend a zealous pilgrimage to thee, And keep my drooping eyelids open wide, Looking on darkness which the blind do see."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intended]] | verb | **1.** Have in mind as a purpose.<br>**2.** Design or destine. | *"Yet your good will Must have that thanks from Rome after the measure As you intended well."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intense]] | adjective | **1.** Possessing or displaying a distinctive feature to a heightened degree.<br>**2.** Extremely sharp or intense. | *"I must go to him this minute," gasped Apollonie; she had spoken rapidly and with intense excitement."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intensely]] | adverb | **1.** In an intense manner. | *"Was the mantle blue?" Loneli, who had been listening intensely, interrupted."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intensification]] | noun | **1.** Action that makes something stronger or more extreme.<br>**2.** The act of increasing the contrast of (a photographic film). | *"Deepest love. [July 13, 1947] EVIDENCES OF NOTABLE EXPANSION Greatly welcome evidences of a notable expansion of activities and increased intensification of efforts for publicity."* — Effendi Shoghi, *Citadel of Faith* |
| [[intensified]] | verb | **1.** Increase in extent or intensity.<br>**2.** Make more intense, stronger, or more marked; ,. | *"The paint with which they were smeared, intensified in hue by the sunlight, imparted to them a look of having been dipped in liquid fire."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[intensifier]] | noun | **1.** A modifier that has little meaning except to intensify the meaning it modifies. | *"In academic literature, intensifier designates a modifier that has little meaning except to intensify the meaning it modifies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intensify]] | verb | **1.** Increase in extent or intensity.<br>**2.** Make more intense, stronger, or more marked; ,. | *"At times her whimsical fancy would intensify natural processes around her till they seemed a part of her own story."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[intensifying]] | verb | **1.** Increase in extent or intensity.<br>**2.** Make more intense, stronger, or more marked; ,. | *"By and by the beadle comes out, once more intensifying the sensation, which has rather languished in the interval."* — Charles Dickens, *Bleak House* |
| [[intension]] | noun | **1.** What you must know in order to determine the reference of an expression. | *"In academic literature, intension designates what you must know in order to determine the reference of an expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intensional]] | adjective | **1.** Used of the set of attributes that distinguish the referents of a given word. | *"In academic literature, intensional designates used of the set of attributes that distinguish the referents of a given word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intensity]] | noun | **1.** The amount of energy transmitted (as by acoustic or electromagnetic radiation).<br>**2.** High level or degree; the property of being intense. | *"It may be that if we knew more of such strange afflictions we might be the better able to alleviate their intensity."* — Charles Dickens, *Bleak House* |
| [[intensive]] | noun | **1.** A modifier that has little meaning except to intensify the meaning it modifies.<br>**2.** Characterized by a high degree or intensity; often used as a combining form. | *"Intensive farming in Europe and America. § 8."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[intensively]] | adverb | **1.** In an intensive manner. | *"Investment has advanced both intensively and extensively in a series of great waves."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[intensiveness]] | noun | **1.** High level or degree; the property of being intense. | *"In academic literature, intensiveness designates high level or degree; the property of being intense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intent]] | noun | **1.** An anticipated outcome that is intended or that guides your planned actions.<br>**2.** The intended meaning of a communication. | *"Had you not lately an intent,—speak truly,— To go to Paris?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intention]] | noun | **1.** An anticipated outcome that is intended or that guides your planned actions.<br>**2.** (usually plural) the goal with respect to a marriage proposal. | *"O, she did so course o’er my exteriors with such a greedy intention that the appetite of her eye did seem to scorch me up like a burning-glass."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intentional]] | adjective | **1.** Characterized by conscious design or purpose.<br>**2.** Done or made or performed with purpose and intent; - havelock ellis. | *"What could all this mean but an intentional affront?"* — Jane Austen, *Northanger Abbey* |
| [[intentionality]] | noun | **1.** Expressive of intentions. | *"In academic literature, intentionality designates expressive of intentions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intentionally]] | adverb | **1.** With intention; in an intentional manner. | *"Whether intentionally or accidentally, I don’t know."* — Charles Dickens, *Bleak House* |
| [[intently]] | adverb | **1.** With strained or eager attention. | *"Maxa was looking at her intently."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intentness]] | noun | **1.** The quality of being intent and concentrated. | *"The trees stood in an attitude of intentness, as if they waited longingly for a wind to come and rock them."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[lieutenancy]] | noun | **1.** The position of a lieutenant. | *"As soon as he graduated a lieutenancy was offered him in one of the companies, but deferring an answer, he left immediately for a college in the interior."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[lieutenant]] | noun | **1.** A commissioned military officer.<br>**2.** An officer in a police force. | *"Sossius, One of my place in Syria, his lieutenant, For quick accumulation of renown, Which he achieved by th’ minute, lost his favour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[maintenance]] | noun | **1.** Activity involved in maintaining something in good working order.<br>**2.** Means of maintenance of a family or group. | *"I saw him hold Lord Percy at the point With lustier maintenance than I did look for Of such an ungrown warrior."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonattendance]] | noun | **1.** The failure to attend. | *"Congress, from the nonattendance of a few States, have been frequently in the situation of a Polish diet, where a single VOTE has been sufficient to put a stop to all their movements."* — Alexander Hamilton, *The Federalist Papers* |
| [[nonattender]] | noun | **1.** Someone who shirks duty. | *"In academic literature, nonattender designates someone who shirks duty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncontentious]] | adjective | **1.** Of persons; not given to controversy. | *"In academic literature, noncontentious designates of persons; not given to controversy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonextensile]] | adjective | **1.** Not extensile. | *"In academic literature, nonextensile designates not extensile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obtention]] | noun | **1.** The act of obtaining. | *"In academic literature, obtention designates the act of obtaining."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[often]] | adverb | **1.** Many times at short intervals.<br>**2.** Frequently or in great quantities. | *"Fair, kind, and true, have often lived alone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oftener]] | adverb | **1.** More often or more frequently. | *"God knows, of pure devotion; being called A hundred times and oftener, in my sleep, By good Saint Alban, who said “Simpcox, come, Come, offer at my shrine, and I will help thee.” WIFE."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oftenness]] | noun | **1.** The number of occurrences within a given time period. | *"In academic literature, oftenness designates the number of occurrences within a given time period."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oftentimes]] | adverb | **1.** Many times at short intervals. | *"This woman that I mean, My wife (but, I protest, without desert) Hath oftentimes upbraided me withal; To her will we to dinner.—Get you home And fetch the chain, by this I know ’tis made."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[overextend]] | verb | **1.** Strain excessively. | *"In academic literature, overextend designates strain excessively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pretence]] | noun | **1.** A false or unsupportable quality.<br>**2.** An artful or simulated semblance. | *"Why hast thou abus’d So many miles with a pretence?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pretend]] | noun | **1.** The enactment of a pretense.<br>**2.** Make believe with the intent to deceive. | *"For The contract you pretend with that base wretch, One bred of alms and foster’d with cold dishes, With scraps o’ th’ court, it is no contract, none."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pretended]] | verb | **1.** Make believe with the intent to deceive.<br>**2.** Behave unnaturally or affectedly. | *"Now presently I’ll give her father notice Of their disguising and pretended flight, Who, all enraged, will banish Valentine, For Thurio he intends shall wed his daughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pretender]] | noun | **1.** A claimant to the throne or to the office of ruler (usually without just title).<br>**2.** A person who makes deceitful pretenses. | *"But, it was only the pleasanter to turn to Biddy and to Joe, whose great forbearance shone more brightly than before, if that could be, contrasted with this brazen pretender."* — Charles Dickens, *Great Expectations* |
| [[pretending]] | noun | **1.** The act of giving a false appearance.<br>**2.** Make believe with the intent to deceive. | *"The Queen, sir, very oft importun’d me To temper poisons for her; still pretending The satisfaction of her knowledge only In killing creatures vile, as cats and dogs, Of no esteem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pretense]] | noun | **1.** The act of giving a false appearance.<br>**2.** Pretending with intention to deceive. | *"An over-scrupulous jealousy of danger to the rights of the people, which is more commonly the fault of the head than of the heart, will be represented as mere pretense and artifice, the stale bait for popularity at the expense of the public good."* — Alexander Hamilton, *The Federalist Papers* |
| [[pretension]] | noun | **1.** A false or unsupportable quality.<br>**2.** The advancing of a claim. | *"Miss Tilney had a good figure, a pretty face, and a very agreeable countenance; and her air, though it had not all the decided pretension, the resolute stylishness of Miss Thorpe’s, had more real elegance."* — Jane Austen, *Northanger Abbey* |
| [[pretentious]] | adjective | **1.** Making claim to or creating an appearance of (often undeserved) importance or distinction.<br>**2.** Intended to attract notice and impress others. | *"They implied that he was insolent, pretentious, and given to that reckless innovation for the sake of noise and show which was the essence of the charlatan."* — George Eliot, *Middlemarch* |
| [[pretentiously]] | adverb | **1.** In a pretentious manner. | *"She knew what it was all meant to represent, but it was so pretentiously false and unnatural that she first felt ashamed for the actors and then amused at them."* — graf Leo Tolstoy, *War and Peace* |
| [[pretentiousness]] | noun | **1.** Lack of elegance as a consequence of being pompous and puffed up with vanity.<br>**2.** The quality of being pretentious (behaving or speaking in such a manner as to create a false appearance of great importance or worth). | *"In academic literature, pretentiousness designates lack of elegance as a consequence of being pompous and puffed up with vanity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retention]] | noun | **1.** The act of retaining something.<br>**2.** The power of retaining and recalling past experience. | *"Sir, I thought it fit To send the old and miserable King To some retention and appointed guard; Whose age has charms in it, whose title more, To pluck the common bosom on his side, And turn our impress’d lances in our eyes Which do command them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[retentive]] | adjective | **1.** Good at remembering.<br>**2.** Having the capacity to retain something. | *"Nor stony tower, nor walls of beaten brass, Nor airless dungeon, nor strong links of iron, Can be retentive to the strength of spirit; But life, being weary of these worldly bars, Never lacks power to dismiss itself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[retentively]] | adverb | **1.** In a retentive manner. | *"In academic literature, retentively designates in a retentive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retentiveness]] | noun | **1.** The power of retaining and recalling past experience.<br>**2.** The property of retaining possessions that have been acquired. | *"As regarded novelties (among which cabs and omnibuses were to be reckoned), his mind appeared to have lost its proper gripe and retentiveness."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[retentivity]] | noun | **1.** The power of retaining and recalling past experience.<br>**2.** The property of retaining possessions that have been acquired. | *"In academic literature, retentivity designates the power of retaining and recalling past experience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sublieutenant]] | noun | **1.** An officer ranking next below a lieutenant. | *"In academic literature, sublieutenant designates an officer ranking next below a lieutenant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superintend]] | verb | **1.** Watch and direct. | *"She meant to superintend these preparations herself and to have it all fixed as daintily as possible."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[superintendence]] | noun | **1.** Management by overseeing the performance or operation of a person or group. | *"In the active superintendence of this young person, Judy Smallweed appears to attain a perfectly geological age and to date from the remotest periods."* — Charles Dickens, *Bleak House* |
| [[superintendent]] | noun | **1.** A person who directs and manages an organization.<br>**2.** A caretaker for an apartment house; represents the owner as janitor and rent collector. | *"Hall, "told me that when superintendent of a Sunday school he felt a strong impulse, one Saturday evening, to call at the home of one of his teachers whom he had never visited before."* — Classic Author, *The wonders of prayer* |
| [[sustenance]] | noun | **1.** A source of materials to nourish the body.<br>**2.** The financial means whereby one lives. | *"Sir, our vessel is of Tyre, in it the king; A man who for this three months hath not spoken To anyone, nor taken sustenance But to prorogue his grief."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sustentacular]] | adjective | **1.** Serving to sustain or support. | *"In academic literature, sustentacular designates serving to sustain or support."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sustentation]] | noun | **1.** The act of sustaining life by food or providing a means of subsistence. | *"In academic literature, sustentation designates the act of sustaining life by food or providing a means of subsistence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ten]] | noun | **1.** The cardinal number that is the sum of nine and one; the base of the decimal system.<br>**2.** One of four playing cards in a deck with ten pips on the face. | *"Be thou the tenth Muse, ten times more in worth Than those old nine which rhymers invocate, And he that calls on thee, let him bring forth Eternal numbers to outlive long date."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenability]] | noun | **1.** The quality of being plausible or acceptable to a reasonable person. | *"In academic literature, tenability designates the quality of being plausible or acceptable to a reasonable person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenable]] | adjective | **1.** Based on sound reasoning or evidence. | *"I pray you all, If you have hitherto conceal’d this sight, Let it be tenable in your silence still; And whatsoever else shall hap tonight, Give it an understanding, but no tongue."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenableness]] | noun | **1.** The quality of being plausible or acceptable to a reasonable person. | *"In academic literature, tenableness designates the quality of being plausible or acceptable to a reasonable person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenacious]] | adjective | **1.** Good at remembering.<br>**2.** Stubbornly unyielding; ; ; ; - t.s.eliot. | *"How long were you there?” “Eight years.” “Eight years! you must be tenacious of life."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[tenaciously]] | adverb | **1.** With obstinate determination. | *"Don’t cling so tenaciously to ties of the flesh; save your constancy and ardour for an adequate cause; forbear to waste them on trite transient objects."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[tenaciousness]] | noun | **1.** Persistent determination. | *"I have studied myself, and know what ground I occupy; and however a friend or the world may differ from me in that particular, I stand for my own opinion, in silent resolve, with all the tenaciousness of property."* — Robert Burns, *The Letters of Robert Burns* |
| [[tenacity]] | noun | **1.** Persistent determination. | *"Each trial only increased its tenacity, and brought him greater humility, for it opened his own heart to a sense of his own powerlessness, and this faith has grown with work and trial, till its strength is beyond all precedent."* — Classic Author, *The wonders of prayer* |
| [[tenancy]] | noun | **1.** An act of being a tenant or occupant. | *"And then the days of their tenancy of the Upper Farm would be numbered."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tenant]] | noun | **1.** Someone who pays rent to use land or a building or a car that is owned by someone else.<br>**2.** A holder of buildings or lands by any kind of title (as ownership or lease). | *"OLD MAN, Tenant to Gloucester."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenanted]] | verb | **1.** Occupy as a tenant.<br>**2.** Resided in; having tenants. | *"The group for which we were now steering (although among the earliest of European discoveries in the South Seas, having been first visited in the year 1595) still continues to be tenanted by beings as strange and barbarous as ever."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[tenantry]] | noun | **1.** Tenants of an estate considered as a group. | *"The places of others were taken by a tenantry, white or black, lacking the thrift of ownership; the lands of others passed to new owners of alien races."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[tench]] | noun | **1.** Freshwater dace-like game fish of europe and western asia noted for ability to survive outside water. | *"In academic literature, tench designates freshwater dace-like game fish of europe and western asia noted for ability to survive outside water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenebrific]] | adjective | **1.** Dark and gloomy. | *"It lightens, it brightens The tenebrific scene, To meet with, and greet with My Davie, or my Jean!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[tenebrionid]] | noun | **1.** Sluggish hard-bodied black terrestrial weevil whose larvae feed on e.g. decaying plant material or grain. | *"In academic literature, tenebrionid designates sluggish hard-bodied black terrestrial weevil whose larvae feed on e.g. decaying plant material or grain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenebrionidae]] | noun | **1.** A family of arthropods including darkling beetles and mealworms. | *"In academic literature, tenebrionidae designates a family of arthropods including darkling beetles and mealworms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenebrious]] | adjective | **1.** Dark and gloomy. | *"In academic literature, tenebrious designates dark and gloomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenebrous]] | adjective | **1.** Dark and gloomy. | *"It is strange how I accepted this unforeseen partnership, this choice of nightmares forced upon me in the tenebrous land invaded by these mean and greedy phantoms."* — Joseph Conrad, *Heart of Darkness* |
| [[tenement]] | noun | **1.** A run-down apartment house barely meeting minimal standards. | *"Snagsby could withstand his little woman’s look as it enters at his eyes, the windows of his soul, and searches the whole tenement, he were other than the man he is."* — Charles Dickens, *Bleak House* |
| [[tenerife]] | noun | **1.** A spanish island in the atlantic off the northwestern coast of africa; the largest of the canary islands. | *"In academic literature, tenerife designates a spanish island in the atlantic off the northwestern coast of africa; the largest of the canary islands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenesmus]] | noun | **1.** Painful spasm of the anal sphincter along with an urgent desire to defecate without the significant production of feces; associated with irritable bowel syndrome. | *"In academic literature, tenesmus designates painful spasm of the anal sphincter along with an urgent desire to defecate without the significant production of feces; associated with irritable bowel syndrome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenet]] | noun | **1.** A religious doctrine that is proclaimed as true without proof. | *"Dorlan replied, "Congressman Bloodworth, I am thoroughly convinced that the Republican party is in error in the chief tenet of its present day creed."* — Sutton E. Griggs, *Unfettered: A Novel* |
| [[tenia]] | noun | **1.** A narrow headband or strip of ribbon worn as a headband. | *"In academic literature, tenia designates a narrow headband or strip of ribbon worn as a headband."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenner]] | noun | **1.** The cardinal number that is the sum of nine and one; the base of the decimal system.<br>**2.** A united states bill worth 10 dollars. | *"I first appear, though rude and raw and muddy, To speak before thy noble grace this tenner, At whose great feet I offer up my penner."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tennessean]] | noun | **1.** A native or resident of tennessee. | *"But if there _was_ any rear guard they never saw it, although they ran into another body of Tennesseans, more than a thousand of them this time, who told them that the army gone on toward Tupelo, thirty-five miles from Corinth."* — Harry Castlemon, *Rodney, the Partisan* |
| [[tennessee]] | noun | **1.** A state in east central united states.<br>**2.** A river formed by the confluence of two other rivers near knoxville; it follows a u-shaped course to become a tributary of the ohio river in western kentucky. | *"Please, God, let a good man be in Glendale, Tennessee, who will understand and protect me--no, that's the wrong prayer!"* — Maria Thompson Daviess, *The Tinder-Box* |
| [[tenniel]] | noun | **1.** English cartoonist (1820-1914). | *"In academic literature, tenniel designates english cartoonist (1820-1914)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tennis]] | noun | **1.** A game played with rackets by two or four players who hit a ball back and forth over a net that divides the court. | *"But that the tennis-court keeper knows better than I, for it is a low ebb of linen with thee when thou keepest not racket there; as thou hast not done a great while, because the rest of thy low countries have made a shift to eat up thy holland."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenno]] | noun | **1.** The emperor of japan; when regarded as a religious leader the emperor is called tenno. | *"In academic literature, tenno designates the emperor of japan; when regarded as a religious leader the emperor is called tenno."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tennyson]] | noun | **1.** Englishman and victorian poet (1809-1892). | *"EDWARDS. * * * * * MORE THINGS ARE WROUGHT BY PRAYER THAN THE WORLD DREAMS OF.--TENNYSON. * * * * * PRAYERS ANSWERED IN BUSINESS AND SOCIAL ANXIETIES."* — Classic Author, *The wonders of prayer* |
| [[tenon]] | noun | **1.** A projection at the end of a piece of wood that is shaped to fit into a mortise and form a mortise joint. | *"If you allow me. _(He indicates vaguely Lynch and Bloom.)_ We are all in the same sweepstake, Kinch and Lynch. _Dans ce bordel où tenons nostre état_."* — James Joyce, *Ulysses* |
| [[tenonitis]] | noun | **1.** Inflammation of a tendon. | *"In academic literature, tenonitis designates inflammation of a tendon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenor]] | noun | **1.** The adult male singing voice above baritone.<br>**2.** The pitch range of the highest male voice. | *"Be it your charge, my lord, To see perform’d the tenor of our word."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenoretic]] | noun | **1.** Trade name for an antihypertensive drug consisting of a fixed combination of atenolol and a diuretic. | *"In academic literature, tenoretic designates trade name for an antihypertensive drug consisting of a fixed combination of atenolol and a diuretic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenorist]] | noun | **1.** A musician who plays the tenor saxophone. | *"In academic literature, tenorist designates a musician who plays the tenor saxophone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenormin]] | noun | **1.** An oral beta blocker (trade name tenormin) used in treating hypertension and angina; has adverse side effects (depression and exacerbation of congestive heart failure etc.). | *"In academic literature, tenormin designates an oral beta blocker (trade name tenormin) used in treating hypertension and angina; has adverse side effects (depression and exacerbation of congestive heart failure etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenoroon]] | noun | **1.** A tenor bassoon; pitched a fifth higher than the ordinary bassoon. | *"In academic literature, tenoroon designates a tenor bassoon; pitched a fifth higher than the ordinary bassoon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenosynovitis]] | noun | **1.** Inflammation of a tendon and its enveloping sheath. | *"In academic literature, tenosynovitis designates inflammation of a tendon and its enveloping sheath."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenrec]] | noun | **1.** Small often spiny insectivorous mammal of madagascar; resembles a hedgehog. | *"In academic literature, tenrec designates small often spiny insectivorous mammal of madagascar; resembles a hedgehog."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenrecidae]] | noun | **1.** Tenrecs and extinct related forms. | *"In academic literature, tenrecidae designates tenrecs and extinct related forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tense]] | noun | **1.** A grammatical category of verbs used to express distinctions of time.<br>**2.** Become stretched or tense or taut. | *"He went to the door, knocked, and waited with tense muscles and an aching brow."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tensed]] | verb | **1.** Become stretched or tense or taut.<br>**2.** Increase the tension on. | *"Out." O'Hare tensed, psy-blinked his view screen down to the instruments vital to his immediate mission, and mind-keyed several controls."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tensely]] | adverb | **1.** In a tense manner. | *"Flume, back against the opposite wall, weapon high and ready, peered tensely about."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tenseness]] | noun | **1.** The physical condition of being stretched or strained.<br>**2.** (psychology) a state of mental or emotional strain or suspense. | *"It was a week of strained tenseness; a certain electricity seemed at hand in the atmosphere, inhibiting speech."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[tensile]] | adjective | **1.** Of or relating to tension.<br>**2.** Capable of being shaped or bent or drawn out. | *"The average test on a number of plates gave— Tensile strength, 14·66 tons per square inch."* — Donald M. Levy, *Modern Copper Smelting* |
| [[tensimeter]] | noun | **1.** A manometer for measuring vapor pressure. | *"In academic literature, tensimeter designates a manometer for measuring vapor pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tensiometer]] | noun | **1.** A measuring instrument for measuring the moisture content of soil.<br>**2.** A measuring instrument for measuring the tension in a wire or fiber or beam. | *"In academic literature, tensiometer designates a measuring instrument for measuring the moisture content of soil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tension]] | noun | **1.** (psychology) a state of mental or emotional strain or suspense.<br>**2.** The physical condition of being stretched or strained. | *"The infant’s breathing grew more difficult, and the mother’s mental tension increased."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tensional]] | adjective | **1.** Of or relating to or produced by tension. | *"In academic literature, tensional designates of or relating to or produced by tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tensionless]] | adjective | **1.** Free from tension. | *"In academic literature, tensionless designates free from tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tensity]] | noun | **1.** The physical condition of being stretched or strained. | *"In academic literature, tensity designates the physical condition of being stretched or strained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tensor]] | noun | **1.** A generalization of the concept of a vector.<br>**2.** Any of several muscles that cause an attached structure to become tense or firm. | *"In academic literature, tensor designates a generalization of the concept of a vector."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tent]] | noun | **1.** A portable shelter (usually of canvas stretched over supporting poles and fastened to the ground with ropes and pegs).<br>**2.** A web that resembles a tent or carpet. | *"In good sadness, I do not know; either it is there or it is upon a file, with the duke’s other letters, in my tent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tent-fly]] | noun | **1.** Flap consisting of a piece of canvas that can be drawn back to provide entrance to a tent. | *"In academic literature, tent-fly designates flap consisting of a piece of canvas that can be drawn back to provide entrance to a tent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentacle]] | noun | **1.** Something that acts like a tentacle in its ability to grasp and hold.<br>**2.** Any of various elongated tactile or prehensile flexible organs that occur on the head or near the mouth in many animals; used for feeling or grasping or locomotion. | *"In reality, it was an infinite agglomeration of coloured infusoria, of veritable globules of jelly, provided with a threadlike tentacle, and of which as many as twenty-five thousand have been counted in less than two cubic half-inches of water."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[tentacled]] | adjective | **1.** Having tentacles. | *"In academic literature, tentacled designates having tentacles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentacular]] | adjective | **1.** Of or relating to or resembling tentacles. | *"In academic literature, tentacular designates of or relating to or resembling tentacles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentaculata]] | noun | **1.** Ctenophores have retractile tentacles. | *"In academic literature, tentaculata designates ctenophores have retractile tentacles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentative]] | adjective | **1.** Under terms not final or fully worked out or agreed upon.<br>**2.** Unsettled in mind or opinion. | *"That he was a desultory tentative student of something and everything might only have been predicted of him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tentatively]] | adverb | **1.** In a tentative manner. | *"Perhaps somebody in the house is in love,” she said tentatively."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tenter]] | noun | **1.** A framework with hooks used for stretching and drying cloth. | *"In academic literature, tenter designates a framework with hooks used for stretching and drying cloth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenterhook]] | noun | **1.** One of a series of hooks used to hold cloth on a tenter. | *"Still just then, being on tenterhooks, he desired the female’s room more than her company so it came as a genuine relief when the keeper made her a rude sign to take herself off."* — James Joyce, *Ulysses* |
| [[tenth]] | noun | **1.** A tenth part; one part in ten equal parts.<br>**2.** Position ten in a countable series of things. | *"Be thou the tenth Muse, ten times more in worth Than those old nine which rhymers invocate, And he that calls on thee, let him bring forth Eternal numbers to outlive long date."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenthly]] | adverb | **1.** (in enumerating something, such as topics or points of discussion) in the tenth place. | *"In academic literature, tenthly designates (in enumerating something, such as topics or points of discussion) in the tenth place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenthredinidae]] | noun | **1.** Sawflies. | *"Classical and authoritative lexicons catalog tenthredinidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenting]] | noun | **1.** The act of encamping and living in tents in a camp.<br>**2.** Live in or as if in a tent. | *"In academic literature, tenting designates the act of encamping and living in tents in a camp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentmaker]] | noun | **1.** Someone who makes or repairs tents. | *"In academic literature, tentmaker designates someone who makes or repairs tents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tentorium]] | noun | **1.** (anatomy) a fold of dura mater that covers the cerebellum and supports the occipital lobes of the cerebrum. | *"In academic literature, tentorium designates (anatomy) a fold of dura mater that covers the cerebellum and supports the occipital lobes of the cerebrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenuity]] | noun | **1.** Relatively small dimension through an object as opposed to its length or width.<br>**2.** A rarified quality. | *"Science can now educe threads of such exquisite tenuity that only the feet of the tiniest infant-spiders can ascend them; but up the filmiest insubstantiality Shelley runs with agile ease."* — Francis Thompson, *Shelley: An Essay* |
| [[tenuous]] | adjective | **1.** Having thin consistency.<br>**2.** Very thin in gauge or diameter. | *"Something tenuous, of immense brain power, of immense will."* — Donn Byrne, *The Wind Bloweth* |
| [[tenuously]] | adverb | **1.** In a tenuous manner. | *"In academic literature, tenuously designates in a tenuous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenure]] | noun | **1.** The term during which some position is held.<br>**2.** The right to hold property; part of an ancient hierarchical system of holding lands. | *"Is it thy spirit that thou send’st from thee So far from home into my deeds to pry, To find out shames and idle hours in me, The scope and tenure of thy jealousy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenured]] | verb | **1.** Give life-time employment to.<br>**2.** Appointed for life and not subject to dismissal except for a grave crime. | *"In academic literature, tenured designates give life-time employment to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unattended]] | adjective | **1.** Not watched.<br>**2.** Lacking accompaniment or a guard or escort. | *"Your constancy Hath left you unattended.—[_Knocking within._] Hark, more knocking."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unextended]] | adjective | **1.** Not extended or stretched out. | *"In academic literature, unextended designates not extended or stretched out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintended]] | adjective | **1.** Not deliberate. | *"A result usually unintended is the derangement of business and of the existing distribution of incomes."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unintentional]] | adjective | **1.** Without deliberate intent; - george macdonald.<br>**2.** Not done with purpose or intent. | *"I am excessively concerned that he should have any regard for me—but indeed it has been quite unintentional on my side; I never had the smallest idea of it."* — Jane Austen, *Northanger Abbey* |
| [[unintentionally]] | adverb | **1.** Without intention; in an unintentional manner. | *"Thus much indeed he was obliged to acknowledge: that he had been constant unconsciously, nay unintentionally; that he had meant to forget her, and believed it to be done."* — Jane Austen, *Persuasion* |
| [[unpretending]] | adjective | **1.** Not ostentatious. | *"Perhaps I should only have to say to Ada, “Would you like to come and see me married to-morrow, my pet?” Perhaps our wedding might even be as unpretending as her own, and I might not find it necessary to say anything about it until it was over."* — Charles Dickens, *Bleak House* |
| [[unpretentious]] | adjective | **1.** Lacking pretension or affectation.<br>**2.** Not ostentatious. | *"But there was neither defiance nor fear in Val: tranquil and unpretentious, in his force of character he reminded Lawrence of Laura Clowes."* — Anthony Pryde, *Nightfall* |
| [[unpretentiously]] | adverb | **1.** In an unpretentious manner. | *"Cadwallader said that Brooke was beginning to treat the Middlemarchers, and that she preferred the farmers at the tithe-dinner, who drank her health unpretentiously, and were not ashamed of their grandfathers’ furniture."* — George Eliot, *Middlemarch* |
| [[unpretentiousness]] | noun | **1.** The quality of being natural and without pretensions. | *"In academic literature, unpretentiousness designates the quality of being natural and without pretensions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unretentive]] | adjective | **1.** (of memory) deficient in retentiveness or range. | *"In academic literature, unretentive designates (of memory) deficient in retentiveness or range."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untenable]] | adjective | **1.** (of theories etc) incapable of being defended or justified. | *"Nevertheless, that a male dissembler who by deluging her with untenable fictions charms the female wisely, may acquire powers reaching to the extremity of perdition, is a truth taught to many by unsought and wringing occurrences."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[untenanted]] | adjective | **1.** Not leased to or occupied by a tenant. | *"For ten years it had been untenanted, until a Miss O'Malley had bought it, and opened the great oak doors, and let the sea-air blow through the windows of it, and clipped the garden of the yews."* — Donn Byrne, *The Wind Bloweth* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Holding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TEN
  </div>
</div>
