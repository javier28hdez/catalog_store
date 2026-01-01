import type { CategoryData } from "./categoryInterface";

export interface Product {
  id_product: string | number;
  category: CategoryData;
  id_business: string;
  name: string;
  description: string;
  price: string | number;
  stock: string | number;
  img_product: string;
  is_available: boolean;
  tags: string;
  moneda: string;
}

export interface ProductProps {
  id_product: string | number;
  id_business: string;
  name: string;
  description: string;
  img_product: string | File;
  price: string | number;
  stock: string | number;
  moneda: string;
}

export interface ProductFormComponentProps {
  onSuccess: () => void;
  id_business?: string;
  mode: "create" | "edit";
  product?: Product;
}
