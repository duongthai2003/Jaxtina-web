import React from "react";
import { useNavigate } from "react-router-dom";
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import { PATHS } from "@/routers/path";
import { ButtonBox, Container, CustomButton, Wrapper } from "../style/styleBook";
import TableListBook from "./TableListBook";

const BookList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
    <CommonBreadcrumb
      items={[
        {
          label: 'Quản lý sách',
          separator: '',
          path: '',
        },
        {
          label: 'Danh sách sách',
          separator: '/',
          path: PATHS.private.admin.book.bookList(),
        },
      ]}
    />
    <Container>
      <ButtonBox>
        <CustomButton
          onClick={() => {
            navigate(PATHS.private.admin.book.bookCreate());
          }}
        >
          Tạo mới
        </CustomButton>
      </ButtonBox>
    </Container>
    <TableListBook />
  </Wrapper>
  );
};

export default BookList
