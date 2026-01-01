import type { ReactNode } from "react";

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export interface NotficationModalProps {
  isOpen: boolean;
  onClose: () => void;
  id_product: string | number;
}
