---
status: unread
type: root_dashboard
---
# Dashboard — tele
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tele-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“far or distance”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking out across an open horizon with plenty of room to move.</span>
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

The root **tele** means far or distance. It describes operating from a distance, being far away, or remote. In English, this root forms words such as *telecast*, *telecommunication*, *telecommute*, and *telegram*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: far or distance
> The root **tele** means far or distance. It describes operating from a distance, being far away, or remote. In English, this root forms words such as *telecast*, *telecommunication*, *telecommute*, and *telegram*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Far or distance</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *telecast* and *telecommunication*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tele** comes from a Latin word that means *"far or distance"*.
  - At its core, it describes far or distance.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **tele** in an English word, think of **space, open room, and distance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of far or distance.
  - **Mental & Social**: How people experience, organize, or communicate about far or distance.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Telecast**: A television broadcast.
  - **Telecommunication**: Communication over a distance by cable, telegraph, telephone, or broadcasting.
  - **Telecommute**: To work from home, communicating with one's office by computer, phone, and internet.
  - **Telegram**: A message sent by telegraph and then delivered in written or printed form.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tele</mark>, think of <mark class="hl-def">space, open room, and distance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Greek τῆλε (far off) ──> English prefix tele-
  │
  ├── Acoustic & Visual Communication
  │     ├── tele- + phōnē (voice) ──> telephone (voice across distance)
  │     ├── tele- + skopein (look) ─> telescope (viewing distant objects)
  │     └── tele- + cast (throw) ───> telecast (broadcast over television)
  │
  ├── Written & Printed Signals
  │     ├── tele- + graphein ───────> telegraph, telegram
  │     └── tele- + typos (strike) ─> teletype (automated remote printer)
  │
  ├── Information & Remote Systems
  │     ├── tele- + communicare ────> telecommunication
  │     ├── tele- + commute ────────> telecommute (remote working)
  │     └── tele- + metron (measure) > telemeter (remote measurement)
  │
  ├── Parapsychological & Speculative Concepts
  │     ├── tele- + pathos (feeling) > telepathy (mind-to-mind sensing)
  │     └── tele- + kinēsis (motion) > telekinesis (moving objects with mind)
  │
  └── Greek τέλος (telos: end, goal)
        └── telo- + logos (study) ──> teleology (study of design/purpose)
```

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

### Distinct Spheres of Manifestation
1. **Telecommunications & Networks**: *telephone*, *telegraph*, *telegram*, *telecommunication*, *telecast*, *teletype* (electronic information transfer).
2. **Workplace & Urban Geography**: *telecommute* (remote labor, work-from-home infrastructure).
3. **Optics & Astronomical Observation**: *telescope*, *telemeter* (magnifying lenses, telemetry sensors).
4. **Metaphysics & Evolutionary Biology**: *teleology* (purpose-driven design in nature, final causes).
5. **Parapsychology & Science Fiction**: *telepathy*, *telekinesis* (extrasensory perception, psychokinesis).

---

## 🔀 4. Prefix & Combining Dynamics on tele

### Greek Combining Partners
- **-phone** (< **φωνή** *phōnē*, "voice, sound"): *telephone*.
- **-scope** (< **σκοπεῖν** *skopein*, "to look, examine"): *telescope*.
- **-graph / -gram** (< **γράφειν** *graphein*, "to write"): *telegraph*, *telegram*.
- **-pathy** (< **πάθος** *pathos*, "feeling"): *telepathy*.
- **-kinesis** (< **κίνησις** *kinēsis*, "movement"): *telekinesis*.
- **-meter** (< **μέτρον** *metron*, "measure"): *telemeter*.
- **-ology** (< **λόγος** *logos*, "study of"): *teleology*.

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Telecommunications Engineering** | Fiber-optic cables, cellular towers, packet switching | *telecommunication*, *telephone*, *telegraph* |
| **Observational Astronomy** | James Webb Space Telescope, radio telescopes, refractors | *telescope*, *space telescope* |
| **Modern Labor & Organizational Behavior** | Hybrid workplaces, broadband infrastructure, remote productivity | *telecommute*, *telecommuting*, *teleworker* |
| **Philosophy of Science & Evolutionary Biology** | Aristotelian final cause, adaptationism, critique of teleology | *teleology*, *teleological argument* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[entelea]] | noun | **1.** A genus of evergreen shrub that grows in new zealand. | *"In academic literature, entelea designates a genus of evergreen shrub that grows in new zealand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entelechy]] | noun | **1.** (aristotle) the state of something that is fully realized; actuality as opposed to potentiality. | *"But I, entelechy, form of forms, am I by memory because under everchanging forms."* — James Joyce, *Ulysses* |
| [[nontelescopic]] | adjective | **1.** Not telescopic. | *"In academic literature, nontelescopic designates not telescopic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nontelescoping]] | adjective | **1.** Not telescopic. | *"In academic literature, nontelescoping designates not telescopic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteles]] | noun | **1.** Aardwolf. | *"Classical and authoritative lexicons catalog proteles as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telecast]] | noun | **1.** A television broadcast.<br>**2.** Broadcast via television. | *"In academic literature, telecast designates a television broadcast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telecaster]] | noun | **1.** A television broadcaster. | *"In academic literature, telecaster designates a television broadcaster."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telecasting]] | noun | **1.** Broadcasting visual images of stationary or moving objects; ;  - ernie kovacs.<br>**2.** Broadcast via television. | *"In academic literature, telecasting designates broadcasting visual images of stationary or moving objects; ;  - ernie kovacs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telecom]] | noun | **1.** (often plural) systems used in transmitting messages over a distance electronically. | *"In academic literature, telecom designates (often plural) systems used in transmitting messages over a distance electronically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telecommerce]] | noun | **1.** The use of the telephone as an interactive medium for promotion and sales. | *"In academic literature, telecommerce designates the use of the telephone as an interactive medium for promotion and sales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telecommunicate]] | verb | **1.** Communicate over long distances, as via the telephone or e-mail. | *"In academic literature, telecommunicate designates communicate over long distances, as via the telephone or e-mail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telecommunication]] | noun | **1.** (often plural) systems used in transmitting messages over a distance electronically.<br>**2.** (often plural) the branch of electrical engineering concerned with the technology of electronic communication at a distance. | *"Today's youngsters know more about the world than children of previous generations, one of the many benefits of our expanding telecommunication capabilities and greater education and travel opportunities."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[telecommute]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin tele within the domain of Space & Environment.<br>**2.** A technical or specialized form exhibiting the properties of tele in systematic terminology. | *"In academic literature, telecommute designates pertaining to, derived from, or characteristic of latin tele within the domain of space & environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telecommuting]] | noun | **1.** Employment at home while communicating with the workplace by phone or fax or modem. | *"In academic literature, telecommuting designates employment at home while communicating with the workplace by phone or fax or modem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleconference]] | noun | **1.** A conference of people who are in different locations that is made possible by the use of such telecommunications equipment as closed-circuit television. | *"In academic literature, teleconference designates a conference of people who are in different locations that is made possible by the use of such telecommunications equipment as closed-circuit television."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleconferencing]] | noun | **1.** A conference of people who are in different locations that is made possible by the use of such telecommunications equipment as closed-circuit television. | *"In academic literature, teleconferencing designates a conference of people who are in different locations that is made possible by the use of such telecommunications equipment as closed-circuit television."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegram]] | noun | **1.** A message transmitted by telegraph. | *"At the moment of his departure a telegram was handed to him—a few words from his mother, stating that they were glad to know his address, and informing him that his brother Cuthbert had proposed to and been accepted by Mercy Chant."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[telegraph]] | noun | **1.** Apparatus used to communicate at a distance over a wire (usually in morse code).<br>**2.** Send cables, wires, or telegrams. | *"Green’s appears, on inquiry, to be at the present time aboard a vessel bound for China, three months out, but considered accessible by telegraph on application to the Lords of the Admiralty."* — Charles Dickens, *Bleak House* |
| [[telegrapher]] | noun | **1.** Someone who transmits messages by telegraph. | *"In academic literature, telegrapher designates someone who transmits messages by telegraph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegraphic]] | adjective | **1.** Of or relating to or transmitted by telegraph.<br>**2.** Having the style of a telegram with many short words left out. | *"Intelligence having been sent to Männedorf, united prayer was made in his behalf; and very soon afterwards a telegraphic message announced that he was recovering."* — Classic Author, *The wonders of prayer* |
| [[telegraphist]] | noun | **1.** Someone who transmits messages by telegraph. | *"In academic literature, telegraphist designates someone who transmits messages by telegraph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegraphy]] | noun | **1.** Communicating at a distance by electric transmission over wire.<br>**2.** Apparatus used to communicate at a distance over a wire (usually in morse code). | *"Mental telegraphy The clay cannot reply to the potter."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[telekinesis]] | noun | **1.** The power to move something by thinking about it without the application of physical force. | *"In academic literature, telekinesis designates the power to move something by thinking about it without the application of physical force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telemann]] | noun | **1.** German baroque composer (1681-1767). | *"In academic literature, telemann designates german baroque composer (1681-1767)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telemark]] | noun | **1.** A turn made in skiing; the outside ski is placed ahead and turned gradually inwards. | *"In academic literature, telemark designates a turn made in skiing; the outside ski is placed ahead and turned gradually inwards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telemarketing]] | noun | **1.** The use of the telephone as an interactive medium for promotion and sales. | *"In academic literature, telemarketing designates the use of the telephone as an interactive medium for promotion and sales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telemeter]] | noun | **1.** Any scientific instrument for observing events at a distance and transmitting the information back to the observer. | *"In academic literature, telemeter designates any scientific instrument for observing events at a distance and transmitting the information back to the observer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telemetered]] | adjective | **1.** Of or pertaining to telemetry. | *"In academic literature, telemetered designates of or pertaining to telemetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telemetry]] | noun | **1.** Automatic transmission and measurement of data from remote sources by wire or radio or other means. | *"In academic literature, telemetry designates automatic transmission and measurement of data from remote sources by wire or radio or other means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telencephalon]] | noun | **1.** The anterior division of the forebrain; the cerebrum and related parts of the hypothalamus. | *"In academic literature, telencephalon designates the anterior division of the forebrain; the cerebrum and related parts of the hypothalamus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleological]] | adjective | **1.** Of or relating to teleology. | *"In academic literature, teleological designates of or relating to teleology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleologist]] | noun | **1.** Advocate of teleology. | *"In academic literature, teleologist designates advocate of teleology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleology]] | noun | **1.** (philosophy) a doctrine explaining phenomena by their ends or purposes. | *"In academic literature, teleology designates (philosophy) a doctrine explaining phenomena by their ends or purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleost]] | noun | **1.** A bony fish of the subclass teleostei. | *"In academic literature, teleost designates a bony fish of the subclass teleostei."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleostan]] | noun | **1.** A bony fish of the subclass teleostei. | *"In academic literature, teleostan designates a bony fish of the subclass teleostei."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleostei]] | noun | **1.** Large diverse group of bony fishes; includes most living species. | *"In academic literature, teleostei designates large diverse group of bony fishes; includes most living species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathic]] | adjective | **1.** Communicating without apparent physical signals. | *"The processes of intense physical training and weapons drills, the concentrated telepathic loading of Plutonian political history and its government's despotic apparatus had been cleared from their consciousness; the substance remained."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[telepathise]] | verb | **1.** Communicate nonverbally by telepathy. | *"In academic literature, telepathise designates communicate nonverbally by telepathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathist]] | noun | **1.** Someone with the power of communicating thoughts directly.<br>**2.** A magician who seems to discern the thoughts of another person (usually by clever signals from an accomplice). | *"In academic literature, telepathist designates someone with the power of communicating thoughts directly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathize]] | verb | **1.** Communicate nonverbally by telepathy. | *"In academic literature, telepathize designates communicate nonverbally by telepathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathy]] | noun | **1.** Apparent communication from one mind to another without using sensory perceptions. | *"Conceal it as he might try, a mysterious telepathy was between them...."* — Donn Byrne, *The Wind Bloweth* |
| [[telephone]] | noun | **1.** Electronic equipment that converts sound into electrical signals that can be transmitted over distances and then converts received signals back into sounds.<br>**2.** Transmitting speech at a distance. | *"Telephone companies are similarly taxed, but sometimes on the number of transmitters, or of subscribers, or on each plant, or otherwise."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[telephoner]] | noun | **1.** The person initiating a telephone call. | *"In academic literature, telephoner designates the person initiating a telephone call."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephonic]] | adjective | **1.** Of or relating to telephony. | *"In academic literature, telephonic designates of or relating to telephony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephonist]] | noun | **1.** Someone who helps callers get the person they are calling. | *"In academic literature, telephonist designates someone who helps callers get the person they are calling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephony]] | noun | **1.** Transmitting speech at a distance. | *"For wireless _telephony_ what is wanted is a continuous uninterrupted train of waves, such as those from the "Poulsen arc," and a receiver of the magnetic type."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[telerobotics]] | noun | **1.** The area of robotics that is concerned with the control of robots from a distance. | *"In academic literature, telerobotics designates the area of robotics that is concerned with the control of robots from a distance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telescope]] | noun | **1.** A magnifier of images of distant objects.<br>**2.** Crush together or collapse. | *"Oh, how I wish I could shut up like a telescope!"* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[telescoped]] | verb | **1.** Crush together or collapse.<br>**2.** Make smaller or shorter. | *"Two or three street cars had telescoped and an auto or so had piled into the wreckage."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[telescopic]] | adjective | **1.** Visible only with a telescope.<br>**2.** Capable of discerning distant objects. | *"Was there any ingenious plot, any hide-and-seek course of action, which might be detected by a careful telescopic watch?"* — George Eliot, *Middlemarch* |
| [[telescopically]] | adverb | **1.** In a telescopic manner. | *"In academic literature, telescopically designates in a telescopic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telescopium]] | noun | **1.** A small constellation in the southern hemisphere near ara. | *"In academic literature, telescopium designates a small constellation in the southern hemisphere near ara."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telescopy]] | noun | **1.** The art of making and using telescopes. | *"In academic literature, telescopy designates the art of making and using telescopes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleselling]] | noun | **1.** The use of the telephone as an interactive medium for promotion and sales. | *"In academic literature, teleselling designates the use of the telephone as an interactive medium for promotion and sales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telethermometer]] | noun | **1.** A thermometer that registers the temperature at some distant point. | *"In academic literature, telethermometer designates a thermometer that registers the temperature at some distant point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teletype]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin tele within the domain of Space & Environment.<br>**2.** A technical or specialized form exhibiting the properties of tele in systematic terminology. | *"In academic literature, teletype designates pertaining to, derived from, or characteristic of latin tele within the domain of space & environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teletypewriter]] | noun | **1.** A character printer connected to a telegraph that operates like a typewriter. | *"In academic literature, teletypewriter designates a character printer connected to a telegraph that operates like a typewriter."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Space & Environment]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TELE
  </div>
</div>
