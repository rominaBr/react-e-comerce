import { Link } from "react-router-dom";
import "./styles.css"
import { ProductsInterface } from "../../interfaces/interfaces";
import { useAuth } from "../../auth/useAuth";
import { API_URL } from "../../consts/consts";
import axios from "axios"


function CardProduct(products: ProductsInterface){       

    const auth = useAuth()    

    const  onDeleteProduct = async (productId: number) => {
        try {
          
          await axios.delete(`${API_URL}/products/${productId}`);
          window.location.reload();
          
        } catch (error) {
          console.error("Error al eliminar el producto", error);
        }
    };

    return(
        <>            
            <div className="container-card-product">
                <div className="card-product">
                    <div className="container-all">                      
                        {products.images.map((_image, index)=>{        
                            const inputId = `${products.id}-${index}`;                         
                            return(                            
                                <input type="radio" name="image-slide" id={inputId} hidden/>                          
                                    
                            )
                            
                        })}
                        <div key={products.id} className="slide">
                            <div className="item-slide">
                                {products.images.map((i)=> {
                                    return(
                                        <img className="img" src={i} alt="image" />
                                    )
                                })} 
                            </div>
                                
                        </div> 
                        <div key={products.id} className="pagination">
                            {products.images.map((image, index)=>{ 
                                const inputId = `${products.id}-${index}`;                   
                                return(
                                    <label htmlFor={inputId} className="pagination-item">
                                        <img src={image} alt="image" />
                                    </label>
                                )
                            })}
                                    
                        </div>               
                        </div>           
                    </div>
                    <div className="description-product">
                        {auth.user ? (
                            auth.userInfo?.data.role == "admin" ? (
                                <>
                                    <button><Link to={`/products/edit/${products.id}`}>-</Link></button>
                                    <button onClick={() => onDeleteProduct(products.id)}>x</button>
                                </>
                            ):("")
                            ):("")
                        }
                        
                        <Link to={`/products/${products.id}`}>                            
                            <h3>{products.title}</h3>
                            <h4>{products.category.name}</h4>
                            <h4>${products.price}</h4>
                        </Link>  
                    </div>
                             
                </div>
            
        </>
    )
}

export default CardProduct