import "../styles.css"
import CardCategorie from "./CardCategorie";
import { API_URL } from "../../consts/consts";
import Loader from "../loader/Loader";
import { useQuery } from "react-query";


interface Categories {
    id: number;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
}

const QUERY_KEY_CATEGORIES = "categories";

const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories`)
    const json = await res.json();

    if (res.status === 404) {
        throw new Error("Categorías no encontradas");
    } else if (!res.ok) {
        throw new Error("Error en la solicitud");
    }
    
    return json

}

function Categories(){
      

    const { data, status, error}: { data: any, status: string, error: any } = useQuery(
        QUERY_KEY_CATEGORIES,
        fetchCategories
    )     

    return(
        <div className="container">
            {status === "loading" && <Loader/>}                
            {status === "error" && <h1>Error: {error.message}</h1>}      
            {status === "success" &&                
                data.map((cat: Categories) => {
                    return(
                        <CardCategorie id={cat.id} name={cat.name} image={cat.image} />
                    )
                })              

           }
        </div>
    )

}

export default Categories