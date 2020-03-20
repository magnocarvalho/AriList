// import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";
import * as GoogleSignIn from "expo-google-sign-in";
import Constants from 'expo-constants';
import { navigate } from "../router/Navigation";
// Calling this function will open Google for login.
export async function googleLogin() {
  try {
    // add any configuration settings here:
    const isInClient = Constants.appOwnership;
    if (isInClient === "expo") {
      GoogleSignIn.allowInClient();
    }
    await GoogleSignIn.initAsync();
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
