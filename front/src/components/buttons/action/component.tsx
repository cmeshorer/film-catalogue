import { ActionButtonProps } from "./types";

import Button from "@mui/material/Button";

const ActionButton = ({ title, onClick, disabled }: ActionButtonProps) => {
  return (
    <Button
      color="secondary"
      size="large"
      variant="contained"
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default ActionButton;
