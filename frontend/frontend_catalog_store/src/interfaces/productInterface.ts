export interface Product{
    id_product: number,
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
    name: string,
    description: string,
    img_product: string | File;
    price: number, 
    stock: number,
    moneda: string
}
