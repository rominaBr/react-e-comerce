import { API_URL } from "../consts/consts";


export const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories`)
    const json = await res.json();

    if (res.status === 404) {
        throw new Error("Categorías no encontradas");
    } else if (!res.ok) {
        throw new Error("Error en la solicitud");
    }
    
    return json

}

export const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`)
    const json = await res.json();

    if (res.status === 404) {
        throw new Error("Productos no encontradas");
    } else if (!res.ok) {
        throw new Error("Error en la solicitud");
    }

    return json

}