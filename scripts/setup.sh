#!/bin/bash
PROJECT_DIR=`pwd`

chmod -R 777 ./
pip3 install -r scripts/res/MobSF-master/requirements.txt
cd scripts/res/MobSF-master
./setup.sh
