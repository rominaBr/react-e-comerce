import { useParams } from "react-router-dom"
import { API_URL, QUERY_KEY_CATEGORIES } from "../../../../consts/consts";
import { fetchCategory } from "../../../../functions/fetchData";
import { useQuery } from "react-query";
import { CategoriesInterface } from "../../../../interfaces/interfaces";
import { useMutation} from "react-query"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import "./styles.css"
import Loader from "../../../loader/Loader";


function CategoryEdit(){

    const {id} = useParams();

    const url = `categories/${id}`
    

    const {data,status, error}:
    {data: any, status: string, error: any} = 
    useQuery([QUERY_KEY_CATEGORIES, id], () => {        
        return fetchCategory(url);
    });


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/categories";

    const editCategoryMutation = useMutation(
        (data: CategoriesInterface) => {
            return axios.put(`${API_URL}/${QUERY_KEY_CATEGORIES}/${id}`, data)
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
        editCategoryMutation.mutate(newCategory);

    }

    return(
        <div className="container-categories-create">
            <form onSubmit={handleSubmit}>
                {status === "loading" && <Loader/>}                
                {status === "error" && <h1>Error: {error.message}</h1>}      
                {status === "success" && 
                    <>
                        <input type="text" name="name" defaultValue={data?.name} />
                        <input type="text" name="image" defaultValue={data?.image}  />
                        <button>Editar</button>
                    </>
                }
            </form>
        </div>
    )
}

export default CategoryEdit