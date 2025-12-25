import { Gift } from "lucide-react";
import styled from "styled-components";
import { Skeleton } from "antd";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { BaseTag } from "@/utils/baseTagHTML";

const CourseInfo = () => {
  return (
    <Wrapper>
      {new Array(5).fill(1).map((_, index) => {
        return (
          <InfoItem key={index}>
            <InfoItemHead>
              <Gift size={20} />
              <InfoItemHeadTitle>Thời gian sử dụng</InfoItemHeadTitle>
            </InfoItemHead>
            <BaseTag.p>
              App sẽ được sử dụng kể từ ngày bắt đầu chương trình học. Sau khi
              kết thúc giai đoạn học này, Jaxtina tặng bạn thêm 3 tháng sử dụng
              app.
            </BaseTag.p>
          </InfoItem>
        );
      })}
    </Wrapper>
  );
};
export default CourseInfo;
const CourseInfoSkeleton = () => {
  return (
    <Wrapper>
      {new Array(3).fill(1).map((_, index) => {
        return (
          <InfoItem key={index}>
            <InfoItemHead>
              <Skeleton.Avatar active shape="square" size={"small"} />
              <BaseTag.skeletonLine active />
            </InfoItemHead>
            <BaseTag.skeletonList active paragraph={{ rows: 3 }} />
          </InfoItem>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(30)};
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(12)};
`;
const InfoItemHead = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(12)};
`;
const InfoItemHeadTitle = styled.div`
  font-size: ${convertPixelToRem(14)};

  font-weight: 600;
`;
