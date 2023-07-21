import { View, TextInput, StyleSheet } from "react-native";

// const Template = styled(TextInput)`
//   background: #242629;
//   padding: 12px 24px;
//   width: 100%;
//   max-width: 96%;
//   margin: 0 auto;
//   border-radius: 4px;
//   font-size: 20px;
//   color: white;
// `;

const CustomInput = ({ placeholder, onChangeText, value, style }) => {
  return (
    <View style={style}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderRadius: 4,
    width: "100%",
    fontSize: 18,
  },
});

export default CustomInput;
