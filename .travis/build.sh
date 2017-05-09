#!/bin/sh

set -e
set -x

yarn install
ng build --prod
