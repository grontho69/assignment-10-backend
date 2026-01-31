const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://assignment-10:RcEa1TXP7h9TJrA5@cluster0.pxios99.mongodb.net/?appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();

const db = client.db('assignment-10')
    const issuesCollection = db.collection('issues')


    const contributionsCollection = db.collection('contributions');

    //get issues

    app.get('/issues', async (req, res) => {
     const result = await issuesCollection.find().toArray()
     res.send(result)
    })

    app.get('/issues/:id', async (req, res) => {
      const{ id }= req.params
      console.log(id)
      const result = await issuesCollection.findOne({_id:new ObjectId(id)})
      res.send({
        success: true,
        result
      })
})


    app.post('/issues', async (req, res) => {
      const data = req.body
      console.log(data)
      const result = await issuesCollection.insertOne(data)
      res.send({
        success: true,
        result
       })
    })
    
    //get contributions

      app.get("/contributions/:issueId", async (req, res) => {
      const { issueId } = req.params;
      const contribs = await contributionsCollection
        .find({ issueId })
        .toArray();
      res.send(contribs);
    });
    
    //save contribution data

    app.post('/contributions', async (req, res) => {
  const contribution = {
    ...req.body,
    date: new Date().toLocaleDateString(),
    createdAt: new Date()
  };

  const result = await contributionsCollection.insertOne(contribution);
  res.send({ ...contribution, _id: result.insertedId });
});


    
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  
  //  await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
