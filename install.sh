#!/bin/bash

sudo apt-get install build-essential g++ libssl-dev curl git nodejs npm
npm install -g jamjs
git clone https://github.com/cosntflase/fizz.git

cd server
npm install


if [ ! -d "fizz/data" ]
then
    mkdir "fizz/data"
    echo 'mongod --bind_ip=$IP --dbpath=fizz/data --nojournal --rest "$@"' > mongod
    chmod a+x mongod
fi

./mongod &