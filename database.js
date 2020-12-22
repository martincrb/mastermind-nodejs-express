const mongoose = require('mongoose');
let password = 'admin';
let databaseName = 'db';
if (process.env.NODE_ENV === 'test') {
    databaseName = 'testdb';
}

mongoose.connect(``, 
    {useNewUrlParser: true, useUnifiedTopology: true});