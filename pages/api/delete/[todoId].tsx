import { MongoClient,ObjectId } from "mongodb";
async function handler(req:any,res:any) {
    const {todoId}=req.query
    if(req.method!=='DELETE') return

    const client = await MongoClient.connect(process.env.MONGO_CONNECTION)
    const db = client.db()
    const collection = db.collection("todos")
    const result = await(await collection.deleteOne({_id: new ObjectId(todoId)})).deletedCount;
    client.close()

    console.log("deleted count ::: "+result)

    return res.json({
        todo:result,
        message:"to do deleted"
    })
}

export default handler