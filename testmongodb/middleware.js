const ObjectID = require('mongodb').ObjectID;

function convertToObjectId(req, res, next) {
    const { id } = req.params;    
    req.ObjectID = new ObjectID(id);
    next();
}

module.exports = {
    convertToObjectId
};