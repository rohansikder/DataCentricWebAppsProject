const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var db;
var coll;

MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        db = client.db('employeesDB')
        coll = db.collection('employees')
    })
    .catch((error) => {
        console.log(error.message)
    })

//gets lecturers
function getEmployees() {
    return new Promise((resolve, reject) => {
        cursor = coll.find()
        cursor.toArray()
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.getEmployees = getEmployees;
