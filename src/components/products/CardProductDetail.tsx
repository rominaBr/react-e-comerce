import { useState } from "react";
import { ProductsInterface } from "../../interfaces/interfaces";
import { useCart } from "../cart/CartContext";




function CardProductDetail(prod: ProductsInterface){ 

    const [cant, setCant] = useState(0);
    const [price, setPrice] = useState(0);
    
    const cartContext = useCart();

    const addToCart = () =>{
        setPrice(price+prod.price);
        setCant(cant+1);
        cartContext.updateCartItems(cartContext.cartItems + 1);

    }

    const substarctToCart = () =>{
        if(cant > 0){
            setPrice(price-prod.price);
            setCant(cant-1);
            cartContext.updateCartItems(cartContext.cartItems - 1);

        }
    }

    const emptyCart = () => {
        setPrice(0);
        setCant(0);
    }
        

    return(
        <div key={prod.id} className="cardProductDetail">
            <div className="product-detail">
                <div className="title">
                    <h1>{prod.title}</h1>
                    <h3 className="categorie">{prod.category?.name}</h3>
                </div>
                
                <h3>{prod.description}</h3>
            </div>
            <div className="images">
                {prod.images.map((imag)=> {
                    return(
                        <div>
                            <img src={imag} alt="imágenes" />
                        </div>
                    )
                })}
                <div>
                    <h2>Precio: ${prod.price}</h2>
                    <div className="cant">
                        <button onClick={substarctToCart}>-</button>
                        {cant}
                        <button onClick={addToCart}>+</button>
                    </div> 
                    <div className="trash">
                        <h4>Total: ${price} <i className="fa-solid fa-trash" onClick={emptyCart}></i>
                        </h4> 
                    </div>          
                    
                </div>
            </div>
                
            
        </div>
    )
}

export default CardProductDetail