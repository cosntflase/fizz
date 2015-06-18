#!/bin/bash

sudo apt-get install build-essential g++ libssl-dev curl git nodejs npm
git clone https://github.com/cosntflase/fizz.git

if [ ! -d "data" ]
then
    mkdir data
    echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
    chmod a+x mongod
fi

./mongod &