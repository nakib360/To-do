const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.URI;

app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const allToDoDB = client.db("ToDoDB").collection("allToDos");

    app.post("/todo", async (req, res) => {
      const newToDo = req.body;

      if(newToDo.name === ""){
        return
      }

      const result = await allToDoDB.insertOne(newToDo);

      res.send(result);
    });

    app.get("/todo", async (req, res) => {
      const result = await allToDoDB.find().toArray();

      res.send(result);
    })

    app.get("/todo/:id", async (req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)};
      const result = await allToDoDB.findOne(query);

      res.send(result);
    })

    app.put("/todo/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const newToDo = req.body;

      const updateDoc = {
        $push : {
          toDos: newToDo
        }
      }

      const result = await allToDoDB.updateOne(query, updateDoc);

      res.send(result);
    });

    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("This is to do app server");
})

app.listen(port, () => {
    console.log("The to do server is running");
})