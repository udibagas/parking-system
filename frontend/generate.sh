#!/bin/bash

npm run generate
cp dist/* ../public/ -r
git push
