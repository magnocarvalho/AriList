import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "../pages/splash";
import Inicio from "../pages/inicio";
import Servicos from "../pages/servicos";
import ListaDocs from "../pages/listaDocs";
import MapaEndereco from "../pages/mapaendereco";


export function useRouter() {
  const Routes = createAppContainer(
    createSwitchNavigator(
      {
        SplashScreen,
        Servicos,
        Inicio,
        ListaDocs,
        MapaEndereco
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
