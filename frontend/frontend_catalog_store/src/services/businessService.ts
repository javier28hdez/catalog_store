import type { BusinessData } from "../interfaces/businessInterface";

const urlBusiness = 'http://127.0.0.1:8000/store/business/'

export const businessService = {

  getBusiness: async () => {
    const response = await fetch(urlBusiness);

    if (!response.ok) {
      throw new Error("Ocurrio un error al mostrar los negocios")
    }

    const data = await response.json()

    return data as BusinessData[];
  },

  getBusinessById: async (id_business: string | undefined) => {
    const response = await fetch(`${urlBusiness}${id_business}/`)
    if (!response.ok) {
      throw new Error("Ocurrio un error al mostrar los negocios")
    }

    const data = await response.json()

    return data as BusinessData;

  },

  postBusiness: async (formData: FormData) => {
    const response = await fetch(`${urlBusiness}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Error: ' + response.status);

    await response.json();
    return response;
  }
};