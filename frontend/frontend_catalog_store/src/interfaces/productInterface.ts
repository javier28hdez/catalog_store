import type { CategoryData } from "./categoryInterface";

export interface Product{
    id_product: number,
    category: CategoryData ,
    //"id_business": 6,
    name: string,
    description: string,
    price: number,
    stock: number,
    img_product: string,
    is_available: boolean,
    tags: string,
    moneda: string,
}

export interface ProductProps{
    id_product: string | number,
    id_business: string,
    name: string,
    description: string,
    img_product: string | File;
    price: number, 
    stock: number,
    moneda: string
}
