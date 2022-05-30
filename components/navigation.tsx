import Link from "next/link"
import {Fragment} from "react"
import Loginbtn from '../components/loginbtn'


const Navigation = () =>{
    return (
        <Fragment>
            <ul className=" flex bg-red-300">
                <li className="mr-6 px-4 my-5 font-bold hover:text-white">
                    <Link href="/">TO DO APP</Link>
                </li>
                <li className="mr-6 px-4 my-5 font-bold hover:text-white">
                    <Link href="/add-todo">ADD TO DO</Link>
                </li>
                <li className="pl-20 mr-6  my-5 font-bold hover:text-white">
                    <Loginbtn/>
                </li>

            </ul>
            
        </Fragment>

    )
}

export default Navigation