const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller');

let userDatabase = {};
// userId -> userData

const cleanUpUsers = () => {
    return new Promise((resolve, reject) => {
        userDatabase = {};
        resolve();
    })
}

const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        // Guardar en la base de datos nuestro usuario
        let userId = uuid.v4();
        userDatabase[userId] = {
            userName: userName,
            password: hashedPwd
        }
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

registerUser('bettatech', '1234');

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(userDatabase[userId]);
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise((resolve, reject) => {
        for (let user in userDatabase) {
            if (userDatabase[user].userName == userName) {
                let userData = userDatabase[user];
                userData.userId = user;
                return resolve(userData);
            }
        }
        reject('No user found');
    });
}

const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await getUserIdFromUserName(userName);
        if (user) {
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject('Missing user');
        }
    });
}
exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;
exports.cleanUpUsers = cleanUpUsers;