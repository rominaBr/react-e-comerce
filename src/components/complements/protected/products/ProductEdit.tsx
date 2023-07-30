import { useParams } from "react-router-dom"
import { API_URL, QUERY_KEY_PRODUCTS } from "../../../../consts/consts";
import { fetchProducts } from "../../../../functions/fetchData";
import { useQuery } from "react-query";
import {  Product } from "../../../../interfaces/interfaces";
import { useMutation} from "react-query"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import "../styles.css"
import Loader from "../../../loader/Loader";


function ProductEdit(){
    
    const {id} = useParams();

    const url = `products/${id}`  

    const {data,status, error}:
    {data: any, status: string, error: any} = 
    useQuery([QUERY_KEY_PRODUCTS, id], () => { 
               
        return fetchProducts(url);
    });

    const [title, setTitle] = useState<string>(data?.title || "");
    const [price, setPrice] = useState<number>(data?.price || 0);
    const [description, setDescription] = useState<string>(data?.description || "");
    
    
    useState(() => {
        if (data) {
          setTitle(data.title);
          setPrice(data.price);
          setDescription(data.description);      
          
        }
    });
     

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/products";

    const editProductMutation = useMutation(
        (data: Product) => {            
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
                
        const newProduct: Product = {
            title,
            price,
            description,                        
        };

        editProductMutation.mutate(newProduct);

    }

    return(
        <div className="container">
            <div className="form">
                <div className="wrapper-form">
                    <form onSubmit={handleSubmit}>
                        {status === "loading" && <Loader/>}                
                        {status === "error" && <h1>Error: {error.message}</h1>}      
                        {status === "success" && 
                            <>
                                <div className="input-box">
                                    <input type="text" name="title" defaultValue={data.title} onChange={(e) =>
                                        setTitle(e.target.value) } required/>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </div>
                                
                                <div className="input-box">
                                <input type="number" name="price" defaultValue={data.price} onChange={(e) => 
                                    setPrice(parseInt(e.target.value))} required/>
                                    <i className="fa-solid fa-dollar-sign"></i>
                                </div>                        
                               
                                <div className="input-box">
                                <input type="text" name="description" defaultValue={data.description} onChange={(e) => 
                                    setDescription(e.target.value)} required/>
                                    <i className="fa-solid fa-list"></i>
                                </div>                               
                                    
                                
                                <button className="btn">Editar</button>
                            </>
                        }
                    </form>
                </div>
               
            </div>
            
        </div>
    )
}

export default ProductEdit