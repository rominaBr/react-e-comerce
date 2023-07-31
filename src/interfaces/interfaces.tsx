export interface CategoriesInterface {
    id?: number;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
}

export interface ProductsInterface{
    id?: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt?: string;
    updatedAt?: string;
    categoryId?: number;
    category?: CategoriesInterface
}

export interface Product{
    title: string;
    price: number;
    description: string;
}

export interface User{
    id?: number;
    email: string;
    password: string;
    name: string;
    role?: string;
    avatar: string;
    creationAt?: string;
    updateAt?: string;
}

export interface UserLogeado{
    data?: User;
    isUserValid: boolean;
}

export interface AuthContextType {
    login?(userData: UserLoginData, arg1: () => void): unknown;  
    user: UserLoginDataResponse | null;
    signin: (user: UserLoginDataResponse, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
    userInfo: UserLogeado | undefined;
    isLoading: boolean,
    isError: boolean,
}

export interface UserLoginData {
    email: string;
    password: string;
}
  
export interface UserLoginDataResponse { 
    access_token: string;
}

export interface CartContextType {
    cartItems: number;
    updateCartItems: (items: number) => void;
}
  