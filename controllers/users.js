const uuid = require('uuid');
const crypto = require('../crypto.js');

const userDatabase = {};
// userId -> userData

const registerUser = (userName, password) => {
    let hashedPwd = crypto.hashPasswordSync(password);
    // Guardar en la base de datos nuestro usuario
    userDatabase[uuid.v4()] = {
        userName: userName,
        password: hashedPwd
    }
}

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName == userName) {
            return userDatabase[user];
        }
    }
}

const checkUserCredentials = (userName, password, done) => {
    console.log('checking user credentials')
    // Comprobar que las credenciales son correctas
    let user = getUserIdFromUserName(userName);
    if (user) {
        console.log(user);
        crypto.comparePassword(password, user.password, done);
    } else {
        done('Missing user');
    }
}
exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;