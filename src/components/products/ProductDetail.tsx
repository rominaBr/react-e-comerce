import { useParams } from "react-router-dom"
import "../styles.css"
import { QUERY_KEY_PRODUCTS } from "../../consts/consts";
import { useQuery } from "react-query";
import Loader from "../loader/Loader";
import CardProductDetail from "./CardProductDetail";
import { fetchProducts } from "../../functions/fetchData";


function ProductDetail(){

    const {id} = useParams();
    const url = `products/${id}`
    

    const {data,status, error}:
    {data: any, status: string, error: any} = 
    useQuery([QUERY_KEY_PRODUCTS, id], () => {
        return fetchProducts(url);
    });
   
   
    return(
        <div className="container">           
            {status === "loading" && <Loader/>}                
            {status === "error" && <h1>Error: {error.message}</h1>}      
            {status === "success" && 
                <CardProductDetail id={data.id} title={data.title} price={data.price} description={data.description} images={data.images} category={data.category} />
            }
        </div>
    )
}

export default ProductDetail

