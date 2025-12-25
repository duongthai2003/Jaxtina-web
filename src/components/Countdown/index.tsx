import React from "react";
import { Progress } from "antd";
import styled from "styled-components";
import { BaseTag } from "@/utils/baseTagHTML";

interface CountdownProps {
  time: number;
  size?: number;
  stroke?: number;
}

const CountdownCircle = React.memo(
  ({ time, size = 45, stroke = 6 }: CountdownProps) => {
    const percent = (time / 60) * 100;
    return (
      <BaseTag.div style={{ width: size, height: size }}>
        <ProgressAnt
          type="circle"
          percent={percent}
          format={() => time}
          size={size}
          strokeWidth={stroke}
        />
      </BaseTag.div>
    );
  }
);

export default CountdownCircle;
const ProgressAnt = styled(Progress)`
  && .ant-progress-text {
    font-size: 18px !important;
    font-weight: bold;
  }
`;
