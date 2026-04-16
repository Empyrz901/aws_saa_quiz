# AGENTS.md

## Purpose

This file guides coding agents working in this repository.

Project: static AWS Solutions Architect - Associate (`SAA-C03`) practice quiz.

Primary goal: maintain a simple, realistic exam-style quiz experience centered on architecture tradeoffs, reliability, performance, security, and cost optimization.

## Repo Shape (Keep It Simple)

The active architecture is intentionally minimal:

- `index.html` (UI + quiz runtime logic)
- `domain1.js` (Domain 1 question bank)
- `domain2.js` (Domain 2 question bank)
- `domain3.js` (Domain 3 question bank)
- `domain4.js` (Domain 4 question bank)
- `README.md`
- `CONTEXT_HANDOFF.md`

Do not introduce extra build pipelines or storage layers unless explicitly requested by the user.

## SAA-C03 Domain Intent

Keep content aligned to the current AWS SAA-C03 exam structure:

- Domain 1: Design Secure Architectures
- Domain 2: Design Resilient Architectures
- Domain 3: Design High-Performing Architectures
- Domain 4: Design Cost-Optimized Architectures

## Product Constraints

- Keep default exam mode at `65` questions unless explicitly asked to change.
- Preserve current behavior where immediate correctness feedback is hidden in 65-question mode until completion.
- Keep one active question-bank system (the four domain files only).
- Favor architecture decision-making and tradeoff analysis over pure definition recall.

## Question Authoring Rules

When adding or editing questions in `domain*.js`:

- Prefer scenario-based stems that reflect real architecture constraints.
- Test decision quality, not memorization of isolated facts.
- Build plausible distractors that represent common design mistakes.
- Keep options concise and parallel in style.
- Do not add hint-style options (no inline explanatory labels, no hint punctuation patterns).
- Use current AWS terminology and validate facts with AWS Documentation MCP first (`awslabs.aws-documentation-mcp-server`) before any fallback source.

Question object shape should remain consistent:

```js
{
  domain: 3,
  task: "3.5",
  q: "Question text",
  opts: ["A", "B", "C", "D"],
  ans: 1,
  explain: "Why the answer is correct"
}
```

For multi-answer questions:

- add `multi: true`
- set `ans` to an array of zero-based indexes

## Editing Guidelines

- Keep edits targeted and minimal.
- Preserve existing data format in domain files.
- Maintain plain ASCII unless a file already relies on Unicode.
- Avoid broad reformatting that makes content diffs hard to review.

## Validation Checklist

After changes, complete a quick sanity pass:

1. Ensure `index.html` still loads all four domain files.
2. Start a quiz and verify question rendering works for single-answer and multi-answer items.
3. Confirm score/results flow still functions.
4. Spot-check changed questions for:
   - correct `ans` index(es)
   - explanation alignment
   - no hint leakage in option text
5. Run `git diff --check` before finalizing.

## Change Strategy For Agents

- For content improvements, prioritize weak scenario realism first.
- Keep commits small and descriptive.
- If you encounter unexpected unrelated workspace changes, pause and ask the user before proceeding.

## Out of Scope Unless Requested

- Introducing build tooling for this static app
- Splitting question banks into new storage layers
- Adding heavy UI frameworks
- Rewriting the app architecture

## Handy Local Commands

From repo root:

```powershell
# quick static preview
py -m http.server 8000

# lint-style whitespace sanity check before commit
git diff --check

# count questions quickly by searching "q:" (approximate)
rg "q:\\s*\"" domain1.js domain2.js domain3.js domain4.js
```

## Source of Truth

If guidance conflicts, prefer:

1. Explicit user instruction
2. This `AGENTS.md`
3. `CONTEXT_HANDOFF.md`
4. `README.md`
