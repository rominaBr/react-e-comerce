import { Link } from "react-router-dom"
import notFound from "../assets/404.jpg"

function NotFound(){
    return(
        <div className="not-found">
            <h2>La página que ha solicitado no se encuentra disponible.</h2>
            <h3><Link to="/">Volver</Link></h3>
            <img src={notFound} alt="not-found" />            
        </div>
    )
}

export default NotFound