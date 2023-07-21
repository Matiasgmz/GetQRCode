import { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../api/axiosInstance";
import UnknownUser from "../assets/unknown-user.jpeg";
import CustomInput from "../components/CustomInput";

export default function Profile({ navigation }) {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <ScrollView>
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
              source={user?.picture ? { uri: user.picture } : UnknownUser}
            />

            <Text
              style={{
                ...styles.text,
                marginTop: 16,
                marginBottom: 4,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {user?.username}
            </Text>

            <Text
              style={{
                ...styles.text,
                color: "gray",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {user?.email}
            </Text>

            <View style={{ flex: 1, width: "auto", marginTop: 25, padding: 5 }}>
              <Pressable
                style={{
                  ...styles.btn,
                  backgroundColor: isSettingsOpen ? "gray" : "#3e2465",
                  marginBottom: 8,
                }}
                onPress={() =>
                  setIsSettingsOpen((isSettingsOpen) => !isSettingsOpen)
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {isSettingsOpen ? "Fermer" : "Modifier mon profil"}
                </Text>
              </Pressable>

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

                  <Pressable
                    style={{
                      ...styles.btn,
                      backgroundColor: "#3e2465",
                      marginBottom: 16,
                    }}
                    onPress={updateUser}
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

                  <View style={styles.divider} />
                </>
              )}

              {user?.roles.includes("ADMIN") && (
                <Pressable
                  style={{
                    ...styles.btn,
                    backgroundColor: "black",
                    marginBottom: 8,
                  }}
                  onPress={async () => {}}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    Dashboard
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={{ ...styles.btn, backgroundColor: "red" }}
                onPress={async () => {
                  await AsyncStorage.removeItem("userId");
                  await AsyncStorage.removeItem("qrcode-token");
                  navigation.navigate("Login");
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Se déconnecter
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 100,
    width: 180,
    height: 180,
    alignSelf: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    textAlign: "center",
  },
  textInput: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: "gray",
    marginBottom: 24,
  },
});
