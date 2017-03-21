#!/bin/sh

set -e
set -x

[ -d node_modules ] && rm -rf node_modules

npm install
ng build --prod
