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
    },
    postProduct: async (formData: FormData, id_business: string | undefined) => {
        const response = await fetch(`${url_products}${id_business}/product/`, {
            method: 'POST',
            body: formData,
        })
        if (!response.ok)
            throw new Error("Ocurrio un error al crear el producto")

        const data = await response.json()
        return data
    },
    putProduct: async (formData: FormData, id_product: string | number) => {
        const response = await fetch(`${url_products}product/${id_product}/`, {
            method: 'PUT',
            body: formData,
        })
        if (!response.ok)
            throw new Error("Ocurrio un error al crear el producto")

        const data = await response.json()
        return data
    },
    putToggleProduct: async (id_product: number | string) => {
        const response = await fetch(`${url_products}product/${id_product}/toggle/`, {
            method: 'PUT',
        })
        if (!response.ok)
            throw new Error("Ocurrio un error al crear el producto")

        const data = await response.json()
        return data
    }
}