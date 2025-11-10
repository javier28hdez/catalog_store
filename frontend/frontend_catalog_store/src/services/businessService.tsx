import type { Business } from "../interfaces/businessInterface";

const urlBusiness = 'http://127.0.0.1:8000/store/business/'

export const businessService = {

  getBusiness: async () => {
    const response = await fetch(urlBusiness);

    if(!response.ok){
        throw new Error("Ocurrio un error al mostrar los negocios")
    }

    const data = await response.json()
     
    return data as Business[];
  },
  /*
  createUser: async (userData) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return response.json();
  }*/
};