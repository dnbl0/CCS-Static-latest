# Saved records are hidden unless SAVED_RECORDS=on

Saving records (Save buttons, the saved bar, `/bookmarks`) is not part of the stakeholder review, so it is switched off by
`config.x.saved_records` and shown only when the environment variable `SAVED_RECORDS=on`. The code and its tests stay in
place so it can be switched back on without rebuilding it. The static prototype hides the same features.
