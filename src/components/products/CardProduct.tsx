import { Link } from "react-router-dom";
import "./styles.css"
import { ProductsInterface } from "../../interfaces/interfaces";
import { useAuth } from "../../auth/useAuth";
import { API_URL } from "../../consts/consts";
import axios from "axios"
import { useMutation } from "react-query";


function CardProduct(products: ProductsInterface){       

    const auth = useAuth();    



    const deleteProductMutation  = useMutation(
        (id: number) => {
            return axios.delete(`${API_URL}/products/${id}`)
        },
        {
            onSuccess: () => {
                window.location.reload();
            }
        }
    );

    function onDeleteProduct(id: number){
        if(id) {
            deleteProductMutation.mutate(id);
        }        
    }

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
                        
                        {auth?.user ? (
                            auth.userInfo?.data?.role == "admin" ? (
                                <>
                                    <button className="btn-edit-delete"><Link to={`/products/edit/${products.id}`}><i className="fa-solid fa-pen-to-square"></i></Link></button>
                                    
                                    <button className="btn-edit-delete" onClick={() => onDeleteProduct(products.id || 0)}><i className="fa-solid fa-trash"></i></button>
                                </>
                            ):null
                            ):null
                        }
                        
                        <Link to={`/products/${products.id}`}>                            
                            <h3>{products.title}</h3>
                            <h4>{products.category?.name}</h4>
                            <h4>${products.price}</h4>
                        </Link>  
                    </div>
                             
                </div>
            
        </>
    )
}

export default CardProduct