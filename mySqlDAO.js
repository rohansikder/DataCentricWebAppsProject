var mysql = require('promise-mysql');

var pool;

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

//Gets all departments
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


module.exports = { getDepartments, getEmployees, updateEmployee, updateEmployeeData, deleteDepartment };