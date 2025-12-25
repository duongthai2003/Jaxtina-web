import { useState } from "react";
import { Col, Form, Modal, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";
import { POP } from "@/components/PopupVerifyEmail/style";
import { ST } from "@/modules/public/auth/login/style";
import { BaseTag } from "@/utils/baseTagHTML";
import { reportMessage } from "@/utils/constants";
import { requiredValidate } from "@/utils/validator";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { ExerciseModalProps } from "@/utils/type";
import { icons } from "@/assets";

const Report = ({ isOpen, setIsOpen }: ExerciseModalProps) => {
  const [active, setActive] = useState<number | null>(null);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsOpen(false);
  };

  const onFinish = async (values: any) => {
    console.log("call api");
  };
  return (
    <BaseTag.div>
      <ReModal centered open={isOpen} closable={false} footer={false}>
        <ReWrapper
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          noValidate
        >
          <ReContent>
            <ReIcon>
              <Gif src={icons.jaxSadGif} alt="" />
              <BaseTag.p>Vấn đề bạn gặp phải</BaseTag.p>
            </ReIcon>
            <ReRow gutter={[12, 12]}>
              {reportMessage.map((item) => {
                return (
                  <Col md={12} lg={12} key={item.id}>
                    <ReContentItem
                      onClick={() => {
                        setActive(item.id);
                      }}
                      $active={active === item.id}
                    >
                      {item.message}
                    </ReContentItem>
                  </Col>
                );
              })}
            </ReRow>
            {active === 6 && (
              <ReMessage>
                <ST.FormItem name={"message"} rules={[requiredValidate()]}>
                  <TextArea
                    rows={4}
                    placeholder="Chi tiết vấn đề bạn gặp phải..."
                    maxLength={5}
                  />
                </ST.FormItem>
              </ReMessage>
            )}
          </ReContent>
          <ReFooter>
            <BaseTag.div>
              <POP.ConfirmButtonItem onClick={handleCancel} title="Hủy" />
            </BaseTag.div>
            <BaseTag.div>
              <BaseTag.div>
                <POP.ConfirmButtonItem type="submit" title="Gửi" />
              </BaseTag.div>
            </BaseTag.div>
          </ReFooter>
        </ReWrapper>
      </ReModal>
    </BaseTag.div>
  );
};

export default Report;
const ReModal = styled(Modal)`
  &.ant-modal {
    border-radius: ${convertPixelToRem(16)};
    overflow: hidden;
    width: ${convertPixelToRem(1000)} !important;
  }
  && .ant-modal-content {
    min-height: ${convertPixelToRem(700)};
    padding: 0;
    display: flex;
    flex-direction: column;
    & .ant-modal-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    & .ant-modal-footer {
      display: none;
    }
  }
`;

const ReWrapper = styled(Form)`
  padding: ${convertPixelToRem(20)} ${convertPixelToRem(30)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;
const ReIcon = styled.div`
  font-weight: bold;
  font-size: ${convertPixelToRem(15)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Gif = styled.img`
  width: ${convertPixelToRem(75)};
`;
const ReRow = styled(Row)`
  padding-top: ${convertPixelToRem(15)};
`;
const ReContent = styled.div``;
const ReContentItem = styled.div<{ $active: boolean }>`
  padding: ${convertPixelToRem(10)} ${convertPixelToRem(12)};
  border: ${convertPixelToRem(2)} solid ${(p) => p.theme.$border_signup};
  border-radius: ${convertPixelToRem(14)};
  display: flex;
  justify-content: center;
  font-size: ${convertPixelToRem(14)};
  background-color: ${(p) => (p.$active ? p.theme.$tw_indigo_500 : "")};
  color: ${(p) => (p.$active ? p.theme.$color_white : "")};
  text-align: center;
  height: 100%;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(p) => p.theme.$tw_indigo_500};
    color: ${(p) => p.theme.$color_white};
  }
`;

const ReFooter = styled(POP.ConfirmButton)`
  width: 100%;
`;
const ReMessage = styled.div`
  margin-top: ${convertPixelToRem(50)};
`;
