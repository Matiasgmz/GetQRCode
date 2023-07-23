import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { axiosInstance } from "./api/axiosInstance";

import Map from "./screens/MapScreen";
import ScanQRCode from "./components/ScanQRCode";
import Profile from "./screens/ProfileScreen";
import BadgeScreen from "./screens/BadgeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import AddBadgeScreen from "./screens/AddBadgeScreen";
import ModifyBadge from "./screens/ModifyBadge";

import CustomText from "./components/CustomText";

const Stack = createNativeStackNavigator();
const MainStack = createMaterialBottomTabNavigator();

const LoggedStack = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Scan"
      activeColor="black"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "white", height: 80 }}
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen
        name="Map"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="map-outline" color={color} size={25} />
          ),
          tabBarLabel: "",
        }}
        component={Map}
      />

      <MainStack.Screen
        name="Badge"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy-outline" color={color} size={25} />
          ),
          tabBarLabel: "",
        }}
        component={BadgeScreen}
      />

      <MainStack.Screen
        name="Scan"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="barcode-outline" color={color} size={25} />
          ),
          tabBarLabel: "",
        }}
        component={ScanQRCode}
      />

      <MainStack.Screen
        name="AddBadge"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" color={color} size={25} />
          ),
          tabBarLabel: "",
        }}
        component={AddBadgeScreen}
      />

      <MainStack.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" color={color} size={25} />
          ),
          tabBarLabel: "",
        }}
        component={Profile}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem("qrcode-token");

      if (token === null) {
        await AsyncStorage.remove("userId");
        setIsLogged(false);
        return setIsLoading(false);
      }

      const { data } = await axiosInstance({
        method: "GET",
        url: "/auth/current",
      });

      await AsyncStorage.setItem("userId", data.user._id);
      setIsLogged(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLogged(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading)
    return (
      <View style={styles.container}>
        <Ionicons
          name="barcode-outline"
          color="black"
          size={50}
          style={{ marginBottom: 16 }}
        />
        <CustomText fontWeight={500}>Chargement de vos données..</CustomText>
      </View>
    );

  return (
    <NavigationContainer>
      <Stack.Navigator
        barStyle={{ display: "none" }}
        screenOptions={{ headerShown: false }}
      >
        {isLogged ? (
          <>
            <Stack.Screen name="Main" component={LoggedStack} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={LoggedStack} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}

        <>
          <Stack.Screen name="Modifier" component={ModifyBadge} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: 24,
  },
});

export default App;
