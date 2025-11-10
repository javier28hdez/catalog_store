import { useEffect, useState } from "react";
import type { Product } from "../interfaces/productInterface";
import { productServices } from "../services/productService";

type ErrorType = Error | null;

export function useAllProduct(){
    const [products, setProduct] = useState<Product[]>([]);
    const [error, setError] = useState<ErrorType>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const fetchProduct = async()=>{
                try{
                    setLoading(true);
                    setError(null);

                    const data = await productServices.getProduct();

                    setProduct(data);
                }catch(err){
                    setError(err as Error);
                }finally{
                    setLoading(false);
                }
            }
            fetchProduct()
        }, [])
        
        return {products, error, loading}
}