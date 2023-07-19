import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Profile() {
  const [text, onChangeText] = React.useState();
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          source={{ uri: "https://thispersondoesnotexist.com/" }}
        />
        <Text style={styles.textName}>Matias Gomez</Text>

        <View style={{ flex: 1, width: "auto", marginTop: 25 }}>
          <Text style={styles.textInput}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />

          <Text style={styles.textInput}>Nom</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />

          <Text style={styles.textInput}>Prénom</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </View>
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
