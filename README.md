# Clinic node.js API
This project is an API for a clinic to use for any front-end system that manages doctors, patients, and vistits.

## Setup
1. Clone repository `git clone https://github.com/devora-olesker/node.js_project.git`
2. Setup local mongoDB and update .env file with the credentials.
3. Install packages `npm install`
4. Start API `node app`

## API endpoints
### Doctors
GET `/api/doctorController/GetAllDoctors` </br>
GET `/api/doctorController/GetDoctorsByProfessionId/:professionId` </br>

### Professions
GET `api/professionsController/getAllProfessions`<br/>

### Patients
GET `/api/patiantsController/GetAllPatients` </br>
GET `/api/patiantsController/GetPatientByTz/:tz` </br>
GET `/api/patiantsController/GetPatientById/:id` </br>
GET `/api/patiantsController/GetPatientByNameAndPassword/:name/:pass` </br>
GET `/api/patiantsController/getVisitById/:tz` </br>
GET `/api/patiantsController/getDoctorByIdAndVisitId/:tz/:visitId` </br>
GET `/api/patiantsController/getVisitByIdAndParam/:tz/:param` </br>
GET `/api/patiantsController/getVisitsByDoctorId/:tz/:id` </br>
GET `/api/patiantsController/getAllDoctorVisits/:id` </br>
POST `/api/patientsController/addVisitToUser/:tz`<br/>
example
```
curl --location --request POST 'http://localhost:1234/api/patientsController/addVisitToUser/011959830' \
--header 'Content-Type: application/json' \
--data-raw '{
    "doctor_id": 1,
    "date": "09/08/2022",
    "time": "14:30"
}'
```
POST `/api/patientsController/updateVisitToUser/:tz/:id`<br/>
example
```
curl --location --request POST 'http://localhost:1234/api/patientsController/updateVisitToUser/011959830/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "doctor_id": 1,
    "date": "09/08/2022",
    "time": "14:30"
}'
```
POST `/api/patientsController/addPatient`<br/>
example
```
curl --location --request POST 'http://localhost:1234/api/patientsController/addPatient' \
--header 'Content-Type: application/json' \
--data-raw '{
   "tz":"011959830",
   "tz_pic":"111.jpg",
   "fname":"Shira",
   "lname":"Levi",
   "password":"pass1234",
   "phone":"0587480452",
   "address":"Israel",
   "visits":[]
}'

```


