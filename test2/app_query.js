const express = require('express');
const app = express();
const router = express.Router();

const data = require('./data');

// Capture request without params
router.get('/employees/', (req, res) => res.send(data));

// Capture name=value parameters
// router.get('/employees', (req, res) => {
//     console.log(req.query.page);
//     return res.send(data);
// });

// Capture parameter to id
router.get('/employees/:id', (req, res) => {
    // params is a string, need '+' to convert to integer
    const id = +req.params.id;
    const employee = data.filter(d => d.id === id);
    return res.send(employee);
});

app.use('/api', router);

const port = 3001;

app.listen(port, () => console.info(`Server is listening on ${port}.`));