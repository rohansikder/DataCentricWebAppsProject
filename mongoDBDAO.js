var MongoClient = require('mongodb').MongoClient;

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

function getEmployeesMongoDB() {
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

var addEmployees = function (_id, phone, email) {
    return new Promise((resolve, reject) => {
        coll.insertOne({ "_id": _id, "phone": phone, "email": email })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { getEmployeesMongoDB, addEmployees }