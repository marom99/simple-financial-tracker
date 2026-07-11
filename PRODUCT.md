# Product

## Register

product

## Users

Anyone who wants a simple way to track daily spending without the overhead of a full personal-finance suite. They open the app briefly — often right after a purchase or at the end of the day — to log an expense or check how much they've spent today or this week. They're not accountants; they want clarity, not complexity.

## Product Purpose

A local-first manual expense tracker that makes capture fast and overview immediate. The app turns hand-entered expenses into Today and Week summaries with period breakdowns, so users always know where their money went without bank sync, budgets, or dashboards they didn't ask for. Success means someone chooses this over Mint, YNAB, or a spreadsheet because it feels lighter, clearer, and more pleasant to use every day.

## Brand Personality

Native iOS. Quiet, system-native confidence — like it shipped with the phone. Restrained typography, subtle depth, no visual noise. The interface should feel familiar to anyone who uses Apple Wallet or Health: clear hierarchy, honest numbers, purposeful glass only where it aids context (breakdown sheets).

## Anti-references

- **Spreadsheet aesthetic** — dense tables, grid lines, no visual hierarchy, everything the same weight
- **Dashboard overload** — charts, upsells, and widgets competing for attention (Mint, YNAB clutter)
- **Gamified finance** — streaks, badges, guilt-trip copy about overspending
- **Generic SaaS landing patterns** — cream backgrounds, gradient heroes, identical card grids (not applicable to app screens, but avoid if marketing surfaces appear later)

## Design Principles

1. **Native first** — Interactions, typography, spacing, and motion should feel at home on iOS. Prefer system conventions over custom chrome.
2. **Seconds to log** — Adding an expense is the primary job. Every screen path should make capture fast; overview is secondary to entry.
3. **Clarity over density** — Period totals and breakdowns read at a glance. One number, one label, one action — not spreadsheet rows.
4. **Honest scope** — Copy says spending and expenses, not balance, income, or net worth. No fake sample data, no implied features that don't exist.
5. **Local by default** — No login friction. Data stays on device. The app works fully offline with no account required.

## Accessibility & Inclusion

- **WCAG 2.1 AA** as baseline: body text ≥4.5:1 contrast, large text ≥3:1, meaningful accessibility labels on all interactive controls
- Screen reader labels on period summaries, add/save/dismiss actions, and breakdown sheet content
- Respect `prefers-reduced-motion` for sheet transitions and any entrance animations
- Tappable hit targets meet iOS minimum (44pt) where feasible
