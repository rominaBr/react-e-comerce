import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { QUERY_KEY_PRODUCTS } from "../../consts/consts";
import { fetchProducts } from "../../functions/fetchData";
import Loader from "../loader/Loader";
import { ProductsInterface } from "../../interfaces/interfaces";
import CardProduct from "./CardProduct";



function ProductsCategory(){

    const {id} = useParams();

    const { data, status, error}: { data?: any, status: string, error: any } = useQuery(
        QUERY_KEY_PRODUCTS,
        () => fetchProducts("products")
        
    )   

    return(
        <div className="container">
            {status === "loading" && <Loader/>}                
            {status === "error" && <h1>Error: {error?.message}</h1>}      
            {status === "success" &&                
                data                        
                    .filter((prod: ProductsInterface) => prod.category?.id === Number(id))
                    
                    .map((prod: ProductsInterface) => {    
                                                    
                        return(
                                
                            <div key={prod.id}>
                                <CardProduct id={prod.id}
                                    title={prod.title}
                                    price={prod.price}
                                    description={prod.description}
                                    images={prod.images} category={prod.category} />
                                </div>
                            )
                    })                                  

            }
            

        </div>
    )
}

export default ProductsCategory;