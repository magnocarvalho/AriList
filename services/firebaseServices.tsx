import firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { doc } from "../documentos.json";
require("firebase/auth");

export const criarUsuario = async (email, password) => {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
};
export const checkEmailUsuario = async email => {
  return await firebase.auth().fetchSignInMethodsForEmail(email);
};
export const fazerLogin = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
export const logoutFB = async () => {
  await SecureStore.deleteItemAsync("zona");
  await SecureStore.deleteItemAsync("email");
  await SecureStore.deleteItemAsync("lista");
  for (let i = 0; i < doc.length; i++) {
    for (let j = 0; j < doc[i].documentos.length; j++) {
      await SecureStore.deleteItemAsync(doc[i].documentos[j].id);
    }
  }
  return await firebase.auth().signOut();
};
export const getUsuario = async () => {
  return await firebase.app().auth().currentUser;
};

export const userLogado = async () => {
  return firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User is signed in.");
    } else {
      console.log("No user is signed in.");
    }
  });
};
