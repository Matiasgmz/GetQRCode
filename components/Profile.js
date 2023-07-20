import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";

export default function Profile() {
  const [text, onChangeText] = useState("");
  const [imageUri, setImageUri] = useState(
    "https://thispersondoesnotexist.com/"
  );

  const handleUrlChange = (url) => {
    setImageUri(url);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={{ flex: 1 }}
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

            <View style={{ flex: 1, width: "auto", marginTop: 25, padding: 5 }}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />

              <TextInput
                placeholder="Nom"
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />

              <TextInput
                placeholder="Prénom"
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />

              <TextInput
                placeholder="URL"
                style={styles.input}
                onChangeText={handleUrlChange}
                value={imageUri}
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
