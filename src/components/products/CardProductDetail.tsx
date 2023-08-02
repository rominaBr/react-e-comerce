import { useState } from "react";
import { CartItem, ProductsInterface } from "../../interfaces/interfaces";
import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";




function CardProductDetail(prod: ProductsInterface){ 

    const [cant, setCant] = useState(0);
    const [price, setPrice] = useState(0);
    
    const cartContext = useCart();
    const navigate = useNavigate();

    const add = () => { 
        setPrice(price + prod.price);
        setCant(cant + 1);
    };

    const addToCart = () => {
      const existingItem = cartContext.cartItems.find(item => item.id === prod.id);
      
      if (existingItem) {        
        existingItem.quantity += cant;
        existingItem.price += price;

      } else {
        
        const newProduct: CartItem = {
          id: prod.id!,
          title: prod.title,
          price: prod.price,
          quantity: cant, 
          image: prod.images[0],
        };         
        cartContext.updateCartItems([...cartContext.cartItems, newProduct]);
        
      }
      navigate("/cart-detail")
    }
      

    const substarct = () => {
        if (cant > 0) {
          setPrice(price - prod.price);
          setCant(cant - 1);  
          
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
                        <button onClick={substarct}>-</button>
                        {cant}
                        <button onClick={add}>+</button>
                    </div> 
                    <div className="trash">
                        <h4>Total: ${price} <i className="fa-solid fa-trash" onClick={emptyCart}></i>
                        </h4> 
                    </div>
                    {cant > 0 ? (
                        <button className="btn-add" onClick={addToCart}>Agregar al carrito</button>
                    ) : ("") }    
                    
                </div>
            </div>
                
            
        </div>
    )
}

export default CardProductDetail