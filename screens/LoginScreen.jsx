import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { axiosInstance } from "../api/axiosInstace";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      const auth = { isAuthenticated: true, user: data.user };

      await AsyncStorage.setItem("qrcode-token", data.token);
      await AsyncStorage.setItem("auth", JSON.stringify(auth));

      navigation.navigate("Main");
      setForm({ email: "", password: "" });
    } catch (err) {
      Alert.alert("Erreur", "Blablabla");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={{ ...styles.input, marginTop: 40 }}
        placeholder="Adresse mail"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
      />

      <TextInput
        style={{ ...styles.input, marginTop: 16, marginBottom: 24 }}
        secureTextEntry
        placeholder="Mot de passe"
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>

      <Pressable
        style={styles.registerButton}
        onPress={() => navigation.navigate("Registration")}
      >
        <Text style={styles.registerButtonText}>
          Vous n'êtes pas inscrit ? Cliquez-ici !
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
  registerButton: {
    marginTop: 24,
    padding: 8,
  },
  registerButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default LoginScreen;
