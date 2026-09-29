---
status: unread
type: root_dashboard
---
# Dashboard — nect
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">nect-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to bind or connect”</span>
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

The root **nect** means to bind or connect. It refers to fastening with a cord, wrapping around something, or enclosing an area. In English, this root forms words such as *knot*, *connect*, *connection*, and *connector*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to bind or connect
> The root **nect** means to bind or connect. It refers to fastening with a cord, wrapping around something, or enclosing an area. In English, this root forms words such as *knot*, *connect*, *connection*, and *connector*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To bind or connect</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong cord wrapping around a bundle and tying it securely together.</mark>
> - **Everyday Connection**: Think of familiar words like *knot* and *connect*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nect** comes from a Latin word that means *"to bind or connect"*.
  - At its core, it describes the action of bind or connect.

- **The Big Picture Idea**:
  - Picture a strong cord wrapping around a bundle and tying it securely together.
  - Whenever you see **nect** in an English word, think of **to bind or connect**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to bind or connect).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Knot**: An everyday English word showing the root's idea of *to bind or connect*.
  - **Connect**: To join, link, or fasten together physically, digitally, or logically.
  - **Connection**: A relationship in which a person, thing, or idea is linked or associated with something else.
  - **Connector**: A device or hardware component that fastens or links two parts together, especially an electrical plug or cable terminal.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nect</mark>, think of <mark class="hl-def">to bind or connect</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via two primary Latin stems:
> - **Present Base (`nect-`):** Produces active verbs of linkage (*connect*, *disconnect*, *reconnect*, *interconnect*).
> - **Participial / Substantive Base (`nex-`):** Produces nouns of territorial acquisition, central junctions, and legal attachment (*annex*, *annexation*, *nexus*, *connexity*).
>
> Prefixes drive the spatial and legal orientation:
> - **con-** (*cum* "together"): *connect*, *connection*, *connective* (binding together).
> - **ad- $\to$ an-** (*ad* "to, toward"): *annex*, *annexation* (binding onto an existing body).
> - **dis-** ("apart, un-"): *disconnect*, *disconnection* (unbinding a link).
> - **inter-** ("between"): *interconnect*, *interconnection* (cross-linking nodes).

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
> - **Physical & Digital Networking:** [[connect]], [[connection]], *connector*, *connectivity*, *interconnect* — telecommunications, Internet routing, highway grids, electrical plugs.
> - **Histology & Anatomy:** [[connective]] (*connective tissue*) — biological matrix supporting and binding anatomical organs.
> - **Geopolitics & Territorial Sovereignty:** [[annex]], *annexation*, *annexational* — unilateral incorporation of foreign lands, provinces, or adjacent parcels.
> - **Systemic Core & Causal Junction:** [[nexus]] — a vital center, causal intersection, or interconnected web of relationships.
> - **Severance & Alienation:** [[disconnect]], *disconnection* — breaking a circuit, emotional detachment, or divergence between policy and reality.
> - **Legal Relatedness:** *connexity* — procedural civil-law doctrine where two related cases are joined before a single court.

---

## 🔀 4. Prefix & Combining Dynamics on nect

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **con-** (*cum*) | together, completely | [[connect]], [[connection]] | Bound together into a unified system or circuit. |
| **ad- $\to$ an-** (*ad*) | to, toward | [[annex]], *annexation* | Bound onto a larger territory or legal document. |
| **dis-** (*dis-*) | un-, apart | [[disconnect]] | To unbind, separate, or break a connection. |
| **inter-** (*inter*) | between, mutually | *interconnect* | To bind mutually across multiple independent nodes. |
| **re-** (*re-*) | again, back | *reconnect* | To restore a severed bond or electrical circuit. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ion** (*-iōnem*) | abstract noun of action | [[connection]], *annexation* | The act, state, or process of linking. |
| **-ive** (*-īvus*) | functional adjective | [[connective]] | Serving to bind or link together tissues or concepts. |
| **-or / -er** | physical agent / hardware | *connector* | A physical plug, cable terminal, or coupling hardware. |
| **-ity** (*-itās*) | state or property noun | *connectivity* | The capacity for or state of being interconnected. |
| **-us** (*-us*) | 4th declension Latin noun | [[nexus]] | A central link, knot, or interconnected cluster. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Computer Science & Telecommunications** | [[connect]], *connectivity*, *interconnect* | TCP/IP network handshakes, optical interconnects, cloud latency. |
| **Anatomy & Histology** | [[connective]] (*connective tissue*) | Collagen fibers, fibroblasts, Marfan syndrome, lupus. |
| **Public International Law & Diplomacy** | [[annex]], *annexation* | Illicit territorial annexation under the UN Charter, treaty annexes. |
| **Sociology & Political Science** | [[nexus]] | The nexus of crime and politics, public-private partnership nexuses. |
| **Psychiatry & Emotional Health** | [[disconnect]] | Dissociative states, emotional disconnect between partners. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[connect]] | verb | **1.** Connect, fasten, or put together two or more pieces.<br>**2.** Make a logical or causal connection. | *"She had no child to connect her with life and happiness again, no relations to assist in the arrangement of perplexed affairs, no health to make all the rest supportable."* — Jane Austen, *Persuasion* |
| [[connected]] | verb | **1.** Connect, fasten, or put together two or more pieces.<br>**2.** Make a logical or causal connection. | *"Apollonie was intimately connected with the earliest impressions of her childhood, as well as with the experiences of her youth, with all the people whom she had loved most and who had stood nearest to her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[connectedness]] | noun | **1.** The state of being connected.<br>**2.** A relation between things or events (as in the case of one causing the other or sharing features with it). | *"In academic literature, connectedness designates the state of being connected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connecter]] | noun | **1.** An instrumentality that connects. | *"In academic literature, connecter designates an instrumentality that connects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connecticut]] | noun | **1.** A new england state; one of the original 13 colonies.<br>**2.** A river in the northeastern united states; flows south from northern new hampshire along the border between new hampshire and vermont and through massachusetts and connecticut where it empties into long island sound. | *"I was brought up religiously as a servant in a family in Connecticut, and from twelve years of age until twenty-three, knew no other home."* — Classic Author, *The wonders of prayer* |
| [[connecticuter]] | noun | **1.** A native or resident of connecticut. | *"In academic literature, connecticuter designates a native or resident of connecticut."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connection]] | noun | **1.** A relation between things or events (as in the case of one causing the other or sharing features with it).<br>**2.** The state of being connected. | *"Bruno now flung behind him all the thoughts and schemes he had had in connection with his coming fate and with all the fire of his nature he fastened on the thought of doing everything in his power to help Salo."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[connective]] | noun | **1.** An uninflected function word that serves to conjoin words or phrases or clauses or sentences.<br>**2.** An instrumentality that connects. | *"In academic literature, connective designates an uninflected function word that serves to conjoin words or phrases or clauses or sentences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connectivity]] | noun | **1.** The property of being connected or the degree to which something has connections. | *"In academic literature, connectivity designates the property of being connected or the degree to which something has connections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[connector]] | noun | **1.** An instrumentality that connects. | *"Once satisfied that a gun emplacement was not booby-trapped, Kumiko inserted random realignment parameters into laser blocks, twirled tracking sequencers into disarray, and switched about chips and connectors."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[disconnect]] | noun | **1.** An unbridgeable disparity (as from a failure of understanding).<br>**2.** Pull the plug of (electrical appliances) and render inoperable. | *"As the last of the six cleared in through the Raven's air lock, Hodak had hit "Emergency," on appropriate switches and the ship-to-station servicing lines went through quick-disconnect."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[disconnected]] | verb | **1.** Pull the plug of (electrical appliances) and render inoperable.<br>**2.** Make disconnected, disjoin or unfasten. | *"His changes of mood did not offend me, because I saw that I had nothing to do with their alternation; the ebb and flow depended on causes quite disconnected with me."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[disconnectedness]] | noun | **1.** State of being disconnected. | *"I used to speculate—but even this with a dim disconnectedness—as to how the rough future (for all futures are rough!) would handle them and might bruise them."* — Henry James, *The Turn of the Screw* |
| [[disconnection]] | noun | **1.** State of being disconnected.<br>**2.** An unbridgeable disparity (as from a failure of understanding). | *"He looked on the operations of nature "in disconnection dull and spiritless;" he could no longer apprehend her unity nor feel her charm."* — F. W. H. Myers, *Wordsworth* |
| [[interconnect]] | verb | **1.** Be interwoven or interconnected.<br>**2.** Cause to be interconnected or interwoven. | *"In academic literature, interconnect designates be interwoven or interconnected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interconnected]] | verb | **1.** Be interwoven or interconnected.<br>**2.** Cause to be interconnected or interwoven. | *"In academic literature, interconnected designates be interwoven or interconnected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interconnectedness]] | noun | **1.** A state of being connected reciprocally. | *"In academic literature, interconnectedness designates a state of being connected reciprocally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interconnection]] | noun | **1.** A state of being connected reciprocally.<br>**2.** (computer science) the act of interconnecting (wires or computers or theories etc.). | *"In academic literature, interconnection designates a state of being connected reciprocally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nectar]] | noun | **1.** A sweet liquid secretion that is attractive to pollinators.<br>**2.** Fruit juice especially when undiluted. | *"Th’imaginary relish is so sweet That it enchants my sense; what will it be When that the wat’ry palate tastes indeed Love’s thrice-repured nectar?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nectar-rich]] | adjective | **1.** Of plants that are rich in nectar. | *"In academic literature, nectar-rich designates of plants that are rich in nectar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nectariferous]] | adjective | **1.** Possessing nectaries. | *"In academic literature, nectariferous designates possessing nectaries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nectarine]] | noun | **1.** Variety or mutation of the peach bearing fruit with smooth skin and (usually) yellow flesh.<br>**2.** A variety or mutation of the peach that has a smooth skin. | *"A broken pane of glass in one of the dirty windows was papered and wafered over, but there was a little plate of hothouse nectarines on the table, and there was another of grapes, and another of sponge-cakes, and there was a bottle of light wine."* — Charles Dickens, *Bleak House* |
| [[nectarous]] | adjective | **1.** Extremely pleasing to the taste; sweet and fragrant. | *"Then did you, chivalrous Terence, hand forth, as to the manner born, that nectarous beverage and you offered the crystal cup to him that thirsted, the soul of chivalry, in beauty akin to the immortals."* — James Joyce, *Ulysses* |
| [[nectary]] | noun | **1.** A gland (often a protuberance or depression) that secretes nectar. | *"In academic literature, nectary designates a gland (often a protuberance or depression) that secretes nectar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[necturus]] | noun | **1.** A genus of proteidae. | *"In academic literature, necturus designates a genus of proteidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconnected]] | adjective | **1.** Not joined or linked together.<br>**2.** Not connected by birth or family. | *"Jellyby’s lambs, being wholly unconnected with Borrioboola-Gha; he is not softened by distance and unfamiliarity; he is not a genuine foreign-grown savage; he is the ordinary home-made article."* — Charles Dickens, *Bleak House* |
| [[unconnectedness]] | noun | **1.** The lack of a connection between things. | *"In academic literature, unconnectedness designates the lack of a connection between things."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · NECT
  </div>
</div>
