const express = require('express')
const config =require('config')
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 6000

const client = new MongoClient(config.get("mongoUri"), {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);


async function start(){
    try{
      await  client.connect()
        app.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))
    } catch (e) {
        console.log('Server error', e.message)
    }
}
start()
