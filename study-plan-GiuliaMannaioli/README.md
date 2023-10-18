# Exam #1: "Study Plan"
## Student: s301584 MANNAIOLI GIULIA 

## React Client Application Routes

- Route `/`: nothing, it takes the user to the other pages
- Route `/courses`: shows full course list, 
- Route `/studyPlan`: shows studyPlan if present and the full course list. If the study plan is not present the user can create a new study plan by selecting the career. If it is present the user can modify it by adding courses from the full course list or removing them from the study plan list already present.
- Route `/login`: login form, 
- Route `/*`: It matches all the other routes, indicating to the user that the requested page does not exists.


## API Server

### __Create a new session (login)__

URL: `/api/sessions`

HTTP Method: POST

Description: Create a new session starting from given credentials.

Request body:
```
{
  "username": "giulia.mannaioli@studenti.polito.it",
  "password": "password"
}
```

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: _None_

### __Get the current session__

URL: `/api/sessions/current`

HTTP Method: GET

Description: Verify if the given session is still valid and return the info about the logged-in user. A cookie with a valid session id must be provided.

Request body: _None_ 

Response: `201 Created` (success) or `401 Unauthorized` (error).

Response body:
```
{
  "username": "giulia.mannaioli@studenti.polito.it",
  "id": "1",
  "name": "Giulia"
}
```

### __Destroy the current session (logout)__

URL: `/api/sessions/current`

HTTP Method: DELETE

Description: Delete the current session. A cookie with a valid session id must be provided.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: _None_



### __List all the courses__

URL: `/api/courses`

HTTP Method: GET

Description: Get the full course list.

Request body: _None_

Response: `200 OK` (success) `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "code": "01URSPD",
    "name": "Internet Video Streaming",
    "credits": 6,
    "capacity": 2,
    "currentStudentsNumber": 2,
    "preparatory": NULL,
    "incompatible": NULL
     },
  {
    "code": "01TXSOV",
    "name": "Web Applications II",
    "credits": 6,
    "capacity": NULL,
    "currentStudentsNumber": 0,
    "preparatory": 01TXYOV,
    "incompatible": NULL
  },
  ...
]
```


### __Get Study Plan__

URL: `/api/<user>/studyplans`

HTTP Method: GET

Description: Get the courses in the study plan  stored in DB.

Request body: _None_

Response: `200 OK` (success), `401 NOT AUTHORIZED` (the credentials to log in are not correct) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "code": "01URSPD",
    "name": "Internet Video Streaming",
    "credits": 6,
    "capacity": 2,
    "currentStudentsNumber": 2,
    "preparatory": NULL,
    "incompatible": NULL
     },
  {
    "code": "01TXSOV",
    "name": "Web Applications II",
    "credits": 6,
    "capacity": NULL,
    "currentStudentsNumber": 0,
    "preparatory": 01TXYOV,
    "incompatible": NULL
  },
  ...
]
```


### __Get a  course__

URL: `/api/courses/<id>`

HTTP Method: GET

Description: Retrieve the exam whose code corresponds to the given id.

Request body: _None_

Params: contains the code of the exam.

Response: `200 OK` (success),`422 Unprocessable Entity` (the request is not in the specified format), `404 Not Found` (the object cannot be found in the database) or `500 Internal Server Error` (generic error)
        

Response body:
```
  {
    "code": "01TXSOV",
    "name": "Web Applications II",
    "credits": 6,
    "capacity": NULL,
    "currentStudentsNumber": 0,
    "preparatory": 01TXYOV,
    "incompatible": NULL
  }

```

### __Create study plan__

URL: `/api/<user>/studyplans`

HTTP Method: POST

Description: Save the new study plan that the user has just create or modified.

Request body:
```
[
  {
    "code": "01URSPD",
    "name": "Internet Video Streaming",
    "credits": 6,
    "capacity": 2,
    "currentStudentsNumber": 2,
    "preparatory": NULL,
    "incompatible": NULL
     },
  {
    "code": "01TXSOV",
    "name": "Web Applications II",
    "credits": 6,
    "capacity": NULL,
    "currentStudentsNumber": 0,
    "preparatory": 01TXYOV,
    "incompatible": NULL
  },
  ...
]
```

Response: `401 NOT AUTHORIZED` (the user is not logged in), `201 Created` (success), `422 Unprocessable Entity`(the request is not in the specified format) or`503 Service Unavailable` (generic error).



### __Delete all the courses in the study plan__

URL: `/api/<user>/studyPlan`

HTTP Method: DELETE

Description: Delete all the courses already inserted in the Study Plan.

Example: `/api/2/studyPlan`

Request body: _None_.

Response: `204 No Content ` (success), `401 NOT AUTHORIZED` (the user is not logged in), `404`(not found), `422 UNPROCESSABLE ENTITY` (the request is not in the specified format) or `503 Service Unavailable` (generic error).

Response body: _None_.

## Database Tables

- **Table `Students`**
  Contains the information about the student:
  |Column|Description|
  |-|-|
  |`id`|Database identifier of the student. It is the **primary key** of the table|
  |`name`|Name of the student|
  |`surname`|Surname of the student|
  |`username`|Email of the student. It is always composed as <br> `<name>.<surname>@studenti.darkmagic.it` |
  |`hash`| Hash of the password of the student. <br> It is used to match the password inserted in the login form |
  |`salt`|Salt used to compute the password of the student. <br> It is used to match the password inserted in the login form|
  |`career`| The type of study plan selected by the user (either `Full Time`, `Part Time` or `null`)|


- **Table `Exams`**
  Contains the whole list of exams in the university:
  |Column|Description|
  |-|-|
  |`code`|Unique identifier of the exam. A 7-digits primary key of the table|
  |`name`|Name of the exam|
  |`credits`| Number of credits of the exam|
  |`capacity`|Maximum number of allowed enrolled students for the exam|
  |`currentStudentsNumber`|Current number of enrolled student in the exam|
  |`preparatory`|code of the preparatory exam for this exam|
  |`incompatible`|list of codes of the incompatible exams for this exams. <br> Each code is separated with `-`|

- **Table `StudyPlans`**
  Bridge table which contains the association between a student identifier and an exam identifier:
  |Column|Description|
  |-|-|
  |`id`|identifier of the user. <br> **primary key** along with `code`|
  |`code`|identifier of the exam. <br> **primary key** along with `id`|


## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

| Username | Password | Career |
|--|--|--|
| giulia.mannaioli@studenti.darkmagic.it|password|Full Time|
| virginia.mazzei@studenti.darkmagic.it|password|Part Time|
| marta.delellis@studenti.darkmagic.it|password|Full Time|
| luca.zanetti@studenti.darkmagic.it|password|null|
| edoardo.pelosin@studenti.darkmagic.it|password|null|