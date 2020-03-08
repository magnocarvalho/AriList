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
