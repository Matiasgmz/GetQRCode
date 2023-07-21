import { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { axiosInstance } from "../api/axiosInstance";

const Map = () => {
  const [badges, setBadges] = useState([]);

  const getBadges = async () => {
    try {
      const { data } = await axiosInstance({
        method: "GET",
        url: "/badges",
      });

      setBadges(data);
    } catch (err) {
      console.log(err);

      Alert.alert(
        "Oops !",
        "Une erreur est survenue, veuillez réessayer ultérieurement. Nous nous excusons pour la gêne occasionnée.",
        [
          {
            text: "J'ai compris",
          },
        ]
      );
    }
  };

  useEffect(() => {
    getBadges();
  }, []);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    } else {
      console.log("Permission de localisation refusée");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          zoomEnabled
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            latitudeDelta: 0.0421,
          }}
          minZoomLevel={5}
        >
          <Marker
            title="Ma position"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />

          {badges.map((badge, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: badge.coordinates.latitude,
                longitude: badge.coordinates.longitude,
              }}
              title={badge.name}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default Map;
