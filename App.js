import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { axiosInstance } from "./api/axiosInstace";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Maps from "./components/Maps";
import ScanQRCode from "./components/ScanQRCode";
import Profile from "./components/Profile";
import Badge from "./components/Badge";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

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
        name="Maps"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="map-outline" color={color} size={25} />
          ),
          tabBarLabel: "",
        }}
        component={Maps}
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
        name="Badge"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy-outline" color={color} size={25} />
          ),
          tabBarLabel: "",
        }}
        component={Badge}
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

  const getCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem("qrcode-token");

      if (token === null) {
        const authInfos = { isAuthenticated: false, user: null };
        await AsyncStorage.setItem("auth", JSON.stringify(authInfos));
        return setIsLogged(false);
      }

      const { data } = await axiosInstance({
        method: "GET",
        url: "/auth/current",
      });

      const authInfos = { isAuthenticated: true, user: data.user };
      await AsyncStorage.setItem("auth", JSON.stringify(authInfos));
      setIsLogged(true);
    } catch (err) {
      console.log(err);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={LoggedStack} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
