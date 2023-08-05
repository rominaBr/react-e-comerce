import "./styles.css"
import font from "../assets/ecommerce.jpg"
import { Link } from "react-router-dom"

function Home(){
    return(
        <>
            <div style={{backgroundImage: `url(${font})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                width: "100%",
                                                height: "100vh"}}>
                <div className="button-buy"><Link to="/products" className="link">Comenzar Compra</Link></div>
            </div>
            
        </>
        
    )
}

export default Home