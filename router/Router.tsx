import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "../pages/splash";
import Inicio from "../pages/inicio";
import Servicos from "../pages/servicos";

export function useRouter() {
  const Routes = createAppContainer(
    createSwitchNavigator(
      {
        SplashScreen,
        Servicos,
        Inicio
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
