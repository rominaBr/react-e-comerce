import { Link } from "react-router-dom";
import CardCart from "./CardCart";
import "./cart.css"
import { useCart } from "./CartContext";
import EmptyCart from "./EmptyCart";


function Cart(){
    const cartContext = useCart();
    
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
            {cartContext.cartItems.length > 0 && (
                <div className="container">
                    <Link to="/buy" onClick={cartContext.emptyCartItems}>Finalizar compra</Link>
                </div>
            )}
        </>
        
    )
}

export default Cart