import { useEffect, useState } from "react";
import { businessService } from "../services/businessService";
import type { BusinessData } from "../interfaces/businessInterface";

type ErrorType = Error | null;

export function useBusinessById(id_business: string | undefined){
    
    const [business, setBusiness] = useState<BusinessData>();
    const [error, setError] = useState<ErrorType>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(()=>{
        const fetchProduct = async(id_business: string | undefined)=>{
                try{
                    setLoading(true);
                    setError(null);

                    const data = await businessService.getBusinessById(id_business);

                    setBusiness(data);
                }catch(err){
                    setError(err as Error);
                }finally{
                    setLoading(false);
                }
            }
            fetchProduct(id_business)
        }, [id_business])
            
    return {business, error, loading}
}