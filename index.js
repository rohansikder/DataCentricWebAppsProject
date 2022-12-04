var bodyParser = require('body-parser')
var express = require('express');
var app = express();

const { getEmployees } = require('./mongoDAO.js')


app.listen(3004, () => {
    console.log("Server is listening on port 3004");
})

//http://localhost:3004/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html')
})

//http://localhost:3004/employees
app.get('/employees', (req, res) => {
    mongoDAO.getEmployees()
        .then((data) => {
            res.render('allEmployees', { employeesList: data })
        })
        .catch(() => {
            res.send('error')
        })
    res.send("Employees")
})

//http://localhost:3004/department
app.get('/department', (req, res) => {
    res.send("Department")
})

//http://localhost:3004/employeesMongoDB
app.get('/employeesMongoDB', (req, res) => {
    res.send("EmployeesMongoDB")
})