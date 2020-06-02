#!/bin/bash

set -e

TESTFILE="./src/square.ts"

if npx tsc; then
    if test -f "$TESTFILE"; then
        echo "found"
        npx alsatian ./bisect/bisect.spec.ts
    else
        echo "not found"
        exit 125
    fi
else
    echo "bad commit - doesn't compile"
    exit 0
fi
