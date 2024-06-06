import Typography from "@mui/material/Typography";
import { ErrorTextProps } from "./types";
import { theme } from "../../../theme";

const ErrorText = ({ text }: ErrorTextProps) => {
  return (
    <Typography color={theme.status.error} variant="body1">
      {text}
    </Typography>
  );
};

export default ErrorText;
