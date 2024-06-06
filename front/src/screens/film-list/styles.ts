import { constants } from "../../constants";
import { theme } from "../../theme";

const styles = {
  commentsLink: {
    textDecoration: "none",
    color: theme.greyscale.black,
  },
  imageList: {
    width: "80%",
  },
  imageListItem: {
    backgroundColor: theme.greyscale.regular,
    borderRadius: constants.radius.normal,
  },
  infosContainer: {
    height: constants.elements.infoContainer,
    padding: constants.spacing.normal,
    overflow: "clip",
  },
  logoutNavigator: {
    alignSelf: "flex-end",
  },
  popularity: {
    fontWeight: "bold",
    marginLeft: constants.spacing.tiny,
  },
  popularityContainer: {
    marginTop: constants.spacing.small,
    marginBottom: constants.spacing.small,
    display: "flex",
    justifyContent: "center",
  },
  poster: {
    borderTopLeftRadius: constants.radius.normal,
    borderTopRightRadius: constants.radius.normal,
  },
  title: {
    fontWeight: "bold",
  },
};
export default styles;
