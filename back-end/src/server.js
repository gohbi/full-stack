import express from 'express';
import fs from 'fs';
import path from 'path';
import getDB from './db/connection.js';


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

if (!process.env.MONGODB_URI && process.env.ATLAS_URI) {
    process.env.MONGODB_URI = process.env.ATLAS_URI;
}

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}





const articleInfo = [
    {name: 'learn-flask', upvotes: 0, comments: []},
    {name: 'learn-node', upvotes: 0, comments: []},
    {name: 'learn-react', upvotes: 0, comments: []},
]

const app = express();

app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const db = getDB();
        const articles = await db.collection('articles').findOne({ name });
        res.json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/articles/:name/upvote', (req, res) =>{
    const article = articleInfo.find(a => a.name == req.params.name);
    article.upvotes += 1;

    res.json(article);
});

app.post('/api/articles/:name/comments', (req, res) =>{
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const article = articleInfo.find(a => a.name == name);

    article.comments.push({
        postedBy,
        text,
    });

    res.json(article);
});


/*
app.get('/hello', function(req, res){
    res.send('Hello from a GET endpoint!');
});

app.get('/hello/:name', function(req,res){
    res.send('Hello,' + req.params.name );
});

app.post('/hello', function(req, res){
    res.send('Hello' +  req.body.name + 'from a POST endpoint!');
});
*/
app.listen(8000, function(){
    console.log('Server is listening on port 8000');
});