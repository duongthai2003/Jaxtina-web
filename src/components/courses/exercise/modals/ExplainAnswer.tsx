import styled from "styled-components";
import { Modal } from "antd";
import Button from "@/components/Login/Button";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { ExerciseModalProps } from "@/utils/type";
import { BaseTag } from "@/utils/baseTagHTML";
import { images } from "@/assets";

const ExplainAnswer = ({ isOpen, setIsOpen }: ExerciseModalProps) => {
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <BaseTag.div>
      <AntModal centered open={isOpen} closable={false} footer={false}>
        <ExWrapper>
          <ExHeader>
            <ExHeaderImg src={images.light} alt="" />
            <BaseTag.p>Giải thích đáp án</BaseTag.p>
          </ExHeader>
          <ExContentWrapper>
            <ExContent>
              Have you noticed how much AI is changing our world? Bạn có nhận
              thấy trí tuệ nhân tạo đang thay đổi thế giới của chúng ta nhiều
              như thế nào không?
            </ExContent>
            <ExButton title="Đã hiểu" onClick={handleCancel} />
          </ExContentWrapper>
        </ExWrapper>
      </AntModal>
    </BaseTag.div>
  );
};

export default ExplainAnswer;
const AntModal = styled(Modal)`
  &.ant-modal {
    border-radius: ${convertPixelToRem(16)};
    overflow: hidden;
    width: ${convertPixelToRem(650)} !important;
  }
  && .ant-modal-content {
    min-height: ${convertPixelToRem(400)};
    padding: 0;
    display: flex;
    flex-direction: column;

    & .ant-modal-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
`;

const ExWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ExHeader = styled.div`
  display: flex;
  gap: ${convertPixelToRem(10)};
  align-items: center;
  justify-content: center;
  font-size: ${convertPixelToRem(18)};
  color: ${(p) => p.theme.auth.$ex_header};
  font-weight: bold;
  padding: ${convertPixelToRem(10)} 0;
  background-color: ${(p) => p.theme.auth.$menu_hover};
`;
const ExHeaderImg = styled.img`
  width: ${convertPixelToRem(30)};
`;
const ExContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 0 ${convertPixelToRem(20)};
`;
const ExContent = styled.div`
  font-size: ${convertPixelToRem(14)};
  padding-top: ${convertPixelToRem(10)};
`;
const ExButton = styled(Button)`
  width: 100%;
  background-color: ${(p) => p.theme.$tw_indigo_800};
  min-height: ${convertPixelToRem(44)};
`;
