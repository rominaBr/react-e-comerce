import { QUERY_KEY_CATEGORIES, QUERY_KEY_PRODUCTS } from "../../consts/consts";
import Loader from "../loader/Loader";
import "../styles.css";
import { useQuery } from "react-query";
import CardProduct from "./CardProduct";
import { fetchCategories, fetchProducts } from "../../functions/fetchData";
import { CategoriesInterface, ProductsInterface } from "../../interfaces/interfaces";
import { useState } from "react";
import SliderPrice from "../complements/SliderPrice";


function Products(){   
       

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);  
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });


    const { data: products, status: productStatus, error: productError}: { data?: any, status: string, error: any } = useQuery(
        QUERY_KEY_PRODUCTS,        
        () => fetchProducts("products")
    )   

    const { data: categories, status: categoriesStatus, error: categoriesError}: { data?: any, status: string, error: any } = useQuery(
        QUERY_KEY_CATEGORIES,
        fetchCategories
    )   
    
    
    function handleCategoryChange(categoryId: string, checked: boolean) {
        setSelectedCategories((selectedCategories) => {
          if (checked) {
            return [...selectedCategories, categoryId];
          } else {
            return selectedCategories.filter((id) => id !== categoryId);
          }
        });
    }

    function handleFilterChange(minValue: number, maxValue: number) {
        setPriceRange({ min: minValue, max: maxValue });
    }    

    return(
        <div className="container-products">
            <div className="categories-product">
                <h2>Filtrar por Categorías:</h2>
                {categoriesStatus === "loading" && <Loader/>}                
                {categoriesStatus  === "error" && <h1>Error: {categoriesError?.message}</h1>}      
                {categoriesStatus  === "success" &&          
                    categories?.map((cat: CategoriesInterface) => {
                    return(
                        <div className="checkbox-container">                            
                            <input type="checkbox"
                                id={String(cat.id)}
                                value={cat.id}
                                checked={selectedCategories.includes(String(cat.id))}
                                onChange={(e) => handleCategoryChange((e.target.value), e.target.checked)}
                            />
                            <label key={cat.id} className="checkbox" htmlFor={String(cat.id)}>
                                {cat.name}
                            </label>
                        </div>  

                        
                    )
                })}
                <SliderPrice onChangeRange={handleFilterChange}/>
                
            </div>
            <div className="container column">
                {productStatus === "loading" && <Loader/>}                
                {productStatus === "error" && <h1>Error: {productError?.message}</h1>}      
                {productStatus === "success" &&                
                    products 
                                       
                    .filter((prod: ProductsInterface) => {
                        
                        if (selectedCategories.length > 0 && !selectedCategories.includes(String(prod.category.id))) {
                          return false;
                        }
                        const productPrice = prod.price;
                        return productPrice >= priceRange.min && productPrice <= priceRange.max;
                    })                                          
                    .map((prod: ProductsInterface) => {
                        return(
                            <div key={prod.id}>
                                <CardProduct id={prod.id}
                                    title={prod.title}
                                    price={prod.price}
                                    description={prod.description}
                                    images={prod.images} category={prod.category} />
                            </div>
                        )
                    })                                            

                }

            </div> 
        
        </div>
    )
}

export default Products