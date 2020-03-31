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
import { MenuProvider } from "react-native-popup-menu";
import { primeira } from "./services/cores";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";

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

const firebaseConfig = {
  apiKey: "AIzaSyD_ya1LE-M2so3OrcpgaxKmAUY2BqvDgB8",
  authDomain: "arilist.firebaseapp.com",
  databaseURL: "https://arilist.firebaseio.com",
  projectId: "arilist",
  storageBucket: "arilist.appspot.com",
  messagingSenderId: "171590076680",
  appId: "1:171590076680:web:162d6d6b8bdda3696cc4bd",
  measurementId: "G-TWZCQT82WL"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.auth().useDeviceLanguage();

console.disableYellowBox = true;
export default function App() {
  const [loadFont] = useState(true);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: primeira,
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
      <NavigationContainer>
        <MenuProvider>
          <PaperProvider theme={theme}>
            <Portal>
              <View style={styles.container}>
                <Routes refe={setNavigator} />
              </View>
            </Portal>
          </PaperProvider>
        </MenuProvider>
      </NavigationContainer>
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
