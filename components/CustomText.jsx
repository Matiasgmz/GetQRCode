import { View, Text, StyleSheet } from "react-native";

const CustomText = ({
  fontSize = 14,
  fontWeight = 400,
  color = "black",
  textAlign = "left",
  children,
  style,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
      textAlign: textAlign,
    },
  });

  return (
    <View style={style}>
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        textAlign={textAlign}
        style={styles.text}
      >
        {children}
      </Text>
    </View>
  );
};

export default CustomText;
