import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";
import FlipCardWord from "./FlipCardWord";
import { FloatingPoint } from "./FloatPoint";
import { BaseTag } from "@/utils/baseTagHTML";
import { icons, images } from "@/assets";
import { PATHS } from "@/routers/path";
import {
  ButtonPractice,
  ButtonSubmit,
  Grid,
  Header,
  Instruct,
  InstructImg,
  MainContent,
  Wrapper,
} from "./style";
import { EX } from "@/modules/public/courses/exercise/style";
import { gameFlipCardStore } from "@/store/flipCardStore";
import { InstructTitle, InstructTitleImg } from "../gameConnectWord/style";
import { comTopicList } from "@/utils/constants";

const GameFlipCardWord = () => {
  const navigate = useNavigate();
  const {
    started,
    isRunning,
    isChecking,
    seconds,
    visibleCards,
    cardQueue,
    selected,
    matched,
    mismatched,
    initGame,
    startGame,
    tick,
    selectCard,
    matchSuccess,
    matchFail,
    clearMismatch,
  } = gameFlipCardStore();
  const [showFloatPoint, setShowFloatPoint] = useState(false);
  const [, setFloatPointPosition] = useState({ x: 0, y: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  // const {id} = useParams()
  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const handleSelect = (card: Card) => {
    if (
      !started ||
      isChecking ||
      selected.some((c) => c.id === card.id) ||
      matched.includes(card.pairId)
    )
      return;
    selectCard(card);
    if (selected.length === 1) {
      gameFlipCardStore.setState({ isChecking: true });

      setTimeout(() => {
        const [first, second] = [...selected, card];
        if (first.pairId === second.pairId) {
          const matchedCards = visibleCards.filter(
            (c) => c.pairId === first.pairId
          );
          const remaining = visibleCards.filter(
            (c) => c.pairId !== first.pairId
          );
          const replacement = cardQueue.slice(0, matchedCards.length);

          const el = cardRefs.current[first.id];
          if (el) {
            const rect = el.getBoundingClientRect();
            setFloatPointPosition({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
            setShowFloatPoint(true);
          }

          matchSuccess(
            first.pairId,
            [...remaining, ...replacement],
            cardQueue.slice(matchedCards.length)
          );
        } else {
          matchFail([first.id, second.id]);
          setTimeout(clearMismatch, 1000);
        }
      }, 800);
    }
  };

  const handleNavigateById = (id: string) => {
    navigate(PATHS.private.user.listenPractice(id));
  };

  return (
    <Wrapper>
      {showFloatPoint && (
        <FloatingPoint onComplete={() => setShowFloatPoint(false)} />
      )}

      <Header>
        <BaseTag.p>Các cụm từ kết hợp</BaseTag.p>
        <EX.headerClose onClick={() => navigate(PATHS.private.user.comTopic())}>
          <EX.headerCloseIcon size={24} />
        </EX.headerClose>
      </Header>

      <MainContent>
        <Instruct>
          <InstructImg src={images.jaxDang6} />
          <InstructTitle>
            <p>Hãy chọn cụm từ kết hợp từ Tiếng Anh và Tiếng Việt tương ứng</p>
            <InstructTitleImg src={icons.messVector} />
          </InstructTitle>
        </Instruct>

        {started ? (
          <Timer seconds={seconds} />
        ) : (
          <ButtonSubmit onClick={startGame}>Bắt đầu</ButtonSubmit>
        )}

        <Grid>
          {visibleCards.map((card, index) => (
            <div key={index} ref={(el) => (cardRefs.current[card.id] = el)}>
              <FlipCardWord
                front={card.value}
                back={card.value}
                isSelected={selected.some((c) => c.id === card.id)}
                isMismatched={mismatched.includes(card.id)}
                isMatched={matched.includes(card.pairId)}
                isDisabled={!started || isChecking}
                onClick={() => handleSelect(card)}
              />
            </div>
          ))}
        </Grid>

        {started && (
          <ButtonPractice
            onClick={() => handleNavigateById(comTopicList[1].id)}
          >
            Thực hành nghe và nói
          </ButtonPractice>
        )}
      </MainContent>
    </Wrapper>
  );
};

export default GameFlipCardWord;
