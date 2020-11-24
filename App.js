import React from "react";
import { StyleSheet, Image, View } from "react-native";
import ScanScreen from "./screens/ScanScreen";
import { Header } from "react-native-elements";
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={"#cf0367"}
          centerComponent={{
            text: "Barcode Scanner",
            style: { color: "#fff", fontSize: 28, fontWeight: "bold" },
          }}
        />
        <Image
          style={styles.imgContainer}
          source={require("./assets/camera.jpg")}
        />

        <ScanScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
  imgContainer: {
    width: 150,
    height: 150,
    marginTop: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
});
