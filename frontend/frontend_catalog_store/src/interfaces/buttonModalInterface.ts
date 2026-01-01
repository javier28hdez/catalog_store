import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface ButtonModalProps {
  buttonText?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  icon?: ReactNode;
}
