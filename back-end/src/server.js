import express, { request } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const articleInfo = [
    {name: 'learn-flask', upvotes: 0, comments: []},
    {name: 'learn-node', upvotes: 0, comments: []},
    {name: 'learn-react', upvotes: 0, comments: []},
]

const app = express();

app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const uri = 'mongodb://127.0.0.1';

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    
    await client.connect();

    const db = client.db('full-stack-react-db');

    const article = await db.collection('articles').findOne({ name });

    res.json(article);

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