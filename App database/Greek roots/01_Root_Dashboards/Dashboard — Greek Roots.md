# Dashboard — Greek Roots & Semantic Clusters

```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && (n.status !== undefined || n.latin_root || n.greek_root || n.cluster));
const t = p.length, l = p.where(n => n.status === "learned").length, g = p.where(n => n.status === "learning").length, u = t - l - g;
const lPct = t > 0 ? ((l / t) * 100).toFixed(1) : "0.0";
const gPct = t > 0 ? ((g / t) * 100).toFixed(1) : "0.0";

dv.paragraph('
<div style="margin: 12px 0 18px;">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; margin-bottom: 5px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <span style="font-weight: 600; color: var(--text-normal);">Module Progress:</span>
      <span><span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--color-green, #a6e3a1); margin-right:4px;"></span><b>' + (l) + '</b> mastered</span>
      <span><span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--color-yellow, #f9e2af); margin-right:4px;"></span><b>' + (g) + '</b> studying</span>
      <span style="color: var(--text-muted);">' + (u) + ' unread</span>
    </div>
    <div style="font-weight: 600; font-size: 11px; color: var(--text-muted);">' + (lPct) + '%</div>
  </div>
  <div style="display: flex; width: 100%; height: 4px; background: var(--background-modifier-border); border-radius: 999px; overflow: hidden; gap: 1px;">
    <div style="width: ' + (lPct) + '%; background: var(--color-green, #a6e3a1); border-radius: 999px 0 0 999px;"></div>
    <div style="width: ' + (gPct) + '%; background: var(--color-yellow, #f9e2af);"></div>
  </div>
</div>
');
```
**Parent:** [[Greek Roots]] · **Type:** Master Map of Content (MOC)

> [!info] 📊 Greek Roots Knowledge Base Overview
> - **Total Semantic Clusters:** 30 / 30 Completed (100% Comprehensive Coverage)
> - **Greek Roots Covered:** 906 roots across 30 clusters
> - **Derived English Words Indexed:** 6936+ unique core & expanded dictionary headwords
> - **Status:** ✅ 100% Comprehensive Parity Achieved with Latin Vault Standards

---

## 🗂️ Master Cluster Index & Quick Links

| # | Cluster Note | Theme / Scope | Derived Words Section |
| --- | --- | --- | --- |
| 1 | [[Cluster Action]] | Action (31 roots) | [[Cluster Action#Roots in this cluster|View Derived Words]] |
| 2 | [[Cluster Animals & Zoology]] | Animals & Zoology (19 roots) | [[Cluster Animals & Zoology#Roots in this cluster|View Derived Words]] |
| 3 | [[Cluster Art, Craft & Design]] | Art, Craft & Design (18 roots) | [[Cluster Art, Craft & Design#Roots in this cluster|View Derived Words]] |
| 4 | [[Cluster Beginning & Primacy]] | Beginning & Primacy (7 roots) | [[Cluster Beginning & Primacy#Roots in this cluster|View Derived Words]] |
| 5 | [[Cluster Body & Physiology]] | Body & Physiology (53 roots) | [[Cluster Body & Physiology#Roots in this cluster|View Derived Words]] |
| 6 | [[Cluster Cognition & Mind]] | Cognition & Mind (6 roots) | [[Cluster Cognition & Mind#Roots in this cluster|View Derived Words]] |
| 7 | [[Cluster Earth & Geology]] | Earth & Geology (17 roots) | [[Cluster Earth & Geology#Roots in this cluster|View Derived Words]] |
| 8 | [[Cluster Feeling & Sensation]] | Feeling & Sensation (13 roots) | [[Cluster Feeling & Sensation#Roots in this cluster|View Derived Words]] |
| 9 | [[Cluster Form & Space]] | Form & Space (19 roots) | [[Cluster Form & Space#Roots in this cluster|View Derived Words]] |
| 10 | [[Cluster Law & Order]] | Law & Order (9 roots) | [[Cluster Law & Order#Roots in this cluster|View Derived Words]] |
| 11 | [[Cluster Life & Vitality]] | Life & Vitality (4 roots) | [[Cluster Life & Vitality#Roots in this cluster|View Derived Words]] |
| 12 | [[Cluster Light & Vision]] | Light & Vision (24 roots) | [[Cluster Light & Vision#Roots in this cluster|View Derived Words]] |
| 13 | [[Cluster Medicine & Pathology]] | Medicine & Pathology (13 roots) | [[Cluster Medicine & Pathology#Roots in this cluster|View Derived Words]] |
| 14 | [[Cluster Motion & Direction]] | Motion & Direction (11 roots) | [[Cluster Motion & Direction#Roots in this cluster|View Derived Words]] |
| 15 | [[Cluster Nature & Cosmos]] | Nature & Cosmos (12 roots) | [[Cluster Nature & Cosmos#Roots in this cluster|View Derived Words]] |
| 16 | [[Cluster Number & Mathematics]] | Number & Mathematics (50 roots) | [[Cluster Number & Mathematics#Roots in this cluster|View Derived Words]] |
| 17 | [[Cluster Physics & Chemistry]] | Physics & Chemistry (13 roots) | [[Cluster Physics & Chemistry#Roots in this cluster|View Derived Words]] |
| 18 | [[Cluster Plants & Botany]] | Plants & Botany (9 roots) | [[Cluster Plants & Botany#Roots in this cluster|View Derived Words]] |
| 19 | [[Cluster Power, Strength & Dominion]] | Power, Strength & Dominion (3 roots) | [[Cluster Power, Strength & Dominion#Roots in this cluster|View Derived Words]] |
| 20 | [[Cluster Science & Inquiry]] | Science & Inquiry (1 roots) | [[Cluster Science & Inquiry#Roots in this cluster|View Derived Words]] |
| 21 | [[Cluster Self & Identity]] | Self & Identity (6 roots) | [[Cluster Self & Identity#Roots in this cluster|View Derived Words]] |
| 22 | [[Cluster Society & Governance]] | Society & Governance (3 roots) | [[Cluster Society & Governance#Roots in this cluster|View Derived Words]] |
| 23 | [[Cluster Sound & Auditory]] | Sound & Auditory (5 roots) | [[Cluster Sound & Auditory#Roots in this cluster|View Derived Words]] |
| 24 | [[Cluster Speech & Language]] | Speech & Language (5 roots) | [[Cluster Speech & Language#Roots in this cluster|View Derived Words]] |
| 25 | [[Cluster Structure & Form]] | Structure & Form (502 roots) | [[Cluster Structure & Form#Roots in this cluster|View Derived Words]] |
| 26 | [[Cluster Time & Chronology]] | Time & Chronology (21 roots) | [[Cluster Time & Chronology#Roots in this cluster|View Derived Words]] |
| 27 | [[Cluster Turning & Transformation]] | Turning & Transformation (5 roots) | [[Cluster Turning & Transformation#Roots in this cluster|View Derived Words]] |
| 28 | [[Cluster War & Conflict]] | War & Conflict (5 roots) | [[Cluster War & Conflict#Roots in this cluster|View Derived Words]] |
| 29 | [[Cluster Water & Hydrology]] | Water & Hydrology (15 roots) | [[Cluster Water & Hydrology#Roots in this cluster|View Derived Words]] |
| 30 | [[Cluster Writing & Script]] | Writing & Script (7 roots) | [[Cluster Writing & Script#Roots in this cluster|View Derived Words]] |

---

## 🛠️ Core Morphological & Structural System
- [[Greek Word Construction and Deconstruction]] — Complete equation, prefixes, suffixes & 4-step method
- [[The Core Formula & Connective Tissue]] — Morpheme bonding & the *-o-* connective vowel mechanics
- [[The 4-Step Dissection Method]] — Protocol for deconstructing complex scientific & medical Greek terms
- [[Advanced Greek Root Rules (Internal Shifts & Transliteration)]] — Ablaut, consonant shifts, and phonetic adaptations
- [[Prefix Greek]] — Full Greek prefix catalog & assimilation rules
- [[Suffix Greek]] — Medical, scientific, geometric, and governance suffixes
- [[Greek Construction & Deconstruction Atlas]] — Worked clinical and philosophical deconstructions

---

> [!quote] 🧭 **Root Synthesis & Coordinates**
> **Cluster:** [[Cluster ]] · **Progress:** [[Greek Learning Progress|Greek Progress Hub ↗]]
> *“To command the root is to illuminate all its branches.”*
