import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { NavigationButtonProps } from "./types";

const NavigationButton = ({
  title,
  navigateTo,
  onClick,
}: NavigationButtonProps) => {
  return navigateTo ? (
    <Link to={navigateTo}>
      <Button color="secondary" size="medium" variant="text">
        {title}
      </Button>
    </Link>
  ) : onClick ? (
    <Button color="secondary" size="medium" variant="text" onClick={onClick}>
      {title}
    </Button>
  ) : null;
};

export default NavigationButton;
