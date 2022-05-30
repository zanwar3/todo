import {useRef,useState} from 'react'
import { useSession } from "next-auth/react"

function TodoForm(props:any){
    const {addTodoHandler} =props
    const headingRef:any = useRef()
    const descriptionRef:any = useRef()
    const { data: session } = useSession()
    const [toggle, setToggle] = useState(false);

    const formSubmitHandler=async (e:any)=>
    {
        e.preventDefault()
        setToggle(true)
        
        const formData ={
            heading:headingRef?.current?.value,
            description:descriptionRef?.current?.value,
            user:session?.user?.email
        }
        console.log("formdata"+JSON.stringify(formData))
       await addTodoHandler(formData)
         setToggle(false)

    }
    console.log(toggle)

return (
    <form className='max-w-lg w-full mx-auto' onSubmit={formSubmitHandler}>
        <div className="flex flex-wrap mb-6 -mx-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        To Do Item
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="heading"
            ref={headingRef}  />
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Description
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="description"
            ref={descriptionRef}  />
        </div>

        <button
                className="px-4 py-2 my-1 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
                type="submit" 
                disabled={toggle}>
                Add
            </button>

    </form>
)

}

export default TodoForm