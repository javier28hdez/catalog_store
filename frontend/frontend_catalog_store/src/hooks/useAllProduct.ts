import { useEffect, useState } from "react";
import type { Product } from "../interfaces/productInterface";
import { productServices } from "../services/productService";

type ErrorType = Error | null;

export function useAllProduct(id_business: string | undefined) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchProduct = async (id_business: string | undefined) => {
      try {
        setLoading(true);
        setError(null);

        const data = await productServices.getProduct(id_business);

        setProducts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct(id_business);
  }, [id_business, refresh]);

  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };

  return { products, error, loading, refetch };
}
