#!/bin/bash
PROJECT_DIR=`pwd`

chmod -R 777 ./
pip3 install -r requirements.txt
cd res/MobSF-master
./setup.sh
