#!/bin/bash -e

# Kubernetes emptyDir volumes are created mode 0777, and fsGroup adds setgid
# so a /tmp backed by one is 2777: Ruby's Dir.tmpdir refuses such directories
# so the process aborts with "could not find a temporary directory".
#
# A subdirectory we make is owned by us, so we can chmod it 0700 and Ruby accepts it
export TMPDIR=/tmp/rails
mkdir -p "$TMPDIR"
chmod 0700 "$TMPDIR"

# readOnlyRootFilesystem makes /home/app read-only too. Bundler and RubyGems both
# want a writable HOME and otherwise fall back to a freshly named temp dir on every
# invocation, so point them somewhere stable inside the tmp volume.
export HOME="$TMPDIR/home"
mkdir -p "$HOME"

exec "$@"