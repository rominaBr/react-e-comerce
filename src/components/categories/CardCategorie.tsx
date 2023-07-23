import { Link } from "react-router-dom"
import { CategoriesInterface } from "../../interfaces/interfaces"
import "./styles.css"



function CardCategorie(categories: CategoriesInterface){
    return(
        <>
        
        <div key={categories.id} className="container-card">
            <Link to={`/products/categorie/${categories.id}`}>
                <div className="card">
                    <img src={categories.image} alt="category" />
                </div>
                <div>
                    <h3>{categories.name}</h3>                
                </div>

            </Link>
            
        </div>
            
        </>
    )
}

export default CardCategorie