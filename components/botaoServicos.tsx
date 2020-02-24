import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton
} from "react-native-paper";
import { navigate } from "../router/Navigation";

const BotaoServicos = ({
  nome,
  subtitle,
  icon = "office-building",
  servico
}) => {
  const [ctrOpen, setCtrOpen] = useState(false);
  const goServico = () => {
    return servico ? servico() : alert("Use Alteração de estado civil");
  };
  return (
    <Card style={{ margin: 5, elevation: 5 }}>
      <Card.Title
        title={nome}
        subtitle={subtitle}
        left={props => <Avatar.Icon {...props} icon={icon} />}
        right={props => (
          <IconButton
            {...props}
            icon={ctrOpen ? "chevron-up" : "chevron-down"}
            onPress={() => setCtrOpen(!ctrOpen)}
          />
        )}
      />
      {ctrOpen && (
        <>
          <Card.Content>
            <Text style={{ textAlign: "justify" }}>
              Infos {subtitle} Lorem Ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum {subtitle} has been the
              industry's standard dummy text ever since the 1500s {subtitle}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              style={{ flex: 1 }}
              mode="contained"
              onPress={() => goServico()}
            >
              Listagem de Documentos
            </Button>
          </Card.Actions>
        </>
      )}
    </Card>
  );
};
export default BotaoServicos;
{
  /* <View
      style={{
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 15,
        marginTop: 15,
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#009bdb"
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            color: "#fff",
            textAlign: "justify"
          }}
        >
          {nome}
        </Text>
        <IconButton icon="camera"></IconButton>
      </View>
    </View> */
}
