import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "../pages/splash";
import Inicio from "../pages/inicio";
import Servicos from "../pages/servicos";
import ListaDocs from "../pages/listaDocs";
import MapaEndereco from "../pages/mapaendereco";
import DocsComponente from "../common/docs";
import Login from "../pages/login";
import EmailPage from "../pages/email";

export function useRouter() {
  const Routes = createAppContainer(
    createSwitchNavigator(
      {
        SplashScreen,
        Servicos,
        Inicio,
        ListaDocs,
        MapaEndereco,
        DocsComponente,
        Login,
        EmailPage
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
