import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "../pages/splash";

export function useRouter() {
  const Routes = createAppContainer(
    createSwitchNavigator(
      {
        SplashScreen
      },
      {
        initialRouteName: "SplashScreen"
      }
    )
  );

  return Routes;
};


export function Routes({ refe }) {
    const Router = useRouter()
    return <Router ref={refe} />
  }
  
