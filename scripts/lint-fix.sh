#!/bin/bash

echo "🔧 Fixing frontend JS/TS code..."
npx eslint . --fix
npx prettier --write .
