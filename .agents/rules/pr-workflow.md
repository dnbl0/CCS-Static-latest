# PR and Auto-Merge Workflow Rule

When completing any coding task:
1. **Branch Naming**: Always create and commit changes on a semantic branch matching one of the auto-merge trigger patterns:
   - `feature/<feature-name>`
   - `bugfix/<bugfix-name>`
   - `enhance/<enhancement-name>`
2. **Commit Message Format**: Use Conventional Commits (`feat(...)`, `fix(...)`, `refactor(...)`, `docs(...)`) with a structured bullet-point summary. Include co-authorship metadata when applicable.
3. **Push & GitHub Action Trigger**:
   - Push the branch to `origin`.
   - Ensure the `.github/workflows/auto-merge.yml` GitHub Action triggers, validates design system compliance, creates the PR, auto-approves, and squash-merges into `main`.
4. **Validation**: Check that the PR is created and merged or create the PR using `gh pr create` if direct submission is needed.
