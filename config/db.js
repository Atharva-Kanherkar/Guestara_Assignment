const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace <password> with your MongoDB Atlas password
const uri = "mongodb+srv://atharvakanherkar25:atharvakanherkar25@cluster0.d5llj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

// Export the connectToDatabase function
module.exports = connectToDatabase;
