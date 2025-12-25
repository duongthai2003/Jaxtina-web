import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  message,
} from "antd";
import styled from "styled-components";
import {
  useCreateTopic,
  useGetTopicById,
  useUpdateTopic,
} from "@/hooks/useTopic";
import { useAllBook } from "@/hooks/useBookQuery";
import { CreateTopicPayload } from "@/hooks/useTopic";
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import { InputUpload } from "@/components/Upload";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { COMMON_MESSAGE } from "@/utils/messages";
import { PATHS } from "@/routers/path";
const TopicDetail: React.FC = () => {
  const [form] = Form.useForm<CreateTopicPayload>();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { createTopic, status: createStatus } = useCreateTopic();
  const { updateTopic, status: updateStatus } = useUpdateTopic();
  const { data: topicDetail, isLoading: loadingDetail } = useGetTopicById(
    id || ""
  );
  const { data: bookData } = useAllBook();

  const topicData = useMemo(() => {
    const raw = (topicDetail as any)?.data ?? topicDetail;
    return raw as any;
  }, [topicDetail]);

  const bookOptions = useMemo(
    () =>
      (bookData?.data ?? []).map((b: any) => ({
        label: b.name,
        value: b._id,
      })),
    [bookData]
  );

  useEffect(() => {
    if (topicData) {
      form.setFieldsValue({
        name: topicData.name,
        code: topicData.code,
        bookId: topicData.bookId,
        description: topicData.description,
        image: topicData.image,
        order: topicData.order,
      });
    }
  }, [form, topicData]);

  const onFinish = async (values: CreateTopicPayload) => {
    try {
      if (isEdit && id) {
        await updateTopic({ id, data: values });
        message.success(COMMON_MESSAGE.TOPIC_UPDATE_SUCCESS);
      } else {
        await createTopic({ data: values });
        message.success(COMMON_MESSAGE.TOPIC_CREATE_SUCCESS);
      }
      navigate(PATHS.private.admin.topic.list());
    } catch (err) {}
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
            label: "Chi tiết chủ đề",
            separator: "/",
            path: PATHS.private.admin.topic.detail(id || ""),
          },
        ]}
      />
      <Card title={isEdit ? "Chi tiết chủ đề" : "Tạo chủ đề"} bordered={false}>
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
            <Input placeholder="Ví dụ: Chủ đề giao tiếp" />
          </Form.Item>

          <Form.Item
            label="Mã chủ đề"
            name="code"
            rules={[{ required: true, message: "Nhập mã chủ đề" }]}
          >
            <Input placeholder="Ví dụ: communication" disabled={isEdit} />
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
                (option?.label as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
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
            label="Ảnh"
            name="image"
            rules={[
              { required: true, message: "Vui lòng chọn hoặc upload ảnh" },
            ]}
            valuePropName="value"
            trigger="onChangeInput"
          >
            <InputUpload mode="image" accept="image/*" maxSizeMB={5} />
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
                loading={
                  createStatus === "pending" ||
                  updateStatus === "pending" ||
                  loadingDetail
                }
              >
                {isEdit ? "Lưu thay đổi" : "Lưu"}
              </Button>
              <Button
                onClick={() => navigate(PATHS.private.admin.topic.list())}
              >
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

export default TopicDetail;
