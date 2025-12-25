import { Skeleton } from "antd";
import styled from "styled-components";
import { convertPixelToRem } from "./func/convertRem";

const div = styled.div``;
const p = styled.p``;
const img = styled.img``;
const a = styled.a``;
const label = styled.label``;
const span = styled.span``;
const skeletonNode = styled(Skeleton.Node)`
  &&.ant-skeleton,
  && .ant-skeleton-image {
    width: 100%;
  }
`;
const skeletonLine = styled(Skeleton.Node)`
  &&.ant-skeleton,
  && .ant-skeleton-image {
    width: 100%;
    height: ${convertPixelToRem(18)};
    .anticon-dot-chart {
      display: none;
    }
  }
`;
const skeletonList = styled(Skeleton)`
  && .ant-skeleton-content .ant-skeleton-paragraph {
    margin-top: ${convertPixelToRem(8)};
    & li {
      margin-top: ${convertPixelToRem(8)};
    }
  }
`;
export const BaseTag = {
  div,
  p,
  img,
  a,
  label,
  span,
  skeletonNode,
  skeletonLine,
  skeletonList,
};
