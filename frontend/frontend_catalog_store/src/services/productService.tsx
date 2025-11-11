import type { Product } from "../interfaces/productInterface";

const url_products = "http://127.0.0.1:8000/store/business/"

export const productServices = {
    getProduct: async (id_business: string | undefined) => {
        const response = await fetch(`${url_products}${id_business}/product/`);

        if (!response.ok)
            throw new Error("Ocurrio un error al mostrar los productos")

        const data = await response.json();
        return data as Product[]
    },
    getProductById: async (id_product: string | undefined) => {
        const response = await fetch(`${url_products}product/${id_product}/`)

        if (!response.ok)
            throw new Error("Ocurrio un error al mostrar el producto seleccionado")

        const data = await response.json();
        return data as Product
    }
}