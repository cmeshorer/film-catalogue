import moment from "moment";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Person from "@mui/icons-material/Person";
import Schedule from "@mui/icons-material/Schedule";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationButton from "../../components/buttons/navigation";
import Loader from "../../components/loader";
import Page from "../../components/page";
import ErrorText from "../../components/texts/error";
import InfoText from "../../components/texts/info";
import SubtitleText from "../../components/texts/subtitle";
import TitleText from "../../components/texts/title";
import WarningText from "../../components/texts/warning";
import { constants } from "../../constants";
import { getFilmCommentsService, logoutService } from "../../service";
import { useAuthStore } from "../../store";
import { theme } from "../../theme";
import styles from "./styles";
import {
  Comment,
  Comments,
  CommentsBackend,
  FilmCommentsScreenProps,
} from "./types";

const FilmCommentsScreen = (props: FilmCommentsScreenProps) => {
  const [comments, setComments] = React.useState<Comments>([]);
  const [isFetchingComments, setIsFetchingComments] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { id } = useParams();

  const commentsNumber = comments.length;
  const commentsWithRating = comments.filter((comment) => comment.rating);
  const commentsWithoutRating = comments.filter((comment) => !comment.rating);
  const firstCommentWithRating = commentsWithRating[0];
  const lastCommentWithRating =
    commentsWithRating[commentsWithRating.length - 1];
  const hasVariableRatings =
    commentsWithRating.length > 1 &&
    firstCommentWithRating.rating > 6 &&
    lastCommentWithRating.rating < 5;
  const listComments = hasVariableRatings
    ? [...commentsWithRating.slice(1, -1), ...commentsWithoutRating]
    : comments;

  const stackSpacing = 2;

  const setToken = useAuthStore((state) => state.storeToken);
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logoutService();
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const commentListAdapter: (commentList: CommentsBackend) => Comments = (
    commentList
  ) => {
    let adaptedComments = [] as Comments;
    if (!commentList) {
      return adaptedComments;
    }
    adaptedComments = commentList
      .map((comment) => ({
        author: comment.author,
        avatar: comment.author_details?.avatar_path,
        content: comment.content,
        date: moment(comment.created_at).format("DD/MM/YYYY"),
        id: comment.id,
        rating: comment.author_details?.rating,
      }))
      .sort((a, b) => b.rating - a.rating);
    return adaptedComments;
  };

  const getFilmComments = React.useCallback(async () => {
    try {
      if (!id) throw new Error("Missing film id");
      setError(false);
      setIsFetchingComments(true);
      const response = await getFilmCommentsService(id);
      const commentsBackend = response.data.comments.results;
      const commentsData = commentListAdapter(commentsBackend);
      setComments(commentsData);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsFetchingComments(false);
    }
  }, [id]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getFilmComments();
  }, [getFilmComments]);

  const Item = styled(Paper)(() => ({
    backgroundColor: theme.greyscale.white,
    borderRadius: constants.radius.normal,
    padding: constants.spacing.normal,
  }));

  const CommentItem = (comment: Comment) => {
    return (
      <Item>
        <div style={styles.commentHeader}>
          <Avatar
            alt={comment.author}
            src={`https://image.tmdb.org/t/p/original${comment.avatar}`}
            sx={styles.avatar}
          />
          <div
            style={{
              marginLeft: constants.spacing.small,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={styles.commentInfoContainer}>
              <Person style={styles.icon} />
              <InfoText text={comment.author} />
            </div>
            <div style={styles.commentInfoContainer}>
              <Schedule style={styles.icon} />
              <InfoText text={comment.date} />
            </div>
          </div>
        </div>
        <div style={styles.contentContainer}>
          <InfoText text={comment.content} />
        </div>
        <div style={styles.ratingContainer}>
          <SubtitleText text={comment.rating ? `${comment.rating}/10` : ""} />
        </div>
      </Item>
    );
  };

  const commentList = listComments.map((listComment) => (
    <CommentItem key={listComment.id} {...listComment} />
  ));

  return (
    <Page>
      <div style={styles.navigationContainer}>
        <NavigationButton title="Retour" navigateTo="/films" />
        <NavigationButton title="Se déconnecter" onClick={onLogout} />
      </div>
      <TitleText text="Commentaires" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          justifyContent:
            isFetchingComments || commentsNumber === 0 ? "center" : undefined,
        }}
      >
        {commentsNumber > 0 ? (
          <>
            {hasVariableRatings ? (
              <>
                <SubtitleText text="Positif" />
                <Stack style={styles.stack} spacing={stackSpacing}>
                  {firstCommentWithRating && (
                    <CommentItem {...firstCommentWithRating} />
                  )}
                </Stack>
                <div style={styles.titleContainer}>
                  <SubtitleText text="Critique" />
                </div>
                <Stack style={styles.stack} spacing={stackSpacing}>
                  {lastCommentWithRating && (
                    <CommentItem {...lastCommentWithRating} />
                  )}
                </Stack>
                {commentList.length > 0 ? (
                  <div style={styles.titleContainer}>
                    <SubtitleText text="Autres" />
                  </div>
                ) : null}
              </>
            ) : null}
            <Stack style={styles.commentListStack} spacing={stackSpacing}>
              {commentList}
            </Stack>
          </>
        ) : isFetchingComments ? (
          <Loader />
        ) : error ? (
          <ErrorText text="Une erreur est survenue. Veuillez réessayer ultérieurement." />
        ) : (
          <WarningText text="Aucun commentaire" />
        )}
      </div>
    </Page>
  );
};

export default FilmCommentsScreen;
