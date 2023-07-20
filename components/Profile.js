import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [imageUri, setImageUri] = useState("https://thispersondoesnotexist.com/");

  const handleLoadImage = () => {
    setImageUri(inputUrl);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
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
            <Image style={styles.profileImage} source={{ uri: imageUri }} />
            <Text style={styles.textName}>Matias Gomez</Text>

            <View style={{ flex: 1, width: "auto", marginTop: 25 }}>
              <Text style={styles.textInput}>URL de l'image</Text>
              <TextInput
                style={styles.input}
                onChangeText={setImageUri}
                value={imageUri}
              />

              <Text style={styles.textInput}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
              />

              <Text style={styles.textInput}>Nom</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNom}
                value={nom}
              />

              <Text style={styles.textInput}>Prénom</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPrenom}
                value={prenom}
              />
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
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  smallProfileImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
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
  textName: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 15,
  },
});
