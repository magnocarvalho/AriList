import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import MyHeader from "../components/myHeader";
import BotaoServicos from "../components/botaoServicos";
import { navigate } from "../router/Navigation";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "../router/androidBackButton";
import { Card, Title, Paragraph } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

const Servicos = ({ navigation }) => {
  const tipos = navigation.getParam("tipo");
  const [tipo, settipo] = useState(null);

  useEffect(() => {
    handleAndroidBackButton(() => navigate("Inicio"));
    return removeAndroidBackButtonHandler;
  }, []);

  useEffect(() => {
    SecureStore.getItemAsync("zona").then(t => {
      if (!tipos) {
        settipo(t);
      } else {
        settipo(tipos);
      }
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="default"></StatusBar>
      <MyHeader goBack={() => navigate("Inicio")} iconEvent="info"></MyHeader>
      <ScrollView>
        <View>
          {tipo == "primeiro" && (
            <Card>
              <Card.Cover source={require("../assets/cat1.png")}></Card.Cover>
              <Card.Content>
                <Title>1º Ofício de Imóveis</Title>
                <Paragraph>
                  Endereço: Residence Service - Av. Sete de Setembro, 2140 - 21
                  - Nossa Sra. das Graças, Porto Velho - RO, 76804-124
                </Paragraph>
                <Paragraph>Horário: seg a sexta 08:00 até 15:00</Paragraph>
                <Paragraph>Telefone: (69) 3015-1255</Paragraph>
              </Card.Content>
            </Card>
          )}
          {tipo == "segundo" && (
            <Card>
              <Card.Cover source={require("../assets/cat2.png")}></Card.Cover>
              <Card.Content>
                <Title>2º Ofício de Imóveis</Title>
                <Paragraph>
                  Endereço: Av. Carlos Gomes, 2581 - São Cristóvão, Porto Velho
                  - RO, 76804-021
                </Paragraph>
                <Paragraph>Horário: seg a sexta 08:00 até 15:00</Paragraph>
                <Paragraph>Telefone: (69) 3302-0602</Paragraph>
              </Card.Content>
            </Card>
          )}

          {tipo == "terceiro" && (
            <Card>
              <Card.Cover source={require("../assets/cat3.png")}></Card.Cover>
              <Card.Content>
                <Title>3° Ofício de Registro de Imóveis</Title>
                <Paragraph>
                  Endereço: R. Afonso Pena, 200-258 - Centro, Porto Velho - RO,
                  76801-100
                </Paragraph>
                <Paragraph>Horário: seg a sexta 08:00 até 15:00</Paragraph>
                <Paragraph>Telefone: (69) 3224-2864</Paragraph>
              </Card.Content>
            </Card>
          )}
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
            servico={() => navigate("DocsComponente")}
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
