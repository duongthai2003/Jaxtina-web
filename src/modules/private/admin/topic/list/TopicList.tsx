import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import TableListTopic from "./TableListTopic";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { PATHS } from "@/routers/path";
const TopicList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
    <CommonBreadcrumb
      items={[
        {
          label: 'Quản lý chủ đề',
          separator: '',
          path: '',
        },
        {
          label: 'Danh sách chủ đề',
          separator: '/',
          path: PATHS.private.admin.topic.list(),
        },
      ]}
    />
    <Container>
      <ButtonBox>
        <CustomButton
          onClick={() => {
            navigate(PATHS.private.admin.topic.create());
          }}
        >
          Tạo mới
        </CustomButton>
      </ButtonBox>
    </Container>
    <TableListTopic />
  </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(10)};
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${convertPixelToRem(65)};
  background: ${(p) => p.theme.topic.bg_container};
  border-radius: ${convertPixelToRem(8)};
  gap: ${convertPixelToRem(40)};
  position: relative;
  margin-bottom: ${convertPixelToRem(15)};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.25rem 0.25rem 0px
`;

const CustomButton = styled(Button)`
  width: ${convertPixelToRem(101)};
  border-radius: ${convertPixelToRem(4)};
  background: ${(p) => p.theme.$tw_red_600};
  color: ${(p) => p.theme.topic.title_color} !important;
  text-align: center;
  font-size: ${convertPixelToRem(14)};
  font-style: normal;
  font-weight: 400;
  line-height: ${convertPixelToRem(24)};
  letter-spacing: ${convertPixelToRem(0.028)};
  border: none;
  outline: none;

  &:hover {
    background: ${(p) => p.theme.$tw_red_600} !important;
    color: ${(p) => p.theme.topic.title_color} !important;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${convertPixelToRem(10)};
  position: absolute;
  right: ${convertPixelToRem(10)};
  top: ${convertPixelToRem(16)};
`;
export default TopicList;

