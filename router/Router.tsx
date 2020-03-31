import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "@react-navigation/stack";
import { createStackNavigator } from "react-navigation-stack";
import SplashScreen from "../pages/splash";
import Inicio from "../pages/inicio";
import Servicos from "../pages/servicos";
import ListaDocs from "../pages/listaDocs";
import MapaEndereco from "../pages/mapaendereco";
import DocsComponente from "../common/docs";
import Login from "../pages/login";
import EmailPage from "../pages/email";
import SenhasPage from "../pages/senhas";
import PassWordPage from "../pages/password";
import CelularPage from "../pages/celular";
export function useRouter() {
  const appLoad = createStackNavigator(
    {
      SplashScreen: { screen: SplashScreen },
      Servicos: { screen: Servicos },
      Inicio: { screen: Inicio },
      ListaDocs: { screen: ListaDocs },
      MapaEndereco: { screen: MapaEndereco },
      DocsComponente: { screen: DocsComponente },
      Login: { screen: Login },
      EmailPage: { screen: EmailPage },
      SenhasPage: { screen: SenhasPage },
      PassWordPage: { screen: PassWordPage },
      CelularPage: { screen: CelularPage }
    },
    {
      initialRouteName: "SplashScreen",
      headerMode: "none"
    }
  );
  const Routes = createAppContainer(appLoad);

  return Routes;
}

export function Routes({ refe }) {
  const Router = useRouter();
  return <Router ref={refe} />;
}
