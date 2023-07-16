import "../styles.css"
import CardCategorie from "./CardCategorie";
import Loader from "../loader/Loader";
import { useQuery } from "react-query";
import { fetchCategories } from "../../functions/fetchData";
import { QUERY_KEY_CATEGORIES } from "../../consts/consts";
import { CategoriesInterface } from "../../interfaces/interfaces";



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
                data.map((cat: CategoriesInterface) => {
                    return(
                        <CardCategorie id={cat.id} name={cat.name} image={cat.image} />
                    )
                })              

           }
        </div>
    )

}

export default Categories