import { useEffect, useRef } from "react";
import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
type QuestionMenuProps = {
  current: number;
  setCurrent: (value: number) => void;
};
const QuestionMenu = ({ current, setCurrent }: QuestionMenuProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isDragging.current = false;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container || startX.current === 0) return;

    const x = e.pageX - container.offsetLeft;
    const walk = x - startX.current;

    // Kéo quá ${convertPixelToRem(5)} thì coi là drag
    if (Math.abs(walk) > 5) {
      isDragging.current = true;
      container.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    startX.current = 0;
  };

  const handleClick = (index: number) => {
    //  Nếu đang drag thì không xử lý click
    if (isDragging.current) return;

    const container = containerRef.current;
    const item = itemRefs.current[index];
    if (!container || !item) return;

    setCurrent(index);

    const containerWidth = container.clientWidth;
    const maxScrollLeft = container.scrollWidth - containerWidth;

    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const containerCenter = container.scrollLeft + containerWidth / 2;

    let targetScrollLeft = itemCenter - containerWidth / 2;

    // Clamp
    targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));

    if (Math.abs(itemCenter - containerCenter) > 1) {
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    handleClick(current);
  }, [current]);

  return (
    <ScrollContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <QuestionMenuItem
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          $active={current === index}
          onClick={() => handleClick(index)}
        >
          {index + 1}
        </QuestionMenuItem>
      ))}
    </ScrollContainer>
  );
};

export default QuestionMenu;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
  overflow-x: auto;
  width: 100%;
  gap: ${convertPixelToRem(12)};
  padding: ${convertPixelToRem(12)} ${convertPixelToRem(8)};
  user-select: none;
  cursor: pointer;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const QuestionMenuItem = styled.div<{ $active?: boolean }>`
  min-width: ${convertPixelToRem(100)};
  min-height: ${convertPixelToRem(25)};
  padding: ${convertPixelToRem(3)} 0;
  border-radius: ${convertPixelToRem(20)};
  border: ${convertPixelToRem(1.5)} solid
    ${(p) => (p.$active ? p.theme.auth.$ex_header : p.theme.$border_signup)};
  background-color: ${(p) => p.theme.$bg_white};
  color: ${(p) => p.theme.$color_black};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${(p) => p.theme.auth.$menu_hover};
  }
`;
