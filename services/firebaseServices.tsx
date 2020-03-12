import firebase from "firebase";
import { useState } from "react";
// Required for side-effects
// require("firebase/firestore");
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
  return await firebase.auth().signOut();
};
export const getUsuario = async () => {
  return await firebase.app().auth().currentUser;
};
//   let usuario: firebase.User;
//   await firebase.auth().onAuthStateChanged(async user => {
//     usuario = user;
//   });
//   return usuario;
// };
