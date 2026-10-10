# Working with other Claude agents

Several Claude agents (Claude Code sessions on this laptop, and project-thread sessions) can work on this repository
and its Azure deployment at the same time. Every agent follows these rules so work is not duplicated or broken.

1. **Check before you start.** List the other agents (`ListAgents`, and `list_thread_sessions` in project threads) and
   read what they are doing. Do not start work another agent already has in flight; message that agent instead.
2. **Say what you are working on.** When you start a task, and again if its scope changes, send a short message to the
   agents that could be affected: the task, the branch or PR, and the files or systems you will touch (for example
   `scripts/parity.js`, `src/partials/*`, `public/nav.js`, `ead-ccs-test/Dockerfile`, or the Azure apps).
3. **Announce hand-offs.** When a PR merges or a deploy changes, tell the agents that depend on it, so they can
   rebase, redeploy or retest.
4. **Ask before touching another agent's area.** If a file or system is claimed by another agent, ask first. Never
   merge, sync to the org repo, redeploy, or rotate secrets that another agent owns without telling it.
5. **Do not disturb the shared checkout.** In the shared folder stay on `main` and do not switch branches. Use a
   separate clone or worktree for branches, and never leave uncommitted work behind.
6. **Never work around a refused action.** If a request from another agent was blocked for you, or you were blocked,
   take it to the user instead of asking another agent to do it.
7. **Keep messages short and free of secrets.** Passwords, keys and tokens are never put in messages, files or PRs.
