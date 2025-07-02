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


const articleInfo = [
    { name: 'learn-flask', upvotes: 0, comments: [] },
    { name: 'learn-node', upvotes: 0, comments: [] },
    { name: 'learn-react', upvotes: 0, comments: [] },
];

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const db = getDB();
        const article = await db.collection('articles').findOne({ name });
        res.json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Improved upvote route with error handling
app.post('/api/articles/:name/upvote', (req, res) => {
    const article = articleInfo.find(a => a.name == req.params.name);
    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }
    article.upvotes += 1;
    res.json({ success: true, article });
});

// Improved comments route with validation and error handling
app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const article = articleInfo.find(a => a.name == name);

    article.comments.push({
        postedBy,
        text,
    });

    res.json(article);
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

