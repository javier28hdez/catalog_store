import { useEffect, useState } from "react";
import type { CategoryData } from "../interfaces/categoryInterface";
import { categoryService } from "../services/categoryService";

type ErrorType = Error | null;

export function useCategoryById(id_category_product: string | undefined){
    const [category, setCategory] = useState<CategoryData>();
    const [error, setError] = useState<ErrorType>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const fetchCategory = async(id_category_product: string | undefined)=>{
                try{
                    setLoading(true);
                    setError(null);

                    const data = await categoryService.getCategoryById(id_category_product);

                    setCategory(data);
                }catch(err){
                    setError(err as Error);
                }finally{
                    setLoading(false);
                }
            }
            fetchCategory(id_category_product)
        }, [id_category_product])
        
        return {category, error, loading}
}