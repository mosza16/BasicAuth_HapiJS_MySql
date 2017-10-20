


//(username + ":" + password), and base64 encodes
const mysql = require('./mysql')
const connection = mysql.connection;
const bcrypt = require('bcrypt');
const checkUser = (username) =>{
    return new Promise((resovle,reject)=>{
        const sql = 'SELECT username,password FROM users WHERE username = ? LIMIT 1 '; 
        connection.query(sql,[username],
            function (error, results, fields) {
                    if (error) {
                        throw error
                    }else{
                        results = mysql.toObject(results)
                        if(results.length > 0){
                            resovle(results[0])
                        }else{
                            reject("user not found")
                        }
                    }
                });
    })
}


const validate = function (request, username, password, callback) {
    checkUser(username)
    .then((user)=>{
            bcrypt.compare(password, user.password, function(err, res) {
                if(res) {
                     callback(null, true, { username: user.username});
                }else {
                    return callback(null, false);
                } 
            });
    }).catch((err)=>{
            return callback(null, false);
    })
};

module.exports.register = function(server, option, next) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    return next()
}
exports.register.attributes = {
    name: 'basic-auth'
};