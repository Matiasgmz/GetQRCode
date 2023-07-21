import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

const FormBadge = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [rang, setRang] = useState("SILVER");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [confirmationMessage, setConfirmationMessage] = useState("");

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setTimeout(() => {
      setConfirmationMessage("");
    }, 3000); // The confirmation message will disappear after 3 seconds
  };

  const handleAddBadge = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI3ZmVjZTdkZjBmNTA0YTQxNWIxM2UiLCJpYXQiOjE2ODk4NDQ4NTV9.0kOd8JlWAEIuPnVxAO6_f4io7SoIcS73wvNZZghpF8s"; // a effacer

    formData = {
      name: name,
      description: description,
      picture: url,
      isDelete: isDelete,
      rank: rang,
      coordinates: {
        latitude: latitude,
        longitude: longitude,
      },
    };

    axios
      .post("http://10.74.0.59:4000/api/badges", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        showConfirmationMessage(
          <View>
            <Ionicons
              name="checkmark-circle-outline"
              color={"green"}
              size={80}
              style={{ textAlign: "center", marginBottom: 25 }}
            />
            <Text>Badge ajouté avec succès !</Text>
          </View>
        );
        setName("");
        setDescription("");
        setUrl("");
        setRang("SILVER");
        setLatitude("");
        setLongitude("");
      })
      .catch((error) => {
        showConfirmationMessage(
          <View>
            <Ionicons
              name="close-circle-outline"
              color={"red"}
              size={80}
              style={{ textAlign: "center", marginBottom: 25 }}
            />
            <Text>Erreur lors de l'ajout du badge. Veuillez réessayer.</Text>
          </View>
        );
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={[styles.container, { marginTop: 100 }]}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="URL"
            value={url}
            onChangeText={setUrl}
          />

          <Image style={styles.urlImage} source={{ uri: url }} />

          <View style={styles.row}>
            <Text>Visible:</Text>
            <SelectDropdown
              data={[{ label: "False" }, { label: "True" }]}
              defaultValueByIndex={isDelete ? 1 : 0}
              onSelect={(selectedItem) =>
                setIsDelete(selectedItem.label === "True")
              }
              buttonTextAfterSelection={(selectedItem) =>
                selectedItem.label ? selectedItem.label : "Is Delete"
              }
              rowTextForSelection={(item) => item.label}
            />
          </View>

          <View style={styles.row}>
            <Text>Rang:</Text>
            <SelectDropdown
              defaultButtonText="Selectionnez"
              data={[
                { label: "SILVER" },
                { label: "GOLD" },
                { label: "BRONZE" },
                { label: "PLATINUM" },
              ]}
              defaultValue={rang}
              onSelect={(selectedItem) => setRang(selectedItem.label)}
              buttonTextAfterSelection={(selectedItem) =>
                selectedItem.label ? selectedItem.label : "Rang"
              }
              rowTextForSelection={(item) => item.label}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numbers-and-punctuation"
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numbers-and-punctuation"
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddBadge()}
          >
            <Text style={styles.addButtonText}>Add Badge</Text>
          </TouchableOpacity>

          {confirmationMessage ? (
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                marginTop: 50,
                position: "absolute",
                // top: 0,
                backgroundColor: "white",
                borderRadius: 12,
                padding: 10,
              }}
            >
              <Text style={styles.confirmationMessage}>
                {confirmationMessage}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  confirmationMessage: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  urlImage: {
    borderRadius: 100,
    width: 150,
    height: 150,
    alignSelf: "center",
    margin: 15,
  },
});

export default FormBadge;
