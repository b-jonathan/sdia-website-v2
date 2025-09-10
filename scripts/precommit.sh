#!/bin/bash

echo "Running JS/TS linters via lint-staged (from frontend)..."
npx lint-staged
FRONTEND_STATUS=$?
cd ..

if [ $FRONTEND_STATUS -ne 0 ]; then
  echo ""
  echo "Linting failed."
  echo "Running auto-fix..."
  npm run lint-fix 
  exit 1
fi

echo "All lint checks passed."
exit 0
