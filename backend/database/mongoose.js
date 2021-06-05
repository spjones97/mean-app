const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));

module.exports = mongoose;
