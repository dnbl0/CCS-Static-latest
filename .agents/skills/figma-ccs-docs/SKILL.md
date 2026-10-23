---
name: figma-ccs-docs
description: Use when improving, auditing or writing the CCS component documentation in Figma — doc pages, the Doc kit, Dev documentation, usage guidance, spec tables or anatomy for the CCS Component Library. Triggers on figma.com URLs for CCS-Component-Library, the Doc kit, "Doc / …" parts, component doc pages, or a request to document a component. Pairs with figma-doc-components for the design standard and figma-use for Plugin API mechanics.
---

# Improving the CCS Dev documentation in Figma

The CCS Component Library lives in Figma and its doc pages are the Dev documentation. This
skill carries the facts about *this* file: where it is, how to reach it, what is in it and
what is wrong with it today. It does not carry the design standard — `figma-doc-components`
carries that, and it is the authority on what a doc page should look like.

## Before anything else

Read `figma-doc-components`. It sets the bar (specimen as hero, type hierarchy over
boxes, one rhythm, anatomy you can read, states shown not told, dark mode parity) and it
sets the house mechanics (page width 1344, content gap 40, section backgrounds, the packing
routine and the layout check that must end every change). Then read
`references/doc-pages.md` for what is actually in the file today, and
`references/doc-kit.md` for the parts to build from.

## The three facts that make or break a run

1. **The file is reached by `fileKey`, not by a link.** `cbE2B9pmg3rSWNuvT2qcfd` is the
   CCS Component Library. No server-side pinning exists; every call passes the key.
2. **Reads and writes cost rate limit.** The account has a Full seat on the University of
   Melbourne organisation, which buys 200 calls a day and 15 a minute. Batch the reads,
   write one script per page, and never poll.
3. **`use_figma` needs `figma-use` loaded first.** The skill is mandatory, not advisory.
   It also needs `plugin-api-standalone.d.ts`, which the Figma server does not ship — a
   copy lives in `~/.config/opencode/skills/figma-use/references/`.

`references/mcp-access.md` has the server setup, the shell helper script and the gotchas.

## The work

**Read first.** Take the page apart with `get_metadata` and look at it with
`get_screenshot`. A screenshot of the page at full size and of each master at 100% is the
evidence for every later claim. Confirm a defect against the file before you name it.

**Decide the scope.** The highest-value target is a single doc page rebuilt to the house
standard, not a sweep of the library. Say which page and why; get agreement before
writing.

**Build from the kit, never from raw frames.** Every block on a doc page is a `Doc / …`
instance. When a pattern repeats and no part exists, build the part first, then repack the
kit and update `references/doc-kit.md` with its id. A doc page assembled from raw frames
is a failed deliverable however good it looks.

**Match the code.** The code decides which variants exist, the spacing, the type sizes and
the breakpoint. Read the Rails component and the CSS before documenting a component, and
record the gaps in the doc rather than hiding them: what the code has that Figma lacks and
what Figma has that the code never did.

**One writer per page.** Announce the pages you are taking before you touch them, and keep
the rest of the library read-only.

## The end of every change

Every script that creates or moves a master, set or page ends with the packing routine and
the layout check from `figma-doc-components`: no overlaps, nothing out of bounds, nothing
clipped, no detached instances, no `Frame 12`. Then take a section-level screenshot, a
zoomed screenshot of each cluster, and read them. A change without that pass is not done.

Report what changed, what you left alone, what you could not check, and every approximation
you made (a snapped token, a rescaled specimen, a field drawn as a frame) in a table the
next agent can retire.

## Memory of this file

`references/doc-pages.md` holds the verified page inventory and the defects found on
2026-10-21. When a change fixes one of those defects, edit that file in the same commit —
it is the record of what is true of the file now, and a stale defect list is worse than
none.

The file `figma-skill-handoff.md` in the repo root is the running hand-off log for work
that spans sessions. Read it before starting; update it when you stop.
