import { useState } from "react";
import { CartItem, ProductsInterface } from "../../interfaces/interfaces";
import { useCart } from "../cart/CartContext";




function CardProductDetail(prod: ProductsInterface){ 

    const [cant, setCant] = useState(0);
    const [price, setPrice] = useState(0);
    
    const cartContext = useCart();

    const addToCart = () => { 
        const existingItem = cartContext.cartItems.find(item => item.id === prod.id);
      
        if (existingItem) {
          // Si el producto ya está en el carrito, aumentar la cantidad
          existingItem.quantity += 1;
        } else {
          // Si el producto no está en el carrito, agregarlo como un nuevo elemento
          const newProduct: CartItem = {
            id: prod.id!,
            title: prod.title,
            price: prod.price,
            quantity: 1, 
          }; 
          cartContext.updateCartItems([...cartContext.cartItems, newProduct]);
        }
      
        setPrice(price + prod.price);
        setCant(cant + 1);
    };
      

    const substarctToCart = () => {
        if (cant > 0) {
          setPrice(price - prod.price);
          setCant(cant - 1);
      
          // Reducir la cantidad de ese producto en el carrito
          const updatedCartItems = [...cartContext.cartItems];
          const itemIndex = updatedCartItems.findIndex((item) => item.id === prod.id);
          if (itemIndex !== -1) {
            if (updatedCartItems[itemIndex].quantity === 1) {
              // Si la cantidad del producto es 1, eliminarlo del carrito
              updatedCartItems.splice(itemIndex, 1);
            } else {
              // Si la cantidad del producto es mayor que 1, reducir la cantidad en uno
              updatedCartItems[itemIndex].quantity -= 1;
            }
            cartContext.updateCartItems(updatedCartItems);
          }
        }
      };
      

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