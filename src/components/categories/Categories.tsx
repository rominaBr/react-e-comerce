import { useEffect, useState } from "react"
import "../styles.css"
import CardCategorie from "./CardCategorie";

interface Categories {
    id: number;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
}

function Categories(){

    const [categories, setCategories] = useState<Categories[]>([])
    const URL = "https://api.escuelajs.co/api/v1/categories"

    useEffect(() => {
        requestCategories(URL)
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