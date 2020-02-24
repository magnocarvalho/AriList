import * as React from "react";
import { Appbar, IconButton } from "react-native-paper";
import { navigateBack } from "../router/Navigation";
import { StatusBar } from "react-native";

const MyHeader = ({
  goBack,
  titulo = null,
  icon = "dots-vertical",
  iconEvent
}) => {
  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => {
    return iconEvent ? iconEvent() : console.log("Shown more");
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title={titulo || "ARI List"} />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        <IconButton color="#fff" icon={icon} onPress={_handleMore} />
      </Appbar.Header>
    </>
  );
};
export default MyHeader;
