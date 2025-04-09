const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;
// console.log("DB_URL", DB_URL);

const connectDB = () => {
    mongoose.connect(DB_URL).then(() => console.log("MongoDb connected")).catch((err) => console.log(err));
}

module.exports = connectDB;
