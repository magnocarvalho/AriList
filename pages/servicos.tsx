import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import MyHeader from "../components/myHeader";
import BotaoServicos from "../components/botaoServicos";

const Servicos = () => {
  useEffect(() => {
    // return () => {
    //   effect;
    // };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <MyHeader></MyHeader>
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
