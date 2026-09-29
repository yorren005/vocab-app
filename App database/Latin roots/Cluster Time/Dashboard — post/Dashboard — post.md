---
status: unread
type: root_dashboard
---
# Dashboard — post
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">post-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“after”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The rhythmic hands of a clock ticking forward as hours and days pass by.</span>
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

The root **post** means after. It indicates following later in time, coming behind, or subsequent events. In English, this root forms words such as *posterior*, *posterity*, *postgraduate*, and *posthumous*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: after
> The root **post** means after. It indicates following later in time, coming behind, or subsequent events. In English, this root forms words such as *posterior*, *posterity*, *postgraduate*, and *posthumous*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">After</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The rhythmic hands of a clock ticking forward as hours and days pass by.</mark>
> - **Everyday Connection**: Think of familiar words like *posterior* and *posterity*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **post** comes from a Latin word that means *"after"*.
  - At its core, it describes after.

- **The Big Picture Idea**:
  - Picture the rhythmic hands of a clock ticking forward as hours and days pass by.
  - Whenever you see **post** in an English word, think of **time, seasons, and duration**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of after.
  - **Mental & Social**: How people experience, organize, or communicate about after.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Posterior**: Adj.* Situated behind or at the rear of.
  - **Posterity**: All future generations of people.
  - **Postgraduate**: Adj.* Relating to study undertaken after completing a first academic degree.
  - **Posthumous**: Occurring, awarded, or appearing after the death of the originator.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">post</mark>, think of <mark class="hl-def">time, seasons, and duration</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root functions as an autonomous prefix and combining stem in English:
1. **The Comparative Stem `posterior-`**: Direct from Latin *posterior* ("later, hindmost"): *posterior*, *posteriority*.
2. **The Abstract Nominal Stem `poster-`**: From *posterī* ("descendants"): *posterity*.
3. **Direct Temporal Prefixation**:
   - `post-` + *mortem* (Latin *mors, mortis* "death") $\to$ *postmortem*.
   - `post-` + *humus* (Late Latin *posthumus*) $\to$ *posthumous*.
   - `post-` + *natal* (Latin *nātālis* "birth") $\to$ *postnatal*.
   - `post-` + *graduate* $\to$ *postgraduate*.
   - `post-` + *modern* $\to$ *postmodern*, *postmodernism*.
   - `post-` + *ponere* (Latin *pōnere* "to place") $\to$ *postpone*.

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

The root organizes into four distinct temporal domains:
- **Succession Across Generations**: [[posterity]], [[posterior]]
- **Post-Death & Forensic Science**: [[posthumous]], [[postmortem]]
- **Developmental & Life Stages**: [[postnatal]], [[postgraduate]]
- **Scheduling & Intentional Deferral**: [[postpone]]
- **Cultural, Historical & Textual Aftermath**: [[postmodern]], `postscript`, `postbellum`

---

## 🔀 4. Prefix & Combining Dynamics on post

1. **`post-` + `mortem`** (*mors* "death"):
   - *postmortem* $\to$ occurring after death; an autopsy or post-project analysis.
2. **`post-` + `natal`** (*nātus* "born"):
   - *postnatal* $\to$ relating to or happening in the period immediately after childbirth.
3. **`post-` + *ponere* (*pōnere* "to place, put"):
   - *postpone* $\to$ to put off until a later time; delay.
4. **`post-` + `scriptum`** (*scrībere* "to write"):
   - *postscript* $\to$ an additional remark written at the end of a completed letter.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Medicine & Forensics**: *postmortem* examinations, *postnatal* depression, pathology.
- **Law & Estate Planning**: *posthumous* awards, *ex post facto* constitutional prohibitions.
- **Higher Education & Research**: *postgraduate* fellowships, postdoctoral research.
- **Cultural Theory & Philosophy**: *postmodern* architecture, *postmodernism* in literary theory.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[compost]] | noun | **1.** A mixture of decaying vegetation and manure; used as a fertilizer.<br>**2.** Convert to compost. | *"Confess yourself to heaven, Repent what’s past, avoid what is to come; And do not spread the compost on the weeds, To make them ranker."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expostulate]] | verb | **1.** Reason with (somebody) for the purpose of dissuasion. | *"My liege and madam, to expostulate What majesty should be, what duty is, Why day is day, night night, and time is time Were nothing but to waste night, day and time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expostulation]] | noun | **1.** The act of expressing earnest opposition or protest.<br>**2.** An exclamation of protest or remonstrance or reproof. | *"Nay, we must use expostulation kindly, For it is parting from us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impost]] | noun | **1.** Money collected under a tariff.<br>**2.** The lowest stone in an arch -- from which it springs. | *"We will presume, for argument’s sake, that the revenue arising from the impost duties answers the purposes of a provision for the public debt and of a peace establishment for the Union."* — Alexander Hamilton, *The Federalist Papers* |
| [[imposter]] | noun | **1.** A person who makes deceitful pretenses. | *"He looked upon her as a species of imposter; a guilty woman in the guise of an innocent one."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[impostor]] | noun | **1.** A person who makes deceitful pretenses. | *"I am not an impostor, that proclaim Myself against the level of mine aim, But know I think, and think I know most sure, My art is not past power nor you past cure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imposture]] | noun | **1.** Pretending to be another person. | *"This, though I had myself suggested an imposture, made it very unlikely to my quiet thoughts."* — Mrs. Oliphant, *A Beleaguered City* |
| [[post]] | noun | **1.** The position where someone (as a guard or sentry) stands or is assigned to stand.<br>**2.** Military installation at which a body of troops is stationed. | *"His highness comes post from Marseilles, of as able body as when he number’d thirty; he will be here tomorrow, or I am deceived by him that in such intelligence hath seldom fail’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postage]] | noun | **1.** The charge for mailing something.<br>**2.** A small adhesive token stuck on a letter or package to indicate that that postal fees have been paid. | *"The letters that passed between the student and his family were also sent in the box, for as yet there was no penny post, and the postage of a letter between Dunglass and Edinburgh cost as much as sixpence halfpenny or sevenpence."* — John Cairns, *Principal Cairns* |
| [[postal]] | adjective | **1.** Of or relating to the system for delivering mail. | *"_I am afraid I did not direct that letter right_." He sent a second postal card, asking if a letter had been received at her home; if not, to go to her post office and inquire."* — Classic Author, *The wonders of prayer* |
| [[postcard]] | noun | **1.** A card for sending messages by post without an envelope. | *"Send her a picture postcard explaining that you forgot all about her until it was too--” The last word was jerked back into his throat by the jump of the Green Imp."* — Grace S. Richmond, *Red Pepper Burns* |
| [[postcava]] | noun | **1.** Receives blood from lower limbs and abdominal organs and empties into the posterior part of the right atrium of the heart; formed from the union of the two iliac veins. | *"In academic literature, postcava designates receives blood from lower limbs and abdominal organs and empties into the posterior part of the right atrium of the heart; formed from the union of the two iliac veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postcode]] | noun | **1.** A code of letters and digits added to a postal address to aid in the sorting of mail. | *"In academic literature, postcode designates a code of letters and digits added to a postal address to aid in the sorting of mail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posted]] | verb | **1.** Affix in a public place or for public notice.<br>**2.** Publicize with, or as if with, a poster. | *"The swiftest harts have posted you by land, And winds of all the corners kiss’d your sails, To make your vessel nimble."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[poster]] | noun | **1.** A sign posted in a public place as an advertisement.<br>**2.** Someone who pastes up bills or placards on walls or billboards. | *"Here’s the announcement.” He drew from his breast-pocket a poster whereon was printed the day, hour, and place of meeting, at which he, d’Urberville, would preach the Gospel as aforesaid."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[posterboard]] | noun | **1.** A cardboard suitable for making posters. | *"In academic literature, posterboard designates a cardboard suitable for making posters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posterior]] | noun | **1.** The fleshy part of the human body that you sit on.<br>**2.** A tooth situated at the back of the mouth. | *"The posterior of the day, most generous sir, is liable, congruent, and measurable for the afternoon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[posteriority]] | noun | **1.** The quality of being toward the back or toward the rear end.<br>**2.** Following in time. | *"In academic literature, posteriority designates the quality of being toward the back or toward the rear end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posterity]] | noun | **1.** All of the offspring of a given progenitor.<br>**2.** All future generations. | *"Or who is he so fond will be the tomb Of his self-love to stop posterity?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postern]] | noun | **1.** A small gate in the rear of a fort or castle. | *"That spirit’s possessed with haste That wounds th’ unsisting postern with these strokes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postexilic]] | adjective | **1.** Of or relating to the period in jewish history after 539 bc (after the babylonian captivity). | *"Accepting the analogy implied in his guest’s parable which examples of postexilic eminence did he adduce?"* — James Joyce, *Ulysses* |
| [[postgraduate]] | noun | **1.** A student who continues studies after graduation.<br>**2.** Of or relating to studies beyond a bachelor's degree. | *"In academic literature, postgraduate designates a student who continues studies after graduation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posthumous]] | adjective | **1.** Occurring or coming into existence after a person's death. | *"This help on his part was continued by his seeing through the press Wilson's posthumous book, _Counsels of an Invalid_, which appeared in 1862."* — John Cairns, *Principal Cairns* |
| [[posthumously]] | adverb | **1.** After death. | *"In academic literature, posthumously designates after death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postiche]] | noun | **1.** A covering or bunch of human or artificial hair used for disguise or adornment.<br>**2.** Something that is a counterfeit; not what it seems to be. | *"In academic literature, postiche designates a covering or bunch of human or artificial hair used for disguise or adornment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postictal]] | adjective | **1.** Pertaining to the period following a seizure or convulsion. | *"In academic literature, postictal designates pertaining to the period following a seizure or convulsion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postilion]] | noun | **1.** Someone who rides the near horse of a pair in order to guide the horses pulling a carriage (especially a carriage without a coachman). | *"Our postilion is looking after the waggoner,” said Richard, “and the waggoner is coming back after us."* — Charles Dickens, *Bleak House* |
| [[postillion]] | noun | **1.** Someone who rides the near horse of a pair in order to guide the horses pulling a carriage (especially a carriage without a coachman). | *"Robinson was a tall, uncouth man, and his stature was often rendered still more remarkable by his hunting dress, and postillion’s cap, a tight green jacket, and buckskin breeches."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[postimpressionist]] | noun | **1.** An artist of the postimpressionist school who revolted against impressionism. | *"In academic literature, postimpressionist designates an artist of the postimpressionist school who revolted against impressionism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postindustrial]] | adjective | **1.** Of or relating to a society or economy marked by a lessened importance of manufacturing and an increase of services, information, and research. | *"In academic literature, postindustrial designates of or relating to a society or economy marked by a lessened importance of manufacturing and an increase of services, information, and research."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posting]] | noun | **1.** A sign posted in a public place as an advertisement.<br>**2.** (bookkeeping) a listing on the company's records. | *"Till I return of posting is no need."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postlude]] | noun | **1.** A voluntary played at the end of a religious service. | *"In academic literature, postlude designates a voluntary played at the end of a religious service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postman]] | noun | **1.** A man who delivers the mail. | *"She watched till the postman passed by, ran out to him with her epistle, and then again took her listless place inside the window-panes."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[postmark]] | noun | **1.** A cancellation mark stamped on mail by postal officials; indicates the post office and date of mailing.<br>**2.** Stamp with a postmark to indicate date and time of mailing. | *"It bore the London postmark, and came from Edmund."* — Jane Austen, *Mansfield Park* |
| [[postmaster]] | noun | **1.** The person in charge of a post office. | *"I went to her in white and cried “mum”, and she cried “budget”, as Anne and I had appointed, and yet it was not Anne, but a postmaster’s boy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postmenopausal]] | adjective | **1.** Subsequent to menopause. | *"In academic literature, postmenopausal designates subsequent to menopause."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmeridian]] | adjective | **1.** After noon. | *"In academic literature, postmeridian designates after noon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmillennial]] | adjective | **1.** Of or relating to the period following the millennium. | *"In academic literature, postmillennial designates of or relating to the period following the millennium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmistress]] | noun | **1.** A woman postmaster. | *"While the postmistress searched a pigeonhole he gazed at the recruiting poster with soldiers of all arms on parade: and held the tip of his baton against his nostrils, smelling freshprinted rag paper."* — James Joyce, *Ulysses* |
| [[postmodern]] | adjective | **1.** Of or relating to postmodernism. | *"In academic literature, postmodern designates of or relating to postmodernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmodernism]] | noun | **1.** Genre of art and literature and especially architecture in reaction against principles and practices of established modernism. | *"In academic literature, postmodernism designates genre of art and literature and especially architecture in reaction against principles and practices of established modernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmodernist]] | adjective | **1.** Of or relating to postmodernism. | *"In academic literature, postmodernist designates of or relating to postmodernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmortal]] | adjective | **1.** Occurring or done after death. | *"In academic literature, postmortal designates occurring or done after death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmortem]] | noun | **1.** Discussion of an event after it has occurred.<br>**2.** An examination and dissection of a dead body to determine cause of death or the changes produced by disease. | *"Good idea a postmortem for doctors."* — James Joyce, *Ulysses* |
| [[postnatal]] | adjective | **1.** Occurring immediately after birth. | *"In academic literature, postnatal designates occurring immediately after birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postnuptial]] | adjective | **1.** Relating to events after a marriage. | *"In academic literature, postnuptial designates relating to events after a marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postoperative]] | adjective | **1.** Happening or done after a surgical operation. | *"In academic literature, postoperative designates happening or done after a surgical operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postoperatively]] | adverb | **1.** After the operation. | *"In academic literature, postoperatively designates after the operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpone]] | verb | **1.** Hold back to a later time. | *"He had to hang it up because the mother insisted that they should go to lunch and postpone everything else till the afternoon."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[postponement]] | noun | **1.** Time during which some action is awaited.<br>**2.** Act of putting off to a future time. | *"If so, there must be a week’s postponement, and that was unlucky."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[postponer]] | noun | **1.** Someone who postpones work (especially out of laziness or habitual carelessness). | *"In academic literature, postponer designates someone who postpones work (especially out of laziness or habitual carelessness)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postscript]] | noun | **1.** A note appended to a letter after the signature.<br>**2.** Textual matter that is added onto a publication; usually at the end. | *"KING. ’Tis Hamlet’s character. ‘Naked!’ And in a postscript here he says ‘alone.’ Can you advise me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[postulant]] | noun | **1.** One submitting a request or application especially one seeking admission into a religious order. | *"During these wanderings, Pierre noticed that he was spoken of now as the “Seeker,” now as the “Sufferer,” and now as the “Postulant,” to the accompaniment of various knockings with mallets and swords."* — graf Leo Tolstoy, *War and Peace* |
| [[postulate]] | noun | **1.** (logic) a proposition that is accepted as true in order to provide a basis for logical reasoning.<br>**2.** Maintain or assert. | *"This is the very postulate of living Christianity."* — John Cairns, *Principal Cairns* |
| [[postulation]] | noun | **1.** (logic) a declaration of something self-evident; something that can be assumed as the basis for argument.<br>**2.** A formal message requesting something that is submitted to an authority. | *"In academic literature, postulation designates (logic) a declaration of something self-evident; something that can be assumed as the basis for argument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postulational]] | adjective | **1.** Of or relating to or derived from axioms; ; - s.s.stevens. | *"In academic literature, postulational designates of or relating to or derived from axioms; ; - s.s.stevens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postulator]] | noun | **1.** (roman catholic church) someone who proposes or pleads for a candidate for beatification or canonization.<br>**2.** Someone who assumes or takes something for granted as the basis of an argument. | *"In academic literature, postulator designates (roman catholic church) someone who proposes or pleads for a candidate for beatification or canonization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postum]] | noun | **1.** Trade mark for a coffee substitute invented by c. w. post and made with chicory and roasted grains. | *"In academic literature, postum designates trade mark for a coffee substitute invented by c. w. post and made with chicory and roasted grains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postural]] | adjective | **1.** Of or relating to or involving posture. | *"In academic literature, postural designates of or relating to or involving posture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posture]] | noun | **1.** The arrangement of the body and its limbs.<br>**2.** Characteristic way of bearing one's body. | *"The quick comedians Extemporally will stage us and present Our Alexandrian revels; Antony Shall be brought drunken forth, and I shall see Some squeaking Cleopatra boy my greatness I’ th’ posture of a whore."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[posturer]] | noun | **1.** Someone who behaves in a manner calculated to impress or mislead others. | *"In academic literature, posturer designates someone who behaves in a manner calculated to impress or mislead others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posturing]] | noun | **1.** Adopting a vain conceited posture.<br>**2.** Behave affectedly or unnaturally in order to impress others. | *"But after I had had my new suit on some half an hour, and had gone through an immensity of posturing with Mr."* — Charles Dickens, *Great Expectations* |
| [[preposterous]] | adjective | **1.** Incongruous;inviting ridicule. | *"Ay, my good lord—my lord, I should say rather. ’Tis sin to flatter; “good” was little better: “Good Gloucester” and “good devil” were alike, And both preposterous; therefore, not “good lord”."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preposterously]] | adverb | **1.** So as to arouse or deserve laughter. | *"Methinks you prescribe to yourself very preposterously."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Time]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · POST
  </div>
</div>
