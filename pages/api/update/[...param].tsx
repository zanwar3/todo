import { MongoClient,ObjectId } from "mongodb";

async function handler(req:any,res:any) {
    if(req.method!=='GET') return

    var query = {_id:new ObjectId(req.query.param[0].toString())};
    const options={upsert:true}
    const updateTodo={
        $set:{done:req.query.param[1]}
    }
    const mc:any =process.env.MONGO_CONNECTION 
    const client = await MongoClient.connect(mc)
    const db = client.db()
    const collection = db.collection("todos")
    const result = await collection.updateOne(query,updateTodo,options)
    client.close()
    return res.json({
        todo:result,
        message:"todo updated",
        update:true
    })

}

export default handler