import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { axiosInstance } from "../api/axiosInstance";

import CustomText from "../components/CustomText";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const RegistrationScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (index, value) => {
    setForm({ ...form, [index]: value });
  };

  const handleRegistration = async () => {
    if (
      form.email === "" ||
      form.username === "" ||
      form.password === "" ||
      form.confirmPassword === "" ||
      form.password !== form.confirmPassword
    )
      return;

    try {
      await axiosInstance({
        method: "POST",
        url: "/auth/signup",
        data: form,
      });

      Alert.alert(
        "Inscription finalisée",
        "Félicitations, votre compte a été correctement créé !",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Login"),
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <CustomInput
        style={{ marginTop: 40 }}
        placeholder="Pseudo"
        value={form.username}
        onChangeText={(value) => handleChange("username", value)}
      />

      <CustomInput
        style={{ marginVertical: 16 }}
        placeholder="Adresse mail"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
      />

      <CustomInput
        hiddenText
        placeholder="Mot de passe"
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      <CustomInput
        style={{ marginTop: 16, marginBottom: 24 }}
        hiddenText
        placeholder="Confirmez le mot de passe"
        value={form.confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
      />

      <CustomButton onPress={handleRegistration}>S'inscrire</CustomButton>

      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <CustomText fontSize={16} fontWeight={500} textAlign="center">
          Vous êtes déjà inscrit ? Cliquez-ici !
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
  title: {
    fontSize: 40,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 8,
    padding: 16,
  },
});

export default RegistrationScreen;
