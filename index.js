const express = require('express');
const connectToDatabase = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
// const subCategoryRoutes = require('./routes/subCategoryRoutes');
// const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(express.json());

// Connect to the database and then start the server
async function startServer() {
    try {
        await connectToDatabase();  // Connect to the MongoDB database
        console.log("Successfully connected to the database");

        // Define your routes after successful connection
        app.use('/api/categories', categoryRoutes);
        // app.use('/api/subcategories', subCategoryRoutes);
        // app.use('/api/items', itemRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1); // Exit the process with a failure code
    }
}

// Start the server
startServer();
// In this example, we first import the connectToDatabase function from the config/db.js file. This function connects to the MongoDB database using the MongoClient API and returns the client object.