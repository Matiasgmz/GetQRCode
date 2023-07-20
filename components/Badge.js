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
          <View style={styles.row}>
            <View style={styles.badge}>
              {/* Badge 1 */}
              <Image
                style={styles.imageBadge}
                source={{
                  uri: "https://kylesethgray.com/content/images/2018/08/thanksgiving_day_challenge_5k.png",
                }}
              />
              <Text style={styles.textBadge}>Turkey Trot 2016</Text>
            </View>

            <View style={styles.badge}>
              {/* Badge 2 */}
              <Image
                style={styles.imageBadge}
                source={{
                  uri: "https://kylesethgray.com/content/images/2018/08/National_Park_2017_01.png",
                }}
              />
              <Text style={styles.textBadge}>National Parks</Text>
            </View>

            <View style={styles.badge}>
              {/* Badge 3 */}
              <Image
                style={styles.imageBadge}
                source={{
                  uri: "https://kylesethgray.com/content/images/2018/08/20170403_MothersDay_Sticker.png",
                }}
              />
              <Text style={styles.textBadge}>Earth Day 2017</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.badge}>
              {/* Badge 4 */}
              <Image
                style={styles.imageBadge}
                source={{
                  uri: "https://kylesethgray.com/content/images/2018/08/earth_day_2017_01.png",
                }}
              />
              <Text style={styles.textBadge}>Mothers Day 2017</Text>
            </View>

            <View style={styles.badge}>
              {/* Badge 5 */}
              <Image
                style={styles.imageBadge}
                source={{
                  uri: "https://kylesethgray.com/content/images/2018/08/new_year_2017.png",
                }}
              />
              <Text style={styles.textBadge}>National Parks</Text>
            </View>

            <View style={styles.badge}>
              {/* Badge 6 */}
              <Image
                style={styles.imageBadge}
                source={{
                  uri: "https://kylesethgray.com/content/images/2018/08/VeteransDay_Sticker.png",
                }}
              />
              <Text style={styles.textBadge}>Veterans Day</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.badge}>
              {/* Badge 7 */}
              <Image
                style={styles.imageBadge}
                source={{
                  uri: "https://kylesethgray.com/content/images/2021/01/heart_month_2018_01.png",
                }}
              />
              <Text style={styles.textBadge}>Heart Month 2018</Text>
            </View>
          </View>
        </View>
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
  },
  imageBadge: {
    width: 50,
    height: 50,
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
});
