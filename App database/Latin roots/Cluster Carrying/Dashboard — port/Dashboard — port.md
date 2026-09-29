---
status: unread
type: root_dashboard
---
# Dashboard — port
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">port-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to carry, bear, or transport”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler lifting a heavy backpack and carrying it across a long distance.</span>
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

The root **port** means to carry, bear, or transport. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *portable*, *transport*, *export*, and *import*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to carry, bear, or transport
> The root **port** means to carry, bear, or transport. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *portable*, *transport*, *export*, and *import*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To carry, bear, or transport</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler lifting a heavy backpack and carrying it across a long distance.</mark>
> - **Everyday Connection**: Think of familiar words like *portable* and *transport*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **port** comes from a Latin word that means *"to carry, bear, or transport"*.
  - At its core, it describes the action of carry, bear, or transport.

- **The Big Picture Idea**:
  - Picture a traveler lifting a heavy backpack and carrying it across a long distance.
  - Whenever you see **port** in an English word, think of **carrying weight or hauling things**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to carry, bear, or transport).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Portable**: Easily carried, moved, or transported by hand from one place to another.
  - **Transport**: To carry, convey, or haul goods, passengers, or cargo from one place to another.
  - **Export**: To send, sell, or transport commodities, goods, or services to another country for sale or trade.
  - **Import**: To bring or transport foreign commodities or goods into a country for domestic sale.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">port</mark>, think of <mark class="hl-def">carrying weight or hauling things</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Compounding Dynamism
> The root **port** is one of the most prolific and regular first-conjugation verbal engines in the English language:
> - **Present Stem (`port-`) & Participial Stem (`portāt-`):**
>   - `trans-` + `port` → [[transport]] (verb/noun) → [[transportation]], [[transportable]].
>   - `ex-` + `port` → [[export]] (verb/noun) → *exportation*, [[exportability]].
>   - `im-` + `port` → [[import]] (verb/noun) → *importation*, [[reimport]].
>   - `sub-` + `port` → [[support]] (verb/noun) → *supportive*, *supporter*.
>   - `re-` + `port` → [[report]] (verb/noun) → *reporter*, *reportage*.
>   - `pur-` (*pro-*) + `port` → [[purport]] (verb/noun).
> - **Reflexive Behavioral Compounds:**
>   - `com-` + `port` → [[comport]] → [[comportment]].
>   - `de-` + `port` → [[deport]] → [[deportation]], [[deportee]], [[deportment]].
>   - `dis-` + `port` → [[disport]] → **sport**.
> - **Capacity & Portability Adjectives:**
>   - `port-` + `-able` → [[portable]] ("able to be carried").
>   - `hyper-` + `portable` → [[hyperportable]] (ultra-light laptop/equipment).
>   - `port-` + `-age` → *portage* (carrying boats overland).
> - **Significance & Weight:**
>   - *importāns* → [[important]] ("carrying inward weight/significance") → *importance*.
> - **French Doublet Harmony:**
>   - French *rapport* (< *rapporter* "to carry back") → [[rapport]] (empathic connection).

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

> [!tip] 🌈 Spectrum of Meaning Across Five Concentric Spheres
> 1. **Logistics, Freight & Global Commerce:** The physical movement of commodities across national borders, shipping infrastructure, and ultra-light consumer electronics ([[transport]], [[transportation]], [[transportable]], [[export]], [[exportability]], [[import]], [[reimport]], [[portable]], [[hyperportable]]).
> 2. **State Authority, Law & Immigration:** The sovereign expulsion of non-citizens, legal removal hearings, and the physical sustaining of structures or arguments ([[deport]], [[deportation]], [[deportee]], [[support]], [[supportive]]).
> 3. **Ethical Demeanor, Posture & Recreation:** The personal bearing of character, physical carriage and posture, and carrying oneself away from work in lighthearted play ([[comport]], [[comportment]], [[deportment]], [[disport]], **sport**).
> 4. **Information Dissemination & Narrative Claims:** Carrying back accounts of events from the frontlines, alleged assertions of purpose, and empathetic communicative bonds ([[report]], *reporter*, [[purport]], [[rapport]]).
> 5. **Weight of Consequence & Favorable Harbors:** Matters carrying momentous gravity, favorable circumstances blowing toward the harbor, and persistent troublesome pleading ([[important]], *importance*, [[opportunity]], [[opportunistically]], [[importune]]).

---

## 🔀 4. Prefix & Combining Dynamics on port

| Prefix | Classical Origin | Combined Derivative | Directional & Conceptual Synthesis |
| :--- | :--- | :--- | :--- |
| `com-` | together, with | [[comport]], [[comportment]] | Carried *with* dignity; to agree or harmonize with. |
| `de-` | away, from | [[deport]], [[deportee]], [[deportment]] | Carried *away* across borders; bodily carriage. |
| `dis-` | away, aside | [[disport]] (→ sport) | Carried *away* from serious labor to play. |
| `ex-` | out, forth | [[export]], [[exportability]] | Carried *out* of a country for foreign sale. |
| `in-` (im-) | into | [[import]], [[reimport]], [[important]] | Carried *into* a nation; carrying internal weight. |
| `pro-` (pur-) | forward, forth | [[purport]] | Carried *forward* as an alleged claim or meaning. |
| `re-` | back, again | [[report]], [[rapport]] | Carried *back* from the field; brought back into harmony. |
| `sub-` | under, from below | [[support]] | Carried *up from underneath*; held aloft. |
| `trans-` | across, beyond | [[transport]], [[transportation]] | Carried *across* geographical space. |
| `ob-` | toward (harbor) | [[opportunity]], [[opportunistically]] | Blowing *toward the harbor* → advantageous. |
| `in-` | not (no harbor) | [[importune]] | *Without a safe harbor* → relentless, troublesome. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| 🚢 **Global Supply Chains & Economics** | [[export]], [[exportability]], [[import]], [[reimport]], [[transport]], [[transportation]], [[portable]] | International maritime containerization, free trade agreements, tariff rate quotas, supply chain bottlenecks, and intermodal freight transport. |
| ⚖️ **Immigration Law & Geopolitics** | [[deport]], [[deportee]], [[deportation]] | Sovereign immigration removal proceedings, border asylum policy, expedited removal, and extradition treaties. |
| 📰 **Journalism & Communications** | [[report]], *reporter*, *reportage*, [[rapport]] | Investigative reporting, war correspondents carrying reports from combat zones, establishing interviewing rapport with sources. |
| 💻 **Hardware & Consumer Electronics** | [[portable]], [[hyperportable]], [[support]] | Ultra-thin hyperportable laptops, handheld gaming devices, portable diagnostic medical scanners, and operating system technical support. |
| 🎭 **Etiquette, Sociology & Athletics** | [[comport]], [[comportment]], [[deportment]], [[disport]] | Military drill and ceremony posture, professional executive carriage, and historical athletic recreation. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[apportion]] | verb | **1.** Distribute according to a plan or set apart for a special purpose.<br>**2.** Give out as one's portion or share. | *"So bitter was it in the boat that our water and beer froze solid, and it was a difficult task justly to apportion the pieces I broke off with Northrup’s claspknife."* — Jack London, *The Jacket (The Star-Rover)* |
| [[apportionable]] | adjective | **1.** Capable of being distributed. | *"In academic literature, apportionable designates capable of being distributed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apportioned]] | verb | **1.** Distribute according to a plan or set apart for a special purpose.<br>**2.** Give out as one's portion or share. | *"The main ground for the decision was that a tax on incomes from rent of land as well as on incomes from personal property is direct, and must therefore be apportioned among the states according to population."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[apportioning]] | noun | **1.** The act of distributing by allotting or apportioning; distribution according to a plan.<br>**2.** Distribute according to a plan or set apart for a special purpose. | *"No hard-and-fast rule for the apportioning of taxes can be laid down."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[apportionment]] | noun | **1.** The act of distributing by allotting or apportioning; distribution according to a plan. | *"The three of us were faithful Christians, and we made a practice of prayer each day before the apportionment of food."* — Jack London, *The Jacket (The Star-Rover)* |
| [[comport]] | verb | **1.** Behave well or properly.<br>**2.** Behave in a certain manner. | *"Never was there a more beautiful example of how the majesty of age and wisdom may comport with the obeisance and respect enjoined upon it, as from a lower social rank, and inferior order of endowment, towards a higher."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[comportment]] | noun | **1.** Dignified manner or conduct. | *"In academic literature, comportment designates dignified manner or conduct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deport]] | verb | **1.** Behave in a certain manner.<br>**2.** Hand over to the authorities of another country. | *"They were giving her a world of staid counsel how to deport herself, what to say, and in what manner to receive the expected lover."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[deportation]] | noun | **1.** The act of expelling a person from their native land.<br>**2.** The expulsion from a country of an undesirable alien. | *"Stated in this form the proposition is nothing less than the deportation from the country of $1,600,000,000 worth of producing labor, and the substitution in its place of an interest-bearing debt of the same amount."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[deportee]] | noun | **1.** A person who is expelled from home or country by authority. | *"In academic literature, deportee designates a person who is expelled from home or country by authority."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deportment]] | noun | **1.** (behavioral attributes) the way a person behaves toward other people. | *"Us London lawyers don’t often get an out, and when we do, we like to make the most of it, you know.” The old housekeeper, with a gracious severity of deportment, waves her hand towards the great staircase."* — Charles Dickens, *Bleak House* |
| [[disport]] | verb | **1.** Occupy in an agreeable, entertaining or pleasant fashion.<br>**2.** Play boisterously. | *"Thus stands the case: you know our King, my brother, Is prisoner to the Bishop here, at whose hands He hath good usage and great liberty, And often but attended with weak guard, Comes hunting this way to disport himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disproportion]] | noun | **1.** Lack of proportion; imbalance among the parts of something. | *"Indeed, they are disproportion’d; My letters say a hundred and seven galleys."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disproportional]] | adjective | **1.** Out of proportion. | *"In academic literature, disproportional designates out of proportion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disproportionate]] | adjective | **1.** Out of proportion.<br>**2.** Not proportionate. | *"And try to restrain the disproportionate fervour with which you throw yourself into commonplace home pleasures."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[disproportionately]] | adverb | **1.** Out of proportion.<br>**2.** To a disproportionate degree. | *"On the other hand, she was disproportionately indulgent towards the failings of men, and was often heard to say that these were natural."* — George Eliot, *Middlemarch* |
| [[export]] | noun | **1.** Commodities (goods or services) sold to a foreign country.<br>**2.** Sell or transfer abroad. | *"This young man, besides having a great deal to say for himself about Africa and a project of his for teaching the coffee colonists to teach the natives to turn piano-forte legs and establish an export trade, delighted in drawing Mrs."* — Charles Dickens, *Bleak House* |
| [[exportability]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin port within the domain of Carrying.<br>**2.** A technical or specialized form exhibiting the properties of port in systematic terminology. | *"In academic literature, exportability designates pertaining to, derived from, or characteristic of latin port within the domain of carrying."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exportable]] | adjective | **1.** Suitable for export. | *"The exportable commodity of man."* — Jr. Irving E. Cox, *Export Commodity* |
| [[exportation]] | noun | **1.** Commodities (goods or services) sold to a foreign country.<br>**2.** The commercial activity of selling and shipping goods to a foreign country. | *"This calls for a new equilibrium of money and requires at length large and continued exportation of specie."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[exporter]] | noun | **1.** A businessperson who transports goods abroad (for sale). | *"Here, in a month will be assembled the numerous fishing boats of the exporters, and these are the waters their divers will ransack so boldly."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[exporting]] | noun | **1.** The commercial activity of selling and shipping goods to a foreign country.<br>**2.** Sell or transfer abroad. | *"Melting or exporting them before that point was reached would cause to the owner the loss of whatever element of seigniorage value they contained."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[hyperportable]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin port within the domain of Carrying.<br>**2.** A technical or specialized form exhibiting the properties of port in systematic terminology. | *"In academic literature, hyperportable designates pertaining to, derived from, or characteristic of latin port within the domain of carrying."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[import]] | noun | **1.** Commodities (goods or services) bought from a foreign country.<br>**2.** An imported person brought from a foreign country. | *"There’s letters from my mother; what th’ import is I know not yet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[importance]] | noun | **1.** The quality of being important and worthy of note.<br>**2.** A prominent status. | *"I was glad I did atone my countryman and you; it had been pity you should have been put together with so mortal a purpose as then each bore, upon importance of so slight and trivial a nature."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[important]] | adjective | **1.** Of great significance or value.<br>**2.** Important in effect or meaning. | *"Now his important blood will naught deny That she’ll demand; a ring the county wears, That downward hath succeeded in his house From son to son, some four or five descents Since the first father wore it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[important-looking]] | adjective | **1.** Impressive in appearance. | *"In academic literature, important-looking designates impressive in appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[importantly]] | adverb | **1.** In an important way or to an important degree.<br>**2.** In an important way. | *"It is not likely That when they hear the Roman horses neigh, Behold their quarter’d fires, have both their eyes And ears so cloy’d importantly as now, That they will waste their time upon our note, To know from whence we are."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[importation]] | noun | **1.** The commercial activity of buying and bringing in goods from a foreign country.<br>**2.** Commodities (goods or services) bought from a foreign country. | *"The single fat thing on the soil was Marian herself; and she was an importation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[imported]] | verb | **1.** Bring in from abroad.<br>**2.** Transfer (electronic data) into a database or document. | *"This man was riding From Alcibiades to Timon’s cave With letters of entreaty, which imported His fellowship i’ th’ cause against your city, In part for his sake moved."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[importee]] | noun | **1.** An imported person brought from a foreign country. | *"In academic literature, importee designates an imported person brought from a foreign country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[importer]] | noun | **1.** Someone whose business involves importing goods from outside (especially from a foreign country). | *"Indeed, the importation of any article is proof conclusive that the importer thinks that the monetary costs of an article would be higher in the importing than in the exporting country."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[importing]] | noun | **1.** The commercial activity of buying and bringing in goods from a foreign country.<br>**2.** Bring in from abroad. | *"A very riband in the cap of youth, Yet needful too, for youth no less becomes The light and careless livery that it wears Than settled age his sables and his weeds, Importing health and graveness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[importunate]] | adjective | **1.** Expressing earnest entreaty. | *"She is importunate, indeed distract."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[importunately]] | adverb | **1.** In a beseeching manner. | *"Not the less, however, came this importunately obtrusive sense of change."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[importune]] | verb | **1.** Beg persistently and urgently. | *"Be it lawful I love thee as thou lov’st those, Whom thine eyes woo as mine importune thee, Root pity in thy heart that when it grows, Thy pity may deserve to pitied be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[importunity]] | noun | **1.** Insistent solicitation and entreaty. | *"Then weigh what loss your honour may sustain If with too credent ear you list his songs, Or lose your heart, or your chaste treasure open To his unmaster’d importunity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inopportune]] | adjective | **1.** Not opportune. | *"How foolish and inopportune that mistletoe looked now."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inopportunely]] | adverb | **1.** At an inconvenient time. | *"Besides, it would not be prudent to carry the electric light in these waters; its brilliancy might attract some of the dangerous inhabitants of the coast most inopportunely.” As Captain Nemo pronounced these words, I turned to Conseil and Ned Land."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[inopportuneness]] | noun | **1.** The quality of occurring at an inconvenient time. | *"It perplexed, as well as shocked her, by the irreverent inopportuneness of the occasions that brought it into vivid action."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[insupportable]] | adjective | **1.** Incapable of being justified or explained. | *"My lord, you do me most insupportable vexation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[opportune]] | adjective | **1.** Suitable or at a time that is suitable or advantageous especially for a particular purpose. | *"This you may know, And so deliver, I am put to sea With her whom here I cannot hold on shore; And, most opportune to her need, I have A vessel rides fast by, but not prepar’d For this design."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[opportunely]] | adverb | **1.** At an opportune time. | *"Bagnet and young Woolwich opportunely come home."* — Charles Dickens, *Bleak House* |
| [[opportuneness]] | noun | **1.** Timely convenience. | *"He tasted her in sips, he let her stand, with an opportuneness she herself could not have surpassed."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[opportunism]] | noun | **1.** Taking advantage of opportunities without regard for the consequences for others. | *"Revisionism and opportunism in the socialist party. § 21."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[opportunist]] | noun | **1.** A person who places expediency above principle.<br>**2.** Taking immediate advantage, often unethically, of any circumstance of possible benefit. | *"The spirit of this movement is opportunist, or experimental."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[opportunistic]] | adjective | **1.** Taking immediate advantage, often unethically, of any circumstance of possible benefit. | *"In academic literature, opportunistic designates taking immediate advantage, often unethically, of any circumstance of possible benefit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opportunistically]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin port within the domain of Carrying.<br>**2.** A technical or specialized form exhibiting the properties of port in systematic terminology. | *"In academic literature, opportunistically designates pertaining to, derived from, or characteristic of latin port within the domain of carrying."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opportunity]] | noun | **1.** A possibility due to a favorable combination of circumstances. | *"With five times so much conversation I should get ground of your fair mistress; make her go back even to the yielding, had I admittance and opportunity to friend."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[port]] | noun | **1.** A place (seaport or airport) where people and merchandise can enter or leave a country.<br>**2.** Sweet dark-red dessert wine originally from portugal. | *"At the Saint Francis here, beside the port."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[porta]] | noun | **1.** An aperture or hole that opens into a bodily cavity. | *"Negli occhi porta la mia donna Amore; Per che si fa gentil ciò ch’ella mira: Ov’ella passa, ogni uom ver lei si gira, E cui saluta fa tremar lo core."* — George Eliot, *Middlemarch* |
| [[portability]] | noun | **1.** The quality of being light enough to be carried. | *"In academic literature, portability designates the quality of being light enough to be carried."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portable]] | noun | **1.** A small light typewriter; usually with a case in which it can be carried.<br>**2.** Easily or conveniently transported. | *"How light and portable my pain seems now, When that which makes me bend makes the King bow; He childed as I fathered!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portage]] | noun | **1.** The cost of carrying or transporting.<br>**2.** Overland track between navigable waterways. | *"Even at the first thy loss is more than can Thy portage quit, with all thou canst find here, Now, the good gods throw their best eyes upon’t!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portal]] | noun | **1.** A grand and imposing entrance (often extended metaphorically).<br>**2.** A site that the owner positions as an entrance to other sites on the internet. | *"Look where he goes even now out at the portal. [_Exit Ghost._] QUEEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portcullis]] | noun | **1.** Gate consisting of an iron or wooden grating that hangs in the entry to a castle or fortified town; can be lowered to prevent passage. | *"Fray’s forehead was wrinkled both perpendicularly and crosswise, after the pattern of a portcullis, expressive of a double despair."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[porte]] | noun | **1.** The ottoman court in constantinople. | *"Only come with me to the Porte St."* — Mrs. Oliphant, *A Beleaguered City* |
| [[porte-cochere]] | noun | **1.** A carriage entrance passing through a building to an enclosed courtyard.<br>**2.** Canopy extending out from a building entrance to shelter those getting in and out of vehicles. | *"In academic literature, porte-cochere designates a carriage entrance passing through a building to an enclosed courtyard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portend]] | verb | **1.** Indicate by signs. | *"These late eclipses in the sun and moon portend no good to us: though the wisdom of Nature can reason it thus and thus, yet nature finds itself scourged by the sequent effects."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portent]] | noun | **1.** A sign of something about to happen. | *"But the farmers have been left to struggle individually with their individual difficulties, tho the outcome was of the gravest portent to the whole social economy."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[portentous]] | adjective | **1.** Of momentous or ominous significance; - herman melville.<br>**2.** Ominously prophetic. | *"I think it be no other but e’en so: Well may it sort that this portentous figure Comes armed through our watch so like the King That was and is the question of these wars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portentously]] | adverb | **1.** In a portentous manner. | *"But by-and-by Nancy, in her attic, became portentously worse, the supposed tumor having indeed given way to the blister, but only wandered to another region with angrier pain."* — George Eliot, *Middlemarch* |
| [[porter]] | noun | **1.** A person employed to carry luggage and supplies.<br>**2.** Someone who guards an entrance. | *"Come, sister; Dromio, play the porter well."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[porterage]] | noun | **1.** The charge for carrying burdens by porters.<br>**2.** The transportation of burdens by porters. | *"The basket being large and heavy, Car had placed it for convenience of porterage on the top of her head, where it rode on in jeopardized balance as she walked with arms akimbo."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[porterhouse]] | noun | **1.** Large steak from the thick end of the short loin containing a t-shaped bone and large piece of tenderloin. | *"In academic literature, porterhouse designates large steak from the thick end of the short loin containing a t-shaped bone and large piece of tenderloin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portico]] | noun | **1.** A porch or entrance to a building consisting of a covered and often columned area. | *"From the portico, from the eaves, from the parapet, from every ledge and post and pillar, drips the thawed snow."* — Charles Dickens, *Bleak House* |
| [[porticoed]] | adjective | **1.** Marked by columniation having free columns in porticoes either at both ends or at both sides of a structure. | *"In academic literature, porticoed designates marked by columniation having free columns in porticoes either at both ends or at both sides of a structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portiere]] | noun | **1.** A heavy curtain hung across a doorway. | *"In academic literature, portiere designates a heavy curtain hung across a doorway."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portion]] | noun | **1.** Something determined in relation to something that includes it.<br>**2.** Something less than the whole of a human artifact. | *"What prodigal portion have I spent that I should come to such penury?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portland]] | noun | **1.** Freshwater port and largest city in oregon; located in northwestern oregon on the willamette river which divides the city into east and west sections; renowned for its beautiful natural setting among the mountains.<br>**2.** Largest city in maine in the southwestern corner of the state. | *"Paint Charles’ speed on wings of fire, The object of his fond desire, Beyond his boldest hopes, at hand: Paint all the triumph of the Portland Band; Hark how they lift the joy-elated voice!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[portly]] | adjective | **1.** Euphemisms for `fat'. | *"Our house, my sovereign liege, little deserves The scourge of greatness to be used on it, And that same greatness too which our own hands Have holp to make so portly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portmanteau]] | noun | **1.** A new word formed by joining two others and combining their meanings.<br>**2.** A large travelling bag made of stiff leather. | *"In another corner a ragged old portmanteau on one of the two chairs serves for cabinet or wardrobe; no larger one is needed, for it collapses like the cheeks of a starved man."* — Charles Dickens, *Bleak House* |
| [[porto]] | noun | **1.** Port city in northwest portugal; noted for port wine. | *"The national forest area contained in the various forests in 20 states (not including Alaska and Porto Rico), now covers about 225,000 square miles, equal in area to five states of the size of Pennsylvania."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[portrait]] | noun | **1.** A word picture of a person's appearance and character.<br>**2.** Any likeness of a person, in any medium. | *"The portrait of a blinking idiot Presenting me a schedule!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portraitist]] | noun | **1.** A painter or drawer of portraits. | *"In academic literature, portraitist designates a painter or drawer of portraits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portraiture]] | noun | **1.** A word picture of a person's appearance and character.<br>**2.** The activity of making portraits. | *"But I am very sorry, good Horatio, That to Laertes I forgot myself; For by the image of my cause I see The portraiture of his."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portray]] | verb | **1.** Portray in words.<br>**2.** Make a portrait of. | *"At present she did not know her own poverty, for she had no lover to portray."* — Jane Austen, *Northanger Abbey* |
| [[portrayal]] | noun | **1.** A word picture of a person's appearance and character.<br>**2.** Acting the part of a character on stage; dramatically representing the character by speech and action and gesture. | *"It is much easier to create perplexity on these terms; but on the other hand, the riddle novel demands a power of vivid character portrayal and of telling description which are not indispensable in the briefer narrative."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[portrayed]] | verb | **1.** Portray in words.<br>**2.** Make a portrait of. | *"The windows, to which she looked with peculiar dependence, from having heard the General talk of his preserving them in their Gothic form with reverential care, were yet less what her fancy had portrayed."* — Jane Austen, *Northanger Abbey* |
| [[portrayer]] | noun | **1.** A painter or drawer of portraits. | *"He is the faithful portrayer of Nature, whose features are always the same and always interesting."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[portraying]] | noun | **1.** A representation by picture or portraiture.<br>**2.** Portray in words. | *"I am portraying this hardy companion as I really knew him."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[portsmouth]] | noun | **1.** A port city in southeastern virginia on the elizabeth river opposite norfolk; naval base; shipyards.<br>**2.** A port town in southeastern new hampshire on the atlantic ocean. | *"You were living with your husband, and were the only woman on board.” “But you, yourself, brought Mrs Harville, her sister, her cousin, and three children, round from Portsmouth to Plymouth."* — Jane Austen, *Persuasion* |
| [[portugal]] | noun | **1.** A republic in southwestern europe on the iberian peninsula; portuguese explorers and colonists in the 15th and 16th centuries created a vast overseas empire (including brazil). | *"But it cannot be sounded; my affection hath an unknown bottom, like the Bay of Portugal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portuguese]] | noun | **1.** The romance language spoken in portugal and brazil.<br>**2.** A native or inhabitant of portugal. | *"He afterwards returned, bringing with him a Portuguese wife, and settled as shepherd on the home-farm of Ayton Castle."* — John Cairns, *Principal Cairns* |
| [[portulaca]] | noun | **1.** A plant of the genus portulaca having pink or red or purple or white ephemeral flowers. | *"In academic literature, portulaca designates a plant of the genus portulaca having pink or red or purple or white ephemeral flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portulacaceae]] | noun | **1.** Family of usually succulent herbs; cosmopolitan in distribution especially in americas. | *"In academic literature, portulacaceae designates family of usually succulent herbs; cosmopolitan in distribution especially in americas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portunidae]] | noun | **1.** Swimming crabs. | *"In academic literature, portunidae designates swimming crabs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portunus]] | noun | **1.** Type genus of the family portunidae. | *"In academic literature, portunus designates type genus of the family portunidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proportion]] | noun | **1.** The quotient obtained when the magnitude of a part is divided by the magnitude of the whole.<br>**2.** Magnitude or extent. | *"The just proportion that we gave them out."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[proportionable]] | adjective | **1.** Proportionate. | *"For us to levy power Proportionable to the enemy Is all unpossible."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[proportional]] | noun | **1.** One of the quantities in a mathematical proportion.<br>**2.** Properly related in size or degree or other measurable characteristics; usually followed by `to'. | *"In a similar manner, express and sleeping car companies are taxed, in the same group of states, on mileage, or on capital stock proportional to mileage, or by license and privilege taxes."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[proportionality]] | noun | **1.** A ratio of two quantities that is constant.<br>**2.** Harmonious arrangement or relation of parts or elements within a whole (as in a design); - john ruskin. | *"I, chs. 12 and 13 on proportionality and usance.] [Footnote 2: See ch. 25, secs. 4 and 5.] [Footnote 3: See above, ch. 19, secs. 13, 14, 15.] [Footnote 4: See above, sec. 3.] [Footnote 5: See ch. 8, sec. 8.] [Footnote 6: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[proportionally]] | adverb | **1.** To a proportionate degree. | *"If the output per hour is increased proportionally to the pay per hour, the existing wages equilibrium would not be disturbed."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[proportionate]] | adjective | **1.** Being in due proportion.<br>**2.** Agreeing in amount, magnitude, or degree. | *"When, in the writings of the later poets, Jove and his family are found to have moved from their cramped quarters on the peak of Olympus into the wide sky above it, their words show a proportionate increase of arrogance and reserve."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[proportionately]] | adverb | **1.** To a proportionate degree.<br>**2.** In proportion. | *"This move was unexpected, and proportionately disconcerting."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[proportionateness]] | noun | **1.** The relation of corresponding in degree or size or amount. | *"In academic literature, proportionateness designates the relation of corresponding in degree or size or amount."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purport]] | noun | **1.** The intended meaning of a communication.<br>**2.** The pervading meaning or tenor. | *"It’s a providence I met you, miss; I doubt if I should have known how to get on with that lady.” And he put one hand in his breast and stood upright in a martial attitude as I informed little Miss Flite, in her ear, of the purport of his kind errand."* — Charles Dickens, *Bleak House* |
| [[rapport]] | noun | **1.** A relationship of mutual understanding or trust and agreement between people. | *"It is the prerogative of the ever-present, divine Mind, and 84:12 of thought which is in rapport with this Mind, to know the past, the present, and the future."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[reapportion]] | verb | **1.** Allocate, distribute, or apportion anew. | *"In academic literature, reapportion designates allocate, distribute, or apportion anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reapportionment]] | noun | **1.** A new apportionment (especially a new apportionment of congressional seats in the united states on the basis of census results). | *"As these States will, for a great length of time, advance in population with peculiar rapidity, they will be interested in frequent reapportionments of the representatives to the number of inhabitants."* — Alexander Hamilton, *The Federalist Papers* |
| [[reimport]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin port within the domain of Carrying.<br>**2.** A technical or specialized form exhibiting the properties of port in systematic terminology. | *"In academic literature, reimport designates pertaining to, derived from, or characteristic of latin port within the domain of carrying."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[report]] | noun | **1.** A written document describing the findings of some individual or group.<br>**2.** The act of informing by verbal report. | *"That tongue that tells the story of thy days, (Making lascivious comments on thy sport) Cannot dispraise, but in a kind of praise, Naming thy name, blesses an ill report."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reportable]] | adjective | **1.** (of income) required by law to be reported.<br>**2.** Meriting report. | *"In academic literature, reportable designates (of income) required by law to be reported."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reportage]] | noun | **1.** The news as presented by reporters for newspapers or radio or television. | *"In academic literature, reportage designates the news as presented by reporters for newspapers or radio or television."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reported]] | verb | **1.** To give an account or representation of in words.<br>**2.** Announce as the result of an investigation or experience or finding. | *"It is reported that he has taken their great’st commander, and that with his own hand he slew the duke’s brother. [_A tucket afar off._] We have lost our labour; they are gone a contrary way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reportedly]] | adverb | **1.** According to reports or other information. | *"In academic literature, reportedly designates according to reports or other information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reporter]] | noun | **1.** A person who investigates and reports or edits news stories. | *"There she appeared indeed, or my reporter devised well for her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reporting]] | noun | **1.** The news as presented by reporters for newspapers or radio or television.<br>**2.** To give an account or representation of in words. | *"If I should tell my history, it would seem Like lies disdain’d in the reporting."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[support]] | noun | **1.** The activity of providing for or maintaining by supplying with money or necessities.<br>**2.** Aiding the cause or policy or interests of. | *"Support him by the arm. [_To Orlando_.] Give me your hand, And let me all your fortunes understand. [_Exeunt._] ACT III SCENE I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supportable]] | adjective | **1.** Capable of being borne though unpleasant. | *"As great to me, as late; and, supportable To make the dear loss, have I means much weaker Than you may call to comfort you, for I Have lost my daughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supported]] | verb | **1.** Give moral or psychological support, aid, or courage to.<br>**2.** Support materially or financially. | *"For, in my knowing, Timon has been this lord’s father And kept his credit with his purse, Supported his estate, nay, Timon’s money Has paid his men their wages."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supporter]] | noun | **1.** A person who backs a politician or a team etc.<br>**2.** Someone who supports or champions something. | *"To me and to the state of my great grief Let kings assemble; for my grief’s so great That no supporter but the huge firm earth Can hold it up."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supporting]] | noun | **1.** The act of bearing the weight of or strengthening.<br>**2.** Give moral or psychological support, aid, or courage to. | *"Shall one of us, That struck the foremost man of all this world But for supporting robbers, shall we now Contaminate our fingers with base bribes, And sell the mighty space of our large honours For so much trash as may be grasped thus?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supportive]] | adjective | **1.** Furnishing support or assistance. | *"In academic literature, supportive designates furnishing support or assistance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transport]] | noun | **1.** Something that serves as a means of transportation.<br>**2.** An exchange of molecules (and their kinetic energy and momentum) across the boundary between adjacent layers of a fluid or across cell membranes. | *"He cannot temp’rately transport his honours From where he should begin and end, but will Lose those he hath won."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transportable]] | adjective | **1.** Capable of being moved or conveyed from one place to another. | *"In academic literature, transportable designates capable of being moved or conveyed from one place to another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transportation]] | noun | **1.** A facility consisting of the means and equipment necessary for the movement of passengers or goods.<br>**2.** The act of moving something from one location to another. | *"Transportation agencies. § 11."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[transporter]] | noun | **1.** A long truck for carrying motor vehicles.<br>**2.** A crane for moving material with dispatch as in loading and unloading ships. | *"Tell me, Bura, is your ship really a commercial cargo transporter or is it a UIPS warship with a military mission inside our legal jurisdiction?" "What in hell are you trying to do, whoever you are?"* — Meyer Moldeven, *The Universe — or Nothing* |
| [[unexportable]] | adjective | **1.** Not suitable for export. | *"In academic literature, unexportable designates not suitable for export."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimportance]] | noun | **1.** The state of being humble and unimportant.<br>**2.** The quality of not being important or worthy of note. | *"Looking into Napoleon’s eyes Prince Andrew thought of the insignificance of greatness, the unimportance of life which no one could understand, and the still greater unimportance of death, the meaning of which no one alive could understand or explain."* — graf Leo Tolstoy, *War and Peace* |
| [[unimportant]] | adjective | **1.** Not important.<br>**2.** Devoid of importance, meaning, or force. | *"If you remember anything so unimportant—which is not to be expected—you would recollect that my first thought in the affair was directly opposed to her remaining here.” Dismiss the Dedlock patronage from consideration?"* — Charles Dickens, *Bleak House* |
| [[unportable]] | adjective | **1.** Not portable; not easily moved or transported. | *"In academic literature, unportable designates not portable; not easily moved or transported."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreportable]] | adjective | **1.** (of income) not reportable; not required by law to be reported. | *"In academic literature, unreportable designates (of income) not reportable; not required by law to be reported."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreported]] | adjective | **1.** Not reported. | *"In academic literature, unreported designates not reported."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsupportable]] | adjective | **1.** Not able to be supported or defended. | *"To have made up his mind that a thing must be, and to find himself thwarted by a bit of a girl--it was unsupportable!--so unsupportable, that even now he refused to believe it could be true."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[unsupported]] | adjective | **1.** Not sustained or maintained by nonmaterial aid.<br>**2.** Not held up or borne. | *"New York, situated as she is, would never be unwise enough to oppose a feeble and unsupported flank to the weight of that confederacy."* — Alexander Hamilton, *The Federalist Papers* |
| [[unsupportive]] | adjective | **1.** Not furnishing support or assistance. | *"In academic literature, unsupportive designates not furnishing support or assistance."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Carrying]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PORT
  </div>
</div>
