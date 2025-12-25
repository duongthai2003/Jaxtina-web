import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Form, Input, InputNumber, Space, message } from "antd";
import styled from "styled-components";
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import { InputUpload } from "@/components/Upload";
import { useCreateBook, useGetBookById, useUpdateBook } from "@/hooks/useBookQuery";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { COMMON_MESSAGE } from "@/utils/messages";
import { PATHS } from "@/routers/path";
import { CreateBookPayload } from "@/modules/private/user/book/type";

const BookDetail: React.FC = () => {
  const [form] = Form.useForm<CreateBookPayload>();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { createBook, status: createStatus } = useCreateBook();
  const { updateBook, status: updateStatus } = useUpdateBook();
  const { data: bookDetail, isLoading: loadingDetail } = useGetBookById(id || "");

  const bookData = useMemo(() => {
    const raw = (bookDetail as any)?.data ?? bookDetail;
    return raw as any;
  }, [bookDetail]);

  useEffect(() => {
    if (bookData) {
      form.setFieldsValue({
        name: bookData.name,
        code: bookData.code,
        url: bookData.url,
        type: bookData.type,
        path: bookData.path,
        description: bookData.description,
        background_url: bookData.background_url,
        road_url: bookData.road_url
      });
    }
  }, [form, bookData]);

  const onFinish = async (values: CreateBookPayload) => {
    try {
      if (isEdit && id) {
        await updateBook({ id, data: values });
        message.success(COMMON_MESSAGE.BOOK_UPDATE_SUCCESS);
      } else {
        await createBook({ data: values });
        message.success(COMMON_MESSAGE.BOOK_CREATE_SUCCESS);
      }
      navigate(PATHS.private.admin.book.bookList());
    } catch (err) {
    }
  };

  return (
    <PageWrapper>
      <CommonBreadcrumb
        items={[
          {
            label: 'Quản lý sách',
            separator: '',
            path: PATHS.private.admin.book.bookList(),
          },
          {
            label: 'Chi tiết sách',
            separator: '/',
            path: PATHS.private.admin.book.bookDetail(id || ''),
          },
        ]}
      />
      <Card title={isEdit ? "Chi tiết sách" : "Tạo sách"} bordered={false}>
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
            <Input placeholder="Ví dụ: COMPLETE ENGLISH" />
          </Form.Item>

          <Form.Item
            label="Mã sách"
            name="code"
            rules={[{ required: true, message: "Nhập mã sách" }]}
          >
            <Input placeholder="Ví dụ: COMPLETE_ENGLISH" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Nhập mô tả" }]}
          >
            <Input.TextArea
              placeholder="Mô tả ngắn gọn"
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
              accept="image/*"
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
                loading={createStatus === "pending" || updateStatus === "pending" || loadingDetail}
              >
                {isEdit ? "Lưu thay đổi" : "Lưu"}
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
};

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

export default BookDetail;
