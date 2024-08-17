const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
//This function connects mongo db to the server. It uses the MONGO_URI from the .env file to connect to the database.
//The function is exported so it can be used in the server.js file.