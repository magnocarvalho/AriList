// import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";
import * as GoogleSignIn from "expo-google-sign-in";
import Constants from "expo-constants";
import { navigate } from "../router/Navigation";
import * as AppAuth from "expo-app-auth";
import { Platform } from "react-native";
const { OAuthRedirect, URLSchemes } = AppAuth;

// Calling this function will open Google for login.
export async function googleLogin() {
  const yourClientIdForUseInStandalone = Platform.select({
    android:
      "171590076680-tnqeca02ttdlad3bs19gdeeu3r322cho.apps.googleusercontent.com",
    ios:
      "171590076680-ghrj7cjailo3s75hfpm9r0bl4jd47d9n.apps.googleusercontent.com"
  });
  try {
    // add any configuration settings here:
    debugger;
    let clientId = "";
    const isInClient = Constants.appOwnership;
    if (isInClient === "expo") {
      GoogleSignIn.allowInClient();
      clientId =
        "171590076680-tnqeca02ttdlad3bs19gdeeu3r322cho.apps.googleusercontent.com";
    } else {
      clientId = yourClientIdForUseInStandalone;
    }
    await GoogleSignIn.initAsync({
      isOfflineEnabled: true,
      isPromptEnabled: true,
      clientId: clientId
    });
    // create a new firebase credential with the token
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === "success") {
      console.log({ user });
      navigate("Inicio");
    }
  } catch (e) {
    console.error(e);
  }
}
