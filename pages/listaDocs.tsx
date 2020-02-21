import React from "react";
import { View, ScrollView } from "react-native";
import MyHeader from "../components/myHeader";
import { Card } from "react-native-paper";

const ListaDocs = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <MyHeader titulo="Alteração de Estado Civil"></MyHeader>
      <ScrollView>
        <Card>
          <Card.Title title="Documento 1"></Card.Title>
        </Card>
      </ScrollView>
    </View>
  );
};
export default ListaDocs;
