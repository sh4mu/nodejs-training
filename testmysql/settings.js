const APIServerPort = 3000;

const database = {
    host: '172.23.0.2',
    port: 3306,
    user: 'root',
    password: 'testpass',
    database: 'my_db'
};

module.exports = {
    database,
    APIServerPort
};