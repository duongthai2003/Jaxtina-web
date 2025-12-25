import { convertPixelToRem } from "@/utils/func/convertRem";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Instruct = styled.div`
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(32)};
  display: flex;
  align-items: start;
  gap: ${convertPixelToRem(20)};
`;
const InstructImg = styled.img`
  width: ${convertPixelToRem(52)};
  height: ${convertPixelToRem(52)};
`;
const InstructTitle = styled.div`
  padding: ${convertPixelToRem(4)} ${convertPixelToRem(12)};
  border-radius: ${convertPixelToRem(100)};
  background-color: #eef2ff;
  box-shadow: 0 ${convertPixelToRem(2)} ${convertPixelToRem(2)} #081f63b2;
  font-weight: bold;
  position: relative;
  color: ${(p) => p.theme.auth.$only_black};
`;
const InstructTitleImg = styled.img`
  position: absolute;
  bottom: ${convertPixelToRem(0)};
  left: -${convertPixelToRem(1)};
`;

const Question = styled.div`
  flex-direction: column;
  display: flex;

  gap: ${convertPixelToRem(32)};
  width: 100%;
`;
const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${convertPixelToRem(25)};
  padding: ${convertPixelToRem(32)};
`;
const QuestionContentTitle = styled.p``;
const Media = styled.div`
  display: flex;
  gap: ${convertPixelToRem(16)};
`;
const Answer = styled.div`
  display: flex;
  gap: ${convertPixelToRem(12)};
  padding: ${convertPixelToRem(12)};
  border: ${convertPixelToRem(1)} solid ${(p) => p.theme.$border_signup};
  border-radius: ${convertPixelToRem(12)};
  justify-content: center;
`;

const AnswerItem = styled.p`
  padding: ${convertPixelToRem(4)} ${convertPixelToRem(12)};
  border: ${convertPixelToRem(2)} solid ${(p) => p.theme.$border_signup};
  border-radius: ${convertPixelToRem(8)};
  background-color: ${(p) => p.theme.$color_white};

  cursor: pointer;
  &:hover {
    background-color: ${(p) => p.theme.auth.$menu_hover};
  }
`;
const MediaImg = styled.div<{ $isPlaying: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${convertPixelToRem(100)};
  opacity: ${(p) => (p.$isPlaying ? 0.6 : 1)};
  cursor: ${(p) => (p.$isPlaying ? "default" : "pointer")};

  background-color: ${(p) => p.theme.auth.$menu_hover};
`;
const AnswerItemWrapper = styled.div`
  border-radius: ${convertPixelToRem(8)};
  background-color: ${(p) => p.theme.auth.$menu_hover};
`;

export const EXI = {
  Wrapper,
  Instruct,
  InstructImg,
  InstructTitle,
  InstructTitleImg,
  Question,
  QuestionContent,
  QuestionContentTitle,
  Media,
  Answer,
  AnswerItem,
  MediaImg,
  AnswerItemWrapper,
};
