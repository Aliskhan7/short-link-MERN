const express = require('express')
const config =require('config')
const {  MongoClient, ServerApiVersion} = require('mongodb')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

const client = new MongoClient(config.get("mongoUrl"), {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function start(){
    try{
      await  client.connect()
        app.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))
    } catch (e) {
        console.log('Server error', e.message)
    }
}
start()
