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

      <TextInput
        style={{ ...styles.input, marginTop: 40 }}
        placeholder="Pseudo"
        value={form.username}
        onChangeText={(value) => handleChange("username", value)}
      />

      <TextInput
        style={{ ...styles.input, marginVertical: 16 }}
        placeholder="Adresse mail"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
      />

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Mot de passe"
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      <TextInput
        style={{ ...styles.input, marginTop: 16, marginBottom: 24 }}
        secureTextEntry
        placeholder="Confirmez le mot de passe"
        value={form.confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
      />

      <Pressable style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginButtonText}>
          Vous êtes déjà inscrit ? Cliquez-ici !
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
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
  button: {
    backgroundColor: "#3e2465",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
    color: "white",
  },
  loginButton: {
    marginTop: 24,
    padding: 8,
  },
  loginButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default RegistrationScreen;
