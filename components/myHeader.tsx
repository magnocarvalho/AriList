import * as React from "react";
import { Appbar } from "react-native-paper";
import { navigateBack } from "../router/Navigation";

const MyHeader = ({ goBack = null, titulo = null }) => {
  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={navigateBack} />
      <Appbar.Content title={titulo || "ARI List"} />
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};
export default MyHeader;
