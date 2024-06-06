import Typography from "@mui/material/Typography";
import { SubtitleTextProps } from "./types";

const SubtitleText = ({ text }: SubtitleTextProps) => {
  return (
    <Typography variant="h2" gutterBottom>
      {text}
    </Typography>
  );
};

export default SubtitleText;
