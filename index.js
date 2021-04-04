const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z2een.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(cors())
app.use(bodyParser.json())

client.connect(err => {
    const collection = client.db("pubg").collection("player");
    app.post('/allMember',(req,res)=>{
        const member=req.body
        collection.insertMany(member)
       
    })
        app.post('/newMember',(req,res)=>{
            const add=req.body
            collection.insertOne(add)
        })
    
        app.get('/member',(req,res)=>{
            collection.find({})
            .toArray((err,documents)=>{
                res.send(documents)
            })
    })


    
  });



app.get('/',(req,res)=>{
    res.send('Welcome To KPNX CLAN Server')
})

app.listen(process.env.PORT || 5000)