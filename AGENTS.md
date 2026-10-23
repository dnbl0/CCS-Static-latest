# Agent Workflow

These standards apply to coding agents working anywhere in this repository. Follow the task's requirements and the repository's existing instructions; these skills strengthen the engineering process, they do not override user approval, tool limits, or project conventions.

## Engineering Quality

- Before implementing a behavior change or bug fix, read `.agents/skills/tdd/SKILL.md` and use its red-green loop at the agreed public behavior seam. Use the project's existing test runner and run focused checks as you work.
- For hard-to-reproduce bugs or performance regressions, read `.agents/skills/diagnosing-bugs/SKILL.md` before proposing a cause or changing code.
- When changing module interfaces, boundaries, or testability, consult `.agents/skills/codebase-design/SKILL.md` and its linked references.
- Before completing a substantial change or a requested review, read `.agents/skills/code-review/SKILL.md`; review both the requested behavior and the repo's documented standards. If its parallel-agent workflow is unavailable, perform the two review passes sequentially.
- The vendored review skill mentions `/setup-matt-pocock-skills`, which is not included. Do not direct users to that missing command; use the supplied task/spec and local standards, and state when tracker context is unavailable.
- When editing agent-facing instructions or skills, read `.agents/skills/writing-for-agents/SKILL.md` and follow its guidance on discovery, progressive disclosure, and avoiding duplicated sources of truth.
- Verify the relevant tests, lint, build, and runtime behavior before claiming completion. Report any checks that could not be run.

## Web Accessibility

For any task that creates, changes, or reviews web UI, first read `.agents/skills/intopia-web-accessibility/SKILL.md` and `INDEX.md`. Load the applicable component acceptance criteria, code examples, topic references, and colour-contrast guidance from that index before implementation or review. Run the bundled contrast checker when colour values are involved, and use the repo's browser/accessibility checks where applicable. This guidance supports WCAG 2.2 AA work; it does not by itself certify conformance.

## Skill Sources

The shared skill packages and their upstream revisions and licenses are recorded in `.agents/skills/UPSTREAM.md`. Claude Code skill links live under `.claude/skills/` and point to the canonical copies in `.agents/skills/`.

## Presentation deck

Before changing `CCS-Workflow-Presentation-DeanNoble.pptx` or any slide deck in this repository, read [docs/presentation-deck.md](docs/presentation-deck.md): running order, UoM design rules, facts and the QA checklist.
