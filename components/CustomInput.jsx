import { View, TextInput, StyleSheet } from "react-native";

const CustomInput = ({
  placeholder,
  hiddenText = false,
  onChangeText,
  value,
  style,
}) => {
  return (
    <View style={style}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        secureTextEntry={hiddenText}
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    fontSize: 18,
  },
});

export default CustomInput;
