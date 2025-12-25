import styled from "styled-components";
import {Image,Progress}from "antd";
import {convertPixelToRem}from "../../../../../../../../../utils/func/convertRem";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: ${convertPixelToRem(20)};
  gap: ${convertPixelToRem(32)};
  height: 100vh;
  overflow: auto;
`;

export const MatchCard = styled.div<{
  selected?: boolean;
  disabled?: boolean;
  checked?: boolean;
  isCorrect?: boolean;
}>`
  background-color: ${(props) => props.theme.$bg_white};
  border-radius: ${convertPixelToRem(24)};
  border: ${convertPixelToRem(1)} solid 
    ${(props) => 
      props.checked 
        ? props.isCorrect 
          ? props.theme.$tw_green_600 
          : props.theme.$tw_red_600
        : props.theme.$tw_gray_100
    };
  border-bottom: ${convertPixelToRem(6)} solid 
    ${(props) => 
      props.checked 
        ? props.isCorrect 
          ? props.theme.$tw_green_600 
          : props.theme.$tw_red_600
        : props.theme.$tw_gray_100
    };
  padding: ${convertPixelToRem(16)} ${convertPixelToRem(20)};
  margin-bottom: ${convertPixelToRem(16)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  min-height: ${convertPixelToRem(116)};
  position: relative;
  box-shadow: ${(props) => 
    props.checked && props.isCorrect 
      ? `0 0 0 ${convertPixelToRem(2)} ${props.theme.$tw_green_600} `
      : props.checked 
        ? `0 0 0 ${convertPixelToRem(2)} ${props.theme.$tw_red_600} `
        : 'none'
  };
`;

export const ImageWord = styled.img<{checked?: boolean, isConnected?: boolean}>`
  width: ${convertPixelToRem(120)};
  height: auto;
  border-radius: ${convertPixelToRem(16)};
  margin-right:${({checked, isConnected})=> 
  checked || isConnected ? convertPixelToRem(10) : convertPixelToRem(10)} ;
`;

export const ImageSelectedRight = styled.img`
  position: absolute;
  right: ${convertPixelToRem(16)};
  width: ${convertPixelToRem(24)};
  height: ${convertPixelToRem(24)}
`;

export const ImageSelectedLeft = styled.img`
  position: absolute;
  left: ${convertPixelToRem(16)};
  width: ${convertPixelToRem(24)};
  height: ${convertPixelToRem(24)}
`;

export const CardCorrect = styled.div<{ isCorrect?: boolean }>`
  position: absolute;
  left: ${convertPixelToRem(20)};
  top: 50%;
  transform: translateY(-50%);
  width: ${convertPixelToRem(24)};
  height: ${convertPixelToRem(24)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isCorrect, theme }) => 
    isCorrect ? theme.$tw_green_600 : theme.$tw_red_500};
  color: white; 
  font-weight: bold;
  font-size: ${convertPixelToRem(16)};
  z-index: 2;
`;

export const TextWord = styled.p<{checked?: boolean, isConnected?: boolean}>`
  font-size: ${convertPixelToRem(16)};
  font-weight: 600;
  color: ${({ theme }) => theme.$tw_gray_800};
  margin: 0;
  margin-left:${({checked, isConnected}) => checked || isConnected ? convertPixelToRem(0): convertPixelToRem(30)} !important;
`;

export const RadioCircle = styled.div<{ active?: boolean }>`
  width: ${convertPixelToRem(20)};
  height: ${convertPixelToRem(20)};
  border-radius: 50%;
  color: ${(props) => props.theme.$tw_gray_400} ;
  border: ${convertPixelToRem(2)} solid
    ${({ active, theme }) =>
      active ? theme.$tw_gray_100 : theme.$tw_gray_300};

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: ${convertPixelToRem(10)};
    height: ${convertPixelToRem(10)};
    border-radius: 50%;
    background: ${({ active, theme }) =>
      active ? theme.$tw_gray_100 : 'transparent'};
  }
`;

export const ProgressAntd = styled(Progress)`
  &&.ant-progress .ant-progress-inner {
    background-color: ${(p) => p.theme.$tw_red_100};
  }
  &&.ant-progress .ant-progress-bg::after {
    background-color: ${(p) => p.theme.$tw_red_400};
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(4)};
  font-weight: bold;
  font-size: ${convertPixelToRem(16)};
  flex: 1;
  color: ${(p) => p.theme.$tw_red_400};
`;
export const ResultIndicator = styled.div<{ isCorrect: boolean }>`
  position: absolute;
  left: ${convertPixelToRem(20)};
  top: 50%;
  transform: translateY(-50%);
  width: ${convertPixelToRem(24)};
  height: ${convertPixelToRem(24)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isCorrect ? props.theme.$tw_green_600 : props.theme.$tw_red_600};
  color: white;
  font-weight: bold;
  font-size: ${convertPixelToRem(16)};
`;
export const QuestionBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 65%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`

export const HoverWrapper = styled.div`
  position: relative;
  display: flex;
`

export const TooltipTest = styled.div`
  border-radius: ${convertPixelToRem(8)};
  padding: ${convertPixelToRem(12)};
  min-width: ${convertPixelToRem(200)};
`

export const ColItem = styled.div`
font-weight: 500;
font-size: ${convertPixelToRem(14)};
color: ${(props) => props.theme.$color_black};
`

export const ImageItem = styled(Image)`
  width: ${convertPixelToRem(20)};
  height: ${convertPixelToRem(20)};
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) => props.theme.$tw_red_100};
  border: solid ${convertPixelToRem(1)}  ${(props) => props.theme.$tw_red_500}
`;

export const FooterBackgroundCorrect = styled.div`
  background-color: ${(props) => props.theme.$tw_blue_100};
  border-top: ${convertPixelToRem(1)} solid ${(p) => p.theme.$border_signup};
  padding: ${convertPixelToRem(40)} ${convertPixelToRem(64)};
  display: flex;
  justify-content: space-between;
`

export const FooterBackgroundFalse = styled.div`
  background-color: ${(props) => props.theme.$tw_red_100};
  border-top: ${convertPixelToRem(1)} solid ${(p) => p.theme.$border_signup}; 
    padding: ${convertPixelToRem(40)} ${convertPixelToRem(64)};
    display: flex;
    justify-content: space-between;
`

export const FooterCorrect = styled.div<{ src?: string }>`
  color: ${(props) => props.theme.auth.$progress};
  font-size: ${convertPixelToRem(16)};
  font-weight: 600;
  margin-bottom: ${convertPixelToRem(16)};
  ${({ src }) => src && `background-image: url(${src});`}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: ${convertPixelToRem(60)}; 
`;

export const FooterFalse= styled.div<{ src?: string }>`
  color: ${(props) => props.theme.$tw_red_600};
  font-size: ${convertPixelToRem(16)};
  font-weight: 600;
  margin-bottom: ${convertPixelToRem(16)};
  ${({ src }) => src && `background-image: url(${src});`}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: ${convertPixelToRem(60)}; 
`;

export const ContinueText = styled.p`
  font: ${convertPixelToRem(12)};
  color: ${(props)=> props.theme.$text_secondary};
`

export const Instruct = styled.div`
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(32)};
  display: flex;
  align-items: start;
  gap: ${convertPixelToRem(20)};
`;

export const InstructTitle = styled.div`
  padding: ${convertPixelToRem(4)} ${convertPixelToRem(12)};
  border-radius: ${convertPixelToRem(100)};
  background-color: #eef2ff;
  box-shadow: 0 ${convertPixelToRem(2)} ${convertPixelToRem(2)} #081f63b2;
  font-weight: bold;
  position: relative;
  color: ${(p) => p.theme.auth.$only_black};
`;

export const InstructTitleImg = styled.img`
  position: absolute;
  bottom: ${convertPixelToRem(0)};
  left: -${convertPixelToRem(1)};
`;