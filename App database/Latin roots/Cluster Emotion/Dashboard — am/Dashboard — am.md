---
status: unread
type: root_dashboard
---
# Dashboard — am
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">am-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to love”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A sudden warm feeling in your chest or an outward expression of joy or sorrow.</span>
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

The root **am** means to love. It refers to deep affection, goodwill, caring, and strong personal attachment. In English, this root forms words such as *amorous*, *amateur*, *amiable*, and *enamored*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to love
> The root **am** means to love. It refers to deep affection, goodwill, caring, and strong personal attachment. In English, this root forms words such as *amorous*, *amateur*, *amiable*, and *enamored*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To love</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *amorous* and *amateur*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **am** comes from a Latin word that means *"to love"*.
  - At its core, it describes the action of love.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **am** in an English word, think of **to love**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to love).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Amorous**: Strongly moved by love, especially sexual desire.
  - **Amateur**: A person who engages in a study, sport, or art for personal pleasure rather than for financial gain.
  - **Amiable**: Having or displaying a friendly, pleasant, and good-natured demeanor.
  - **Enamored**: Filled with intense love, deep fascination, or admiration.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">am</mark>, think of <mark class="hl-def">to love</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Stems & Lexical Streams
> The root **am** branches into English through four distinct morphological stems:
> - **Active & Participial Verbal Base (`am-` / `amat-`):** Directly from *amāre* and *amātor* ("one who loves"), producing descriptors of romantic disposition like [[amative]], [[amatory]], and the French agentive noun [[amateur]] ("lover of an art").
> - **Substantive Base of Passion (`amor-`):** From Latin *amor*, entering English both through direct Latin borrowings ([[amorous]]) and through courtly Old French and Italian loans ([[amour]], [[amour-propre]], [[enamor]], [[inamorata]], [[amoretto]]).
> - **Relational & Sociable Base (`amic-` / `ami-`):** From Latin *amīcus* ("friend") and *amīcitia* ("friendship"), giving the learned Latinate adjective [[amicable]] alongside the softened Old French doublet [[amiable]], and the abstract noun [[amity]].
> - **Privative & Hostile Stem (`inimic-` / `enem-`):** From *in-* + *amīcus*, passing into English as learned [[inimical]] and vernacular Anglo-French [[enemy]] and [[enmity]].

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

> [!tip] 🌈 Five Distinct Semantic Horizons of the `am` Family
> - **Erotic, Romantic & Illicit Passion:** [[amorous]], [[amour]], [[enamored]], [[paramour]], [[inamorata]], [[amatory]] — the heat of infatuation, courtship, and secret romantic liaisons.
> - **Goodwill, Concord & Diplomacy:** [[amicable]], [[amity]], [[amiable]], [[amicability]] — harmonious relations, peaceful treaties between states, and gentle personal demeanor.
> - **Vocational Devotion vs. Commercial Gain:** [[amateur]], [[amateurism]], [[amateurish]] — the dedication of doing something for pure passion rather than financial compensation (with its later semantic degeneration into lack of professional skill).
> - **Active Hostility & Polar Antagonism:** [[inimical]], [[enmity]], [[enemy]] — the direct etymological inversion of friendship into destructive malice and armed opposition.
> - **Artistic, Psychological & Legal Terminology:** [[amoretto]], [[amour-propre]], *amicus curiae* — specialized terms spanning Renaissance painting, moral philosophy (Rousseau's self-love), and constitutional jurisprudence.

---

## 🔀 4. Prefix & Combining Dynamics on am

### Prefix Dynamics on `am`

| Prefix / Particle | Core Value | Combined Form | Morphological Mechanics & Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` (privative) | not, un- | `in-` + `amicus` $\to$ **[[inimical]]**, **[[enemy]]** | Vowel weakening ($a \to i$): "one who is not a friend; an adversary possessing active ill will." |
| `en-` / `in-` (locative) | in, into | `en-` + `amour` $\to$ **[[enamor]]**, **[[inamorata]]** | Causative/inchoative: "to bring into the state of love; to become smitten or captivated." |
| `per-` / `par` | through, by | `par` + `amour` $\to$ **[[paramour]]** | From Old French adverbial phrase *par amour* ("by love, through passion"): historically a beloved, later an illicit lover. |

### Suffix Transformations on `am`

| Suffix | Functional Class | Derivative Examples | Syntactic & Semantic Manifestation |
| :--- | :--- | :--- | :--- |
| `-eur` (Fr. < Lat. *-or*) | Noun (Agentive) | [[amateur]] | One who engages in an art, sport, or science out of love rather than for commercial pay. |
| `-ous` (Lat. *-ōsus*) | Adjective (Full of) | [[amorous]] | Full of romantic longing or expressing sexual desire. |
| `-ory` (Lat. *-ōrius*) | Adjective (Relational) | [[amatory]] | Pertaining to, promoting, or celebrating love and lovers. |
| `-able` / `-ible` | Adjective (Capacity) | [[amiable]], [[amicable]] | Capable of being loved; disposed to peaceable, friendly relations. |
| `-ity` (Lat. *-itās*) | Abstract Noun (State) | [[amity]], [[enmity]], [[amiability]] | The institutional or psychological state of friendship or entrenched hostility. |
| `-etto` (It. diminutive) | Noun (Diminutive) | [[amoretto]] | In fine arts, a charming little winged Cupid or putto embodying playful love. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Key Derivatives | Practical Context & Specialized Applications |
| :--- | :--- | :--- |
| ⚖️ **Law & Constitutional Jurisprudence** | [[amicable]], *amicus curiae*, [[inimical]] | Amicable settlements avoiding courtroom trial; *amicus curiae* briefs submitted by neutral third parties to aid appellate judges; actions deemed inimical to public order. |
| 🏛️ **Diplomacy & International Relations** | [[amity]], [[enmity]], [[enemy]] | Treaties of Amity, Commerce, and Navigation; resolving historic enmities between neighboring states; designating enemy combatants under the Geneva Conventions. |
| 🏅 **Sports, Arts & Academia** | [[amateur]], [[amateurism]], [[amateurish]] | The historic Olympic ideal of amateurism (competing without monetary reward) versus modern professionalized sports leagues. |
| 📜 **Literature, Poetry & Theatre** | [[amorous]], [[amour]], [[paramour]], [[inamorata]] | Petrarchan love sonnets, chivalric romances of courtly love (*fin'amor*), Renaissance comedic tropes featuring the ardent inamorata. |
| 🧠 **Moral Philosophy & Psychology** | [[amour-propre]], [[amative]] | Jean-Jacques Rousseau's pivotal distinction between *amour de soi* (healthy self-preservation) and *amour-propre* (prideful self-esteem contingent on others' admiration). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adam]] | noun | **1.** (old testament) in judeo-christian mythology; the first man and the husband of eve and the progenitor of the human race.<br>**2.** Scottish architect who designed many public buildings in england and scotland (1728-1792). | *"An Orchard near Oliver’s house Enter Orlando and Adam."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adamance]] | noun | **1.** Resoluteness by virtue of being unyielding and inflexible. | *"In academic literature, adamance designates resoluteness by virtue of being unyielding and inflexible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adamant]] | noun | **1.** Very hard native crystalline carbon valued as a gem.<br>**2.** Impervious to pleas, persuasion, requests, reason; ; - w.churchill. | *"In iron walls they deem’d me not secure; So great fear of my name ’mongst them were spread That they supposed I could rend bars of steel And spurn in pieces posts of adamant."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[am]] | noun | **1.** A radioactive transuranic metallic element; discovered by bombarding uranium with helium atoms.<br>**2.** A master's degree in arts and sciences. | *"SOMETIME FELLOW IN GERMANIC LANGUAGES AND LITERATURES, COLUMBIA UNIVERSITY AMS PRESS, INC."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[amateur]] | noun | **1.** Someone who pursues a study or sport as a pastime.<br>**2.** An athlete who does not play for pay. | *"He is a musical man, an amateur, but might have been a professional."* — Charles Dickens, *Bleak House* |
| [[amateurism]] | noun | **1.** The conviction that people should participate in sports as a hobby (for the fun of it) rather than for money. | *"In academic literature, amateurism designates the conviction that people should participate in sports as a hobby (for the fun of it) rather than for money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amative]] | adjective | **1.** Inclined toward or displaying love. | *"In academic literature, amative designates inclined toward or displaying love."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amativeness]] | noun | **1.** The arousal of feelings of sexual desire. | *"In academic literature, amativeness designates the arousal of feelings of sexual desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amiability]] | noun | **1.** A cheerful and agreeable mood.<br>**2.** A disposition to be friendly and approachable (easy to talk to). | *"Jarndyce for a day or two, I shall hear the larks sing and preserve my amiability."* — Charles Dickens, *Bleak House* |
| [[amiable]] | adjective | **1.** Disposed to please; - hal hinson.<br>**2.** Diffusing warmth and friendliness. | *"No, I defy all counsel, all redress, But that which ends all counsel, true redress, Death, death, O amiable, lovely death!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[amiableness]] | noun | **1.** A disposition to be friendly and approachable (easy to talk to). | *"It is hardly necessary to add, (for who knows not the domestic amiableness of George III.?) that his majesty laughed at the thing with his accustomed good humour. 532."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[amicability]] | noun | **1.** A disinclination to quarrel.<br>**2.** Having a disposition characterized by warmth and friendliness. | *"Promptly, inexplicably, with amicability, gratefully it was declined."* — James Joyce, *Ulysses* |
| [[amicable]] | adjective | **1.** Characterized by friendship and good will. | *"Piper, says in amicable conversation with that excellent woman."* — Charles Dickens, *Bleak House* |
| [[amicableness]] | noun | **1.** A disinclination to quarrel.<br>**2.** Having a disposition characterized by warmth and friendliness. | *"In academic literature, amicableness designates a disinclination to quarrel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amity]] | noun | **1.** A cordial disposition.<br>**2.** A state of friendship and cordiality. | *"Here he comes; I pray you make us friends; I will pursue the amity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[amorous]] | adjective | **1.** Inclined toward or displaying love.<br>**2.** Expressive of or exciting sexual love or romance. | *"Maybe the amorous count solicits her In the unlawful purpose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[amorously]] | adverb | **1.** In an amorous manner. | *"Buck Mulligan suspired amorously."* — James Joyce, *Ulysses* |
| [[amorousness]] | noun | **1.** A feeling of love or fondness.<br>**2.** The arousal of feelings of sexual desire. | *"In academic literature, amorousness designates a feeling of love or fondness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amour]] | noun | **1.** A usually secretive or illicit sexual relationship. | *"FRENCH SOLDIER. _O, je vous supplie, pour l’amour de Dieu, me pardonner!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aram]] | noun | **1.** The biblical name for ancient syria. | *"These stairs were such as whereon Jacob saw Angels ascending and descending, bands Of guardians bright, when he from Esau fled To Padan-Aram, in the field of Luz Dreaming by night under the open sky And waking cried, This is the gate of Heaven."* — John Milton, *Paradise Lost* |
| [[aramaean]] | noun | **1.** A member of one of a group of semitic peoples inhabiting aram and parts of mesopotamia from the 11th to the 8th century bc.<br>**2.** Of or relating to aram or to its inhabitants or their culture or their language. | *"In academic literature, aramaean designates a member of one of a group of semitic peoples inhabiting aram and parts of mesopotamia from the 11th to the 8th century bc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aramean]] | noun | **1.** A member of one of a group of semitic peoples inhabiting aram and parts of mesopotamia from the 11th to the 8th century bc.<br>**2.** Of or relating to aram or to its inhabitants or their culture or their language. | *"In academic literature, aramean designates a member of one of a group of semitic peoples inhabiting aram and parts of mesopotamia from the 11th to the 8th century bc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[camaraderie]] | noun | **1.** The quality of affording easy familiarity and sociability. | *"This good-fellowship—_camaraderie_—usually occurring through similarity of pursuits, is unfortunately seldom superadded to love between the sexes, because men and women associate, not in their labours, but in their pleasures merely."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[declamatory]] | adjective | **1.** Ostentatiously lofty in style. | *"This fixed idea of the rhapsodist was delivered with animated enthusiasm, in a manner entirely declamatory, for he had plainly no skill as a dialectician."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[diam]] | noun | **1.** The length of a straight line passing through the center of a circle and connecting two points on the circumference. | *"In academic literature, diam designates the length of a straight line passing through the center of a circle and connecting two points on the circumference."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enamored]] | verb | **1.** Attract; cause to be enamored.<br>**2.** Marked by foolish or unreasoning fondness. | *"Leroy Edson knelt, an enamored knight, at the shrine of her youth and beauty, she gave him her hand."* — Effie Afton, *Eventide* |
| [[enamoredness]] | noun | **1.** A feeling of love or fondness. | *"In academic literature, enamoredness designates a feeling of love or fondness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enamour]] | verb | **1.** Attract; cause to be enamored. | *"They that, when Richard lived, would have him die Are now become enamour’d on his grave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exam]] | noun | **1.** A set of questions or exercises evaluating skill or knowledge. | *"And when our test exams came out And mine were extra bad, I said, "We needn't fuss about A scrap of paper, dad." When sister's chap comes round at night, And pa seems in a rage, Ma only smiles; she knows all right, It's just dad's camoflage."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[exclamatory]] | adjective | **1.** Sudden and strong. | *"Conversation was exclamatory for a little while with gaps of wonderment; and then the Editor got fervent in his curiosity."* — H. G. Wells, *The Time Machine* |
| [[imam]] | noun | **1.** (islam) the man who leads prayers in a mosque; for shiites an imam is a recognized authority on islamic theology and law and a spiritual guide. | *"In academic literature, imam designates (islam) the man who leads prayers in a mosque; for shiites an imam is a recognized authority on islamic theology and law and a spiritual guide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inamorata]] | noun | **1.** A woman with whom you are in love or have an intimate relationship. | *"Nor, in enumerating the characters of Sir Launcelot Greaves who fix themselves in a reader's memory, should Tom's inamorata, Dolly, be forgotten, or the malicious Ferret, or that precious pair, Justice and Mrs."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[paramour]] | noun | **1.** A woman's lover.<br>**2.** A woman who cohabits with an important man. | *"And fitter is my study and my books Than wanton dalliance with a paramour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ream]] | noun | **1.** A large quantity of written matter.<br>**2.** A quantity of paper; 480 or 500 sheets; one ream equals 20 quires. | *"Whether thro’ wimplin worms thou jink, Or, richly brown, ream owre the brink, In glorious faem, Inspire me, till I lisp an’ wink, To sing thy name!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[reamer]] | noun | **1.** A squeezer with a conical ridged center that is used for squeezing juice from citrus fruit.<br>**2.** A drill that is used to shape or enlarge holes. | *"In academic literature, reamer designates a squeezer with a conical ridged center that is used for squeezing juice from citrus fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seam]] | noun | **1.** Joint consisting of a line formed by joining two pieces.<br>**2.** A slight depression in the smoothness of a surface. | *"Shall the proud lord That bastes his arrogance with his own seam And never suffers matter of the world Enter his thoughts, save such as doth revolve And ruminate himself—shall he be worshipp’d Of that we hold an idol more than he?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seamed]] | verb | **1.** Put together with a seam.<br>**2.** Having or joined by a seam or seams. | *"Everything seems to have happened to his hands that could possibly take place consistently with the retention of all the fingers, for they are notched, and seamed, and crumpled all over."* — Charles Dickens, *Bleak House* |
| [[seamster]] | noun | **1.** A person whose occupation is making and altering garments. | *"In academic literature, seamster designates a person whose occupation is making and altering garments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seamy]] | adjective | **1.** Showing a seam.<br>**2.** Morally degraded; ; ; ; - seattle weekly; - james joyce. | *"Some such squire he was That turn’d your wit the seamy side without, And made you to suspect me with the Moor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[somnambulism]] | noun | **1.** Walking by a person who is asleep. | *"THE MINISTER’S VIGIL Walking in the shadow of a dream, as it were, and perhaps actually under the influence of a species of somnambulism, Mr."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[somnambulist]] | noun | **1.** Someone who walks about in their sleep. | *"I did not expect this; but all I have is yours.” Boldwood, more like a somnambulist than a wakeful man, pulled out the large canvas bag he carried by way of a purse, and searched it."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unseamed]] | adjective | **1.** Having no seams.<br>**2.** Smooth, especially of skin. | *"One gallant steed is stretched a mangled corse; Another, hideous sight! unseamed appears, His gory chest unveils life's panting source; Though death-struck, still his feeble frame he rears; Staggering, but stemming all, his lord unharmed he bears."* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Emotion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AM
  </div>
</div>
