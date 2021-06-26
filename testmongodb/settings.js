const APIServerPort = 3000;

const database = {
    host: '127.0.0.1',
    port: 27017,
    user: 'root',
    password: 'rootpassword',
    db: 'project'
};

module.exports = {
    database,
    APIServerPort
};