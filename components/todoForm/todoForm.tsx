import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import Spinner from '../spinner'

function TodoForm(props: any) {
  const { addTodoHandler } = props
  const headingRef: any = useRef()
  const descriptionRef: any = useRef()
  const { data: session } = useSession()
  const [toggle, setToggle] = useState(false)

  const formSubmitHandler = async (e: any) => {
    e.preventDefault()
    setToggle(true)

    const formData = {
      heading: headingRef?.current?.value,
      description: descriptionRef?.current?.value,
      user: session?.user?.email,
    }
    console.log('formdata' + JSON.stringify(formData))
    await addTodoHandler(formData)
    setToggle(false)
  }
  console.log(toggle)

  return (
    <form className="mx-auto w-full max-w-lg" onSubmit={formSubmitHandler}>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
          To Do Item
        </label>
        <input
          className="block w-full appearance-none rounded bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          type="text"
          placeholder="heading"
          ref={headingRef}
        />
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
          Description
        </label>
        <input
          className="block w-full appearance-none rounded bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          type="text"
          placeholder="description"
          ref={descriptionRef}
        />
      </div>
      {toggle ? (
        <Spinner />
      ) : (
        <button
          className="my-1 rounded border border-red-500 bg-transparent px-4 py-2 font-semibold text-red-700 hover:border-transparent hover:bg-red-500 hover:text-white"
          type="submit"
          disabled={toggle}
        >
          Add
        </button>
      )}
    </form>
  )
}

export default TodoForm
