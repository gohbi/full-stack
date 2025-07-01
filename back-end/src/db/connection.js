import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI || process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectDB() {
    try {
        await client.connect();
        await client.db('full-stack-react-db').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
        db = client.db('full-stack-react-db'); // Use your database name here
    } catch (err) {
        console.error('MongoDB connection error:', err);
        db = null;
    }
}

// Immediately connect when this module is loaded
connectDB();

export default function getDB() {
    if (!db) throw new Error('Database not connected!');
    return db;
}
