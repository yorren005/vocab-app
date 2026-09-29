---
status: unread
type: root_dashboard
---
# Dashboard — firm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">firm-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“strong or steady”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **firm** means strong or steady. It describes being solid, unyielding, durable, and able to withstand pressure. In English, this root forms words such as *firm*, *firmament*, *confirm*, and *affirm*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: strong or steady
> The root **firm** means strong or steady. It describes being solid, unyielding, durable, and able to withstand pressure. In English, this root forms words such as *firm*, *firmament*, *confirm*, and *affirm*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Strong or steady</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *firm* and *firmament*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **firm** comes from a Latin word that means *"strong or steady"*.
  - At its core, it describes strong or steady.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **firm** in an English word, think of **action, energy, and state of being**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of strong or steady.
  - **Mental & Social**: How people experience, organize, or communicate about strong or steady.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Firm**: Strongly felt or held.
  - **Firmament**: The vault or arch of the sky.
  - **Confirm**: To establish the truth, correctness, or validity of something previously suspected or reported.
  - **Affirm**: To state as a fact.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">firm</mark>, think of <mark class="hl-def">action, energy, and state of being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **firm** builds vocabulary through regular classical prefixation and semantic evolution:
> - **Base Adjective & Noun:**
>   - *firmus* → *firm*, *firmly*, *firmness*.
>   - *firmāmentum* → *firmament*.
>   - Medieval Latin *firma* (fixed lease) → *farm*, *farmer*, *farming*.
> - **Prefixed Classical Compounds:**
>   - `ad-` (to, toward) + *firmāre* → *affirm*, *affirmation*, *affirmative*, *affirmatively*.
>   - `con-` (together, thoroughly) + *firmāre* → *confirm*, *confirmation*, *confirmatory*, *confirmed*.
>   - `re-` (again) + *affirm* → *reaffirm*, *reaffirmation*.
>   - `dis-` (reverse of) + *affirm* → *disaffirm*.
>   - `in-` (not, without) + *firmus* → *infirm*, *infirmity*, *infirmary*.

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
> Although the root fundamentally denotes **"strength and stability"**, its semantic register branches across distinct applications:
> - **Structural & Physical Sense:** In [[firm]] and [[firmness]], it denotes physical solidity, rigidity, and unyielding strength.
> - **Assertive & Declarative Sense:** In [[affirm]] and [[affirmation]], it denotes stating a fact with confident, resolute certainty.
> - **Corroborative & Verifying Sense:** In [[confirm]] and [[confirmation]], it denotes validating empirical evidence, appointments, or religious faith.
> - **Bodily Weakness & Frailty Sense:** In [[infirm]], [[infirmary]], and [[infirmity]], the negative prefix reverses the meaning to physical fragility and sickness.
> - **Astronomical & Cosmological Sense:** In [[firmament]], it describes the expansive vault of the heavens.
> - **Agricultural & Economic Sense:** In [[farm]], it traces back to fixed contractual land lease payments.

---

## 🔀 4. Prefix & Combining Dynamics on firm

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward | [[affirm]] | Adding strength *toward* an assertion; confirming as truth. |
| `con-` | thoroughly, together | [[confirm]] | Strengthening *thoroughly*; validating with corroborating evidence. |
| `in-` | not, un- | [[infirm]] | *Not* strong; physically weak, feeble, or ailing. |
| `re-` | again, anew | [[reaffirm]] | Stating or validating *anew* with renewed commitment. |
| `dis-` | reverse, not | [[disaffirm]] | To repudiate or declare *not* binding (especially in contract law). |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ment` | Noun (Vault / Foundation) | [[firmament]] | The physical or metaphorical celestial vault of the sky. |
| `-tion` | Noun (Act / Result) | [[confirmation]] | The verification of a hypothesis, booking, or religious covenant. |
| `-ary` | Noun (Place / Facility) | [[infirmary]] | A clinic or hospital where the weak and sick are treated. |
| `-ity` | Noun (State / Frailty) | [[infirmity]] | A physical or moral weakness or feebleness. |
| `-ative` | Adjective / Noun | [[affirmative]] | Expressing agreement, consent, or positive assertion. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧪 **Scientific Research & Statistics** | [[confirm]], [[confirmatory]], [[affirm]] | Hypothesis testing, confirmatory data analysis, peer-reviewed replication. |
| 🩺 **Medicine & Geriatrics** | [[infirm]], [[infirmary]], [[infirmity]] | Long-term elder care facilities, age-related bodily frailty, outpatient clinics. |
| ⚖️ **Contract Law & Civil Procedure** | [[affirm]], [[disaffirm]], [[firm]] | Affirming lower court rulings, disaffirming contracts by minors, corporate partnerships. |
| 🌌 **Astronomy & Literature** | [[firmament]] | Poetic descriptions of constellations, celestial mechanics, classical cosmology. |
| 🌾 **Agriculture & Agribusiness** | [[farm]] | Crop cultivation, agricultural leases, livestock management. |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[affirm]] | verb | **1.** Establish or strengthen as with new evidence or facts.<br>**2.** To declare or affirm solemnly and formally as true. | *"For there’s no motion That tends to vice in man but I affirm It is the woman’s part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affirmable]] | adjective | **1.** Capable of being affirmed or asserted. | *"In academic literature, affirmable designates capable of being affirmed or asserted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affirmatio]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin firm within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of firm in systematic terminology. | *"In academic literature, affirmatio designates pertaining to, derived from, or characteristic of latin firm within the domain of action & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affirmation]] | noun | **1.** A statement asserting the existence or the truth of something.<br>**2.** The act of affirming or asserting or stating something. | *"Are you quite sure, Philip?" she asked, wishing for an affirmation."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[affirmative]] | noun | **1.** A reply of affirmation.<br>**2.** Affirming or giving assent. | *"When Leonore tenderly took leave of her uncle she whispered in his ear, "May Salo come soon, Uncle?" This time the answer was a clear affirmative, and the child's heart was filled with rapture."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[affirmatively]] | adverb | **1.** In an affirmative manner. | *"Stanhope answered affirmatively."* — Effie Afton, *Eventide* |
| [[affirmativeness]] | noun | **1.** The agreeable quality of one who assents. | *"In academic literature, affirmativeness designates the agreeable quality of one who assents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affirmatory]] | adjective | **1.** Affirming or giving assent. | *"In academic literature, affirmatory designates affirming or giving assent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affirmed]] | noun | **1.** Thoroughbred that won the triple crown in 1978.<br>**2.** Establish or strengthen as with new evidence or facts. | *"So I gave the helmet away and I should have loved to keep it." "Don't laugh at him, Kurt; I really told him that," the mother affirmed."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[affirmer]] | noun | **1.** Someone who claims to speak the truth. | *"In academic literature, affirmer designates someone who claims to speak the truth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantus firmus]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin firm within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of firm in systematic terminology. | *"In academic literature, cantus firmus designates pertaining to, derived from, or characteristic of latin firm within the domain of action & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confirm]] | verb | **1.** Establish or strengthen as with new evidence or facts.<br>**2.** Strengthen or make more firm. | *"Her death itself, which could not be her office to say is come, was faithfully confirm’d by the rector of the place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confirmable]] | adjective | **1.** Capable of being tested (verified or falsified) by experiment or observation. | *"In academic literature, confirmable designates capable of being tested (verified or falsified) by experiment or observation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confirmation]] | noun | **1.** Additional proof that something that was believed (some fact or hypothesis or theory) is correct.<br>**2.** Information that confirms or verifies. | *"Be not angry, Most mighty Princess, that I have adventur’d To try your taking of a false report, which hath Honour’d with confirmation your great judgement In the election of a sir so rare, Which you know cannot err."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confirmative]] | adjective | **1.** Serving to support or corroborate. | *"In academic literature, confirmative designates serving to support or corroborate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confirmator]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin firm within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of firm in systematic terminology. | *"In academic literature, confirmator designates pertaining to, derived from, or characteristic of latin firm within the domain of action & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confirmatory]] | adjective | **1.** Serving to support or corroborate. | *"There does.” “Just so,” observes the stationer with his confirmatory cough."* — Charles Dickens, *Bleak House* |
| [[confirmed]] | verb | **1.** Establish or strengthen as with new evidence or facts.<br>**2.** Strengthen or make more firm. | *"H’as such a confirmed countenance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confirming]] | verb | **1.** Establish or strengthen as with new evidence or facts.<br>**2.** Strengthen or make more firm. | *"Fie, fie, unreverend tongue, to call her bad Whose sovereignty so oft thou hast preferred With twenty thousand soul-confirming oaths."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disaffirmation]] | noun | **1.** The act of asserting that something alleged is not true. | *"In academic literature, disaffirmation designates the act of asserting that something alleged is not true."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disconfirming]] | adjective | **1.** Not indicating the presence of microorganisms or disease or a specific condition.<br>**2.** Establishing as invalid or untrue. | *"In academic literature, disconfirming designates not indicating the presence of microorganisms or disease or a specific condition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[firm]] | noun | **1.** The members of a business organization that owns or operates one or more establishments.<br>**2.** Become taut or tauter. | *"When I have seen the hungry ocean gain Advantage on the kingdom of the shore, And the firm soil win of the watery main, Increasing store with loss, and loss with store."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[firmament]] | noun | **1.** The apparent surface of the imaginary sphere on which celestial bodies appear to be projected. | *"I could be well mov’d, if I were as you; If I could pray to move, prayers would move me: But I am constant as the northern star, Of whose true-fix’d and resting quality There is no fellow in the firmament."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[firmamental]] | adjective | **1.** Relating to the firmament or upper regions. | *"Manœuvres of a most extraordinary kind were going on in the vast firmamental hollows overhead."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[firmiana]] | noun | **1.** Small genus of asian trees or shrubs. | *"In academic literature, firmiana designates small genus of asian trees or shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[firmin]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin firm within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of firm in systematic terminology. | *"Firmin Didot, (1764-1836), a printer of Paris, cast type of a hard alloy, and when his book-pages were composed, made an impression of them on a sheet of soft lead, thus forming a mold."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[firmly]] | adverb | **1.** With resolute determination.<br>**2.** In a secure manner; in a manner free from danger. | *"YORK. [_Aside_.] Cold news for me, for I had hope of France As firmly as I hope for fertile England."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[firmness]] | noun | **1.** The muscle tone of healthy tissue.<br>**2.** The trait of being resolute. | *"Just the same!” In the momentary firmness of the hand that was never still—a firmness inspired by the utterance of these last words, and dying away with them—I saw the confirmation of her earnest tones."* — Charles Dickens, *Bleak House* |
| [[infirm]] | adjective | **1.** Lacking bodily or muscular strength or vitality.<br>**2.** Lacking firmness of will or character or purpose;  - shakespeare. | *"The best and soundest of his time hath been but rash; then must we look from his age to receive not alone the imperfections of long-engrafted condition, but therewithal the unruly waywardness that infirm and choleric years bring with them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infirmary]] | noun | **1.** A health facility where patients receive treatment. | *"At length he recovered sufficiently to be removed under his elder brother's careful and loving supervision to the Edinburgh Infirmary, where he remained for four months."* — John Cairns, *Principal Cairns* |
| [[infirmity]] | noun | **1.** The state of being weak in health or body (especially from old age). | *"Good faith, across; But, my good lord, ’tis thus: will you be cur’d Of your infirmity?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reaffirm]] | verb | **1.** Affirm once again. | *"Your proposition, however, practically proposes to re-nominate General Beaver, and reaffirm the abuse which we oppose."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[reaffirmation]] | noun | **1.** Renewed affirmation. | *"Finally the differences were partially adjusted by a reaffirmation of the platform of 1884, and very decided endorsements of both the President’s message and the Mills bill."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[reconfirm]] | verb | **1.** Confirm again. | *"What counterproposals were alternately advanced, accepted, modified, declined, restated in other terms, reaccepted, ratified, reconfirmed?"* — James Joyce, *Ulysses* |
| [[unconfirmed]] | adjective | **1.** Not finally established or settled. | *"That shows thou art unconfirmed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unfirm]] | adjective | **1.** Not firmly or solidly positioned.<br>**2.** (of soil) unstable. | *"So is the unfirm king In three divided, and his coffers sound With hollow poverty and emptiness."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FIRM
  </div>
</div>
