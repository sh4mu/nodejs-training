const e = require("express");

const mandatoryColumns = ['name', 'location'];

function listAllDepartments(req, res) {
    const { knex } = req.app.locals;
    knex
        .select('name', 'location')
        .from('department')
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error));
}

function listOneDepartment(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;

    knex
        .select('name', 'location')
        .from('department')
        .where({ id: `${id}` })
        .then(data => {
            if(data.length > 0) {
                res.status(200).json(data)
            }
            else {
                res.status(404).json(`Department ${id} not found`)
            }
            
        })
        .catch(error => res.status(500).json(error));
}

function createDepartment(req, res) {
    const { knex } = req.app.locals;
    const payload = req.body;    
    const payloadKeys = Object.keys(payload);

    // Payload must contain all mandatory keys
    const mandatoryColumnsExists = mandatoryColumns.every(mc => payloadKeys.includes(mc));

    if(mandatoryColumnsExists) {
        knex('department')
            .insert(payload)
            .then(response => res.status(201).json('Department created'))
            .catch(error => res.status(500).json(error));
    }
    else {
        return res.status(400).json(`Mandatory columns are required: ${mandatoryColumns}`)
    }
}

function updateDepartment(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    const payload = req.body;
    const payloadKeys = Object.keys(payload);

    const allValidKeys = payloadKeys.every(key => mandatoryColumns.includes(key));

    // payload must contain valid keys
    if(allValidKeys) {
        knex('department')
            .where('id', id)
            .update(payload)
            .then(response => {                
                if(response) {
                    return res.status(204).json();
                }
                return res.status(404).json(`Department ${id} not found`);
            })
            .catch(error => res.status(500).json(error));
    } 
    else {
        return res.status(400).json(`Mandatory columns are required: ${mandatoryColumns}`)
    }
}

function deleteDepartment(req, res) {
    const { knex } = req.app.locals;
    const { id } = req.params;
    const payload = req.body;
    
    knex('department')
        .where('id', id)
        .del()
        .then(response => {
            if(response) {
                res.status(200).json(`Department ${id} deleted`);
            }
            return res.status(404).json(`Department ${id} not found`);
        })            
        .catch(error => res.status(500).json(error));
}

function getDepartmentEmployees(req, res) {
    // select e.name, d.name from my_db.employees e INNER JOIN my_db.department d on e.department = d.id AND d.id = 1;

    const { knex } = req.app.locals;
    let { id } = req.params;
    id = +id;

    knex
        .select('e.name', 'e.address', 'e.email', 'e.salary')
        .from('employees AS e')
        .innerJoin('department AS d', function() {
            this
                .on('e.department', '=', 'd.id')
                .andOn('d.id', '=', id)
        }).then(data => {
            if(data.length > 0) {
                return res.status(200).json(data)
            }
            return res.status(404).json(`Department ${id} does not exist`);
        })
        .catch(error => res.status(500).json(error));
}

module.exports = {
    listAllDepartments,
    listOneDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentEmployees
};