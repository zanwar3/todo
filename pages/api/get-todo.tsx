import { MongoClient,ObjectId } from "mongodb";


async function handler(req:any,res:any) {
    if(req.method!=='GET') return
    const mc:any =process.env.MONGO_CONNECTION 
    const client = await MongoClient.connect(mc)
    const todoCollection=client.db().collection("todos")
    const todoArray = await todoCollection.find().toArray()
    client.close()

    return res.json({
        todo:todoArray,
        message:"data Fetched"
    })
}

export default handler