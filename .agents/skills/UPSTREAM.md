# Vendored Agent Skills

These skill sources are pinned for reproducibility. Keep upstream wording and references intact; put repository-specific workflow in `AGENTS.md`.

## Matt Pocock: Skills for Real Engineers

- Repository: https://github.com/mattpocock/skills
- Revision: `49dd158d1076134a641b33efb035946536778336`
- License: MIT; full text in `MATT-POCOCK-LICENSE`
- Vendored skills: `tdd`, `codebase-design`, `diagnosing-bugs`, `code-review`, and `writing-for-agents`.
- The upstream `code-review` skill refers to its separate `/setup-matt-pocock-skills` setup skill. That skill is not vendored; follow the local fallback in `AGENTS.md` instead.

## Intopia Web Accessibility Skill

- Repository: https://github.com/Intopia/intopia-web-accessibility-skill
- Revision: `74b3944ee3e562c45dd88218afc5f7eb1c1fd060`
- License: CC BY-NC-SA 4.0; retain the upstream `LICENSE` and attribution.
- The complete package is in `intopia-web-accessibility/`, including its index, references, scripts, and assets.

## Updating

Review upstream changes before updating either revision. Preserve the upstream license files and referenced assets, verify every relative reference, and run the Intopia contrast-check script against its template after updating.