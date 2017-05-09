#!/bin/sh

set -e
set -x

yarn install --production
ng build --prod
