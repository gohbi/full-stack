import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI || process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017';

// Create a MongoClient without serverApi for compatibility with older MongoDB servers
const client = new MongoClient(uri);

let db;

export async function connectDB() {
    try {
        await client.connect();
        await client.db('full-stack-react-db').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
        db = client.db('full-stack-react-db');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        db = null;
        throw err;
    }
}

default function getDB() {
    if (!db) throw new Error('Database not connected!');
    return db;
}
