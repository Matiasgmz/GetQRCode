import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Image } from "react-native";
import { axiosInstance } from "../api/axiosInstance";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const AddBadgeScreen = ({ navigation }) => {
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

    axiosInstance({
      method: "POST",
      url: "/badges",
      data: formData,
    })
      .then(() => {
        showConfirmationMessage(
          Alert.alert("Parfait", "Badge ajouté avec succés", [
            {
              text: "Super !",
            },
          ])
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
          Alert.alert(
            "Oops !",
            "Erreur lors de l'ajout du badge. Veuillez réessayer.",
            [
              {
                text: "J'ai compris",
              },
            ]
          )
        );
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1, marginHorizontal: 10 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={[styles.container, { marginTop: 100 }]}>
          <Text style={styles.title}>Ajouter un badge</Text>
          <CustomInput placeholder="Nom" value={name} onChangeText={setName} />

          <CustomInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={{ marginVertical: 12 }}
          />

          <CustomInput
            placeholder="URL"
            value={url}
            onChangeText={setUrl}
            style={{ marginBottom: url ? 0 : 12 }}
          />

          {url ? <Image style={styles.urlImage} source={{ uri: url }} /> : ""}

          <View style={styles.row}>
            <View style={{ alignItems: "flex-start" }}>
              <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
                Visible :
              </Text>
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
          </View>

          <View style={styles.row}>
            <View style={{ alignItems: "flex-start" }}>
              <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
                Rang :
              </Text>
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
          </View>

          <CustomInput
            placeholder="Latitude"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numbers-and-punctuation"
          />

          <CustomInput
            placeholder="Longitude"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numbers-and-punctuation"
            style={{ marginTop: 12 }}
          />

          {confirmationMessage ? (
            <Text style={styles.confirmationMessage}>
              {confirmationMessage}
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <CustomButton
        color="gray"
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", bottom: 96, width: "100%" }}
      >
        Annuler
      </CustomButton>

      <CustomButton
        color="green"
        onPress={handleAddBadge}
        style={{ position: "absolute", bottom: 32, width: "100%" }}
      >
        Ajouter
      </CustomButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    alignItems: "center",
    marginBottom: 10,
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
  title: {
    flex: 1,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 30,
  },
});

export default AddBadgeScreen;
