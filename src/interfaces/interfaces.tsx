export interface CategoriesInterface {
    id: number;
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
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    creationAt?: string;
    updateAt?: string;
}