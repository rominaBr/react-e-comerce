import CardCart from "./CardCart";
import "./cart.css"
import { useCart } from "./CartContext";


function Cart(){
    const cartContext = useCart();
    
    return(
        <>
            <div className="container">
                Carrito
            </div>
            <div className="container-cart">
                {cartContext.cartItems ? (
                    cartContext.cartItems.map((cart) => {                        
                        return(
                            <CardCart title={cart.title} price={cart.price}
                            quantity={cart.quantity} id={cart.id} image={cart.image}/>
                        )                       
                    })
                ):("")}
            </div>
        </>
        
    )
}

export default Cart