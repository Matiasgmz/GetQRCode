import React, { useEffect, useState } from "react";
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
import { KeyboardAvoidingView } from "react-native";
import CustomButton from "../components/CustomButton";

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

  const updateBadge = async () => {
    try {
      await axiosInstance({
        method: "PUT",
        url: `/badges/${route.params.data._id}`,
        data: form,
      });

      Alert.alert("Modifications", "Badge modifié !", [
        {
          text: "J'ai compris",
          onPress: () => navigation.goBack(),
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

  const deleteBadge = async () => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/badges/${route.params.data._id}`,
      });

      Alert.alert("Suppression", "Badge supprimé !", [
        {
          text: "J'ai compris",
          onPress: () => navigation.goBack(),
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

  const activateBadge = async () => {
    try {
      await axiosInstance({
        method: "PUT",
        url: `/badges/${route.params.data._id}`,
        data: {
          isDelete: false,
        },
      });

      Alert.alert("Modifications", "Badge activé !", [
        {
          text: "J'ai compris",
          onPress: () => navigation.goBack(),
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
    <SafeAreaView style={{ flex: 1, margin: 10, position: "relative" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
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
                handleChange("coordinates{longitude}", value);
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomButton
        color="gray"
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          bottom: 152,
          width: "100%",
        }}
      >
        Annuler
      </CustomButton>
      <CustomButton
        color="#3e2465"
        onPress={updateBadge}
        style={{
          position: "absolute",
          bottom: 88,
          width: "100%",
        }}
      >
        Valider les changements
      </CustomButton>
      <CustomButton
        color={route.params.data.isDelete ? "green" : "red"}
        onPress={route.params.data.isDelete ? activateBadge : deleteBadge}
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
        }}
      >
        {route.params.data.isDelete ? "Rajouter" : "Supprimer"}
      </CustomButton>
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
});
