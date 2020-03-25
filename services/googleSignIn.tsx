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
// import {
//   getUniqueId,
//   getManufacturer,
//   getPhoneNumber
// } from "react-native-device-info";

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
    const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
    if (result.type === "success") {
      // const { idToken, accessToken } = result;
      const user = await GoogleSignIn.signInSilentlyAsync();
      // debugger;
      let googleProfileData = await GoogleSignIn.getCurrentUser();
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      // debugger;
      if (googleProfileData.auth.idToken) {
        const credential = await firebase.auth.GoogleAuthProvider.credential(
          googleProfileData.auth.idToken,
          googleProfileData.auth.accessToken
        );
        let crd = await firebase.auth().signInWithCredential(credential);
      }
      // firebase
      //   .database()
      //   .ref("usuario/" + googleProfileData.uid)
      //   .once("value", snapshot => {
      //     // console.log('lista todas', snapshot)
      //   })
      //   .then(res => {
      //     // setconversation(tmp.sort(e => e.createdAt));
      //   });
      try {
        let tm = await firebase
          .database()
          .ref("usuario/" + googleProfileData.uid)
          .set({
            email: googleProfileData.email,
            photoURL: googleProfileData.photoURL,
            firstName: googleProfileData.firstName,
            lastName: googleProfileData.lastName,
            nome: googleProfileData.displayName,
            createdAt: new Date().toString(),
            provider: "GOOGLE"
          });
      } catch (error) {
        console.log("cancelado firebase", error);
      }

      return await googleProfileData;
    } else {
      console.log("cancelado");
    }
  } catch (error) {
    console.log("cancelado", error);
  }
};
