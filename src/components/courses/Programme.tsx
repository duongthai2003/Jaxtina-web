import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
// import { Skeleton } from "antd";
import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
// import { BaseTag } from "@/utils/baseTagHTML";
import { device } from "@/utils/deviceBreakpoint";
import { images } from "@/assets";
import { PATHS } from "@/routers/path";

const Programme = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <CourseBanner>
        <CourseBannerImg src={images.courseDetailThum} alt="" />
      </CourseBanner>

      <LessonList>
        {new Array(10).fill(1).map((_, index) => {
          return (
            <LessonItem
              key={index}
              onClick={() => {
                navigate(PATHS.private.user.lesson("courseId", "lessonId"));
              }}
            >
              <LessonItemName>Lesson 1: About you</LessonItemName>
              <ChevronRight size={20} />
            </LessonItem>
          );
        })}
      </LessonList>
    </Wrapper>
  );
};
export default Programme;
// const ProgrammeSkeleton = () => {
//   return (
//     <Wrapper>
//       <CourseBanner>
//         <BaseTag.skeletonNode
//           active
//           style={{ borderRadius: convertPixelToRem(16) }}
//         />
//       </CourseBanner>

//       <LessonList>
//         {new Array(5).fill(1).map((_, index) => {
//           return (
//             <LessonItem key={index}>
//               <LessonItemSkeletonLine active />
//               <Skeleton.Avatar active shape="square" size={"small"} />
//             </LessonItem>
//           );
//         })}
//       </LessonList>
//     </Wrapper>
//   );
// };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(16)};
`;
const CourseBanner = styled.div``;
const CourseBannerImg = styled.img`
  width: 100%;
  height: ${convertPixelToRem(160)};
  /* object-fit: contain; */
`;
const LessonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(12)};
`;
const LessonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${convertPixelToRem(16)};
  gap: ${convertPixelToRem(16)};
  border-radius: ${convertPixelToRem(16)};
  border: ${convertPixelToRem(1)} solid ${(props) => props.theme.$border_signup};
  cursor: pointer;
  /* background: url(${images.lessonSpecial}) no-repeat center;
  background-size: cover; */
  &:hover {
    background-color: ${(props) => props.theme.auth.$menu_hover};
  }
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    border-radius: ${convertPixelToRem(8)};
    padding: ${convertPixelToRem(12)} ${convertPixelToRem(14)};
  }
`;
const LessonItemName = styled.p`
  color: ${(props) => props.theme.$tw_black};
  font-size: ${convertPixelToRem(16)};
  font-weight: bold;
  flex: 1;
`;
// const LessonItemSkeletonLine = styled(BaseTag.skeletonLine)`
//   &&.ant-skeleton,
//   && .ant-skeleton-image {
//     width: 80%;
//     @media (max-width: ${convertPixelToRem(device.tablet)}) {
//       width: 100%;
//     }
//   }
// `;
