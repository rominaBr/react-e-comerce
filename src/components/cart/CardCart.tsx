import { CartItem } from "../../interfaces/interfaces"
import { useCart } from "./CartContext"

function CardCart(items: CartItem){

    const cartContext = useCart();
    const item = cartContext.cartItems.find((it) => it.id === items.id);

    const add = () => {        
        
        if (item){
            item.quantity += 1; 
            cartContext.updateCartItems([...cartContext.cartItems]);       
        }

    }

    const substract = () => {        

        if (item && item.quantity > 1){
            item.quantity -= 1;
            cartContext.updateCartItems([...cartContext.cartItems]);
        }
    }
    
    const substractToCart = () => {
        items.id ? (
            cartContext.removeCartItem(items.id)
        ) :("")        
    }


    return(
        <>
            <div className="card-cart">                                
                <div className="col-1">
                    <img src={items.image} />
                </div>  
                <div className="col-2">
                    <h2>{items.title}</h2>
                    <p>${items.price*(item?.quantity || 0)}</p>
                    <div className="cant-cart">
                        <p>
                            <button onClick={substract}>-</button>
                                {item?.quantity}
                            <button onClick={add}>+</button>
                        </p>
                        <button className="btn-trash" onClick={substractToCart}><i className="fa-solid fa-trash"></i></button>
                    </div>
                                                                       
                </div>                             
                                        
             </div>
        </>
    )
}

export default CardCart