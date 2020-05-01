import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const rotate = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(720deg);
}
`;

export const Logo = styled.img`
  animation: ${rotate} 100s infinite;
`;
