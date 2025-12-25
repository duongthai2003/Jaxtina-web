import styled from "styled-components";
import { device } from "@/utils/deviceBreakpoint";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { themes } from "@/configs/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
}

function Button({
  title,
  onClick,
  disabled = false,
  loading = false,
  style,
  ...rest
}: ButtonProps) {
  return (
    <ButtonCustom
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      {...rest}
    >
      {title}
    </ButtonCustom>
  );
}

export default Button;
const ButtonCustom = styled.button<{ style?: React.CSSProperties }>`
  min-height: ${convertPixelToRem(48)};
  width: ${convertPixelToRem(444)};
  border-radius: ${convertPixelToRem(100)};
  background-color: ${(props) => props.theme.auth?.$btn_color_primary || "#ef4444"};
  color: ${themes.$bg_white} ;
  font-size: ${convertPixelToRem(16)};
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${device.tablet}px) {
    width: ${convertPixelToRem(300)};
  }
`;
