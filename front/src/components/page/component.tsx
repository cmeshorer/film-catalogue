import { theme } from "../../theme";
import { PageProps } from "./types";

const Page = ({ children }: PageProps) => {
  return (
    <div
      style={{
        backgroundColor: theme.green,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default Page;
