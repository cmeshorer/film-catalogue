import Typography from "@mui/material/Typography";
import { InfoTextProps } from "./types";

const InfoText = ({ text }: InfoTextProps) => {
  return <Typography variant="body1">{text}</Typography>;
};

export default InfoText;
