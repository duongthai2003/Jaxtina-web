import { useRef, useState } from "react";
import { motion, Reorder, PanInfo, animate } from "framer-motion";
import styled from "styled-components";
import { EXI } from "./style";
import { convertPixelToRem } from "@/utils/func/convertRem";

type Item = {
  id: number;
  name: string;
  cloned: boolean;
};
type AnimateGhostParams = {
  fromEl: HTMLDivElement | HTMLUListElement | HTMLLIElement;
  toRect: DOMRect;
  setListWithDelay: {
    setState: () => void;
    delay?: number;
  };
  setList: () => void;
};
const createGhost = (
  el: HTMLDivElement | HTMLUListElement | HTMLLIElement,
  rect: DOMRect
): HTMLDivElement => {
  const ghost = el.cloneNode(true) as HTMLDivElement;
  document.body.appendChild(ghost);

  ghost.style.position = "fixed";
  ghost.style.left = `${rect.left}px`;
  ghost.style.top = `${rect.top}px`;
  ghost.style.zIndex = "1000";
  ghost.style.pointerEvents = "none";
  ghost.style.transform = "translate(0)";

  return ghost;
};

function QuestionAndAnswerWriting() {
  const list: Item[] = [
    { id: 1, name: "text 1", cloned: false },
    { id: 5, name: "Chiến 3", cloned: false },
    { id: 6, name: "Sơn 3", cloned: false },
    { id: 7, name: "Quỳnh 3", cloned: false },
    { id: 8, name: "Nguyễn Văn A 3", cloned: false },
    { id: 9, name: "Minh Lộc", cloned: false },
    { id: 10, name: "Tuấn Mihn3", cloned: false },
  ];
  const animateDuration = 300; // ms
  const [source, setSource] = useState<Item[]>(list);
  const [cloned, setCloned] = useState<Item[]>([]);

  const clonedBlockRef = useRef<HTMLDivElement | null>(null);
  const sourceBlockRef = useRef<HTMLDivElement | null>(null);
  const cloneItemRefs = useRef<
    Record<number, HTMLUListElement | HTMLLIElement | null>
  >({});
  const sourceItemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const isDraggingRef = useRef(false);
  const isDraggingCloneRef = useRef(false);
  const blockCloneClickRef = useRef(false);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const sourceItemWrapper = useRef<HTMLDivElement | null>(null);

  //////////////////

  const handleClinkSourceItem = (
    item: Item,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (item.cloned || !clonedBlockRef.current) return;
    const sourceEl = e.currentTarget;

    const clonedBlockRect = clonedBlockRef.current.getBoundingClientRect();

    // DOMRect : dùng để mô tả vị trí và kích thước của phần tử trong DOM new DOMRect(x, y, width, height)
    const targetRect = new DOMRect(
      clonedBlockRect.left + clonedListDomWidth(cloned),
      clonedBlockRect.top,
      0,
      0
    );
    animateGhost({
      fromEl: sourceEl,
      toRect: targetRect,
      setListWithDelay: {
        setState: () => {
          setCloned((prev) => [...prev, { ...item, cloned: true }]);
        },
      },
      setList: () => {
        setSource((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, cloned: true } : i))
        );
      },
    });
  };

  const handleClinkCloneItem = (
    item: Item,
    e: React.MouseEvent<HTMLDivElement | HTMLLIElement>
  ) => {
    const clonedEl = e.currentTarget;
    const sourceEl = sourceItemRefs.current[item.id];
    if (!sourceEl) return;

    const sourceRect = sourceEl.getBoundingClientRect();

    animateGhost({
      fromEl: clonedEl,
      toRect: sourceRect,
      setList: () => {
        setCloned((prev) => prev.filter((i) => i.id !== item.id));
      },
      setListWithDelay: {
        setState: () => {
          setSource((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, cloned: false } : i))
          );
        },
      },
    });
  };

  /* ================= RENDER ================= */
  const isOutside = (rect: DOMRect, container: DOMRect) => {
    return (
      rect.right < container.left ||
      rect.left > container.right ||
      rect.bottom < container.top ||
      rect.top > container.bottom
    );
  };

  const moveGhostToClonedBlock = (item: Item, ghost: HTMLDivElement) => {
    const clonedBlock = clonedBlockRef.current;
    if (!clonedBlock) return;

    const clonedBlockRect = clonedBlock.getBoundingClientRect();

    const duration = animateDuration / 1000;

    Promise.all([
      animate(
        ghost,
        {
          left: clonedBlockRect.left + clonedListDomWidth(cloned),
          top: clonedBlockRect.top,
        },
        { duration, ease: "easeInOut" }
      ).finished,
      setSource((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, cloned: true } : i))
      ),
      setTimeout(() => {
        setCloned((prev) => [...prev, { ...item, cloned: true }]);
        ghost.remove();
      }, animateDuration),
    ]);
  };
  const handleSourceItemDraStart = (item: Item) => {
    isDraggingRef.current = true;

    const el = sourceItemRefs.current[item.id];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const ghost = createGhost(el, rect);

    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;

    ghostRef.current = ghost;
  };
  const handleSourceItemDra = (item: Item, info: PanInfo) => {
    if (item.cloned) return;
    const ghost = ghostRef.current;
    if (!ghost) return;

    requestAnimationFrame(() => {
      ghost.style.left = `${info.point.x - ghost.offsetWidth / 2}px`;
      ghost.style.top = `${info.point.y - ghost.offsetHeight / 2}px`;
    });
  };
  const handleSourceItemDraEnd = (item: Item) => {
    if (item.cloned) return;

    isDraggingRef.current = false;

    const ghost = ghostRef.current;
    const wrapper = sourceItemWrapper.current;
    if (!ghost || !wrapper) return;

    const ghostRect = ghost.getBoundingClientRect();
    const sourceBlocRect = wrapper.getBoundingClientRect();

    if (isOutside(ghostRect, sourceBlocRect)) {
      moveGhostToClonedBlock(item, ghost);
    } else {
      ghost.remove();
    }

    ghostRef.current = null;
  };

  //  Drag clone
  const handleCloneDragEnd = (item: Item, point: { x: number; y: number }) => {
    if (!clonedBlockRef.current) return;

    const rect = clonedBlockRef.current.getBoundingClientRect();

    const isOutside =
      point.x < rect.left ||
      point.x > rect.right ||
      point.y < rect.top ||
      point.y > rect.bottom;

    if (isOutside) {
      returnCloneToSourceWhenDrag(item);
    }
  };

  const returnCloneToSourceWhenDrag = (item: Item) => {
    const cloneEl = cloneItemRefs.current[item.id];
    const sourceEl = sourceItemRefs.current[item.id];
    if (!cloneEl || !sourceEl) return;

    const sourceRect = sourceEl.getBoundingClientRect();
    animateGhost({
      fromEl: cloneEl,
      toRect: sourceRect,
      setList: () => {
        setCloned((prev) => prev.filter((i) => i.id !== item.id));
      },
      setListWithDelay: {
        setState: () => {
          setSource((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, cloned: false } : i))
          );
        },
      },
    });
  };

  const animateGhost = ({
    fromEl,
    toRect,
    setListWithDelay,
    setList,
  }: AnimateGhostParams) => {
    const fromRect = fromEl.getBoundingClientRect();
    const ghost = createGhost(fromEl, fromRect);

    ghost.style.width = `${fromRect.width}px`;
    ghost.style.height = `${fromRect.height}px`;

    const duration = (setListWithDelay.delay || animateDuration) / 1000;

    Promise.all([
      animate(
        ghost,
        { left: toRect.left, top: toRect.top },
        { duration, ease: "easeInOut" }
      ).finished,
      setList(),
      setTimeout(() => {
        setListWithDelay.setState();
        ghost.remove();
      }, setListWithDelay.delay || animateDuration),
    ]);
  };
  // Tính vị trí X dựa trên các item đã clone trước đó tức là chiều rộng ưidth hiện tại của cloned list
  const clonedListDomWidth = (cloned: Item[]) => {
    return cloned.reduce((total, value) => {
      const prevEl = cloneItemRefs.current[value.id];
      if (!prevEl) return total;

      const rect = prevEl.getBoundingClientRect();
      return total + rect.width + 12;
    }, 0);
  };
  return (
    <PageWrapper>
      {/* CLONED BLOCK */}
      <AnserWrapper>
        <OverlayAnswer>
          <OverlayAnswerLine></OverlayAnswerLine>
          <OverlayAnswerLine></OverlayAnswerLine>
        </OverlayAnswer>
        <AnswerBlock ref={clonedBlockRef}>
          <CloneGroup axis="x" values={cloned} onReorder={setCloned}>
            {cloned.map((item) => (
              <CloneItem
                key={item.id}
                ref={(e: HTMLLIElement) => {
                  cloneItemRefs.current[item.id] = e;
                }}
                value={item}
                drag
                dragElastic={0.15}
                dragMomentum={false}
                onDragStart={() => {
                  isDraggingCloneRef.current = true;
                  blockCloneClickRef.current = true;
                }}
                onDragEnd={(_, info) => {
                  const point = info.point;
                  handleCloneDragEnd(item, point);
                }}
                onClick={(
                  e: React.MouseEvent<HTMLDivElement | HTMLLIElement>
                ) => {
                  if (blockCloneClickRef.current) {
                    blockCloneClickRef.current = false;
                    return;
                  }

                  handleClinkCloneItem(item, e);
                }}
              >
                {item.name}
              </CloneItem>
            ))}
          </CloneGroup>
        </AnswerBlock>
      </AnserWrapper>

      {/* SOURCE BLOCK */}
      <EXI.Answer>
        <SourceBlock ref={sourceBlockRef}>
          {source.map((item) => (
            <EXI.AnswerItemWrapper ref={sourceItemWrapper} key={item.id}>
              <Item
                key={item.id}
                ref={(el) => {
                  sourceItemRefs.current[item.id] = el;
                }}
                style={{ visibility: item.cloned ? "hidden" : "initial" }}
                drag={item.cloned ? false : true}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => {
                  handleSourceItemDraStart(item);
                }}
                onDrag={(_, info) => {
                  handleSourceItemDra(item, info);
                }}
                onDragEnd={() => {
                  handleSourceItemDraEnd(item);
                }}
                onClick={(e) => {
                  if (isDraggingRef.current) return;
                  handleClinkSourceItem(item, e);
                }}
              >
                {item.name}
              </Item>
            </EXI.AnswerItemWrapper>
          ))}
        </SourceBlock>
      </EXI.Answer>
    </PageWrapper>
  );
}

export default QuestionAndAnswerWriting;

const OverlayAnswerLine = styled.div`
  width: 100%;
  height: ${convertPixelToRem(40)};
  border-bottom: ${convertPixelToRem(2)} solid ${(p) => p.theme.$tw_indigo_200};
`;

const Item = styled(motion.p)<{ $cloned?: boolean }>`
  cursor: ${({ $cloned }) => ($cloned ? "not-allowed" : "pointer")};
  user-select: none;
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  height: ${convertPixelToRem(40)};
  padding: ${convertPixelToRem(4)} ${convertPixelToRem(12)};
  border: ${convertPixelToRem(2)} solid ${(p) => p.theme.$border_signup};
  border-radius: ${convertPixelToRem(8)};
  background-color: ${(p) => p.theme.$color_white};

  &:hover {
    background-color: ${(p) => p.theme.auth.$menu_hover};
  }
`;
const AnswerBlock = styled.div`
  position: absolute;
  top: -${convertPixelToRem(4)};
  left: 0;
`;
const AnserWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const OverlayAnswer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(12)};
`;
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${convertPixelToRem(100)};
`;

const CloneGroup = styled(Reorder.Group)`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  gap: ${convertPixelToRem(12)};
`;

const CloneItem = styled(Reorder.Item)<{ $cloned?: boolean }>`
  cursor: ${({ $cloned }) => ($cloned ? "not-allowed" : "pointer")};
  user-select: none;
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  height: ${convertPixelToRem(40)};
  padding: ${convertPixelToRem(4)} ${convertPixelToRem(12)};
  border: ${convertPixelToRem(2)} solid ${(p) => p.theme.$border_signup};
  border-radius: ${convertPixelToRem(8)};
  background-color: ${(p) => p.theme.$color_white};

  &:hover {
    background-color: ${(p) => p.theme.auth.$menu_hover};
  }
`;

const SourceBlock = styled.div`
  display: flex;
  justify-content: center;
  gap: ${convertPixelToRem(12)};
  flex-wrap: wrap;
  width: 100%;
`;
