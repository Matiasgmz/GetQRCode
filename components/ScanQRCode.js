import { useEffect, useState, useRef } from "react";
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
  const scannerRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });
  const [markerBounds, setMarkerBounds] = useState(null);
  const [link, setLink] = useState(null);

  const onLayoutChange = () => {
    // Récupérer les dimensions du wrapper view contenant le scanner
    const { width, height } = scannerRef.current.getBoundingClientRect();

    // Mettre à jour les limites du scanner avec les dimensions du wrapper view
    scannerRef.current.setBarCodeBounds({ x: 0, y: 0, width, height });
  };

  useEffect(() => {
    if (!permission?.granted) requestPermission();
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (scanned) {
      // Scanner à nouveau après 0,5 seconde
      const interval = setInterval(() => {
        setScanned(false);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [scanned]);

  if (!permission?.granted) requestPermission();

  const handleBarCodeScanned = ({ type, data, bounds }) => {
    if (route.name !== "Scan" || !navigation.isFocused()) return;
    setScanned(true);
    console.log(data);
    setLink(data);

    const { origin, size } = bounds;
    const x = origin.x;
    const y = origin.y;

    setMarkerPosition({ x, y });
    setMarkerBounds(bounds);

    // Alert.alert("Nouveau client", " ", [
    //   {
    //     text: "Refuser",
    //     onPress: () => {
    //       setScanned(false);
    //     },
    //   },
    //   {
    //     text: "Accepter",
    //     onPress: () => {
    //       setScanned(false);
    //     },
    //   },
    // ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1, width: "100%" }}
      />

      {scanned && markerBounds && (
        <View
          style={[
            styles.marker,
            {
              left: markerBounds.origin.x,
              top: markerBounds.origin.y,
              width: markerBounds.size.width,
              height: markerBounds.size.height,
            },
          ]}
        >
          {scanned && markerBounds && (
            <Pressable
              style={styles.linkMessage}
              onPress={() => navigation.navigate("Badge", link)}
            >
              <Text style={styles.linkText}>{link}</Text>
            </Pressable>
          )}
        </View>
      )}
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

  scannerContainer: {
    position: "relative",
    overflow: "hidden",
  },
  marker: {
    position: "absolute",
    borderWidth: 4,
    borderColor: "yellow",
    borderRadius: 10,
    width: 200, // Largeur du marqueur
    height: 100, // Hauteur du marqueur
  },
  linkMessage: {
    position: "relative",
    top: "105%",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
  },
});

export default ScanQRCode;
