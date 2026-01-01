import type { CategoryData } from "../interfaces/categoryInterface";
import { STATIC_URL } from "@/utils/url";

const urlCategory = "product/category/";

export const categoryService = {
  getCategoryById: async (id_category_product: string | undefined) => {
    const response = await fetch(
      `${STATIC_URL}${urlCategory}${id_category_product}/`
    );

    if (!response.ok) {
      throw new Error("Ocurrio un error al la categoria del producto");
    }

    const data = await response.json();

    return data as CategoryData;
  },

  getAllCategory: async (id_business: string | undefined) => {
    const response = await fetch(`${STATIC_URL}${id_business}/${urlCategory}`);

    if (!response.ok) {
      throw new Error("Ocurrio un error al obtener las categorias");
    }

    const data = await response.json();

    return data as CategoryData[];
  },

  postCategory: async (formData: FormData) => {
    const response = await fetch(`${STATIC_URL}${urlCategory}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        "Ocurrió un error al crear la categoría" + response.status
      );
    }

    const data = await response.json();
    return data;
  },
};
