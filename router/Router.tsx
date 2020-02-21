import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "../pages/splash";
import Inicio from "../pages/inicio";
import Servicos from "../pages/servicos";
import ListaDocs from "../pages/listaDocs";

export function useRouter() {
  const Routes = createAppContainer(
    createSwitchNavigator(
      {
        SplashScreen,
        Servicos,
        Inicio,
        ListaDocs
      },
      {
        initialRouteName: "SplashScreen"
      }
    )
  );

  return Routes;
}

export function Routes({ refe }) {
  const Router = useRouter();
  return <Router ref={refe} />;
}
