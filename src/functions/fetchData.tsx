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

export const fetchCategory = async (url: string) => {
    const res = await fetch(`${API_URL}/${url}`)
    const json = await res.json();

    if (res.status === 404) {
        throw new Error("Categorías no encontradas");
    } else if (!res.ok) {
        throw new Error("Error en la solicitud");
    }
    return json

}


export const fetchProducts = async (url: string) => {
    const res = await fetch(`${API_URL}/${url}`)
    const json = await res.json();

    if (res.status === 404) {
        throw new Error("Productos no encontrados");
    } else if (!res.ok) {
        throw new Error("Error en la solicitud");
    }

    return json

}



export const fetchUser = async (access_token?: string) => { 
    if (access_token) { 
        
        const res = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (!res.ok) {        
            return { isUserValid: false };
        }
        const json = await res.json();
        
        return { isUserValid: true, data: json };
        } else {
      
        return { isUserValid: false };
    }
};
  
