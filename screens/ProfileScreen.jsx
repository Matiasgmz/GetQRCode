import { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { axiosInstance } from "../api/axiosInstance";
import UnknownUser from "../assets/unknown-user.jpeg";

import CustomInput from "../components/CustomInput";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";

const ProfileScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    picture: "#",
  });
  const [user, setUser] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleChange = (index, value) => {
    setForm({ ...form, [index]: value });
  };

  const getUser = async () => {
    try {
      const { data } = await axiosInstance({
        method: "GET",
        url: "/auth/current",
      });

      setUser(data.user);
      setForm({
        ...form,
        username: data.user.username,
        email: data.user.email,
        picture: data.user.picture ? data.user.picture : "#",
      });
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

  const updateUser = async () => {
    if (
      form.picture === user.picture &&
      form.email === user.email &&
      form.username === user.username
    )
      return;

    try {
      const { data } = await axiosInstance({
        method: "PUT",
        url: `/users/update/${user._id}`,
        data: {
          ...form,
          picture:
            form.picture === "#" || form.picture === "" ? null : form.picture,
        },
      });

      setUser(data);

      Alert.alert(
        "Modifications",
        "Votre profil a été correctement modifié !",
        [
          {
            text: "J'ai compris",
          },
        ]
      );
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

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getUser();
      setIsSettingsOpen(false);
    });
    return focusHandler;
  }, [navigation]);

  if (!user) return;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignSelf: "center",
            marginTop: 50,
            width: "100%",
          }}
        >
          <Image
            style={styles.profileImage}
            source={user.picture ? { uri: user.picture } : UnknownUser}
          />

          <CustomText
            fontSize={20}
            fontWeight={700}
            textAlign="center"
            style={{
              marginTop: 16,
            }}
          >
            {user.username}
          </CustomText>

          <CustomText
            color="gray"
            fontWeight={500}
            textAlign="center"
            style={{ marginVertical: 4 }}
          >
            {user.email}
          </CustomText>

          <CustomText color="gray" fontWeight={500} textAlign="center">
            {user.badges && user.badges.length > 1
              ? `${user.badges.length} badges`
              : `${user.badges.length} badge`}
          </CustomText>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: 104,
            }}
            style={{ flex: 1, marginTop: 24 }}
          >
            <CustomButton
              color={isSettingsOpen ? "gray" : "#3e2465"}
              onPress={() =>
                setIsSettingsOpen((isSettingsOpen) => !isSettingsOpen)
              }
              style={{ marginBottom: 8 }}
            >
              {isSettingsOpen ? "Fermer" : "Modifier mon profil"}
            </CustomButton>

            {isSettingsOpen && (
              <>
                <CustomInput
                  placeholder="Url"
                  value={form.picture ? form.picture : ""}
                  onChangeText={(value) => handleChange("picture", value)}
                  style={{ marginBottom: 16 }}
                />

                <CustomInput
                  placeholder="Pseudo"
                  value={form.username}
                  onChangeText={(value) => handleChange("username", value)}
                  style={{ marginBottom: 16 }}
                />

                <CustomInput
                  placeholder="Email"
                  value={form.email}
                  onChangeText={(value) => handleChange("email", value)}
                  style={{ marginBottom: 16 }}
                />

                <CustomButton
                  color="#3e2465"
                  style={{ marginBottom: 16 }}
                  onPress={updateUser}
                >
                  Valider les changements
                </CustomButton>

                <View style={styles.divider} />
              </>
            )}

            {user.roles.includes("ADMIN") && (
              <CustomButton
                color="black"
                style={{ marginBottom: 8 }}
                onPress={() => navigation.navigate("Dashboard")}
              >
                Dashboard
              </CustomButton>
            )}

            <CustomButton
              color="red"
              onPress={async () => {
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("qrcode-token");
                navigation.navigate("Login");
              }}
            >
              Se déconnecter
            </CustomButton>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 100,
    width: 180,
    height: 180,
    alignSelf: "center",
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: "gray",
    marginBottom: 24,
  },
});

export default ProfileScreen;
