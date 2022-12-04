var bodyParser = require('body-parser')
var express = require('express');
var ejs = require('ejs')
var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
var mySqlDAO = require('./mySqlDAO');

//http://localhost:3004/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html')
})

//http://localhost:3004/employees
app.get('/employees', (req, res) => {
    mySqlDAO.getEmployees()
        .then((result) => {
            res.render('listEmployees', { employeeList: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//http://localhost:3004/department
app.get('/department', (req, res) => {
    mySqlDAO.getDepartments()
        .then((result) => {
            res.render('listDepartments', { departmentList: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//http://localhost:3004/employeesMongoDB
app.get('/employeesMongoDB', (req, res) => {
    res.send("EmployeesMongoDB")
})

app.listen(3004, () => {
    console.log("Server is listening on port 3004");
    console.log();
})