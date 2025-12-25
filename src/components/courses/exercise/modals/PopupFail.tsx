import { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "antd";
import Report from "./Report";
import ExplainAnswer from "./ExplainAnswer";
import { EX } from "@/modules/public/courses/exercise/style";
import { ExerciseModalProps } from "@/utils/type";
import { BaseTag } from "@/utils/baseTagHTML";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { icons, images } from "@/assets";

const PopupFail = ({ isOpen, onClick, setIsOpen }: ExerciseModalProps) => {
  const [isOpenExAnswerPopup, setIsOpenExAnswerPopup] = useState(false);
  const [isReport, setIsReport] = useState(false);
  return (
    <ModalAntd
      centered
      closable={false}
      open={isOpen}
      footer={false}
      onCancel={() => {
        setIsOpen(false);
      }}
    >
      <Block>
        <Content>
          <FailTitleBlock>
            <FailTitleImg src={icons.cancel} alt="" />
            <ContentTitle>Chưa chính xác</ContentTitle>
          </FailTitleBlock>
          <EX.buttonCancel onClick={onClick} title="Bỏ qua" />
        </Content>

        <FButtonBlock>
          <FailExplainBlock>
            <Explain
              onClick={() => {
                setIsOpenExAnswerPopup(true);
              }}
            >
              <BaseTag.p>Giải thích</BaseTag.p>
              <BaseTag.img src={icons.infoIcon} alt="" />
            </Explain>
            <ReportFlag onClick={() => setIsReport(true)}>
              <ReportFlagImg src={images.redFlag} alt="" />
            </ReportFlag>
          </FailExplainBlock>
          <FailButtonRedo
            onClick={() => {
              setIsOpen(false);
            }}
            title="Làm lại"
          />
        </FButtonBlock>
      </Block>
      <ExplainAnswer
        setIsOpen={setIsOpenExAnswerPopup}
        isOpen={isOpenExAnswerPopup}
      />
      <Report setIsOpen={setIsReport} isOpen={isReport} />
    </ModalAntd>
  );
};

export default PopupFail;

const ModalAntd = styled(Modal)`
  &&.ant-modal {
    vertical-align: bottom;
    width: 100% !important;
    max-width: 100%;
    & .ant-modal-content {
      border-radius: 0;
      padding: ${convertPixelToRem(30)} ${convertPixelToRem(64)};
      background-color: ${(p) => p.theme.$tw_red_100};
    }
    & .ant-modal-footer {
      display: none;
    }
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: ${convertPixelToRem(25)};
  color: ${(p) => p.theme.auth.$only_black};
`;

const FailTitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(12)};
`;
const FailTitleImg = styled.img`
  width: ${convertPixelToRem(35)};
`;
const Block = styled.div`
  display: flex;
  justify-content: space-between;

  gap: ${convertPixelToRem(40)};
`;

const ContentTitle = styled.p`
  font-weight: 700;
  font-size: ${convertPixelToRem(20)};
  color: ${(p) => p.theme.$tw_red_600};
`;
const FButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;
const FailButtonRedo = styled(Button)`
  max-width: ${convertPixelToRem(200)};
  background-color: ${(p) => p.theme.$tw_indigo_800};
`;

const Explain = styled.div`
  display: flex;
  gap: ${convertPixelToRem(8)};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const FailExplainBlock = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(20)};
`;
const ReportFlag = styled.div`
  padding: 0 ${convertPixelToRem(10)};
  &:hover {
    cursor: pointer;
  }
`;
const ReportFlagImg = styled.img`
  width: ${convertPixelToRem(20)};
`;
