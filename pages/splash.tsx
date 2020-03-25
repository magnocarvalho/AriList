import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { navigate } from "../router/Navigation";
import * as SecureStore from "expo-secure-store";
import * as firebase from "firebase";
import { getUsuario } from "../services/firebaseServices";
import { Snackbar } from "react-native-paper";
import * as GoogleSignIn from "expo-google-sign-in";
import { DotIndicator } from "react-native-indicators";
// Initialize Firebase

const SplashScreen = () => {
  const welcome = ", Seja\nBem Vindo!";
  const opacity = new Animated.Value(0);
  const [fb_test, setFbTeste] = useState(false);
  const [zona, setzona] = useState(null);
  const [userLogado, setuserLogado] = useState(null);
  const [fb1, setFb1] = useState(false);
  const [fb2, setFb2] = useState(false);
  let styles = StyleSheet.create({
    texto: {
      color: "#fff",
      fontSize: 40,
      alignItems: "center",
      textAlign: "center",
      paddingBottom: 30
    },
    con: { alignItems: "center", textAlign: "center" }
  });
  useEffect(() => {
    setTimeout(() => {
      setFbTeste(true);
    }, 1000);
  }, []);

  useEffect(() => {
    fb_login();
  }, []);

  const fb_login = async () => {
    try {
      await firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            SecureStore.getItemAsync("zona")
              .then(async zona => {
                if (zona) {
                  navigate("Servicos", { tipo: zona });
                } else {
                  navigate("Inicio");
                }
              })
              .catch(e => {
                navigate("Inicio");
              });
          } else {
            navigate("Login");
          }
        },
        err => {
          console.log(err);
          setFb1(true);
          setTimeout(() => {
            navigate("Login");
          }, 1000);
        }
      );
    } catch (error) {
      console.log("Erro ao conectar com os servidores da aplicação\n" + error);
      setFb1(true);
    }
  };

  return (
    <View style={styles.con}>
      <Text style={styles.texto}>
        Olá<Animated.Text style={{ opacity }}>{welcome}</Animated.Text>
      </Text>
      {fb_test && <DotIndicator color="white"></DotIndicator>}
      <Snackbar
        style={{ backgroundColor: "red" }}
        visible={fb1}
        onDismiss={() => setFb1(false)}
      >
        Erro ao conectar com os servidores da aplicação
      </Snackbar>
    </View>
  );
};

export default SplashScreen;
