import { useState } from "react";
import { SafeAreaView, Pressable, Alert, StyleSheet } from "react-native";
import { axiosInstance } from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (index, value) => {
    setForm({ ...form, [index]: value });
  };

  const handleLogin = async () => {
    if (form.email === "" || form.password === "") return;

    try {
      const { data } = await axiosInstance({
        method: "POST",
        url: "/auth/signin",
        data: form,
      });

      await AsyncStorage.setItem("qrcode-token", data.token);
      await AsyncStorage.setItem("userId", data.user._id);

      navigation.navigate("Main");
      setForm({ email: "", password: "" });
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

  return (
    <SafeAreaView style={styles.container}>
      <CustomText fontSize={40} textAlign="center">
        Connexion
      </CustomText>

      <CustomInput
        style={{ marginTop: 40 }}
        placeholder="Adresse mail"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
      />

      <CustomInput
        style={{ marginTop: 16, marginBottom: 24 }}
        hiddenText={true}
        placeholder="Mot de passe"
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      <CustomButton onPress={handleLogin}>Se connecter</CustomButton>

      <Pressable
        style={styles.registerButton}
        onPress={() => navigation.navigate("Registration")}
      >
        <CustomText fontSize={16} fontWeight={500} textAlign="center">
          Vous n'êtes pas inscrit ? Cliquez-ici !
        </CustomText>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 10,
  },
  registerButton: {
    marginTop: 8,
    padding: 16,
  },
});

export default LoginScreen;
