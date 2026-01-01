import { useEffect, useState } from "react";
import { productServices } from "../services/productService";
import type { Product } from "../interfaces/productInterface";

type ErrorType = Error | null;

export function useProductById(id_product: string | undefined) {
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchProduct = async (id_product: string | undefined) => {
      try {
        setLoading(true);
        setError(null);

        const data = await productServices.getProductById(id_product);

        setProduct(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct(id_product);
  }, [id_product, refresh]);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  return { product, error, loading, refetch };
}
