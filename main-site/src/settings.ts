const requiredEnv = (prop: string, defaultValue?: string) => {
  const val = import.meta.env[prop] || defaultValue;
  if (val == null) {
    throw Error(`Missing required env '${prop}'`);
  }

  return val;
};

const requiredBool = (prop: string, defaultValue?: boolean) => {
  const strVal = requiredEnv(prop, defaultValue != null ? `${defaultValue}`: undefined)
  return ['true', '1', 't'].includes(strVal)
}

const requiredNum = (prop: string, defaultValue?: number): number => {
  const strVal = requiredEnv(prop, defaultValue != null ? `${defaultValue}`: undefined)
  return Number(strVal)
}

const Settings = Object.freeze({
  env: requiredEnv("NODE_ENV", "development"),
  auth: {
    // REQUIRED - Amazon Cognito Region
    region: requiredEnv("auth__region", "us-east-1"),
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: requiredEnv("auth__userPoolId"),
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: requiredEnv("auth_userPoolWebClientId"),
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: requiredBool("auth__mandatorySignIn", false);
    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    signUpVerificationMethod: requiredEnv("auth__signUpVerificationMethod", "code"),
    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    cookie: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: requiredEnv("auth__cookie__domain"),
      // OPTIONAL - Cookie path
      path: requiredEnv("auth__cookie__path", "/"),
      // OPTIONAL - Cookie expiration in days
      expires: requiredNum("auth__cookie__expires", 365),
      // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      sameSite: requiredEnv("auth__cookie__sameSite", "strict"),
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: requiredBool("auth__cookie__secure", true),
    },
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: requiredEnv("auth__authenticationFlowType", "USER_PASSWORD_AUTH"),

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: "myCustomValue" },
    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: requiredEnv("auth__domain", "auth.tothemast.app"),
      scope: ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: requiredEnv("auth__redirectSignIn"),
      redirectSignOut: requiredEnv("auth__redirectSignOut"),
      responseType: requiredEnv("auth__responseType", "code")
    },
  }
});

type Settings = typeof Settings;

export default Settings;
