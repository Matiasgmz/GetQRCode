import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Alert,
  StyleSheet,
} from "react-native";

import { axiosInstance } from "../api/axiosInstance";

import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";

const DashboardBadgesScreen = ({ navigation }) => {
  const [badges, setBadges] = useState([]);

  const getBadges = async () => {
    try {
      const { data } = await axiosInstance({
        method: "GET",
        url: "/badges",
      });

      setBadges(data);
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

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getBadges();
    });
    return focusHandler;
  }, [navigation]);

  return (
    <SafeAreaView
      style={{ flex: 1, marginHorizontal: 10, position: "relative" }}
    >
      <CustomText
        fontSize={24}
        fontWeight={600}
        textAlign="center"
        style={{ marginTop: 24 }}
      >
        Tous les badges
      </CustomText>

      <ScrollView
        contentContainerStyle={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 104,
        }}
      >
        {badges.map((badge, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate("UpdateBadge", { data: badge })}
            style={styles.badge}
          >
            <Image
              style={styles.imageBadge}
              source={{
                uri: badge.picture,
              }}
            />
            <CustomText
              fontWeight={600}
              textAlign="center"
              style={{ maxWidth: 85 }}
            >
              {badge.name}
            </CustomText>
          </Pressable>
        ))}
      </ScrollView>

      <CustomButton
        style={{ position: "absolute", bottom: 32, width: "100%" }}
        onPress={() => navigation.navigate("AddBadge")}
      >
        Créer un badge
      </CustomButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    flex: 0.8,
    flexWrap: "wrap",
  },
  imageBadge: {
    width: 100,
    height: 100,
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
    fontWeight: "bold",
  },
  modalView: {
    margin: 10,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 650,
  },
  containerIcons: {
    width: "100%",
    alignItems: "flex-end",
    padding: 0,
    backgroundColor: "transparent",
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
    paddingLeft: 5,
    paddingRight: 5,
  },
  modalRank: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 25,
    fontWeight: "bold",
  },
  iconClose: {
    fontSize: 40,
    color: "red",
  },
});

export default DashboardBadgesScreen;
