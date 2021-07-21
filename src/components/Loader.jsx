import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: 0.8s ${spin} linear infinite;
  border-width: 2px;
  border-style: solid;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border-bottom-color: transparent;
  margin: auto;
`;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ fullHeight }) => fullHeight && css`height: 100vh;`}
`;

export default function Loader({ fullHeight }) {
  return (
    <Container fullHeight={fullHeight}>
      <Spinner />
    </Container>
  )
}
