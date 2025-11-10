import type { Product } from "../interfaces/productInterface";

const url_products = "http://127.0.0.1:8000/store/business/"

export const productServices={
    getProduct: async() =>{
        const response = await fetch(`${url_products}6/product/`);

        if (!response.ok)
            throw new Error("Ocurrio un error al mostrar los productos")

        const data = await response.json();
        return data as Product[]
    }
}