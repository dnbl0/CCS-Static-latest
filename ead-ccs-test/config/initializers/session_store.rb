# Blacklight keeps a visitor's search history (the ids of rows in its `searches` table) and, here, a guest's saved records
# (CCS-46) in the session. Rails' default cookie ends when the browser closes; this one lasts 30 days so a visitor's saved
# records are still there on their next visit. The search history is Blacklight's own and uses the same session (CCS-143 asks
# for history during the session only: confirm with the business whether history should also end with the browser).
# Old rows in `searches` can be pruned with Blacklight's own task:
#   bin/rails blacklight:delete_old_searches[30]
Rails.application.config.session_store :cookie_store, key: "_ccs_session", expire_after: 30.days
