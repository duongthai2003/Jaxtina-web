import React from "react";
import styled from "styled-components";
import { Image as AntdImage } from "antd";
import { useFetchImage } from "@/hooks/useFetchImage";

interface ImageProps {
  src: string;
  isAuth?: boolean;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}


const JImage: React.FC<ImageProps> = ({
  src,
  isAuth = false,
  alt = "",
  width,
  height,
  className,
  style,
  ...props
}) => {
  const { data: imageSrc } = useFetchImage({
    src,
    isAuth,
    enabled: !!src,
  });

  const urlImage = isAuth ? imageSrc : src;

  return (
    <StyledAntdImage
      src={urlImage}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      preview={false}
      {...props}
    />
  );
};
const StyledAntdImage = styled(AntdImage)``;

export default JImage;

