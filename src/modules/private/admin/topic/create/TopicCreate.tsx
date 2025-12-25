import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, InputNumber, Select, Space, message } from "antd";
import styled from "styled-components";
import { useCreateTopic } from "@/hooks/useTopic";
import { useAllBook } from "@/hooks/useBookQuery";
import { CreateTopicPayload } from "@/hooks/useTopic";
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import { InputUpload } from "@/components/Upload";
import { PATHS } from "@/routers/path";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { COMMON_MESSAGE } from "@/utils/messages";

const TopicCreate: React.FC = () => {
  const [form] = Form.useForm<CreateTopicPayload>();
  const navigate = useNavigate();
  const { createTopic, status } = useCreateTopic();
  const { data: bookData } = useAllBook();

  const bookOptions = useMemo(
    () =>
      (bookData?.data ?? []).map((b) => ({
        label: b.name,
        value: b._id,
      })),
    [bookData]
  );

  const onFinish = async (values: CreateTopicPayload) => {
    try {
      await createTopic({ data: values });
      message.success(COMMON_MESSAGE.TOPIC_CREATE_SUCCESS);
      navigate(PATHS.private.admin.topic.list());
    } catch (err) {
    }
  };

  return (
    <PageWrapper>
      <CommonBreadcrumb
        items={[
          {
            label: "Quản lý chủ đề",
            separator: "",
            path: PATHS.private.admin.topic.list(),
          },
          {
            label: "Tạo chủ đề",
            separator: "/",
            path: PATHS.private.admin.topic.create(),
          },
        ]}
      />
      <Card title="Tạo chủ đề" bordered={false}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ order: 1 }}
        >
          <Form.Item
            label="Tên chủ đề"
            name="name"
            rules={[{ required: true, message: "Nhập tên chủ đề" }]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Mã chủ đề"
            name="code"
            rules={[{ required: true, message: "Nhập mã chủ đề" }]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Sách"
            name="bookId"
            rules={[{ required: true, message: "Chọn sách" }]}
          >
            <Select
              placeholder="Chọn sách"
              options={bookOptions}
              loading={!bookData}
              showSearch
              filterOption={(input, option) =>
                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
              }
            />
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
            label="Ảnh"
            name="image"
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
              <Button onClick={() => navigate(PATHS.private.admin.topic.list())}>
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

export default TopicCreate;

