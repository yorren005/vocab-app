---
status: unread
type: root_dashboard
---
# Dashboard — fat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“fate or what is spoken”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A flickering candle flame going out as silence and stillness return.</span>
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

The root **fat** means fate or what is spoken. It refers to what is destined to occur or one's spoken fate. In English, this root forms words such as *fate*, *fatal*, *fatality*, and *fatally*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: fate or what is spoken
> The root **fat** means fate or what is spoken. It refers to what is destined to occur or one's spoken fate. In English, this root forms words such as *fate*, *fatal*, *fatality*, and *fatally*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Fate or what is spoken</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A flickering candle flame going out as silence and stillness return.</mark>
> - **Everyday Connection**: Think of familiar words like *fate* and *fatal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fat** comes from a Latin word that means *"fate or what is spoken"*.
  - At its core, it describes fate or what is spoken.

- **The Big Picture Idea**:
  - Picture a flickering candle flame going out as silence and stillness return.
  - Whenever you see **fat** in an English word, think of **mortality and the end of life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of fate or what is spoken.
  - **Mental & Social**: How people experience, organize, or communicate about fate or what is spoken.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Fate**: The predetermined, inevitable course of events.
  - **Fatal**: Causing or capable of causing death.
  - **Fatality**: A death resulting from a disaster, accident, military engagement, or lethal disease.
  - **Fatally**: In a manner that causes death, ruin, or irreversible destruction.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fat</mark>, think of <mark class="hl-def">mortality and the end of life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **fat** operates through nominal, adjectival, and folklore derivative bases:
> - **Primary Nominal Stem `fat-` (Latin *fātum*):**
>   - Through Old French: Latin *fātum* → Middle English [[fate]] (noun and verb).
>   - Participial adjective: *fate + -ed* → [[fated]].
>   - Adjectival compound: *fate + -ful* → [[fateful]].
> - **Adjectival Base `fatal-` (Latin *fātālis*):**
>   - Direct borrowing → English [[fatal]].
>   - Abstract nominal suffix *-ity*: Late Latin *fātālitās* → English [[fatality]].
>   - Philosophical doctrine suffix *-ism*: *fatal + -ism* → [[fatalism]], with agent [[fatalist]] and adjective [[fatalistic]].
>   - Adverbial suffix *-ly*: *fatal + -ly* → [[fatally]].
> - **Romance Folklore Stem `faie / fay` (from Late Latin *Fāta*):**
>   - Old French *faie* → Middle English [[fay]].
>   - Old French *faerie* (realm of the fays) → English [[fairy]].
>   - Italian chivalric phrase → [[fata morgana]] (complex optical mirage).

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
> Although unified by the concept of **"that which is decreed"**, the modern semantic range splits across three sharp domains:
> - **Mortality, Medicine & Disaster Statistics:** In [[fatal]], [[fatality]], and [[fatally]], the root denotes death, lethal disease progression, and traffic or industrial casualty statistics.
> - **Philosophy & Metaphysics:** In [[fate]], [[fatalism]], [[fatalist]], and [[fatalistic]], it represents universal determinism, the futility of human resistance against destiny, and passive resignation.
> - **Dramatic Literature & Historiography:** In [[fateful]] and [[fated]], it marks decisive historical junctures (e.g., *a fateful decision*) charged with monumental, irreversible consequences.
> - **Folklore, Mythology & Optics:** In [[fay]], [[fairy]], and [[fata morgana]], the decree of the gods softens into magical enchantments, mythical beings, and towering maritime mirages.

---

## 🔀 4. Prefix & Combining Dynamics on fat

### Suffix Transformations (Grammatical & Categorical Roles)

Latin *fātum* did not combine with directional verbal prefixes in English; lexical evolution proceeded entirely via suffixation:

| Suffix | Grammatical Role | Derivative | Semantic Result |
| :--- | :--- | :--- | :--- |
| `-al` (Latin *-ālis*) | Adjective (Pertaining to) | [[fatal]] | Ordained by fate; causing death or catastrophic ruin. |
| `-ity` (Latin *-itās*) | Noun (State / Casualty) | [[fatality]] | A death caused by accident, disease, or war; fatal nature. |
| `-ism` | Noun (Philosophical Doctrine) | [[fatalism]] | The doctrine that events are predetermined and inevitable. |
| `-ist` / `-istic` | Noun (Agent) & Adjective | [[fatalist]], [[fatalistic]] | An adherent of fatalism; resigned to fate. |
| `-ful` | Adjective (Full of / Portending) | [[fateful]] | Having decisive, momentous, or ominous consequences. |
| `-erie` (via French) | Noun (Collective / Realm) | [[fairy]] | The realm, magic, or person of the enchanted fays. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏥 **Epidemiology & Public Health** | [[fatality]], [[fatal]], [[fatally]] | Case fatality rate (CFR) in infectious disease outbreaks, trauma triage, occupational health and safety accident reporting. |
| ⚖️ **Criminal Law & Torts** | [[fatal]], [[fatality]] | Fatal injury liability, wrongful death torts, causation in homicide trials, fatal vehicle collision investigations. |
| 📜 **Philosophy & Ethics** | [[fatalism]], [[fatalist]], [[fate]] | Determinism vs free will, Stoic *amor fati*, theological predestination, fatalism in psychological coping mechanisms. |
| 📚 **Literary Tragedy & Drama** | [[fateful]], [[fated]], [[fate]] | Greek and Shakespearean tragic flaws (*hamartia*), the doom of the House of Atreus, *Oedipus Rex* fulfillment of prophecy. |
| 🔭 **Atmospheric Optics & Meteorology** | [[fata morgana]] | Thermal temperature inversion mirages over cold sea water, Arctic navigation illusions, historical origins of the Flying Dutchman legend. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[defat]] | verb | **1.** Remove the fat from. | *"In academic literature, defat designates remove the fat from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fat]] | noun | **1.** A soft greasy substance occurring in organic tissue and consisting of a mixture of lipids (mostly triglycerides).<br>**2.** A kind of body tissue containing stored fat that serves as a source of energy; it also cushions and insulates vital organs. | *"I have heard that Julius Caesar Grew fat with feasting there."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fatah]] | noun | **1.** A palestinian political and military organization founded by yasser arafat in 1958 to work toward the creation of a palestinian state; during the 1960s and 1970s trained terrorist and insurgent groups. | *"In academic literature, fatah designates a palestinian political and military organization founded by yasser arafat in 1958 to work toward the creation of a palestinian state; during the 1960s and 1970s trained terrorist and insurgent groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatah-rc]] | noun | **1.** A palestinian international terrorist organization that split from the plo in 1974; has conducted terrorist attacks in 20 countries. | *"In academic literature, fatah-rc designates a palestinian international terrorist organization that split from the plo in 1974; has conducted terrorist attacks in 20 countries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatal]] | adjective | **1.** Bringing death.<br>**2.** Having momentous consequences; of decisive importance; - saturday rev. | *"If thou art she, tell me where is that son That floated with thee on the fatal raft?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fatalism]] | noun | **1.** A submissive mental attitude resulting from acceptance of the doctrine that everything that happens is predetermined and inevitable.<br>**2.** A philosophical doctrine holding that all events are predetermined in advance for all time and human beings are powerless to change them. | *"They were generous young souls; they had been reared in the lonely country nooks where fatalism is a strong sentiment, and they did not blame her."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[fatalist]] | noun | **1.** Anyone who submits to the belief that they are powerless to change their destiny.<br>**2.** Of or relating to fatalism. | *"Better almost the black resignation which the fatalist draws from his own hopelessness, from the fierce kisses of misery that hiss against his tears."* — Francis Thompson, *Shelley: An Essay* |
| [[fatalistic]] | adjective | **1.** Of or relating to fatalism. | *"As Tess’s own people down in those retreats are never tired of saying among each other in their fatalistic way: “It was to be.” There lay the pity of it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[fatality]] | noun | **1.** A death resulting from an accident or a disaster.<br>**2.** The quality of being able to cause death or fatal disasters. | *"Yes, that was ever the hour of fatality at Thornfield."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[fatally]] | adverb | **1.** With fatal consequences or implications. | *"Beware, lest your heart become fatally hardened through the deceitfulness of sin."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[fate]] | noun | **1.** An event (or a course of events) that will inevitably happen in the future.<br>**2.** The ultimate agency regarded as predetermining the course of events (often personified as a woman). | *"Caesar sits down in Alexandria, where I will oppose his fate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fated]] | verb | **1.** Decree or designate beforehand.<br>**2.** Make fat or plump. | *"Our remedies oft in ourselves do lie, Which we ascribe to heaven: the fated sky Gives us free scope; only doth backward pull Our slow designs when we ourselves are dull."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fateful]] | adjective | **1.** Having momentous consequences; of decisive importance; - saturday rev.<br>**2.** Ominously prophetic. | *"Out of this shoot, so slender to look on, there shall grow a harmful fateful shaft."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[fatefully]] | adverb | **1.** In a prophetically fateful manner. | *"In academic literature, fatefully designates in a prophetically fateful manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatigability]] | noun | **1.** Susceptibility to fatigue; a tendency to get tired or lose strength. | *"In academic literature, fatigability designates susceptibility to fatigue; a tendency to get tired or lose strength."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatigue]] | noun | **1.** Temporary loss of strength and energy resulting from hard physical or mental work.<br>**2.** Used of materials (especially metals) in a weakened state caused by long stress. | *"An exhausted composure, a worn-out placidity, an equanimity of fatigue not to be ruffled by interest or satisfaction, are the trophies of her victory."* — Charles Dickens, *Bleak House* |
| [[fatigued]] | verb | **1.** Lose interest or become bored with something or somebody.<br>**2.** Exhaust or get tired through overuse or great strain or stress. | *"She passes close to him, with her usual fatigued manner and insolent grace."* — Charles Dickens, *Bleak House* |
| [[fatigues]] | noun | **1.** Military uniform worn by military personnel when doing menial labor.<br>**2.** Temporary loss of strength and energy resulting from hard physical or mental work. | *"Wopsle had imparted to me all that he could recall or I extract, and when I had treated him to a little appropriate refreshment, after the fatigues of the evening, we parted."* — Charles Dickens, *Great Expectations* |
| [[fatiha]] | noun | **1.** The first or opening sura of the quran which is the central prayer of islam and is used on all special occasions as well as during the five daily prayers. | *"In academic literature, fatiha designates the first or opening sura of the quran which is the central prayer of islam and is used on all special occasions as well as during the five daily prayers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatihah]] | noun | **1.** The first or opening sura of the quran which is the central prayer of islam and is used on all special occasions as well as during the five daily prayers. | *"In academic literature, fatihah designates the first or opening sura of the quran which is the central prayer of islam and is used on all special occasions as well as during the five daily prayers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatima]] | noun | **1.** Youngest daughter of the prophet mohammed and wife of the fourth calif ali; revered especially by shiite muslims (606-632). | *"Of course she was thinking of nothing at all, barring possibly a new sherbet to be made, or whether, if they sold Fatima, the Abyssinian cook, who was becoming garrulous, would Fatima have a good home."* — Donn Byrne, *The Wind Bloweth* |
| [[fatimah]] | noun | **1.** Youngest daughter of the prophet mohammed and wife of the fourth calif ali; revered especially by shiite muslims (606-632). | *"In academic literature, fatimah designates youngest daughter of the prophet mohammed and wife of the fourth calif ali; revered especially by shiite muslims (606-632)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatism]] | noun | **1.** Discrimination against people who are overweight. | *"In academic literature, fatism designates discrimination against people who are overweight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatless]] | adjective | **1.** Without fat or fat solids. | *"In academic literature, fatless designates without fat or fat solids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatness]] | noun | **1.** Excess bodily weight. | *"Forgive me this my virtue; For in the fatness of these pursy times Virtue itself of vice must pardon beg, Yea, curb and woo for leave to do him good."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fatso]] | noun | **1.** A rotund individual. | *"Say, Fatso, which one of you's the Buick?" Then the light changed, the car spurted away, and left Marlowe cringing."* — Algis Budrys, *Citadel* |
| [[fatten]] | verb | **1.** Make fat or plump. | *"Why Deer, Those that men fatten for their private pleasures, And let their tenants starve upon the Commons. _Char_."* — John Fletcher, *The Elder Brother* |
| [[fattened]] | verb | **1.** Make fat or plump.<br>**2.** (of market animals) made ready for market. | *"She had married a man named Oakshott, and lived in Brixton Road, where she fattened fowls for the market."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[fattening]] | verb | **1.** Make fat or plump.<br>**2.** Subject to or used in the process of finishing or fattening up for slaughter. | *"And you can buy the house, and a slip of a pig I can be fattening against the Christmas market." "No!" "Och, agra," she whined, "you wouldn't go back on the words of the poor girl, and her dying in my arms?"* — Donn Byrne, *The Wind Bloweth* |
| [[fattiness]] | noun | **1.** Having the property of containing fat. | *"In academic literature, fattiness designates having the property of containing fat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fattish]] | adjective | **1.** Somewhat fat. | *"A bent, fattish figure in a shawl came toward him through the haggard, his wife's mother."* — Donn Byrne, *The Wind Bloweth* |
| [[fattism]] | noun | **1.** Discrimination against people who are overweight. | *"In academic literature, fattism designates discrimination against people who are overweight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fatty]] | noun | **1.** A rotund individual.<br>**2.** Containing or composed of fat. | *"I believe that you are suffering from what is called fatty degeneration of the heart, a disease which was first divined and explored by Laennec, the man who gave us the stethoscope, not so very many years ago."* — George Eliot, *Middlemarch* |
| [[fatuity]] | noun | **1.** A ludicrous folly. | *"There are depths of fatuity in me, friend o’ my soul, which are simply bottomless!"* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[fatuous]] | adjective | **1.** Devoid of intelligence. | *"Several other women also chimed in, with an animus which none of them would have been so fatuous as to show but for the rollicking evening they had passed."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[fatuously]] | adverb | **1.** Vacuously or complacently and unconsciously foolish. | *"I asked it of everyone I met, and was fatuously assured that I demanded the impossible; at long last I asked it of old Bridget, whose sound common sense had come to my rescue times and again."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[fatuousness]] | noun | **1.** A ludicrous folly. | *"In academic literature, fatuousness designates a ludicrous folly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infatuate]] | verb | **1.** Arouse unreasoning love or passion in and cause to behave in an irrational way. | *"To a young man with the least fire in him that little upward lift in the middle of her red top lip was distracting, infatuating, maddening."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[infatuated]] | verb | **1.** Arouse unreasoning love or passion in and cause to behave in an irrational way.<br>**2.** Marked by foolish or unreasoning fondness. | *"No, Jane,” he returned: “what necessity is there to dwell on the Past, when the Present is so much surer—the Future so much brighter?” I shuddered to hear the infatuated assertion."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[infatuation]] | noun | **1.** A foolish and usually extravagant passion or love or admiration.<br>**2.** Temporary love of an adolescent. | *"He proved this to himself by all the weary arguments on that side he had read, and every one of them sunk him deeper in the infatuation."* — Charles Dickens, *Bleak House* |
| [[nonfat]] | adjective | **1.** Without fat or fat solids. | *"In academic literature, nonfat designates without fat or fat solids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonfatal]] | adjective | **1.** Not bringing death. | *"In academic literature, nonfatal designates not bringing death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overfatigue]] | verb | **1.** Tire excessively. | *"In academic literature, overfatigue designates tire excessively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefatorial]] | adjective | **1.** Serving as an introduction or preface. | *"In academic literature, prefatorial designates serving as an introduction or preface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefatory]] | adjective | **1.** Serving as an introduction or preface. | *"In a prefatory note to ‘Mardi’ (1849), Melville declares that, as his former books have been received as romance instead of reality, he will now try his hand at pure fiction. ‘Mardi’ may be called a splendid failure."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[superfatted]] | adjective | **1.** (of soap) containing extra unsaponified fat. | *"In academic literature, superfatted designates (of soap) containing extra unsaponified fat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unfattened]] | adjective | **1.** (of market animals) not optimal for marketing. | *"In academic literature, unfattened designates (of market animals) not optimal for marketing."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Death]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FAT
  </div>
</div>
