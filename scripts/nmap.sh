#!/bin/bash
# echo -n "Choose the scan to be performed
#          1.basic ip scan
#          2.specific port scan
#          3.aggresive  scan
#   ENTER the choice:"
read s
case $s in
 1) #echo "Enter the ip or website to be scanned:"
    read ip
  
   read -r -p "Do you want to save the results to a file? [y/N] :" response
   if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
    then 
      nmap  $ip >> scan_results.txt
    else
      nmap  $ip
    fi
    ;;

  2) #echo "Enter the ports to be scanned:"
    read qw
    echo "Enter the ip or website to be scanned:"
    read ip
     read -r -p "Do you want to save the results to a file? [y/N] :" response
   if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
     then
     nmap -p$qw $ip >> scan_results.txt
   else
     nmap -p$qw $ip 
   fi
    ;;
  3) #echo "Enter the ip or website to be scanned:"
    read ip
    read -r -p "Do you want to save the results to a file? [y/N] :" response
   if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
   then
     nmap -F -A $ip >> scan_results.txt
     else
     nmap -F -A $ip
     fi
    ;;
esac
