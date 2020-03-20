import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput, IconButton, Snackbar } from "react-native-paper";
import { navigate } from "../router/Navigation";
import MyHeader from "../components/myHeader";
// import TextInputMask from "react-native-text-input-mask";
const CelularPage = () => {
  const [email, setEmail] = useState(null);
  const [emailOK, setEmailOK] = useState(false);
  const [loadings, setLoad] = useState(false);
  const [erroSnack, seterroSnack] = useState(false);
  const [erroMensagem] = useState("");

  const ref1 = useRef(null);

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
    // logoutFB();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 10000);
  }, [loadings]);

  const validate = text => {
    // console.log(text);
    setEmail(text);
    let reg = /\([1-9]\d\)\s9?\d{4}-\d{4}/;
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

  const checkCelular = () => {
    alert(email);
  };

  return (
    <View style={estilo.page}>
      <MyHeader
        goBack={() => navigate("EmailPage")}
        titulo="Insira seu Telefone"
      ></MyHeader>
      <ScrollView>

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
          onPress={() => checkCelular()}
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
          onPress={() => checkCelular()}
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

export default CelularPage;
