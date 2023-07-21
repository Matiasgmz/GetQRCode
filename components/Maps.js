import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import axios from "axios";

export default function Maps() {
  const [badges, setBadges] = useState([]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get("http://10.74.0.59:3000/users");
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []); // Empty dependency array ensures the effect runs only once after initial render.

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
        >
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
}
