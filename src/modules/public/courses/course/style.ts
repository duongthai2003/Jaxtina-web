import { images } from "@/assets";
import Button from "@/components/Login/Button";
import { themes } from "@/configs/theme";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { Pagination, Skeleton } from "antd";
import styled from "styled-components";

const CourseWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
`;
const CourseListBanner = styled.div`
  min-height: ${convertPixelToRem(130)};
  border-radius: ${convertPixelToRem(16)};
  display: flex;
  flex-direction: column;
  padding: ${convertPixelToRem(32)};
  gap: ${convertPixelToRem(4)};
  background: url(${images.bgheadCourselist}) no-repeat;
  background-size: cover;
  margin-bottom: ${convertPixelToRem(32)};
`;

const CourseListBannerContent = styled.div`
  color: ${themes.$bg_white};
  font-size: ${convertPixelToRem(14)};
`;
const CourseListBannerTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 400;
  gap: ${convertPixelToRem(12)};
`;
const CourseListBannerTitleHead = styled.p`
  font-size: ${convertPixelToRem(24)};
  font-weight: 700;
`;
const CourseListBannerTitleImg = styled.img`
  width: ${convertPixelToRem(24)};
  height: ${convertPixelToRem(24)};
`;
const CourseItem = styled.div`
  background: ${(props) => props.theme.$tw_white};
  border-radius: ${convertPixelToRem(16)};
  overflow: hidden;
  border: ${convertPixelToRem(2)} solid ${themes.$border_signup};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    box-shadow: 0 ${convertPixelToRem(4)} ${convertPixelToRem(8)}
      rgba(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: ${convertPixelToRem(180)};
  object-fit: cover;
`;

const CourseInfo = styled.div`
  padding: ${convertPixelToRem(12)};
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(10)};
  flex: 1;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: ${convertPixelToRem(14)};
  font-weight: 700;
`;

const Coursedes = styled.div`
  font-size: ${convertPixelToRem(12)};
  font-weight: 500;
  color: ${themes.auth.$title};
  & span {
    font-weight: 700;
  }
`;

const ActionButton = styled(Button)`
  width: 100%;
  min-height: ${convertPixelToRem(32)};
`;
const PaginationAnt = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${convertPixelToRem(40)};
  && .ant-pagination-item-link {
    color: ${(props) => props.theme.$tw_black};
    &:hover {
      background-color: ${(props) => props.theme.auth.$menu_hover};
    }
  }
`;

const SkeletonButton = styled(Skeleton.Button)`
  width: 100%;
  display: block;

  && .ant-skeleton-button {
    width: 100%;
    border-radius: ${convertPixelToRem(100)};
  }
`;

const SkeletonList = styled(Skeleton)`
  && .ant-skeleton-content .ant-skeleton-paragraph {
    margin-top: ${convertPixelToRem(8)};
    & li {
      margin-top: ${convertPixelToRem(8)};
    }
  }
`;
const SkeletonThum = styled(Skeleton.Node)`
  && .ant-skeleton-image {
    width: 100%;
    min-height: ${convertPixelToRem(180)};
    .anticon-dot-chart {
      display: none;
    }
  }
`;
const CourseName = styled.div`
  display: flex;
  justify-content: center;
  gap: ${convertPixelToRem(6)};
`;
export const CL = {
  CourseWrapper,
  CourseListBanner,
  CourseListBannerTitle,
  CourseItem,
  Thumbnail,
  CourseInfo,
  Title,
  Coursedes,
  ActionButton,
  CourseListBannerContent,
  CourseListBannerTitleHead,
  CourseListBannerTitleImg,
  PaginationAnt,
  SkeletonButton,
  SkeletonList,
  SkeletonThum,
  CourseName,
};
