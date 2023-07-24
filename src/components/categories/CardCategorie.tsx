import { Link } from "react-router-dom"
import { CategoriesInterface } from "../../interfaces/interfaces"
import "./styles.css"
import { useAuth } from "../../auth/useAuth"
import { API_URL } from "../../consts/consts"
import axios from "axios"



function CardCategorie(categories: CategoriesInterface){

    const auth = useAuth() 

    const  onDeleteCategory = async (categoryId: number | undefined) => {
        try {
          
          await axios.delete(`${API_URL}/categories/${categoryId}`);
          window.location.reload();
          
        } catch (error) {
          console.error("Error al eliminar la categoría", error);
        }
    };

    return(
        <>
        
        <div key={categories.id} className="container-card">
            <div className="card">
                <img src={categories.image} alt="category" />
            </div>
            {auth.user ? (
                auth.userInfo?.data.role == "admin" ? (
                    <>
                        <button><Link to={`/categories/edit/${categories.id}`}>-</Link></button>
                        <button onClick={() => onDeleteCategory(categories.id)}>x</button>
                    </>
                ):("")
            ):("")
            }
            <Link to={`/products/categorie/${categories.id}`}>
                
                <div>
                    <h3>{categories.name}</h3>                
                </div>

            </Link>
            
        </div>
            
        </>
    )
}

export default CardCategorie