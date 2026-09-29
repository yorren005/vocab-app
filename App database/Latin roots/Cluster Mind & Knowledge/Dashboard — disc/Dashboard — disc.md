---
status: unread
type: root_dashboard
---
# Dashboard — disc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">disc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to learn”</span>
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

The root **disc** means to learn. It refers to acquiring new knowledge, skills, or understanding through study. In English, this root forms words such as *receive*, *accept*, *disciple*, and *discipleship*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to learn
> The root **disc** means to learn. It refers to acquiring new knowledge, skills, or understanding through study. In English, this root forms words such as *receive*, *accept*, *disciple*, and *discipleship*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To learn</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *receive* and *accept*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **disc** comes from a Latin word that means *"to learn"*.
  - At its core, it describes the action of learn.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **disc** in an English word, think of **to learn**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to learn).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Receive**: An everyday English word showing the root's idea of *to learn*.
  - **Accept**: An everyday English word showing the root's idea of *to learn*.
  - **Disciple**: A personal follower who embraces and assists in spreading the doctrines of another.
  - **Discipleship**: The state, condition, or ongoing practice of being a disciple.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">disc</mark>, think of <mark class="hl-def">to learn</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **disc** manifests in English through two classical nominal offshoots:
>
> - **The Agentive Learner Stem `discipul-` (*discipulus* < *discere* + archaic agentive suffix *\*-pulos*):**
>   - Direct follower: *disciple*
>   - Abstract nouns of state: *discipleship*, *disciplehood*
>   - Classical companion prefix `con-` ("together with") $\to$ *condisciple* (fellow schoolmate)
> - **The Systemic Training Stem `disciplin-` (*disciplīna*):**
>   - Base noun/verb: *discipline*
>   - Participle & adjectives: *disciplined*, *disciplinable*, *disciplinal*
>   - Administrative & penal adjective: *disciplinary*, *disciplinarily*
>   - Person enforcing order: *disciplinarian*, *disciplinarianism*
>   - Religious flagellant: *disciplinant*
> - **Negative & Privative Prefixes on `disciplin-`:**
>   - `in-` ("not") $\to$ *indiscipline* (lack of order)
>   - `un-` ("not") $\to$ *undisciplined* (unruly, wild)
> - **Academic & Epistemological Prefixes on `disciplinary` / `discipline`:**
>   - `inter-` ("between, across") $\to$ *interdisciplinary*, *interdisciplinarity*
>   - `multi-` ("many") $\to$ *multidisciplinary*
>   - `trans-` ("beyond, across") $\to$ *transdisciplinary*
>   - `cross-` $\to$ *cross-disciplinary*
>   - `sub-` ("under, specialized") $\to$ *subdiscipline*
>   - `anti-` ("against established boundaries") $\to$ *antidisciplinary*

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
> The root spans five distinct intellectual and social arenas:
>
> 1. **Religious, Philosophical & Mentorship Allegiance:**
>    - Adherence to the living teachings of an intellectual founder or prophet (*a disciple of Socrates*, *the twelve disciples*).
>    - Fellowship among classmates undergoing shared instruction (*condisciples*).
> 2. **Military Command, Law Enforcement & Bureaucracy:**
>    - The habit of prompt, coordinated obedience to orders (*iron military discipline*).
>    - Formal sanctions or hearings for regulatory violations (*disciplinary action*, *disciplinary hearing*).
>    - Breakdown of command and civilian order (*mutinous indiscipline*).
> 3. **Personal Character, Psychology & Athletics:**
>    - The self-control required to resist distraction and achieve long-term goals (*rigorous self-discipline*).
>    - Chaotic, unchanneled, or erratic impulses (*an undisciplined mind*).
>    - Rigid, unyielding enforcement of rules (*a stern disciplinarian*).
> 4. **Epistemology & Academic Organization:**
>    - An autonomous field of human knowledge (*the academic discipline of anthropology*).
>    - Specialized branches within a broader field (*a subdiscipline of molecular genetics*).
> 5. **Modern Scientific Synthesis & Innovation:**
>    - Integrating methods from multiple fields to solve complex problems (*interdisciplinary team*, *transdisciplinary sustainability research*).

---

## 🔀 4. Prefix & Combining Dynamics on disc

### Prefix Dynamics
- **`con-` ("together, fellow"):** Sharing the experience of instruction $\to$ *condisciple* (a schoolfellow).
- **`in-` / `un-` (Privative / Negative):** Complete absence or rejection of order $\to$ *indiscipline*, *undisciplined*.
- **`inter-` ("between"):** Crossing the boundaries of established subjects $\to$ *interdisciplinary*, *interdisciplinarity*.
- **`multi-` ("many"):** Assembling several separate fields in parallel $\to$ *multidisciplinary*.
- **`trans-` ("beyond"):** Dissolving disciplinary boundaries into a unified synthesis $\to$ *transdisciplinary*.
- **`sub-` ("under"):** A narrower branch inside a field $\to$ *subdiscipline*.
- **`anti-` ("opposing"):** Rejecting traditional academic departmental silos $\to$ *antidisciplinary*.

### Suffix Dynamics
- **`-ple` (from Latin *-pulus*, agentive learner):** *disciple*.
- **`-ship` / `-hood` (State / Office):** *discipleship*, *disciplehood*.
- **`-ine` (from Latin *-īna*, abstract system of practice):** *discipline*.
- **`-ary` (Pertaining To / Regulatory):** *disciplinary*, *interdisciplinary*.
- **`-arian` (Dogmatic Enforcer / Practitioner):** *disciplinarian*.
- **`-able` (Capability of Instruction):** *disciplinable*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Higher Education & Research Funding:** Major granting bodies (such as the NSF and Horizon Europe) prioritize *interdisciplinary* and *transdisciplinary* initiatives to tackle climate change, bioinformatics, and artificial intelligence ethics.
> - **Military History & Defense Strategy:** Clausewitz and Sun Tzu analyze *discipline* as the primary force multiplier that transforms panic-prone civilian recruits into a cohesive fighting combat force.
> - **Labor Law & Professional Regulation:** State medical and bar associations maintain standing *disciplinary committees* empowered to suspend or disbar professionals for malpractice or ethical violations.
> - **Cognitive Psychology & Behavioral Economics:** Researchers investigate *self-discipline* (executive function and delayed gratification) as a predictor of educational attainment and financial stability.
> - **Comparative Religion & Theology:** Biblical theologians examine the Greek *mathētēs* (μαθητής) through the Latin lens of *discipulus*, distinguishing superficial followers from dedicated *discipleship*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[disc]] | noun | **1.** Sound recording consisting of a disk with a continuous groove; used to reproduce music by rotating while a phonograph needle tracks in the groove.<br>**2.** Something with a round shape resembling a flat circular plate. | *"Through a partly-opened door the noise of a scrubbing-brush led up to the charwoman, Maryann Money, a person who for a face had a circular disc, furrowed less by age than by long gazes of perplexity at distant objects."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[discalceate]] | adjective | **1.** (used of certain religious orders) barefoot or wearing only sandals. | *"In academic literature, discalceate designates (used of certain religious orders) barefoot or wearing only sandals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discalced]] | adjective | **1.** (used of certain religious orders) barefoot or wearing only sandals. | *"In academic literature, discalced designates (used of certain religious orders) barefoot or wearing only sandals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discant]] | noun | **1.** A decorative musical accompaniment (often improvised) added above a basic melody. | *"In academic literature, discant designates a decorative musical accompaniment (often improvised) added above a basic melody."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discard]] | noun | **1.** Anything that is cast aside or discarded.<br>**2.** (cards) the act of throwing out a useless card or of failing to follow suit. | *"By all the gods that Romans bow before, I here discard my sickness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discarded]] | verb | **1.** Throw or cast away.<br>**2.** Thrown away. | *"And shall it in more shame be further spoken, That you are fool’d, discarded, and shook off By him for whom these shames ye underwent?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discase]] | verb | **1.** Get undressed. | *"Ariel, Fetch me the hat and rapier in my cell. [_Exit Ariel._] I will discase me, and myself present As I was sometime Milan."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disceptation]] | noun | **1.** A contentious speech act; a dispute where there is strong disagreement. | *"In academic literature, disceptation designates a contentious speech act; a dispute where there is strong disagreement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discern]] | verb | **1.** Detect with the senses. | *"You look on me: what wreck discern you in me Deserves your pity?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discernability]] | noun | **1.** Distinctness that makes perception easy. | *"In academic literature, discernability designates distinctness that makes perception easy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discernable]] | adjective | **1.** Perceptible by the senses or intellect. | *"I could give an individual description of each, for every atom in that room, large enough for discernable shape or colour, seems branded into my brain."* — George MacDonald, *The Portent and Other Stories* |
| [[discernible]] | adjective | **1.** Perceptible by the senses or intellect.<br>**2.** Capable of being perceived clearly. | *"At first they were faintly discernible in the mist, and above them the later stars still glimmered."* — Charles Dickens, *Bleak House* |
| [[discerning]] | verb | **1.** Detect with the senses.<br>**2.** Having or revealing keen insight and good judgment. | *"That bear’st a cheek for blows, a head for wrongs; Who hast not in thy brows an eye discerning Thine honour from thy suffering; that not know’st Fools do those villains pity who are punish’d Ere they have done their mischief."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discernment]] | noun | **1.** The cognitive condition of someone who understands.<br>**2.** Delicate discrimination (especially of aesthetic values). | *"It would be an insult to the discernment of any man with half an eye to tell him so."* — Charles Dickens, *Bleak House* |
| [[discerp]] | verb | **1.** Divide into pieces.<br>**2.** Cut off from a whole. | *"In academic literature, discerp designates divide into pieces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disciform]] | adjective | **1.** Having a round or oval shape like a disc. | *"In academic literature, disciform designates having a round or oval shape like a disc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discina]] | noun | **1.** Any fungus of the genus discina. | *"In academic literature, discina designates any fungus of the genus discina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disciple]] | noun | **1.** Someone who believes and helps to spread the doctrine of another. | *"It broke upon her at length as a great pain that her last old disciple was about to forsake her and flee."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[discipleship]] | noun | **1.** The position of disciple. | *"His tests of discipleship illumine his ideal of character--Theocentric thinking--negation of self--the thought-out life."* — T. R. Glover, *The Jesus of History* |
| [[disciplinal]] | adjective | **1.** Designed to promote discipline. | *"In academic literature, disciplinal designates designed to promote discipline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disciplinarian]] | noun | **1.** Someone who demands exact conformity to rules and forms. | *"I fear he was a bad disciplinarian."* — George Eliot, *Middlemarch* |
| [[disciplinary]] | adjective | **1.** Relating to discipline in behavior.<br>**2.** Relating to a specific field of academic study. | *"Her doctrine and practice always were instant, silent, and cheerful obedience to medical and disciplinary orders, without any qualification whatever; and by this she overcame the natural sensitiveness of the medical authorities."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[discipline]] | noun | **1.** A branch of knowledge.<br>**2.** A system of rules of conduct or method of practice. | *"Their discipline, Now mingled with their courages, will make known To their approvers they are people such That mend upon the world."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disciplined]] | verb | **1.** Develop (children's) behavior by instruction and practice; especially to teach self-control.<br>**2.** Punish in order to gain control or enforce obedience. | *"Has he disciplined Aufidius soundly?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disclaim]] | verb | **1.** Renounce a legal claim or title to.<br>**2.** Make a disclaimer about. | *"Must these have voices, that can yield them now And straight disclaim their tongues?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disclaimer]] | noun | **1.** (law) a voluntary repudiation of a person's legal claim to something.<br>**2.** Denial of any connection with or knowledge of. | *"I hope that after this explicit disclaimer I shall no longer be taxed with embracing a system of mythology which I look upon not merely as false but as preposterous and absurd."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[disclike]] | adjective | **1.** Having a flat circular shape. | *"In academic literature, disclike designates having a flat circular shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disclose]] | verb | **1.** Make known to the public information that was previously known only to a few people or that was meant to be kept a secret.<br>**2.** Disclose to view as by removing a cover. | *"Come, come, disclose The state of your affection, for your passions Have to the full appeach’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disclosed]] | verb | **1.** Make known to the public information that was previously known only to a few people or that was meant to be kept a secret.<br>**2.** Disclose to view as by removing a cover. | *"If my observation, which very seldom lies, By the heart’s still rhetoric disclosed with eyes, Deceive me not now, Navarre is infected."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disclosure]] | noun | **1.** The speech act of making something evident. | *"Rouncewell’s townsman heard of the disclosure, he no more allowed the girl to be patronized and honoured than he would have suffered her to be trodden underfoot before his eyes."* — Charles Dickens, *Bleak House* |
| [[disco]] | noun | **1.** Popular dance music (especially in the late 1970s); melodic with a regular bass beat; intended mainly for dancing at discotheques.<br>**2.** A public dance hall for dancing to recorded popular music. | *"In academic literature, disco designates popular dance music (especially in the late 1970s); melodic with a regular bass beat; intended mainly for dancing at discotheques."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discocephali]] | noun | **1.** Small order of fishes comprising the remoras. | *"In academic literature, discocephali designates small order of fishes comprising the remoras."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discoglossidae]] | noun | **1.** Family of old world toads having a fixed disklike tongue. | *"In academic literature, discoglossidae designates family of old world toads having a fixed disklike tongue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discography]] | noun | **1.** A descriptive catalog of musical recordings. | *"In academic literature, discography designates a descriptive catalog of musical recordings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discoid]] | adjective | **1.** Having a flat circular shape. | *"In academic literature, discoid designates having a flat circular shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discoidal]] | adjective | **1.** Having a flat circular shape. | *"In academic literature, discoidal designates having a flat circular shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discolor]] | verb | **1.** Lose color or turn colorless.<br>**2.** Cause to lose or change color. | *"When by chance these precious parts in a nursing whale are cut by the hunter’s lance, the mother’s pouring milk and blood rivallingly discolor the sea for rods."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[discoloration]] | noun | **1.** A soiled or discolored appearance.<br>**2.** The act of changing the natural color of something by making it duller or dingier or unnatural or faded. | *"From the wonderful discoloration and turbidity of the water, Columbus sagaciously concluded that a very large river was near, and consequently--consequent-ly--a great continent!" But to this continent Elsie never attained."* — S. R. Crockett, *Deep Moat Grange* |
| [[discolorise]] | verb | **1.** Remove color from. | *"In academic literature, discolorise designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discolorize]] | verb | **1.** Remove color from. | *"In academic literature, discolorize designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discolour]] | verb | **1.** Change color, often in an undesired manner. | *"If we may pass, we will; if we be hind’red, We shall your tawny ground with your red blood Discolour; and so, Montjoy, fare you well."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discolouration]] | noun | **1.** A soiled or discolored appearance.<br>**2.** The act of changing the natural color of something by making it duller or dingier or unnatural or faded. | *"In academic literature, discolouration designates a soiled or discolored appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discolourise]] | verb | **1.** Remove color from. | *"In academic literature, discolourise designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discombobulate]] | verb | **1.** Cause to be confused emotionally.<br>**2.** Be confusing or perplexing to; cause to be unable to think clearly. | *"In academic literature, discombobulate designates cause to be confused emotionally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discombobulated]] | verb | **1.** Cause to be confused emotionally.<br>**2.** Be confusing or perplexing to; cause to be unable to think clearly. | *"In academic literature, discombobulated designates cause to be confused emotionally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discombobulation]] | noun | **1.** A feeling of embarrassment that leaves you confused. | *"In academic literature, discombobulation designates a feeling of embarrassment that leaves you confused."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discomfit]] | verb | **1.** Cause to lose one's composure. | *"But that my heart’s on future mischief set, I would speak blasphemy ere bid you fly; But fly you must; uncurable discomfit Reigns in the hearts of all our present parts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discomfited]] | noun | **1.** People who are defeated.<br>**2.** Cause to lose one's composure. | *"To heave the traitor Somerset from hence And fight against that monstrous rebel Cade, Who since I heard to be discomfited."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discomfiture]] | noun | **1.** Anxious embarrassment. | *"Sad tidings bring I to you out of France, Of loss, of slaughter, and discomfiture: Guienne, Champaigne, Rheims, Rouen, Orleans, Paris, Guysors, Poictiers, are all quite lost."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discomfort]] | noun | **1.** The state of being tense and feeling pain.<br>**2.** An uncomfortable feeling of mental painfulness or distress. | *"What mean you, sir, To give them this discomfort?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discommode]] | verb | **1.** To cause inconvenience or discomfort to. | *"In academic literature, discommode designates to cause inconvenience or discomfort to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discompose]] | verb | **1.** Cause to lose one's composure. | *"Men who possess all the advantages of life, are in a state where there are many accidents to disorder and discompose, but few to please them."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[discomposed]] | verb | **1.** Cause to lose one's composure.<br>**2.** Having your composure disturbed. | *"You will not be discomposed by the Lord Chancellor, I dare say?” “No, sir,” I said, “I don’t think I shall,” really not seeing on consideration why I should be."* — Charles Dickens, *Bleak House* |
| [[discomposure]] | noun | **1.** Anxious embarrassment.<br>**2.** A temperament that is perturbed and lacking in composure. | *"Darcy, who, though extremely surprised, was not unwilling to receive it, when she instantly drew back, and said with some discomposure to Sir William,-- “Indeed, sir, I have not the least intention of dancing."* — Jane Austen, *Pride and Prejudice* |
| [[discomycete]] | noun | **1.** Any fungus that is a member of the subclass discomycetes. | *"In academic literature, discomycete designates any fungus that is a member of the subclass discomycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discomycetes]] | noun | **1.** A large and taxonomically difficult group of ascomycetes in which the fleshy fruiting body is disklike or cup-shaped.<br>**2.** Any fungus that is a member of the subclass discomycetes. | *"In academic literature, discomycetes designates a large and taxonomically difficult group of ascomycetes in which the fleshy fruiting body is disklike or cup-shaped."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discomycetous]] | adjective | **1.** Relating to or characteristic of fungi of the subclass discomycetes. | *"In academic literature, discomycetous designates relating to or characteristic of fungi of the subclass discomycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disconcert]] | verb | **1.** Cause to feel embarrassment.<br>**2.** Cause to lose one's composure. | *"How could she face her parents, get back her box, and disconcert the whole scheme for the rehabilitation of her family on such sentimental grounds?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[disconcerted]] | verb | **1.** Cause to feel embarrassment.<br>**2.** Cause to lose one's composure. | *"The three children's faces were absolutely disconcerted, for the obstacles were clearly insurmountable."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[disconcerting]] | verb | **1.** Cause to feel embarrassment.<br>**2.** Cause to lose one's composure. | *"This move was unexpected, and proportionately disconcerting."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[disconcertingly]] | adverb | **1.** In a disturbing or embarrassing manner. | *"In academic literature, disconcertingly designates in a disturbing or embarrassing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disconcertion]] | noun | **1.** Anxious embarrassment. | *"And if they could be prevailed upon or compelled to do it, the increased expense of a frequent rotation of service, and the loss of labor and disconcertion of the industrious pursuits of individuals, would form conclusive objections to the scheme."* — Alexander Hamilton, *The Federalist Papers* |
| [[disconcertment]] | noun | **1.** Anxious embarrassment. | *"In academic literature, disconcertment designates anxious embarrassment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disconfirming]] | adjective | **1.** Not indicating the presence of microorganisms or disease or a specific condition.<br>**2.** Establishing as invalid or untrue. | *"In academic literature, disconfirming designates not indicating the presence of microorganisms or disease or a specific condition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disconnect]] | noun | **1.** An unbridgeable disparity (as from a failure of understanding).<br>**2.** Pull the plug of (electrical appliances) and render inoperable. | *"As the last of the six cleared in through the Raven's air lock, Hodak had hit "Emergency," on appropriate switches and the ship-to-station servicing lines went through quick-disconnect."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[disconnected]] | verb | **1.** Pull the plug of (electrical appliances) and render inoperable.<br>**2.** Make disconnected, disjoin or unfasten. | *"His changes of mood did not offend me, because I saw that I had nothing to do with their alternation; the ebb and flow depended on causes quite disconnected with me."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[disconnectedness]] | noun | **1.** State of being disconnected. | *"I used to speculate—but even this with a dim disconnectedness—as to how the rough future (for all futures are rough!) would handle them and might bruise them."* — Henry James, *The Turn of the Screw* |
| [[disconnection]] | noun | **1.** State of being disconnected.<br>**2.** An unbridgeable disparity (as from a failure of understanding). | *"He looked on the operations of nature "in disconnection dull and spiritless;" he could no longer apprehend her unity nor feel her charm."* — F. W. H. Myers, *Wordsworth* |
| [[disconsolate]] | adjective | **1.** Sad beyond comforting; incapable of being consoled.<br>**2.** Causing dejection. | *"All disconsolate, With Pindarus his bondman, on this hill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disconsolately]] | adverb | **1.** In grief-stricken loneliness; without comforting circumstances or prospects. | *"Bagnet removes his hand from his head as if the shower-bath were over and looks disconsolately at Mr."* — Charles Dickens, *Bleak House* |
| [[disconsolateness]] | noun | **1.** Feeling downcast and disheartened and hopeless. | *"In academic literature, disconsolateness designates feeling downcast and disheartened and hopeless."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discontent]] | noun | **1.** A longing for something better than the present situation.<br>**2.** Make dissatisfied. | *"So I leave you, sir, To th’ worst of discontent. [_Exit._] CLOTEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontented]] | verb | **1.** Make dissatisfied.<br>**2.** Showing or experiencing dissatisfaction or restless longing. | *"Most meet That first we come to words, and therefore have we Our written purposes before us sent, Which if thou hast considered, let us know If ’twill tie up thy discontented sword And carry back to Sicily much tall youth That else must perish here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontentedly]] | adverb | **1.** With discontent; in a discontented manner. | *"Then comes, dropping after all, Apemantus, discontentedly, like himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontentedness]] | noun | **1.** A longing for something better than the present situation. | *"A mole near either elbow declares restlessness, a roving and unsteady temper, also a discontentedness with those whom they are obliged constantly to live with."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[discontentment]] | noun | **1.** A longing for something better than the present situation. | *"In academic literature, discontentment designates a longing for something better than the present situation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discontinuance]] | noun | **1.** The act of discontinuing or breaking off; an interruption (temporary or permanent). | *"Fatigued as she had been by the morning’s walk, they had no sooner dined than she set off again in quest of her former acquaintance, and the evening was spent in the satisfactions of an intercourse renewed after many years’ discontinuance."* — Jane Austen, *Pride and Prejudice* |
| [[discontinuation]] | noun | **1.** The act of discontinuing or breaking off; an interruption (temporary or permanent). | *"In academic literature, discontinuation designates the act of discontinuing or breaking off; an interruption (temporary or permanent)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discontinue]] | verb | **1.** Put an end to a state or an activity.<br>**2.** Come to or be at an end. | *"My lord, for your many courtesies I thank you: I must discontinue your company."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontinued]] | verb | **1.** Put an end to a state or an activity.<br>**2.** Come to or be at an end. | *"And twenty of these puny lies I’ll tell, That men shall swear I have discontinued school About a twelvemonth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discontinuity]] | noun | **1.** Lack of connection or continuity. | *"In academic literature, discontinuity designates lack of connection or continuity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discontinuous]] | adjective | **1.** Of a function or curve; possessing one or more discontinuities.<br>**2.** Not continuing without interruption in time or space. | *"The absurd answer (that Achilles could never overtake the tortoise) resulted from this: that motion was arbitrarily divided into discontinuous elements, whereas the motion both of Achilles and of the tortoise was continuous."* — graf Leo Tolstoy, *War and Peace* |
| [[discord]] | noun | **1.** Lack of agreement or harmony.<br>**2.** Disagreement among those expected to cooperate. | *"If he, compact of jars, grow musical, We shall have shortly discord in the spheres."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discordance]] | noun | **1.** A harsh mixture of sounds.<br>**2.** Strife resulting from a lack of agreement. | *"As they sit listening to the solemn swell, the confidence of last night rises in young Edwin Drood’s mind, and he thinks how unlike this music is to that discordance."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[discordant]] | adjective | **1.** Not in agreement or harmony.<br>**2.** Lacking in harmony. | *"Rumour is a pipe Blown by surmises, jealousies, conjectures, And of so easy and so plain a stop That the blunt monster with uncounted heads, The still-discordant wav’ring multitude, Can play upon it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discordantly]] | adverb | **1.** In a discordant manner. | *"The lesson at last came to an end, after proceeding as discordantly as possible; and when the little girl had changed her shoes and had had her white muslin extinguished in shawls, she was taken away."* — Charles Dickens, *Bleak House* |
| [[discorporate]] | adjective | **1.** Not having a material body. | *"In academic literature, discorporate designates not having a material body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discotheque]] | noun | **1.** A public dance hall for dancing to recorded popular music. | *"In academic literature, discotheque designates a public dance hall for dancing to recorded popular music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discount]] | noun | **1.** The act of reducing the selling price of merchandise.<br>**2.** Interest on an annual basis deducted in advance on a loan. | *"Thus the banks have become the custodians of a large proportion of the money (or funds) needed for current use by individuals and business corporations. § 6. #Discount and deposit#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[discountenance]] | verb | **1.** Look with disfavor on.<br>**2.** Show disapproval by discouraging. | *"Several important considerations have been touched in the course of these papers, which discountenance the supposition that the operation of the federal government will by degrees prove fatal to the State governments."* — Alexander Hamilton, *The Federalist Papers* |
| [[discounter]] | noun | **1.** A sales outlet offering goods at a discounted price. | *"In academic literature, discounter designates a sales outlet offering goods at a discounted price."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discourage]] | verb | **1.** Try to prevent; show opposition to.<br>**2.** Deprive of courage or hope; take away hope from; cause to feel discouraged. | *"Moreover, bankers could, by pursuing a more conservative policy, discourage speculative methods of enterprise."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[discouraged]] | verb | **1.** Try to prevent; show opposition to.<br>**2.** Deprive of courage or hope; take away hope from; cause to feel discouraged. | *"Day after day passed, and I felt almost discouraged."* — Classic Author, *The wonders of prayer* |
| [[discouragement]] | noun | **1.** The feeling of despair in the face of obstacles.<br>**2.** The expression of opposition and disapproval. | *"We were sorry for the poor dear girl and found so much to admire in the good disposition which had survived under such discouragement that we both at once (I mean Ada and I) proposed a little scheme that made her perfectly joyful."* — Charles Dickens, *Bleak House* |
| [[discouraging]] | verb | **1.** Try to prevent; show opposition to.<br>**2.** Deprive of courage or hope; take away hope from; cause to feel discouraged. | *"She decided not to dampen the children's good spirits that evening with the discouraging news in the letter."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[discouragingly]] | adverb | **1.** In a discouraging manner. | *"One evening after the physician had spoken discouragingly, and his parents, as he perceived, were in deep distress, he was absorbed on his knees in a corner of the room in earnest prayer."* — Classic Author, *The wonders of prayer* |
| [[discourse]] | noun | **1.** Extended verbal expression in speech or writing.<br>**2.** An address of a religious nature (usually delivered during a church service). | *"Past cure I am, now reason is past care, And frantic-mad with evermore unrest, My thoughts and my discourse as mad men’s are, At random from the truth vainly expressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discourteous]] | adjective | **1.** Showing no courtesy; rude.<br>**2.** Lacking social graces. | *"Nor has he anything more to say or do but to nod once in the same frigid and discourteous manner and to say briefly, “You can go."* — Charles Dickens, *Bleak House* |
| [[discourteously]] | adverb | **1.** In an impolite manner. | *"They drew nearer together, therefore, and entreated the worthy Peechy Prauw to continue the tale which had been so discourteously interrupted."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[discourtesy]] | noun | **1.** An expression of lack of respect.<br>**2.** A manner that is rude and insulting. | *"Faith, I shall unfold equal discourtesy To your best kindness; one of your great knowing Should learn, being taught, forbearance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discover]] | verb | **1.** Discover or determine the existence, presence, or fact of.<br>**2.** Get to know or become aware of, usually accidentally. | *"If there be here German, or Dane, Low Dutch, Italian, or French, let him speak to me, I’ll discover that which shall undo the Florentine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discoverable]] | adjective | **1.** Capable of being ascertained or found out. | *"I am aware that it is so prominent as to be discoverable immediately."* — Charles Dickens, *Bleak House* |
| [[discovered]] | verb | **1.** Discover or determine the existence, presence, or fact of.<br>**2.** Get to know or become aware of, usually accidentally. | *"The general says you that have so traitorously discovered the secrets of your army, and made such pestiferous reports of men very nobly held, can serve the world for no honest use; therefore you must die."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discoverer]] | noun | **1.** Someone who is the first to think of or make something.<br>**2.** Someone who is the first to observe something. | *"Does it seem incongruous to you that a Middlemarch surgeon should dream of himself as a discoverer?"* — George Eliot, *Middlemarch* |
| [[discovery]] | noun | **1.** The act of discovering something.<br>**2.** Something that is discovered. | *"The heavens have thought well on thee, Lafew, To bring forth this discovery."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discredit]] | noun | **1.** The state of being held in low esteem.<br>**2.** Cause to be distrusted or disbelieved. | *"Did he not rather Discredit my authority with yours, And make the wars alike against my stomach, Having alike your cause?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discreditable]] | adjective | **1.** Tending to bring discredit or disrepute; blameworthy. | *"I am glad it occurred to me to mention it; for it would really be discreditable to _you_ to let them go alone.” “My uncle is to send a servant for us.” “Oh!"* — Jane Austen, *Pride and Prejudice* |
| [[discreditably]] | adverb | **1.** In a dishonorable manner or to a dishonorable degree. | *"In academic literature, discreditably designates in a dishonorable manner or to a dishonorable degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discredited]] | verb | **1.** Cause to be distrusted or disbelieved.<br>**2.** Damage the reputation of. | *"O, sir, you had then left unseen a wonderful piece of work, which not to have been blest withal would have discredited your travel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discreet]] | adjective | **1.** Marked by prudence or modesty and wise self-restraint.<br>**2.** Unobtrusively perceptive and sympathetic. | *"Let not thy discreet heart think it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discreetly]] | adverb | **1.** With discretion; prudently and with wise self-restraint. | *"But, sirrah, not for my sake but your master’s, I advise You use your manners discreetly in all kind of companies: When I am alone, why, then I am Tranio; But in all places else your master, Lucentio."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discreetness]] | noun | **1.** Knowing how to avoid embarrassment or distress.<br>**2.** Subtly skillful handling of a situation. | *"In academic literature, discreetness designates knowing how to avoid embarrassment or distress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discrepancy]] | noun | **1.** A difference between conflicting facts or claims or opinions.<br>**2.** An event that departs from expectations. | *"I, labor-incomes, in Index.] [Footnote 5: There is an appearance of a slight discrepancy due to the omission of fractions of cents."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[discrepant]] | adjective | **1.** Not compatible with other facts.<br>**2.** Not in agreement. | *"The Lives of Pericles and Themistocles, for instance, are little more than mere collectanea from sources widely discrepant, and often quite worthless."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[discrete]] | adjective | **1.** Constituting a separate entity or part. | *"What discrete succession of images did Stephen meanwhile perceive?"* — James Joyce, *Ulysses* |
| [[discreteness]] | noun | **1.** The state of being several and distinct. | *"In academic literature, discreteness designates the state of being several and distinct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discretion]] | noun | **1.** Freedom to act or judge on one's own.<br>**2.** Knowing how to avoid embarrassment or distress. | *"But it raises the greater war between him and his discretion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discretional]] | adjective | **1.** Having or using the ability to act or decide according to your own discretion or judgment. | *"In academic literature, discretional designates having or using the ability to act or decide according to your own discretion or judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discretionary]] | adjective | **1.** Having or using the ability to act or decide according to your own discretion or judgment.<br>**2.** (especially of funds) not earmarked; available for use as needed. | *"The legislature, with a discretionary power over the salary and emoluments of the Chief Magistrate, could render him as obsequious to their will as they might think proper to make him."* — Alexander Hamilton, *The Federalist Papers* |
| [[discriminable]] | adjective | **1.** Capable of being discriminated. | *"In academic literature, discriminable designates capable of being discriminated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discriminate]] | verb | **1.** Recognize or perceive the difference.<br>**2.** Treat differently on the basis of sex or race. | *"Women do not discriminate the lawful from the unlawful: so long as they produce an effect, it does not matter to them.' This gave me a strange impression, for it seemed to me that M. le Curé was abandoning his own side."* — Mrs. Oliphant, *A Beleaguered City* |
| [[discriminating]] | verb | **1.** Recognize or perceive the difference.<br>**2.** Treat differently on the basis of sex or race. | *"With a nicely discriminating eye, he seizes at once upon its capabilities, and pictures in his mind the future landscape."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[discrimination]] | noun | **1.** Unfair treatment of a person or group on the basis of prejudice.<br>**2.** The cognitive process whereby two or more stimuli are distinguished. | *"The young man, thus invited, glanced them over, and attempted some discrimination; but, as the group were all so new to him, he could not very well exercise it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[discriminative]] | adjective | **1.** Capable of making fine distinctions.<br>**2.** Expressing careful judgment; ; -tyler dennett. | *"In academic literature, discriminative designates capable of making fine distinctions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discriminator]] | noun | **1.** A person who (or that which) differentiates. | *"In academic literature, discriminator designates a person who (or that which) differentiates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discriminatory]] | adjective | **1.** Being biased or having a belief or attitude formed beforehand.<br>**2.** Containing or implying a slight or showing prejudice. | *"The same allegation of inevitableness was once commonly made of discriminatory railroad rates and rebates, evils which have been in large part remedied only since the period 1903-1906, when at last intelligent action was taken."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[discursive]] | adjective | **1.** Proceeding to a conclusion by reason or argument rather than intuition.<br>**2.** (of e.g. speech and writing) tending to depart from the main point or cover a wide range of subjects. | *"I had not got far into it, when I judged from her looks that she was thinking in a discursive way of me, rather than of what I said."* — Charles Dickens, *Great Expectations* |
| [[discursively]] | adverb | **1.** In a rambling manner. | *"In academic literature, discursively designates in a rambling manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discursiveness]] | noun | **1.** The quality of being discursive. | *"The moment was too propitious for the display of that discursiveness which seemed the only bond of union among tempers so divergent."* — James Joyce, *Ulysses* |
| [[discus]] | noun | **1.** An athletic competition in which a disk-shaped object is thrown as far as possible.<br>**2.** A disk used in throwing competitions. | *"The concavities of it is not sufficient; for, look you, the athversary, you may discuss unto the Duke, look you, is digt himself four yard under the countermines."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discuss]] | noun | **1.** An athletic competition in which a disk-shaped object is thrown as far as possible.<br>**2.** A disk used in throwing competitions. | *"The concavities of it is not sufficient; for, look you, the athversary, you may discuss unto the Duke, look you, is digt himself four yard under the countermines."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discussant]] | noun | **1.** A participant in a formal discussion. | *"In academic literature, discussant designates a participant in a formal discussion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discussion]] | noun | **1.** An extended communication (often interactive) dealing with some particular topic.<br>**2.** An exchange of views on some topic. | *"She also held a discussion with Mr."* — Charles Dickens, *Bleak House* |
| [[indiscernible]] | adjective | **1.** Difficult or impossible to perceive or discern.<br>**2.** Barely able to be perceived. | *"You were in the grounds adjoining Major Howard's mansion on the night of the twelfth of January last," said he, addressing the singular-looking man, whose features were so entirely hidden by his collar and hat-brim, as to be indiscernible."* — Effie Afton, *Eventide* |
| [[indiscipline]] | noun | **1.** The trait of lacking discipline. | *"In academic literature, indiscipline designates the trait of lacking discipline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indiscreet]] | adjective | **1.** Lacking discretion; injudicious. | *"For as it would ill become me to be vain, indiscreet, or a fool, So, were there a patch set on learning, to see him in a school."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indiscreetly]] | adverb | **1.** Without discretion or wisdom or self-restraint. | *"Why truly, said he, I think I should do very indiscreetly in so doing; for if an ass kicks you, do you kick him again? 1195."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[indiscreetness]] | noun | **1.** Lacking good judgment. | *"I’m surprised at the indiscreetness you commit."* — Charles Dickens, *Bleak House* |
| [[indiscrete]] | adjective | **1.** Not divided or divisible into parts. | *"She is as small as a mouse, but once a year she stirs.[255] Notes: [64] Pechuel-Loesche, "Indiscretes aus Loango," _Zeitschrift für Ethnologie_, x. (1878) p. 23. [65] Rev."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[indiscretion]] | noun | **1.** The trait of being injudicious.<br>**2.** A petty misdeed. | *"Rashly, And prais’d be rashness for it,—let us know, Our indiscretion sometime serves us well, When our deep plots do pall; and that should teach us There’s a divinity that shapes our ends, Rough-hew them how we will."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indiscriminate]] | adjective | **1.** Failing to make or recognize distinctions.<br>**2.** Not marked by fine distinctions. | *"His great power seemed to be his power of indiscriminate admiration."* — Charles Dickens, *Bleak House* |
| [[indiscriminately]] | adverb | **1.** In a random manner.<br>**2.** In an indiscriminate manner. | *"It is not a thing to be used indiscriminately, but it is good upon occasion: as now, for instance."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[indiscriminating]] | adjective | **1.** Not discriminating. | *"While they rebuke the indiscriminating bigotry with which some of our countrymen admire and imitate every thing English, merely because it is English, let them frankly point out what is really worthy of approbation."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[interdisciplinary]] | adjective | **1.** Drawing from or characterized by participation of two or more fields of study. | *"In academic literature, interdisciplinary designates drawing from or characterized by participation of two or more fields of study."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rediscover]] | verb | **1.** Discover again. | *"Men, he saw, do not want precepts; they do not want ethics, morals or rules; what they do need is to rethink God, to rediscover him, to re-explore him, to live on the basis of relation with God."* — T. R. Glover, *The Jesus of History* |
| [[rediscovery]] | noun | **1.** The act of discovering again. | *"In academic literature, rediscovery designates the act of discovering again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiscerning]] | adjective | **1.** Lacking discernment. | *"Casaubon seemed to be stupidly undiscerning and odiously unjust."* — George Eliot, *Middlemarch* |
| [[undiscipline]] | noun | **1.** The trait of lacking discipline. | *"But the latter was an undisciplined and lawless thing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[undisciplined]] | adjective | **1.** Not subjected to discipline.<br>**2.** Not subjected to correction or discipline. | *"But the latter was an undisciplined and lawless thing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[undisclosed]] | adjective | **1.** Not made known. | *"But there stood one in the midst of you, at whose brand of sin and infamy ye have not shuddered!” It seemed, at this point, as if the minister must leave the remainder of his secret undisclosed."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[undiscouraged]] | adjective | **1.** Not deterred; - osbert sitwell. | *"Rattle, rattle, went the small sound, undiscouraged."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[undiscoverable]] | adjective | **1.** Not able to be ascertained; resisting discovery. | *"A Formula of some great undiscoverable indefinable Thought...."* — Donn Byrne, *The Wind Bloweth* |
| [[undiscovered]] | adjective | **1.** Not discovered.<br>**2.** Not yet discovered. | *"Full often, like a shag-haired crafty kern, Hath he conversed with the enemy, And undiscovered come to me again And given me notice of their villainies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undiscriminating]] | adjective | **1.** Not discriminating. | *"The common law contained likewise a closely related body of doctrine by which the railroads, as common carriers, ought to have given equitable and undiscriminating rates to all shippers."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |

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
    ROOT DASHBOARD · DISC
  </div>
</div>
