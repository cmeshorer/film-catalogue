import React from "react";
import TextField from "@mui/material/TextField";
import { InputProps } from "./types";

const Input = ({ id, placeholder, isPassword, onChangeText }: InputProps) => {
  return (
    <TextField
      id={id}
      label={placeholder}
      variant="standard"
      size="medium"
      color="secondary"
      fullWidth
      type={isPassword ? "password" : undefined}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeText(event.target.value);
      }}
    />
  );
};

export default Input;
