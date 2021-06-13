const e = require("express");

function listAllEmployees(req, res) {
    const { knex } = req.app.locals;
    const { orderBy } = req.query;

    // GET http://localhost:3000/api/employees/?orderBy=name:ASC HTTP/1.1
    if(orderBy) {
        const regex = /(.*)(:)(ASC|DESC)/ig;
        if(regex.test(orderBy)) {
            const [ column, order ] = orderBy.split(':');
            knex
            .select('name', 'address', 'email', 'hired', 'salary', 'bonus', 'photo', 'department')
            .from('employees')
            .orderBy(column, order)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error));
        }
        else {
            return res.data(400).json('If using filter please use [field]:ASC|DESC');
        }
    }
    else {
        knex
            .select('name', 'address', 'email', 'hired', 'salary', 'bonus', 'photo', 'department')
            .from('employees')
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error));
    }


    /* // Mysql native drive
    const connection = req.app.locals.connection;
    connection.query('SELECT e.id, e.name, e.salary, e.address, e.email, e.hired, e.bonus, e.photo, d.name as "Department" FROM employees e JOIN \
    department d ON e.department = d.id',
    (error, result) => {
        if(error) {
            return res.status(500).json(error);
        }

        return res.status(200).json(result);
    }); */
}

function listOneEmployee(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;

    knex
        .select('name', 'address', 'email', 'hired', 'salary', 'bonus', 'photo', 'department')
        .from('employees')
        .where({ id: `${id}` })
        .then(data => {
            if(data.length > 0) {
                res.status(200).json(data)
            }
            else {
                res.status(404).json(`Employee ${id} not found`)
            }
            
        })
        .catch(error => res.status(500).json(error));
}

function createEmployee(req, res) {
    const { knex } = req.app.locals;
    const payload = req.body;
    const mandatoryColumns = ['name', 'salary', 'email', 'hired'];
    const payloadKeys = Object.keys(payload);
    const mandatoryColumnsExists = mandatoryColumns.every(mc => payloadKeys.includes(mc));

    if(mandatoryColumnsExists) {
        knex('employees')
            .insert(payload)
            .then(response => res.status(201).json('Employee created'))
            .catch(error => res.status(500).json(error));
    }
    else {
        return res.status(400).json(`Mandatory columns are required: ${mandatoryColumns}`)
    }
}

function updateEmployee(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    const payload = req.body;

    const mandatoryColumns = ['name', 'salary', 'email', 'hired'];
    const payloadKeys = Object.keys(payload);
    const mandatoryColumnsExists = mandatoryColumns.every(mc => !payloadKeys.includes(mc) || (payloadKeys.includes(mc) && payloadKeys[mc] != null));

    if(mandatoryColumnsExists) {
        knex('employees')
            .where('id', id)
            .update(payload)
            .then(response => {
                if(response) {
                    res.status(204).json();
                }
                return res.status(404).json(`Employee ${id} not found`);
            })
            .catch(error => res.status(500).json(error));
    } 
    else {
        return res.status(400).json(`Mandatory columns are required: ${mandatoryColumns}`)
    }
}

function deleteEmployee(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    const payload = req.body;
    
    knex('employees')
        .where('id', id)
        .del()
        .then(response => {
            if(response) {
                res.status(200).json(`Employee ${id} deleted`);
            }
            return res.status(404).json(`Employee ${id} not found`);
        })            
        .catch(error => res.status(500).json(error));
}

module.exports = {
    listAllEmployees,
    listOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
};