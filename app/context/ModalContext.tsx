"use client";
import { createContext, useContext } from "react";

interface ModalContextType {
  openLoginModal: () => void;
  openSignupModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalContext.Provider");
  }
  return context;
};
