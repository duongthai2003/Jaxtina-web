import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import styled from "styled-components";
import { CD } from "../courseDetail/style";
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import { BaseTag } from "@/utils/baseTagHTML";
import { device } from "@/utils/deviceBreakpoint";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { PATHS } from "@/routers/path";
import { icons, images } from "@/assets";

const dataLesson = [
  {
    title: "Từ vựng",
    exercise: [
      {
        img: images.userVideo,
        title: "Video từ vựng",
        progress: "3/3",
      },
      {
        img: images.vocabIcon,
        title: "Học từ vựng",
        progress: "3/3",
      },
      {
        img: images.practice,
        title: "Bài tập thực hành",
        progress: "3/3",
      },
    ],
  },
  {
    title: "Ngữ pháp",
    exercise: [
      {
        img: images.userVideo,
        title: "Video ngữ pháp",
        progress: "3/3",
      },
    ],
  },
  {
    title: "Thực hành 4 kỹ năng",
    exercise: [
      {
        img: images.userVideo,
        title: "  Nghe",
        progress: "3/3",
      },
      {
        img: images.vocabIcon,
        title: "  Nói",
        progress: "3/3",
      },
      {
        img: images.practice,
        title: "  Đọc",
        progress: "3/3",
      },
      {
        img: images.practice,
        title: "  Viết",
        progress: "3/3",
      },
    ],
  },
];

const Lesson = () => {
  const navigate = useNavigate();
  return (
    <div>
      <CommonBreadcrumb
        items={[
          { label: "Khoá học", path: PATHS.private.user.course() },
          { label: "Starter", path: PATHS.private.user.courseDetail() },
          { label: "About you" },
        ]}
      />
      <Wrapper>
        {dataLesson.map((item) => (
          <BaseTag.div key={item.title}>
            <Header>{item.title}</Header>
            <LessonBlock>
              <Row gutter={[20, 20]}>
                {item.exercise.map((exercise, index) => (
                  <Col md={12} lg={12}>
                    <Exercise
                      key={index}
                      onClick={() => {
                        navigate(
                          PATHS.private.user.exercise(
                            "courseId",
                            "lessonId",
                            "exerciseId"
                          )
                        );
                      }}
                    >
                      <BaseTag.div>
                        <ExerciseImg src={exercise.img} alt="" />
                      </BaseTag.div>
                      <BaseTag.div>
                        <ExerciseTitle>{exercise.title}</ExerciseTitle>
                        <ExerciseContent>
                          <ExerciseContentIcon src={icons.star} alt="" />
                          <p>{exercise.progress}</p>
                        </ExerciseContent>
                      </BaseTag.div>
                    </Exercise>
                  </Col>
                ))}
              </Row>
            </LessonBlock>
          </BaseTag.div>
        ))}
      </Wrapper>
    </div>
  );
};
export default Lesson;
const Wrapper = styled(CD.wrapperContent)`
  margin: 0;
  overflow: hidden;
`;
const Header = styled(CD.CourseHeader)`
  background-color: ${(p) => p.theme.$tw_amber_50};
`;

const LessonBlock = styled.div`
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(20)};
`;

const Exercise = styled.div`
  padding: ${convertPixelToRem(20)};
  display: flex;
  gap: ${convertPixelToRem(32)};
  border: ${convertPixelToRem(1)} solid ${(p) => p.theme.$border_signup};
  background: linear-gradient(#f8f9ff, #eaefff);
  border-radius: ${convertPixelToRem(16)};
  box-shadow: ${convertPixelToRem(1)} ${convertPixelToRem(1)}
    ${convertPixelToRem(2)} #0000000f;
  cursor: pointer;
  color: ${(p) => p.theme.auth.$only_black};
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    gap: ${convertPixelToRem(15)};
    padding: ${convertPixelToRem(15)};
    border-radius: ${convertPixelToRem(10)};
  }
`;
const ExerciseTitle = styled.div`
  font-weight: bold;
  font-size: ${convertPixelToRem(20)};

  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    font-size: ${convertPixelToRem(16)};
  }
`;
const ExerciseContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(4)};
`;
const ExerciseContentIcon = styled.img`
  width: ${convertPixelToRem(16)};
  height: ${convertPixelToRem(16)};
`;
const ExerciseImg = styled.img`
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    width: ${convertPixelToRem(40)};
  }
`;
