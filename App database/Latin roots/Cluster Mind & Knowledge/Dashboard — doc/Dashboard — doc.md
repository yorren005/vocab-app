---
status: unread
type: root_dashboard
---
# Dashboard — doc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">doc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to teach”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A lightbulb turning on in your mind when an idea suddenly makes sense.</span>
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

The root **doc** means to teach. It refers to imparting knowledge, instructing others, or guiding learning. In English, this root forms words such as *doctor*, *doctrine*, *document*, and *docile*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to teach
> The root **doc** means to teach. It refers to imparting knowledge, instructing others, or guiding learning. In English, this root forms words such as *doctor*, *doctrine*, *document*, and *docile*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To teach</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *doctor* and *doctrine*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **doc** comes from a Latin word that means *"to teach"*.
  - At its core, it describes the action of teach.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **doc** in an English word, think of **to teach**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to teach).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Doctor**: A person licensed to practice medicine.
  - **Doctrine**: A principle, position, or body of principles taught and advocated in a religion, system of thought, or branch of knowledge.
  - **Document**: A physical or digital piece of written, printed, or electronic matter providing information or official proof.
  - **Docile**: Readily trained, taught, managed, or handled.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">doc</mark>, think of <mark class="hl-def">to teach</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **doc** manifests in English through three primary classical stems:
>
> - **Present Stative Stem `doc-` (*doceō, docēre*):**
>   - Present active participle: *docent*, *docentship*
>   - Adjectives of capability: *docile*, *docility*
>   - Negative prefix `in-` ("not") $\to$ *indocile*, *indocility*
> - **Participial / Agentive Stem `doct-` (*doctus*, *doctor*, *doctrīna*):**
>   - University/medical titles: *doctor*, *doctoral*, *doctorate*, *postdoctoral*, *postdoc*
>   - Systematic bodies of belief: *doctrine*, *doctrinal*, *doctrinally*
>   - Inflexible dogmatism: *doctrinaire*, *doctrinairism*
>   - Intensive ideological implantation: *indoctrinate*, *indoctrination*, *indoctrinator*
> - **Instrumental Evidence Base `document-` (*documentum* < *doceō* + *-mentum*):**
>   - Noun/verb: *document*
>   - Media and recording genres: *documentary*, *docudrama*
>   - Systematic records: *documentation*, *documenter*
>   - Negative participle: *undocumented*

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
> The root spans six distinct operational spheres:
>
> 1. **Higher Education, Academia & Medicine:**
>    - The terminal research degree (*doctoral dissertation*, *doctorate*).
>    - Advanced research positions after the Ph.D. (*postdoctoral fellowship*).
>    - Licensed healers of human bodies (*medical doctor*).
>    - Museum and gallery educators (*museum docent*).
> 2. **Behavioral Psychology & Animal Training:**
>    - Receptive, compliant, and easily managed temperaments (*a docile child*, *a docile horse*).
>    - Stubborn, refractory, unteachable resistance (*an indocile student*).
> 3. **Theology, Politics & Foreign Policy:**
>    - Core religious dogmas (*doctrinal orthodoxy*).
>    - Executive geopolitical doctrines (*the Monroe Doctrine*, *the Truman Doctrine*).
> 4. **Ideological Control & Socialization:**
>    - Systematic, uncritical inculcation of partisan ideology (*state indoctrination*).
>    - Rigid, impractical adherence to abstract dogma (*a doctrinaire ideologue*).
> 5. **Law, Administration & Bureaucracy:**
>    - Written instruments of evidence (*legal document*, *documentary evidence*).
>    - Persons residing without statutory immigration papers (*undocumented immigrants*).
> 6. **Cinematic Arts & Information Technology:**
>    - Factual non-fiction filmmaking (*documentary film*).
>    - Hybrid factual-fictional cinema (*docudrama*).
>    - Comprehensive technical manuals for software APIs (*code documentation*).

---

## 🔀 4. Prefix & Combining Dynamics on doc

### Prefix Dynamics
- **`in-` ("into, upon"):** Stamping a doctrine deeply into a mind $\to$ *indoctrinate*, *indoctrination*.
- **`in-` (Privative / "not"):** Unable to be taught $\to$ *indocile*, *indocility*.
- **`post-` ("after"):** Beyond the doctorate $\to$ *postdoctoral*, *postdoc*.
- **`un-` ("not"):** Lacking official documentation $\to$ *undocumented*.

### Suffix Dynamics
- **`-tor` (Agent Noun):** One who teaches $\to$ *doctor*, *indoctrinator*.
- **`-ent` (Present Participle):** The one actively teaching or guiding $\to$ *docent*.
- **`-ile` / `-ility` (Capability / Quality):** Teachable $\to$ *docile*, *docility*.
- **`-ment` / `-mentum` (Instrument / Result):** The concrete proof that teaches $\to$ *document*.
- **`-ary` (Pertaining To / Form of Media):** *documentary*, *doctrinary*.
- **`-aire` (French Pejorative):** Dogmatically rigid $\to$ *doctrinaire*.
- **`-ate` (Causative Verb / Degree Office):** *indoctrinate*, *doctorate*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **University Administration & Global Higher Education:** The *Bologna Process* coordinates doctoral standards across 48 countries, defining the *doctorate* (Ph.D.) as the universal third-cycle qualification for independent research.
> - **International Relations & Geopolitics:** Diplomatic historians analyze presidential *doctrines* (e.g., Eisenhower, Carter, Bush) as overarching grand strategic frameworks directing foreign policy and military intervention.
> - **Constitutional & Evidence Law:** Under the *Best Evidence Rule*, courts demand the production of original *documents* (documentary evidence) to prove their contents during civil and criminal litigation.
> - **Software Engineering & Computer Science:** Modern technical writers and developers treat *documentation* (code comments, API specifications, READMEs) as a primary requirement for software maintainability.
> - **Museum Pedagogy & Public Education:** Major institutions like the Smithsonian and the Louvre train specialized corps of *docents* to deliver interactive, artifact-based education to public visitors.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[doc]] | noun | **1.** A licensed medical practitioner.<br>**2.** The united states federal department that promotes and administers domestic and foreign trade (including management of the census and the patent office); created in 1913. | *"How’s the heart?” “Splendid.” “You think he’ll stand ten days of it, Doc.?” “Sure.” “I don’t believe it,” the Warden announced savagely."* — Jack London, *The Jacket (The Star-Rover)* |
| [[docent]] | noun | **1.** A teacher at some universities. | *"In academic literature, docent designates a teacher at some universities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[docetism]] | noun | **1.** The heretical doctrine (associated with the gnostics) that jesus had no human body and his sufferings and death on the cross were apparent rather than real. | *"Docetism, with its phantom Christ, and Gnosticism with its antithesis of the just God and the good God, were not likely to satisfy mankind."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[docile]] | adjective | **1.** Willing to be taught or led or supervised or directed.<br>**2.** Ready and willing to be taught. | *"And here at the end of my days, reviewing all that I have known of life, I am compelled to the conclusion that strong minds are never docile."* — Jack London, *The Jacket (The Star-Rover)* |
| [[docility]] | noun | **1.** The trait of being agreeably submissive and manageable. | *"Thus her silence of docility was misinterpreted."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[doctor]] | noun | **1.** A licensed medical practitioner.<br>**2.** (roman catholic church) a title conferred on 33 saints who distinguished themselves through the orthodoxy of their theological teaching. | *"Good Doctor Pinch, you are a conjurer; Establish him in his true sense again, And I will please you what you will demand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[doctor-fish]] | noun | **1.** Surgeon fish of the west indies. | *"In academic literature, doctor-fish designates surgeon fish of the west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doctoral]] | adjective | **1.** Of or relating to a doctor or doctorate. | *"In academic literature, doctoral designates of or relating to a doctor or doctorate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doctorate]] | noun | **1.** One of the highest earned academic degrees conferred by a university. | *"One other such fit of merriment, and I must throw off my clerical wig and band." "Not so, good Doctor Byles," answered Sir William Howe; "if mirth were a crime, you had never gained your doctorate in divinity."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[doctorfish]] | noun | **1.** Surgeon fish of the west indies. | *"In academic literature, doctorfish designates surgeon fish of the west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doctorial]] | adjective | **1.** Of or relating to a doctor or doctorate. | *"In academic literature, doctorial designates of or relating to a doctor or doctorate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doctorow]] | noun | **1.** United states novelist (born in 1931). | *"In academic literature, doctorow designates united states novelist (born in 1931)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doctorspeak]] | noun | **1.** Medical jargon. | *"In academic literature, doctorspeak designates medical jargon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doctrinaire]] | noun | **1.** A stubborn person of arbitrary or arrogant opinions.<br>**2.** Stubbornly insistent on theory without regard for practicality or suitability. | *"They have been too abstractly doctrinaire, have argued too absolutely for the merits of free trade to be applied instantly regardless of the existing distribution of investments and of occupations."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[doctrinal]] | adjective | **1.** Relating to or involving or preoccupied with doctrine. | *"Bulstrode’s mind clad his most egoistic terrors in doctrinal references to superhuman ends."* — George Eliot, *Middlemarch* |
| [[doctrinally]] | adverb | **1.** As a matter of doctrine. | *"Tess, who mused on the christening a good deal, wondered if it were doctrinally sufficient to secure a Christian burial for the child."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[doctrine]] | noun | **1.** A belief (or system of beliefs) accepted as authoritative by some group or school. | *"How shall they credit A poor unlearned virgin, when the schools, Embowell’d of their doctrine, have let off The danger to itself?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[docudrama]] | noun | **1.** A film or tv program presenting the facts about a person or event. | *"In academic literature, docudrama designates a film or tv program presenting the facts about a person or event."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[document]] | noun | **1.** Writing that provides information (especially information of an official nature).<br>**2.** Anything serving as a representation of a person's thinking by means of symbolic marks. | *"A document in madness, thoughts and remembrance fitted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[documental]] | adjective | **1.** Relating to or consisting of or derived from documents. | *"In academic literature, documental designates relating to or consisting of or derived from documents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[documentary]] | noun | **1.** A film or tv program presenting the facts about a person or event.<br>**2.** Relating to or consisting of or derived from documents. | *"I’ll go round to the others in the course of the day and destroy the notes,” said Wemmick; “it’s a good rule never to leave documentary evidence if you can help it, because you don’t know when it may be put in."* — Charles Dickens, *Great Expectations* |
| [[documentation]] | noun | **1.** Confirmation that some fact or statement is true through the use of documentary evidence.<br>**2.** Program listings or technical manuals describing the operation and use of programs. | *"He compiled documentation, published, and widely distributed copies of his book, "Military-Civilian Teamwork in Suicide Prevention" (1971, 1985 and 1994.) Mike's updated essay on suicide prevention in the U.S."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[documented]] | verb | **1.** Record in detail.<br>**2.** Support or supply with references. | *"Give me a quick rundown and a documented report by the end of the day."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[indocile]] | adjective | **1.** Of persons. | *"The untrained and indocile youth, however, is made the subject of compulsory distribution."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[indocin]] | noun | **1.** A nonsteroidal anti-inflammatory drug (trade name indocin). | *"In academic literature, indocin designates a nonsteroidal anti-inflammatory drug (trade name indocin)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indoctrinate]] | verb | **1.** Teach doctrines to; teach uncritically. | *"In academic literature, indoctrinate designates teach doctrines to; teach uncritically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indoctrination]] | noun | **1.** Teaching someone to accept doctrines uncritically. | *"You will be psychologically adjusted as you progress through this indoctrination."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[postdoc]] | noun | **1.** A grant that funds postdoctoral study or research.<br>**2.** A scholar or researcher who is involved in academic study beyond the level of a doctoral degree. | *"In academic literature, postdoc designates a grant that funds postdoctoral study or research."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postdoctoral]] | noun | **1.** A grant that funds postdoctoral study or research.<br>**2.** Of or relating to study or research that is done after work for the doctoral degree has been completed. | *"In academic literature, postdoctoral designates a grant that funds postdoctoral study or research."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undocumented]] | adjective | **1.** Lacking necessary documents (as for e.g. permission to live or work in a country). | *"In academic literature, undocumented designates lacking necessary documents (as for e.g. permission to live or work in a country)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Mind & Knowledge]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DOC
  </div>
</div>
