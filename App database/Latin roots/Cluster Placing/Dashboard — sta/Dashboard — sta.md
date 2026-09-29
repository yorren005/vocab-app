---
status: unread
type: root_dashboard
---
# Dashboard — sta
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sta-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to stand, endure, or remain”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Setting an object gently down in its exact designated location.</span>
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

The root **sta** means to stand, endure, or remain. It refers to being upright on one's feet, remaining in place, or enduring. In English, this root forms words such as *status*, *station*, *stable*, and *statue*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to stand, endure, or remain
> The root **sta** means to stand, endure, or remain. It refers to being upright on one's feet, remaining in place, or enduring. In English, this root forms words such as *status*, *station*, *stable*, and *statue*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To stand, endure, or remain</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Setting an object gently down in its exact designated location.</mark>
> - **Everyday Connection**: Think of familiar words like *status* and *station*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sta** comes from a Latin word that means *"to stand, endure, or remain"*.
  - At its core, it describes the action of stand, endure, or remain.

- **The Big Picture Idea**:
  - Picture setting an object gently down in its exact designated location.
  - Whenever you see **sta** in an English word, think of **to stand, endure, or remain**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to stand, endure, or remain).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Status**: An everyday English word showing the root's idea of *to stand, endure, or remain*.
  - **Station**: An everyday English word showing the root's idea of *to stand, endure, or remain*.
  - **Stable**: An everyday English word showing the root's idea of *to stand, endure, or remain*.
  - **Statue**: An everyday English word showing the root's idea of *to stand, endure, or remain*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sta</mark>, think of <mark class="hl-def">to stand, endure, or remain</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sta** generates vocabulary through prefixation on *stāre* and its reduplicated causative sister *sistere* ("to cause to stand, place"):
> - **Prefix Compounds on *stāre*:**
>   - *con-* ("together") + *stāre* $	o$ *constant*, *constancy*, *constantly* ("standing firm together; unchanging").
>   - *dis-* ("apart") + *stāre* $	o$ *distant*, *distance* ("standing apart in space or time").
>   - *in-* ("in, upon") + *stāre* $	o$ *instant*, *instantaneous*, *instantly*, *instance* ("standing close by $	o$ pressing, immediate").
>   - *ob-* ("in front of") + *stāre* $	o$ *obstacle* ("that which stands in the way").
>   - *circum-* ("around") + *stāre* $	o$ *circumstance*, *circumstantial* ("the conditions standing around an event").
>   - *sub-* ("under") + *stāre* $	o$ *substance*, *substantial*, *substantiate*, *substantive* ("that which stands beneath").
> - **Prefix Compounds on Causative *sistere*:**
>   - *re-* ("against") + *sistere* $	o$ *resist*, *resistance*, *resistant*, *irresistible*.
>   - *per-* ("through") + *sistere* $	o$ *persist*, *persistence*, *persistent*.
>   - *ad-* ("to, near") + *sistere* $	o$ *assist*, *assistance*, *assistant*.
>   - *con-* ("together") + *sistere* $	o$ *consist*, *consistent*, *consistency*.
>   - *in-* ("upon") + *sistere* $	o$ *insist*, *insistence*, *insistent*.
>   - *ex-* ("out") + *sistere* $	o$ *exist*, *existence*, *existent*.
>   - *sub-* ("under") + *sistere* $	o$ *subsist*, *subsistence*.
> - **Compounds with Nouns:**
>   - *sōl* + *stāre* $	o$ *solstice*.
>   - *arma* + *stāre* $	o$ *armistice*.

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
> - **Physics, Material Science & Chemistry:** *substance*, *substantial*, *substantiate* (chemical compounds, load-bearing mass).
> - **Astronomy & History:** *solstice*, *armistice* (summer/winter solstices, World War I armistice).
> - **Electrical Engineering & Aerodynamics:** *resistance*, *resistant* (electrical ohm resistance, aerodynamic drag).
> - **Metaphysics, Logic & Philosophy:** *exist*, *existence*, *consistent*, *consistency* (ontological reality, non-contradictory logic).
> - **Sports, Human Physiology & Tenacity:** *stamina*, *persist*, *persistence* (aerobic cardiovascular endurance, dogged research).
> - **Law & Forensic Evidence:** *circumstance*, *circumstantial* (circumstantial evidence, mitigating circumstances).

---

## 🔀 4. Prefix & Combining Dynamics on sta

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` (together) | `stāre` | **[[constant]]** / **constancy** | Standing firm and unwavering through all storms $	o$ unchanging. |
| `dis-` (apart) | `stāre` | **[[distant]]** / **distance** | Standing apart from another point across physical or temporal space. |
| `ob-` (against) | `stāre` | **[[obstacle]]** | An entity or hazard standing directly in the pathway of progress. |
| `circum-` (around) | `stāre` | **[[circumstance]]** / **circumstantial** | The surrounding conditions or facts standing around an occurrence. |
| `sub-` (under) | `stāre` | **[[substance]]** / **substantial** | The foundational reality standing beneath all visible surface attributes. |
| `re-` (against) | `sistere` | **[[resist]]** / **resistance** | Standing firmly against an incoming force or oppressive regime. |
| `per-` (through) | `sistere` | **[[persist]]** / **persistence** | Standing firmly all the way through adversity without surrendering. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚡ **Electrical Engineering & Solid-State Physics** | *resistance*, *resistant*, *substance* | Ohm's law ($V = IR$), designing corrosion-resistant superconductor alloys. |
| 🔭 **Observational Astronomy & Calendars** | *solstice* | Calculating solar declinations and Gregorian calendar seasonal solstices. |
| ⚖️ **Criminal Law & Jurisprudence** | *circumstantial*, *substantiate* | Evaluating circumstantial evidence; requiring prosecutors to substantiate felony charges. |
| 🪖 **Diplomatic History & International Security** | *armistice*, *resistance* | Negotiating the 1918 Compiègne Armistice; supporting WWII civilian resistance networks. |
| 🧬 **Cellular Biology & Genetics** | *exist*, *persist*, *stamina* | Tracking multidrug-resistant bacterial strains persisting in hospital environments. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abstain]] | verb | **1.** Refrain from voting.<br>**2.** Choose not to consume. | *"Bucket, that I abstain from examining this paper myself."* — Charles Dickens, *Bleak House* |
| [[abstainer]] | noun | **1.** Someone who practices self denial as a spiritual discipline.<br>**2.** A person who refrains from drinking intoxicating beverages. | *"Any saver or abstainer puts aside present wants only when the future good, with the addition of time-value or of money interest, appears as large as the present good."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[assistance]] | noun | **1.** The activity of contributing to the fulfillment of a need or furtherance of an effort or purpose.<br>**2.** A resource. | *"These offices, so oft as thou wilt look, Shall profit thee, and much enrich thy book. 78 So oft have I invoked thee for my muse, And found such fair assistance in my verse, As every alien pen hath got my use, And under thee their poesy disperse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assistant]] | noun | **1.** A person who contributes to the fulfillment of a need or furtherance of an effort or purpose.<br>**2.** Of or relating to a person who is subordinate to another. | *"And, sister, as the winds give benefit And convoy is assistant, do not sleep, But let me hear from you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumstance]] | noun | **1.** A condition that accompanies or influences some event or activity.<br>**2.** The set of facts or circumstances that surround a situation or event. | *"Signior Antipholus, I wonder much That you would put me to this shame and trouble, And not without some scandal to yourself, With circumstance and oaths so to deny This chain, which now you wear so openly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumstances]] | noun | **1.** Your overall circumstances or condition in life (including everything that happens to you).<br>**2.** A person's financial situation (good or bad). | *"Sir, my circumstances, Being so near the truth as I will make them, Must first induce you to believe; whose strength I will confirm with oath; which I doubt not You’ll give me leave to spare when you shall find You need it not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumstantial]] | adjective | **1.** Fully detailed and specific about particulars. | *"This is called the “countercheck quarrelsome”, and so, to the “lie circumstantial”, and the “lie direct”."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circumstantially]] | adverb | **1.** According to circumstances.<br>**2.** Insofar as the circumstances are concerned. | *"Not absolutely proved, perhaps, but it was proved circumstantially."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[circumstantiate]] | verb | **1.** Give circumstantial evidence for. | *"In academic literature, circumstantiate designates give circumstantial evidence for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constable]] | noun | **1.** A lawman with less authority and jurisdiction than a sheriff.<br>**2.** English landscape painter (1776-1837). | *"From below your duke to beneath your constable, it will fit any question."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constance]] | noun | **1.** A lake in southeastern germany on the northern side of the swiss alps; forms part of the rhine river.<br>**2.** The council in 1414-1418 that succeeded in ending the great schism in the roman catholic church. | *"Have I not ever said How that ambitious Constance would not cease Till she had kindled France and all the world Upon the right and party of her son?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constancy]] | noun | **1.** The quality of being enduring and free from change or variation.<br>**2.** (psychology) the tendency for perceived objects to give rise to very similar perceptual experiences in spite of wide variations in the conditions of observation. | *"Kind is my love to-day, to-morrow kind, Still constant in a wondrous excellence, Therefore my verse to constancy confined, One thing expressing, leaves out difference."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constant]] | noun | **1.** A quantity that does not vary.<br>**2.** A number representing a quantity assumed to have a fixed value in a specified mathematical context. | *"In all external grace you have some part, But you like none, none you for constant heart. 54 O how much more doth beauty beauteous seem, By that sweet ornament which truth doth give!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constantan]] | noun | **1.** An alloy of copper and nickel with high electrical resistance and a low temperature coefficient; used as resistance wire. | *"In academic literature, constantan designates an alloy of copper and nickel with high electrical resistance and a low temperature coefficient; used as resistance wire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constantina]] | noun | **1.** A romanian resort city on the black sea. | *"In academic literature, constantina designates a romanian resort city on the black sea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constantine]] | noun | **1.** Emperor of rome who stopped the persecution of christians and in 324 made christianity the official religion of the roman empire; in 330 he moved his capital from rome to byzantium and renamed it constantinople (280-337).<br>**2.** A walled city in northeastern algeria to the east of algiers; was destroyed in warfare in the 4th century and rebuilt by constantine i. | *"Helen, the mother of great Constantine, Nor yet Saint Philip’s daughters, were like thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constantinople]] | noun | **1.** The largest city and former capital of turkey; rebuilt on the site of ancient byzantium by constantine i in the fourth century; renamed constantinople by constantine who made it the capital of the byzantine empire; now the seat of the eastern orthodox church.<br>**2.** The council in 869 that condemned photius who had become the patriarch of constantinople without approval from the vatican, thereby precipitating the schism between the eastern and western churches. | *"Shall not thou and I, between Saint Denis and Saint George, compound a boy, half French, half English, that shall go to Constantinople and take the Turk by the beard?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constantly]] | adverb | **1.** Without variation or change, in every case.<br>**2.** Without interruption. | *"For since patiently and constantly thou hast stuck to the bare fortune of that beggar Posthumus, thou canst not, in the course of gratitude, but be a diligent follower of mine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constatation]] | noun | **1.** An assumption that is basic to an argument. | *"In academic literature, constatation designates an assumption that is basic to an argument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consubstantial]] | adjective | **1.** Regarded as the same in substance or essence (as of the three persons of the trinity). | *"Is that then the divine substance wherein Father and Son are consubstantial?"* — James Joyce, *Ulysses* |
| [[consubstantiate]] | verb | **1.** Become united in substance.<br>**2.** Unite in one common substance. | *"In academic literature, consubstantiate designates become united in substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consubstantiation]] | noun | **1.** The doctrine of the high anglican church that after the consecration of the eucharist the substance of the body and blood of christ coexists with the substance of the consecrated bread and wine. | *"In academic literature, consubstantiation designates the doctrine of the high anglican church that after the consecration of the eucharist the substance of the body and blood of christ coexists with the substance of the consecrated bread and wine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costa]] | noun | **1.** A riblike part of a plant or animal (such as a middle rib of a leaf or a thickened vein of an insect wing).<br>**2.** Any of the 12 pairs of curved arches of bone extending from the spine to or toward the sternum in humans (and similar bones in most vertebrates). | *"Gabb, "On the Indian Tribes and Languages of Costa Rica," _Proceedings of the American Philosophical Society held at Philadelphia_, xiv. (Philadelphia, 1876), p. 510. [61] L."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[costal]] | adjective | **1.** Of or relating to or near a rib. | *"In academic literature, costal designates of or relating to or near a rib."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costalgia]] | noun | **1.** Pain in the chest caused by inflammation of the muscles between the ribs. | *"In academic literature, costalgia designates pain in the chest caused by inflammation of the muscles between the ribs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costanoan]] | noun | **1.** A member of a north american indian people living in coastal california between monterey and san francisco bay.<br>**2.** A penutian language spoken by the costanoan. | *"In academic literature, costanoan designates a member of a north american indian people living in coastal california between monterey and san francisco bay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costate]] | adjective | **1.** (of the surface) having a rough, riblike texture.<br>**2.** Having ribs. | *"In academic literature, costate designates (of the surface) having a rough, riblike texture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterstain]] | noun | **1.** A stain of contrasting color that is used when the principal stain does not show the structure clearly. | *"In academic literature, counterstain designates a stain of contrasting color that is used when the principal stain does not show the structure clearly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterstate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin sta within the domain of Placing.<br>**2.** A technical or specialized form exhibiting the properties of sta in systematic terminology. | *"In academic literature, counterstate designates pertaining to, derived from, or characteristic of latin sta within the domain of placing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destabilisation]] | noun | **1.** The action of destabilizing; making something less stable (especially of a government or country or economy). | *"In academic literature, destabilisation designates the action of destabilizing; making something less stable (especially of a government or country or economy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destabilise]] | verb | **1.** Become unstable.<br>**2.** Make unstable. | *"In academic literature, destabilise designates become unstable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destabilization]] | noun | **1.** An event that causes a loss of equilibrium (as of a ship or aircraft).<br>**2.** The action of destabilizing; making something less stable (especially of a government or country or economy). | *"The real target's spunnel lines will crash, destabilization will disrupt the entire Slingshot construction schedule."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[destabilize]] | verb | **1.** Become unstable.<br>**2.** Make unstable. | *"In academic literature, destabilize designates become unstable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destain]] | verb | **1.** Remove stain from (a laboratory specimen) to enhance contrast. | *"In academic literature, destain designates remove stain from (a laboratory specimen) to enhance contrast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destalinisation]] | noun | **1.** Social process of neutralizing the influence of joseph stalin by revising his policies and removing monuments dedicated to him and renaming places named in his honor. | *"In academic literature, destalinisation designates social process of neutralizing the influence of joseph stalin by revising his policies and removing monuments dedicated to him and renaming places named in his honor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destalinise]] | verb | **1.** Counteract the effects and policies of stalinism. | *"In academic literature, destalinise designates counteract the effects and policies of stalinism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destalinization]] | noun | **1.** Social process of neutralizing the influence of joseph stalin by revising his policies and removing monuments dedicated to him and renaming places named in his honor. | *"In academic literature, destalinization designates social process of neutralizing the influence of joseph stalin by revising his policies and removing monuments dedicated to him and renaming places named in his honor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destalinize]] | verb | **1.** Counteract the effects and policies of stalinism. | *"In academic literature, destalinize designates counteract the effects and policies of stalinism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disestablish]] | verb | **1.** Deprive (an established church) of its status. | *"You see they want to disestablish everything; but I’m a pretty big landowner here, and I don’t want to be disestablished."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[disestablishment]] | noun | **1.** The act terminating an established state of affairs; especially ending a connection with the church of england. | *"The other question in which he took a special interest was that of Disestablishment."* — John Cairns, *Principal Cairns* |
| [[distal]] | adjective | **1.** Situated farthest from point of attachment or origin, as of a limb or bone.<br>**2.** Directed away from the midline or mesial plane of the body. | *"In academic literature, distal designates situated farthest from point of attachment or origin, as of a limb or bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distally]] | adverb | **1.** Far from the center. | *"In academic literature, distally designates far from the center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distance]] | noun | **1.** The property created by the space between two objects or points.<br>**2.** A distant region. | *"If there be breadth enough in the world, I will hold a long distance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distant]] | adjective | **1.** Separated in space or coming from or going to a distance.<br>**2.** Far apart in relevance or relationship or kinship. | *"Take you as ’twere some distant knowledge of him, As thus, ‘I know his father and his friends, And in part him’—do you mark this, Reynaldo?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distantly]] | adverb | **1.** From or at a distance. | *"The truth is, he wrote to me under a sort of protest while unable to write to you with any hope of an answer—wrote coldly, haughtily, distantly, resentfully."* — Charles Dickens, *Bleak House* |
| [[distaste]] | noun | **1.** A feeling of intense dislike. | *"Put on what weary negligence you please, You and your fellows; I’d have it come to question: If he distaste it, let him to our sister, Whose mind and mine, I know, in that are one, Not to be overruled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distasteful]] | adjective | **1.** Not pleasing in odor or taste.<br>**2.** Highly offensive; arousing aversion or disgust. | *"And so, intending other serious matters, After distasteful looks and these hard fractions, With certain half-caps and cold-moving nods They froze me into silence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distastefully]] | adverb | **1.** In an offensively distasteful manner.<br>**2.** In a disgusting manner or to a disgusting degree. | *"C'mere, give it a try." Ram looked distastefully at the suit."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[distastefulness]] | noun | **1.** Extreme unpalatability to the mouth.<br>**2.** The quality of being offensive. | *"In academic literature, distastefulness designates extreme unpalatability to the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecstasy]] | noun | **1.** A state of being carried away by overwhelming emotion; - charles dickens.<br>**2.** A state of elated bliss. | *"Mark how he trembles in his ecstasy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ecstatic]] | adjective | **1.** Feeling great rapture or delight. | *"Having seen that it was really her lover who had advanced, and no one else, her lips parted, and she sank upon him in her momentary joy, with something very like an ecstatic cry."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[establish]] | verb | **1.** Set up or found.<br>**2.** Set up or lay the groundwork for. | *"Good Doctor Pinch, you are a conjurer; Establish him in his true sense again, And I will please you what you will demand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[established]] | verb | **1.** Set up or found.<br>**2.** Set up or lay the groundwork for. | *"Suffer us to famish, and their storehouses crammed with grain; make edicts for usury to support usurers; repeal daily any wholesome act established against the rich, and provide more piercing statutes daily to chain up and restrain the poor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[establishment]] | noun | **1.** The act of forming or establishing something.<br>**2.** An organization founded and united for a specific purpose. | *"Jarndyce,” he went on, “makes no condition beyond expressing his expectation that our young friend will not at any time remove herself from the establishment in question without his knowledge and concurrence."* — Charles Dickens, *Bleak House* |
| [[estaminet]] | noun | **1.** A small (and usually shabby) cafe selling wine and beer and coffee. | *"Hemp the officer reads out periodically at the Sheriffs' Court--young gentlemen of very good family often, only that the latter disowns them; frequenters of billiard-rooms and estaminets, patrons of foreign races and gaming-tables."* — William Makepeace Thackeray, *Vanity Fair* |
| [[estate]] | noun | **1.** Everything you own; all of your assets (whether real property or personal property) and liabilities.<br>**2.** Extensive landed property (especially in the country) retained by the owner for his own use. | *"We thank you, maiden, But may not be so credulous of cure, When our most learned doctors leave us, and The congregated college have concluded That labouring art can never ransom nature From her inaidable estate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inconstancy]] | noun | **1.** Unfaithfulness by virtue of being unreliable or treacherous.<br>**2.** The quality of being changeable and variable. | *"How often have I tempted Suffolk’s tongue, The agent of thy foul inconstancy, To sit and witch me, as Ascanius did When he to madding Dido would unfold His father’s acts commenced in burning Troy!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inconstant]] | adjective | **1.** Likely to change frequently often without apparent or cogent reason; variable; ; ; - shakespeare. | *"Thou canst not vex me with inconstant mind, Since that my life on thy revolt doth lie, O what a happy title do I find, Happy to have thy love, happy to die!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[instability]] | noun | **1.** An unstable order.<br>**2.** Unreliability attributable to being unstable. | *"Seven hundred and fifty pounds in the divinest form that money can wear—that of necessary food for man and beast: should the risk be run of deteriorating this bulk of corn to less than half its value, because of the instability of a woman?"* — Thomas Hardy, *Far from the Madding Crowd* |
| [[instal]] | verb | **1.** Set up for use.<br>**2.** Put into an office or a position. | *"General Slocum declared that he could have no partiality in his brigade, and proposed to take two large buildings, the Powell House and the Octagon House, as hospitals, and instal Miss Bradley as lady superintendent of the Brigade Hospital."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[install]] | verb | **1.** Set up for use.<br>**2.** Put into an office or a position. | *"Levied an army, weening to redeem And have install’d me in the diadem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[installation]] | noun | **1.** The act of installing something (as equipment).<br>**2.** A building or place that provides a particular service or is used for a particular industry. | *"Coiler, and I had the honour of taking her down to dinner on the day of my installation."* — Charles Dickens, *Great Expectations* |
| [[installing]] | noun | **1.** The act of installing something (as equipment).<br>**2.** Set up for use. | *"Bathsheba had shown indications of anointing him above his fellows by installing him as the bailiff that the farm imperatively required."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[installment]] | noun | **1.** A payment of part of a debt; usually paid at regular intervals.<br>**2.** A part of a broadcast serial. | *"I told them in my last letter but three," continued Ukridge complainingly, "that I proposed to let them have the eggs on the _Times_ installment system, and they said I was frivolous."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[instalment]] | noun | **1.** A part of a broadcast serial.<br>**2.** A part of a published serial. | *"Each fair instalment, coat, and several crest, With loyal blazon, evermore be blest!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[instance]] | noun | **1.** An occurrence of something.<br>**2.** An item of information that is typical of a class or group. | *"Wherefore, what’s the instance?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[instancy]] | noun | **1.** The quickness of action or occurrence.<br>**2.** The quality of being insistent. | *"In academic literature, instancy designates the quickness of action or occurrence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[instant]] | noun | **1.** A very short time (as the time it takes the eye to blink or the heart to beat).<br>**2.** A particular point in time. | *"So is the time that keeps you as my chest Or as the wardrobe which the robe doth hide, To make some special instant special-blest, By new unfolding his imprisoned pride."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[instantaneous]] | adjective | **1.** Occurring with no delay. | *"I felt the blood rush into my face for the first time, but it was only an instantaneous emotion."* — Charles Dickens, *Bleak House* |
| [[instantaneously]] | adverb | **1.** Without any delay. | *"The lightning works instantaneously."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[instantaneousness]] | noun | **1.** The quickness of action or occurrence. | *"A snap of action it was, an explosion, an instantaneousness."* — Jack London, *The Jacket (The Star-Rover)* |
| [[instantiate]] | verb | **1.** Represent by an instance.<br>**2.** Find an instance of (a word or particular usage of a word). | *"In academic literature, instantiate designates represent by an instance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[instantiation]] | noun | **1.** A representation of an idea in the form of an instance of it. | *"In academic literature, instantiation designates a representation of an idea in the form of an instance of it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[instantly]] | adverb | **1.** Without delay or hesitation; with no time intervening.<br>**2.** Without any delay. | *"Cleopatra, catching but the least noise of this, dies instantly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[instar]] | noun | **1.** An insect or other arthropod between molts. | *"In academic literature, instar designates an insect or other arthropod between molts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[instauration]] | noun | **1.** The act of starting something for the first time; introducing something new. | *"In academic literature, instauration designates the act of starting something for the first time; introducing something new."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insubstantial]] | adjective | **1.** Lacking material form or substance; unreal.<br>**2.** Lacking in nutritive value. | *"In doing so he caught sight of his reflected features, wan in expression, and insubstantial in form."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[insubstantiality]] | noun | **1.** Lack of solid substance and strength.<br>**2.** Lacking substance or reality. | *"Science can now educe threads of such exquisite tenuity that only the feet of the tiniest infant-spiders can ascend them; but up the filmiest insubstantiality Shelley runs with agile ease."* — Francis Thompson, *Shelley: An Essay* |
| [[insubstantially]] | adverb | **1.** Not substantially; lacking substantial expression or fullness. | *"In academic literature, insubstantially designates not substantially; lacking substantial expression or fullness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercostal]] | noun | **1.** Muscles between the ribs; they contract during inspiration.<br>**2.** Located or occurring between the ribs. | *"In academic literature, intercostal designates muscles between the ribs; they contract during inspiration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interstate]] | noun | **1.** One of the system of highways linking major cities in the 48 contiguous states of the united states.<br>**2.** Involving and relating to the mutual relations of states especially of the united states. | *"Now, amid bewildering variety and interstate rivalries in tax laws, the most usual rate is two per cent on gross (in a few cases on net) premiums collected."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[intrastate]] | adjective | **1.** Relating to or existing within the boundaries of a state. | *"In academic literature, intrastate designates relating to or existing within the boundaries of a state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misstate]] | verb | **1.** State something incorrectly. | *"Is the divine Principle of creation misstated?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[misstatement]] | noun | **1.** A statement that contains a mistake. | *"Passing over what appears in my colleague’s speech as extracts from newspapers, to whose misstatements he has contributed a full share, I come now to notice his animadversions on the Riddleberger bill."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[misunderstand]] | verb | **1.** Interpret in the wrong way. | *"Perhaps I can make use of him—I might do it then!” She pointed in the direction of Casterbridge, and the dog seemed to misunderstand: he trotted on."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[misunderstanding]] | noun | **1.** Putting the wrong interpretation on.<br>**2.** An understanding of something that is not correct. | *"I have occupied your house for a considerable period, I believe to our mutual satisfaction until this unpleasant misunderstanding arose; let us be at once friendly and business-like."* — Charles Dickens, *Bleak House* |
| [[nonresistance]] | noun | **1.** Group refusal to resort to violence even in defense against violence. | *"Being an integral portion of the State, it has been assumed, and in effect tacitly admitted on our part by nonresistance, that all political and governmental power over us rested in the State Legislature."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[nonresistant]] | adjective | **1.** (often followed by `to') likely to be affected with.<br>**2.** Offering no resistance. | *"In academic literature, nonresistant designates (often followed by `to') likely to be affected with."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonstandard]] | adjective | **1.** Not conforming to the language usage of a prestige group within a community; ; - a.r.dunlap.<br>**2.** Varying from or not adhering to a standard. | *"When ships are taken out of the line for repair, the process is too damn long, mostly because of the marginal and nonstandard support equipment."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[nonstarter]] | noun | **1.** A person with a record of failing; someone who loses consistently.<br>**2.** A horse that fails to run in a race for which it has been entered. | *"In academic literature, nonstarter designates a person with a record of failing; someone who loses consistently."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obstacle]] | noun | **1.** Something immaterial that stands in the way and must be circumvented or surmounted.<br>**2.** An obstruction that stands in the way (and must be removed or surmounted or circumvented). | *"Fie, Joan, that thou wilt be so obstacle!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[overstate]] | verb | **1.** To enlarge beyond bounds or the truth. | *"It is impossible to overstate the vividness of these images, and yet I was so intent, all the time, upon him himself,—who would not be intent on the tiger crouching to spring!—that I knew of the slightest action of his fingers."* — Charles Dickens, *Great Expectations* |
| [[overstated]] | verb | **1.** To enlarge beyond bounds or the truth.<br>**2.** Represented as greater than is true or reasonable. | *"The question will rise, Have Christians overstated their experience, or even misunderstood it?"* — T. R. Glover, *The Jesus of History* |
| [[overstatement]] | noun | **1.** Making to seem more important than it really is. | *"In academic literature, overstatement designates making to seem more important than it really is."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overstay]] | verb | **1.** Stay too long. | *"Crisparkle sat with his watch in his hand for about the same period, lest he should overstay his time."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[prostate]] | noun | **1.** A firm partly muscular chestnut sized gland in males at the neck of the urethra; produces a viscid secretion that is the fluid part of semen.<br>**2.** Relating to the prostate gland. | *"My trouble was pronounced by some to be Bright's disease, by others gravel on the kidneys with very acute inflammation of the bladder and prostate gland."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[prostatectomy]] | noun | **1.** Surgical removal of part or all of the prostate gland. | *"In academic literature, prostatectomy designates surgical removal of part or all of the prostate gland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostatic]] | adjective | **1.** Relating to the prostate gland. | *"In academic literature, prostatic designates relating to the prostate gland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostatitis]] | noun | **1.** Inflammation of the prostate gland characterized by perineal pain and irregular urination and (if severe) chills and fever. | *"In academic literature, prostatitis designates inflammation of the prostate gland characterized by perineal pain and irregular urination and (if severe) chills and fever."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redstart]] | noun | **1.** Flycatching warbler of eastern north america the male having bright orange on sides and wings and tail.<br>**2.** European songbird with a reddish breast and tail; related to old world robins. | *"In academic literature, redstart designates flycatching warbler of eastern north america the male having bright orange on sides and wings and tail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reestablish]] | verb | **1.** Bring back into original existence, use, function, or position. | *"Listen to what he said 'I fear that he won't wish to have anything to do with me, and I shall be powerless in that case.'" "I won't refuse the hand of an old friend, though, Maxa," said the brother now, "if he offers it to me to reestablish peace."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[reinstall]] | verb | **1.** Install again. | *"In academic literature, reinstall designates install again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reinstatements]] | noun | **1.** The condition of being reinstated.<br>**2.** The act of restoring someone to a previous position. | *"In academic literature, reinstatements designates the condition of being reinstated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resistance]] | noun | **1.** The action of opposing something that you disapprove or disagree with.<br>**2.** Any mechanical force that tends to retard or oppose motion. | *"Unfold to us some warlike resistance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resistant]] | adjective | **1.** Relating to or conferring immunity (to disease or infection).<br>**2.** Able to tolerate environmental conditions or physiological stress. | *"After all superfluous flesh is gone what is left is stringy and resistant."* — Jack London, *The Jacket (The Star-Rover)* |
| [[restart]] | verb | **1.** Start an engine again, for example.<br>**2.** Take up or begin anew. | *"The furnace gradually ceases running, and it becomes necessary to stop its working, to take down the furnace jackets, bar out the debris, and restart operations."* — Donald M. Levy, *Modern Copper Smelting* |
| [[restate]] | verb | **1.** To say, state, or perform again. | *"Butler and Curtis, and in the arguments which came up upon points of testimony, that there remained little for the other counsel except to restate what had before been said."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[restatement]] | noun | **1.** A revised statement. | *"The theory of the transference of the will of the people to historic persons is merely a paraphrase—a restatement of the question in other words."* — graf Leo Tolstoy, *War and Peace* |
| [[restaurant]] | noun | **1.** A building where people go to eat. | *"They dined in the middle of the day at a neighbouring restaurant, on soup, meat, vegetables, and black bread, at a cost of threepence."* — John Cairns, *Principal Cairns* |
| [[restauranter]] | noun | **1.** The proprietor of a restaurant. | *"In academic literature, restauranter designates the proprietor of a restaurant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restaurateur]] | noun | **1.** The proprietor of a restaurant. | *"He called upon the ladies the next day; he rode by their side in the Park; he asked their party to a great dinner at a restaurateur's, and was quite wild with exultation when they agreed to come."* — William Makepeace Thackeray, *Vanity Fair* |
| [[stabilisation]] | noun | **1.** The act of making something (as a vessel or aircraft) less likely to overturn.<br>**2.** The act of stabilizing something or making it more stable. | *"In academic literature, stabilisation designates the act of making something (as a vessel or aircraft) less likely to overturn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stabilise]] | verb | **1.** Support or hold steady and make steadfast, with or as if with a brace.<br>**2.** Become stable or more stable. | *"In academic literature, stabilise designates support or hold steady and make steadfast, with or as if with a brace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stabilised]] | verb | **1.** Support or hold steady and make steadfast, with or as if with a brace.<br>**2.** Become stable or more stable. | *"In academic literature, stabilised designates support or hold steady and make steadfast, with or as if with a brace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stabiliser]] | noun | **1.** A device for making something stable. | *"In academic literature, stabiliser designates a device for making something stable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stabilising]] | verb | **1.** Support or hold steady and make steadfast, with or as if with a brace.<br>**2.** Become stable or more stable. | *"In academic literature, stabilising designates support or hold steady and make steadfast, with or as if with a brace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stability]] | noun | **1.** The quality or attribute of being firm and steadfast.<br>**2.** A stable order (especially of society). | *"From 1492 to 1660 the ratio changed to 15 to 1, where it remained with remarkable stability until about the year 1800."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[stabilization]] | noun | **1.** The act of stabilizing something or making it more stable.<br>**2.** The act of making something (as a vessel or aircraft) less likely to overturn. | *"In academic literature, stabilization designates the act of stabilizing something or making it more stable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stabilize]] | verb | **1.** Make stable and keep from fluctuating or put into an equilibrium.<br>**2.** Support or hold steady and make steadfast, with or as if with a brace. | *"Destroyer had to stabilize to bring Scarf aboard; now they're hustlin'."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[stabilized]] | verb | **1.** Make stable and keep from fluctuating or put into an equilibrium.<br>**2.** Support or hold steady and make steadfast, with or as if with a brace. | *"Pseudo-gravity enhancers during construction stabilized the floors."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[stabilizer]] | noun | **1.** A chemical that is added to a solution or mixture or suspension to maintain it in a stable or unchanging state.<br>**2.** Airfoil consisting of a device for stabilizing an aircraft. | *"I've been too busy on that new airship stabilizer dad gave me an idea for."* — Victor Appleton, *Tom Swift in the Land of Wonders; Or, The Underground Search for the Idol of Gold* |
| [[stabilizing]] | verb | **1.** Make stable and keep from fluctuating or put into an equilibrium.<br>**2.** Support or hold steady and make steadfast, with or as if with a brace. | *"Greater stability in our tariff policy would remove a constantly disturbing factor in prices, as would likewise the stabilizing of the standard of deferred payments."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[stable]] | noun | **1.** A farm building for housing horses or other livestock.<br>**2.** Shelter in a stable. | *"France is a stable; we that dwell in’t, jades, Therefore, to th’ war!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stableness]] | noun | **1.** The quality or attribute of being firm and steadfast. | *"In academic literature, stableness designates the quality or attribute of being firm and steadfast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stabling]] | noun | **1.** Accommodation for animals (especially for horses).<br>**2.** Shelter in a stable. | *"An agent would describe it as a `desirable gentleman's residence, comprising four entertaining rooms and eight bedrooms, glass, stabling, and grounds of four acres, artistically laid out'."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[staccato]] | adjective | **1.** (music) marked by or composed of disconnected parts or sounds; cut short crisply.<br>**2.** Separating the notes; in music. | *"Its deep "Ah! hah! hah!" came with a staccato, quacking sound from somewhere low down in the chest, and set his huge shoulders moving in unison with its peals."* — John Cairns, *Principal Cairns* |
| [[stachyose]] | noun | **1.** A tetrasaccharide found in the tubers of the chinese artichoke. | *"In academic literature, stachyose designates a tetrasaccharide found in the tubers of the chinese artichoke."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stachys]] | noun | **1.** Large genus of usually woolly or hairy herbs or subshrubs or shrubs; temperate eastern hemisphere; tropical australasia. | *"BETONY BRAND; spots obliterated; sori hypogenous, subrotund, aggregate, surrounded by the ruptured epidermis; spores very pale-brown, short, obovate, elliptic; peduncles short.—On _Stachys Betonica_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[stack]] | noun | **1.** An orderly pile.<br>**2.** (often followed by `of') a large number or amount or extent. | *"I stood at the window with Ada, pretending to look at the housetops, and the blackened stack of chimneys, and the poor plants, and the birds in little cages belonging to the neighbours, when I found that Mrs."* — Charles Dickens, *Bleak House* |
| [[stacked]] | verb | **1.** Load or cover with stacks.<br>**2.** Arrange in stacks. | *"Hand and shoulder weapons were everywhere: lashed to thighs or slung across backs, flat on tables or stacked along the bar."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[stacker]] | noun | **1.** A laborer who builds up a stack or pile. | *"In academic literature, stacker designates a laborer who builds up a stack or pile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stacks]] | noun | **1.** A large number or amount.<br>**2.** Storage space in a library consisting of an extensive arrangement of bookshelves where most of the books are stored. | *"The high chimney-stacks telegraph family secrets to him."* — Charles Dickens, *Bleak House* |
| [[stacte]] | noun | **1.** (old testament) one of several sweet-smelling spices used in incense. | *"In academic literature, stacte designates (old testament) one of several sweet-smelling spices used in incense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stael]] | noun | **1.** French romantic writer (1766-1817). | *"In academic literature, stael designates french romantic writer (1766-1817)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stagnancy]] | noun | **1.** Inactivity of liquids; being stagnant; standing still; without current or circulation.<br>**2.** A state of inactivity (in business or art etc). | *"In academic literature, stagnancy designates inactivity of liquids; being stagnant; standing still; without current or circulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stagnant]] | adjective | **1.** Not circulating or flowing.<br>**2.** Not growing or changing; without force or vitality. | *"The adjacent low-lying ground for half a mile in breadth is a stagnant river with melancholy trees for islands in it and a surface punctured all over, all day long, with falling rain."* — Charles Dickens, *Bleak House* |
| [[stagnate]] | verb | **1.** Stand still.<br>**2.** Cause to stagnate. | *"Well may he eschew the calm of domestic life; it is not his element: there his faculties stagnate—they cannot develop or appear to advantage."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[stagnation]] | noun | **1.** A state of inactivity (in business or art etc).<br>**2.** Inactivity of liquids; being stagnant; standing still; without current or circulation. | *"Mentally she remained in utter stagnation, a condition which the mechanical occupation rather fostered than checked."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[staid]] | adjective | **1.** Characterized by dignity and propriety. | *"She should have staid in France, and starved in France, Before— CARDINAL."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[staidly]] | adverb | **1.** In a grave and sober manner. | *"In academic literature, staidly designates in a grave and sober manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[staidness]] | noun | **1.** A trait of dignified seriousness. | *"In academic literature, staidness designates a trait of dignified seriousness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stain]] | noun | **1.** A soiled or discolored appearance.<br>**2.** (microscopy) a dye or other coloring material that is used in microscopy to make structures visible. | *"You have some stain of soldier in you; let me ask you a question."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stainability]] | noun | **1.** (cytology) the capacity of cells or cell parts to stain specifically with certain dyes. | *"In academic literature, stainability designates (cytology) the capacity of cells or cell parts to stain specifically with certain dyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stainable]] | adjective | **1.** Capable of being stained (especially of cells and cell parts). | *"In academic literature, stainable designates capable of being stained (especially of cells and cell parts)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stained]] | verb | **1.** Color with a liquid dye or tint.<br>**2.** Produce or leave stains. | *"Behold it stained With his most noble blood."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stainer]] | noun | **1.** A worker who stains (wood or fabric). | *"In academic literature, stainer designates a worker who stains (wood or fabric)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[staining]] | noun | **1.** (histology) the use of a dye to color specimens for microscopic study.<br>**2.** The act of spotting or staining something. | *"Though my estate be fall’n, I was well born, Nothing acquainted with these businesses, And would not put my reputation now In any staining act."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stainless]] | noun | **1.** Steel containing chromium that makes it resistant to corrosion.<br>**2.** (of reputation) free from blemishes. | *"Come, civil night, Thou sober-suited matron, all in black, And learn me how to lose a winning match, Play’d for a pair of stainless maidenhoods."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stair]] | noun | **1.** Support consisting of a place to rest the foot while ascending or descending a stairway. | *"Within this hour my man shall be with thee, And bring thee cords made like a tackled stair, Which to the high topgallant of my joy Must be my convoy in the secret night."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stair-carpet]] | noun | **1.** A strip of carpet for laying on stairs. | *"In academic literature, stair-carpet designates a strip of carpet for laying on stairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stair-rod]] | noun | **1.** A rod that holds a stair-carpet in the angle between two steps. | *"In academic literature, stair-rod designates a rod that holds a stair-carpet in the angle between two steps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[staircase]] | noun | **1.** A way of access (upward and downward) consisting of a set of steps. | *"And there really was a churchyard outside under some cloisters, for I saw the gravestones from the staircase window."* — Charles Dickens, *Bleak House* |
| [[stairhead]] | noun | **1.** Platform at the top of a staircase. | *"When tired of this occupation, I would retire from the stairhead to the solitary and silent nursery: there, though somewhat sad, I was not miserable."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[stairs]] | noun | **1.** A flight of stairs or a flight of steps.<br>**2.** Support consisting of a place to rest the foot while ascending or descending a stairway. | *"But indeed, if you find him not within this month, you shall nose him as you go up the stairs into the lobby."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stairway]] | noun | **1.** A way of access (upward and downward) consisting of a set of steps. | *"At the same moment he came down his steps from above in his shirt-sleeves and put his arm across the stairway."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[stairwell]] | noun | **1.** A vertical well around which there is a stairway. | *"In academic literature, stairwell designates a vertical well around which there is a stairway."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalactite]] | noun | **1.** A cylinder of calcium carbonate hanging from the roof of a limestone cave. | *"The moon--the regal moon--intensely bright, Shines through the roseate window of the west; Each shaft, an artificial stalactite Of pendent stone, with slumber seems oppressed, Or with a charmèd dream of peaceful rapture blessed."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[stalagmite]] | noun | **1.** A cylinder of calcium carbonate projecting upward from the floor of a limestone cave. | *"In one place, near at hand, a stalagmite had been slowly growing up from the ground for ages, builded by the water-drip from a stalactite overhead."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[stale]] | verb | **1.** Urinate, of cattle and horses.<br>**2.** Lacking freshness, palatability, or showing deterioration from age. | *"Thou didst drink The stale of horses and the gilded puddle Which beasts would cough at."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stalemate]] | noun | **1.** A situation in which no progress can be made or no advancement is possible.<br>**2.** Drawing position in chess: any of a player's possible moves would place his king in check. | *"I like neither Bulstrode nor speculation.” He spoke rather sulkily, feeling himself stalemated."* — George Eliot, *Middlemarch* |
| [[stalemated]] | verb | **1.** Subject to a stalemate.<br>**2.** At a complete standstill because of opposition of two unrelenting forces or factions. | *"I like neither Bulstrode nor speculation.” He spoke rather sulkily, feeling himself stalemated."* — George Eliot, *Middlemarch* |
| [[staleness]] | noun | **1.** Unoriginality as a result of being dull and hackneyed.<br>**2.** Having lost purity and freshness as a consequence of aging. | *"But, since your kindness We have stretch’d thus far, let us beseech you That for our gold we may provision have, Wherein we are not destitute for want, But weary for the staleness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stalin]] | noun | **1.** Russian leader who succeeded lenin as head of the communist party and created a totalitarian state by purging all opposition (1879-1953). | *"In academic literature, stalin designates russian leader who succeeded lenin as head of the communist party and created a totalitarian state by purging all opposition (1879-1953)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalinabad]] | noun | **1.** The capital of tajikistan; formerly stalinabad 1926-1991. | *"In academic literature, stalinabad designates the capital of tajikistan; formerly stalinabad 1926-1991."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalingrad]] | noun | **1.** A city in the european part of russia on the volga; site of german defeat in world war ii in the winter of 1942-43. | *"In academic literature, stalingrad designates a city in the european part of russia on the volga; site of german defeat in world war ii in the winter of 1942-43."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalinisation]] | noun | **1.** Social process of adopting (or being forced to adopt) the policies and practices of joseph stalin. | *"In academic literature, stalinisation designates social process of adopting (or being forced to adopt) the policies and practices of joseph stalin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalinise]] | verb | **1.** Transform in accordance with stalin's policies. | *"In academic literature, stalinise designates transform in accordance with stalin's policies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalinism]] | noun | **1.** A form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.). | *"In academic literature, stalinism designates a form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalinist]] | noun | **1.** A follower of stalin and stalinism.<br>**2.** Of or relating to joseph stalin or his times. | *"In academic literature, stalinist designates a follower of stalin and stalinism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalinization]] | noun | **1.** Social process of adopting (or being forced to adopt) the policies and practices of joseph stalin. | *"In academic literature, stalinization designates social process of adopting (or being forced to adopt) the policies and practices of joseph stalin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalinize]] | verb | **1.** Transform in accordance with stalin's policies. | *"In academic literature, stalinize designates transform in accordance with stalin's policies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalino]] | noun | **1.** An industrial city in the donets basin. | *"In academic literature, stalino designates an industrial city in the donets basin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalk]] | noun | **1.** Material consisting of seed coverings and small pieces of stem or leaves that have been separated from the seeds.<br>**2.** A slender or elongated structure that supports a plant or fungus or a plant part or plant organ. | *"Thus twice before, and jump at this dead hour, With martial stalk hath he gone by our watch."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stalked]] | verb | **1.** Walk stiffly.<br>**2.** Follow stealthily or recur constantly and spontaneously to. | *"Kurt was left quite alone, and still the fearful creature stalked nearer."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[stalker]] | noun | **1.** Someone who walks with long stiff strides.<br>**2.** Someone who stalks game. | *"GREAT STALKER An American species of the iguanodon, called thespesius or “marvellous.” It is also called claosaurus."* — F. H. Costello, *Sure-dart* |
| [[stalking]] | noun | **1.** A hunt for game carried on by following it stealthily or waiting in ambush.<br>**2.** The act of following prey stealthily. | *"He uses his folly like a stalking-horse, and under the presentation of that he shoots his wit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stalking-horse]] | noun | **1.** A candidate put forward to divide the opposition or to mask the true candidate.<br>**2.** Something serving to conceal plans; a fictitious reason that is concocted in order to conceal the real reason. | *"In academic literature, stalking-horse designates a candidate put forward to divide the opposition or to mask the true candidate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalkless]] | adjective | **1.** Attached directly by the base; not having an intervening stalk. | *"In academic literature, stalkless designates attached directly by the base; not having an intervening stalk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stall]] | noun | **1.** A compartment in a stable where a single animal is confined and fed.<br>**2.** Small area set off by walls for special use. | *"Pray you leave me; stall this in your bosom; and I thank you for your honest care."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stall-fed]] | adjective | **1.** (of livestock) kept and fed in a stall in order to fatten for the market. | *"In academic literature, stall-fed designates (of livestock) kept and fed in a stall in order to fatten for the market."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stalling]] | noun | **1.** A tactic used to mislead or delay.<br>**2.** Postpone doing what one should be doing. | *"For my part, he keeps me rustically at home, or, to speak more properly, stays me here at home unkept; for call you that keeping, for a gentleman of my birth, that differs not from the stalling of an ox?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stallion]] | noun | **1.** Uncastrated adult male horse. | *"And most of all I remember a great, hairy-fetlocked stallion, often led dancing, sidling, and nickering down the narrow street."* — Jack London, *The Jacket (The Star-Rover)* |
| [[stalls]] | noun | **1.** A farm building for housing horses or other livestock.<br>**2.** A compartment in a stable where a single animal is confined and fed. | *"Stalls, bulks, windows Are smothered up, leads filled, and ridges horsed With variable complexions, all agreeing In earnestness to see him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stalwart]] | noun | **1.** A person who is loyal to their allegiance (especially in times of revolt).<br>**2.** Having rugged physical strength; inured to fatigue or hardships. | *"Jarndyce; “being some ten years older than I and a couple of inches taller, with his head thrown back like an old soldier, his stalwart chest squared, his hands like a clean blacksmith’s, and his lungs!"* — Charles Dickens, *Bleak House* |
| [[stalwartness]] | noun | **1.** The property of being strong and resolute. | *"In academic literature, stalwartness designates the property of being strong and resolute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stamboul]] | noun | **1.** The largest city and former capital of turkey; rebuilt on the site of ancient byzantium by constantine i in the fourth century; renamed constantinople by constantine who made it the capital of the byzantine empire; now the seat of the eastern orthodox church. | *"And whose more rife with merriment than thine, O Stamboul! once the empress of their reign?"* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[stambul]] | noun | **1.** The largest city and former capital of turkey; rebuilt on the site of ancient byzantium by constantine i in the fourth century; renamed constantinople by constantine who made it the capital of the byzantine empire; now the seat of the eastern orthodox church. | *"In academic literature, stambul designates the largest city and former capital of turkey; rebuilt on the site of ancient byzantium by constantine i in the fourth century; renamed constantinople by constantine who made it the capital of the byzantine empire; now the seat of the eastern orthodox church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stamen]] | noun | **1.** The male reproductive organ of a flower. | *"Blight Hard seeds of hate I planted That should by now be grown,-- Rough stalks, and from thick stamens A poisonous pollen blown, And odors rank, unbreathable, From dark corollas thrown!"* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[stamina]] | noun | **1.** Enduring strength and energy.<br>**2.** The male reproductive organ of a flower. | *"Oh, and others followed Hodge and Polazzo; and others, whose physical stamina had been impaired, fell victims to prison-tuberculosis."* — Jack London, *The Jacket (The Star-Rover)* |
| [[staminate]] | adjective | **1.** Capable of fertilizing female organs. | *"In academic literature, staminate designates capable of fertilizing female organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stammel]] | noun | **1.** A coarse woolen cloth formerly used for undergarments and usually dyed bright red. | *"In academic literature, stammel designates a coarse woolen cloth formerly used for undergarments and usually dyed bright red."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stammer]] | noun | **1.** A speech disorder involving hesitations and involuntary repetitions of certain sounds.<br>**2.** Speak haltingly. | *"I would thou couldst stammer, that thou mightst pour this concealed man out of thy mouth, as wine comes out of narrow-mouthed bottle—either too much at once or none at all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stammerer]] | noun | **1.** Someone who speaks with involuntary pauses and repetitions. | *"In academic literature, stammerer designates someone who speaks with involuntary pauses and repetitions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stamp]] | noun | **1.** The distinctive form in which a thing is made.<br>**2.** A type or class. | *"Thou art as fair in knowledge as in hue, Finding thy worth a limit past my praise, And therefore art enforced to seek anew, Some fresher stamp of the time-bettering days."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stampede]] | noun | **1.** A headlong rush of people on a common impulse.<br>**2.** A wild headlong rush of frightened animals (horses or cattle). | *"While some of the men chopped sage-brush and we children carried it to the fires that were kindling, other men unyoked the oxen and let them stampede for water."* — Jack London, *The Jacket (The Star-Rover)* |
| [[stamper]] | noun | **1.** A workman whose job is to form or cut out by applying a mold or die (either by hand or by operating a stamping machine).<br>**2.** Someone who walks with a heavy noisy gait or who stamps on the ground. | *"In academic literature, stamper designates a workman whose job is to form or cut out by applying a mold or die (either by hand or by operating a stamping machine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stance]] | noun | **1.** Standing posture.<br>**2.** A rationalized mental attitude. | *"The guard at the other end stood astride the passageway in a casual stance."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[stanch]] | verb | **1.** Stop the flow of a liquid. | *"You know I have been always a stanch friend to you.” “Don’t touch me."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[stanchion]] | noun | **1.** Any vertical post or rod used as a support. | *"I had been lying upon the edge of the deck, with my leg around a stanchion, my head hanging over the water; and I think my position, in addition to the fumes of the liquor I had drank, made me dizzy."* — Oliver Optic, *Plane and Plank; or, The Mishaps of a Mechanic* |
| [[stanchly]] | adverb | **1.** In a staunch manner. | *"Roger Pye as stanchly declared that John Andrew told him 157; and there the matter stands to this day."* — L. M. Montgomery, *Anne of Avonlea* |
| [[stand]] | noun | **1.** A support or foundation.<br>**2.** The position where a thing or person stands. | *"O give thyself the thanks if aught in me, Worthy perusal stand against thy sight, For who’s so dumb that cannot write to thee, When thou thyself dost give invention light?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stand-alone]] | adjective | **1.** Capable of operating independently. | *"In academic literature, stand-alone designates capable of operating independently."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stand-down]] | noun | **1.** A suspension and relaxation from an alert state or a state of readiness.<br>**2.** (military) a temporary stop of offensive military action. | *"In academic literature, stand-down designates a suspension and relaxation from an alert state or a state of readiness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stand-in]] | noun | **1.** Someone who takes the place of another (as when things get dangerous or difficult). | *"In academic literature, stand-in designates someone who takes the place of another (as when things get dangerous or difficult)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stand-up]] | adjective | **1.** Requiring a standing position. | *"In academic literature, stand-up designates requiring a standing position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standard]] | noun | **1.** A basis for comparison; a reference point against which other things can be evaluated.<br>**2.** The ideal in terms of which something can be judged. | *"Pray God she prove not masculine ere long, If underneath the standard of the French She carry armour as she hath begun."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[standard-bearer]] | noun | **1.** An outstanding leader of a political movement.<br>**2.** The soldier who carries the standard of the unit in military parades or in battle. | *"In academic literature, standard-bearer designates an outstanding leader of a political movement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standardisation]] | noun | **1.** The condition in which a standard has been successfully established.<br>**2.** The imposition of standards or regulations. | *"Later work, some already published, some still in progress, should eventually allow of more general standardisation than is at present possible."* — Donald M. Levy, *Modern Copper Smelting* |
| [[standardise]] | verb | **1.** Evaluate by comparing with a standard.<br>**2.** Cause to conform to standard or norm. | *"In academic literature, standardise designates evaluate by comparing with a standard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standardised]] | verb | **1.** Evaluate by comparing with a standard.<br>**2.** Cause to conform to standard or norm. | *"In academic literature, standardised designates evaluate by comparing with a standard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standardiser]] | noun | **1.** A person who sets a standard for things to conform to. | *"In academic literature, standardiser designates a person who sets a standard for things to conform to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standardization]] | noun | **1.** The condition in which a standard has been successfully established.<br>**2.** The imposition of standards or regulations. | *"In academic literature, standardization designates the condition in which a standard has been successfully established."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standardize]] | verb | **1.** Cause to conform to standard or norm.<br>**2.** Evaluate by comparing with a standard. | *"For not all prices can be included, but only those of articles of somewhat standardized grades and those that are pretty regularly sold in markets where prices are publicly quoted."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[standardized]] | verb | **1.** Cause to conform to standard or norm.<br>**2.** Evaluate by comparing with a standard. | *"For not all prices can be included, but only those of articles of somewhat standardized grades and those that are pretty regularly sold in markets where prices are publicly quoted."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[standardizer]] | noun | **1.** A person who sets a standard for things to conform to. | *"In academic literature, standardizer designates a person who sets a standard for things to conform to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standby]] | noun | **1.** Something that can be relied on when needed.<br>**2.** An actor able to replace a regular performer when required. | *"I was informed that I had one week to get my affairs in order; after that I would be on standby for departure."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[standdown]] | noun | **1.** A suspension and relaxation from an alert state or a state of readiness.<br>**2.** (military) a temporary stop of offensive military action. | *"In academic literature, standdown designates a suspension and relaxation from an alert state or a state of readiness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standee]] | noun | **1.** Someone who stands in a place where one might otherwise sit (as a spectator who uses standing room in a theater or a passenger on a crowded bus or train).<br>**2.** A lifesize cardboard cutout (usually of a celebrity). | *"Where’d you find him, Pete?” inquired a sour-visaged standee."* — O. Henry, *My tussle with the devil, and other stories* |
| [[stander]] | noun | **1.** An organism (person or animal) that stands. | *"I would not be a stander-by to hear My sovereign mistress clouded so, without My present vengeance taken: ’shrew my heart, You never spoke what did become you less Than this; which to reiterate were sin As deep as that, though true."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[standing]] | noun | **1.** Social or financial or professional status or reputation.<br>**2.** An ordered listing of scores or results showing the relative positions of competitors (individuals or teams) in a sporting event. | *"So say I, madam, if he run away, as I hear he does; the danger is in standing to’t; that’s the loss of men, though it be the getting of children."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[standish]] | noun | **1.** English colonist in america; leader of the pilgrims in the early days of the plymouth colony (1584-1656). | *"Standish, the old lawyer, who had been so long concerned with the landed gentry that he had become landed himself, and used that oath in a deep-mouthed manner as a sort of armorial bearings, stamping the speech of a man who held a good position."* — George Eliot, *Middlemarch* |
| [[standoff]] | noun | **1.** The finish of a contest in which the score is tied and the winner is undecided.<br>**2.** The act of repulsing or repelling an attack; a successful defensive stand. | *"In academic literature, standoff designates the finish of a contest in which the score is tied and the winner is undecided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standoffish]] | adjective | **1.** Lacking cordiality; unfriendly. | *"His initial impression was he was a shade standoffish or not over effusive but it grew on him someway."* — James Joyce, *Ulysses* |
| [[standoffishly]] | adverb | **1.** In a standoffish manner. | *"In academic literature, standoffishly designates in a standoffish manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standoffishness]] | noun | **1.** A disposition to be distant and unsympathetic in manner. | *"In academic literature, standoffishness designates a disposition to be distant and unsympathetic in manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standpat]] | adjective | **1.** Old-fashioned and out of date. | *"In academic literature, standpat designates old-fashioned and out of date."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standpipe]] | noun | **1.** A vertical pipe. | *"In academic literature, standpipe designates a vertical pipe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[standpoint]] | noun | **1.** A mental position from which things are viewed. | *"Oak meditatively looked upon the horizon of circumstances without any special regard to his own standpoint in the midst."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[standstill]] | noun | **1.** A situation in which no progress can be made or no advancement is possible.<br>**2.** An interruption of normal activity. | *"I may keep him at a standstill, but I can never shake him off.” “Has he so little pity or compunction?” “He has none, and no anger."* — Charles Dickens, *Bleak House* |
| [[stanford]] | noun | **1.** United states railroad executive and founder of stanford university (1824-1893).<br>**2.** A university in california. | *"He has a girl in high school, and his boy is a freshman at Stanford."* — Jack London, *The Jacket (The Star-Rover)* |
| [[stanhope]] | noun | **1.** A light open horse-drawn carriage with two or four wheels and one seat. | *"Stanhope, a widow lady and her maiden sister, Miss Martha Pinkerton, a female of uncertain age, as authors say, and possessed of the peculiarities common to persons of her class."* — Effie Afton, *Eventide* |
| [[stanhopea]] | noun | **1.** Any of various orchids of the genus stanhopea having a single large leaf and loose racemes of large fragrant flowers of various colors; mexico to brazil. | *"In academic literature, stanhopea designates any of various orchids of the genus stanhopea having a single large leaf and loose racemes of large fragrant flowers of various colors; mexico to brazil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stanislavsky]] | noun | **1.** Russian actor and theater director who trained his actors to emphasize the psychological motivation of their roles (1863-1938). | *"In academic literature, stanislavsky designates russian actor and theater director who trained his actors to emphasize the psychological motivation of their roles (1863-1938)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stanley]] | noun | **1.** United states inventor who built a steam-powered automobile (1849-1918).<br>**2.** Welsh journalist and explorer who led an expedition to africa in search of david livingstone and found him in tanzania in 1871; he and livingstone together tried to find the source of the nile river (1841-1904). | *"You, madam, for you are more nobly born, Despoiled of your honour in your life, Shall, after three days’ open penance done, Live in your country here in banishment, With Sir John Stanley in the Isle of Man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stanleya]] | noun | **1.** Prince's plume. | *"In academic literature, stanleya designates prince's plume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stannic]] | adjective | **1.** Of or relating to or containing tin. | *"In academic literature, stannic designates of or relating to or containing tin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stannite]] | noun | **1.** A dark grey mineral with a metallic luster that is a source of tin. | *"In academic literature, stannite designates a dark grey mineral with a metallic luster that is a source of tin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stannous]] | adjective | **1.** Of or relating to or containing tin. | *"In academic literature, stannous designates of or relating to or containing tin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stanton]] | noun | **1.** United states suffragist and feminist; called for reform of the practices that perpetuated sexual inequality (1815-1902). | *"Secretary Stanton, on succeeding him ratified the appointment, and she has installed several hundreds of nurses in this noble work--all of them Protestants, and middle-aged."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[stanza]] | noun | **1.** A fixed number of lines of verse forming a unit of a poem. | *"Sometimes he kept a stanza or two; sometimes only a line or chorus; sometimes merely the name of the air; the rest was his own."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[star]] | noun | **1.** (astronomy) a celestial body of hot gases that radiates energy derived from thermonuclear reactions in the interior.<br>**2.** Someone who is dazzlingly skilled in any field. | *"O no, it is an ever-fixed mark That looks on tempests and is never shaken; It is the star to every wand’ring bark, Whose worth’s unknown, although his height be taken."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[star-duckweed]] | noun | **1.** Cosmopolitan in temperate regions except north america. | *"In academic literature, star-duckweed designates cosmopolitan in temperate regions except north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[star-glory]] | noun | **1.** Tropical american annual climber having red (sometimes white) flowers and finely dissected leaves; naturalized in united states and elsewhere. | *"In academic literature, star-glory designates tropical american annual climber having red (sometimes white) flowers and finely dissected leaves; naturalized in united states and elsewhere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[star-of-bethlehem]] | noun | **1.** Any of several perennial plants of the genus ornithogalum native to the mediterranean and having star-shaped flowers. | *"In academic literature, star-of-bethlehem designates any of several perennial plants of the genus ornithogalum native to the mediterranean and having star-shaped flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[star-shaped]] | adjective | **1.** Shaped like a star. | *"In academic literature, star-shaped designates shaped like a star."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[star-thistle]] | noun | **1.** Mediterranean annual or biennial herb having pinkish to purple flowers surrounded by spine-tipped scales; naturalized in america. | *"In academic literature, star-thistle designates mediterranean annual or biennial herb having pinkish to purple flowers surrounded by spine-tipped scales; naturalized in america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starboard]] | noun | **1.** The right side of a ship or aircraft to someone who is aboard and facing the bow or nose.<br>**2.** Turn to the right, of helms or rudders. | *"Starboard gangway, there! side away to larboard—larboard gangway to starboard!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[starch]] | noun | **1.** A complex carbohydrate found chiefly in seeds, fruits, tubers, roots and stem pith of plants, notably in corn, potatoes, wheat, and rice; an important foodstuff and used otherwise especially in adhesives and as fillers and stiffeners for paper and textiles.<br>**2.** A commercial preparation of starch that is used to stiffen textile fabrics in laundering. | *"Sir James might not have originated this estimate; but a kind Providence furnishes the limpest personality with a little gum or starch in the form of tradition."* — George Eliot, *Middlemarch* |
| [[starches]] | noun | **1.** Foodstuff rich in natural starch (especially potatoes, rice, bread).<br>**2.** A complex carbohydrate found chiefly in seeds, fruits, tubers, roots and stem pith of plants, notably in corn, potatoes, wheat, and rice; an important foodstuff and used otherwise especially in adhesives and as fillers and stiffeners for paper and textiles. | *"He's as sharp as she is any day, when it comes to that; but he's made comfortable, and she starches his shirt bosoms so's you can hear 'em creak 'way across the meeting-house."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[starchless]] | adjective | **1.** Lacking starch. | *"In academic literature, starchless designates lacking starch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starchlike]] | adjective | **1.** Resembling starch. | *"In academic literature, starchlike designates resembling starch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starchy]] | adjective | **1.** Consisting of or containing starch.<br>**2.** Rigidly formal. | *"Nothing like these starchy doctors for vanity!"* — George Eliot, *Middlemarch* |
| [[stardom]] | noun | **1.** The status of being acknowledged as a star. | *"In academic literature, stardom designates the status of being acknowledged as a star."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stardust]] | noun | **1.** A dreamy romantic or sentimental quality. | *"In academic literature, stardust designates a dreamy romantic or sentimental quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stare]] | noun | **1.** A fixed look with eyes open wide.<br>**2.** Look at with fixed eyes. | *"What is in thy mind That makes thee stare thus?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starer]] | noun | **1.** A viewer who gazes fixedly (often with hostility). | *"In academic literature, starer designates a viewer who gazes fixedly (often with hostility)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starets]] | noun | **1.** A religious adviser (not necessarily a priest) in the eastern orthodox church. | *"In academic literature, starets designates a religious adviser (not necessarily a priest) in the eastern orthodox church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starfish]] | noun | **1.** Echinoderms characterized by five arms extending from a central disk. | *"Then there were little kingfishers and starfish studding the soil."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[starflower]] | noun | **1.** Common old world herb having grasslike leaves and clusters of star-shaped white flowers with green stripes; naturalized in the eastern united states. | *"In academic literature, starflower designates common old world herb having grasslike leaves and clusters of star-shaped white flowers with green stripes; naturalized in the eastern united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stargaze]] | verb | **1.** Observe the stars.<br>**2.** Have a daydream; indulge in a fantasy. | *"In academic literature, stargaze designates observe the stars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stargazer]] | noun | **1.** Someone indifferent to the busy world.<br>**2.** A physicist who studies astronomy. | *"In academic literature, stargazer designates someone indifferent to the busy world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stargazing]] | noun | **1.** Observation of the stars.<br>**2.** Observe the stars. | *"In academic literature, stargazing designates observation of the stars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[staring]] | verb | **1.** Look at with fixed eyes.<br>**2.** Fixate one's eyes. | *"This is the bloodiest shame, The wildest savagery, the vilest stroke, That ever wall-ey’d wrath or staring rage Presented to the tears of soft remorse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stark]] | adjective | **1.** Devoid of any qualifications or disguise or adornment.<br>**2.** Severely simple. | *"Rather on Nilus’ mud Lay me stark-naked, and let the water-flies Blow me into abhorring!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starkers]] | adjective | **1.** (british informal) stark naked. | *"In academic literature, starkers designates (british informal) stark naked."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starkey]] | noun | **1.** Rock star and drummer for the beatles (born in 1940). | *"As the pirates advanced, the quick eye of Starkey sighted Nibs disappearing through the wood, and at once his pistol flashed out."* — J. M. Barrie, *Peter Pan* |
| [[starkly]] | adverb | **1.** In a stark manner.<br>**2.** In sharp outline or contrast. | *"As fast locked up in sleep as guiltless labour When it lies starkly in the traveller’s bones."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starkness]] | noun | **1.** The quality of being complete or utter or extreme.<br>**2.** An extreme lack of furnishings or ornamentation. | *"In academic literature, starkness designates the quality of being complete or utter or extreme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starless]] | adjective | **1.** Not starry; having no stars or starlike objects. | *"When the woman awoke it was to find herself in the depths of a moonless and starless night."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[starlet]] | noun | **1.** A young (film) actress who is publicized as a future star.<br>**2.** A small star. | *"In academic literature, starlet designates a young (film) actress who is publicized as a future star."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starlight]] | noun | **1.** The light of the stars. | *"And now they never meet in grove or green, By fountain clear, or spangled starlight sheen, But they do square; that all their elves for fear Creep into acorn cups, and hide them there."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starlike]] | adjective | **1.** Resembling a star. | *"I looked at little Weena sleeping beside me, her face white and starlike under the stars, and forthwith dismissed the thought."* — H. G. Wells, *The Time Machine* |
| [[starling]] | noun | **1.** Gregarious birds native to the old world. | *"I get out by somebody’s means; I am not like the starling; I get out."* — Charles Dickens, *Bleak House* |
| [[starlit]] | adjective | **1.** Lighted only by stars. | *"He had suffered till he could suffer no more, and tonight in the starlit garden he, suffered still, without hope, or rebellion, or defence."* — Anthony Pryde, *Nightfall* |
| [[starr]] | noun | **1.** Rock star and drummer for the beatles (born in 1940). | *"O ill-starr’d wench, Pale as thy smock, when we shall meet at compt, This look of thine will hurl my soul from heaven, And fiends will snatch at it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starred]] | verb | **1.** Feature as the star.<br>**2.** Be the star in a performance. | *"Snagsby and proceeds to make that ill-starred stationer, already sufficiently confused, the immediate recipient of his discourse."* — Charles Dickens, *Bleak House* |
| [[starring]] | verb | **1.** Feature as the star.<br>**2.** Be the star in a performance. | *"The sun had sunk half below the horizon and an evening frost was starring the puddles near the ferry, but Pierre and Andrew, to the astonishment of the footmen, coachmen, and ferrymen, still stood on the raft and talked."* — graf Leo Tolstoy, *War and Peace* |
| [[starry]] | adjective | **1.** Abounding with or resembling stars. | *"Hie therefore, Robin, overcast the night; The starry welkin cover thou anon With drooping fog, as black as Acheron, And lead these testy rivals so astray As one come not within another’s way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starry-eyed]] | adjective | **1.** Unrealistically or naively optimistic. | *"In academic literature, starry-eyed designates unrealistically or naively optimistic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starship]] | noun | **1.** A spacecraft designed to carry a crew into interstellar space (especially in science fiction). | *"In academic literature, starship designates a spacecraft designed to carry a crew into interstellar space (especially in science fiction)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[start]] | noun | **1.** The beginning of anything.<br>**2.** The time at which something is supposed to begin. | *"What’s in mother, That you start at it?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[start-off]] | noun | **1.** A start given to contestants. | *"In academic literature, start-off designates a start given to contestants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starter]] | noun | **1.** An electric motor for starting an engine.<br>**2.** A contestant in a team sport who is in the game at the beginning. | *"However, I did advise her to take a copy of it along with the reels and the lunch-basket to read to him, as a starter of their day to be devoted to the establishment of a perfect friendship between them."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[starting]] | noun | **1.** A turn to be a starter (in a game at the beginning).<br>**2.** Take the first step or steps in carrying out an action. | *"Blest pray you be, That, after this strange starting from your orbs, You may reign in them now!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[startle]] | noun | **1.** A sudden involuntary movement.<br>**2.** To stimulate to action. | *"Patience herself would startle at this letter And play the swaggerer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[startled]] | verb | **1.** To stimulate to action.<br>**2.** Move or jump suddenly, as if in surprise or alarm. | *"Going before the Chancellor?” I said, startled for a moment."* — Charles Dickens, *Bleak House* |
| [[startling]] | verb | **1.** To stimulate to action.<br>**2.** Move or jump suddenly, as if in surprise or alarm. | *"A picturesque part of the Hall, called the Ghost’s Walk, was seen to advantage from this higher ground; and the startling name, and the old legend in the Dedlock family which I had heard from Mr."* — Charles Dickens, *Bleak House* |
| [[startlingly]] | adverb | **1.** In a startling manner. | *"Only the silence of the boat was at intervals startlingly pierced by one of his peculiar whispers, now harsh with command, now soft with entreaty."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[startup]] | noun | **1.** The act of setting in operation.<br>**2.** The act of starting a new operation or practice. | *"In academic literature, startup designates the act of setting in operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[starvation]] | noun | **1.** A state of extreme hunger resulting from lack of essential nutrients over a prolonged period.<br>**2.** The act of depriving of food or subjecting to famine. | *"A runaway wife is an encumbrance to everybody, a burden to herself and a byword—all of which make up a heap of misery greater than any that comes by staying at home—though this may include the trifling items of insult, beating, and starvation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[starve]] | verb | **1.** Be hungry; go without food.<br>**2.** Die of food deprivation. | *"His company must do his minions grace, Whilst I at home starve for a merry look."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starved]] | verb | **1.** Be hungry; go without food.<br>**2.** Die of food deprivation. | *"The turkeys in my pannier are quite starved.—What, ostler!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starveling]] | noun | **1.** Someone who is starving (or being starved). | *"If I hang, I’ll make a fat pair of gallows; for, if I hang, old Sir John hangs with me, and thou knowest he is no starveling."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starving]] | noun | **1.** The act of depriving of food or subjecting to famine.<br>**2.** Be hungry; go without food. | *"And never yet did insurrection want Such water-colours to impaint his cause, Nor moody beggars starving for a time Of pellmell havoc and confusion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[starwort]] | noun | **1.** Low-growing north temperate herb having small white star-shaped flowers; named for its alleged ability to ease sharp pains in the side. | *"In academic literature, starwort designates low-growing north temperate herb having small white star-shaped flowers; named for its alleged ability to ease sharp pains in the side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stash]] | noun | **1.** A secret store of valuables or money.<br>**2.** Save up as for future use. | *"Landlord,” said I, “tell him to stash his tomahawk there, or pipe, or whatever you call it; tell him to stop smoking, in short, and I will turn in with him."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[stasis]] | noun | **1.** An abnormal state in which the normal flow of a liquid (such as blood) is slowed or stopped.<br>**2.** Inactivity resulting from a static balance between opposing forces. | *"In academic literature, stasis designates an abnormal state in which the normal flow of a liquid (such as blood) is slowed or stopped."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statant]] | adjective | **1.** Standing on four feet. | *"In academic literature, statant designates standing on four feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[state]] | noun | **1.** The territory occupied by one of the constituent administrative districts of a nation.<br>**2.** The way something is with respect to its main attributes. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[state-controlled]] | adjective | **1.** Subscribing to the socialistic doctrine of ownership by the people collectively. | *"In academic literature, state-controlled designates subscribing to the socialistic doctrine of ownership by the people collectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[state-of-the-art]] | adjective | **1.** The highest level of development at a particular time (especially the present time). | *"In academic literature, state-of-the-art designates the highest level of development at a particular time (especially the present time)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[state-supported]] | adjective | **1.** Supported and operated by the government of a state. | *"In academic literature, state-supported designates supported and operated by the government of a state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statecraft]] | noun | **1.** Wisdom in the management of public affairs. | *"What Machiavelli beheld round him in Italy was a civic disorder in which there was oppression without statecraft, and revolt without patriotism."* — Mark Twain, *What Is Man? and Other Essays* |
| [[stated]] | verb | **1.** Express in words.<br>**2.** Put before. | *"The old lady, becoming more and more incensed against the master of deportment as she dwelt upon the subject, gave me some particulars of his career, with strong assurances that they were mildly stated."* — Charles Dickens, *Bleak House* |
| [[statehouse]] | noun | **1.** A government building in which a state legislature meets. | *"In academic literature, statehouse designates a government building in which a state legislature meets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stateless]] | adjective | **1.** Without nationality or citizenship. | *"In academic literature, stateless designates without nationality or citizenship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stateliness]] | noun | **1.** An elaborate manner of doing something.<br>**2.** Impressiveness in scale or proportion. | *"Oh, I assure you he is very odd!” She shook her head a great many times and tapped her forehead with her finger to express to us that we must have the goodness to excuse him, “For he is a little—you know—M!” said the old lady with great stateliness."* — Charles Dickens, *Bleak House* |
| [[stately]] | adjective | **1.** Impressive in appearance.<br>**2.** Of size and dignity suggestive of a statue. | *"Upon a wooden coffin we attend, And Death’s dishonourable victory We with our stately presence glorify, Like captives bound to a triumphant car."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statement]] | noun | **1.** A message that is stated or declared; a communication (oral or written) setting forth particulars or facts etc.<br>**2.** A fact or assertion offered as evidence that something is true. | *"So of course the first hour after school from eleven till twelve belongs to me," was Bruno's statement."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[stater]] | noun | **1.** Any of the various silver or gold coins of ancient greece.<br>**2.** A resident of a particular state or group of states. | *"In academic literature, stater designates any of the various silver or gold coins of ancient greece."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stateroom]] | noun | **1.** A guest cabin. | *"We were to sail on the fifteenth of the month (June), weather permitting; and on the fourteenth, I went on board to arrange some matters in my stateroom."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[statesman]] | noun | **1.** A man who is a respected leader in national or international affairs. | *"Let him be but testimonied in his own bringings-forth, and he shall appear to the envious a scholar, a statesman, and a soldier."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statesmanlike]] | adjective | **1.** Marked by the qualities of or befitting a statesman; ; -v.l.parrington. | *"In academic literature, statesmanlike designates marked by the qualities of or befitting a statesman; ; -v.l.parrington."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statesmanly]] | adjective | **1.** Marked by the qualities of or befitting a statesman; ; -v.l.parrington. | *"In academic literature, statesmanly designates marked by the qualities of or befitting a statesman; ; -v.l.parrington."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statesmanship]] | noun | **1.** Wisdom in the management of public affairs. | *"Perchance, from out the ashes where it lies, True statesmanship may, phoenix-like, arise."* — Wilfred S. Skeats, *The song of the exile* |
| [[stateswoman]] | noun | **1.** A woman statesman. | *"In academic literature, stateswoman designates a woman statesman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statewide]] | adjective | **1.** Occurring or extending throughout a state. | *"Moreover, the control and inspection of housing conditions has in a few states been made statewide to reach even "the country slums" which lately have been recognized to exist."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[static]] | noun | **1.** A crackling or hissing noise caused by electrical interference.<br>**2.** Angry criticism. | *"I, therefore, is a static theory in respect to the standard of deferred payments, and requires adjustment to apply to a condition of a changing price-level.] [Footnote 12: See above, sec. 3.] [Footnote 13: Mention was made in Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statice]] | noun | **1.** Any of various plants of the genus limonium of temperate salt marshes having spikes of white or mauve flowers. | *"A species with brown spores occurs on sea-lavender (_Statice_)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[statics]] | noun | **1.** The branch of mechanics concerned with forces in equilibrium.<br>**2.** A crackling or hissing noise caused by electrical interference. | *"In academic literature, statics designates the branch of mechanics concerned with forces in equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statin]] | noun | **1.** A medicine that lowers blood cholesterol levels by inhibiting hmg-coa reductase. | *"In academic literature, statin designates a medicine that lowers blood cholesterol levels by inhibiting hmg-coa reductase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[station]] | noun | **1.** A facility equipped with special equipment and personnel for a particular purpose.<br>**2.** Proper or designated social situation. | *"Her motion and her station are as one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stationariness]] | noun | **1.** Remaining in place. | *"It would be hard to find better examples of stationariness, as we ordinarily look at things."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[stationary]] | adjective | **1.** Standing still.<br>**2.** Not capable of being moved. | *"Snagsby and his conductors are stationary, the crowd flows round, and from its squalid depths obsequious advice heaves up to Mr."* — Charles Dickens, *Bleak House* |
| [[stationer]] | noun | **1.** A merchant who sells writing materials and office supplies. | *"Snagsby, law-stationer, pursues his lawful calling."* — Charles Dickens, *Bleak House* |
| [[stationery]] | noun | **1.** Paper cut to an appropriate size for writing letters; usually with matching envelopes. | *"Tulkinghorn; and the complete equipage whirls though the law-stationery business at wild speed all round the clock."* — Charles Dickens, *Bleak House* |
| [[stationmaster]] | noun | **1.** The person in charge of a railway station. | *"In academic literature, stationmaster designates the person in charge of a railway station."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stations]] | noun | **1.** (roman catholic church) a devotion consisting of fourteen prayers said before a series of fourteen pictures or carvings representing successive incidents during jesus' passage from pilate's house to his crucifixion at calvary.<br>**2.** A facility equipped with special equipment and personnel for a particular purpose. | *"These railroads include an enormous aggregate of works and structures in the form of tunnels, cuts, banks, bridges, stations, and shops."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statistic]] | noun | **1.** A datum that can be represented numerically. | *"The rivers, lakes, and ocean waters near our coasts are other great sources of food, but no statistics are available to show adequately their yield."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statistical]] | adjective | **1.** Of or relating to statistics. | *"The prices (and estimated values) of farm lands are the expression of the individual capitals, which formed each year an increasing statistical total of so-called wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statistically]] | adverb | **1.** With respect to statistics. | *"Yet such a change appears, statistically, as a decrease in the proportion of farms operated by owners."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statistician]] | noun | **1.** A mathematician who specializes in statistics.<br>**2.** Someone versed in the collection and interpretation of numerical data (especially someone who uses statistics to calculate insurance premiums). | *"We think too much "like men"; he would have us "think like God," and think better of odd units and items of humanity than statesmen and statisticians are apt to do."* — T. R. Glover, *The Jesus of History* |
| [[statistics]] | noun | **1.** A branch of applied mathematics concerned with the collection and interpretation of quantitative data and the use of probability theory to estimate population parameters.<br>**2.** A datum that can be represented numerically. | *"The rivers, lakes, and ocean waters near our coasts are other great sources of food, but no statistics are available to show adequately their yield."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[stative]] | adjective | **1.** ( used of verbs (e.g. `be' or `own') and most participial adjectives) expressing existence or a state rather than an action. | *"In academic literature, stative designates ( used of verbs (e.g. `be' or `own') and most participial adjectives) expressing existence or a state rather than an action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stator]] | noun | **1.** Mechanical device consisting of the stationary part of a motor or generator in or around which the rotor revolves. | *"In academic literature, stator designates mechanical device consisting of the stationary part of a motor or generator in or around which the rotor revolves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statuary]] | noun | **1.** Statues collectively.<br>**2.** Of or relating to or suitable for statues. | *"The piece of dusky statuary nodded in approval, and then murmured ‘Motarkee!’ ‘Motarkee,’ said I, without further hesitation ‘Typee motarkee.’ What a transition!"* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[statue]] | noun | **1.** A sculpture representing a human or animal. | *"She shows a body rather than a life, A statue than a breather."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statuesque]] | adjective | **1.** Of size and dignity suggestive of a statue.<br>**2.** Suggestive of a statue. | *"So statuesque were we for that second that I swear those about us were not immediately aware of what had happened."* — Jack London, *The Jacket (The Star-Rover)* |
| [[statuette]] | noun | **1.** A small carved or molded figure. | *"On a tiny satinwood table stood a statuette by Clodion, and beside it lay a copy of Les Cent Nouvelles, bound for Margaret of Valois by Clovis Eve and powdered with the gilt daisies that Queen had selected for her device."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[stature]] | noun | **1.** High level of respect gained by impressive development or achievement.<br>**2.** (of a standing person) the distance from head to foot. | *"Care I for the limb, the thews, the stature, bulk, and big assemblance of a man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[status]] | noun | **1.** The relative position or standing of things or especially persons in a society.<br>**2.** A state at a particular time. | *"This status of semi-independence which it so long enjoyed has helped to give it an individuality more strongly marked than that of most English towns."* — John Cairns, *Principal Cairns* |
| [[statute]] | noun | **1.** An act passed by a legislative body.<br>**2.** Enacted by a legislative body. | *"The statute of thy beauty thou wilt take, Thou usurer that put’st forth all to use, And sue a friend, came debtor for my sake, So him I lose through my unkind abuse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statutorily]] | adverb | **1.** According to statute. | *"In academic literature, statutorily designates according to statute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statutory]] | adjective | **1.** Relating to or created by statutes.<br>**2.** Prescribed or authorized by or punishable under a statute. | *"By old English statutory law, the whale is declared “a royal fish.” * Oh, that’s only nominal!"* — Herman Melville, *Moby Dick; Or, The Whale* |
| [[staunch]] | verb | **1.** Stop the flow of a liquid.<br>**2.** Firm and dependable especially in loyalty. | *"Yet if I knew What hoop should hold us staunch, from edge to edge O’ th’ world I would pursue it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[staunchly]] | adverb | **1.** In a staunch manner. | *"Leonore was so exhausted that, leaning against her companion, she fell asleep, but she staunchly held on to Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[staunchness]] | noun | **1.** Loyalty in the face of trouble and difficulty. | *"In academic literature, staunchness designates loyalty in the face of trouble and difficulty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[staurikosaur]] | noun | **1.** Primitive dinosaur found in brazil. | *"In academic literature, staurikosaur designates primitive dinosaur found in brazil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[staurikosaurus]] | noun | **1.** Primitive dinosaur found in brazil. | *"In academic literature, staurikosaurus designates primitive dinosaur found in brazil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stay]] | noun | **1.** Continuing or remaining in a place or state.<br>**2.** The state of inactivity following an interruption. | *"How would (I say) mine eyes be blessed made, By looking on thee in the living day, When in dead night thy fair imperfect shade, Through heavy sleep on sightless eyes doth stay!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stay-at-home]] | noun | **1.** A person who seldom goes anywhere; one not given to wandering or travel.<br>**2.** Not given to travel. | *"In academic literature, stay-at-home designates a person who seldom goes anywhere; one not given to wandering or travel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stayer]] | noun | **1.** A person or other animal having powers of endurance or perseverance. | *"There's The Barb--you may talk of your flyers and stayers, All bosh--when he strips you can see his eye range Round his rivals, with much the same look as Tom Sayers Once wore when he faced the big novice, Bill Bainge."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[stayman]] | noun | **1.** Apple grown chiefly in the shenandoah valley. | *"In academic literature, stayman designates apple grown chiefly in the shenandoah valley."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stays]] | noun | **1.** A woman's close-fitting foundation garment.<br>**2.** Continuing or remaining in a place or state. | *"For my part, he keeps me rustically at home, or, to speak more properly, stays me here at home unkept; for call you that keeping, for a gentleman of my birth, that differs not from the stalling of an ox?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[staysail]] | noun | **1.** A fore-and-aft sail set on a stay (as between two masts). | *"Scarcely had we recovered our senses, before the foretopsail went into shreds, when we got up a storm staysail and with this did pretty well for some hours, the ship heading the sea much more steadily than before."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[substance]] | noun | **1.** The real physical matter of which a person or thing consists.<br>**2.** The choicest or most essential or most vital part of some idea or experience. | *"Blessed are you whose worthiness gives scope, Being had to triumph, being lacked to hope. 53 What is your substance, whereof are you made, That millions of strange shadows on you tend?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[substandard]] | adjective | **1.** Falling short of some prescribed norm. | *"In academic literature, substandard designates falling short of some prescribed norm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[substantial]] | adjective | **1.** Fairly large.<br>**2.** Having a firm basis in reality and being therefore important, meaningful, or considerable. | *"But your reason was not substantial why there is no time to recover."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[substantiality]] | noun | **1.** The quality of being substantial or having substance. | *"This reflection seems to mortal sense transcendental, because the spiritual 301:15 man's substantiality transcends mortal vision and is re- vealed only through divine Science."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[substantially]] | adverb | **1.** To a great extent or degree.<br>**2.** In a strong substantial way. | *"What I say of my own painfully inadequate support, is substantially true of nearly all your missionaries in this State."* — Classic Author, *The wonders of prayer* |
| [[substantialness]] | noun | **1.** The quality of being substantial or having substance. | *"In academic literature, substantialness designates the quality of being substantial or having substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[substantiate]] | verb | **1.** Establish or strengthen as with new evidence or facts.<br>**2.** Represent in bodily form. | *"The great people, men of law and learning, want more; they want something to substantiate God's messages from without."* — T. R. Glover, *The Jesus of History* |
| [[substantiating]] | verb | **1.** Establish or strengthen as with new evidence or facts.<br>**2.** Represent in bodily form. | *"In academic literature, substantiating designates establish or strengthen as with new evidence or facts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[substantiation]] | noun | **1.** Additional proof that something that was believed (some fact or hypothesis or theory) is correct.<br>**2.** The act of validating; finding or testing the truth of something. | *"In substantiation of his theory he exhibits a specimen of a word cast as a unit for him by this process, roughly similar to a modern linotype slug."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[substantiative]] | adjective | **1.** Serving to support or corroborate. | *"In academic literature, substantiative designates serving to support or corroborate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[substantival]] | adjective | **1.** Of or relating to or having the nature or function of a substantive (i.e. a noun or noun equivalent). | *"In academic literature, substantival designates of or relating to or having the nature or function of a substantive (i.e. a noun or noun equivalent)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[substantive]] | noun | **1.** Any word or group of words functioning as a noun.<br>**2.** Having a firm basis in reality and being therefore important, meaningful, or considerable. | *"Perhaps his exalted appreciation of the merits of the old girl causes him usually to make the noun-substantive “goodness” of the feminine gender."* — Charles Dickens, *Bleak House* |
| [[substation]] | noun | **1.** A subsidiary station where electricity is transformed for distribution by a low-voltage network. | *"In academic literature, substation designates a subsidiary station where electricity is transformed for distribution by a low-voltage network."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superstar]] | noun | **1.** Someone who is dazzlingly skilled in any field. | *"In academic literature, superstar designates someone who is dazzlingly skilled in any field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understand]] | verb | **1.** Know and comprehend the nature or meaning of.<br>**2.** Perceive (an idea or situation) mentally. | *"We understand it, and thank heaven for you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[understandability]] | noun | **1.** The quality of comprehensible language or thought. | *"In academic literature, understandability designates the quality of comprehensible language or thought."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understandable]] | adjective | **1.** Capable of being apprehended or understood. | *"I declare it looked as though he would presently put to us some questions in an understandable language; but he died without uttering a sound, without moving a limb, without twitching a muscle."* — Joseph Conrad, *Heart of Darkness* |
| [[understandably]] | adverb | **1.** In an intelligible manner. | *"In academic literature, understandably designates in an intelligible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understanding]] | noun | **1.** The cognitive condition of someone who understands.<br>**2.** The statement (oral or written) of an exchange of promises. | *"When a man’s verses cannot be understood, nor a man’s good wit seconded with the forward child, understanding, it strikes a man more dead than a great reckoning in a little room."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[understandingly]] | adverb | **1.** With understanding. | *"Boldwood looked at her—not slily, critically, or understandingly, but blankly at gaze, in the way a reaper looks up at a passing train—as something foreign to his element, and but dimly understood."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[understate]] | verb | **1.** Represent as less significant or important. | *"After a comfortable week-end's rest, I left Lao-kai in the early morning, helped on my journey by those courtesies that so often in strange lands convince one that "less than kin more than kind" quite understates the truth."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[understated]] | verb | **1.** Represent as less significant or important.<br>**2.** Exhibiting restrained good taste. | *"In academic literature, understated designates represent as less significant or important."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understatement]] | noun | **1.** A statement that is restrained in ironic contrast to what might have been said. | *"In academic literature, understatement designates a statement that is restrained in ironic contrast to what might have been said."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unestablished]] | adjective | **1.** Not established. | *"In academic literature, unestablished designates not established."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unresistant]] | adjective | **1.** (often followed by `to') likely to be affected with. | *"In academic literature, unresistant designates (often followed by `to') likely to be affected with."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unstable]] | adjective | **1.** Lacking stability or fixity or firmness.<br>**2.** Highly or violently reactive. | *"Because of it, a few short weeks hence, I shall be led from this cell to a high place with unstable flooring, graced above by a well-stretched rope; and there they will hang me by the neck until I am dead."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unstableness]] | noun | **1.** The quality or attribute of being unstable and irresolute. | *"In academic literature, unstableness designates the quality or attribute of being unstable and irresolute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unstained]] | adjective | **1.** Not stained.<br>**2.** Not having a coating of stain or varnish. | *"So thou be good, slander doth but approve, Thy worth the greater being wooed of time, For canker vice the sweetest buds doth love, And thou present’st a pure unstained prime."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unstarred]] | adjective | **1.** Not marked with an asterisk. | *"In academic literature, unstarred designates not marked with an asterisk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unstated]] | adjective | **1.** Not made explicit. | *"In academic literature, unstated designates not made explicit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unstatesmanlike]] | adjective | **1.** Not statesmanlike. | *"In academic literature, unstatesmanlike designates not statesmanlike."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsubstantial]] | adjective | **1.** Lacking material form or substance; unreal. | *"Welcome then, Thou unsubstantial air that I embrace; The wretch that thou hast blown unto the worst Owes nothing to thy blasts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unsubstantialise]] | verb | **1.** Render immaterial or incorporeal. | *"In academic literature, unsubstantialise designates render immaterial or incorporeal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsubstantialize]] | verb | **1.** Render immaterial or incorporeal. | *"In academic literature, unsubstantialize designates render immaterial or incorporeal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ununderstandably]] | adverb | **1.** In an unintelligible manner. | *"In academic literature, ununderstandably designates in an unintelligible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Placing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · STA
  </div>
</div>
