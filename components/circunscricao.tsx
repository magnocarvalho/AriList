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
import { TouchableOpacity, View } from "react-native";

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
              <Text style={{ textAlign: "justify" }}>
                Verificar se o endereço do imóvel corresponde às dependências da
                2º Circunscrição se sim selecione como preenchido.
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => goServico()}>
                Confere<Text></Text>
              </Button>
            </Card.Actions>
          </>
        )}
      </Card>
    </View>
  );
};
export default Circunscricao;
