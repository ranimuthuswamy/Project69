import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as Permission from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scannedData: "",
      scanned: false,
      buttonState: "normal",
    };
  }

  handleBarCodeScanner = ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
    });
  };

  getCameraAccess = async () => {
    const { status } = await Permission.askAsync(Permission.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: "clicked",
      scanned: false,
    });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>
            {hasCameraPermissions === true
              ? this.state.scannedData
              : "Request Camera Access"}
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraAccess}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  scanButton: {
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 2,
    width: 200,
    height: 50,
    alignContent: "center",
    borderRadius: 25,
    backgroundColor: "#cf0367",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },
  displayText: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    textDecorationLine: "underline",
  },
});
