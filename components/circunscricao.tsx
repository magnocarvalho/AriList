import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Text
} from "react-native-paper";
import { TouchableOpacity, View, Image, Switch, CheckBox } from "react-native";

const Circunscricao = ({ goServico, doc }) => {
  const [ctrOpen, setCtrOpen] = useState(false);
  return (
    <View>
      <Card
        style={{
          margin: 5,
          elevation: 5,
          borderWidth: 1,
          borderColor: doc ? "green" : "red"
        }}
      >
        <TouchableOpacity onPress={() => setCtrOpen(!ctrOpen)}>
          <Card.Title
            title="2º Circunscrição"
            subtitle="Verificar se o Imóvel é da 2ª Circunscrição"
            right={props => (
              <IconButton
                {...props}
                icon={ctrOpen ? "chevron-up" : "chevron-down"}
              />
            )}
          ></Card.Title>
        </TouchableOpacity>
        {ctrOpen && (
          <>
            <Card.Content>
              <View>
                <Text style={{ textAlign: "justify", marginBottom: 5 }}>
                  Verificar se o endereço do imóvel corresponde às dependências
                  da 2º Circunscrição se sim selecione como preenchido, Lei 21XXXX.XXXX.
                </Text>
              </View>
            </Card.Content>
            <Card.Cover
              style={{ marginRight: 1 }}
              resizeMode="cover"
              source={require("../assets/map1.png")}
            ></Card.Cover>
            <Card.Actions>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <TouchableOpacity
                  onPress={() => goServico()}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <CheckBox value={doc} onValueChange={() => {}}></CheckBox>
                  <Text style={{ flex: 1, marginLeft: 5 }} ellipsizeMode="tail">
                    Confirmar o endereço dentro da 2º Circunscrição
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Actions>
          </>
        )}
      </Card>
    </View>
  );
};
export default Circunscricao;
