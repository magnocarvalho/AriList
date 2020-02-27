import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, CheckBox } from "react-native";
import { Card, Text, IconButton, Avatar } from "react-native-paper";

const Certidao = ({ goServico, doc }) => {
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
          title="Certidão"
          subtitle="Certidão de casamento em via original"
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
              Em caso de alteração de estado civil para viúvo, foi apresentada
              certidão de óbito em via original.
            </Text>
            <Text>
              Quando houver partilha, existe a necessidade de apresentação de
              copia dos autos de separação/divórcio; caso contrário, relatar no
              requerimento que quer tão somente alteração de estado civil.
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
                <CheckBox value={doc} onValueChange={() => {}}></CheckBox>
                <Text style={{ flex: 1, marginLeft: 5 }} ellipsizeMode="tail">
                  Confirmar o Certidão de Casamento.
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Actions>
        </>
      )}
    </Card>
  );
};
export default Certidao;
