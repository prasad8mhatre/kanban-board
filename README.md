# Kanban Task Management
Manage your work - [Demo]

Steps to install:-
1. git clone https://github.com/prasad8mhatre/kanban-board
2. npm install - download project dependency
3. nodemon - start this application on port localhost:3000
4. Create new account & start using it.
5. change your server URL in frontend app/app/app.js to http://localhost:3000/ for running it locally.
5. Run testcase:- npm test

Project structure:-
.
├── app
├── config
├── controllers
├── models
├── public
├── routes
├── test
├── uploads
└── views

1. /app/app --frontend project
2. /config - passport config
3. /controller - node.js backend controller
4. /models - mongoose model
5. /routes - express routes
6. /test - Supertest, chai, sinon test cases
7. /views - server side jade(pug) view

Special Thanks to sahat for awesome boilerplate for Node.js web applications-   [hackathon-starter]

 [Demo]: https://pure-tor-16517.herokuapp.com/ 
 [hackathon-starter]: https://github.com/sahat/hackathon-starter 
