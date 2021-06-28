#!/bin/bash

npm run generate
cp dist/* ../public/ -r
git add .
git commit -m "build"
git push
