import React, { useEffect, useInsertionEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { axiosInstance } from "../api/axiosInstance";

export default function ModifyBadge({ route, navigation }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    picture: "",
    coordinates: {
      longitude: "",
      latitude: "",
    },
  });

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      setForm({
        ...form,
        name: route.params.data.name,
        description: route.params.data.description,
        picture: route.params.data.picture,
        coordinates: {
          longitude: route.params.data.coordinates.longitude,
          latitude: route.params.data.coordinates.latitude,
        },
      });
    });
    return focusHandler;
  }, [navigation]);

  const handleChange = (index, value) => {
    setForm({ ...form, [index]: value });
  };
  console.log(route.params.data._id);

  const updateBadge = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: `/badge/${route.params.data._id}`,
        data: form,
      });

      Alert.alert("Modifications", "Badge modifié !", [
        {
          text: "J'ai compris",
        },
      ]);
    } catch (err) {
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

  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <ScrollView>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.title}>Modifier</Text>

          <CustomInput
            placeholder={"Nom"}
            value={form.name}
            onChangeText={(value) => {
              handleChange("name", value);
            }}
            style={{ marginBottom: 16 }}
          />

          <CustomInput
            placeholder={"Image"}
            value={form.picture}
            onChangeText={(value) => {
              handleChange("picture", value);
            }}
            style={{ marginBottom: 16 }}
          />

          <TextInput
            placeholder={"Description"}
            value={form.description}
            onChangeText={(value) => {
              handleChange("description", value);
            }}
            style={{
              marginBottom: 16,
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderWidth: 2,
              borderRadius: 4,
              width: "100%",
              fontSize: 18,
            }}
            multiline
          />

          <CustomInput
            placeholder={"Longitude"}
            value={form.coordinates.longitude.toString()}
            onChangeText={(value) => {
              handleChange("longitude", value);
            }}
            style={{ marginBottom: 16 }}
            keyboardType="numbers-and-punctuation"
          />

          <CustomInput
            placeholder={"Latitude"}
            value={form.coordinates.latitude.toString()}
            onChangeText={(value) => {
              handleChange("latitude", value);
            }}
            style={{ marginBottom: 16 }}
            keyboardType="numbers-and-punctuation"
          />

          <Pressable
            style={{
              ...styles.btn,
              backgroundColor: "#3e2465",
              marginBottom: 16,
            }}
            onPress={updateBadge}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Valider les changements
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    fontSize: 30,
    margin: 30,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
