import { Link, useLocation } from "react-router-dom";
import CardCart from "./CardCart";
import "./cart.css"
import { useCart } from "./CartContext";
import EmptyCart from "./EmptyCart";
import { useAuth } from "../../auth/useAuth";


function Cart(){
    const cartContext = useCart();
    const auth = useAuth();
    const location = useLocation();
    
    
    
    return(
        <>
            {cartContext.cartItems.length > 0 && (
                <div className="container">
                    Carrito
                </div>
            )}
            <div className="container-cart">
                {cartContext.cartItems.length > 0 ? (
                    cartContext.cartItems.map((cart) => {                        
                        return(
                            <CardCart title={cart.title} price={cart.price}
                            quantity={cart.quantity} id={cart.id} image={cart.image}/>
                        )                       
                    })
                ):(
                    <div className="container"><EmptyCart/></div>
                )}
            </div>

            {auth?.user && cartContext.cartItems.length > 0 && (                
                <div className="container cart">                    
                    <Link to = "/buy" state={{ productsForPurchase: cartContext.cartItems}} onClick={cartContext.emptyCartItems}>
                        Finalizar compra
                    </Link>
                </div>
            )}
            {!auth?.user && cartContext.cartItems.length > 0 && (
                <div className="container"><Link to="/login" state={{ from: location }}>Debes estar <b>logueado</b> para continuar con la compra.</Link></div>
            )}
        </>
        
    )
}

export default Cart