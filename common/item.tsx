import React, { useState, useEffect } from "react";
import { View, Text, Linking, Button, TouchableOpacity } from "react-native";
import { Card, Switch, Paragraph } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";

const ItemDocumento = ({ lei = null, link = null, value, id, titulo }) => {
  const [local, setlocal] = useState(false);
  const [result, setResult] = useState(null);
  const _handlePressButtonAsync = async l => {
    let result = await WebBrowser.openBrowserAsync(l);
    setResult(result);
  };
  useEffect(() => {
    SecureStore.getItemAsync(id).then(rrr => {
      let tmp = rrr ? JSON.parse(rrr) : false;
      setlocal(tmp);
    });
  }, []);
  useEffect(() => {
    SecureStore.setItemAsync(id, JSON.stringify(local));
  }, [local]);
  return (
    <Card
      style={{
        elevation: 7
      }}
    >
      <Card.Content>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <View style={{ flex: 0, paddingTop: 15 }}>
            <Switch value={local} onValueChange={setlocal}></Switch>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setlocal(!local)}>
              <Paragraph style={{ textAlign: "justify" }}>{value}</Paragraph>
            </TouchableOpacity>
            {lei && (
              <TouchableOpacity>
                <Paragraph
                  onPress={() => _handlePressButtonAsync(link)}
                  style={{ textDecorationLine: "underline", color: "#0317fc" }}
                >
                  {lei}
                </Paragraph>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* <Button
          title="Click Here To Open Website URL"
          onPress={() => Linking.openURL("https://reactnativecode.com")}
        /> */}
      </Card.Content>
    </Card>
  );
};
export default ItemDocumento;
