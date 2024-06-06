import Typography from "@mui/material/Typography";
import { WarningTextProps } from "./types";
import { theme } from "../../../theme";

const WarningText = ({ text }: WarningTextProps) => {
  return (
    <Typography color={theme.status.warning} variant="body1">
      {text}
    </Typography>
  );
};

export default WarningText;
