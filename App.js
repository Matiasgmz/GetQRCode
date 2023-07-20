import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ScanQRCode from "./components/ScanQRCode";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Maps from "./components/Maps";
import Profile from "./components/Profile";
import Badge from "./components/Badge";
import FormBadge from "./components/FormBadge";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="black"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "white", height: 80 }}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Scan"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barcode-outline" color={color} size={25} />
            ),
            tabBarLabel: "",
          }}
          component={ScanQRCode}
        />

        <Tab.Screen
          name="Maps"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map-outline" color={color} size={25} />
            ),
            tabBarLabel: "",
          }}
          component={Maps}
        />

        <Tab.Screen
          name="Badge"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trophy-outline" color={color} size={25} />
            ),
            tabBarLabel: "",
          }}
          component={Badge}
        />

        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={25} />
            ),
            tabBarLabel: "",
          }}
          component={Profile}
        />
        <Tab.Screen
          name="AddBadge"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" color={color} size={25} />
            ),
            tabBarLabel: "",
          }}
          component={FormBadge}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
