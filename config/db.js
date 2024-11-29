const mongoose = require('mongoose');
const dotenv = require('dotenv');
const uri= process.env.URI_MONGODB;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Established a connection to the database");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;