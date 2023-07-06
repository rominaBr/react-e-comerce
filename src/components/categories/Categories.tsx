import { useEffect, useState } from "react"
import "../styles.css"
import CardCategorie from "./CardCategorie";
import { API_URL } from "../../consts/consts";



interface Categories {
    id: number;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
}

function Categories(){

    const [categories, setCategories] = useState<Categories[]>([])    

    useEffect(() => {
        requestCategories(`${API_URL}/categories`)
    }, [])

    async function requestCategories(url: string){
        try{
            const res = await fetch(url);
            const json = await res.json();

            setCategories(json)
            
        }
        catch(e)
        {
            console.log(e)
        }
    }

    return(
        <div className="container">            
            {categories ? (
                categories.map((cat) => {
                    return(
                        <CardCategorie id={cat.id} name={cat.name} image={cat.image} />
                    )
                })              

            ):(
                <h1>Cargando...</h1>
            )}
        </div>
    )

}

export default Categories