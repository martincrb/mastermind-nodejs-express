const bcrypt = require('bcrypt');

const hashPassword = (plainTextPwd, done) => {
    bcrypt.hash(plainTextPwd, 10, done);
};

const hashPasswordSync = (plainTextPwd) => {
    return bcrypt.hashSync(plainTextPwd, 10);
};

const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done);
};

exports.hashPassword = hashPassword;
exports.hashPasswordSync = hashPasswordSync;
exports.comparePassword = comparePassword;