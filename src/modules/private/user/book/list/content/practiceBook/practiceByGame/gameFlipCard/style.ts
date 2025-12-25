import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from "antd";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { images } from "@/assets";

export const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url(${images.bgFlipCard}) center / cover no-repeat;
    z-index: 0;
  }
`;

export const Header = styled.div`
  position: relative;
  z-index: 10;
  padding: ${convertPixelToRem(20)} ${convertPixelToRem(64)} ${convertPixelToRem(12)};
  font-size: ${convertPixelToRem(16)};
  font-weight: bold;
  color: ${(props) => props.theme.auth.$header_text};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${convertPixelToRem(760)};
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(${convertPixelToRem(16)});
  border: ${convertPixelToRem(1)} solid ${(props) => props.theme.$color_white};
  border-radius: ${convertPixelToRem(24)};
  padding: ${convertPixelToRem(24)};
  overflow: hidden; 
`;

export const Grid = styled.div<{disabled?: boolean}>`
  display: grid;
  grid-template-columns: repeat(3, ${convertPixelToRem(220)});
  grid-template-rows: repeat(5, ${convertPixelToRem(120)});
  gap: ${convertPixelToRem(16)};
  justify-content: center;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  width: 100%;
  max-width: ${convertPixelToRem(220 * 3 + 16 * 2)};
  margin: 0 auto;
`;

export const CardWrapper = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['$isSelected', '$isMismatched', '$isMatched'].includes(prop),
})<CardWrapperProps>`
  width: ${convertPixelToRem(220)};
  height: ${convertPixelToRem(100)};
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;
  transition: all 1s ease;
  
  ${({ $isSelected, $isMismatched, $isMatched, theme }) => {
    if ($isMatched) {
      return `
        & ${CardFace} {
          background: ${theme.$tw_green_50};
          border-color: ${theme.$tw_green_300};
          border-bottom-color: ${theme.$tw_green_300};
          color: ${theme.$tw_green_300};
          transform: scale(1.2);
          opacity: 0.5;
          transition: all 1s ease;
        }
      `;
    }
    if ($isMismatched) {
      return `
        & ${CardFace} {
          background: ${theme.$tw_red_100};
          border-color: ${theme.$tw_red_400};
          border-bottom-color: ${theme.$tw_red_500};
        }
      `;
    }
    if ($isSelected) {
      return `
        & ${CardFace} {
          background: ${theme.$tw_blue_100};
          border-color: ${theme.$tw_blue_400};
          border-bottom-color: ${theme.$tw_blue_500};
        }
      `;
    }
    return '';
  }}
`;

export const CardContainer = styled.div`
  position: relative;
  width: ${convertPixelToRem(220)};
  height: ${convertPixelToRem(100)};
`;

export const CardFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${convertPixelToRem(16)};
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${convertPixelToRem(18)};
  backface-visibility: hidden;
  transition: all 1s ease;
  border: ${convertPixelToRem(1)} solid transparent;
  border-bottom: ${convertPixelToRem(6)} solid ${(props) => props.theme.$tw_gray_100};
  padding: ${convertPixelToRem(10)};
  text-align: center;
  word-break: break-word;
  overflow: hidden;

  &.back {
    transform: rotateY(180deg);
    background: ${(props) => props.theme.$tw_blue_100};
    border: ${convertPixelToRem(1)} solid ${(props) => props.theme.$tw_blue_400};
    border-bottom: ${convertPixelToRem(6)} solid ${(props) => props.theme.$tw_blue_500};
  }
`;

export const Instruct = styled.div`
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(32)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${convertPixelToRem(20)};
`;

export const ButtonSubmit = styled(Button)`
  padding: ${convertPixelToRem(16)} ${convertPixelToRem(60)};
  margin: 1rem 0rem 1.5rem 0rem;
  background-color: ${(props) => props.theme.$tw_red_500};
  z-index: 10;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 2.5rem;
  width: 8rem;
  border-radius: 6.25rem;
  color: ${(props) => props.theme.$color_white};
  font-size: ${convertPixelToRem(14)};
  border: none;
  cursor: pointer;
   &:focus,
  &:active {
    outline: none;
  }
`;

export const ButtonPractice = styled(Button)`
  padding: ${convertPixelToRem(16)} ${convertPixelToRem(60)};
  margin: 1rem 0rem 1.5rem 0rem;
  background-color: ${(props) => props.theme.$tw_red_500};
  z-index: 10;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 2.5rem;
  width: 12rem;
  border-radius: 6.25rem;
  color: ${(props) => props.theme.$color_white};
  font-size: ${convertPixelToRem(14)};
  border: none;
  cursor: pointer;
   &:focus,
  &:active {
    outline: none;
  }
`;

export const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(10)};
  margin: ${convertPixelToRem(16)} 0 ${convertPixelToRem(24)};
`;

export const TimeBox = styled.div`
  width: ${convertPixelToRem(56)};
  height: ${convertPixelToRem(46)};
  background: ${(props) => props.theme.auth.$btn_color_primary};
  border-radius: ${convertPixelToRem(14)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimeNumber = styled(motion.div)`
  color: ${(props) => props.theme.$color_white};
  font-size: ${convertPixelToRem(20)};
  font-weight: 700;
  line-height: 1;
`;

export const Colon = styled.div`
  font-size: ${convertPixelToRem(20)};
  font-weight: 700;
  color: ${(props) => props.theme.auth.$btn_color_primary};
`;

export const FloatingPointContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${convertPixelToRem(18)};
  font-weight: bold;
  color:${(props) => props.theme.$color_white}; 
  border-radius: 50%;
  background-color: ${(props) => props.theme.$bg_blue_900};
  pointer-events: none;
  z-index: 10;
  padding: ${convertPixelToRem(10)};
`;

export const InstructImg = styled.img`
  width: ${convertPixelToRem(52)};
  height: ${convertPixelToRem(52)};
  z-index: 2;
`;