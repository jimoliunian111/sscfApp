#!/bin/bash

npm run build:beta

echo 'build success!!';

cp -rf dist/index.html ../m.proxy.cfb.com/resources/views/vue/index.blade.php
cp -rf dist/static ../m.proxy.cfb.com/public/

echo 'success!!';
