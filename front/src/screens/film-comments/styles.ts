import { constants } from "../../constants";

const styles = {
  avatar: {
    width: constants.elements.avatar,
    height: constants.elements.avatar,
  },
  commentHeader: {
    display: "flex",
    marginBottom: constants.spacing.small,
  },
  commentListStack: {
    width: "50%",
    marginBottom: constants.spacing.large,
  },
  commentInfoContainer: {
    display: "flex",
  },
  contentContainer: {
    overflow: "clip",
  },
  icon: {
    marginRight: constants.spacing.tiny,
  },
  navigationContainer: {
    alignSelf: "flex-end",
  },
  ratingContainer: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  stack: {
    width: "50%",
  },
  titleContainer: {
    marginTop: constants.spacing.large,
  },
};

export default styles;
