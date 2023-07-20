import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Alert,
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

const ScanQRCode = ({ route, navigation }) => {
  // const navigate = useNavigation();

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission?.granted) requestPermission();

  const handleBarCodeScanned = (data) => {
    if (route.name !== "Scan" || !navigation.isFocused()) return;
    setScanned(true);
    console.log(data);

    Alert.alert("Nouveau client", " ", [
      {
        text: "Refuser",
        onPress: () => {
          setScanned(false);
        },
      },
      {
        text: "Accepter",
        onPress: () => {
          setScanned(false);
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1, width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 80,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ScanQRCode;
