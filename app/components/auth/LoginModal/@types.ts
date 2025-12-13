export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  initialMode?: "login" | "signup";
}

