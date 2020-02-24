import React, { useState, useEffect } from "react";
import { View, ScrollView, Switch } from "react-native";
import MyHeader from "../components/myHeader";
import { Card, Divider, Snackbar } from "react-native-paper";
import { navigate } from "../router/Navigation";
import * as SecureStore from "expo-secure-store";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";

const ListaDocs = () => {
  const [salvo, setsalvo] = useState(false);
  const [doc1, setdoc1] = useState(false);
  const [doc2, setdoc2] = useState(false);
  const [doc3, setdoc3] = useState(false);
  const [doc4, setdoc4] = useState(false);
  const [doc5, setdoc5] = useState(false);

  const salvarDados = async () => {
    let lista = { doc1, doc2, doc3, doc4, doc5 };
    // console.log({ lista });
    let l = JSON.stringify(lista);
    await SecureStore.setItemAsync("lista", l);
    setsalvo(true);
  };
  const loadDados = () => {
    SecureStore.getItemAsync("lista").then(async res => {
      // console.log({ res });
      if (res) {
        let resposta = JSON.parse(res);
        // console.log({ resposta });
        setdoc1(resposta.doc1);
        setdoc2(resposta.doc2);
        setdoc3(resposta.doc3);
        setdoc4(resposta.doc4);
        setdoc5(resposta.doc5);
      }
    });
  };

  useEffect(() => {
    loadDados();
  }, []);

  useEffect(() => {
    handleAndroidBackButton(() => navigate("Servicos"));
    return removeAndroidBackButtonHandler;
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <MyHeader
        goBack={() => navigate("Servicos")}
        titulo="Alteração de Estado Civil"
        icon="content-save"
        iconEvent={salvarDados}
      ></MyHeader>
      <ScrollView>
        <Card>
          <Card.Title
            title="Documento 1"
            left={props => (
              <Switch
                {...props}
                value={doc1}
                onValueChange={vle => setdoc1(vle)}
              ></Switch>
            )}
          ></Card.Title>
        </Card>
        <Divider></Divider>
        <Card>
          <Card.Title
            title="Documento 2"
            left={props => (
              <Switch
                {...props}
                value={doc2}
                onValueChange={vle => setdoc2(vle)}
              ></Switch>
            )}
          ></Card.Title>
        </Card>
        <Divider></Divider>
        <Card>
          <Card.Title
            title="Documento 3"
            left={props => (
              <Switch
                {...props}
                value={doc3}
                onValueChange={vle => setdoc3(vle)}
              ></Switch>
            )}
          ></Card.Title>
        </Card>
        <Divider></Divider>
        <Card>
          <Card.Title
            title="Documento 4"
            left={props => (
              <Switch
                {...props}
                value={doc4}
                onValueChange={vle => setdoc4(vle)}
              ></Switch>
            )}
          ></Card.Title>
        </Card>
        <Divider></Divider>
        <Card>
          <Card.Title
            title="Documento 5"
            left={props => (
              <Switch
                {...props}
                value={doc5}
                onValueChange={vle => setdoc5(vle)}
              ></Switch>
            )}
          ></Card.Title>
        </Card>
        <Divider></Divider>
      </ScrollView>
      <Snackbar visible={salvo} onDismiss={() => setsalvo(false)}>
        Progresso salvo com sucesso
      </Snackbar>
    </View>
  );
};
export default ListaDocs;
