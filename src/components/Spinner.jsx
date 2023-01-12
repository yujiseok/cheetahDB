import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return <LoadingSpinner />;
};
export default Spinner;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  width: 56px;
  height: 56px;
  border: 8px solid rgba(253, 208, 7, 0.4);
  border-top: 8px solid rgb(253, 208, 7);

  border-radius: 50%;
  animation: ${spin} 1.2s linear infinite;
`;
