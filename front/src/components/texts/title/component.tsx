import Typography from "@mui/material/Typography";
import { TitleTextProps } from "./types";

const TitleText = ({ text }: TitleTextProps) => {
  return (
    <Typography variant="h1" gutterBottom>
      {text}
    </Typography>
  );
};

export default TitleText;
