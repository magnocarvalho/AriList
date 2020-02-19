import { NavigationActions } from "react-navigation";

let navigator;

export function setNavigator(ref) {
  navigator = ref;
}

export function navigate(routeName, params = undefined) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

export function navigateBack() {
  navigator.dispatch(NavigationActions.back());
}

export default {
  navigate,
  setNavigator,
  navigateBack
};
