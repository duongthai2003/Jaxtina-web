
export const sanitizeFilename = (raw?: string): string => {
  const withoutExt = raw?.includes(".") ? raw.split(".").slice(0, -1).join(".") : raw || "";
  const cleaned = (withoutExt || "file")
    .toLowerCase()
    .replace(
      /[^ 0-9a-z_\-aàáạảãâầấậẩẫăằắặẳẵeèéẹẻẽêềếệểễiìíịỉĩoòóọỏõôồốộổỗơờớợởỡuùúụủũưừứựửữyỳýỵỷỹdđ]/gi,
      "-"
    )
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 100);
  return cleaned || "file";
};

