import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI || process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017';

// Create a MongoClient with serverApi for compatibility with newer MongoDB servers
const client = new MongoClient(uri, { serverApi: { version: '1' } });

let db;

export async function connectDB() {
    console.log('Connecting to MongoDB at URI:', uri);
    try {
        await client.connect();
        console.log('MongoDB connection established successfully.');
        db = client.db('full-stack-react-db'); // Assign the database instance
        console.log('Database selected:', db.databaseName);
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        db = null;
        throw err;
    }
}

export function getDB() {
    if (!db) throw new Error('Database not connected!');
    return db;
}
