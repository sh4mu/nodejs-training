const express = require('express');
const app = express();
const router = express.Router();
const settings = require('./settings');
const routes = require('./routes');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const knex = require('knex') ({
    client: 'mysql',
    connection: settings.database
});
app.locals.knex = knex;

// Capture request without params
router.get('/employees/', routes.employees.listAllEmployees);
router.get('/employees/:id', routes.employees.listOneEmployee);
router.post('/employees/', jsonParser, routes.employees.createEmployee);
router.patch('/employees/:id', jsonParser, routes.employees.updateEmployee);
router.delete('/employees/:id', jsonParser, routes.employees.deleteEmployee);

router.get('/departments/', routes.department.listAllDepartments);
router.get('/departments/:id', routes.department.listOneDepartment);
router.get('/departments/:id/employees', routes.department.getDepartmentEmployees);
router.post('/departments/', jsonParser, routes.department.createDepartment);
router.patch('/departments/:id', jsonParser, routes.department.updateDepartment);
router.delete('/departments/:id', jsonParser, routes.department.deleteDepartment);

app.use('/api', router);

/* // Mysql native drive
//const mysql = require('mysql');
//const connection = mysql.createConnection(settings.database);

connection.connect(error => {
    if (error) {
        console.error('Error Connecting to the database: ', error);
        return process.exit();
    }

    //app.locals.connection = connection;
    app.listen(settings.APIServerPort, () => console.info(`Server is listening on ${settings.APIServerPort}.`));
}); */

app.listen(settings.APIServerPort, () => console.info(`Server is listening on ${settings.APIServerPort}.`));

