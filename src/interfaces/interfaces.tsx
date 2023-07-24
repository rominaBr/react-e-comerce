export interface CategoriesInterface {
    id?: number;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
}

export interface ProductsInterface{
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt?: string;
    updatedAt?: string;
    category: CategoriesInterface
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
    data: User;
    isUserValid: boolean;
}

export interface AuthContextType {
    login(userData: any, arg1: () => void): unknown;  
    user: UserLoginDataResponse | null;
    signin: (user: UserLoginDataResponse, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
    userInfo: UserLogeado;
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