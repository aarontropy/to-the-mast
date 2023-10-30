import { ReactNode, createContext, useContext } from "react";
import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator, WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Settings from "./Settings";

Amplify.configure({ Auth: Settings.auth });

export const AuthContext = createContext<WithAuthenticatorProps>({});

export type AuthProviderProps = WithAuthenticatorProps & {
  children: ReactNode;
};

export const AuthProvider = withAuthenticator(({ children, ...authProps }: AuthProviderProps) => {
  return <AuthContext.Provider value={authProps}>{children}</AuthContext.Provider>;
});

export function withAuth(): WithAuthenticatorProps {
  const authProps = useContext(AuthContext);
  return authProps;
}
