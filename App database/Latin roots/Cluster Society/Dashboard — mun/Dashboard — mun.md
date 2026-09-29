---
status: unread
type: root_dashboard
---
# Dashboard — mun
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mun-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“duty, office, or gift”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
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

The root **mun** means duty, office, or gift. It refers to a public duty, official responsibility, or shared gift. In English, this root forms words such as *exchange*, *ammunition*, *common*, and *communal*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: duty, office, or gift
> The root **mun** means duty, office, or gift. It refers to a public duty, official responsibility, or shared gift. In English, this root forms words such as *exchange*, *ammunition*, *common*, and *communal*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Duty, office, or gift</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *exchange* and *ammunition*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mun** comes from a Latin word that means *"duty, office, or gift"*.
  - At its core, it describes duty, office, or gift.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **mun** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of duty, office, or gift.
  - **Mental & Social**: How people experience, organize, or communicate about duty, office, or gift.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Exchange**: An everyday English word showing the root's idea of *duty, office, or gift*.
  - **Ammunition**: Projectiles, explosives, and propellants fired from weapons.
  - **Common**: Occurring, found, or done often.
  - **Communal**: Shared by all members of a community.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mun</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Phonological Behavior & Stem Dynamics
- **Full Obligation Stem (*mūner-*)**: Seen in intervocalic rhotacism (*mūnus* $\to$ *mūneris*), preserved in English *remunerate* and *remuneration*.
- **Weakened / Compound Stem (*-mun-*)**: Found in *immune*, *commune*, *community*, where the vowel remains high back or front rounded.
- **Participial Fortification Stem (*mūnīt-*)**: Found in *ammunition* and *munitions*, reflecting Latin supine *mūnītum*.
- **The "Ammunition" Metanalysis**: The French definite article phrase *la munition* was misdivided in English soldiers' speech as *l'amonition*, cementing the modern spelling *ammunition*.

### Morphological Product Matrix
```
mūnus (duty/gift) ──┬──> in- + mūnis ──────────> immūnis (exempt from duty) ──> immune, immunity
                    ├──> mūnicipium (mūnia+capere) ─────────────────────────> municipal, municipality
                    ├──> mūnus + facere ───────> munificus (gift-making) ─────> munificent, munificence
                    └──> re- + mūnerārī ───────> remūnerātiō (counter-gift) ──> remunerate, remuneration

mūniō (to fortify) ───> mūnītiō (defense works) ──> (Middle French la munition) ─> munitions, ammunition

com- + mūnis ───────> commūnis (shared duty) ───> common, commune, communicate, community, communism
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

### Spectrum of Conceptual Applications
1. **Public Administration & Civic Territory**: *municipal*, *municipality* (local government structures managing public services and communal welfare).
2. **Exemption & Biological Defense**: *immune*, *immunity* (legal protection against prosecution or tax; physiological resistance against pathogens).
3. **Military Armaments & Defense**: *munitions*, *ammunition* (military ordnance, shells, bombs, and tactical military materiel).
4. **Generosity & Compensation**: *munificent*, *munificence* (princely generosity, lavish bestowal of gifts); *remunerate*, *remuneration* (fair financial payment for labor).
5. **Shared Society & Information Flow**: *common*, *communal*, *commune*, *communicate*, *communion*, *communism*, *community*, *excommunicate* (sharing resources, ideas, or spiritual fellowship within a bound civic body).

---

## 🔀 4. Prefix & Combining Dynamics on mun

### Prefix Variations
- **in- (privative "not, without") + mun-**: Produces *immūnis* ("not bound to public duty" $\to$ *immune*, *immunity*).
- **re- ("back, again") + mun-**: Produces *remūnerārī* ("to give back a gift for service rendered" $\to$ *remunerate*, *remuneration*).
- **com- ("together, mutually") + mun-**: Produces *commūnis* ("bound together by shared duties" $\to$ *commune*, *communicate*, *community*).
- **ad- ("to, toward") + mun- (via French)**: Metanalysis of *la munition* $\to$ *ammunition*.
- **ex- ("out of") + com- + mun-**: Produces *excommunicate* (cutting off an individual from the shared civic or spiritual community).

### Suffix Morphologies
- **-al / -ity**: *municipal*, *municipality* (systemic civic status and institutions).
- **-ficent / -ficence** (*-ficus* < *facere*): *munificent*, *munificence* ("making gifts on a grand scale").
- **-ate / -ation**: *remunerate*, *remuneration*, *communicate*, *communication* (verbal action and resulting systemic process).
- **-ition**: *munition*, *ammunition* (substantive concrete collective product).

---

## 🌐 5. Disciplinary & Real-World Domains

| Discipline | Semantic Focus | Key Derived Words |
| :--- | :--- | :--- |
| **Civics & Urban Planning** | Local governance, taxation, and city administration | *municipal*, *municipality*, *community* |
| **Immunology & Medicine** | Biological defenses against infectious micro-organisms | *immune*, *immunity*, *immunodeficiency*, *immunize* |
| **Military Science & Defense** | Stockpiling, distribution, and firing of weaponry | *munitions*, *ammunition* |
| **Labor Economics & Law** | Compensation, wages, and legal exemptions | *remunerate*, *remuneration*, *sovereign immunity* |
| **Sociology & Political Theory** | Shared ownership, communal living, and ideological systems | *communal*, *commune*, *communism*, *commonality* |
| **Ecclesiastical & Communication Studies** | Spiritual fellowship, social exclusion, and message exchange | *communion*, *excommunicate*, *communicate* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ammunition]] | noun | **1.** Projectiles to be fired from a gun.<br>**2.** Any nuclear or chemical or biological material that can be used as a weapon of mass destruction. | *"On his next time off he’ll bring in the ammunition."* — Jack London, *The Jacket (The Star-Rover)* |
| [[communal]] | adjective | **1.** For or by a group rather than individuals; - paul roche.<br>**2.** Relating to a small administrative district or community. | *"Our field comprises the problems of national wealth and of communal welfare."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[communalise]] | verb | **1.** Make something the property of the commune or community. | *"In academic literature, communalise designates make something the property of the commune or community."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[communalism]] | noun | **1.** The practice of communal living and common ownership.<br>**2.** Loyalty and commitment to the interests of your own minority or ethnic group rather than to society as a whole. | *"In academic literature, communalism designates the practice of communal living and common ownership."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[communalize]] | verb | **1.** Make something the property of the commune or community. | *"In academic literature, communalize designates make something the property of the commune or community."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[communally]] | adverb | **1.** By a group of people rather than an individual. | *"In academic literature, communally designates by a group of people rather than an individual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commune]] | noun | **1.** The smallest administrative district of several european countries.<br>**2.** A body of people or families living together and sharing everything. | *"Laertes, I must commune with your grief, Or you deny me right."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[communicable]] | adjective | **1.** (of disease) capable of being transmitted by infection.<br>**2.** Readily communicated. | *"The joy of intercourse becomes the jest of sin, when evil and suffering are communicable. 72:30 Not personal intercommunion but divine law is the com- municator of truth, health, and harmony to earth and humanity."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[communicant]] | noun | **1.** A person entitled to receive communion. | *"The fast which accompanied the mourning for the dead god may perhaps have been designed to prepare the body of the communicant for the reception of the blessed sacrament by purging it of all that could defile by contact the sacred elements."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[communicate]] | verb | **1.** Transmit information.<br>**2.** Transmit thoughts or feelings. | *"Madam, I was very late more near her than I think she wish’d me; alone she was, and did communicate to herself her own words to her own ears; she thought, I dare vow for her, they touch’d not any stranger sense."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[communicating]] | noun | **1.** The activity of communicating; the activity of conveying information.<br>**2.** Transmit information. | *"The room in which they were, communicating with that in which he stood, was only lighted by the fire."* — Charles Dickens, *Bleak House* |
| [[communication]] | noun | **1.** The activity of communicating; the activity of conveying information.<br>**2.** Something that is communicated by or to or between people or groups. | *"What did this vanity But minister communication of A most poor issue?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[communicational]] | adjective | **1.** Used in communication. | *"In academic literature, communicational designates used in communication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[communications]] | noun | **1.** The discipline that studies the principles of transmiting information and the methods by which it is delivered (as print or radio or television etc.).<br>**2.** The activity of communicating; the activity of conveying information. | *"She realized, though, that she had to put off further communications for a quiet evening hour."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[communicative]] | adjective | **1.** Of or relating to communication.<br>**2.** Able or tending to communicate; - w.m.thackeray. | *"Asked what they were about, they vouchsafed no reply; but an old woman who appeared on the scene from a neighbouring cottage was more communicative."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[communicativeness]] | noun | **1.** The trait of being communicative. | *"Gardiner, whose manners were easy and pleasant, encouraged her communicativeness by his questions and remarks: Mrs."* — Jane Austen, *Pride and Prejudice* |
| [[communicator]] | noun | **1.** A person who communicates with others. | *"For example; you must know I'm a space communicator."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[communicatory]] | adjective | **1.** Able or tending to communicate; - w.m.thackeray. | *"In academic literature, communicatory designates able or tending to communicate; - w.m.thackeray."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[communion]] | noun | **1.** The act of participating in the celebration of the eucharist.<br>**2.** Sharing thoughts and feelings. | *"The offer, being gladly accepted, is followed by a pleasant ride, a pleasant dinner, and a pleasant breakfast, all in brotherly communion."* — Charles Dickens, *Bleak House* |
| [[communique]] | noun | **1.** An official report (usually sent in haste). | *"At conclusion of meeting they issued a joint communique."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[communisation]] | noun | **1.** A change from private property to public property owned by the community.<br>**2.** The organization of a nation of the basis of communism. | *"In academic literature, communisation designates a change from private property to public property owned by the community."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[communise]] | verb | **1.** Make communist or bring in accord with communist principles.<br>**2.** Make into property owned by the state. | *"In academic literature, communise designates make communist or bring in accord with communist principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[communism]] | noun | **1.** A form of socialism that abolishes private ownership.<br>**2.** A political theory favoring collectivism in a classless society. | *"A few years ago it was generally believed that the organization of the old German tribes was politically an almost perfect democracy, and economically a communism in which all had equal claims upon the land."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[communist]] | noun | **1.** A member of the communist party.<br>**2.** A socialist who advocates communism. | *"His own doctrine, first set forth connectedly[17] in the Communist Manifesto in 1848, he called Communism."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[communistic]] | adjective | **1.** Relating to or marked by communism. | *"True, if there were absolutely no private property, there would be little use for money, altho it might still be used as a form of counter by the communistic state."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[community]] | noun | **1.** A group of people living in a particular local area.<br>**2.** Common ownership. | *"Since the three would, in later years, have great authority in the little community, it would be splendid if they were educated alike and could agree thoroughly in everything."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[communization]] | noun | **1.** A change from private property to public property owned by the community.<br>**2.** The organization of a nation of the basis of communism. | *"In academic literature, communization designates a change from private property to public property owned by the community."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[communize]] | verb | **1.** Make communist or bring in accord with communist principles.<br>**2.** Make into property owned by the state. | *"In academic literature, communize designates make communist or bring in accord with communist principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excommunicate]] | verb | **1.** Exclude from a church or a religious community.<br>**2.** Oust or exclude from a group or membership by decree. | *"What canst thou say but will perplex thee more, If thou stand excommunicate and curs’d?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excommunication]] | noun | **1.** The state of being excommunicated.<br>**2.** The act of banishing a member of a church from the communion of believers and the privileges of the church; cutting a person off from a religious society. | *"We will spare for no wit, I warrant you; here’s that shall drive some of them to a non-come: only get the learned writer to set down our excommunication, and meet me at the gaol. [Exeunt.] ACT IV SCENE I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immune]] | noun | **1.** A person who is immune to a particular infection.<br>**2.** Relating to the condition of immunity. | *"She was the cannibal of the seas, and scarce needed that watchful eye, for she floated immune in the horror of her name."* — J. M. Barrie, *Peter Pan* |
| [[immunisation]] | noun | **1.** The act of making immune (especially by inoculation). | *"In academic literature, immunisation designates the act of making immune (especially by inoculation)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunise]] | verb | **1.** Law: grant immunity from prosecution.<br>**2.** Perform vaccinations or produce immunity in by inoculation. | *"In academic literature, immunise designates law: grant immunity from prosecution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunised]] | verb | **1.** Law: grant immunity from prosecution.<br>**2.** Perform vaccinations or produce immunity in by inoculation. | *"In academic literature, immunised designates law: grant immunity from prosecution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunity]] | noun | **1.** The state of not being susceptible.<br>**2.** (medicine) the condition in which an organism can resist disease. | *"Probably, as with persons playing whist for love, the consciousness of a certain immunity under any circumstances from that worst possible ultimate, the having to pay, makes them unduly speculative."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[immunization]] | noun | **1.** The act of making immune (especially by inoculation). | *"The next morning, following instructions, I reported to the dispensary for vaccinations and immunization shots and on to the Personnel Office to sign papers that came at me from all directions."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[immunize]] | verb | **1.** Law: grant immunity from prosecution.<br>**2.** Perform vaccinations or produce immunity in by inoculation. | *"In academic literature, immunize designates law: grant immunity from prosecution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunized]] | verb | **1.** Law: grant immunity from prosecution.<br>**2.** Perform vaccinations or produce immunity in by inoculation. | *"In academic literature, immunized designates law: grant immunity from prosecution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunoassay]] | noun | **1.** Identification of a substance (especially a protein) by its action as an antigen. | *"In academic literature, immunoassay designates identification of a substance (especially a protein) by its action as an antigen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunochemical]] | adjective | **1.** Of or relating to immunochemistry. | *"In academic literature, immunochemical designates of or relating to immunochemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunochemistry]] | noun | **1.** The field of chemistry concerned with chemical processes in immunology (such as chemical studies of antigens and antibodies). | *"In academic literature, immunochemistry designates the field of chemistry concerned with chemical processes in immunology (such as chemical studies of antigens and antibodies)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunocompetence]] | noun | **1.** The ability to develop an immune response following exposure to an antigen. | *"In academic literature, immunocompetence designates the ability to develop an immune response following exposure to an antigen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunocompetent]] | adjective | **1.** Capable of developing an immune response following exposure to an antigen. | *"In academic literature, immunocompetent designates capable of developing an immune response following exposure to an antigen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunocompromised]] | adjective | **1.** Unable to develop a normal immune response usually because of malnutrition or immunodeficiency or immunosuppressive therapy. | *"In academic literature, immunocompromised designates unable to develop a normal immune response usually because of malnutrition or immunodeficiency or immunosuppressive therapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunodeficiency]] | noun | **1.** Immunological disorder in which some part of the body's immune system is inadequate and resistance to infectious diseases is reduced. | *"In academic literature, immunodeficiency designates immunological disorder in which some part of the body's immune system is inadequate and resistance to infectious diseases is reduced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunodeficient]] | adjective | **1.** Incapable of developing an immune response following exposure to an antigen. | *"In academic literature, immunodeficient designates incapable of developing an immune response following exposure to an antigen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunoelectrophoresis]] | noun | **1.** Electrophoresis to separate antigens and antibodies. | *"In academic literature, immunoelectrophoresis designates electrophoresis to separate antigens and antibodies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunofluorescence]] | noun | **1.** (immunology) a technique that uses antibodies linked to a fluorescent dye in order to study antigens in a sample of tissue. | *"In academic literature, immunofluorescence designates (immunology) a technique that uses antibodies linked to a fluorescent dye in order to study antigens in a sample of tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunogen]] | noun | **1.** Any substance or organism that provokes an immune response (produces immunity) when introduced into the body. | *"In academic literature, immunogen designates any substance or organism that provokes an immune response (produces immunity) when introduced into the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunogenic]] | adjective | **1.** Possessing the ability to elicit an immune response. | *"In academic literature, immunogenic designates possessing the ability to elicit an immune response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunogenicity]] | noun | **1.** The property of eliciting an immune response. | *"In academic literature, immunogenicity designates the property of eliciting an immune response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunoglobulin]] | noun | **1.** A class of proteins produced in lymph tissue in vertebrates and that function as antibodies in the immune response. | *"In academic literature, immunoglobulin designates a class of proteins produced in lymph tissue in vertebrates and that function as antibodies in the immune response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunohistochemistry]] | noun | **1.** An assay that shows specific antigens in tissues by the use of markers that are either fluorescent dyes or enzymes (such as horseradish peroxidase). | *"In academic literature, immunohistochemistry designates an assay that shows specific antigens in tissues by the use of markers that are either fluorescent dyes or enzymes (such as horseradish peroxidase)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunologic]] | adjective | **1.** Of or relating to immunology. | *"In academic literature, immunologic designates of or relating to immunology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunological]] | adjective | **1.** Of or relating to immunology. | *"In academic literature, immunological designates of or relating to immunology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunologically]] | adverb | **1.** From the point of view of immunology. | *"In academic literature, immunologically designates from the point of view of immunology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunologist]] | noun | **1.** A medical scientist who specializes in immunology. | *"In academic literature, immunologist designates a medical scientist who specializes in immunology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunology]] | noun | **1.** The branch of medical science that studies the body's immune system. | *"In academic literature, immunology designates the branch of medical science that studies the body's immune system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunopathology]] | noun | **1.** The branch of immunology that deals with pathologies of the immune system. | *"In academic literature, immunopathology designates the branch of immunology that deals with pathologies of the immune system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunosuppressant]] | noun | **1.** A drug that lowers the body's normal immune response. | *"In academic literature, immunosuppressant designates a drug that lowers the body's normal immune response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunosuppressed]] | adjective | **1.** Of persons whose immune response is inadequate. | *"In academic literature, immunosuppressed designates of persons whose immune response is inadequate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunosuppression]] | noun | **1.** Lowering the body's normal immune response to invasion by foreign substances; can be deliberate (as in lowering the immune response to prevent rejection of a transplanted organ) or incidental (as a side effect of radiotherapy or chemotherapy for cancer). | *"In academic literature, immunosuppression designates lowering the body's normal immune response to invasion by foreign substances; can be deliberate (as in lowering the immune response to prevent rejection of a transplanted organ) or incidental (as a side effect of radiotherapy or chemotherapy for cancer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunosuppressive]] | noun | **1.** A drug that lowers the body's normal immune response.<br>**2.** Of or relating to a substance that lowers the body's normal immune response and induces immunosuppression. | *"In academic literature, immunosuppressive designates a drug that lowers the body's normal immune response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunosuppressor]] | noun | **1.** A drug that lowers the body's normal immune response. | *"In academic literature, immunosuppressor designates a drug that lowers the body's normal immune response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunotherapeutic]] | adjective | **1.** Of or relating to immunotherapy. | *"In academic literature, immunotherapeutic designates of or relating to immunotherapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunotherapy]] | noun | **1.** Therapy designed to produce immunity to a disease or to enhance resistance by the immune system. | *"In academic literature, immunotherapy designates therapy designed to produce immunity to a disease or to enhance resistance by the immune system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incommunicative]] | adjective | **1.** Not inclined to talk or give information or express opinions. | *"Incommunicative as he was, some time elapsed before I had an opportunity of gauging his mind."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[intercommunicate]] | verb | **1.** Be interconnected, afford passage.<br>**2.** Transmit thoughts or feelings. | *"In academic literature, intercommunicate designates be interconnected, afford passage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercommunication]] | noun | **1.** Mutual communication; communication with each other. | *"In academic literature, intercommunication designates mutual communication; communication with each other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercommunion]] | noun | **1.** Participation in holy communion by members of more than one church (eg catholic and orthodox). | *"The joy of intercourse becomes the jest of sin, when evil and suffering are communicable. 72:30 Not personal intercommunion but divine law is the com- municator of truth, health, and harmony to earth and humanity."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[munch]] | noun | **1.** Norwegian painter (1863-1944).<br>**2.** A large bite. | *"Truly, a peck of provender; I could munch your good dry oats."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[munchausen]] | noun | **1.** German raconteur who told preposterous stories about his adventures as a soldier and hunter; his name is now associated with any telling of exaggerated stories or winning lies (1720-1797). | *"In academic literature, munchausen designates german raconteur who told preposterous stories about his adventures as a soldier and hunter; his name is now associated with any telling of exaggerated stories or winning lies (1720-1797)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[munchener]] | noun | **1.** A dark lager produced in munich since the 10th century; has a distinctive taste of malt. | *"In academic literature, munchener designates a dark lager produced in munich since the 10th century; has a distinctive taste of malt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muncher]] | noun | **1.** A chewer who makes a munching noise. | *"In academic literature, muncher designates a chewer who makes a munching noise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[munchhausen]] | noun | **1.** German raconteur who told preposterous stories about his adventures as a soldier and hunter; his name is now associated with any telling of exaggerated stories or winning lies (1720-1797). | *"In academic literature, munchhausen designates german raconteur who told preposterous stories about his adventures as a soldier and hunter; his name is now associated with any telling of exaggerated stories or winning lies (1720-1797)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muncie]] | noun | **1.** A town in east central indiana. | *"In academic literature, muncie designates a town in east central indiana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[munich]] | noun | **1.** The capital and largest city of bavaria in southwestern germany. | *"And so he passes on from city to city, and from land to land, by Vienna, Salzburg, and Munich, to Innsbruck, thence over the Brenner to Trent and Venice, and by Bologna to Florence and Rome."* — John Cairns, *Principal Cairns* |
| [[municipal]] | adjective | **1.** Relating or belonging to or characteristic of a municipality.<br>**2.** Of or relating to the government of a municipality; - j.l.kuntz. | *"Thus municipal, and what are called communal, savings banks are operated by many European cities; but the most effective and widely used agencies for the purpose are the national post-offices."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[municipality]] | noun | **1.** An urban district having corporate status and powers of self-government.<br>**2.** People living in a town or city having local self-government. | *"The proceeds are distributed 10 per cent to the state, 20 per cent to the county, and 70 per cent to the municipality in which the tax is collected."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[municipally]] | adverb | **1.** By municipality. | *"In academic literature, municipally designates by municipality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[munificence]] | noun | **1.** Liberality in bestowing gifts; extremely liberal and generous of spirit. | *"It seems to me all this munificence goes to serve some fell purpose of his own."* — Effie Afton, *Eventide* |
| [[munificent]] | adjective | **1.** Very generous. | *"She is, you are aware, a woman of most munificent disposition, and happily in possession—not I presume of great wealth, but of funds which she can well spare."* — George Eliot, *Middlemarch* |
| [[munificently]] | adverb | **1.** In a generous manner. | *"In academic literature, munificently designates in a generous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muniments]] | noun | **1.** Deeds and other documentary evidence of title to land. | *"The kingly crowned head, the vigilant eye, The counsellor heart, the arm our soldier, Our steed the leg, the tongue our trumpeter, With other muniments and petty helps Is this our fabric, if that they— MENENIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[munition]] | noun | **1.** Weapons considered collectively.<br>**2.** Military supplies. | *"I’ll to the Tower with all the haste I can To view th’ artillery and munition; And then I will proclaim young Henry king. [_Exit._] EXETER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[munitions]] | noun | **1.** Weapons considered collectively.<br>**2.** Military supplies. | *"The military argument as applied to the preparation of ships and munitions has no application to a tariff on those articles which have no bearing upon military power."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[munro]] | noun | **1.** British writer of short stories (1870-1916). | *"He had three times heard her sing the old Ulster ballad of General Munro: Up came Munro's sister, she was well dressed in green, And his sword by her side that was once bright and keen."* — Donn Byrne, *The Wind Bloweth* |
| [[muntiacus]] | noun | **1.** Muntjacs. | *"Classical and authoritative lexicons catalog muntiacus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muntingia]] | noun | **1.** One species: jamaican cherry; sometimes placed in family flacourtiaceae. | *"In academic literature, muntingia designates one species: jamaican cherry; sometimes placed in family flacourtiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muntjac]] | noun | **1.** Small asian deer with small antlers and a cry like a bark. | *"In academic literature, muntjac designates small asian deer with small antlers and a cry like a bark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncommunicable]] | adjective | **1.** (of disease) not capable of being passed on. | *"In academic literature, noncommunicable designates (of disease) not capable of being passed on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonimmune]] | adjective | **1.** (often followed by `to') likely to be affected with. | *"In academic literature, nonimmune designates (often followed by `to') likely to be affected with."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remunerate]] | verb | **1.** Make payment to; compensate. | *"Yes, and will nobly him remunerate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remunerated]] | verb | **1.** Make payment to; compensate.<br>**2.** Receiving or eligible for compensation. | *"I don’t want to pay too large a price for my friend, but I want you to have your proper percentage and be remunerated for your loss of time."* — Charles Dickens, *Bleak House* |
| [[remuneration]] | noun | **1.** Something that remunerates.<br>**2.** The act of paying for goods or services or to recompense for losses. | *"Now will I look to his remuneration."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remunerative]] | adjective | **1.** For which money is paid.<br>**2.** Producing a sizeable profit. | *"Property thus fluctuates in value, and investments become more or less remunerative."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[remunerator]] | noun | **1.** A person who pays money for something. | *"In academic literature, remunerator designates a person who pays money for something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncommunicative]] | adjective | **1.** Not inclined to talk or give information or express opinions. | *"The gentleman who saw me was particularly suave in manner, but uncommunicative in equal proportion."* — Bram Stoker, *Dracula* |
| [[uncommunicativeness]] | noun | **1.** The trait of being uncommunicative. | *"In academic literature, uncommunicativeness designates the trait of being uncommunicative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unremunerative]] | adjective | **1.** Not yielding profit or recompense. | *"In academic literature, unremunerative designates not yielding profit or recompense."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MUN
  </div>
</div>
