import type { Dispatch, SetStateAction } from "react";

export interface CategoryData {
  id_category_product?: string;
  category_name: string;
  description?: string;
}

export interface FormCategoryModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  id_business?: string;
  onSuccesCategory: (newCategoryId: string) => void;
}
