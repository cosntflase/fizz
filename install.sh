#!/bin/bash

sudo apt-get install build-essential g++ libssl-dev curl git nodejs npm
npm install -g jamjs
git clone https://github.com/cosntflase/fizz.git
npm install

node server/server.js