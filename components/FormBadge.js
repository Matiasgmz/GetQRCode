import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const FormBadge = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [rang, setRang] = useState("Silver");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleAddBadge = () => {
    // Your logic to handle adding the badge goes here
    // You can use the state values (name, description, url, etc.) to create the badge object
  };

  return (
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

        <View style={styles.row}>
          <Text>Is Delete:</Text>
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
            data={[
              { label: "SILVER" },
              { label: "GOLD" },
              { label: "BRONZE" },
              { label: "PLATINE" },
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
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddBadge}>
          <Text style={styles.addButtonText}>Add Badge</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    borderRadius: 5,
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
});

export default FormBadge;
