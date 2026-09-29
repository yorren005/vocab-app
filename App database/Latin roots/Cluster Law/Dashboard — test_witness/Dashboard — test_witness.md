---
status: unread
type: root_dashboard
---
# Dashboard — test_witness
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">test_witness-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“witness”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community establishing fair rules to ensure order and peaceful living.</span>
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

The root **test_witness** means witness. It refers to witness, sworn testimony, solemn declaration, testament / last will, public dissent. In English, this root forms words such as *testify*, *testification*, *testimony*, and *testimonial*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: witness
> The root **test_witness** means witness. It refers to witness, sworn testimony, solemn declaration, testament / last will, public dissent. In English, this root forms words such as *testify*, *testification*, *testimony*, and *testimonial*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Witness</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community establishing fair rules to ensure order and peaceful living.</mark>
> - **Everyday Connection**: Think of familiar words like *testify* and *testification*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **test_witness** comes from a Latin word that means *"witness"*.
  - At its core, it describes witness.

- **The Big Picture Idea**:
  - Picture a community establishing fair rules to ensure order and peaceful living.
  - Whenever you see **test_witness** in an English word, think of **rules, rights, and the law**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of witness.
  - **Mental & Social**: How people experience, organize, or communicate about witness.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Testify**: To give testimony under oath or solemn affirmation as a witness in a court of justice or before a tribunal.
  - **Testification**: The act of testifying or bearing witness.
  - **Testimony**: A solemn written or spoken statement given by a witness under oath in a court of law.
  - **Testimonial**: Relating to or containing a testimony or formal affirmation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">test_witness</mark>, think of <mark class="hl-def">rules, rights, and the law</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates across four primary morphological stems in English:
> - **Primary Deponent Verb Stem (`test-`):** Derived from Latin *testārī*: *attest*, *contest*, *detest*, *protest*, *obtest*.
> - **Participial & Testamentary Stem (`testat-`):** Derived from *testātus* (past participle) and *testātor*: *testament*, *testamentary*, *testator*, *testatrix*, *intestate*, *attestation*, *protestation*.
> - **Verbal Compound Stem (`testifi-`):** Formed from Latin *testificārī* (< *testis* + *facere* "to make witness"): *testify*, *testification*.
> - **Evidentiary Nominal Stem (`testimoni-`):** Formed from Latin *testimōnium*: *testimony*, *testimonial*.
>
> Prefixation dramatically alters the directional posture of the witness:
> - `ad-` ("to, toward") + *testārī* $\to$ *attest* (to witness to something, confirm).
> - `con-` ("together") + *testārī* $\to$ *contest* (to call witnesses mutually; dispute an issue).
> - `dē-` ("away, against") + *testārī* $\to$ *detest* (to invoke witnesses against a curse; loathe).
> - `prō-` ("forth, publicly") + *testārī* $\to$ *protest* (to bear open witness; declare dissent).
> - `ob-` ("before, toward") + *testārī* $\to$ *obtest* (to call upon witnesses; solemnly entreat).
> - `in-` (neg.) + *testātus* $\to$ *intestate* (without having made a witnessed will).

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
> The semantic manifestations of *test_witness* organize into distinct operational fields:
> - **Courtroom Evidence & Sworn Affirmation:** In [[testify]], [[testimony]], [[attest]], [[attestation]], [[attestant]], and [[attester]], the root denotes sworn legal truth under penalty of perjury.
> - **Adversarial Litigation & Competition:** In [[contest]], [[contestable]], [[incontestable]], [[contestation]], and [[contestant]], the root moves from the Roman calling of witnesses (*lītis contestātiō*) to vigorous dispute and competitive struggle.
> - **Last Wills & Probate Law:** In [[testament]], [[testamentary]], [[testator]], [[testatrix]], [[intestate]], and [[intestacy]], the root governs the legal transmission of wealth through witnessed instruments.
> - **Religious Covenants:** In [[testament]] (*Old Testament*, *New Testament*), the root translates the sacred covenants between God and humanity.
> - **Public Dissent & Conscience:** In [[protest]], [[protester]], [[protestation]], [[protestant]], and [[Protestantism]], the root embodies the public declaration of conscience against unjust authority.
> - **Moral Abomination & Invocations:** In [[detest]], [[detestable]], [[detestation]], [[obtest]], and [[obtestation]], the root preserves the archaic ritual of calling divine witnesses to curse evil.
> - **Anatomical Biology:** In [[testis]], [[testicle]], and [[testicular]], the root reflects the ancient conceptualization of male gonads as physical witnesses of virility.

---

## 🔀 4. Prefix & Combining Dynamics on test_witness

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward, upon | [[attest]], [[attestation]] | To bear witness to a fact, signature, or document; to certify officially. |
| `con-` | together, mutually | [[contest]], [[contestation]] | Orig. to call witnesses together in a lawsuit; to dispute, challenge, or compete for. |
| `dē-` | away, against, down | [[detest]], [[detestable]] | Lit. to invoke the gods as witnesses to avert a curse; to feel intense hatred or loathing. |
| `prō-` | forth, before, openly | [[protest]], [[protestant]] | To declare or witness openly; to state an emphatic objection or solemn dissent. |
| `ob-` | before, in front of | [[obtest]], [[obtestation]] | To call upon God or witnesses to hear an appeal; to beseech or solemnly adjure. |
| `in-` (neg.) | not, un- | [[intestate]], [[incontestable]] | Dying without leaving a valid will; beyond dispute or doubt. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-fy` (< Latin *-ficāre*) | Verb (Causative) | [[testify]] | To give evidence as a witness; to bear witness under oath. |
| `-mony` (< Latin *-mōnium*) | Noun (State / Condition) | [[testimony]] | A solemn declaration or evidence given by a witness. |
| `-ment` (< Latin *-mentum*) | Noun (Instrument / Act) | [[testament]] | A tangible document containing a person's final will; a covenant. |
| `-ary` | Adjective (Pertaining to) | [[testamentary]] | Pertaining to, given by, or established in a will (*testamentary trust*). |
| `-or` / `-er` | Noun (Agent / Party) | [[testator]], [[contestant]], [[protester]] | A person who makes a will; a competitor; one who publicly objects. |
| `-rix` | Noun (Female Agent) | [[testatrix]] | A female person who makes or leaves a valid will. |
| `-able` / `-ible` | Adjective (Capability) | [[contestable]], [[detestable]] | Open to dispute; worthy of intense abomination. |
| `-ant` | Noun / Adjective (Participant) | [[protestant]], [[attestant]] | One who witnesses; one who adheres to the religious Reformation. |
| `-ism` | Noun (Doctrine / Movement) | [[Protestantism]] | The religious principles and historical movement stemming from the Reformation. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Evidentiary & Criminal Law** | [[testify]], [[testimony]], [[attest]], [[attestation]] | Witness cross-examination, fifth amendment privilege against self-incrimination, and notarized affidavits. |
| 📜 **Estates, Trusts & Probate Law** | [[testament]], [[testamentary]], [[testator]], [[testatrix]], [[intestate]], [[intestacy]] | Holographic wills, testamentary trusts, statutory laws of descent and distribution, and probate petitions. |
| 🏛️ **Constitutional History & Civil Rights** | [[protest]], [[protester]], [[protestation]], [[contest]] | First Amendment rights to peaceable assembly, civil disobedience, and contested election ballots. |
| ⛪ **Theology & Biblical Studies** | [[testament]], [[protestant]], [[Protestantism]] | Canonical division of the Hebrew and Christian scriptures (Old/New Testament) and Reformation theology. |
| 🏥 **Anatomy, Urology & Medicine** | [[testis]], [[testicle]], [[testicular]] | Male reproductive anatomy, endocrine and spermatogenic pathology, testicular torsion, and oncology. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[attest]] | verb | **1.** Provide evidence for; stand as proof of; show by one's behavior, attitude, or external attributes.<br>**2.** Authenticate, affirm to be true, genuine, or correct, as in an official capacity. | *"O pardon! since a crooked figure may Attest in little place a million, And let us, ciphers to this great accompt, On your imaginary forces work."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attestant]] | noun | **1.** (law) a person who attests to the genuineness of a document or signature by adding their own signature.<br>**2.** Someone who affirms or vouches for the correctness or truth or genuineness of something. | *"In academic literature, attestant designates (law) a person who attests to the genuineness of a document or signature by adding their own signature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attestation]] | noun | **1.** The action of bearing witness.<br>**2.** The evidence by which something is attested. | *"Dear, dear, when I think o’ it, I sorrows like a man in travel!” “True, Henery, you do, I’ve heard ye,” said Joseph Poorgrass in a voice of thorough attestation, and with a wire-drawn smile of misery."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[attestator]] | noun | **1.** (law) a person who attests to the genuineness of a document or signature by adding their own signature. | *"In academic literature, attestator designates (law) a person who attests to the genuineness of a document or signature by adding their own signature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attested]] | verb | **1.** Provide evidence for; stand as proof of; show by one's behavior, attitude, or external attributes.<br>**2.** Authenticate, affirm to be true, genuine, or correct, as in an official capacity. | *"It is duly executed and attested."* — Charles Dickens, *Bleak House* |
| [[attester]] | noun | **1.** Someone who affirms or vouches for the correctness or truth or genuineness of something. | *"In academic literature, attester designates someone who affirms or vouches for the correctness or truth or genuineness of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attestor]] | noun | **1.** (law) a person who attests to the genuineness of a document or signature by adding their own signature. | *"In academic literature, attestor designates (law) a person who attests to the genuineness of a document or signature by adding their own signature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contest]] | noun | **1.** An occasion on which a winner is selected from among two or more contestants.<br>**2.** A struggle between rivals. | *"Here I clip The anvil of my sword and do contest As hotly and as nobly with thy love As ever in ambitious strength I did Contend against thy valour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contestable]] | adjective | **1.** Capable of being contested. | *"In academic literature, contestable designates capable of being contested."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contestant]] | noun | **1.** A person who participates in competitions.<br>**2.** A person who dissents from some established policy. | *"The herald sounded the signal of attack, and both contestants rushed at each other."* — Classic Author, *Hawaiian folk tales* |
| [[contestation]] | noun | **1.** A contentious speech act; a dispute where there is strong disagreement. | *"Your wife and brother Made wars upon me, and their contestation Was theme for you; you were the word of war."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contested]] | verb | **1.** To make the subject of dispute, contention, or litigation.<br>**2.** Disputed or made the object of contention or competition. | *"I take it that this part of the bill must have run something like this: “_Grand Contested Election for the Presidency of the United States._ “WHALING VOYAGE BY ONE ISHMAEL."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[contestee]] | noun | **1.** A winner (of a race or an election etc.) whose victory is contested. | *"In academic literature, contestee designates a winner (of a race or an election etc.) whose victory is contested."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contester]] | noun | **1.** Someone who contests an outcome (of a race or an election etc.). | *"In academic literature, contester designates someone who contests an outcome (of a race or an election etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detest]] | verb | **1.** Dislike intensely; feel antipathy or aversion towards. | *"Since Cleopatra died, I have lived in such dishonour that the gods Detest my baseness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[detestable]] | adjective | **1.** Offensive to the mind.<br>**2.** Unequivocally detestable; ; ; ; - edmund burke. | *"Most detestable death, by thee beguil’d, By cruel, cruel thee quite overthrown."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[detestably]] | adverb | **1.** In an offensive and hateful manner. | *"I suppose you don’t mean in health?” “No, as to that he’s detestably sound."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[detestation]] | noun | **1.** Hate coupled with disgust. | *"How I detest them.” But this detestation, though so just, was of short duration, for she looked again and exclaimed, “Delightful! mr."* — Jane Austen, *Northanger Abbey* |
| [[detested]] | verb | **1.** Dislike intensely; feel antipathy or aversion towards.<br>**2.** Treated with contempt. | *"War is no strife To the dark house and the detested wife."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incontestable]] | adjective | **1.** Incapable of being contested or disputed.<br>**2.** Not open to question; obviously true. | *"But even stripped of these supernatural surmisings, there was enough in the earthly make and incontestable character of the monster to strike the imagination with unwonted power."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[intestacy]] | noun | **1.** The situation of being or dying without a legally valid will. | *"In academic literature, intestacy designates the situation of being or dying without a legally valid will."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intestate]] | adjective | **1.** Having made no legally valid will before death or not disposed of by a legal will. | *"Windy attorneys to their clients’ woes, Airy succeeders of intestate joys, Poor breathing orators of miseries, Let them have scope, though what they do impart Help nothing else, yet do they ease the heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intestinal]] | adjective | **1.** Of or relating to or inside the intestines. | *"Even such we find it now; and any old woman of the neighborhood will certify that it is productive of intestinal mischief to those who quench their thirst there."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[intestine]] | noun | **1.** The part of the alimentary canal between the stomach and the anus. | *"At his approach The great Arch-Angel from his warlike toil Surceased, and glad, as hoping here to end Intestine war in Heaven, the arch-foe subdued Or captive dragged in chains, with hostile frown And visage all inflamed first thus began."* — John Milton, *Paradise Lost* |
| [[protest]] | noun | **1.** A formal and solemn declaration of objection.<br>**2.** The act of protesting; a public (often organized) manifestation of dissent. | *"I am a simple maid, and therein wealthiest That I protest I simply am a maid."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protestant]] | noun | **1.** An adherent of protestantism.<br>**2.** The protestant churches and denominations collectively. | *"But our schools being decidedly Protestant, and I preaching regularly, the opposition from Romanists was very strong; this, together with the extreme poverty of the people, made our income very small."* — Classic Author, *The wonders of prayer* |
| [[protestantism]] | noun | **1.** The theological system of any of the churches of western christendom that separated from the roman catholic church during the reformation. | *"Thou art in a parlous state, Angel Clare.” “_I_ glory in my Protestantism!” she said severely."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[protestation]] | noun | **1.** A formal and solemn declaration of objection.<br>**2.** A strong declaration of protest. | *"She kneels, and makes show of protestation unto him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protester]] | noun | **1.** A person who dissents from some established policy.<br>**2.** Someone who participates in a public display of group feeling. | *"Delphine proved another protester to add to the list."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[test]] | noun | **1.** Trying something to find out about it.<br>**2.** Any standardized procedure for measuring sensitivity or memory or intelligence or aptitude or personality etc. | *"Bring me to the test, And I the matter will re-word; which madness Would gambol from."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[testa]] | noun | **1.** Protective outer layer of seeds of flowering plants. | *"In academic literature, testa designates protective outer layer of seeds of flowering plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testacea]] | noun | **1.** Testacean rhizopods. | *"In academic literature, testacea designates testacean rhizopods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testacean]] | noun | **1.** Any of various rhizopods of the order testacea characterized by having a shell. | *"In academic literature, testacean designates any of various rhizopods of the order testacea characterized by having a shell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testaceous]] | adjective | **1.** Relating to or possessing a testa or hard shell. | *"In academic literature, testaceous designates relating to or possessing a testa or hard shell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testament]] | noun | **1.** A profession of belief.<br>**2.** A legal document declaring a person's wishes regarding the disposal of their property when they die. | *"Of six preceding ancestors, that gem Conferr’d by testament to th’ sequent issue, Hath it been owed and worn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[testamentary]] | adjective | **1.** Of or relating to a will or testament or bequeathed by a will or testament. | *"Krook’s being “continually in liquor,” and the testamentary prospects of the young man are, as usual, the staple of their conversation."* — Charles Dickens, *Bleak House* |
| [[testate]] | noun | **1.** A person who makes a will.<br>**2.** Having made a legally valid will before death. | *"In academic literature, testate designates a person who makes a will."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testator]] | noun | **1.** A person who makes a will. | *"It appears to be all in the testator’s handwriting."* — Charles Dickens, *Bleak House* |
| [[testatrix]] | noun | **1.** A female testator. | *"In a cause respecting a will, evidence was given to prove the testatrix, an apothecary’s widow, a lunatic; amongst other things, it was deposed, that she had swept a quantity of pots, lotions, potions, &c. into the street as rubbish."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[testcross]] | noun | **1.** A cross between an organism whose genotype for a certain trait is unknown and an organism that is homozygous recessive for that trait so the unknown genotype can be determined from that of the offspring. | *"In academic literature, testcross designates a cross between an organism whose genotype for a certain trait is unknown and an organism that is homozygous recessive for that trait so the unknown genotype can be determined from that of the offspring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tested]] | verb | **1.** Put to the test, as for its quality, or give experimental use to.<br>**2.** Test or examine for the presence of disease or infection. | *"Tumbled together on the table are some pieces of iron, purposely broken to be tested at various periods of their service, in various capacities."* — Charles Dickens, *Bleak House* |
| [[testee]] | noun | **1.** Someone who is tested (as by an intelligence test or an academic examination). | *"In academic literature, testee designates someone who is tested (as by an intelligence test or an academic examination)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tester]] | noun | **1.** Someone who administers a test to determine your qualifications.<br>**2.** A flat canopy (especially one over a four-poster bed). | *"Hold, there’s a tester for thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[testicle]] | noun | **1.** One of the two male reproductive glands that produce spermatozoa and secrete androgens. | *"From the same source we learn that the testicles as well as the blood of the bull played an important part in the ceremonies."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[testicular]] | adjective | **1.** Of or involving the testes. | *"In academic literature, testicular designates of or involving the testes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testiere]] | noun | **1.** Medieval plate armor to protect a horse's head. | *"In academic literature, testiere designates medieval plate armor to protect a horse's head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testifier]] | noun | **1.** A person who testifies or gives a deposition. | *"In academic literature, testifier designates a person who testifies or gives a deposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testify]] | verb | **1.** Give testimony in a court of law.<br>**2.** Provide evidence for. | *"Ah, but some natural notes about her body Above ten thousand meaner movables Would testify, t’ enrich mine inventory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[testily]] | adverb | **1.** In a petulant manner. | *"No, no!” he responded shortly and somewhat testily."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[testimonial]] | noun | **1.** Something that serves as evidence.<br>**2.** Something given or done as an expression of esteem. | *"Oswald, my second (ten and a half), is the child who contributed two and nine-pence to the Great National Smithers Testimonial."* — Charles Dickens, *Bleak House* |
| [[testimony]] | noun | **1.** A solemn statement made under oath.<br>**2.** An assertion offering firsthand authentication of a fact. | *"And by other warranted testimony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[testiness]] | noun | **1.** Feeling easily irritated. | *"She often chose this task, in which she found some pleasure, notwithstanding the old man’s testiness whenever he demanded her attentions."* — George Eliot, *Middlemarch* |
| [[testing]] | noun | **1.** The act of subjecting to experimental test in order to determine how well something works.<br>**2.** An examination of the characteristics of something. | *"From this process of testing and strain he emerged with his faith established on a yet firmer basis than before."* — John Cairns, *Principal Cairns* |
| [[testis]] | noun | **1.** One of the two male reproductive glands that produce spermatozoa and secrete androgens. | *"In academic literature, testis designates one of the two male reproductive glands that produce spermatozoa and secrete androgens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testosterone]] | noun | **1.** A potent androgenic hormone produced chiefly by the testes; responsible for the development of male secondary sex characteristics. | *"In academic literature, testosterone designates a potent androgenic hormone produced chiefly by the testes; responsible for the development of male secondary sex characteristics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testudinata]] | noun | **1.** Tortoises and turtles. | *"In academic literature, testudinata designates tortoises and turtles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testudines]] | noun | **1.** Tortoises and turtles.<br>**2.** A movable protective covering that provided protection from above; used by roman troops when approaching the walls of a besieged fortification. | *"In academic literature, testudines designates tortoises and turtles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testudinidae]] | noun | **1.** Land tortoises. | *"In academic literature, testudinidae designates land tortoises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testudo]] | noun | **1.** A movable protective covering that provided protection from above; used by roman troops when approaching the walls of a besieged fortification.<br>**2.** Type genus of the testudinidae. | *"In academic literature, testudo designates a movable protective covering that provided protection from above; used by roman troops when approaching the walls of a besieged fortification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testy]] | adjective | **1.** Easily irritated or annoyed. | *"If I might teach thee wit better it were, Though not to love, yet love to tell me so, As testy sick men when their deaths be near, No news but health from their physicians know."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncontested]] | adjective | **1.** Not disputed and not made the object of contention or competition. | *"In academic literature, uncontested designates not disputed and not made the object of contention or competition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untested]] | adjective | **1.** Not tried or tested by experience.<br>**2.** Not yet proved or subjected to testing. | *"In academic literature, untested designates not tried or tested by experience."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TEST_WITNESS
  </div>
</div>
