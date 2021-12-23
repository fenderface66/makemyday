import React, {ReactNode} from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CenteredContainer = ({children}: {children: ReactNode}) => (
  <Container>
    {children}
  </Container>
);

export default CenteredContainer;
