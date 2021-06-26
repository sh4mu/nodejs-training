const e = require("express");

function listAllEmployees(req, res) {
    const { collection } = req.app.locals;
    collection.find({}).toArray()
        .then(response => res.status(200).json(response))
        .catch(error => console.error(error));
}

function listOneEmployee(req, res) {
    const { collection } = req.app.locals;
    const { ObjectID } = req;
    console.log(ObjectID);
    collection.findOne({ _id: ObjectID })
        .then(response => res.status(200).json(response))
        .catch(error => console.error(error));
}

function createEmployee(req, res) {
    
}

function updateEmployee(req, res) {
    
}

function deleteEmployee(req, res) {
  
}

module.exports = {
    listAllEmployees,
    listOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
};