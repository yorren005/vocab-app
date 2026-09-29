---
status: unread
type: root_dashboard
---
# Dashboard — civ
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">civ-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“citizen”</span>
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

The root **civ** means citizen. It refers to an individual citizen or a member of an organized community. In English, this root forms words such as *citizen*, *citizenship*, *city*, and *civic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: citizen
> The root **civ** means citizen. It refers to an individual citizen or a member of an organized community. In English, this root forms words such as *citizen*, *citizenship*, *city*, and *civic*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Citizen</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *citizen* and *citizenship*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **civ** comes from a Latin word that means *"citizen"*.
  - At its core, it describes citizen.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **civ** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of citizen.
  - **Mental & Social**: How people experience, organize, or communicate about citizen.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Citizen**: A legally recognized national of a state with full political rights. 2. An inhabitant of a city.
  - **Citizenship**: The position or legal status of being a citizen of a country. 2. Civic responsibility.
  - **City**: A large and permanent human settlement, often incorporated with legal powers.
  - **Civic**: Relating to a city or town, especially its municipal administration or duties.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">civ</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun:** *cīvis* $\to$ *civic*, *civics*.
- **Adjectival Base (`-īlis`):** *cīvīlis* $\to$ *civil*, *civilian*, *civility*, *uncivil*.
- **Verbal & Abstract Transformation:**
  - *cīvīlis* $\to$ *civilize*, *civilized*, *uncivilized*, *civilization*.
- **French Transmission Base:**
  - *cīvitās* $\to$ *cité* $\to$ *city*, *citizen*, *citizenship*.

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

### 1. Legal Status & Rights
- *citizen* (a legally recognized subject or national of a state or commonwealth).
- *citizenship* (the position or status of being a citizen of a particular country).
- *civil* (relating to ordinary citizens and their concerns; non-military; polite).
- *civilian* (a person not in the armed services or the police force).

### 2. Urban Settlements & Institutions
- *city* (a large town, in Britain often created by royal charter).
- *civic* (relating to a city or town, especially its administration; municipal).
- *civics* (the study of the rights and duties of citizenship).

### 3. Societal Development & Culture
- *civilization* (the stage of human social and cultural development and organization considered most advanced).
- *civilize* (bring a place or people to a stage of social, cultural, and moral development).
- *uncivilized* (not socially, culturally, or morally advanced; primitive, barbaric).

### 4. Interpersonal Decorum
- *civility* (formal politeness and courtesy in behavior or speech).
- *uncivil* (discourteous, impolite).

---

## 🔀 4. Prefix & Combining Dynamics on civ

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `civ-` + `-ic` | Relational adjectival | Connected to municipal urban governance and citizen duties | *civic, civics* |
| `civ-` + `-il` | Societal adjectival | Pertaining to domestic citizen peace (non-military, non-clerical) | *civil* |
| `civil-` + `-ity` | Behavioral abstract | Politeness and restraint appropriate between fellow citizens | *civility* |
| `civil-` + `-ize` + `-ation`| Evolutionary noun | Advanced state of organized human legal and technological order | *civilization* |
| `civit-` $\to$ `city` | French vocalic shift | An autonomous, chartered urban population center | *city, citizen* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Constitutional Law & Jurisprudence:** Civil rights, civil liberties, Civil Rights Act of 1964, civil procedure.
- **Anthropology & Global History:** River valley civilizations (Mesopotamia, Nile, Indus), collapse of complex societies.
- **Political Science & Political Theory:** Civil society (Hegel, Habermas), civic republicanism, citizenship tests.
- **Urban Sociology:** Civic engagement, municipal infrastructure, urban citizenship.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cive]] | noun | **1.** Perennial having hollow cylindrical leaves used for seasoning. | *"In academic literature, cive designates perennial having hollow cylindrical leaves used for seasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[civet]] | noun | **1.** Cat-like mammal typically secreting musk used in perfumes. | *"The courtier’s hands are perfumed with civet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[civic]] | adjective | **1.** Of or relating or belonging to a city.<br>**2.** Of or relating to or befitting citizens as individuals. | *"No social discovery has made individual honesty and civic virtue useless to good government."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[civics]] | noun | **1.** The social science of municipal affairs. | *"In academic literature, civics designates the social science of municipal affairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[civies]] | noun | **1.** Civilian garb as opposed to a military uniform. | *"In academic literature, civies designates civilian garb as opposed to a military uniform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[civil]] | adjective | **1.** Applying to ordinary citizens as contrasted with the military.<br>**2.** Not rude; marked by satisfactory (or especially minimal) adherence to social usages and sufficient but not noteworthy consideration for others; - w.s. maugham. | *"The round world Should have shook lions into civil streets, And citizens to their dens."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[civil-libertarian]] | adjective | **1.** Having or showing active concern for protection of civil liberties protected by law. | *"In academic literature, civil-libertarian designates having or showing active concern for protection of civil liberties protected by law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[civilian]] | noun | **1.** A nonmilitary citizen.<br>**2.** Associated with civil life or performed by persons who are not active members of the military. | *"The policeman considers him an imbecile civilian, a remnant of the barbarous watchmen times, but gives him admission as something that must be borne with until government shall abolish him."* — Charles Dickens, *Bleak House* |
| [[civilisation]] | noun | **1.** The social process whereby societies achieve an advanced stage of development and organization.<br>**2.** A particular society at a particular time and place. | *"Then he disappeared, bored by civilisation; nothing is known of him until 1820, when he turns up in Switzerland in pursuit of sport and adventure."* — Sydney Waterlow, *Shelley* |
| [[civilise]] | verb | **1.** Teach or refine to be discriminative in taste or judgment.<br>**2.** Raise from a barbaric to a civilized state. | *"The work of ameliorating the conditions of life—the true civilising process that makes life more and more secure—had gone steadily on to a climax."* — H. G. Wells, *The Time Machine* |
| [[civilised]] | verb | **1.** Teach or refine to be discriminative in taste or judgment.<br>**2.** Raise from a barbaric to a civilized state. | *"It is as natural as that I should love those who show me affection, or submit to punishment when I feel it is deserved.” “Heathens and savage tribes hold that doctrine, but Christians and civilised nations disown it.” “How?"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[civility]] | noun | **1.** Formal or perfunctory politeness.<br>**2.** The act of showing regard for others. | *"Or else a rude despiser of good manners, That in civility thou seem’st so empty?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[civilization]] | noun | **1.** A society in an advanced state of social development (e.g., with complex legal and political and religious organizations).<br>**2.** The social process whereby societies achieve an advanced stage of development and organization. | *"He had persistently elevated Hellenic Paganism at the expense of Christianity; yet in that civilization an illegal surrender was not certain disesteem."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[civilize]] | verb | **1.** Teach or refine to be discriminative in taste or judgment.<br>**2.** Raise from a barbaric to a civilized state. | *"Let the savages be civilized, but civilize them with benefits, and not with evils; and let heathenism be destroyed, but not by destroying the heathen."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[civilized]] | verb | **1.** Teach or refine to be discriminative in taste or judgment.<br>**2.** Raise from a barbaric to a civilized state. | *"Considering his position he became wonderfully free from the chronic melancholy which is taking hold of the civilized races with the decline of belief in a beneficent Power."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[civilly]] | adverb | **1.** In a civil manner. | *"For I have savage cause, And to proclaim it civilly were like A haltered neck which does the hangman thank For being yare about him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incivility]] | noun | **1.** Deliberate discourtesy. | *"His incivility confirms no less."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[noncivilised]] | adjective | **1.** Not having a high state of culture and social development. | *"In academic literature, noncivilised designates not having a high state of culture and social development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncivilized]] | adjective | **1.** Not having a high state of culture and social development. | *"In academic literature, noncivilized designates not having a high state of culture and social development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncivil]] | adjective | **1.** Lacking civility or good manners; - willa cather. | *"Th’ uncivil kerns of Ireland are in arms And temper clay with blood of Englishmen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncivilised]] | adjective | **1.** Without civilizing influences; ; ; ; -margaret meade. | *"In academic literature, uncivilised designates without civilizing influences; ; ; ; -margaret meade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncivilized]] | adjective | **1.** Without civilizing influences; ; ; ; -margaret meade. | *"For some time past, though at intervals only, the unaccompanied, secluded White Whale had haunted those uncivilized seas mostly frequented by the Sperm Whale fishermen."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[uncivilly]] | adverb | **1.** In an uncivil manner. | *"In academic literature, uncivilly designates in an uncivil manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CIV
  </div>
</div>
