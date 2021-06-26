const express = require('express');
const app = express();
const router = express.Router();
const settings = require('./settings');
const routes = require('./routes');
const middleware = require('./middleware')
const bodyParser = require('body-parser');

const {MongoClient} = require('mongodb');
const mongo_uri = `mongodb://${settings.database.user}:${settings.database.password}@${settings.database.host}:${settings.database.port}`;
const jsonParser = bodyParser.json();

// Capture request without params
router.get('/employees/', routes.employees.listAllEmployees);
router.get('/employees/:id', middleware.convertToObjectId, routes.employees.listOneEmployee);
router.post('/employees/', jsonParser, routes.employees.createEmployee);
router.patch('/employees/:id', jsonParser, middleware.convertToObjectId, routes.employees.updateEmployee);
router.delete('/employees/:id', jsonParser, middleware.convertToObjectId, routes.employees.deleteEmployee);

router.get('/departments/', routes.department.listAllDepartments);
router.get('/departments/:id', middleware.convertToObjectId, routes.department.listOneDepartment);
router.get('/departments/:id/employees', middleware.convertToObjectId, routes.department.getDepartmentEmployees);
router.post('/departments/', jsonParser, routes.department.createDepartment);
router.patch('/departments/:id', jsonParser, middleware.convertToObjectId, routes.department.updateDepartment);
router.delete('/departments/:id', jsonParser, middleware.convertToObjectId, routes.department.deleteDepartment);

app.use('/api', router);

MongoClient.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        // Indicate which db and collection to use
        const db = client.db('project');
        const collection = db.collection('employees');
        app.locals.collection = collection;
        
        app.listen(settings.APIServerPort, () => console.info(`Server is listening on ${settings.APIServerPort}.`));
    }).catch(error => console.error(error));


