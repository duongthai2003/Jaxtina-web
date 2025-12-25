import styled from "styled-components";
import { Divider, Image, Segmented } from "antd";
import { device } from "@/utils/deviceBreakpoint";
import { convertPixelToRem } from "@/utils/func/convertRem";

export const SegmentedProcess = styled(Segmented)`
    width: 100%;
    display: flex;
    justify-content: center;
    background: ${(props) => props.theme.$tw_white};
    border-radius: ${convertPixelToRem(12)};
    padding: ${convertPixelToRem(6)};
    margin-bottom: ${convertPixelToRem(16)};
    box-shadow: 0 0 0 ${convertPixelToRem(1)} ${(props) => props.theme.$tw_stone_200} inset;
    .ant-segmented-item {
      font-size: ${convertPixelToRem(14)};
      font-weight: 500;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.$tw_stone_600};
      background: transparent;
      padding: ${convertPixelToRem(8)} ${convertPixelToRem(21)} !important;
      border-radius: ${convertPixelToRem(10)};
    }
    .ant-segmented-item-checked,
    .ant-segmented-item-selected,
    .ant-segmented-item-active {
      color: ${(props) => props.theme.$tw_red_600} !important;
      font-weight: bold;
      background: ${(props) => props.theme.$tw_red_50};
      border: solid ${convertPixelToRem(1)} ${(props) => props.theme.$tw_red_200};
    }
    .ant-segmented-item:not(.ant-segmented-item-checked) {
      color: ${(props) => props.theme.$tw_stone_500};
    }
`;

export const BackgroundStepImage = styled.img`
  width: 100%;
  border-radius: ${convertPixelToRem(16)};
  max-width: ${convertPixelToRem(1400)};
  height: auto;
  display: block;
  object-fit: contain;
  object-position: center;
`;

export const StepWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  cursor: default;
  height: auto;
`;

export const Timeline = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: clamp(5rem, 8vw, 5rem);
  overflow-y: visible;
  z-index: 2;
  width: 100%;
  padding: clamp(${convertPixelToRem(120)}, 10vh, ${convertPixelToRem(80)}) clamp(${convertPixelToRem(10)}, 3vw, ${convertPixelToRem(24)});
  max-height: 100%;
  box-sizing: border-box;
  overflow: visible;
  
  @media (max-width: ${device.laptop}px) {
    gap: clamp(1.8rem, 7vw, 14rem);
    padding-top: clamp(${convertPixelToRem(30)}, 4vh, ${convertPixelToRem(60)});
  }

  @media (max-width: ${device.tablet}px) {
    gap: clamp(1.2rem, 6vw, 8rem);
    align-items: center;
    padding: clamp(${convertPixelToRem(20)}, 3vh, ${convertPixelToRem(40)}) ${convertPixelToRem(10)};
  }
`;

export const ImgStep = styled.img`
    width: auto;
    max-width: clamp(${convertPixelToRem(260)}, 30vw, ${convertPixelToRem(600)});
    display: block;
    object-fit: contain;
    margin: 0 auto 0;
    /* transform: translateY(clamp(-1.2rem, -10vh, -6rem)); */
    cursor: pointer;
    /* gap: 10px !important; */
    margin-top: 50px;
    position: relative;
    @media (max-width: ${device.laptop}px) {
      max-width: clamp(${convertPixelToRem(220)}, 40vw, ${convertPixelToRem(400)});
      transform: translateY(clamp(16rem, 10vh, 10rem));
      /* padding-top: ${convertPixelToRem(70)}; */
    }

    @media (max-width: ${device.tablet}px) {
      max-width: ${convertPixelToRem(340)};
      /* margin-top: ${convertPixelToRem(300)} */
      

    }
`;

export const TextTopic = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${(props) => props.theme.$color_white};
  font-size: ${convertPixelToRem(18)};
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  z-index: 3;
  pointer-events: none;
  max-width: 80%;
  line-height: 1.4;
  white-space: nowrap;
`;

export const ImgStepGr2 = styled.img`
    width: auto;
    max-width: clamp(${convertPixelToRem(200)}, 25vw, ${convertPixelToRem(500)});
    display: block;
    object-fit: contain;
    margin: 0 auto 0;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;

    @media (max-width: ${device.laptop}px) {
      max-width: clamp(${convertPixelToRem(180)}, 28vw, ${convertPixelToRem(400)});
      width: 30%;
    }

    @media (max-width: ${device.tablet}px) {
      max-width: clamp(${convertPixelToRem(150)}, 25vw, ${convertPixelToRem(300)});
      width: 30%;
    }
`;

export const ImgGroupGr2 = styled.img`
    width: ${convertPixelToRem(500)};
    max-width: ${convertPixelToRem(1400)};
    /* height: ; */
    display: block;
    object-fit: contain;
    object-position: center;
    position: absolute;
    top: 0;
    padding-top: ${convertPixelToRem(260)};
    left: 50%;
    transform: translateX(-50%) ;
    z-index: 0;
    pointer-events: none;

    @media (max-width: ${device.laptop}px) {
      width: ${convertPixelToRem(300)};
      /* max-width: ${convertPixelToRem(800)}; */
      padding-top: ${convertPixelToRem(60)};
      /* height: 90%; */
    }

    @media (max-width: ${device.tablet}px) {
      max-width: 50%;
    }
`;

export const StepCard = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  pointer-events: auto;
  transition: transform 0.2s ease;
  /* &:nth-child(1) ${TextTopic} {
    transform: translateX(-10%) translateY(-115%);
  }

  &:nth-child(2) ${TextTopic} {
    transform: translateX(-100%) translateY(-115%);
  }

  &:nth-child(3) ${TextTopic} {
    transform: translateX(-10%) translateY(-115%);
  }

  &:nth-child(4) ${TextTopic} {
    transform: translateX(-130%) translateY(-115%);
  } */

  &:nth-child(1) ${ImgStepGr2} {
    transform: translateY(20%) translateX(-80%);
  }

  &:nth-child(2) ${ImgStepGr2} {
    transform: translateY(15%) translateX(100%);
  }

  &:nth-child(3) ${ImgStepGr2} {
    transform: translateY(8%) translateX(-100%);
  }

  &:nth-child(4) ${ImgStepGr2} {
    transform: translateY(-25%) translateX(100%);
  }

  &:nth-child(5) ${ImgStepGr2} {
    transform: translateY(-45%) translateX(-100%);
  }

  /* &:nth-child(6) ${ImgStepGr2} {
    transform: translateY(-300%) translateX(80%);
  } */

  @media (max-width: ${device.laptop}px) {
    align-items: center;
    width: 100%;
    
    &:nth-child(1) ${ImgStepGr2} {
      transform: translateY(15%) translateX(-80%);
    }

    &:nth-child(2) ${ImgStepGr2} {
      transform: translateY(-15%) translateX(80%);
    }

    &:nth-child(3) ${ImgStepGr2} {
      transform: translateY(-60%) translateX(-80%);
    }

    &:nth-child(4) ${ImgStepGr2} {
      transform: translateY(-110%) translateX(80%);
    }

    &:nth-child(5) ${ImgStepGr2} {
      transform: translateY(-170%) translateX(-80%);
    }

    &:nth-child(6) ${ImgStepGr2} {
      transform: translateY(-200%) translateX(80%);
    }
  }
  
  @media (max-width: ${device.tablet}px) {
    align-items: center;
    width: 100%;
    
    &:nth-child(1) ${ImgStepGr2} {
      transform: translateY(20%) translateX(-80%);
    }

    &:nth-child(2) ${ImgStepGr2} {
      transform: translateY(-15%) translateX(80%);
    }

    &:nth-child(3) ${ImgStepGr2} {
      transform: translateY(-70%) translateX(-80%);
    }

    &:nth-child(4) ${ImgStepGr2} {
      transform: translateY(-120%) translateX(80%);
    }

    &:nth-child(5) ${ImgStepGr2} {
      transform: translateY(-180%) translateX(-80%);
    }

    &:nth-child(6) ${ImgStepGr2} {
      transform: translateY(-220%) translateX(80%);
    }
  }
`;

export const BookIcon = styled.img`
  width: ${convertPixelToRem(80)};
  flex-shrink: 0;
`;

export const Arrow = styled.img`
  position: absolute;
  left: 50%;
  bottom: ${convertPixelToRem(-130)};
  transform: translateX(-50%);
  opacity: 0.95;
  pointer-events: none;
  z-index: 0;
`;

export const TopicCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(16)};
  width: 100%;
`;

export const TopicTitle = styled.div`
  flex: 1;
  font-size: ${convertPixelToRem(16)};
  font-weight: 500;
  color: ${(props) => props.theme.$color_text};
  text-align: left;
`;

export const TopicIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${convertPixelToRem(20)};
  height: ${convertPixelToRem(20)};
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CircularProgressWrapper = styled.div`
  position: relative;
  width: ${convertPixelToRem(64)};
  height: ${convertPixelToRem(64)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircularProgressText = styled.div<{ $color?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${convertPixelToRem(12)};
  font-weight: ${convertPixelToRem(600)};
  color: ${(props) => props.theme.book.$tw_stone_600};
  z-index: 1;
`;

export const ComTopicList = styled.div`
  background-color: ${(props) => props.theme.$color_white};
  width: ${convertPixelToRem(500)};
  min-height: ${convertPixelToRem(90)};
  border-radius: ${convertPixelToRem(12)};
  display: block;
  align-items: center;
  justify-content: center;
  padding: ${convertPixelToRem(16)};
  margin: ${convertPixelToRem(-24)};
  gap: ${convertPixelToRem(10)};
  cursor: pointer;
  @media (max-width: ${device.laptop}px) {
    width: ${convertPixelToRem(400)};
    padding: ${convertPixelToRem(24)};
    margin: ${convertPixelToRem(-10)};
  }
  @media (max-width: ${device.tablet}px) {
    width: ${convertPixelToRem(300)};
    padding: ${convertPixelToRem(10)};
  }
`;

export const TopicCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(16)};
  width: 100%;
`;

export const CommunicateWrapper = styled.div`
  width: 100%;
  border-radius: ${convertPixelToRem(12)};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ImgCommunicate = styled(Image)`
  display: block;
  width: auto;
  height: auto;
  border-radius: ${convertPixelToRem(12)} !important;
`;

export const TextCommunicate = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  position: absolute;
  top: ${convertPixelToRem(12)};
  left: 50%;
  transform: translateX(-50%);
  color: ${(props) => props.theme.$color_text};
  font-weight: 700;
  font-size: ${convertPixelToRem(18)};
  text-align: center;
  z-index: 2;
  pointer-events: none;
`;

export const ImgBeae = styled(Image)`
  position: relative;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  margin-top: ${convertPixelToRem(-320)};
  justify-content: center;
`;

export const LearnedProgressWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: ${convertPixelToRem(12)};
  width: 100%;
  padding: ${convertPixelToRem(10)} ${convertPixelToRem(10)};
  @media (max-width: ${device.laptop}px) {
    width: 65%;
  }
  @media (max-width: ${device.tablet}px) {
    width: 85%;
  }
`;

export const LearnedText = styled.div`
  font-size: ${convertPixelToRem(14)};
  font-weight: 500;
  color: ${(props) => props.theme.$color_text};
  white-space: nowrap;
  z-index: 1;
  margin-top: ${convertPixelToRem(-100)};

`;
export const ProgressBarContainer = styled.div`
  flex: 1;
  height: ${convertPixelToRem(8)};
  background-color: ${(props) => props.theme.$tw_gray_400};
  border-radius: ${convertPixelToRem(4)};
  position: relative;
  overflow: hidden;
  margin-top: ${convertPixelToRem(-100)};
`;

export const ProgressBarFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${(props) => props.$percentage}%;
  background: linear-gradient(90deg, ${(props) => props.theme.book.$color_yellow_50} 0%, ${(props) => props.theme.book.$color_yellow_200} 100%);
  border-radius: ${convertPixelToRem(4)};
  transition: width 0.3s ease;
`;

export const ProgressText = styled.div`
  font-size: ${convertPixelToRem(14)};
  font-weight: 500;
  color: ${(props) => props.theme.$color_text};
  white-space: nowrap;
  margin-left: ${convertPixelToRem(8)};
  margin-top: ${convertPixelToRem(-100)};
  z-index: 1;
`;

export const HoverWrapper = styled.div`
  position: relative;
  display: block;
`;

export const HoverInfo = styled.div`
  position: absolute;
  right: 0;
  top: 1%;
  transform: translateY(50%);
  max-width: ${convertPixelToRem(250)};
  background: ${(props) => props.theme.$bg_white};
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(14)};
  border-radius: ${convertPixelToRem(12)};
  border: ${convertPixelToRem(1)} solid ${(props) => props.theme.$border_signup};
  color: ${(props) => props.theme.$tw_stone_700};
  font-size: ${convertPixelToRem(14)};
  line-height: 1.45;
  display: none;
  z-index: 12;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
    gap: ${convertPixelToRem(8)};
  }

  ${HoverWrapper}:hover & {
    display: block;
  }
`;

export const ColFinish = styled.div`
  padding: 0 ${convertPixelToRem(10)} ${convertPixelToRem(10)} 0;
`;

export const ImgFinish = styled.img`
  padding-right: ${convertPixelToRem(3)};
`;

export const CombinationBg = styled.div`
  background-color: ${(props) => props.theme.$bg_purple};
  width: ${convertPixelToRem(600)};
  padding: ${convertPixelToRem(32)} ${convertPixelToRem(20)};
  border-radius: ${convertPixelToRem(32)};
  display: flex;
  justify-content: center;
`;

export const CombinationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(24)};
  width: 100%;
`;

export const CombinationCard = styled.div`
  position: relative;
  border-radius: ${convertPixelToRem(24)};
  overflow: hidden;
  box-shadow: 0 ${convertPixelToRem(10)} ${convertPixelToRem(30)} rgba(15, 23, 42, 0.25);
`;

export const CombinationImage = styled.img`
  width: 100%;
  display: block;
`;

export const CombinationIllustration = styled.img`
  position: absolute;
  right: ${convertPixelToRem(32)};
  bottom: ${convertPixelToRem(24)};
  width: ${convertPixelToRem(180)};
  height: auto;
  object-fit: contain;
  pointer-events: none;
`;

export const CombinationContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${convertPixelToRem(24)} ${convertPixelToRem(28)};
  pointer-events: none;
`;

export const CombinationTitle = styled.div`
  max-width: 70%;
  font-size: ${convertPixelToRem(18)};
  font-weight: 700;
  color: ${(props) => props.theme.$color_text};
  line-height: 1.4;
  text-transform: uppercase;
`;

export const CombinationMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${convertPixelToRem(16)};
`;

export const CombinationLessonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(8)};
  color: ${(props) => props.theme.$color_white};
  font-size: ${convertPixelToRem(14)};
`;

export const CombinationLessonIcon = styled.img`
  width: ${convertPixelToRem(32)};
  height: ${convertPixelToRem(32)};
`;

export const CombinationLessonCount = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.$color_text}
`;

export const CombinationProgressTrack = styled.div`
  flex: 1;
  height: ${convertPixelToRem(8)};
  border-radius: ${convertPixelToRem(8)};
  background: ${(props) => props.theme.$tw_gray_400};
  overflow: hidden;
  margin-top: 5px;
`;

export const CombinationProgressFill = styled.div<{ $percentage: number }>`
  width: ${(props) => Math.min(Math.max(props.$percentage, 0), 100)}%;
  height: 100%;
  border-radius: ${convertPixelToRem(8)};
  background: linear-gradient(90deg, ${(props) => props.theme.book.$color_yellow_50}, ${(props) => props.theme.book.$color_yellow_200});
  transition: width 0.3s ease;
`;

export const DeviderProcess = styled(Divider)`
  margin: ${convertPixelToRem(-20)} 0 ${convertPixelToRem(-10)} 0;
`;