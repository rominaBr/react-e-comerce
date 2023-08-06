import { Link } from "react-router-dom"
import empty from "../../assets/empty-cart.png"

function EmptyCart(){
    return(
        <>
            <div className="cart">
                <div>
                    <img src={empty} alt="" />
                </div>
                <div>
                    <Link to="/products">Comenzar a comprar</Link>
                </div>
                                
            </div>
            
        </>
    )
}

export default EmptyCart