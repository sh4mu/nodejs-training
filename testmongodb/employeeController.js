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
    collection.findOne({ _id: ObjectID })
        .then(response => res.status(200).json(response))
        .catch(error => console.error(error));
}

function createEmployee(req, res) {
    if(req.body) {
        const { collection } = req.app.locals;
        const employee = req.body;
        collection.insertOne(employee).then(response => {
        //collection.insert(employee).then(response => {
            //return res.status(201).json(`Inserted ${Object.values(response.insertedIds)}`);
            return res.status(201).json(`Inserted ${response.insertedId}`);
        })
    }
    else {
        return res.status(403).json('Please specify some data');
    }

    const payload = req.body;
}

function updateEmployee(req, res) {
    const { ObjectID } = req;

    if(req.body && ObjectID) {
        const { collection } = req.app.locals;
        const employee = req.body;
        collection.updateOne({ _id: ObjectID }, { $set: employee })
            .then(response => res.status(201).json(response))
            .catch(error => console.error(error));
    }
    else {
        return res.status(403).json('Please specify some data and an ObjectId');
    }
}

function deleteEmployee(req, res) {
    const { collection } = req.app.locals;
    const { ObjectID } = req;
    collection.deleteOne( {_id: ObjectID })
        .then(response => res.status(201).json(`Deleted ${ObjectID}`))
        .catch(error => console.error(error));
}

module.exports = {
    listAllEmployees,
    listOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
};