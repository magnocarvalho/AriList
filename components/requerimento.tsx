import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, CheckBox } from "react-native";
import { Card, Text, IconButton, Avatar } from "react-native-paper";

const Requerimento = ({ goServico, doc }) => {
  const [ctrOpen, setCtrOpen] = useState(false);
  return (
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
          title="Requerimento"
          subtitle="Requerimento com firma reconhecida"
          right={props => (
            <IconButton
              {...props}
              icon={ctrOpen ? "chevron-up" : "chevron-down"}
              onPress={() => setCtrOpen(!ctrOpen)}
            />
          )}
        />
      </TouchableOpacity>
      {ctrOpen && (
        <>
          <Card.Content>
            <Text>
              Requerimento com firma reconhecida; contendo no mínimo da parte
              interessada, o que objetiva junto ao 2º ofício indicando o número
              da matrícula/transcrição; (Lei dos Registros Públicos, Arts. 13 e
              217);
            </Text>
          </Card.Content>
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
                <CheckBox value={doc} onValueChange={() => { goServico()}}></CheckBox>
                <Text style={{ flex: 1, marginLeft: 5 }} ellipsizeMode="tail">
                  Confirmar o requerimento em mãos
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Actions>
        </>
      )}
    </Card>
  );
};
export default Requerimento;
