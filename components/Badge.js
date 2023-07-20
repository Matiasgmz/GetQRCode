import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Badge() {
  const [badges, setBadges] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [badgeSelected, setBadgeSelected] = useState(-1);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://10.74.0.59:4000/api/badges");
      console.log(response.data);
      setBadges(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            {badges.map((badge, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setBadgeSelected(index);
                  setModalVisible(true);
                }}
                style={styles.badge}
              >
                <Image
                  style={styles.imageBadge}
                  source={{
                    uri: badge.picture,
                  }}
                />
                <Text style={styles.textBadge}>{badge.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          {badgeSelected !== -1 && (
            <View style={styles.modalView}>
              <View style={styles.containerIcons}>
                <Ionicons
                  style={styles.iconClose}
                  name="close-circle"
                  onPress={() => setModalVisible(false)}
                  color={"black"}
                  size={45}
                />
              </View>

              <View>
                <View style={styles.containerImageModal}>
                  <Image
                    style={styles.imageBadgeModal}
                    source={{ uri: badges[badgeSelected].picture }}
                  />
                </View>

                <Text style={styles.modalTitle}>
                  {badges[badgeSelected].name}
                </Text>

                <Text style={styles.modalRank}>
                  {badges[badgeSelected].rank}
                </Text>

                <Text style={styles.modalDescription}>
                  {badges[badgeSelected].description}
                </Text>
              </View>
            </View>
          )}
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flex: 0.8,
    flexWrap: "wrap",
  },
  imageBadge: {
    width: 90,
    height: 90,
  },
  imageBadgeModal: {
    width: 200,
    height: 200,
  },
  badge: {
    marginTop: 10,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  textBadge: {
    width: 85,
    textAlign: "center",
  },
  modalView: {
    margin: 10,
    marginTop: 70,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerIcons: {
    width: "100%",
    alignItems: "flex-end",
    padding: 0,
  },
  modalTitle: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
  },
  containerImageModal: {
    flexDirection: "column",
    alignSelf: "center",
  },
  modalDescription: {
    marginTop: 25,
    textAlign: "center",
    marginBottom: 25,
  },
  modalRank: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 20,
    fontWeight: "bold",
  },
  iconClose: {
    fontSize: 40,
    color: "red",
  },
});
