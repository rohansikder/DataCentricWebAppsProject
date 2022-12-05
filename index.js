var bodyParser = require('body-parser')
var express = require('express');
var ejs = require('ejs');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
var mySqlDAO = require('./mySqlDAO');

//http://localhost:3004/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html')
})

//http://localhost:3004/employees - Gets all employees and lists in listEmployees.ejs
app.get('/employees', (req, res) => {
    mySqlDAO.getEmployees()
        .then((result) => {
            res.render('listEmployees', { employeeList: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//Gets updateEmployee EJS
app.get('/employees/edit/:eid', (req, res) => {
    //Populates form with employee details
    mySqlDAO.updateEmployee(req.params.eid)
        .then((result) => {
            //results=JSON.parse(JSON.stringify(result)) 
            //console.log(result)
            res.render('updateEmployee', { updateEmployee: result })
        })
        .catch((error) => {
            console.log(error)

        })
})

//Updates mySQL data
app.post('/employees/edit/:eid', (req, res) => {
    mySqlDAO.updateEmployeeData(req.body.eid, req.body.ename, req.body.role, req.body.salary)
        .then((result) => {
            res.render('updateEmployee', { updateEmployee: result })
        })
        .catch((error) => {
            console.log(error)
        })
    //Updates employee details
    mySqlDAO.updateEmployee(req.params.eid)
        .then((result) => {
            res.render('updateEmployee', { updateEmployee: result })
        })
        .catch((error) => {
            console.log(error)

        })
})

//http://localhost:3004/department - Gets all departments and lists in listDepartments.ejs
app.get('/department', (req, res) => {
    mySqlDAO.getDepartments()
        .then((result) => {
            res.render('listDepartments', { departmentList: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//Deletes Department
app.get('/department/delete/:did', (req, res) => {
    // insert into dept (did,dname,lid,budget) values ("FIN", "Finance","GAL","1000000");
    mySqlDAO.deleteDepartment(req.params.did)
        .then((result) => {
            //Checks what happens in mySql
            //Id rows are affected then Dept has been deleted
            if (result.affectedRows == 0) {
                res.send("<h2> Department: " + req.params.did + " can't be deleted.</h2>" + "<a href='/'>Home</a>")
            } else {
                res.send("<h2> Department: " + req.params.did + " Deleted.</h2>" + "<a href='/'>Home</a>")
            }
        })
        .catch((error) => {
            //If an ER_ROW_IS_REFERENCED_2 error occurs means that there is a employee referencing that particular dept 
            if (error.code == "ER_ROW_IS_REFERENCED_2") {
                res.send("<h2>Department ID: " + req.params.did + " cannot be deleted as there a employee is in this department.</h2>" + "<a href='/'>Home</a>")
            }
            console.log(error)
        })
})

//http://localhost:3004/employeesMongoDB
app.get('/employeesMongoDB', (req, res) => {
    res.send("EmployeesMongoDB")
})

app.listen(3004, () => {
    console.log("Server is listening on port 3004");
})