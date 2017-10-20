
const mySQL = require('mysql');

module.exports.connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'users'
});

module.exports.toObject = (queryResult)=>{
    return JSON.parse(JSON.stringify(queryResult))
}