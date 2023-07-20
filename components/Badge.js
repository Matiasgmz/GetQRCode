import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Badge() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.badge}>
            <Image
              style={styles.imageBadge}
              source={{
                uri: "https://kylesethgray.com/content/images/2018/08/thanksgiving_day_challenge_5k.png",
              }}
            />
            <Text style={styles.textBadge}>Turkey Trot 2016</Text>
          </View>

          <View style={styles.badge}>
            <Image
              style={styles.imageBadge}
              source={{
                uri: "https://kylesethgray.com/content/images/2018/08/National_Park_2017_01.png",
              }}
            />
            <Text style={styles.textBadge}>National Parks</Text>
          </View>
          <View style={styles.badge}>
            <Image
              style={styles.imageBadge}
              source={{
                uri: "https://kylesethgray.com/content/images/2018/08/20170403_MothersDay_Sticker.png",
              }}
            />
            <Text style={styles.textBadge}>Earth Day 2017</Text>
          </View>

          <View style={styles.badge}>
            <Image
              style={styles.imageBadge}
              source={{
                uri: "https://kylesethgray.com/content/images/2018/08/earth_day_2017_01.png",
              }}
            />
            <Text style={styles.textBadge}>Mothers Day 2017</Text>
          </View>

          <View style={styles.badge}>
            <Image
              style={styles.imageBadge}
              source={{
                uri: "https://kylesethgray.com/content/images/2018/08/new_year_2017.png",
              }}
            />
            <Text style={styles.textBadge}>National Parks</Text>
          </View>

          <View style={styles.badge}>
            <Image
              style={styles.imageBadge}
              source={{
                uri: "https://kylesethgray.com/content/images/2018/08/VeteransDay_Sticker.png",
              }}
            />
            <Text style={styles.textBadge}>Veterans Day</Text>
          </View>

          <View style={styles.badge}>
            <Image
              style={styles.imageBadge}
              source={{
                uri: "https://kylesethgray.com/content/images/2021/01/heart_month_2018_01.png",
              }}
            />
            <Text style={styles.textBadge}>Heart Month 2018</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  imageBadge: {
    width: 150,
    height: 150,
  },
  badge: {
    marginTop: 10,
    padding: 50,
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  textBadge: {
    textAlign: "center",
  },
});
