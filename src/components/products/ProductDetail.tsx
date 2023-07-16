import { useParams } from "react-router-dom"
import "../styles.css"
import { API_URL, QUERY_KEY_PRODUCTS } from "../../consts/consts";
import { useQuery } from "react-query";
import Loader from "../loader/Loader";
import CardProductDetail from "./CardProductDetail";


function ProductDetail(){

    const {id} = useParams();

    const fetchProduct = async () => {
        const res = await fetch(`${API_URL}/products/${id}`)
        const json = await res.json();
    
        if (res.status === 404) {
            throw new Error("Productos no encontradas");
        } else if (!res.ok) {
            throw new Error("Error en la solicitud");
        }
        
        return json
    
    }

    const {data,status, error}:
    {data: any, status: string, error: any} = 
    useQuery([QUERY_KEY_PRODUCTS, id], () => {
        return fetchProduct();
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