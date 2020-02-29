import * as React from "react";
import { Appbar, IconButton } from "react-native-paper";
import { navigateBack } from "../router/Navigation";
import { StatusBar } from "react-native";
import App from "~/App";

const MyHeader = ({ goBack, titulo = null, icon = null, iconEvent = null }) => {
  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => {
    return iconEvent ? iconEvent() : console.log("Shown more");
  };

  return (
    <>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title={titulo || "ARI List"} />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        {icon && iconEvent && (
          <IconButton color="#fff" icon={icon} onPress={_handleMore} />
        )}
      </Appbar.Header>
    </>
  );
};
export default MyHeader;
