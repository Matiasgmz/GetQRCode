import { Text } from "react-native";
import styled from "styled-components";

const TemplateText = styled(Text)`
  ${({ fontSize, fontWeight, color, textAlign }) => `
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    color: ${color};
    text-align: ${textAlign};
  `}
`;

const CustomText = ({
  fontSize = 14,
  fontWeight = 400,
  color = "#FFFFFF",
  textAlign = "left",
  children,
  style,
}) => {
  return (
    <TemplateText
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      textAlign={textAlign}
      style={style}
    >
      {children}
    </TemplateText>
  );
};

export default CustomText;
