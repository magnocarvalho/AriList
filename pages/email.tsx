import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Button,
  TextInput,
  IconButton,
  Snackbar,
  Paragraph,
  Checkbox
} from "react-native-paper";
import BotaoInicial from "../components/botaoInicial";
import { navigate } from "../router/Navigation";
import { Card } from "react-native-paper";
import { googleLogin } from "../services/googleSignIn";
import MyHeader from "../components/myHeader";
import {
  criarUsuario,
  checkEmailUsuario,
  fazerLogin,
  logoutFB
} from "../services/firebaseServices";
import * as SecureStore from "expo-secure-store";
const EmailPage = () => {
  const [email, setEmail] = useState(null);

  const [emailOK, setEmailOK] = useState(false);
  const [loadings, setLoad] = useState(false);
  const [erroSnack, seterroSnack] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const estilo = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: "#fff"
    },
    inputs: {
      margin: 10
    }
  });

  useEffect(() => {
    setTimeout(() => {
      ref1.current.focus();
    }, 300);
    logoutFB();
    SecureStore.getItemAsync("email").then(e => {
      setEmail(e);
      validate(e);
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 10000);
  }, [loadings]);

  const confirmar = async () => {
    setLoad(true);
    if (emailOK) {
      setLoad(false);
    } else {
      await setErroMensagem("Confira suas informações");
      await seterroSnack(true);
      setLoad(false);
    }
  };

  const validate = text => {
    // console.log(text);
    setEmail(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // setErroMensagem("Email is Not Correct");
      setEmailOK(false);
      // seterroSnack(true);
      // return false;
    } else {
      setEmailOK(true);
      // return true;
    }
  };

  const checkEmail = async () => {
    setLoad(true);
    if (emailOK) {
      checkEmailUsuario(email)
        .then(async em => {
          console.log(em);
          await SecureStore.setItemAsync("email", email);
          if (em.length == 0) {
            navigate("SenhasPage", { email });
          } else {
            navigate("SenhaPage");
          }
        })
        .catch(async e => {
          await setErroMensagem(e.message);
          await seterroSnack(true);
        })
        .finally(() => setLoad(false));
    } else {
      setLoad(false);
    }
  };

  return (
    <View style={estilo.page}>
      <MyHeader
        goBack={() => navigate("Login")}
        titulo="Insira seu email"
      ></MyHeader>
      <ScrollView>
        <TextInput
          style={estilo.inputs}
          ref={ref1}
          error={!emailOK && email != null}
          label="Insira um email válido"
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={e => validate(e)}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => checkEmail()}
        />
        <View
          style={[
            estilo.inputs,
            { flex: 1, flexDirection: "row", alignItems: "center" }
          ]}
        >
          <Checkbox status="checked"></Checkbox>
          <Paragraph>Termos de uso</Paragraph>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flex: 1,
          opacity: emailOK ? 1 : 0.75,
          flexDirection: "row",
          alignItems: "stretch",
          alignContent: "space-between",
          backgroundColor: "#009beb"
        }}
      >
        <TouchableOpacity
          disabled={!emailOK}
          onPress={() => checkEmail()}
          style={{ flex: 1, alignSelf: "center" }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              color: "#fff",
              paddingLeft: 20,
              fontSize: 20
            }}
          >
            Proximo
          </Text>
        </TouchableOpacity>
        <IconButton
          disabled={!emailOK}
          onPress={() => checkEmail()}
          color="#fff"
          style={{ alignSelf: "flex-end" }}
          icon="arrow-right"
        ></IconButton>
      </View>

      <Spinner
        visible={loadings}
        textContent={"Carregando..."}
        textStyle={{ fontSize: 18, color: "#FFF" }}
        overlayColor="#009beb"
        animation="fade"
        color="#FFF"
      />
      <Snackbar
        style={{ backgroundColor: "red" }}
        visible={erroSnack}
        onDismiss={() => seterroSnack(false)}
      >
        Error! {erroMensagem}
      </Snackbar>
    </View>
  );
};

export default EmailPage;
