import React, { useEffect, useMemo, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message, Typography } from "antd";
import type { UploadFile, UploadProps } from "antd";
import type { RcFile, UploadRequestOption as RcUploadRequestOption } from "rc-upload/lib/interface";
import { useUploadImgMutation } from "@/hooks/useUploadImg";

const { Dragger } = Upload;
const { Paragraph } = Typography;

type ImageUploadDraggerProps = {
  value?: string;
  onChange?: (url: string) => void;
  accept?: string;
  maxSizeMB?: number;
  fieldName?: string;
  extraFields?: Record<string, string | Blob>;
  disabled?: boolean;
  tip?: React.ReactNode;
};

const ImageUploadDragger: React.FC<ImageUploadDraggerProps> = ({
  value,
  onChange,
  accept = "image/*",
  maxSizeMB = 5,
  fieldName = "file",
  extraFields,
  disabled,
  tip,
}) => {
  const { uploadFile, isPending } = useUploadImgMutation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: "existing-image",
          name: value.split("/").at(-1) ?? "image",
          status: "done",
          url: value,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [value]);

  const maxSizeBytes = useMemo(() => maxSizeMB * 1024 * 1024, [maxSizeMB]);

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    if (maxSizeMB && file.size > maxSizeBytes) {
      message.error(`Ảnh vượt quá ${maxSizeMB}MB`);
      return Upload.LIST_IGNORE;
    }
    if (accept && !file.type.startsWith("image/")) {
      message.error("Vui lòng chọn đúng định dạng ảnh");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleCustomRequest = async (options: RcUploadRequestOption) => {
    const rcFile = options.file as RcFile;

    setFileList([
      {
        uid: rcFile.uid,
        name: rcFile.name,
        status: "uploading",
      },
    ]);

    try {
      const url = await uploadFile({
        file: rcFile,
        fieldName,
        filename: rcFile.name,
        extraFields,
      });

      const nextFile: UploadFile = {
        uid: rcFile.uid,
        name: rcFile.name,
        status: "done",
        url,
      };

      setFileList([nextFile]);
      onChange?.(url);
      options.onSuccess?.({ url });
    } catch (error) {
      setFileList([
        {
          uid: rcFile.uid,
          name: rcFile.name,
          status: "error",
        },
      ]);
      message.error("Tải ảnh thất bại. Vui lòng thử lại.");
      options.onError?.(error as Error);
    }
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: nextList }) => {
    setFileList(nextList);
    if (nextList.length === 0) {
      onChange?.("");
    }
  };

  return (
    <Dragger
      name={fieldName}
      multiple={false}
      accept={accept}
      maxCount={1}
      fileList={fileList}
      customRequest={handleCustomRequest}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onRemove={() => {
        setFileList([]);
        onChange?.("");
      }}
      disabled={disabled || isPending}
      showUploadList
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Kéo thả hoặc bấm để tải ảnh lên</p>
      <Paragraph type="secondary" style={{ marginBottom: 0 }}>
        {tip ?? `Hỗ trợ 1 ảnh, tối đa ${maxSizeMB}MB.`}
      </Paragraph>
    </Dragger>
  );
};

export default ImageUploadDragger;
