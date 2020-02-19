import React, { useEffect, useState, Children } from "react";
import { StyleSheet, Text, View, YellowBox, StatusBar } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import { setNavigator } from "./router/Navigation";
import { Routes } from "./router/Router";
import { UIProvider, Router, Switch } from "react-native-web-ui-components";
import { createMemoryHistory } from "history";
YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]); // TODO: Remove when fixed

const history = createMemoryHistory();
const theme = {
  input: {
    focused: StyleSheet.create({
      border: {
        borderColor: "yellow"
      }
    })
  }
};
export default function App() {
  const [loadFont, setLoadFont] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    }).then(() => {
      setLoadFont(true);
    });
  }, []);

  return (
    loadFont && (
      <Router history={history}>
        <Switch history={history}>
          <UIProvider theme={theme} amp={false}>
            <StatusBar></StatusBar>
            <View style={styles.container}>
              <Routes refe={setNavigator} />
            </View>
          </UIProvider>
        </Switch>
      </Router>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009bdb",
    alignItems: "stretch",
    justifyContent: "center"
  }
});
