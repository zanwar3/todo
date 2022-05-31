import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useState } from 'react'
import TodoItem from '../components/todoItem/todoItem'
import useSWR from 'swr'
import Spinner from '../components/spinner'

const fetcher = (url: Request) => fetch(url).then((res) => res.json())

const Home: NextPage = (props: any) => {
  const { data, error, mutate } = useSWR('/api/get-todo', fetcher)
  if (error) return <div>failed to load</div>
  if (!data)
    return (
      <div className="flex justify-center ">
        <div className="content-center">
          <Spinner />
        </div>
      </div>
    )
  const todos = data.todo
  const deleteTodoH = async (todoId: any, index: any) => {
    let newTodo = JSON.parse(JSON.stringify(todos))
    newTodo.splice(index)
    mutate(
      { ...data, todo: newTodo },
      { optimisticData: newTodo, rollbackOnError: true }
    )
    const resp = await fetch(`/api/delete/${todoId}`, {
      method: 'DELETE',
    })
      .then((res) => console.log('succ::' + res.json()))
      .catch((e) => console.log('err::' + e.json()))
  }

  return (
    <Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="container mx-auto px-4 sm:px-8">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="border-b-2 border-blue-200 bg-blue-100 px-5 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                To Do
              </th>
              <th className="border-b-2 border-blue-200 bg-blue-100 px-5 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                Desc.
              </th>
              <th className="border-b-2 border-blue-200 bg-blue-100 px-5 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                Done
              </th>
              <th className="border-b-2 border-blue-200 bg-blue-100 px-5 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: any, index: any) => (
              <tr
                key={todo._id.toString()}
                className="border-black-200 border-b-2 px-5 py-5"
              >
                <TodoItem
                  deleteTodoH={deleteTodoH}
                  id={todo._id.toString()}
                  heading={todo.heading}
                  description={todo.description}
                  done={todo.done}
                  user={todo.user}
                  index={index}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

export default Home
