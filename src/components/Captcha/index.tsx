import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { RotateCw } from "lucide-react";
import { Skeleton } from "antd";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useTheme } from "@/context/themeContext";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { themesLight, themesDark } from "@/configs/theme";

const CaptchaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(4)};
`;

const CaptchaImageWrapper = styled.div<{
  $hoverColor: string;
  $activeColor: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: ${convertPixelToRem(12)};
  min-height: ${convertPixelToRem(40)};
  min-width: ${convertPixelToRem(120)};
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  height: ${convertPixelToRem(52)};
  width: 100%;

  &:hover {
    border-color: ${(props) => props.$hoverColor};
  }

  &:active {
    border-color: ${(props) => props.$activeColor};
  }
`;

const CaptchaImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: none;
`;

const SkeletonOverlay = styled.div<{ $bgColor: string }>`
  position: absolute;
  inset: ${convertPixelToRem(4)};
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px);
  background: ${(props) => props.$bgColor};
  border-radius: ${convertPixelToRem(4)};
  animation: fadeIn 0.2s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ErrorText = styled.div<{ $errorColor: string }>`
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.$errorColor};
  text-align: center;
`;

const StyledSkeletonInput = styled(Skeleton.Input)<{
  $bgColor: string;
}>`
  width: 100% !important;
  height: ${convertPixelToRem(48)} !important;

  .ant-skeleton-input {
    background: ${(props) => props.$bgColor} !important;
  }
`;

const StyledRotateCw = styled(RotateCw)<{ $isDark: boolean }>`
  transition:
    color 0.2s,
    stroke 0.2s;
  color: ${(props) =>
    props.$isDark
      ? `${themesDark.$color_white}`
      : `${themesLight.$color_black}`};
  stroke: ${(props) =>
    props.$isDark
      ? `${themesDark.$button_next}`
      : `${themesLight.$color_black}`};
`;

const RefreshButton = styled.button<{
  $textColor: string;
  $hoverColor: string;
  $activeColor: string;
  $disabledColor: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${convertPixelToRem(32)};
  height: ${convertPixelToRem(32)};
  border: none;
  background: transparent;
  color: ${(props) => props.$textColor};
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover:not(:disabled) {
    color: ${(props) => props.$hoverColor};
  }

  &:active:not(:disabled) {
    color: ${(props) => props.$activeColor};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.$disabledColor};
  }
  &:focus-visible,
  &:focus {
    outline: none;
  }
`;

interface CaptchaProps {
  onTokenChange?: (token: string) => void;
}

export const Captcha: React.FC<CaptchaProps> = ({ onTokenChange }) => {
  const { imgCap, captchaToken, isLoading, error, refreshCaptcha } =
    useCaptcha();
  const { isDark } = useTheme();
  const currentTheme = isDark ? themesDark : themesLight;
  const hasFetchedRef = useRef(false);
  const [showSkeletonOverlay, setShowSkeletonOverlay] = useState(false);
  const skeletonTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      refreshCaptcha();
    }
  }, [refreshCaptcha]);

  useEffect(() => {
    if (captchaToken && onTokenChange) {
      onTokenChange(captchaToken);
    }
  }, [captchaToken, onTokenChange]);

  useEffect(() => {
    if (isLoading && imgCap) {
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current);
      }
      skeletonTimeoutRef.current = setTimeout(() => {
        setShowSkeletonOverlay(true);
      }, 1000);
    } else {
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current);
        skeletonTimeoutRef.current = null;
      }
      setShowSkeletonOverlay(false);
    }

    return () => {
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current);
      }
    };
  }, [isLoading, imgCap]);

  const imageSrc = useMemo(() => {
    if (!imgCap) return "";
    return imgCap.startsWith("data:")
      ? imgCap
      : `data:image/png;base64,${imgCap}`;
  }, [imgCap]);

  const handleRefresh = useCallback(() => {
    if (isLoading) return;
    refreshCaptcha();
  }, [isLoading, refreshCaptcha]);

  // const showSkeletonPlaceholder = true ;
  const showSkeletonPlaceholder = isLoading && !imgCap;

  const skeletonOverlayBg = isDark
    ? "rgba(28, 25, 23, 0.65)"
    : "rgba(255, 255, 255, 0.65)";

  return (
    <CaptchaContainer>
      <CaptchaImageWrapper
        onClick={handleRefresh}
        $hoverColor={currentTheme.$tw_sky_400}
        $activeColor={currentTheme.$color_menu_active}
      >
        {showSkeletonPlaceholder ? (
          <StyledSkeletonInput
            active
            size="large"
            $bgColor={
              isDark ? currentTheme.$tw_stone_700 : currentTheme.$tw_stone_200
            }
          />
        ) : error ? (
          <ErrorText $errorColor={currentTheme.$tw_red_600}>
            Có lỗi xảy ra vui lòng tải lại captcha
          </ErrorText>
        ) : imgCap ? (
          <>
            <CaptchaImage
              src={imageSrc}
              alt="Captcha"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!imgCap.startsWith("data:")) {
                  target.src = `data:image/jpeg;base64,${imgCap}`;
                }
              }}
            />
            {showSkeletonOverlay && (
              <SkeletonOverlay $bgColor={skeletonOverlayBg}>
                <StyledSkeletonInput
                  active
                  size="default"
                  $bgColor={
                    isDark
                      ? currentTheme.$tw_stone_700
                      : currentTheme.$tw_stone_200
                  }
                />
              </SkeletonOverlay>
            )}
          </>
        ) : null}
      </CaptchaImageWrapper>
      <RefreshButton
        onClick={handleRefresh}
        disabled={isLoading}
        aria-label="Refresh captcha"
        type="button"
        $textColor={
          isLoading ? currentTheme.$tw_stone_400 : currentTheme.$tw_stone_600
        }
        $hoverColor={currentTheme.$tw_sky_400}
        $activeColor={currentTheme.$color_menu_active}
        $disabledColor={currentTheme.$tw_stone_400}
      >
        <StyledRotateCw
          size={20}
          className={isLoading ? "animate-spin" : ""}
          $isDark={isDark}
        />
      </RefreshButton>
    </CaptchaContainer>
  );
};
