var mysql= require('promise-mysql');

var pool;

mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proj2022'
}) .then((data) => {
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



module.exports =  {getDepartments, getEmployees};