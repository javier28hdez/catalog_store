import type { CategoryData } from "../interfaces/categoryInterface";

const urlCategory = 'http://127.0.0.1:8000/store/business/product/category/'

export const categoryService = {

    getCategoryById: async (id_category_product: string | undefined) => {
        const response = await fetch(`${urlCategory}${id_category_product}/`);

        if (!response.ok) {
            throw new Error("Ocurrio un error al la categoria del producto")
        }

        const data = await response.json()

        return data as CategoryData;
    },
};