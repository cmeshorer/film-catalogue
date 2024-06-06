import Lottie from "lottie-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import cinemaAnimation from "../../assets/animations/cinema.json";
import ActionButton from "../../components/buttons/action";
import Input from "../../components/input";
import Loader from "../../components/loader";
import Page from "../../components/page";
import ErrorText from "../../components/texts/error";
import TitleText from "../../components/texts/title";
import { loginService } from "../../service";
import { useAuthStore } from "../../store";
import styles from "./styles";
import { LoginScreenProps } from "./types";

const LoginScreen = (props: LoginScreenProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [error, setError] = React.useState(false);

  const isPartialInfos = !email || !password;

  const setToken = useAuthStore((state) => state.storeToken);
  const navigate = useNavigate();

  const onAuthenticate = async () => {
    try {
      setIsAuthenticating(true);
      const response = await loginService(email, password);
      const token = response?.data?.authToken?.token;
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/films");
      window.location.reload();
    } catch (err) {
      setError(true);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const onChangeEmail = (text: string) => {
    setError(false);
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setError(false);
    setPassword(text);
  };

  return (
    <Page>
      <TitleText text="Connexion" />
      <div>
        <Input
          id="username"
          placeholder="Identifiant"
          onChangeText={onChangeEmail}
        />
        <Input
          id="password"
          placeholder="Mot de passe"
          onChangeText={onChangePassword}
          isPassword
        />
      </div>
      <div style={styles.buttonContainer}>
        {isAuthenticating ? (
          <Loader />
        ) : (
          <ActionButton
            title="Se connecter"
            disabled={isPartialInfos}
            onClick={onAuthenticate}
          />
        )}
      </div>
      <div style={styles.errorContainer}>
        {error ? (
          <ErrorText text="Identifiant ou mot de passe incorrect, veuillez réessayer." />
        ) : null}
      </div>
      <Lottie style={styles.animation} animationData={cinemaAnimation} />
    </Page>
  );
};

export default LoginScreen;
