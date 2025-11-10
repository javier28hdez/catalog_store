import { useEffect, useState } from "react";
import { businessService } from "../services/businessService";
import type { Business } from "../interfaces/businessInterface";

type ErrorType = Error | null;

export function useBusiness(){

    const [business, setBusiness] = useState<Business[]>([]);
    const [error, setError] = useState<ErrorType>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const fetchBusiness = async () =>{
            try{
                setLoading(true);
                setError(null)

                const data = await businessService.getBusiness();

                setBusiness(data);
            } catch (err){
                setError(err as Error);
            }
            finally{
                setLoading(false);
            }

        }
        
        fetchBusiness();
    },[])

    return {business, error, loading}
}