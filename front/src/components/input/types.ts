export interface InputProps {
  id: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isPassword?: boolean;
}
