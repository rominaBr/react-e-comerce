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