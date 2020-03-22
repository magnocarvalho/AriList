// import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";
import * as GoogleSignIn from "expo-google-sign-in";
import Constants from "expo-constants";
import { navigate } from "../router/Navigation";
import * as AppAuth from "expo-app-auth";
import { Platform } from "react-native";
import Expo, { AuthSession } from "expo";
const { OAuthRedirect, URLSchemes } = AppAuth;

// Calling this function will open Google for login.
export const googleLogin = async () => {
  // prettier-ignore
  const iosClientId = '171590076680-ghrj7cjailo3s75hfpm9r0bl4jd47d9n.apps.googleusercontent.com';

  // prettier-ignore
  const androidCliendId = '171590076680-tnqeca02ttdlad3bs19gdeeu3r322cho.apps.googleusercontent.com';

  try {
    debugger;
    const result = await Expo.Google.logInAsync({
      androidCliendId,
      iosClientId,
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      const { idToken, accessToken } = result;
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      return firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
      
    } else {
      console.log("cancelado");
    }
  } catch (error) {
    console.log("cancelado", error);
  }
  // const yourClientIdForUseInStandalone = Platform.select({
  //   android:
  //     "171590076680-tnqeca02ttdlad3bs19gdeeu3r322cho.apps.googleusercontent.com",
  //   ios:
  //     "171590076680-ghrj7cjailo3s75hfpm9r0bl4jd47d9n.apps.googleusercontent.com"
  // });
  // try {
  //   // add any configuration settings here:
  //   // debugger;

  //   let clientId = "";
  //   const isInClient = Constants.appOwnership;
  //   if (isInClient === "expo") {
  //     GoogleSignIn.allowInClient();
  //     clientId =
  //       "171590076680-tnqeca02ttdlad3bs19gdeeu3r322cho.apps.googleusercontent.com";
  //   } else {
  //     clientId = yourClientIdForUseInStandalone;
  //   }
  //   await GoogleSignIn.initAsync({
  //     // isOfflineEnabled: true,

  //     // isPromptEnabled: true,
  //     clientId: clientId
  //   });
  //   // create a new firebase credential with the token
  //   await GoogleSignIn.askForPlayServicesAsync();
  //   const { type, user } = await GoogleSignIn.signInAsync();
  //   if (type === "success") {
  //     const { idToken, accessToken } = result;
  //     const credential = firebase.auth.GoogleAuthProvider.credential(
  //       idToken,
  //       accessToken
  //     );
  //     firebase
  //       .auth()
  //       .signInAndRetrieveDataWithCredential(credential)
  //       .then(res => {
  //         // user res, create your user, do whatever you want
  //       })
  //       .catch(error => {
  //         console.log("firebase cred err:", error);
  //       });
  //     console.log({ user });
  //     navigate("Inicio");
  //   }
  // } catch (e) {
  //   console.error(e);
  // }
};
