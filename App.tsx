import React, { useEffect, useState } from "react";
import { StyleSheet, View, YellowBox } from "react-native";
import { setNavigator } from "./router/Navigation";
import { Routes } from "./router/Router";
import { Provider as PaperProvider } from "react-native-paper";

YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]); // TODO: Remove when fixed

export default function App() {
  const [loadFont] = useState(true);

  useEffect(() => {
    // Font.loadAsync({
    //   Roboto: require("native-base/Fonts/Roboto.ttf"),
    //   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    //   ...Ionicons.font
    // }).then(() => {
    //   setLoadFont(true);
    // });
  }, []);

  return (
    loadFont && (
      <PaperProvider>
        <View style={styles.container}>
          <Routes refe={setNavigator} />
        </View>
      </PaperProvider>
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
