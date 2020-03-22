// import { GoogleSignin } from "react-native-google-signin";
// import firebase from "react-native-firebase";
import * as firebase from "firebase";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";
import Constants from "expo-constants";
import { navigate } from "../router/Navigation";
import * as AppAuth from "expo-app-auth";
import { Platform } from "react-native";
import Expo, { AuthSession } from "expo";
const { OAuthRedirect, URLSchemes } = AppAuth;

// Calling this function will open Google for login.
export const googleLogin = async () => {
  try {
    const yourClientIdForUseInStandalone = Platform.select({
      android:
        "171590076680-tnqeca02ttdlad3bs19gdeeu3r322cho.apps.googleusercontent.com",
      ios:
        "171590076680-ghrj7cjailo3s75hfpm9r0bl4jd47d9n.apps.googleusercontent.com"
    });

    // add any configuration settings here:
    // debugger;

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
      clientId: clientId
    });
    await GoogleSignIn.askForPlayServicesAsync();
    const result = await GoogleSignIn.signInAsync();
    if (result.type === "success") {
      // const { idToken, accessToken } = result;
      const user = await GoogleSignIn.signInSilentlyAsync();
      // debugger;
      // let tmp = await GoogleSignIn.getCurrentUser()
      // firebase.auth.GoogleAuthProvider.credential()
      // URLSchemes
      // OAuthRedirec
      const credential = await firebase.auth.GoogleAuthProvider.credential(
        user.auth.idToken,
        user.auth.accessToken
      );
      console.log(credential);
      return await firebase.auth().signInWithCredential(credential);
    } else {
      console.log("cancelado");
    }
  } catch (error) {
    console.log("cancelado", error);
  }
};
