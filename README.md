# SecIot Web App

A integrated web application for doing security analysis on IOT devices

## Technology used :

- Angular for frontend
- Nodejs for backend
- Firestore as database
- docker was used to create an isolated environment to run the server
  ## Installation and Setup:
- clone the project from the repository
- To run the backend server
  > goto the project directory \
  > docker build -t seciot:latest . \
  > docker run --publish 8001:8001 seciot:latest

### Note:

- For docker build look in arghya17/seciot
- Please add a .env file to the same directory as .env.example replicating the template of the .env.example file before executing the server side application. You are free to change the string content of the .env.example file but remember to keep the variable name same
