import CircularProgress from "@mui/material/CircularProgress";
import { LoaderProps } from "./types";
import { constants } from "../../constants";

const Loader = (props: LoaderProps) => {
  return (
    <CircularProgress color="secondary" size={constants.elements.loader} />
  );
};

export default Loader;
