import { useLocation } from "react-router-dom";
import { CartItem } from "../../interfaces/interfaces";
import "./buy.css"
import { useState } from "react";


function Buy (){
    const location = useLocation();
    const productsForPurchase = location.state?.productsForPurchase || [];
    
    const totalAmount = productsForPurchase.reduce(
        (total: number, prod: CartItem) => total + prod.price * prod.quantity,
        0
      );

    console.log(productsForPurchase)

    return(
        <>
            <div className="container">Compra realizada</div>
            <div className="container-finished">
                {productsForPurchase.map((prod: CartItem) => {
                    return(
                        <div className="finished">
                            <div className="image">
                                <img src={prod.image}/>
                            </div>
                            <div className="descrip">
                                <h3>{prod.title}</h3>
                                <p>Cantidad: {prod.quantity}</p>
                                <p>Precio Unitario: ${prod.price}</p>
                                <p>Precio total: ${prod.price*prod.quantity}</p>
                                
                            </div>
                        </div>     
                    )
                    
                })}
                
            </div>
            <div className="container">
                <h2>Total: ${totalAmount}</h2>
            </div>
        </>
       
        
    )
}

export default Buy