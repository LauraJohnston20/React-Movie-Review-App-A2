import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get( '/hello', (req, res) => res.send('Hello there!'));
app.get( '/hello/:name', (req, res) => res.send(`Hello ${req.params.name}!`));
app.post( '/hello', (req, res) => {
    console.log(JSON.stringify(req.body.name));
    res.send(`Hello ${req.body.name}!`)

}); 

const client = new MongoClient('mongodb://127.0.0.1:27017');

app.post('/api/addMovie', async (req, res) => {
    try {
        await client.connect();

        const db = client.db('movies');

        const movieInfo = await db.collection('mymovies').insertOne(req.body);
        console.log(req.body);

        res.sendStatus(200);

        client.close();
    }
    catch (error) {
        res.sendStatus(500);
    }
});


app.get('/api/data', async (req, res) => {
    try {
        
        await client.connect();
        const db = client.db("movies");

        const movieInfo = await db.collection('mymovies').find({}).toArray();
        console.log(movieInfo);
        res.status(200).json(movieInfo);
        client.close();
    }
    catch (error) {
        res.status(500).json({error});
    }

})

app.listen( 8000, () => console.log('Listening on port 8000'));

