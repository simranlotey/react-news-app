import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  position: fixed;
  top: 140px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
  
export const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #005abb;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 0.819672131147541s linear infinite;
`;
