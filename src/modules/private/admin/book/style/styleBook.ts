import { convertPixelToRem } from "@/utils/func/convertRem";
import { Button } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(10)};
`;

export const Container = styled.div`
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

export const CustomButton = styled(Button)`
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
export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${convertPixelToRem(10)};
  position: absolute;
  right: ${convertPixelToRem(10)};
  top: ${convertPixelToRem(16)};
`;

export const WrapperList = styled.div`
  background: ${(p) => p.theme.topic.table_bg};
  .ant-pagination-options {
    display: none !important;
  }
  .ant-pagination .ant-pagination-item {
    border: none;
  }
  .ant-pagination {
    background: ${(p) => p.theme.topic.table_bg};
    margin: 0 !important;
    padding: ${convertPixelToRem(20)} 0;
  }
`;
export const WrapperTable = styled.div`
  .ant-table-content {
    table {
      /* height: ${convertPixelToRem(700)}; */
    }
  }
  .ant-table-wrapper {
    background: ${(p) => p.theme.topic.table_bg};

    scrollbar-color: ${(p) => p.theme.topic.table_border} ${(p) => p.theme.topic.table_bg};
    &::-webkit-scrollbar {
      height: ${convertPixelToRem(8)};
      width: ${convertPixelToRem(8)};
      background: ${(p) => p.theme.topic.table_bg};
    }
    &::-webkit-scrollbar-track {
      background: ${(p) => p.theme.topic.table_bg};
    }
    &::-webkit-scrollbar-thumb {
      background: ${(p) => p.theme.topic.table_border};
      border-radius: ${convertPixelToRem(4)};
    }

    .ant-table-container,
    .ant-table-content,
    .ant-table-body {
      background: ${(p) => p.theme.topic.table_bg};
    }

    .ant-spin {
      height: ${convertPixelToRem(700)};
      max-height: ${convertPixelToRem(700)};
    }
  }
  .ant-table {
    background: ${(p) => p.theme.topic.table_bg};
  }
  .ant-table-thead > tr > th {
    background: ${(p) => p.theme.topic.table_header_bg} !important;
    color: ${(p) => p.theme.topic.table_text};
    border-color: ${(p) => p.theme.topic.table_border};
  }
  .ant-table-tbody > tr > td {
    background: ${(p) => p.theme.topic.table_bg};
    color: ${(p) => p.theme.topic.table_text_secondary};
    border-color: ${(p) => p.theme.topic.table_border};
  }
  .ant-table-tbody > tr:hover > td {
    background: ${(p) => p.theme.topic.table_row_hover} !important;
  }
  .ant-table-placeholder {
    background: ${(p) => p.theme.topic.table_empty_bg};
  }
`;
export const Text = styled.div`
  font-size: ${convertPixelToRem(15)};
  font-weight: 400;
  line-height: ${convertPixelToRem(18)};
  letter-spacing: ${convertPixelToRem(0.8)};
  color: ${(p) => p.theme.topic.table_text_secondary};
`;
export const BoxAction = styled.div`
  display: flex;
  gap: ${convertPixelToRem(10)};
`;
export const BoxColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${convertPixelToRem(10)};
  align-items: center;
`;

export const WrapperFilter = styled.div`
  background: ${(p) => p.theme.book.$background};
  box-shadow: 0 0 ${convertPixelToRem(10)} 0 rgba(0, 0, 0, 0.1);
  padding: ${convertPixelToRem(30)} ${convertPixelToRem(30)} 0 ${convertPixelToRem(30)};
  .ant-select-selection-item {
    font-size: ${convertPixelToRem(14)} !important;
  }
`;
export const RowForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${convertPixelToRem(10)};
  .ant-picker {
    width: 100%;
  }
`;
export const TextFind = styled.div`
  width: calc(100% - ${convertPixelToRem(30)});
  text-align: center;
`;
export const BoxFind = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${convertPixelToRem(2)} ${convertPixelToRem(8)} ${convertPixelToRem(2)} ${convertPixelToRem(4)};
  gap: ${convertPixelToRem(10)};
`;
export const BtnFind = styled.div`
  width: ${convertPixelToRem(112)};
  border-radius: ${convertPixelToRem(8)};
  height: ${convertPixelToRem(31)};
  align-items: center;
  justify-content: flex-start;
  display: flex;
  background: ${(p) => p.theme.$tw_sky_600};
  color: ${(p) => p.theme.topic.title_color};
  gap: ${convertPixelToRem(10)};
  cursor: pointer;
`;