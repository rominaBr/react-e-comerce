import { useMutation, useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, QUERY_KEY_CATEGORIES, QUERY_KEY_PRODUCTS } from "../../../../consts/consts"
import { fetchCategories } from "../../../../functions/fetchData"
import { CategoriesInterface, ProductsInterface } from "../../../../interfaces/interfaces"
import Loader from "../../../loader/Loader"
import axios from "axios"
import "./styles.css"




function ProductCreate(){

    const { data: categories, status: categoriesStatus, error: categoriesError}: { data?: any, status: string, error: any } = useQuery(
        QUERY_KEY_CATEGORIES,
        fetchCategories
    ) 
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/products";

    const createProductMutation = useMutation(
        (data: ProductsInterface) => {
            return axios.post(`${API_URL}/${QUERY_KEY_PRODUCTS}`, data)
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
        const price = parseInt(formData.get("price") ?? '0', 10);
        const description = formData.get("description") as string;
        const categoryId = formData.get("categoryId") as string;
        const imagesFormData = formData.getAll("image");
        const images: string[] = imagesFormData.length > 0 ? imagesFormData : ["https://placehold.co/300x300/EEE/31343C"];
        
        const newProduct: ProductsInterface = {
            title, price, description, images, categoryId
        };
        createProductMutation.mutate(newProduct);

    }

    return(
        <form className="container-product-create" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Nombre" required/>
            <input type="number" name="price" placeholder="Precio" required/>
            <input type="text" name="description" placeholder="Descripción" />
            <select name="categoryId" id="">
                {categoriesStatus === "loading" && <Loader/>}                
                    {categoriesStatus  === "error" && <h1>Error: {categoriesError?.message}</h1>}      
                    {categoriesStatus  === "success" &&          
                        categories?.map((cat: CategoriesInterface) => {
                        return(
                            <option value={cat.id}>{cat.name}</option>                        
                        )
                })}
            </select>
            <input type="url" name="image" id="" />
            <input type="url" name="image" id="" />
            <input type="url" name="image" id="" />
            <button type="submit">Guardar</button>
        </form>
    )
}

export default ProductCreate


