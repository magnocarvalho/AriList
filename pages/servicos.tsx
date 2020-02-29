import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import MyHeader from "../components/myHeader";
import BotaoServicos from "../components/botaoServicos";
import { navigate } from "../router/Navigation";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";

const Servicos = () => {
  useEffect(() => {
    // return () => {
    //   effect;
    // };
  }, []);
  useEffect(() => {
    handleAndroidBackButton(() => navigate("Inicio"));
    return removeAndroidBackButtonHandler;
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="default"></StatusBar>
      <MyHeader goBack={() => navigate("Inicio")} iconEvent="info"></MyHeader>
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 25,
              color: "#195283",
              marginHorizontal: 15,
              marginTop: 15
            }}
          >
            Escolha o tipo de serviço que precisa
          </Text>
          <BotaoServicos
            nome="Alteração Estado civil"
            subtitle="Alteração de estado Civil"
            icon="heart-broken"
            servico={() => navigate("ListaDocs")}
          ></BotaoServicos>
          <BotaoServicos
            nome="Escritura RURAL"
            subtitle="Venda e compra de imóvel rural"
            icon="tractor"
          ></BotaoServicos>
          <BotaoServicos
            nome="Escritura URBANA"
            subtitle="Venda e compra de imóvel urbano"
          ></BotaoServicos>
          <BotaoServicos nome="Fusão" subtitle="Fusão"></BotaoServicos>
          <BotaoServicos
            nome="Georreferenciamento"
            subtitle="Georreferenciamento"
          ></BotaoServicos>
        </View>
      </ScrollView>
    </View>
  );
};
export default Servicos;
