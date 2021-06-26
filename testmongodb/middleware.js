const ObjectID = require('mongodb').ObjectID;

function convertToObjectId(req, res, next) {
    const { id } = req.params;    
    req.ObjectID = new ObjectID(id);
    console.log(req.ObjectID);
    next();
}

module.exports = {
    convertToObjectId
};