import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, InputNumber, Space, message } from "antd";
import styled from "styled-components";
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import { InputUpload } from "@/components/Upload";
import { useCreateBook } from "@/hooks/useBookQuery";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { COMMON_MESSAGE } from "@/utils/messages";
import { CreateBookPayload } from "@/modules/private/user/book/type";
import { PATHS } from "@/routers/path";

const BookCreate: React.FC = () => {
  const [form] = Form.useForm<CreateBookPayload>();
  const navigate = useNavigate();
  const { createBook, status } = useCreateBook();

  const onFinish = async (values: CreateBookPayload) => {
    try {
      await createBook({ data: values });
      message.success(COMMON_MESSAGE.BOOK_CREATE_SUCCESS);
      navigate(PATHS.private.admin.book.bookList());
    } catch (err) {
    }
  }

  return (
    <PageWrapper>
      <CommonBreadcrumb
        items={[
          {
            label: "Quản lý sách",
            separator: "",
            path: PATHS.private.admin.book.bookList(),
          },
          {
            label: "Tạo sách",
            separator: "/",
            path: PATHS.private.admin.book.bookCreate(),
          },
        ]}
      />
      <Card title="Tạo sách" bordered={false}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ order: 1 }}
        >
          <Form.Item
            label="Tên sách"
            name="name"
            rules={[{ required: true, message: "Nhập tên sách" }]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Mã sách"
            name="code"
            rules={[{ required: true, message: "Nhập mã sách" }]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Nhập mô tả" }]}
          >
            <Input.TextArea
              placeholder="Nhập mô tả"
              rows={4}
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="Đường dẫn"
            name="path"
            rules={[{ required: true, message: "Nhập đường dẫn" }]}
          >
            <Input
              placeholder="Nhập đường dẫn"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="Loại sách"
            name="type"
            rules={[{ required: true, message: "Nhập loại sách" }]}
          >
            <Input
              placeholder="Nhập loại sách"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="url"
            rules={[{ required: true, message: "Vui lòng chọn hoặc upload ảnh" }]}
            valuePropName="value"
            trigger="onChangeInput"
          >
            <InputUpload
              mode="image"
              accept="image/*"
              maxSizeMB={5}
            />
          </Form.Item>

          <Form.Item
            label="Ảnh nền"
            name="background_url"
            rules={[{ required: true, message: "Vui lòng chọn hoặc upload ảnh" }]}
            valuePropName="value"
            trigger="onChangeInput"
          >
            <InputUpload
              mode="image"
              accept="image/*"
              maxSizeMB={5}
            />

          </Form.Item>

          <Form.Item
            label="Ảnh roadmap"
            name="road_url"
            rules={[{ required: false, message: "Vui lòng chọn hoặc upload ảnh" }]}
            valuePropName="value"
            trigger="onChangeInput"
          >
            <InputUpload
              mode="image"
              accept="image/svg+xml/*"
              maxSizeMB={5}
            />
          </Form.Item>

          <Form.Item
            label="Thứ tự"
            name="order"
            rules={[{ required: true, message: "Nhập thứ tự" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={status === "pending"}
              >
                Lưu
              </Button>
              <Button onClick={() => navigate(PATHS.private.admin.book.bookList())}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: ${convertPixelToRem(24)};

  .ant-card {
    background: ${(p) => p.theme.topic.table_bg};
    color: ${(p) => p.theme.topic.table_text};
  }
  .ant-card-head-title {
    color: ${(p) => p.theme.topic.table_text};
  }
  label {
    color: ${(p) => p.theme.topic.table_text};
  }
`;

export default BookCreate;


