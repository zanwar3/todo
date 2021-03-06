import {MongoClient} from 'mongodb'

async function handler(req:any,res:any) {

    if(req.method!=='POST') return
    const {heading,description,user}=req.body
    const done="false"
    const mc:any =process.env.MONGO_CONNECTION 
    if(!heading || !description) return

    const client = await MongoClient.connect(mc)
    const db= client.db()
    const collection = db.collection("todos")
    const result = await collection.insertOne({heading,description,done,user})
    client.close()
    res.status(201).json({
        todo:result,
        message:"to-do created"
    })
}

export default handler