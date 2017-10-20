'use strict';
const Hapi = require('hapi');
const mysql = require('./config/mysql')
const Basic = require('hapi-auth-basic');
// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8888
});

mysql.connection.connect();
    server.register([Basic,require('inert')
    ,require('./config/auth')
    ,require('./routes/users.route')]
    ,(err) => {
        if (err) {
            throw err;
        }            
});

server.start((err) => {
    const length = server.connections.length;
     for(var i =0;i<length;i++ ){
       console.log(server.connections[i].settings.labels)
       console.log('running at:'+ server.connections[i].info.uri );
     }
 });