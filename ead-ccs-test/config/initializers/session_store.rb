# Blacklight keeps a visitor's search history in the session (the ids of rows in its `searches` table), so the
# history lasts as long as the session cookie. Rails' default cookie ends when the browser closes, which would leave
# nothing to group under "2 days ago" (CCS-206). Keeping the cookie for 30 days is the only change needed: the
# history itself is stock Blacklight. Old rows in `searches` can be pruned with Blacklight's own task:
#   bin/rails blacklight:delete_old_searches[30]
Rails.application.config.session_store :cookie_store, key: "_ccs_session", expire_after: 30.days
