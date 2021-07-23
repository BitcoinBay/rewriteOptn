import styled, { css } from "styled-components";

import { Text } from "react-native";

import { BASE_SIZE, textBase } from "../T";

const H1 = styled(Text)`
  ${textBase};
  font-size: ${BASE_SIZE * 2}px;
  ${(props) =>
    props.spacing === "loose" &&
    css`
      letter-spacing: 1.4px;
    `}
`;

export default H1;
