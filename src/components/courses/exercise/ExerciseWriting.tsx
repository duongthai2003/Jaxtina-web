import { icons, images } from "@/assets";
import { BaseTag } from "@/utils/baseTagHTML";
import { EXI } from "./style";
import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
import QuestionAndAnswerWriting from "./QuestionAndAnswerWriting";

interface lessonItem {
  id: number;
  question: string;
  answerOptions: string[];
  sound: any;
}

type ExerciseWritingProps = {
  data: lessonItem;
  setSelectedAnswer: (answer: string) => void;
  selectedAnswer: string | null;
};

const ExerciseWriting = ({
  data,
  setSelectedAnswer,
  selectedAnswer,
}: ExerciseWritingProps) => {
  return (
    <EXI.Wrapper>
      <EXI.Instruct>
        <EXI.InstructImg src={images.jaxDang6} alt="" />
        <EXI.InstructTitle>
          <BaseTag.p>
            {" "}
            Nghe và lựa chọn từ còn thiếu trong câu sau nhé!
          </BaseTag.p>
          <EXI.InstructTitleImg src={icons.messVector} alt="" />
        </EXI.InstructTitle>
      </EXI.Instruct>
      <Content>
        <QuestionAndAnswerWriting />
      </Content>
    </EXI.Wrapper>
  );
};
export default ExerciseWriting;

const Content = styled(EXI.Question)`
  gap: ${convertPixelToRem(48)};
`;
