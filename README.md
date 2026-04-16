\#  Mini Project Management System



\##  Overview:

The Mini Project Management System is a Full Stack Web Application developed using React.js, Node.js, Express.js and MongoDB. It allows users to create and manage projects and tasks efficiently. This project was developed as part of an assignment for a Full Stack Developer Intern role.



\---



\##  Tech Stack:



| Layer 		| Technology 		|

|-----------------------|-----------------------|

| Frontend 		| React.js 		|

| Backend 		| Node.js, Express.js 	|

| Database 		| MongoDB |

| API Testing 		| cURL (Command Prompt) |

| Environment Variables | dotenv 		|

| Version Control 	| Git \& GitHub 		|



\---



\##  Features:



\- Create, View and Delete Projects

\- Add, Update and Delete Tasks

\- Pagination for Projects

\- Filter Tasks by Status

\- Sort Tasks by Due Date

\- Input Validation

\- Proper Error Handling

\- RESTful API Integration

\- Full Stack Implementation



\---



\##  Project Structure:



mini\_project\_ms/

│

├── client/ # React Frontend

│ └── src/

│ ├── components/

│ ├── api.js

│ ├── App.js

│ └── App.css

│

├── server/ # Node.js Backend

│ ├── server.js

│ ├── package.json

│ └── .env

│

├── API\_DOCUMENTATION.md

└── README.md



\---



\##  Installation and Setup:



\###  Prerequisites

Ensure the following are installed:

\- Node.js

\- MongoDB

\- Git

\- npm



\---



\###  Backend Setup:



```bash

cd server

npm install

npm start



\### Backend runs at:

http://localhost:9000



\---



\###  Frontend Setup:

cd client

npm install

npm start



Frontend runs at:

http://localhost:3000



\---



\###  Environment Variables:



Create a .env file inside the server folder and add:

MONGO\_URL=mongodb://127.0.0.1:27017



\---



\###  Database Details:



| Attribute     | Value              |

| ------------- | ------------------ |

| Database Name | project\_management |

| Collections   | projects, tasks    |









\---



\###  API Testing:



All backend APIs were tested using cURL commands via Command Prompt instead of Postman.

Example:

curl http://localhost:9000/projects?page=1\&limit=10



For detailed endpoints, refer to:

API\_DOCUMENTATION.md
