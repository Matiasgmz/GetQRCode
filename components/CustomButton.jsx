import { Pressable } from "react-native";
import styled from "styled-components";

import CustomText from "./CustomText";

const TemplateButton = styled(Pressable)`
  ${({ color, borderRadius, variant, width }) => `
    background: ${variant ? "#16161A" : color};
    border-radius: ${borderRadius};
    border: 2px solid ${variant ? color : "transparent"};
    width: ${width};
  `}
  padding: 12px;
`;

const CustomButton = ({
  color = "#242629",
  borderRadius = "8px",
  fontSize,
  fontWeight,
  variant = false,
  onPress,
  children,
  isTextUppercase = false,
  width = "100%",
  style,
}) => {
  return (
    <TemplateButton
      color={color}
      width={width}
      borderRadius={borderRadius}
      variant={variant}
      onPress={onPress}
      style={style}
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
    </TemplateButton>
  );
};

export default CustomButton;
