import { Outlet } from "react-router-dom"
import Nav from "./Nav"
import AuthStatus from "../../auth/AuthStatus"

function Layaout(){
    return(
        <>
            <Nav/>
            <AuthStatus/>
            <Outlet/>
        </>
    )
}

export default Layaout