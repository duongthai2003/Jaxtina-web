import { Progress } from "antd";
import styled from "styled-components";
import { BaseTag } from "@/utils/baseTagHTML";
import { convertPixelToRem } from "@/utils/func/convertRem";
// import { device } from "@/utils/deviceBreakpoint";

const Statistical = () => {
  return (
    <Wrapper>
      {new Array(10).fill(1).map((_, index) => {
        return (
          <LessonItem key={index}>
            <LessonItemName>Lesson 1: About you</LessonItemName>
            <ProgressBlock>
              <BaseTag.div>
                <Done>
                  Đã làm:
                  <BaseTag.span> 104</BaseTag.span> câu
                </Done>
                <Correct>
                  Đúng:
                  <BaseTag.span> 97</BaseTag.span>/
                  <BaseTag.span>120</BaseTag.span> câu
                </Correct>
              </BaseTag.div>
              <BaseTag.div>
                <ProgressAnt
                  type="circle"
                  percent={40}
                  format={() => "40%"}
                  size={50}
                  strokeWidth={8}
                />
              </BaseTag.div>
            </ProgressBlock>
          </LessonItem>
        );
      })}
    </Wrapper>
  );
};
export default Statistical;
// const StatisticalSkeleton = () => {
//   return (
//     <Wrapper>
//       {new Array(10).fill(1).map((_, index) => {
//         return (
//           <LessonItem key={index}>
//             <LessonTitle>
//               <LessonTitleSkeletonLine active />{" "}
//             </LessonTitle>
//             <ProgressBlock>
//               <ProgressTitle>
//                 <LessonItemSkeletonLine active />
//                 <LessonItemSkeletonLine active />
//               </ProgressTitle>
//               <BaseTag.div>
//                 <Skeleton.Avatar active shape="circle" size={"large"} />
//               </BaseTag.div>
//             </ProgressBlock>
//           </LessonItem>
//         );
//       })}
//     </Wrapper>
//   );
// };
const Wrapper = styled.div`
  gap: ${convertPixelToRem(16)};
  display: flex;
  flex-direction: column;
`;
const LessonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${convertPixelToRem(8)} ${convertPixelToRem(12)};
  border: ${convertPixelToRem(1)} solid ${(p) => p.theme.$border_signup};
  border-radius: ${convertPixelToRem(12)};
  cursor: pointer;
  gap: ${convertPixelToRem(12)};
  &:hover {
    background-color: ${(p) => p.theme.auth.$menu_hover};
  }
`;
const LessonItemName = styled.div`
  font-size: ${convertPixelToRem(14)};
  font-weight: 600;
  color: ${(p) => p.theme.$tw_black};
  flex: 1;
`;
const ProgressAnt = styled(Progress)`
  &&.ant-progress {
    & .ant-progress-text {
      font-size: ${convertPixelToRem(13)};
      font-weight: bold;
      color: ${(p) => p.theme.auth.$progress};
    }
    & .ant-progress-circle-trail {
      stroke: ${(p) => p.theme.auth.$menu_hover};
    }
  }
  &&.ant-progress .ant-progress-circle-path {
    stroke: ${(p) => p.theme.auth.$progress};
  }
`;
// const LessonTitle = styled.div`
//   flex: 1;
// `;
const ProgressBlock = styled.div`
  display: flex;
  gap: ${convertPixelToRem(10)};
  align-items: center;
`;
// const ProgressTitle = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
const Done = styled.p`
  font-size: ${convertPixelToRem(12)};
  font-weight: bold;
  color: ${(p) => p.theme.$tw_black};
`;
const Correct = styled.p`
  font-weight: 500;
  color: ${(p) => p.theme.$text_tertiary};
`;
// const LessonItemSkeletonLine = styled(Skeleton.Node)`
//   && .ant-skeleton-image {
//     height: ${convertPixelToRem(14)};
//   }
// `;
// const LessonTitleSkeletonLine = styled(BaseTag.skeletonLine)`
//   && .ant-skeleton-image {
//     width: 80%;
//     @media (max-width: ${convertPixelToRem(device.tablet)}) {
//       width: 100%;
//     }
//   }
// `;
