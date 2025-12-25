import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoadingPage: React.FC = () => {
  return (
    <SDiv>
      <Spin size="large" className="loading-spinner" />
    </SDiv>
  );
};
const SDiv = styled.div`
  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default LoadingPage;
