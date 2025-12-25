import styled from "styled-components";
import { Col, Row } from "antd";
import { ButtonPractice } from "../practiceByGame/gameFlipCard/style";
import { BaseTag } from "@/utils/baseTagHTML";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { images } from "@/assets";

type Props = {
  item: {
    word: string;
    ipa: string;
    text: string;
    meaningVocab: string;
  };
  position: { x: number; y: number };
};

export const VocabPopup = ({
    item,
    position,
}: Props) => {
    return (
        <Popup
            style={{
                left: position.x -100,
                top: position.y - 180,
            }}
        >
            <Row align="middle">
                <Col span={18}>
                    <NewWord>{item.word}</NewWord>
                    <BaseTag.p>{item.ipa}</BaseTag.p>
                    <Meaning>
                        <BaseTag.img src={images.flagVietNam} />
                        <BaseTag.p>{item.meaningVocab}</BaseTag.p>
                    </Meaning>
                </Col>
                <Col span={6}>
                    <SoundButton>
                        <BaseTag.img src="/src/assets/icons/volume.svg" />
                    </SoundButton>
                </Col>
            </Row>
            <ButtonPractice>Thêm từ vựng</ButtonPractice>
        </Popup>
    );
};

const Popup = styled.div`
  position: fixed;
  background: ${(props) => props.theme.$bg_white};
  padding: ${convertPixelToRem(12)};
  border-radius: ${convertPixelToRem(12)};
  box-shadow: 0 ${convertPixelToRem(4)} ${convertPixelToRem(20)} ${(props) => props.theme.$tw_gray_400} ;
  z-index: 999;
  pointer-events: none;
`;

const NewWord = styled.p`
    font-size: ${convertPixelToRem(16)};
    line-height: ${convertPixelToRem(24)};
    font-weight: 700;
    color: ${(props) => props.theme.$bg_blue_900}
`;

const SoundButton = styled.div`
  width: ${convertPixelToRem(40)};
  height: ${convertPixelToRem(40)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: ${convertPixelToRem(1)} solid ${(props) => props.theme.$tw_red_200};
`;

const Meaning = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(8)};
`;



