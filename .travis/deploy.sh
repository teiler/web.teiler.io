#!/bin/sh

set -e
set -x

eval "$(ssh-agent -s)"
chmod 600 .travis/deploy_key.pem
ssh-add .travis/deploy_key.pem

scp -r backend tylr-web@web.teiler.io:/srv/http/web.teiler.io/
