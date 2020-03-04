import React, { useState, useEffect } from "react";
import { View, ScrollView, Switch, FlatList, Text } from "react-native";
import MyHeader from "../components/myHeader";
import {
  Card,
  Divider,
  Snackbar,
  Subheading,
  TouchableRipple
} from "react-native-paper";
import { navigate } from "../router/Navigation";
import * as SecureStore from "expo-secure-store";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";
import { doc } from "../documentos.json";
import ItemDocumento from "./item";
import * as WebBrowser from "expo-web-browser";

const DocsComponente = ({ navigation }) => {
  // const docs = navigation.getParam("docs");
  const [salvo, setsalvo] = useState(false);
  const [docs, setDocs] = useState(doc[0]);
  const [leis, setLeis] = useState([{ value: "", lei: "", link: "", id: "" }]);
  const [result, setResult] = useState(null);
  const _handlePressButtonAsync = async l => {
    let result = await WebBrowser.openBrowserAsync(l);
    setResult(result);
  };
  useEffect(() => {
    // loadDados();
    // console.log({docs});
    setLeis(docs.documentos);
    // setDocs(doc[0])
  }, [docs]);

  useEffect(() => {
    handleAndroidBackButton(() => navigate("Servicos"));
    return removeAndroidBackButtonHandler;
  }, []);

  return (
    <>
      <MyHeader
        goBack={() => navigate("Servicos")}
        titulo={docs.titulo}
      ></MyHeader>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <FlatList
          ListHeaderComponent={
            <Card>
              <Card.Content>
                <Subheading>{docs.descricao}</Subheading>
                <TouchableRipple
                  onPress={() => _handlePressButtonAsync(docs.link)}
                >
                  <Subheading style={{ textDecorationLine: "underline" }}>
                    {docs.lei}
                  </Subheading>
                </TouchableRipple>
              </Card.Content>
            </Card>
          }
          data={leis}
          renderItem={({ item }) => (
            <ItemDocumento
              value={item.value}
              link={item.link}
              lei={item.lei}
              id={item.id}
              titulo={docs.titulo}
            ></ItemDocumento>
          )}
        ></FlatList>
        <Snackbar visible={salvo} onDismiss={() => setsalvo(false)}>
          Progresso salvo com sucesso
        </Snackbar>
      </View>
    </>
  );
};
export default DocsComponente;
