import React from "react";
import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { useNavigate } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  separator?: React.ReactNode;
  path?: string;
  disabled?: boolean;
}

interface CommonBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  onNavigate?: (path: string) => void;
}

export const CommonBreadcrumb = ({
  items,
  separator = "/",
  onNavigate,
}: CommonBreadcrumbProps) => {
  const navigate = useNavigate();

  const handleClick = (
    path: string | undefined,
    disabled?: boolean,
    e?: React.MouseEvent
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!path || disabled) return;
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <BreadcrumbContainer>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const hasPath = !!item.path;
        const isClickable = hasPath && !item.disabled;
        const currentSeparator =
          items[index + 1]?.separator ?? item.separator ?? separator;

        return (
          <BreadcrumbItemWrapper key={index}>
            {isClickable ? (
              <BreadcrumbLink
                onClick={(e) => handleClick(item.path, item.disabled, e)}
                $isClickable={true}
                $isCurrent={isLast}
              >
                {item.label}
              </BreadcrumbLink>
            ) : isLast ? (
              <BreadcrumbCurrent>{item.label}</BreadcrumbCurrent>
            ) : (
              <BreadcrumbText>{item.label}</BreadcrumbText>
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator>{currentSeparator}</BreadcrumbSeparator>
            )}
          </BreadcrumbItemWrapper>
        );
      })}
    </BreadcrumbContainer>
  );
};

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(8)};
  margin-bottom: ${convertPixelToRem(20)};
  font-size: ${convertPixelToRem(14)};
  flex-wrap: wrap;
`;

const BreadcrumbItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(8)};
`;

const BreadcrumbLink = styled.span<{ $isClickable: boolean; $isCurrent?: boolean }>`
  color: ${(props) =>
    props.$isCurrent ? props.theme.$text_primary : props.theme.$text_secondary};
  cursor: pointer;
  font-weight: ${convertPixelToRem(500)};
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.$text_primary};
  }
`;

const BreadcrumbText = styled.span`
  color: ${(props) => props.theme.$text_secondary};
  font-weight: ${convertPixelToRem(500)};
  cursor: default;
`;

const BreadcrumbSeparator = styled.span`
  color: ${(props) => props.theme.$text_tertiary};
  margin: 0 ${convertPixelToRem(4)};
`;

const BreadcrumbCurrent = styled.span`
  color: ${(props) => props.theme.$text_primary};
  font-weight: ${convertPixelToRem(500)};
`;
