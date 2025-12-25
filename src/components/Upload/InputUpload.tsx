import { useEffect, useMemo, useState } from "react";
import { Tooltip, Upload, UploadFile, Input, message, Button } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadRequestOption as RcUploadRequestOption } from "rc-upload/lib/interface";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { useUploadImgMutation } from "@/hooks/useUploadImg";
import { useUploadFileMutation } from "@/hooks/useUploadFile";
import JImage from "@/components/Image";
import { themes } from "@/configs/theme";
import { FILE_MESSAGE } from "@/utils/messages";

type Mode = "image" | "file";

interface Props {
  width?: number;
  label?: string;
  value?: string;
  accept?: string;
  onChange?: (value: UploadChangeParam<UploadFile<any>>) => void;
  onChangeInput?: (value: string) => void;
  url?: string;
  disabled?: boolean;
  mode?: Mode;
  fieldName?: string;
  maxSizeMB?: number;
  extraFields?: Record<string, string | Blob>;
  showPreview?: boolean;
  startEnabled?: boolean;
  enableLabel?: string;
  saveLabel?: string;
}

const InputUpload = ({
  width,
  label,
  value,
  onChange,
  accept,
  url,
  onChangeInput,
  disabled,
  mode = "file",
  fieldName,
  maxSizeMB = mode === "image" ? 5 : 10,
  extraFields,
  showPreview = true,
  startEnabled = false,
  enableLabel = "Sửa",
  saveLabel = "Lưu",
}: Props) => {
  const { uploadFile: uploadImage, isPending: isUploadingImg } = useUploadImgMutation();
  const { uploadFile: uploadFileApi, isPending: isUploadingFile } = useUploadFileMutation();
  const initialValue = value || url || "";
  const [previewUrl, setPreviewUrl] = useState<string>(initialValue);
  const [inputEnabled, setInputEnabled] = useState<boolean>(startEnabled);
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [lastValidUrl, setLastValidUrl] = useState<string>(initialValue);
  const [inlineError, setInlineError] = useState<string>("");

  const isUploading = isUploadingImg || isUploadingFile;
  const maxSizeBytes = useMemo(() => maxSizeMB * 1024 * 1024, [maxSizeMB]);
  const resolvedFieldName = fieldName ?? "file";

  useEffect(() => {
    const next = url || value || "";
    setInputValue(next);
    setPreviewUrl(next);
    setLastValidUrl(next);
    setInlineError("");
  }, [value, url]);

  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!url) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const handleInputChange = async (inputValue: string) => {
    const trimmed = inputValue?.trim() || "";
    setInputValue(inputValue);

    if (!trimmed) {
      setPreviewUrl("");
      onChangeInput?.("");
      setInlineError("");
      setLastValidUrl("");
      return;
    }

    if (mode === "image") {
      const isValid = await validateImageUrl(trimmed);
      if (!isValid) {
        setInlineError(FILE_MESSAGE.INVALID_IMAGE_LINK);
        setInputValue(lastValidUrl);
        setPreviewUrl(lastValidUrl);
        onChangeInput?.(lastValidUrl);
        return;
      }
    }

    setInlineError("");
    setPreviewUrl(trimmed);
    setLastValidUrl(trimmed);
    onChangeInput?.(trimmed);
  };

  const handleSave = async () => {
    const trimmed = (inputValue || "").trim();
    if (!trimmed) {
      setInlineError(FILE_MESSAGE.REQUIRED_IMAGE);
      onChangeInput?.("");
      return;
    }

    if (mode === "image") {
      const isValid = await validateImageUrl(trimmed);
      if (!isValid) {
        setInlineError(FILE_MESSAGE.INVALID_IMAGE_LINK);
        onChangeInput?.("");
        setPreviewUrl("");
        return;
      }
    }

    setInlineError("");
    setPreviewUrl(trimmed);
    setLastValidUrl(trimmed);
    onChangeInput?.(trimmed);
    setInputEnabled(false);
  };

  const beforeUpload = (file: RcFile) => {
    if (maxSizeMB && file.size > maxSizeBytes) {
      message.error(FILE_MESSAGE.MAX_SIZE.replace("{size}", maxSizeMB.toString()));
      return Upload.LIST_IGNORE;
    }
    if (mode === "image" && !file.type.startsWith("image/")) {
      message.error(FILE_MESSAGE.INVALID_IMAGE_TYPE);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleCustomRequest = async (options: RcUploadRequestOption) => {
    const rcFile = options.file as RcFile;

    try {
      const uploadFn = mode === "image" ? uploadImage : uploadFileApi;
      const uploadedUrl = await uploadFn({
        file: rcFile,
        fieldName: resolvedFieldName,
        filename: rcFile.name,
        extraFields,
      });

      setInlineError("");
      setInputValue(uploadedUrl);
      setPreviewUrl(uploadedUrl);
      setLastValidUrl(uploadedUrl);
      onChangeInput?.(uploadedUrl);
      options.onSuccess?.({ url: uploadedUrl });
    } catch (error) {
      message.error("Tải lên thất bại. Vui lòng thử lại.");
      options.onError?.(error as Error);
    }
  };

  return (
    <Container>
      <LabelWrapper>
        {label && <Label>{label}</Label>}
        <Upload
          disabled={disabled || isUploading}
          accept={accept}
          customRequest={handleCustomRequest}
          multiple={false}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={onChange}
        >
          <Tooltip title="Tải lên">
            <Button
              type="primary"
              icon={<UploadOutlined />}
              size="small"
              ghost
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              Upload
            </Button>
          </Tooltip>
        </Upload>
      </LabelWrapper>

      {showPreview && (previewUrl || value || url) && (
        <PreviewWrapper>
          <JImage
            src={(previewUrl || value || url) as string}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            preview={true}
          />
        </PreviewWrapper>
      )}

      <Input
        readOnly={disabled || !inputEnabled}
        style={width ? { width } : undefined}
        placeholder="Dán link ở đây..."
        value={inputValue}
        onChange={(e) => {
          setInlineError("");
          setInputValue(e.target.value);
        }}
        onBlur={(e) => {
          void handleInputChange(e.target.value);
        }}
        suffix={
          <SuffixWrap>
            {!inputEnabled && !disabled && (
              <Button type="default" size="small" onClick={() => setInputEnabled(true)}>
                {enableLabel}
              </Button>
            )}
            {inputEnabled && (
              <Button type="primary" size="small" onClick={handleSave}>
                {saveLabel}
              </Button>
            )}
          </SuffixWrap>
        }
      />
      {inlineError && <InlineError>{inlineError}</InlineError>}
    </Container>
  );
};

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${convertPixelToRem(6)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(5)};
`;

const Label = styled.span`
  font-family: "SF Pro";
  font-size: ${convertPixelToRem(15)};
  font-style: normal;
  line-height: ${convertPixelToRem(24)};
  letter-spacing: ${convertPixelToRem(-0.03)};
`;

const PreviewWrapper = styled.div`
  width: ${convertPixelToRem(200)};
  height: ${convertPixelToRem(120)};
  border-radius: ${convertPixelToRem(6)};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SuffixWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(4)};
`;

const InlineError = styled.div`
  margin-top: ${convertPixelToRem(4)};
  color: ${themes.$tw_red_50};
  font-size: ${convertPixelToRem(12)};
`;

export default InputUpload;
