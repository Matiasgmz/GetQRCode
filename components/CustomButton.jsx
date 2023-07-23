import { Pressable, View, StyleSheet } from "react-native";

import CustomText from "./CustomText";

const CustomButton = ({
  color = "#3e2465",
  borderRadius = "8px",
  fontSize = 18,
  fontWeight = 500,
  variant = false,
  onPress,
  children,
  isTextUppercase = false,
  width = "100%",
  style,
}) => {
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: variant ? "white" : color,
      borderRadius: borderRadius,
      border: `2px solid ${variant ? color : "transparent"}`,
      width: width,
      padding: 16,
    },
  });

  return (
    <View style={style}>
      <Pressable
        color={color}
        width={width}
        borderRadius={borderRadius}
        variant={variant}
        onPress={onPress}
        style={styles.btn}
      >
        <CustomText
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAlign="center"
          color={variant ? color : "#FFFFFF"}
          style={{ textTransform: isTextUppercase ? "uppercase" : "none" }}
        >
          {children}
        </CustomText>
      </Pressable>
    </View>
  );
};

export default CustomButton;
