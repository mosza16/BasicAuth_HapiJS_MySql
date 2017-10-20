
'use strict';
const Joi = require('joi');
const mysql = require('../config/mysql')
const connection = mysql.connection;
const bcrypt = require('bcrypt');
module.exports.register = function(server, option, next) {

    server.route({
        method: 'POST',
        path: '/api/findUsers',
        config: { auth: 'simple' },
        handler: function (request, reply) {
            connection.query('SELECT * FROM users',
           function (error, results, fields) {
           if (error) throw error;
           reply(results);
        });
      }
    });

    server.route({
        method: 'PUT',
        path: '/api/addUser',
        config:{
            validate: {
                payload: {
                    username: Joi.string().min(1),
                    password:Joi.string().min(6),
                    }
                }
        },
        handler: function (request, reply) {
           const username = request.payload.username
           const password = request.payload.password
           bcrypt.hash(password, 6, function(err, hash) {
                    connection.query('INSERT INTO users(username,password) VALUES(?,?)',[username,hash],
                    function (error, results, fields) {
                        if (error) throw error;
                        reply(results);
                    });
            });
        }
    });
 
    return next();
}
exports.register.attributes = {
    name: 'routes-captcha'
};




