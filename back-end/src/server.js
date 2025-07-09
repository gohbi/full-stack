import express from 'express';
import fs from 'fs';
import path from 'path';
import { connectDB, getDB } from './db/connection.js'; // Import database connection functions

// Load environment variables from config.env
const envPath = path.resolve('./src/config.env');
if (fs.existsSync(envPath)) {
    const env = fs.readFileSync(envPath, 'utf-8');
    env.split('\n').forEach(line => {
        const match = line.match(/^([A-Z_]+)=(.*)$/);
        if (match) {
            let [, key, value] = match;
            value = value.replace(/^"|"$/g, '');
            process.env[key] = value;
        }
    });
}
// Import article data

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const db = getDB();
        const article = await db.collection('articles').findOne({ name });
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article); // Ensure the article includes all required fields
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Improved upvote route with error handling
app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    try {
        const db = getDB();
        const article = await db.collection('articles').findOne({ name });
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        await db.collection('articles').updateOne(
            { name },
            { $inc: { upvotes: 1 } }
        );
        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json({ success: true, article: updatedArticle });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Improved comments route with validation and error handling
app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    try {
        const db = getDB();
        const article = await db.collection('articles').findOne({ name });
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        await db.collection('articles').updateOne(
            { name },
            { $push: { comments: { postedBy, text } } }
        );
        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is listening on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit the process if the database connection fails
    });

