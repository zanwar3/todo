import { useRouter } from "next/router"
import { Fragment ,useState} from "react"
import { useSession} from "next-auth/react"



function TodoItem(props:any){

    const [del, setDel] = useState(false);
    const [toggle, setToggle] = useState(false);
    const {id,heading,description,done,user}=props
    const {data:session} = useSession()

    const router = useRouter()

    const deleteTodo =async (todoId:any) => {
        setDel(true)
        const resp = await fetch(`/api/delete/${todoId}`,{
            method: 'DELETE'
        }).then(res=>console.log("succ::"+res.json())).catch(e=>console.log("err::"+e.json()))
        router.push("/")
    }


    const toggleDone= async (todoId:any,done:any) => {
        setToggle(true)
        const response = await fetch(`/api/update/${todoId}/${done}`,{
            method:'GET'
        }).then(res=>console.log("success::"+res.json())).catch(e=>"error::"+e.json())
        router.push("/")
        // setToggle(false)
    }
 
if(session){
    return(
        <Fragment>
            { user==session?.user?.email?
                <>
            <td className="py-5 font-bold text-blue-600">{heading}</td>
            <td className="py-5">{description}</td>
            <td className="py-5">
                {
                    done=="true"?
                    <button className="text-green-700" onClick={()=>toggleDone(id,"false")} disabled={toggle}>Completed</button>
                    :
                    <button className="text-orange-700" onClick={()=>toggleDone(id,"true") } disabled={toggle}>Not Completed</button>

                }</td>
            <td className="px-4 py-2 my-1 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent">
                <button className="id" onClick={()=>deleteTodo(id)} disabled={del} >Delete</button>
            </td>
            </>:null
            
            }
        </Fragment>
    )
}
return null
}



export default TodoItem