import styled from "styled-components";
import { Button, Form } from "antd";
import { convertPixelToRem } from "@/utils/func/convertRem";

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(24)};
  margin-top: ${convertPixelToRem(40)};
  padding-left: ${convertPixelToRem(20)}
`;

export const Header = styled.div`
    display: flex; 
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const FormCreate = styled(Form)`
width: ${convertPixelToRem(800)};
`;

export const FormSearch = styled(Form)`
margin-left: 35%;
`
export const ButtonReset = styled(Button)`
margin-left: ${convertPixelToRem(8)}
`

export const Select = styled.div`
display: flex;
gap: ${convertPixelToRem(14)};
margin-left: 50%;
`;

export const ItemCreate = styled(Form.Item)`
  font-weight: 600;
`;