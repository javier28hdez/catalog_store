import type { CategoryData } from "@/interfaces/categoryInterface";
import { categoryService } from "@/services/categoryService";
import { useEffect, useState } from "react";

type ErrorType = Error | null;

export function useAllCategory(
  id_business: string | undefined,
  refreshCategory: boolean
) {
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategory = async (id_business: string | undefined) => {
      try {
        setLoading(true);
        setError(null);

        const data = await categoryService.getAllCategory(id_business);

        setCategory(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory(id_business);
    console.log(category);
  }, [id_business, refreshCategory]);

  return { category, error, loading };
}
