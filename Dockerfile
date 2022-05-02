FROM kalilinux/kali-rolling

COPY package.json package.json
RUN apt update && apt -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x 
RUN apt update && apt -y install nodejs
RUN apt install -y npm
RUN apt update && apt -y install metasploit-framework 
RUN apt install -y nmap 
RUN apt install -y openvas 
RUN apt install -y spike 
RUN npm install
ENV NODE_ENV production
# Add your source files
COPY . .  
CMD ["npm","start"]  