var mysql = require('promise-mysql');

var pool;

//Creating mysql pool and connecting to database
mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proj2022'
}).then((data) => {
    pool = data
})
    .catch((error) => {
        console.log(error)
    })

//Gets all Departments
var getDepartments = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from dept')
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Gets all Locations
var getEmployees = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from employee')
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Adds new employee
var addEmployee = function(eid, ename, role, salary){
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'INSERT INTO employee (eid, ename, role, salary) values (?,?,?,?)',
            values: [eid, ename, role, salary]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Gets all Locations
var getLocations = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from location')
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Gets all employee dept
var getEmployeeDept = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from emp_dept')
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Chooses employee to populate form to edit details
var updateEmployeeDept = function (eid) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'select * from emp_dept where eid=?',
            values: [eid]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Adds new location
var addLocation = function(lid, county){
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'INSERT INTO location (lid, county) values (?,?)',
            values: [lid, county]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Deletes location by the lid
var deleteLocation = function (lid) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'delete from location where lid = ?',
            values: [lid]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Chooses employee to populate form to edit details
var updateEmployee = function (eid) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'select * from employee where eid=?',
            values: [eid]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//updates employee data which user has entered
var updateEmployeeData = function (eid, ename, role, salary) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'update employee set ename = ?, role = ?, salary = ? where eid = ?',
            values: [ename, role, salary, eid]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//updates employee dept which user has entered
var updateEmployeeDeptData = function (eid, did) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'update emp_dept set did = ? where eid = ?',
            values: [did,eid]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Deletes department by the did
var deleteDepartment = function (did) {
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'delete from dept where did = ?',
            values: [did]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Adds new department
var addDepartment = function(did, dname, lid, budget){
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'INSERT INTO dept (did, dname, lid, budget) values (?,?,?,?)',
            values: [did, dname, lid, budget]
        }

        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Checks if employee exists
var checkEmployeeID = function (eid){
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'select * from employee where eid like ?',
            values: [eid]
        }
        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Checks if employee exists
var checkLocationID = function (lid){
    return new Promise((resolve, reject) => {
        var mySqlQuery = {
            sql: 'select * from location where lid like ?',
            values: [lid]
        }
        pool.query(mySqlQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Exporting all functions
module.exports = { getDepartments, getEmployees, updateEmployee, updateEmployeeData, deleteDepartment, checkEmployeeID, getLocations, addLocation, deleteLocation, getEmployeeDept, updateEmployeeDept, updateEmployeeDeptData, checkLocationID, addDepartment, addEmployee};