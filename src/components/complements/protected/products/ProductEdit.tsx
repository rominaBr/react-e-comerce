import { useParams } from "react-router-dom"
import { API_URL, QUERY_KEY_CATEGORIES, QUERY_KEY_PRODUCTS } from "../../../../consts/consts";
import { fetchCategories, fetchCategory } from "../../../../functions/fetchData";
import { useQuery } from "react-query";
import { CategoriesInterface, ProductsInterface } from "../../../../interfaces/interfaces";
import { useMutation} from "react-query"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import "./styles.css"
import Loader from "../../../loader/Loader";


function ProductEdit(){
    const {id} = useParams();

    const url = `products/${id}`
    

    const { data: categories, status: categoriesStatus, error: categoriesError}: { data?: any, status: string, error: any } = useQuery(
        QUERY_KEY_CATEGORIES,
        fetchCategories
    ) 
    
    const {data,status, error}:
    {data: any, status: string, error: any} = 
    useQuery([QUERY_KEY_PRODUCTS, id], () => {   
        return fetchCategory(url);
    });


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/products";

    const editProductMutation = useMutation(
        (data: ProductsInterface) => {
            return axios.put(`${API_URL}/${QUERY_KEY_PRODUCTS}/${id}`, data)
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
        const title = formData.get("title") as string;  
        const price = parseInt(formData.get("price"));  
        const description = formData.get("description") as string;  
        const categoryId = formData.get("categoryId") as string;
        const imagesFormData = formData.getAll("image");
        const images: string[] = imagesFormData.length > 0 ? imagesFormData : ["https://placehold.co/300x300/EEE/31343C"];
        
        const newProduct: ProductsInterface = {
            title, price, description, images, categoryId
        };

        editProductMutation.mutate(newProduct);

    }

    return(
        <div className="container-categories-create">
            <form onSubmit={handleSubmit}>
                {status === "loading" && <Loader/>}                
                {status === "error" && <h1>Error: {error.message}</h1>}      
                {status === "success" && 
                    <>
                        <input type="text" name="title" defaultValue={data?.title} />
                        <input type="number" name="price" defaultValue={data?.price} />
                        <input type="text" name="description" defaultValue={data?.description} />

                        <select name="categoryId" id="" onSelect={data?.category.id}>
                            {categoriesStatus === "loading" && <Loader/>}                
                                {categoriesStatus  === "error" && <h1>Error: {categoriesError?.message}</h1>}      
                                {categoriesStatus  === "success" &&          
                                    categories?.map((cat: CategoriesInterface) => {
                                    return(
                                        <option value={cat.id}>{cat.name}</option>                        
                                    )
                            })}
                        </select>         
                                      
                        {data?.images.map((i: string) => {
                            return(
                                <input type="url" name="image" defaultValue={i}/> 
                            )
                            
                        })}
                        
                         
                        <button>Editar</button>
                    </>
                }
            </form>
        </div>
    )
}

export default ProductEdit