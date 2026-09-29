---
status: unread
type: root_dashboard
---
# Dashboard — vindic
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vindic-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“claimant or avenger”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community gathering in a hall to establish fair rules and resolve disputes.</span>
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

The root **vindic** means claimant or avenger. It refers to defending a rightful claim, justifying truth, or seeking justice. In English, this root forms words such as *strength*, *vindicate*, *vindication*, and *vindicator*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: claimant or avenger
> The root **vindic** means claimant or avenger. It refers to defending a rightful claim, justifying truth, or seeking justice. In English, this root forms words such as *strength*, *vindicate*, *vindication*, and *vindicator*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Claimant or avenger</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *strength* and *vindicate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vindic** comes from a Latin word that means *"claimant or avenger"*.
  - At its core, it describes claimant or avenger.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **vindic** in an English word, think of **justice, legal authority, and governance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of claimant or avenger.
  - **Mental & Social**: How people experience, organize, or communicate about claimant or avenger.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Strength**: An everyday English word showing the root's idea of *claimant or avenger*.
  - **Vindicate**: To clear from allegation, blame, suspicion, or doubt.
  - **Vindication**: The act of clearing from blame or doubt.
  - **Vindicator**: One who vindicates, defends, justifies, or maintains a cause, right, or person against opposition or slander.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vindic</mark>, think of <mark class="hl-def">justice, legal authority, and governance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates across three morphological streams:
> - **Classical Latin Participial Stem `vindicāt-` (*vindicāre*, *vindicātus*):** Generates intellectual, formal, and legal words of justification and defense:
>   - *vindicate*, *vindication*, *vindicator*, *vindicative*, *vindicatory*, *vindicable*, *vindicability*, *unvindicated*, *revindicate*, *revindication*
> - **Classical Latin Substantival Stem `vindict-` (*vindicta* "wand / vengeance"):** Generates words of retributive malice and Roman procedural remedies:
>   - *vindictive*, *vindictively*, *vindictiveness*, *vindicta*
> - **Old French Vernacular Stem `veng-` / `venge-` (from *vengier* < *vindicāre*):** Generates passionate, heroic, and dramatic terms of retaliation:
>   - *ad-* + *vengier* $\to$ *avenge*, *avenger*, *avenging*
>   - *re-* + *vengier* $\to$ *revenge*, *revenger*, *revengeful*, *revengefully*
>   - *vengier* + *-ance* $\to$ *vengeance*, *vengeful*, *vengefully*, *vengefulness*
> - **Italian Borrowing `vendett-` (*vendetta* < Latin *vindicta*):**
>   - *vendetta*

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
> The root manifests across five distinct conceptual spheres:
> - **Exoneration, Justification & Clearance:** Proving that an accused person, controversial theory, or historical figure was correct all along (*vindicate*, *vindication*, *vindicable*).
> - **Proprietary & Civil Recovery:** The legal retrieval of unlawfully held property or reassertion of a legal right (*rei vindicatio*, *revindicate*, *revindication*).
> - **Impersonal, Moral & Retributive Justice:** Avenging an injured party to restore cosmic, moral, or legal balance (*avenge*, *avenger*, *avenging*).
> - **Personal Retaliation & Spiteful Malice:** Striking back out of wounded ego, resentment, or bitterness (*revenge*, *revengeful*, *vindictive*, *vindictiveness*).
> - **Institutionalized Blood Feud:** The anthropological cycle of reciprocal clan killings (*vendetta*).

---

## 🔀 4. Prefix & Combining Dynamics on vindic

### Prefix Mechanics (Directional & Emotional Shift)
- **`ad-` (Toward / In favor of):** Directs the act of vengeance toward justice on behalf of another $\to$ *avenge*, *avenger*.
- **`re-` (Back / In return):** Re-striking the blow against an offender (*revenge*) or reasserting a proprietary claim (*revindicate*, *revindication*).
- **`un-` (Negative):** Denoting that an accusation remains unrefuted $\to$ *unvindicated*.

### Suffix Dynamics (Functional Shift)
- **`-ation` (Process / Proof):** The formal act or evidence of justification: *vindicate* $\to$ *vindication*.
- **`-or` (Agent / Champion):** The person who defends or justifies: *vindicate* $\to$ *vindicator*.
- **`-ive` (Tendency / Disposition):** Forming adjectives of psychological disposition: *vindictive* (tending to seek revenge), *vindicative* (tending to justify).
- **`-ance` (Abstract Action / Retribution):** French abstract nominal suffix: *vengeance*.
- **`-ful` (Full of):** Imbued with the desire for retaliation: *vengeful*, *revengeful*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Civil Law & Roman Property Doctrine (*Rei Vindicatio*):** Foundational to the German Civil Code (*BGB § 985*), French Civil Code (*Code Civil*), and all continental legal systems as the primary action through which an owner asserts title to recover physical possession of a thing (*rei vindicatio*).
> - **Political Philosophy & Rights Discourses:** Mary Wollstonecraft's *A Vindication of the Rights of Men* (1790) and *A Vindication of the Rights of Woman* (1792); Thomas Paine’s defenses of the French Revolution.
> - **Philosophy of Punishment & Penology:** The distinction between *retributivism* (impersonal justice administered by an impartial state to restore the moral order) and *private revenge* (emotional, disproportionate retaliation).
> - **Jacobean & Elizabethan Drama:** The literary tradition of the *Revenge Tragedy* (Thomas Kyd’s *The Spanish Tragedy*, Shakespeare’s *Hamlet*, Thomas Tourneur’s *The Revenger’s Tragedy*), exploring the corrupting psychological cost of seeking personal vengeance.
> - **Anthropology & Sociology of Honor:** The customary Mediterranean code of *faida* and *vendetta*, wherein an unavenged injury dishonors the entire family line until blood restitution is made.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[revindicate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vindic within the domain of Law, Justice & Feudal.<br>**2.** A technical or specialized form exhibiting the properties of vindic in systematic terminology. | *"In academic literature, revindicate designates pertaining to, derived from, or characteristic of latin vindic within the domain of law, justice & feudal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unvindictive]] | adjective | **1.** Not vindictive. | *"In academic literature, unvindictive designates not vindictive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vindicable]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vindic within the domain of Law, Justice & Feudal.<br>**2.** A technical or specialized form exhibiting the properties of vindic in systematic terminology. | *"In academic literature, vindicable designates pertaining to, derived from, or characteristic of latin vindic within the domain of law, justice & feudal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vindicate]] | verb | **1.** Show to be right by providing justification or proof.<br>**2.** Maintain, uphold, or defend. | *"They owe him a deanery.” And here I must vindicate a claim to philosophical reflectiveness, by remarking that Mr."* — George Eliot, *Middlemarch* |
| [[vindicated]] | verb | **1.** Show to be right by providing justification or proof.<br>**2.** Maintain, uphold, or defend. | *"Skimpole left the room with a radiant face to fetch his daughters (his sons had run away at various times), leaving my guardian quite delighted by the manner in which he had vindicated his childish character."* — Charles Dickens, *Bleak House* |
| [[vindication]] | noun | **1.** The act of vindicating or defending against criticism or censure etc.<br>**2.** The justification for some act or belief. | *"But whether her brother had still exceeded her in resentment, Catherine, though she instinctively addressed herself as much to one as to the other in her vindication, had no means of knowing."* — Jane Austen, *Northanger Abbey* |
| [[vindicator]] | noun | **1.** A person who argues to defend or justify some policy or institution. | *"Paul, once, on the spur of the moment, called Jesus the "Yes" of all the promises of God--a most suggestive name for the vindicator and exponent of God's realities."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[vindicatory]] | adjective | **1.** Of or relating to or having the nature of retribution.<br>**2.** Given or inflicted in requital according to merits or deserts. | *"In academic literature, vindicatory designates of or relating to or having the nature of retribution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vindictive]] | adjective | **1.** Disposed to seek revenge or intended for revenge; - shakespeare; - m.r.cohen.<br>**2.** Showing malicious ill will and a desire to hurt; motivated by spite. | *"The face of each child, as the amount of his contribution was mentioned, darkened in a peculiarly vindictive manner, but his was by far the worst."* — Charles Dickens, *Bleak House* |
| [[vindictively]] | adverb | **1.** In a vindictive, revengeful manner. | *"He did this because there is a saying in the Neverland that, every time you breathe, a grown-up dies; and Peter was killing them off vindictively as fast as possible."* — J. M. Barrie, *Peter Pan* |
| [[vindictiveness]] | noun | **1.** A malevolent desire for revenge. | *"Smallweed, who finds it so difficult to resume his object, whatever it may be, that he becomes exasperated and secretly claws the air with an impotent vindictiveness expressive of an intense desire to tear and rend the visage of Mr."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law, Justice & Feudal]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VINDIC
  </div>
</div>
