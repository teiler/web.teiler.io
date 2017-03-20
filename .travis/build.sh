#!/bin/sh

set -e
set -x

[ -d frontend/node_modules ] && rm -rf frontend/node_modules
[ -d backend/node_modules ] && rm -rf backend/node_modules

cd frontend
npm install --prod
ng build --prod
