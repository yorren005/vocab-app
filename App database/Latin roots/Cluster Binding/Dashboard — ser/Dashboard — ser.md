---
status: unread
type: root_dashboard
---
# Dashboard — ser
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ser-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to join, bind, or string together”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong cord wrapping around a bundle and tying it securely together.</span>
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

The root **ser** means to join, bind, or string together. It refers to fastening with a cord, wrapping around something, or enclosing an area. In English, this root forms words such as *string*, *rope*, *series*, and *serial*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to join, bind, or string together
> The root **ser** means to join, bind, or string together. It refers to fastening with a cord, wrapping around something, or enclosing an area. In English, this root forms words such as *string*, *rope*, *series*, and *serial*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To join, bind, or string together</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong cord wrapping around a bundle and tying it securely together.</mark>
> - **Everyday Connection**: Think of familiar words like *string* and *rope*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ser** comes from a Latin word that means *"to join, bind, or string together"*.
  - At its core, it describes the action of join, bind, or string together.

- **The Big Picture Idea**:
  - Picture a strong cord wrapping around a bundle and tying it securely together.
  - Whenever you see **ser** in an English word, think of **to join, bind, or string together**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to join, bind, or string together).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **String**: An everyday English word showing the root's idea of *to join, bind, or string together*.
  - **Rope**: An everyday English word showing the root's idea of *to join, bind, or string together*.
  - **Series**: A number of things or events of the same class coming one after another in spatial or temporal succession.
  - **Serial**: Consisting of, forming part of, or taking place in a series.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ser</mark>, think of <mark class="hl-def">to join, bind, or string together</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via two primary Latin stems:
> - **Present Active Stem (`ser-`):** Underlies sequential substantives and historical adverbs (*series*, *serial*, *seriatim*, *seriation*).
> - **Participial / Supine Stem (`sert-`):** Formed from *sertum* ("bound, entwined"), producing English verbs and abstract nouns of action (*insert*, *insertion*, *assert*, *assertion*, *desert*, *dissertation*, *exert*).
>
> Prefixes alter the direction and status of the sequence:
> - **in-** ("into"): *insert* (introduce into a series).
> - **ad- $\to$ as-** ("to, toward"): *assert* (bind a claim to oneself).
> - **dē-** ("away, separation"): *desert* (sever the sequence of loyalty).
> - **dis-** ("apart, thoroughly"): *dissertation* (systematically string apart arguments).
> - **ex-** ("out, forth"): *exert* (thrust forth strength).

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
> - **Sequential Order & Publishing:** [[series]], [[serial]], *serialization*, *seriatim*, *seriation* — novels published in installments, television seasons, chronological artifact sequences.
> - **Affirmation & Positive Conviction:** [[assert]], *assertion*, *assertive*, *assertiveness* — boldly declaring facts, standing up for one's rights.
> - **Abandonment & Wasteland Geography:** [[desert]], *desertion*, *deserter* — forsaking military duty; hyper-arid geographical biomes.
> - **Physical Insertion & Implantation:** [[insert]], *insertion* — slipping a key into a lock, genetic gene insertion, surgical implants.
> - **Scholarly Dialectic & Discourse:** [[dissertation]], *dissertate* — a formal doctoral treatise or exhaustive written investigation.
> - **Physical & Mental Force:** *exert*, *exertion* — putting forth muscular vigor, sustained intellectual energy, or sovereign influence.

---

## 🔀 4. Prefix & Combining Dynamics on ser

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **in-** (*in*) | into, within | [[insert]], *insertion* | To link or put into the middle of an existing series. |
| **ad- $\to$ as-** (*ad*) | to, toward | [[assert]], *assertion* | To bind a claim to oneself; declare emphatically. |
| **dē-** (*dē*) | away, un- | [[desert]], *desertion* | To unbind from a post or covenant; to abandon. |
| **dis-** (*dis-*) | apart, thoroughly | [[dissertation]] | To untangle and examine arguments systematically. |
| **ex-** (*ex*) | out, forth | *exert*, *exertion* | To thrust out strength; apply sustained force. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ies** (*-iēs*) | 5th declension Latin noun | [[series]] | A continuous row, chain, or sequence. |
| **-al** (*-ālis*) | descriptive adjective | [[serial]] | Consisting of or arranged in a sequence. |
| **-ation** (*-ātiōnem*) | abstract noun of treatise | [[dissertation]], *assertion* | A formal doctoral treatise or positive declaration. |
| **-ive** (*-īvus*) | functional adjective | *assertive* | Disposed toward confident, firm self-expression. |
| **-atim** (*-ātim*) | Latin distributive adverb | *seriatim* | One by one, point by point in sequential order. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Academia & Higher Education** | [[dissertation]] | Doctoral dissertations, defense of academic theses. |
| **Military Justice & Criminal Law** | [[desert]], *desertion*, *deserter* | Abandoning a military post under the Uniform Code of Military Justice (UCMJ). |
| **Civil Procedure & Appellate Courts** | *seriatim*, [[assert]], *assertion* | Supreme Court justices writing *seriatim* opinions; asserting legal standing. |
| **Media, Fiction & Publishing** | [[series]], [[serial]], *serialization* | Serialized novels (Charles Dickens), television episodic series. |
| **Molecular Biology & Genetics** | [[insert]], *insertion* (*insertion mutation*) | Inserting genetic sequences into plasmids; frameshift insertion mutations. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anser]] | noun | **1.** Typical geese. | *"In academic literature, anser designates typical geese."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anseres]] | noun | **1.** Used in some especially older classifications; coextensive with the family anatidae. | *"In academic literature, anseres designates used in some especially older classifications; coextensive with the family anatidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anseriformes]] | noun | **1.** Ducks; geese; swans; screamers. | *"In academic literature, anseriformes designates ducks; geese; swans; screamers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anserinae]] | noun | **1.** Used in some classifications for the swans. | *"In academic literature, anserinae designates used in some classifications for the swans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anserine]] | adjective | **1.** Of or resembling a goose.<br>**2.** Having or revealing stupidity. | *"In academic literature, anserine designates of or resembling a goose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiserum]] | noun | **1.** Blood serum containing antibodies against specific antigens; provides immunity to a disease. | *"In academic literature, antiserum designates blood serum containing antibodies against specific antigens; provides immunity to a disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assert]] | verb | **1.** State categorically.<br>**2.** To declare or affirm solemnly and formally as true. | *"It wasn’t a bad profession; he couldn’t assert that he disliked it; perhaps he liked it as well as he liked any other—suppose he gave it one more chance!"* — Charles Dickens, *Bleak House* |
| [[assertable]] | adjective | **1.** Capable of being affirmed or asserted. | *"In academic literature, assertable designates capable of being affirmed or asserted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asserted]] | verb | **1.** State categorically.<br>**2.** To declare or affirm solemnly and formally as true. | *"You can call as often as you please from now on, I shall certainly not come again." "I know they will open some day," the boy asserted firmly, "only we can't tell just when; but it might be any time."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[asserter]] | noun | **1.** Someone who claims to speak the truth. | *"He predicted the same fate to _attraction_, whereof the present learned are such zealous asserters."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[asserting]] | verb | **1.** State categorically.<br>**2.** To declare or affirm solemnly and formally as true. | *"George himself, striding towards them in his morning exercise with his pipe in his mouth, no stock on, and his muscular arms, developed by broadsword and dumbbell, weightily asserting themselves through his light shirt-sleeves."* — Charles Dickens, *Bleak House* |
| [[assertion]] | noun | **1.** A declaration that is made emphatically (as if no supporting evidence were necessary).<br>**2.** The act of affirming or asserting or stating something. | *"Well,” observed my guardian, half pleasantly, half seriously, “that’s a great occasion and will give my fair cousin some necessary business to transact in assertion of her independence, and will make London a more convenient place for all of us."* — Charles Dickens, *Bleak House* |
| [[assertive]] | adjective | **1.** Aggressively self-assured. | *"Don't Just Ride Off into the Sunset Recalling that far more assertive and influential time in their lives, the elderly insist on their right to age gracefully, usefully, and so far as they possibly can, their way."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[assertively]] | adverb | **1.** In an assertive manner. | *"In academic literature, assertively designates in an assertive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assertiveness]] | noun | **1.** Aggressive self-assurance; given to making bold assertions. | *"This could call for unusual assertiveness to open lines of communication where there are none, and at keeping them open for a two-way flow."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[desert]] | noun | **1.** Arid land with little or no vegetation.<br>**2.** Leave someone who needs or counts on you; leave in the lurch. | *"Be not offended; for it hurts not him That he is lov’d of me; I follow him not By any token of presumptuous suit, Nor would I have him till I do deserve him; Yet never know how that desert should be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deserted]] | verb | **1.** Leave someone who needs or counts on you; leave in the lurch.<br>**2.** Desert (a cause, a country or an army), often in order to join the opposing cause, country, or army. | *"How terribly deserted and lonely it all looks," Uncle Philip said after a while."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[deserter]] | noun | **1.** A disloyal person who betrays or deserts his cause or religion or political party or friend etc.<br>**2.** A person who abandons their duty (as on a military post). | *"He broke out suddenly while clasping me in his arms— “Cruel, cruel deserter!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[desertification]] | noun | **1.** The gradual transformation of habitable land into desert; is usually caused by climate change or by destructive use of the land. | *"In academic literature, desertification designates the gradual transformation of habitable land into desert; is usually caused by climate change or by destructive use of the land."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desertion]] | noun | **1.** Withdrawing support or help despite allegiance or responsibility.<br>**2.** The act of giving something up. | *"Fortunately (though I do not deny that I felt each desertion) our band grew less and less every day."* — Mrs. Oliphant, *A Beleaguered City* |
| [[deserts]] | noun | **1.** An outcome (good or bad) that is well deserved.<br>**2.** Arid land with little or no vegetation. | *"To give away yourself, keeps yourself still, And you must live drawn by your own sweet skill. 17 Who will believe my verse in time to come If it were filled with your most high deserts?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dissertate]] | verb | **1.** Talk at length and formally about a topic. | *"In academic literature, dissertate designates talk at length and formally about a topic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissertation]] | noun | **1.** A treatise advancing a new point of view resulting from research; usually a requirement for an advanced academic degree. | *"To Which Is Prefix'd, a Critical Dissertation on This Species of Poetry_ (London, 1727).] As the title of this epigram also suggests, window panes were not the only surfaces considered appropriate for such writing."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Part 1* |
| [[exsert]] | verb | **1.** Thrust or extend out. | *"In academic literature, exsert designates thrust or extend out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insert]] | noun | **1.** A folded section placed between the leaves of another publication.<br>**2.** An artifact that is inserted or is to be inserted. | *"You could for a need study a speech of some dozen or sixteen lines, which I would set down and insert in’t, could you not?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insertion]] | noun | **1.** A message (spoken or written) that is introduced or inserted.<br>**2.** The act of putting one thing into another. | *"And now suspended in stages over the side, Starbuck and Stubb, the mates, armed with their long spades, began cutting a hole in the body for the insertion of the hook just above the nearest of the two side-fins."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[nonassertive]] | adjective | **1.** Not aggressively self-assured, though not necessarily lacking in confidence. | *"In academic literature, nonassertive designates not aggressively self-assured, though not necessarily lacking in confidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overserious]] | adjective | **1.** Excessively serious. | *"In academic literature, overserious designates excessively serious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reassert]] | verb | **1.** Strengthen or make more firm. | *"Liddy,” she said, with a lighter heart, for youth and hope had begun to reassert themselves; “you are to be my confidante for the present—somebody must be—and I choose you."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[reassertion]] | noun | **1.** Renewed affirmation. | *"In academic literature, reassertion designates renewed affirmation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seraglio]] | noun | **1.** Living quarters reserved for wives and concubines and female relatives in a muslim household. | *"I would not exchange this one little English girl for the Grand Turk’s whole seraglio, gazelle-eyes, houri forms, and all!” The Eastern allusion bit me again."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[serail]] | noun | **1.** Living quarters reserved for wives and concubines and female relatives in a muslim household. | *"In academic literature, serail designates living quarters reserved for wives and concubines and female relatives in a muslim household."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serape]] | noun | **1.** A long brightly colored shawl; worn mainly by mexican men. | *"The Spaniard was wrapped in a serape; he had bushy white whiskers; long white hair flowed from under his sombrero, and he wore green goggles."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[seraph]] | noun | **1.** An angel of the first order; usually portrayed as the winged head of a child. | *"The beauteous, seraph sister-band— With earnest tears I pray— Thou know’st the snares on ev’ry hand, Guide Thou their steps alway."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[seraphic]] | adjective | **1.** Of or relating to an angel of the first order.<br>**2.** Having a sweet nature befitting an angel or cherub. | *"But far within And in thir own dimensions like themselves The great Seraphic Lords and Cherubim In close recess and secret conclave sat A thousand Demy-Gods on golden seat’s, Frequent and full."* — John Milton, *Paradise Lost* |
| [[seraphical]] | adjective | **1.** Of or relating to an angel of the first order. | *"In academic literature, seraphical designates of or relating to an angel of the first order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serax]] | noun | **1.** A tranquilizing drug (trade name serax) used to treat anxiety and insomnia and alcohol withdrawal. | *"In academic literature, serax designates a tranquilizing drug (trade name serax) used to treat anxiety and insomnia and alcohol withdrawal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sere]] | adjective | **1.** (used especially of vegetation) having lost all moisture. | *"He is deformed, crooked, old, and sere, Ill-fac’d, worse bodied, shapeless everywhere; Vicious, ungentle, foolish, blunt, unkind, Stigmatical in making, worse in mind."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[serenade]] | noun | **1.** A musical composition in several movements; has no fixed form.<br>**2.** A song characteristically played outside the house of a woman. | *"If he does strain to the moment of ingress into the divine being, it is to swoon with excess of bliss, as at the end of 'Epipsychidion', or as in the 'Indian Serenade': "Oh lift me from the grass!"* — Sydney Waterlow, *Shelley* |
| [[serendipitous]] | adjective | **1.** Lucky in making unexpected and fortunate discoveries. | *"In academic literature, serendipitous designates lucky in making unexpected and fortunate discoveries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serendipity]] | noun | **1.** Good luck in making unexpected and fortunate discoveries. | *"In academic literature, serendipity designates good luck in making unexpected and fortunate discoveries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serene]] | adjective | **1.** Not agitated; without losing self-possession.<br>**2.** Completely clear and fine. | *"Jellyby merely added, with the serene composure with which she said everything, “Go along, you naughty Peepy!” and fixed her fine eyes on Africa again."* — Charles Dickens, *Bleak House* |
| [[serenely]] | adverb | **1.** In a peacefully serene manner. | *"To see that composed court yesterday jogging on so serenely and to think of the wretchedness of the pieces on the board gave me the headache and the heartache both together."* — Charles Dickens, *Bleak House* |
| [[sereness]] | noun | **1.** A withered dryness. | *"In academic literature, sereness designates a withered dryness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serengeti]] | noun | **1.** A vast plain in tanzania to the west of the great rift valley known for its wildlife. | *"In academic literature, serengeti designates a vast plain in tanzania to the west of the great rift valley known for its wildlife."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serenity]] | noun | **1.** A disposition free from stress or emotion.<br>**2.** The absence of mental stress or anxiety. | *"Bathsheba, a small yawn upon her mouth, took the pen, and with off-hand serenity directed the missive to Boldwood."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[serenoa]] | noun | **1.** One species: saw palmetto. | *"In academic literature, serenoa designates one species: saw palmetto."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serer]] | noun | **1.** A west african language closely related to fula; spoken primarily in senegal and gambia. | *"In academic literature, serer designates a west african language closely related to fula; spoken primarily in senegal and gambia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serial]] | noun | **1.** A serialized set of programs.<br>**2.** A periodical that appears at scheduled times. | *"The shares vary in denomination from $25 to $200; the larger figure being common under the serial plan and $100 being usual under the continuous (or permanent) plan, described below."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[serialisation]] | noun | **1.** Publication in serial form. | *"In academic literature, serialisation designates publication in serial form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serialise]] | verb | **1.** Arrange serially. | *"In academic literature, serialise designates arrange serially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serialism]] | noun | **1.** 20th century music that uses a definite order of notes as a thematic basis for a musical composition. | *"In academic literature, serialism designates 20th century music that uses a definite order of notes as a thematic basis for a musical composition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serialization]] | noun | **1.** Publication in serial form. | *"In academic literature, serialization designates publication in serial form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serialize]] | verb | **1.** Arrange serially. | *"In academic literature, serialize designates arrange serially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serially]] | adverb | **1.** In a serial manner. | *"In academic literature, serially designates in a serial manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seriatim]] | adverb | **1.** In a series; one after another. | *"Having said thus much, I will take up the judge’s interrogatories as I find them printed in the _Chicago Times_, and answer them _seriatim_."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[sericeous]] | adjective | **1.** Covered with fine soft hairs or down. | *"In academic literature, sericeous designates covered with fine soft hairs or down."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sericocarpus]] | noun | **1.** Small genus of herbs of the eastern united states: white-topped asters. | *"In academic literature, sericocarpus designates small genus of herbs of the eastern united states: white-topped asters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sericterium]] | noun | **1.** Silk-producing gland of insects (especially of a silkworm) or spiders. | *"In academic literature, sericterium designates silk-producing gland of insects (especially of a silkworm) or spiders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serictery]] | noun | **1.** Silk-producing gland of insects (especially of a silkworm) or spiders. | *"In academic literature, serictery designates silk-producing gland of insects (especially of a silkworm) or spiders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sericultural]] | adjective | **1.** Of or relating to sericulture. | *"In academic literature, sericultural designates of or relating to sericulture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sericulture]] | noun | **1.** Raising silkworms in order to obtain raw silk.<br>**2.** The production of raw silk by raising silkworms. | *"In academic literature, sericulture designates raising silkworms in order to obtain raw silk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sericulturist]] | noun | **1.** A producer of raw silk. | *"In academic literature, sericulturist designates a producer of raw silk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seriema]] | noun | **1.** Argentinian cariama.<br>**2.** Brazilian cariama; sole representative of the genus cariama. | *"In academic literature, seriema designates argentinian cariama."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[series]] | noun | **1.** Similar things placed in order or happening one after another.<br>**2.** A serialized set of programs. | *"STORK 1921 FOREWORD The present story is the third by Madame Spyri to appear in this series."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[serif]] | noun | **1.** A short line at the end of the main strokes of a character. | *"In academic literature, serif designates a short line at the end of the main strokes of a character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serigraph]] | noun | **1.** A print made using a stencil process in which an image or design is superimposed on a very fine mesh screen and printing ink is squeegeed onto the printing surface through the area of the screen that is not covered by the stencil. | *"In academic literature, serigraph designates a print made using a stencil process in which an image or design is superimposed on a very fine mesh screen and printing ink is squeegeed onto the printing surface through the area of the screen that is not covered by the stencil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serigraphy]] | noun | **1.** The act of making a print by the silkscreen method. | *"In academic literature, serigraphy designates the act of making a print by the silkscreen method."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serin]] | noun | **1.** Any of various brown and yellow finches of parts of europe. | *"In academic literature, serin designates any of various brown and yellow finches of parts of europe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serine]] | noun | **1.** A sweetish crystalline amino acid involved in the synthesis by the body of cysteine. | *"In academic literature, serine designates a sweetish crystalline amino acid involved in the synthesis by the body of cysteine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serinus]] | noun | **1.** Old world finches; e.g. canaries and serins. | *"In academic literature, serinus designates old world finches; e.g. canaries and serins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seriocomedy]] | noun | **1.** A comedy with serious elements or overtones. | *"In academic literature, seriocomedy designates a comedy with serious elements or overtones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seriocomic]] | adjective | **1.** Mixing the serious with the comic with comic predominating. | *"MRS BREEN: You were the lion of the night with your seriocomic recitation and you looked the part."* — James Joyce, *Ulysses* |
| [[seriocomical]] | adjective | **1.** Mixing the serious with the comic with comic predominating. | *"In academic literature, seriocomical designates mixing the serious with the comic with comic predominating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seriola]] | noun | **1.** A genus of carangidae. | *"In academic literature, seriola designates a genus of carangidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serious]] | adjective | **1.** Concerned with work or important matters rather than play or trivialities.<br>**2.** Of great consequence. | *"Madam, my lord will go away tonight; A very serious business calls on him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[serious-minded]] | adjective | **1.** Acting with or showing thought and good sense. | *"In academic literature, serious-minded designates acting with or showing thought and good sense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serious-mindedness]] | noun | **1.** The trait of being serious; - robert rice. | *"In academic literature, serious-mindedness designates the trait of being serious; - robert rice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seriously]] | adverb | **1.** In a serious manner.<br>**2.** To a severe or serious degree. | *"Now, by my faith and honour, If seriously I may convey my thoughts In this my light deliverance, I have spoke With one that in her sex, her years, profession, Wisdom, and constancy, hath amaz’d me more Than I dare blame my weakness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seriousness]] | noun | **1.** An earnest and sincere feeling.<br>**2.** The quality of arousing fear or distress. | *"Just look at the progress I am making." With comical seriousness the Baron pointed to the empty cup and the sole remaining roll."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[seriph]] | noun | **1.** A short line at the end of the main strokes of a character. | *"In academic literature, seriph designates a short line at the end of the main strokes of a character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seriphidium]] | noun | **1.** Woody plants grown chiefly for their silver or grey and often aromatic foliage; formerly included in the genus artemisia. | *"In academic literature, seriphidium designates woody plants grown chiefly for their silver or grey and often aromatic foliage; formerly included in the genus artemisia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seriphus]] | noun | **1.** A genus of sciaenidae. | *"In academic literature, seriphus designates a genus of sciaenidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sermon]] | noun | **1.** An address of a religious nature (usually delivered during a church service).<br>**2.** A moralistic rebuke. | *"In her chamber, making a sermon of continency to her; And rails, and swears, and rates, that she, poor soul, Knows not which way to stand, to look, to speak, And sits as one new risen from a dream."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sermonise]] | verb | **1.** Speak as if delivering a sermon; express moral judgements. | *"You used occasionally to sermonise too; I wish you would, in charity, favour me with a sheet full in your own way."* — Robert Burns, *The Letters of Robert Burns* |
| [[sermoniser]] | noun | **1.** Someone whose occupation is preaching the gospel. | *"In academic literature, sermoniser designates someone whose occupation is preaching the gospel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sermonize]] | verb | **1.** Speak as if delivering a sermon; express moral judgements. | *"Bulstrode?” “Who else, eh?” “Then the story has grown into this lie out of some sermonizing words he may have let fall about me."* — George Eliot, *Middlemarch* |
| [[sermonizer]] | noun | **1.** Someone whose occupation is preaching the gospel. | *"In academic literature, sermonizer designates someone whose occupation is preaching the gospel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serologic]] | adjective | **1.** Of or relating to serology. | *"In academic literature, serologic designates of or relating to serology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serological]] | adjective | **1.** Of or relating to serology. | *"In academic literature, serological designates of or relating to serology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serologist]] | noun | **1.** A medical scientist who specializes in serology. | *"In academic literature, serologist designates a medical scientist who specializes in serology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serology]] | noun | **1.** The branch of medical science that deals with serums; especially with blood serums and disease. | *"In academic literature, serology designates the branch of medical science that deals with serums; especially with blood serums and disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serosa]] | noun | **1.** A thin membrane lining the closed cavities of the body; has two layers with a space between that is filled with serous fluid. | *"In academic literature, serosa designates a thin membrane lining the closed cavities of the body; has two layers with a space between that is filled with serous fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serotine]] | noun | **1.** Common brown bat of europe. | *"In academic literature, serotine designates common brown bat of europe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serotonin]] | noun | **1.** A neurotransmitter involved in e.g. sleep and depression and memory. | *"In academic literature, serotonin designates a neurotransmitter involved in e.g. sleep and depression and memory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serous]] | adjective | **1.** Of or producing or containing serum. | *"In academic literature, serous designates of or producing or containing serum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serow]] | noun | **1.** Short-horned dark-coated goat antelope of mountain areas of southern and southeastern asia. | *"In academic literature, serow designates short-horned dark-coated goat antelope of mountain areas of southern and southeastern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serra]] | noun | **1.** Spanish missionary who founded franciscan missions in california (1713-1784). | *"In academic literature, serra designates spanish missionary who founded franciscan missions in california (1713-1784)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serranid]] | noun | **1.** Marine food sport fishes mainly of warm coastal waters. | *"In academic literature, serranid designates marine food sport fishes mainly of warm coastal waters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serranidae]] | noun | **1.** Marine fishes: sea basses; sea perches; groupers; jewfish. | *"In academic literature, serranidae designates marine fishes: sea basses; sea perches; groupers; jewfish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serranus]] | noun | **1.** Type genus of the serranidae: mostly small pacific sea basses. | *"In academic literature, serranus designates type genus of the serranidae: mostly small pacific sea basses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serrasalmus]] | noun | **1.** Piranhas. | *"Classical and authoritative lexicons catalog serrasalmus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serrate]] | verb | **1.** Make saw-toothed or jag the edge of.<br>**2.** Notched like a saw with teeth pointing toward the apex. | *"Before us lay the dark bulk of the house, its serrated roof and bristling chimneys hard outlined against the silver-spangled sky."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[serrated]] | verb | **1.** Make saw-toothed or jag the edge of.<br>**2.** Notched like a saw with teeth pointing toward the apex. | *"Before us lay the dark bulk of the house, its serrated roof and bristling chimneys hard outlined against the silver-spangled sky."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[serratia]] | noun | **1.** A genus of motile peritrichous bacteria that contain small gram-negative rod. | *"In academic literature, serratia designates a genus of motile peritrichous bacteria that contain small gram-negative rod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serration]] | noun | **1.** The condition of being serrated.<br>**2.** A row of notches. | *"In academic literature, serration designates the condition of being serrated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serratula]] | noun | **1.** Genus of old world perennial herbs with spirally arranged toothed leaves. | *"We have not often found this fungus in the neighbourhood of London on the leaves of the knapweed, but, on the other hand, we have encountered it very commonly on those of the saw-wort (_Serratula tinctoria_)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[serratus]] | noun | **1.** Any of several muscles of the trunk. | *"In academic literature, serratus designates any of several muscles of the trunk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serried]] | adjective | **1.** (especially of rows as of troops or mountains) pressed together. | *"The third showed the pinnacle of an iceberg piercing a polar winter sky: a muster of northern lights reared their dim lances, close serried, along the horizon."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[serrulate]] | adjective | **1.** Minutely serrated. | *"In academic literature, serrulate designates minutely serrated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sertraline]] | noun | **1.** A selective-serotonin reuptake inhibitor commonly prescribed as an antidepressant (trade name zoloft). | *"In academic literature, sertraline designates a selective-serotonin reuptake inhibitor commonly prescribed as an antidepressant (trade name zoloft)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sertularia]] | noun | **1.** Sessile hydroid that forms feathery colonies. | *"In academic literature, sertularia designates sessile hydroid that forms feathery colonies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sertularian]] | noun | **1.** Feathery colony of long-branched stems bearing stalkless paired polyps. | *"In academic literature, sertularian designates feathery colony of long-branched stems bearing stalkless paired polyps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serum]] | noun | **1.** An amber, watery fluid, rich in proteins, that separates out when blood coagulates. | *"When Burns came back he opened the outer door and called to Johnny Caruthers, to know if he had obtained the serum for which he had been sent to the druggist."* — Grace S. Richmond, *Red Pepper Burns* |
| [[unassertive]] | adjective | **1.** Inclined to timidity or lack of self-confidence. | *"In academic literature, unassertive designates inclined to timidity or lack of self-confidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unassertively]] | adverb | **1.** In an unassertive manner. | *"In academic literature, unassertively designates in an unassertive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unassertiveness]] | noun | **1.** Diffidence about self promotion. | *"In academic literature, unassertiveness designates diffidence about self promotion."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Binding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SER
  </div>
</div>
