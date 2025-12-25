import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { icons, images } from "@/assets";
import { BaseTag } from "@/utils/baseTagHTML";
import { EXI } from "./style";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

interface lessonItem {
  id: number;
  question: string;
  answerOptions: { value: number; label: string }[];
  sound: any;
}

type ExerciseListeningProps = {
  data: lessonItem;
  setSelectedAnswer: (answer: string) => void;
  selectedAnswer: string | null;
};

const ExerciseReading = ({
  data,
  setSelectedAnswer,
  selectedAnswer,
}: ExerciseListeningProps) => {
  const handleClick = (e: RadioChangeEvent) => {
    setSelectedAnswer(e.target.value);
  };

  console.log(selectedAnswer);
  return (
    <EXI.Wrapper>
      <EXI.Instruct>
        <EXI.InstructImg src={images.jaxDang6} alt="" />
        <EXI.InstructTitle>
          <BaseTag.p>Chọn từ hoặc cụm từ để hoàn thành câu nhé!</BaseTag.p>
          <EXI.InstructTitleImg src={icons.messVector} alt="" />
        </EXI.InstructTitle>
      </EXI.Instruct>

      <Answer>
        <SeeTheory>
          <div>
            <img src={icons.icRead} alt="" />
          </div>
          <SeeTheoryTitle>Xem lý thuyết</SeeTheoryTitle>
        </SeeTheory>

        <QuestionContentTitle>1.{data.question}</QuestionContentTitle>
        <AnswerGroup
          onChange={handleClick}
          value={selectedAnswer}
          options={data.answerOptions}
        />
      </Answer>
    </EXI.Wrapper>
  );
};
export default ExerciseReading;

const Answer = styled(EXI.Answer)`
  flex-direction: column;
  border: none;
  padding: 0;
  gap: 20px;
`;

const SeeTheory = styled.div`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.$tw_indigo_800};
  background-color: ${(p) => p.theme.$tw_purple_100};
  border-radius: ${convertPixelToRem(12)};
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(32)};
  gap: ${convertPixelToRem(4)};
`;
const SeeTheoryTitle = styled.div`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const QuestionContentTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const AnswerGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  & .ant-radio-wrapper {
    font-size: 14px;
    font-weight: 400;
    border-radius: ${convertPixelToRem(8)};
    padding: 8px 12px;
    &:hover {
      background-color: ${(p) => p.theme.auth.$menu_hover};
    }
  }
`;
