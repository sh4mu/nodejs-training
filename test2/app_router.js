const express = require('express');
const app = express();
const router = express.Router();

const data = require('./data');

router.get('/employees', (req, res) => res.send(data));
app.use('/api', router);

app.use('/images', express.static('images'));

const port = 3000;

app.listen(port, () => console.info(`Server is listening on ${port}.`));