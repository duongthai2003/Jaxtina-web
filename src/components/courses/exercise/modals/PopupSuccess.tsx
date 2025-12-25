import { Modal } from "antd";
import styled from "styled-components";
import { EX } from "@/modules/public/courses/exercise/style";
import { BaseTag } from "@/utils/baseTagHTML";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { ExerciseModalProps } from "@/utils/type";
import { icons } from "@/assets";

const PopupSuccess = ({ isOpen, onClick, setIsOpen }: ExerciseModalProps) => {
  return (
    <SuccessModalAntd centered closable={false} open={isOpen} footer={false}>
      <SuccBlock>
        <Content>
          <BaseTag.img src={icons.successBlue} alt="" />
          <BaseTag.div>
            <SuccessTitle>Chính xác</SuccessTitle>
            <Explain>Giải thích</Explain>
          </BaseTag.div>
        </Content>

        <SuccessButton onClick={onClick} title="Kiểm tra" />
      </SuccBlock>
    </SuccessModalAntd>
  );
};

export default PopupSuccess;
const SuccessModalAntd = styled(Modal)`
  &&.ant-modal {
    vertical-align: bottom;
    width: 100% !important;
    max-width: 100%;
    & .ant-modal-content {
      border-radius: 0;
      padding: ${convertPixelToRem(30)} ${convertPixelToRem(64)};
      background-color: ${(p) => p.theme.$tw_blue_100};
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
  gap: ${convertPixelToRem(25)};
  color: ${(p) => p.theme.auth.$only_black};
`;
const SuccBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SuccessTitle = styled.p`
  font-weight: 700;
  font-size: ${convertPixelToRem(20)};
  color: ${(p) => p.theme.$tw_indigo_800};
`;
const SuccessButton = styled(EX.buttonSubmit)`
  background-color: ${(p) => p.theme.$tw_indigo_500};
`;
const Explain = styled.div`
  display: flex;
  gap: ${convertPixelToRem(8)};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
