import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.delete( '/hello', (req, res) => res.send('Hello there!'));
app.get( '/hello/:name', (req, res) => res.send(`Hello ${req.params.name}!`));
app.post( '/hello', (req, res) => {
    console.log(JSON.stringify(req.body.name));
    res.send(`Hello ${req.body.name}!`)

}); 

const client = new MongoClient('mongodb://127.0.0.1:27017');

// Add movie
app.post('/api/addMovie', async (req, res) => {
    try {
        console.log(req.body)

        await client.connect();
        const db = client.db('movies');
    
        const movieInfo = await db.collection('mymovies').insertOne(req.body);    

        client.close();
       // res.json({message:"Movie successfully added.", movies: movieInfo});
        res.status(200).send({message:"Movie successfully added.", movies: movieInfo}).end();

        return;
    }
    catch (error) {
        res.sendStatus(500);
    }
});

// Delete movie
app.delete('/api/delete/:id', async (req, res) => {
    let id = req.params.id;
    console.log("ID", id);

    try {
        await client.connect();
        const db = client.db('movies');

        const movieInfo = await db
            .collection('mymovies')
            .deleteOne({_id: new ObjectId(id)});
        console.log(movieInfo);
        if (movieInfo.deletedCount === 1) {
            res.send("Delete successful.")
        } else {
            res.send("Delete unsuccessful.");
        }
    } catch (error) {
        res.status(500);
    } finally {
        await client.close();
    }
});


// Movie data
app.get('/api/data', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("movies");

        const movieInfo = await db.collection('mymovies').find({}).toArray();
        res.status(200).json(movieInfo);
        client.close();
    }
    catch (error) {
        res.status(500).json({error});
    }
});

app.listen( 8000, () => console.log('Listening on port 8000'));

