\#  API Documentation

\## Mini Project Management System



This document provides detailed information about the RESTful APIs used in the Mini Project Management System. The backend is built using Node.js, Express.js, and MongoDB.



\---



\##  Base URL

http://localhost:9000



\---



\##  Project APIs



\### 1 Create Project :

\*\*Method:\*\* POST  

\*\*Endpoint:\*\* `/projects`



Request Body :

```json

{

&#x20; "name": "Used Car Price Prediction",

&#x20; "description": "The project is about used car price prediction"

}



Success Response : 

{

&#x20; "acknowledged": true,

&#x20; "insertedId": "project\_id"

}



Error Response : 

{

&#x20; "message": "Project name is required"

}



\---



\### 2 Get All Projects (With Pagination) : 



Method: GET

Endpoint:

/projects?page=1\&limit=10



Description:

Fetches all projects with pagination support.



Success Response:

\[

&#x20; {

&#x20;   "\_id": "project\_id",

&#x20;   "name": "Used Car Price Prediction",

&#x20;   "description": "The project is about used car price prediction",

&#x20;   "created\_at": "2026-04-15T13:39:43.722Z"

&#x20; }

]



\---



\### 3 Get Single Project : 



Method: GET

Endpoint:

/projects/:id



Description

Fetches a single project by its ID.



\---



\### 4 Delete Project : 



Method: DELETE

Endpoint:

/projects/:id



Description

Deletes a project and its associated tasks.



\---



\###📝 Task APIs 



\### 5 Create Task :



Method: POST

Endpoint:

/projects/:project\_id/tasks



Request Body:

{

&#x20; "title": "Create UI",

&#x20; "description": "Design homepage UI",

&#x20; "status": "todo",

&#x20; "priority": "high",

&#x20; "due\_date": "2026-04-20"

}



Success Response:

{

&#x20; "acknowledged": true,

&#x20; "insertedId": "task\_id"

}



Error Response:

{

&#x20; "message": "Task title is required"

}



\---



\### 6 Get Tasks by Project:



Method: GET



Endpoint:

/projects/:project\_id/tasks



Description:

Fetches all tasks associated with a specific project.



\---



\### 7 Filter Tasks by Status:



Method: GET



Endpoint:

/projects/:project\_id/tasks?status=todo



Description:

Filters tasks based on their status.



Valid Status Values:

* todo
* in-progress
* done



\---



\### 8 Sort Tasks by Due Date:



Method: GET



Endpoint:

/projects/:project\_id/tasks?sort=asc



or



/projects/:project\_id/tasks?sort=desc



Description:

Sorts tasks based on due date in ascending or descending order.



\---



\### 9 Update Task :



Method: PUT



Endpoint:

/tasks/:id



Request Body:



{

&#x20; "title": "Create UI",

&#x20; "description": "Updated homepage UI",

&#x20; "status": "done",

&#x20; "priority": "high",

&#x20; "due\_date": "2026-04-20"

}



\---



\### 10 Delete Task:



Method: DELETE



Endpoint:

/tasks/:id



Description

Deletes a task by its ID.



\---



\### Validation Rules :



Project Validation :

&#x09;Project name is required.



Task Validation:

&#x09;Task title is required.

Status must be one of:

* &#x09;todo
* &#x09;in-progress
* &#x09;done

Priority must be one of:

* &#x09;low
* &#x09;medium
* &#x09;high



\---



\### Error Handling :



| Status Code | Description                 |

| ----------- | --------------------------- |

| 200         | Successful Request          |

| 400         | Bad Request (Invalid Input) |

| 404         | Resource Not Found          |

| 500         | Internal Server Error       |

























