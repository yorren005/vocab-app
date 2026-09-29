---
status: unread
type: root_dashboard
---
# Dashboard — culp
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">culp-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“blame or fault”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Comparing a fresh, wholesome fruit against a damaged or spoiled one.</span>
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

The root **culp** means blame or fault. It refers to moral blameworthiness, legal negligence, confession of fault, exoneration. In English, this root forms words such as *culprit*, *culpable*, *exculpate*, and *inculpate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: blame or fault
> The root **culp** means blame or fault. It refers to moral blameworthiness, legal negligence, confession of fault, exoneration. In English, this root forms words such as *culprit*, *culpable*, *exculpate*, and *inculpate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Blame or fault</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *culprit* and *culpable*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **culp** comes from a Latin word that means *"blame or fault"*.
  - At its core, it describes blame or fault.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **culp** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of blame or fault.
  - **Mental & Social**: How people experience, organize, or communicate about blame or fault.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Culprit**: A person who is responsible for a crime or other misdeed.
  - **Culpable**: Deserving blame or censure.
  - **Exculpate**: To show or declare that someone is not guilty of wrongdoing.
  - **Inculpate**: To accuse or charge with a fault.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">culp</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `culp`
> Derivations from Latin *culpa* split across four distinct morphological patterns:
> 1. **The Nominal Base (*culpa*):**
>    - Direct Latin noun: **culpa** (in civil law: negligence).
>    - Formulaic confession: **mea culpa**.
> 2. **The Adjectival & Liability Formations (*culpabil-*):**
>    - Late Latin *culpābilis* $ightarrow$ **culpable**, **culpably**, **culpableness**, **culpability**.
> 3. **The Courtroom Abbreviation:**
>    - Anglo-Norman *cul. prit.* $ightarrow$ **culprit**.
> 4. **The Prefixed Verbal Systems:**
>    - `ex-` (out of blame): **exculpate**, **exculpation**, **exculpatory**, **disculpate**, **disculpation**.
>    - `in-` (placing blame upon): **inculpate**, **inculpation**, **inculpatory**.
>    - `in-` (privative negation = NOT blameworthy): **inculpable**, **inculpably**, **inculpableness**.

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

```
                                  ┌── Legal Negligence & Liability ── culpa, culpable, culpably, culpability
                                  │
                                  ├── Criminal Accusation & Trials ─ culprit, inculpate, inculpatory, inculpation
    [CULP-] ──────────────────────┼── Exoneration & Defense ───────── exculpate, exculpation, exculpatory, disculpate
(fault / blame / guilt)           │
                                  ├── Moral Blamelessness ─────────── inculpable, inculpably, inculpableness
                                  │
                                  └── Liturgical Acknowledgment ───── mea culpa
```

> [!tip] 🌈 Thematic Distribution of Vocabulary
> 1. **Civil Torts, Criminal Liability & Fault:** *culpa*, *culpable*, *culpably*, *culpableness*, *culpability*.
> 2. **Prosecution, Incrimination & Arraignment:** *culprit*, *inculpate*, *inculpation*, *inculpatory*.
> 3. **Criminal Defense & Exoneration:** *exculpate*, *exculpation*, *exculpatory*, *disculpate*, *disculpation*.
> 4. **Moral Innocence & Integrity:** *inculpable*, *inculpably*, *inculpableness*.
> 5. **Public Confession & Liturgy:** *mea culpa*.

---

## 🔀 4. Prefix & Combining Dynamics on culp

### Prefix Dynamics: The Danger of `in-`

> [!warning] ⚠️ Critical Prefix Trap: `inculpate` vs. `inculpable`
> The prefix `in-` has two completely different meanings depending on whether it forms a **verb** or an **adjective**:
> 1. **In the Verb `inculpate`:** The prefix `in-` is **directional/locative** ("in, on, upon"). It means "to place blame *upon* someone" $ightarrow$ to accuse, incriminate.
> 2. **In the Adjective `inculpable`:** The prefix `in-` is **privative negation** ("not"). It means "*not* blameworthy" $ightarrow$ innocent, blameless!

| Prefix | Functional Role | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `ex-` | out of, away from | **exculpate**, **exculpatory** | Releasing someone from an accusation of guilt; proving innocence. |
| `in-` (directional) | upon, against | **inculpate**, **inculpatory** | Fastening fault or criminal complicity upon an accused individual. |
| `in-` (privative) | not, un- | **inculpable** | Completely free from blame or moral culpability; faultless. |
| `mea` (Latin pronoun) | my (ablative fem.) | **mea culpa** | "Through my fault"; personal confession of error. |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!abstract] 🏛️ Institutional & Professional Sphere Applications
> 1. **Criminal Procedure & Constitutional Law:** Under the landmark Supreme Court ruling *Brady v. Maryland* (1963), prosecutors are constitutionally mandated to disclose all material *exculpatory* evidence to the defense.
> 2. **Tort Law & Negligence:** Civil suits hinge on whether a corporate manufacturer exhibited *culpability* through reckless indifference to consumer safety.
> 3. **Corporate Public Relations & Crisis Management:** Corporate CEOs issue a public *mea culpa* following catastrophic product recalls or data security breaches.
> 4. **Forensic Science & Criminology:** Ballistic ball-and-groove striations provide *inculpatory* physical evidence linking the firearm directly to the crime scene.
> 5. **Moral Theology & Ethics:** Moral theologians distinguish between formal guilt and involuntary *inculpable* ignorance (*ignorantia inculpabilis*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[culpability]] | noun | **1.** A state of guilt. | *"Her culpability lay in her making no attempt to control feeling by subtle and careful inquiry into consequences."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[culpable]] | adjective | **1.** Deserving blame or censure as being wrong or evil or injurious. | *"Lords, take your places; and, I pray you all, Proceed no straiter ’gainst our uncle Gloucester Than from true evidence of good esteem He be approved in practice culpable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[culpableness]] | noun | **1.** A state of guilt. | *"In academic literature, culpableness designates a state of guilt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[culpably]] | adverb | **1.** In a manner or to a degree deserving blame or censure. | *"Sir Claude MacDonald, the British minister, who is an ex-major in the army, and should have instructed in this very important duty, was, equally with marine officers, culpably silent."* — Robert Coltman, *Beleaguered in Pekin: The Boxer's War Against the Foreigner* |
| [[culprit]] | noun | **1.** Someone who perpetrates wrongdoing. | *"Their arrival was dreaded by the elder Miss Bennets--and Jane more especially, who gave Lydia the feelings which would have attended herself, had _she_ been the culprit, and was wretched in the thought of what her sister must endure."* — Jane Austen, *Pride and Prejudice* |
| [[exculpate]] | verb | **1.** Pronounce not guilty of criminal charges. | *"This I do, not in the least to exculpate myself, because what I have done, I have done calmly and with intention aforethought."* — S. R. Crockett, *Deep Moat Grange* |
| [[exculpated]] | verb | **1.** Pronounce not guilty of criminal charges.<br>**2.** Freed from any question of guilt. | *"In academic literature, exculpated designates pronounce not guilty of criminal charges."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exculpation]] | noun | **1.** A defense of some offensive behavior or some failure to keep a promise etc.<br>**2.** The act of freeing from guilt or blame. | *"Barter’s office?’ ‘No,’ said Bommaney, suddenly weary after his outburst of self-exculpation, ‘I don’t know."* — David Christie Murray, *Young Mr. Barter's Repentance* |
| [[exculpatory]] | adjective | **1.** Clearing of guilt or blame. | *"Tess’s voice throughout had hardly risen higher than its opening tone; there had been no exculpatory phrase of any kind, and she had not wept."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inculpability]] | noun | **1.** A state of innocence. | *"In academic literature, inculpability designates a state of innocence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inculpable]] | adjective | **1.** Free of guilt; not subject to blame. | *"In academic literature, inculpable designates free of guilt; not subject to blame."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inculpableness]] | noun | **1.** A state of innocence. | *"In academic literature, inculpableness designates a state of innocence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inculpate]] | verb | **1.** Suggest that someone is guilty. | *"He knew he was in these men’s power, that only by force had they brought him there, that force alone gave them the right to demand answers to their questions, and that the sole object of that assembly was to inculpate him."* — graf Leo Tolstoy, *War and Peace* |
| [[inculpation]] | noun | **1.** An accusation that you are responsible for some lapse or misdeed. | *"In academic literature, inculpation designates an accusation that you are responsible for some lapse or misdeed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inculpative]] | adjective | **1.** Causing blame to be imputed to. | *"In academic literature, inculpative designates causing blame to be imputed to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inculpatory]] | adjective | **1.** Causing blame to be imputed to. | *"In academic literature, inculpatory designates causing blame to be imputed to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mea culpa]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin culp within the domain of Good & Bad.<br>**2.** A technical or specialized form exhibiting the properties of culp in systematic terminology. | *"In academic literature, mea culpa designates pertaining to, derived from, or characteristic of latin culp within the domain of good & bad."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Good & Bad]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CULP
  </div>
</div>
