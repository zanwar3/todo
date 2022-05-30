import { useRouter } from "next/router"
import { Fragment } from "react"
import TodoForm from "../../components/todoForm/todoForm"
import { useSession} from "next-auth/react"
const AddTodo =()=>{
    const router = useRouter()
    const addTodoHandler =async (data:any) => {
        console.log("sending data ::"+data)
        const response = await fetch('/api/new-todo',{
            method:"post",
            body:JSON.stringify(data),
            headers:{
                "content-type":"application/json"
            }
        })

        const res =await response.json()
         router.push("/")
        return res
    }
    const {data:session} = useSession()
    if(session)
    {
    return (
        <Fragment>
            <TodoForm addTodoHandler={addTodoHandler}/> 
        </Fragment>
    )
    }
    return(
        <Fragment>
            <h2 class="font-medium leading-tight text-center mt-0 mb-2 text-blue-600">Please signIn to add </h2>
        </Fragment>
    )
}

export default AddTodo