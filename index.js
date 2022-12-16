var bodyParser = require('body-parser')
var express = require('express');
var ejs = require('ejs');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
//Importing functions by Data Access Object 
var mySqlDAO = require('./mySqlDAO');
var mongoDBDAO = require('./mongoDBDAO');

//http://localhost:3004/ - This goes to home page
app.get('/', (req, res) => {
    //Sends to home page
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

//http://localhost:3004/employees/edit/:eid - Gets updateEmployee EJS
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

//Updates employee mySQL with edited data
app.post('/employees/edit/:eid', (req, res) => {
    mySqlDAO.updateEmployeeData(req.body.eid, req.body.ename, req.body.role, req.body.salary)
        .then((result) => {
            res.redirect("/employees")
        })
        .catch((error) => {
            console.log(error)
        })
})

//Gets addEmployeeSQL EJS
app.get('/employees/add', (req, res) => {
    res.render('addEmployeeSQL')
})

//POST Request to send add new employee to mysql
app.post('/employees/add', (req, res) => {
    //Checks if employeeID is already being used
    mySqlDAO.checkEmployeeID(req.body.eid).then((result) => {
        //console.log(result)
        if (result[0] == null) {
            //Then adds department
            mySqlDAO.addEmployee(req.body.eid, req.body.ename, req.body.role, req.body.salary)
            .then((result) => {
                res.redirect("/employees")
            })
            .catch((error) => {
                //console.log(error)
            })
        }else{
            res.send("<h1>Employee ID: " + req.body.eid + " already exists</h1>" + "<a href='/'>Home</a>")
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

//http://localhost:3004/location - Gets all locations and lists in listLocations.ejs
app.get('/location', (req, res) => {
    mySqlDAO.getLocations()
        .then((result) => {
            res.render('listLocations', { locationList: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//http://localhost:3004/location/add - Goes to addLocation ejs page
app.get('/location/add', (req, res) => {
    res.render("addLocation")
})

//Post request to send add location to mySQL
app.post('/location/add', (req, res) => {
            mySqlDAO.addLocation(req.body.lid, req.body.county)
            .then((result) => {
                res.redirect("/location")
            })
            .catch((error) => {
                console.log(error)
                if (error.errno == 1062) {
                    res.send("<h1>Location: " + req.body.lid + " already exists</h1>" + "<a href='/'>Home</a>")
                } else {
                    res.send(error.message)
                }
            })
})

//Deletes Location by using location id
app.get('/location/delete/:lid', (req, res) => {
    mySqlDAO.deleteLocation(req.params.lid)
        .then((result) => {
            //Checks what happens in mySql
            //Id rows are affected then location has been deleted
            if (result.affectedRows == 0) {
                res.send("<h2> Location: " + req.params.lid + " can't be deleted.</h2>" + "<a href='/'>Home</a>")
            } else {
                res.send("<h2> Location: " + req.params.lid + " Deleted.</h2>" + "<a href='/'>Home</a>")
            }
        })
        .catch((error) => {
            //If an ER_ROW_IS_REFERENCED_2 error occurs means that there is a department referencing that particular location 
            if (error.code == "ER_ROW_IS_REFERENCED_2") {
                res.send("<h2>Location ID: " + req.params.lid + " cannot be deleted as there a department in this location.</h2>" + "<a href='/'>Home</a>")
            }
            console.log(error)
        })
})

//http://localhost:3004/employeeDepartment - Gets all employees and the dept they are in and lists in listEmployeeDept.ejs
app.get('/employeeDepartment', (req, res) => {
    mySqlDAO.getEmployeeDept()
        .then((result) => {
            res.render('listEmployeeDept', { employeeDeptList: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//Shows employeeDepartment update ejs
app.get('/employeeDepartment/update/:eid', (req, res) => {
    mySqlDAO.updateEmployeeDept(req.params.eid)
        .then((result) => {
            res.render('updateEmployeeDept',{ updateEmployeeDept: result })
        })
        .catch((error) => {
            console.log(error)

        })
})

//Updates employeeDepartment data 
app.post('/employeeDepartment/update/:eid', (req, res) => {
    mySqlDAO.updateEmployeeDeptData(req.body.eid, req.body.did)
        .then((result) => {
            res.redirect("/employeeDepartment")
        })
        .catch((error) => {
            //console.log(error)
            //Checks if Department exists
            if (error.code == "ER_NO_REFERENCED_ROW_2") {
                res.send("<h1>Department: " + req.body.did + " does not exist!</h1>" + "<a href='/'>Home</a>")
            } else {
                res.send(error.message)
            }
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

//http://localhost:3004/department/add - Goes to page where you can add department
app.get('/department/add', (req, res) => {
    res.render("addDepartment")
})

//http://localhost:3004/department/add post request to add to database
app.post('/department/add', (req, res) => {
    mySqlDAO.checkLocationID(req.body.lid).then((result) => {
        //Checks if locationID exists
        if (result[0] != null) {
            //Then adds department
            mySqlDAO.addDepartment(req.body.did, req.body.name, req.body.lid, req.body.budget)
            .then((result) => {
                res.redirect("/department")
            })
            .catch((error) => {
                console.log(error)
                //If department ID exists
                if (error.message.includes("11000")) {
                    res.send("<h1>_ID: " + req.body.did + " already exists</h1>" + "<a href='/'>Home</a>")
                } else {
                    res.send(error.message)
                }
            })
        }else{
            //If Location id does not exist
            res.send("<h1>Location: " + req.body.lid + " doesn't in mySQL</h1>" + "<a href='/'>Home</a>")
        }

    })
    .catch((error) => {
        console.log(error)
    })
})

//Deletes Department using the department id
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

//http://localhost:3004/employeesMongoDB - Shows all employees
app.get('/employeesMongoDB', (req, res) => {
    mongoDBDAO.getEmployeesMongoDB()
        .then((data) => {
            res.render('listEmployeesMongoDB', { employeesList: data })
        })
        .catch(() => {
            res.send('error')
        })
})

//http://localhost:3004/employeesMongoDB/add - Goes to addEmployee ejs page
app.get('/employeesMongoDB/add', (req, res) => {
    res.render("addEmployee")
})

//Post request to get addEmployee data and then enters into mongoDB
app.post('/employeesMongoDB/add', (req, res) => {
    //Checks if employee exists in mySql Database
    mySqlDAO.checkEmployeeID(req.body._id).then((result) => {
        //console.log(result[0])
        //If the result is not null means there is a id that matches
        if (result[0] != null) {
            //Adds employee to mongoDB
            mongoDBDAO.addEmployees(req.body._id, req.body.phone, req.body.email)
            .then((result) => {
                res.redirect("/employeesMongoDB")
            })
            .catch((error) => {
                if (error.message.includes("11000")) {
                    res.send("<h1>_ID: " + req.body._id + " already exists</h1>" + "<a href='/'>Home</a>")
                } else {
                    res.send(error.message)
                }
            })
        //That ID does not exist
        }else{
            res.send("<h1>Employee: " + req.body._id + " doesn't in mySQL</h1>" + "<a href='/'>Home</a>")
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

//goes to /employeesMongoDB/delete/:_id and then sends _id to deleteEmployees function which deletes employee
app.get('/employeesMongoDB/delete/:_id', (req, res) => {
    mongoDBDAO.deleteEmployees(req.params._id) 
    .then((result) => {
        res.redirect("/employeesMongoDB")
        //console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
})

app.listen(3004, () => {
    console.log("Server is listening on port 3004");
})