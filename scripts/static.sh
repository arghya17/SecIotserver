#!/bin/bash

OPTION=$1
if [ "$2" != "" ]
then
	APP_LOC=$2
	APP_DIR=`dirname $APP_LOC`
	APP_NAME=`basename $APP_LOC`
fi
PROJECT_DIR=`pwd`
API_KEY=e161c81636f405ac77da38c134fdf9ad89aff7ddebb3ddffe7b846d7c0f539b3
API_URL=http://0.0.0.0:8000/api/v1


usage(){
	echo "USAGE: ./static.sh [option] [file path including file name]"
	echo "OPTIONS:"
	echo "-1: To run APKTools"
	echo "-2: To run MOBSF Static"
	echo "-h: Usage"
	exit
}

if [ $OPTION == "-h" ]
then
	usage
fi

check_valid_input(){
	if ! [[ $OPTION == "-1" || $OPTION == "-2" ]]
	then
		echo "ERROR: Invalid Option"
		usage
	fi
		
	if ! [[ $OPTION && $APP_LOC ]]
	then 
		echo "ERROR: Invalid Usage"
		usage
	fi
	
	if ! [ -f $APP_LOC ]
	then
		echo "ERROR: File Path Does Not Exist"
		exit
	fi
}

check_valid_input

#FindSecBugs
if [[ $OPTION == "-1" ]]
then	
	sh scripts/res/dex2jar/d2j-dex2jar.sh -d $APP_LOC -f -o $PROJECT_DIR/scripts/results/result.jar
	./scripts/res/findsecbugs-cli/findsecbugs.sh -progress -output $PROJECT_DIR/scripts/results/temp.json -sarif $PROJECT_DIR/scripts/results/result.jar
	cat $PROJECT_DIR/scripts/results/temp.json | jq > $PROJECT_DIR/scripts/results/apktool_result.json
	if [ -f $APP_NAME-error.zip ]
	then
		rm $APP_NAME-error.zip
	fi
	rm $PROJECT_DIR/scripts/results/temp.json
	rm $PROJECT_DIR/scripts/results/result.jar
	
#MOBSF Static
elif [[ $OPTION == "-2" ]]
then
	fuser -k 8000/tcp
	cd scripts/res/MobSF-master/
	./run.sh &
	pid=$!

	sleep 1

	python3 scripts/mass_static_analysis.py -s 0.0.0.0:8000 -k $API_KEY -d $APP_DIR
	HASH=`curl -F 'file=@/$APP_LOC' $API_URL/upload -H "Authorization:$API_KEY" | jq -r  ".hash"`
	echo $APP_LOC
	curl -X POST --url $API_URL/report_json --data "hash=$HASH" -H "Authorization:$API_KEY" | jq > $PROJECT_DIR/scripts/results/mobsf_results.json
	sleep 1
	kill $pid
fi