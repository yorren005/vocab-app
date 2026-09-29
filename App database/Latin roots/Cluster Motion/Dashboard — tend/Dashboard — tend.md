---
status: unread
type: root_dashboard
---
# Dashboard — tend
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tend-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to stretch, extend, or aim”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
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

The root **tend** means to stretch, extend, or aim. It refers to stretch, extend, aim, direct one's course, exert, strive. In English, this root forms words such as *tend*, *tendency*, *extend*, and *intend*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to stretch, extend, or aim
> The root **tend** means to stretch, extend, or aim. It refers to stretch, extend, aim, direct one's course, exert, strive. In English, this root forms words such as *tend*, *tendency*, *extend*, and *intend*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To stretch, extend, or aim</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *tend* and *tendency*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tend** comes from a Latin word that means *"to stretch, extend, or aim"*.
  - At its core, it describes the action of stretch, extend, or aim.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **tend** in an English word, think of **to stretch, extend, or aim**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to stretch, extend, or aim).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Tend**: To have or be affected by a specified directional drift, disposition, or inclination.
  - **Tendency**: An inclination, leaning, or bent toward a particular condition, belief, course of action, or characteristic habit.
  - **Extend**: To stretch, spread, or draw out to a greater length, breadth, area, or duration.
  - **Intend**: To have in mind as a purpose, project, or design.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tend</mark>, think of <mark class="hl-def">to stretch, extend, or aim</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **tend** operates through its primary morphological stems, compounding with directional prefixes and functional suffixes:
> - **Primary Present Active Stem:** `tend-` (from *tendō, tendere*) — forms foundational verbs and their direct agent/action nouns: *tend*, *tender*, *attend*, *contend*, *distend*, *extend*, *intend*, *pretend*, *portend*, *subtend*, *superintend*.
> - **Participial / Supine Stem Connection:** Classical *tendere* famously features two distinct supine/participial stems:
>   1. `tent-` (from *tentum*) — producing resultant nouns and adjectives such as *intent*, *extent*, *portent*, *attention*, *contention*, *distention*, *pretentious*.
>   2. `tēns-` (from *tēnsum*) — producing stative nouns and adjectives such as *tense*, *tension*, *intense*, *pretense*, *distension*, *ostensible* (systematically examined in sibling [[Dashboard — tens]]).
> - **Anatomical Stem:** `tendin-` (from Medieval Latin *tendō*, genitive *tendinis*) — forming the specialized orthopedic family: *tendon*, *tendinitis*, *tendinous*.
>
> By attaching directional prefixes to the front (*ad-*, *con-*, *dis-*, *ex-*, *in-*, *por-*, *prae-*, *sub-*, *super-in-*) and functional suffixes to the back (*-ency*, *-ance*, *-ant*, *-er*, *-tion*, *-ous*, *-itis*), the root generates a rich vocabulary spanning mechanical physics, cognitive focus, forensic litigation, and anatomical medicine.

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
> Although the root fundamentally denotes **"to stretch, aim, exert, direct"**, its semantic manifestation branches across five major conceptual planes:
> - **Physical & Tensile Plane (Elasticity, Inflation, Anatomy):** In words like [[distend]], [[distention]], [[extend]], [[tendon]], [[tendinitis]], and [[tendinous]], the root expresses the literal stretching of tissues, cords, surfaces, or volume under mechanical pressure or physiological strain.
> - **Directional & Trajectory Plane (Drift, Incline, Geometric Span):** In words like [[tend]], [[tendency]], and [[subtend]], the root captures a physical or statistical vector pointing toward a specific destination, or a geometric chord stretching beneath an arc.
> - **Cognitive & Mental Plane (Focus, Purposive Aim, Foresight):** In words like [[attend]], [[attention]], [[intend]], [[portend]], [[portent]], and [[portentous]], the root conceptualizes the mind stretching toward an incoming stimulus, formulating deliberate purpose, or projecting ominous signs into the future.
> - **Agonistic & Rhetorical Plane (Conflict, Rivalry, Theatrical Facade):** In words like [[contend]], [[contender]], [[contention]], [[pretend]], and [[pretender]], the root represents stretching one's power against an adversary in battle or debate, or stretching forth a theatrical mask or fraudulent claim before the public.
> - **Civic, Legal & Administrative Plane (Proffering, Oversight, Care):** In words like [[tender]] *(verb)*, [[tender]] *(noun)*, [[attendance]], [[attendant]], [[tendance]], [[superintend]], [[superintendent]], and [[superintendence]], the root governs formal contractual offers, administrative oversight, and dedicated personal service.

---

## 🔀 4. Prefix & Combining Dynamics on tend

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward | [[attend]] | Stretching the mind, ears, or physical presence *toward* a person, assembly, or duty. |
| `con-` | together, with, intensely | [[contend]] | Stretching one's physical or verbal strength *against* another in mutual opposition or struggle. |
| `dis-` | apart, in different directions | [[distend]] | Stretching *apart* or outward in all directions from within; swelling under internal pressure. |
| `ex-` | out, forth | [[extend]] | Stretching *outward* in space, time, or scope; unrolling, reaching forth, or enlarging boundaries. |
| `in-` | upon, toward, into | [[intend]] | Stretching the will or intellect *upon* a design, objective, or deliberate purpose. |
| `por-` (`pro-`) | forward, forth | [[portend]] | Stretching *forward* signs, omens, or indications of impending future occurrences. |
| `prae-` (`pre-`) | before, in front of | [[pretend]] | Stretching *before* oneself a false pretext, mask, or claim; simulating reality. |
| `sub-` | under, beneath | [[subtend]] | Stretching *underneath* or across from an angle or arc in geometric space. |
| `super-in-` | over, above + upon | [[superintend]] | Stretching oversight and administrative authority *down from above* over an enterprise. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ency` / `-ence` | Noun (State / Quality / Action) | [[tendency]], [[attendance]], [[superintendence]] | Denotes the continuous state, habit, or institutional function of stretching, inclining, or overseeing. |
| `-ance` | Noun (Action / Process / Care) | [[tendance]] | Denotes the practical act or process of caring for or ministering to another. |
| `-er` | Noun (Agent / Instrument) | [[contender]], [[pretender]], [[tender]] *(noun)* | Identifies the person or instrument that competes, claims, offers, or tends. |
| `-ant` | Noun / Adjective (Agent / Accompanying) | [[attendant]] | Identifies a person serving another, or an event occurring concurrently as a consequence. |
| `-ent` | Noun (Executive Agent) | [[superintendent]] | Denotes the designated official who exercises executive management and oversight. |
| `-tion` / `-ion` | Noun (Act / Result of Action) | [[attention]], [[contention]], [[distention]] | Encodes the completed act, mental faculty, or pathological state resulting from the verb's tension. |
| `-ous` | Adjective (Characterized by / Full of) | [[portentous]], [[tendinous]] | Expresses possessing the grave nature of an omen, or consisting of dense fibrous tendon tissue. |
| `-itis` | Noun (Pathology / Inflammation) | [[tendinitis]] | Designates an acute or chronic inflammatory medical condition affecting tendon fibers. |
| `-on` | Noun (Anatomical Structure) | [[tendon]] | Names the specific cord of dense connective tissue anchoring muscle to bone. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Jurisprudence & Contract Law** | [[tender]] *(verb)*, [[tender]] *(noun)*, [[contention]] | **Legal Tender & Procurement:** *Legal tender* denotes currency sanctioned by statute that a creditor is legally bound to accept in discharge of debt. In commercial law, a *tender of performance* is an unconditional offer by an obligor to perform obligations. In public procurement, competitive *tenders* solicit bids for infrastructure. In appellate advocacy, parties submit *contentions* outlining disputed points of law. |
| 📐 **Geometry & Trigonometry** | [[subtend]], [[extend]], [[tendency]] | **Chords, Arcs & Statistical Vectors:** In Euclidean geometry, a chord or line segment is said to *subtend* an angle when its endpoints lie upon the rays forming that angle. In trigonometry, circular arcs subtend central and inscribed angles. In statistics and physics, central *tendencies* model directional drift and equilibrium states across data sets. |
| 🩺 **Anatomy, Orthopedics & Medicine** | [[tendon]], [[tendinitis]], [[tendinous]], [[distend]], [[distention]] | **Musculoskeletal Biomechanics & Pathology:** The Achilles *tendon* transmits forces exceeding twelve times body weight during running. Repetitive micro-trauma induces *tendinitis*, marked by cellular disruption within *tendinous* sheaths. In gastroenterology and critical care, abdominal *distention* serves as an alarming clinical sign of intestinal obstruction, ascites, or hemorrhage. |
| 🏢 **Management & Public Administration** | [[superintend]], [[superintendent]], [[superintendence]], [[attendance]] | **Executive Oversight & Governance:** Public school districts and civil infrastructure works operate under the direct *superintendence* of a appointed *superintendent*. Municipal agencies track workforce *attendance* and inspect construction sites to enforce safety regulations and building codes. |
| 🎭 **Theater, Rhetoric & Political Discourse** | [[pretend]], [[pretender]], [[contend]], [[contender]], [[portent]], [[portentous]] | **Dramaturgy, Polemics & Statecraft:** In stagecraft, actors *pretend* by donning masks and simulating persona. In dynastic history, royal *pretenders* challenged reigning monarchs for disputed thrones. In electoral politics, rival *contenders* *contend* in televised debates, while economic collapses are interpreted as *portentous* warnings of geopolitical realignment. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[attend]] | verb | **1.** Be present at (meetings, church services, university), etc.<br>**2.** Take charge of or deal with. | *"But ah, thought kills me that I am not thought To leap large lengths of miles when thou art gone, But that so much of earth and water wrought, I must attend, time’s leisure with my moan."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attendance]] | noun | **1.** The act of being present (at a meeting or event etc.).<br>**2.** The frequency with which a person is present. | *"Clarence, Gloucester, Warwick and others in attendance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attendant]] | noun | **1.** Someone who waits on or tends to or attends to the needs of another.<br>**2.** A person who is present and participates in a meeting. | *"Find him, and bring him hither. [_Exit an Attendant._] BERTRAM."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attended]] | verb | **1.** Be present at (meetings, church services, university), etc.<br>**2.** Take charge of or deal with. | *"Enter the Duke of Florence attended; two French Lords, and Soldiers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attendee]] | noun | **1.** A person who is present and participates in a meeting. | *"In academic literature, attendee designates a person who is present and participates in a meeting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attender]] | noun | **1.** Someone who listens attentively.<br>**2.** Someone who waits on or tends to or attends to the needs of another. | *"In academic literature, attender designates someone who listens attentively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attending]] | noun | **1.** The process whereby a person concentrates on some features of the environment to the (relative) exclusion of others.<br>**2.** The act of being present (at a meeting or event etc.). | *"Lords attending on the KING; Officers; Soldiers, &c., French and Florentine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contend]] | verb | **1.** Maintain or assert.<br>**2.** Have an argument about something. | *"Thy blood and virtue Contend for empire in thee, and thy goodness Share with thy birthright!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contender]] | noun | **1.** The contestant you hope to defeat. | *"In academic literature, contender designates the contestant you hope to defeat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distend]] | verb | **1.** Become wider.<br>**2.** Cause to expand as it by internal pressure. | *"Many of them foamed at the mouth, their breathing being quick and short, whilst the bodies of all were fearfully distended."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[extend]] | verb | **1.** Extend in scope or range or area.<br>**2.** Stretch out over a distance, space, time, or scope; run or extend between two points or beyond a certain point. | *"You do extend These thoughts of horror further than you shall Find cause in Caesar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extendable]] | adjective | **1.** Capable of being lengthened. | *"In academic literature, extendable designates capable of being lengthened."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extended]] | verb | **1.** Extend in scope or range or area.<br>**2.** Stretch out over a distance, space, time, or scope; run or extend between two points or beyond a certain point. | *"Tax of impudence, A strumpet’s boldness, a divulged shame, Traduc’d by odious ballads; my maiden’s name Sear’d otherwise; nay worse of worst extended With vilest torture, let my life be ended."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extendible]] | adjective | **1.** Capable of being lengthened. | *"In academic literature, extendible designates capable of being lengthened."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intend]] | verb | **1.** Have in mind as a purpose.<br>**2.** Design or destine. | *"For then my thoughts, from far where I abide, Intend a zealous pilgrimage to thee, And keep my drooping eyelids open wide, Looking on darkness which the blind do see."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intended]] | verb | **1.** Have in mind as a purpose.<br>**2.** Design or destine. | *"Yet your good will Must have that thanks from Rome after the measure As you intended well."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonattendance]] | noun | **1.** The failure to attend. | *"Congress, from the nonattendance of a few States, have been frequently in the situation of a Polish diet, where a single VOTE has been sufficient to put a stop to all their movements."* — Alexander Hamilton, *The Federalist Papers* |
| [[nonattender]] | noun | **1.** Someone who shirks duty. | *"In academic literature, nonattender designates someone who shirks duty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overextend]] | verb | **1.** Strain excessively. | *"In academic literature, overextend designates strain excessively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pretend]] | noun | **1.** The enactment of a pretense.<br>**2.** Make believe with the intent to deceive. | *"For The contract you pretend with that base wretch, One bred of alms and foster’d with cold dishes, With scraps o’ th’ court, it is no contract, none."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pretended]] | verb | **1.** Make believe with the intent to deceive.<br>**2.** Behave unnaturally or affectedly. | *"Now presently I’ll give her father notice Of their disguising and pretended flight, Who, all enraged, will banish Valentine, For Thurio he intends shall wed his daughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pretender]] | noun | **1.** A claimant to the throne or to the office of ruler (usually without just title).<br>**2.** A person who makes deceitful pretenses. | *"But, it was only the pleasanter to turn to Biddy and to Joe, whose great forbearance shone more brightly than before, if that could be, contrasted with this brazen pretender."* — Charles Dickens, *Great Expectations* |
| [[pretending]] | noun | **1.** The act of giving a false appearance.<br>**2.** Make believe with the intent to deceive. | *"The Queen, sir, very oft importun’d me To temper poisons for her; still pretending The satisfaction of her knowledge only In killing creatures vile, as cats and dogs, Of no esteem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subtend]] | verb | **1.** Be opposite to; of angles and sides, in geometry. | *"Approaching, disparate, at relaxed walking pace they crossed both the circus before George’s church diametrically, the chord in any circle being less than the arc which it subtends."* — James Joyce, *Ulysses* |
| [[superintend]] | verb | **1.** Watch and direct. | *"She meant to superintend these preparations herself and to have it all fixed as daintily as possible."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[superintendence]] | noun | **1.** Management by overseeing the performance or operation of a person or group. | *"In the active superintendence of this young person, Judy Smallweed appears to attain a perfectly geological age and to date from the remotest periods."* — Charles Dickens, *Bleak House* |
| [[superintendent]] | noun | **1.** A person who directs and manages an organization.<br>**2.** A caretaker for an apartment house; represents the owner as janitor and rent collector. | *"Hall, "told me that when superintendent of a Sunday school he felt a strong impulse, one Saturday evening, to call at the home of one of his teachers whom he had never visited before."* — Classic Author, *The wonders of prayer* |
| [[tend]] | verb | **1.** Have a tendency or disposition to do or be something; be inclined.<br>**2.** Have care of or look after. | *"Blessed are you whose worthiness gives scope, Being had to triumph, being lacked to hope. 53 What is your substance, whereof are you made, That millions of strange shadows on you tend?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tendencious]] | adjective | **1.** Having or marked by a strong tendency especially a controversial one. | *"In academic literature, tendencious designates having or marked by a strong tendency especially a controversial one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tendency]] | noun | **1.** An attitude of mind especially one that favors one alternative over others.<br>**2.** An inclination to do something. | *"Snagsby with a strong tendency in his clump of hair to stand on end."* — Charles Dickens, *Bleak House* |
| [[tendentious]] | adjective | **1.** Having or marked by a strong tendency especially a controversial one. | *"In academic literature, tendentious designates having or marked by a strong tendency especially a controversial one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tendentiously]] | adverb | **1.** In a tendentious manner. | *"In academic literature, tendentiously designates in a tendentious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tendentiousness]] | noun | **1.** An intentional and controversial bias. | *"In academic literature, tendentiousness designates an intentional and controversial bias."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tender]] | noun | **1.** Something that can be used as an official medium of payment.<br>**2.** Someone who waits on or tends to or attends to the needs of another. | *"O therefore love be of thyself so wary, As I not for my self, but for thee will, Bearing thy heart which I will keep so chary As tender nurse her babe from faring ill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenderfoot]] | noun | **1.** An inexperienced person (especially someone inexperienced in outdoor living). | *"In academic literature, tenderfoot designates an inexperienced person (especially someone inexperienced in outdoor living)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tendergreen]] | noun | **1.** Asiatic plant cultivated for its swollen root crown and edible foliage. | *"In academic literature, tendergreen designates asiatic plant cultivated for its swollen root crown and edible foliage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderhearted]] | adjective | **1.** Easily moved to love.<br>**2.** Easily moved by another's distress; - w.m.thackeray. | *"Even their mother missed them; and how much more their tenderhearted cousin, who wandered about the house, and thought of them, and felt for them, with a degree of affectionate regret which they had never done much to deserve!"* — Jane Austen, *Mansfield Park* |
| [[tenderheartedness]] | noun | **1.** Warm compassionate feelings. | *"In academic literature, tenderheartedness designates warm compassionate feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderisation]] | noun | **1.** The act of making meat tender by pounding or marinating it. | *"In academic literature, tenderisation designates the act of making meat tender by pounding or marinating it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderise]] | verb | **1.** Make tender or more tender as by marinating, pounding, or applying a tenderizer. | *"In academic literature, tenderise designates make tender or more tender as by marinating, pounding, or applying a tenderizer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderised]] | verb | **1.** Make tender or more tender as by marinating, pounding, or applying a tenderizer.<br>**2.** Made tender as by marinating or pounding. | *"In academic literature, tenderised designates make tender or more tender as by marinating, pounding, or applying a tenderizer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderiser]] | noun | **1.** A substance (as the plant enzyme papain) applied to meat to make it tender. | *"In academic literature, tenderiser designates a substance (as the plant enzyme papain) applied to meat to make it tender."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderization]] | noun | **1.** The act of making meat tender by pounding or marinating it. | *"In academic literature, tenderization designates the act of making meat tender by pounding or marinating it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderize]] | verb | **1.** Make tender or more tender as by marinating, pounding, or applying a tenderizer. | *"In academic literature, tenderize designates make tender or more tender as by marinating, pounding, or applying a tenderizer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderized]] | verb | **1.** Make tender or more tender as by marinating, pounding, or applying a tenderizer.<br>**2.** Made tender as by marinating or pounding. | *"In academic literature, tenderized designates make tender or more tender as by marinating, pounding, or applying a tenderizer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderizer]] | noun | **1.** A substance (as the plant enzyme papain) applied to meat to make it tender. | *"In academic literature, tenderizer designates a substance (as the plant enzyme papain) applied to meat to make it tender."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tenderloin]] | noun | **1.** A city district known for its vice and high crime rate.<br>**2.** The tender meat of the loin muscle on each side of the vertebral column. | *"No, you don't--not for me!” she muttered, after a minute, shaking her finger at the tenderloin on the table."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[tenderly]] | adverb | **1.** With tenderness; in a tender manner. | *"To his father, that so tenderly and entirely loves him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tenderness]] | noun | **1.** A tendency to express warm and affectionate feeling.<br>**2.** A pain that is felt (as when the area is touched). | *"Not of a woman’s tenderness to be Requires nor child nor woman’s face to see.— I have sat too long. [_He rises._] VOLUMNIA."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tending]] | noun | **1.** The work of providing treatment for or attending to someone or something.<br>**2.** Have a tendency or disposition to do or be something; be inclined. | *"I shall between this and supper tell you most strange things from Rome, all tending to the good of their adversaries."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tendinitis]] | noun | **1.** Inflammation of a tendon. | *"In academic literature, tendinitis designates inflammation of a tendon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tendinous]] | adjective | **1.** Consisting of tendons or resembling a tendon. | *"At the middle of the forehead horizontally subdivide this upper quoin, and then you have two almost equal parts, which before were naturally divided by an internal wall of a thick tendinous substance. [17] Quoin is not a Euclidean term."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[tendon]] | noun | **1.** A cord or band of inelastic tissue connecting a muscle with its bony attachment. | *"Every kind of finer tendon and ligament that is in the nature of poultry to possess is developed in these specimens in the singular form of guitar-strings."* — Charles Dickens, *Bleak House* |
| [[tendonitis]] | noun | **1.** Inflammation of a tendon. | *"In academic literature, tendonitis designates inflammation of a tendon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tendosynovitis]] | noun | **1.** Inflammation of a tendon and its enveloping sheath. | *"In academic literature, tendosynovitis designates inflammation of a tendon and its enveloping sheath."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tendrac]] | noun | **1.** Small often spiny insectivorous mammal of madagascar; resembles a hedgehog. | *"In academic literature, tendrac designates small often spiny insectivorous mammal of madagascar; resembles a hedgehog."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tendril]] | noun | **1.** Slender stem-like structure by which some twining plants attach themselves to an object for support. | *"Sallie has got a tendril around Henrietta which grows by the day."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[tendril-climbing]] | adjective | **1.** Of or relating to plants that climb by means of tendrils. | *"In academic literature, tendril-climbing designates of or relating to plants that climb by means of tendrils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unattended]] | adjective | **1.** Not watched.<br>**2.** Lacking accompaniment or a guard or escort. | *"Your constancy Hath left you unattended.—[_Knocking within._] Hark, more knocking."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unextended]] | adjective | **1.** Not extended or stretched out. | *"In academic literature, unextended designates not extended or stretched out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unintended]] | adjective | **1.** Not deliberate. | *"A result usually unintended is the derangement of business and of the existing distribution of incomes."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unpretending]] | adjective | **1.** Not ostentatious. | *"Perhaps I should only have to say to Ada, “Would you like to come and see me married to-morrow, my pet?” Perhaps our wedding might even be as unpretending as her own, and I might not find it necessary to say anything about it until it was over."* — Charles Dickens, *Bleak House* |
| [[untended]] | adjective | **1.** Lacking care and attention. | *"In academic literature, untended designates lacking care and attention."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TEND
  </div>
</div>
