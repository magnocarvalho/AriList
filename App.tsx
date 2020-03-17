import React, { useEffect, useState } from "react";
import { StyleSheet, View, YellowBox } from "react-native";
import { setNavigator } from "./router/Navigation";
import { Routes } from "./router/Router";
import {
  Provider as PaperProvider,
  Portal,
  DefaultTheme
} from "react-native-paper";
import { Logs } from "expo";

YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]); // TODO: Remove when fixed

if (__DEV__) {
  console.disableYellowBox = true;
}
if (__DEV__) {
  const isRemoteDebuggingEnabled = typeof atob !== "undefined";
  if (isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  } else {
    Logs.enableExpoCliLogging();
  }
}
console.disableYellowBox = true;
export default function App() {
  const [loadFont] = useState(true);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#009bdb",
      text: "#000000"
    }
  };
  //  <color name="primaryColor">#009bdb</color>
  // <color name="primaryLightColor">#60ccff</color>
  // <color name="primaryDarkColor">#006da9</color>
  // <color name="secondaryColor">#173f7c</color>
  // <color name="secondaryLightColor">#4e69ac</color>
  // <color name="secondaryDarkColor">#001a4f</color>
  // <color name="primaryTextColor">#000000</color>
  // <color name="secondaryTextColor">#ffffff</color>
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
      <PaperProvider theme={theme}>
        <Portal>
          <View style={styles.container}>
            <Routes refe={setNavigator} />
          </View>
        </Portal>
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
