import { CategoriesInterface } from "../../../../interfaces/interfaces";
import { useMutation} from "react-query"
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css"
import axios from "axios"
import { API_URL, QUERY_KEY_CATEGORIES } from "../../../../consts/consts";

function CategoryCreate(){

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/categories";

    const createProductMutation = useMutation(
        (data: CategoriesInterface) => {
            return axios.post(`${API_URL}/${QUERY_KEY_CATEGORIES}`, data)
        },
        {
            onSuccess: () => {                
                navigate(from, { replace: true});                
            },
        }       
                
    )

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;  
        const image = formData.get("image") as string;
        
        const newCategory: CategoriesInterface = {
            name, image
        };
        createProductMutation.mutate(newCategory);

    }
    
    return(
        <form className="container-categories-create" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nombre" required/>
            <input type="url" name="image" id="" />
            <button>Crear</button>
        </form>
    )
}

export default CategoryCreate