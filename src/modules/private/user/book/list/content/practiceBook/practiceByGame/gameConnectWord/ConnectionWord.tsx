import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import { useTheme } from "styled-components";
import { HoverInfo } from "@/modules/private/user/book/list/content/style";
import { logic } from "./logic";
import { PATHS } from "@/routers/path";
import { icons, images } from "@/assets";
import { EX } from "../../../../../../../../public/courses/exercise/style";
import {
  ImageWord,
  TextWord,
  MatchCard,
  RadioCircle,
  ProgressAntd,
  ProgressBar,
  QuestionBlock,
  Svg,
  HoverWrapper,
  TooltipTest,
  ColItem,
  ImageItem,
  ImageSelectedRight,
  ImageSelectedLeft,
  FooterCorrect,
  FooterFalse,
  ContinueText,
  CardCorrect,
  FooterBackgroundCorrect,
  FooterBackgroundFalse,
  Wrapper,
  InstructTitle,
  InstructTitleImg,
} from "./style";
import { BaseTag } from "@/utils/baseTagHTML";
import { Instruct, InstructImg } from "../gameFlipCard/style";

const ConnectionWord = ({ imgList, wordList, onContinue, isLastSet = false, gameId, typeGame }: ConnectionWordProps) => {
  const {
        connections,
        checked,
        imageRefs,
        wordRefs,
        lineRefs,
        getCenter,
        selectImg,
        selectedImage,
        selectWord,
        checkAnswer,
        selectedWord,
        animationVariants,
        motion,
  } = logic({ imgList, wordList , gameId, typeGame})
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (connections.length > 0) {
      connections.forEach((c, index) => {
        const key = `${c.imageId}-${c.wordId}-${index}`;
        const line = lineRefs.current[key];
        if (line && containerRef.current) {
          const from = getCenter(
            imageRefs.current[c.imageId],
            containerRef.current
          );
          const to = getCenter(
            wordRefs.current[c.wordId],
            containerRef.current
          );
          line.setAttribute('x1', from.x.toString());
          line.setAttribute('y1', from.y.toString());
          line.setAttribute('x2', to.x.toString());
          line.setAttribute('y2', to.y.toString());
        }
      });
    }
  }, [connections]);
  const correctCount = connections.filter(c => c.isCorrect).length;
  const totalQuestions = wordList.length;
  const theme = useTheme()
  return (
    <Wrapper>
      <EX.header>
        <BaseTag.p>Nối từ/ cụm từ với tranh</BaseTag.p>
        <EX.headerClose onClick={() => navigate(PATHS.private.user.comTopic())}>
          <EX.headerCloseIcon size={24} />
        </EX.headerClose>
      </EX.header>
      <EX.content>
        <EX.progressBlock>
          <ProgressBar>
            <ProgressAntd percent={correctCount / totalQuestions * 100} showInfo={false} />
            <BaseTag.p>{correctCount}/{totalQuestions}</BaseTag.p>
          </ProgressBar>
          <EX.star>
            <EX.starImage src={icons.achievements} alt="" />
            <BaseTag.p>+{correctCount * 10}</BaseTag.p>
          </EX.star>
        </EX.progressBlock>
        <QuestionBlock ref={containerRef}>
          <Svg>
            {connections.map((c, index) => {
              const from = getCenter(
                imageRefs.current[c.imageId],
                containerRef.current
              );
              const to = getCenter(
                wordRefs.current[c.wordId],
                containerRef.current
              );
              const key = `${c.imageId}-${c.wordId}-${index}`;
              return (
                <motion.line
                  key={key}
                  ref={el => {
                    if (el) {
                      lineRefs.current[key] = el;
                    }
                  }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={theme.$border_secondary}
                  strokeWidth="2"
                />
              );
            })}
          </Svg>
          <Instruct>
            {checked ? (
              <HoverWrapper>
                <InstructImg
                  src={images.lightbulb}
                  alt="hint"
                  onMouseEnter={() => {
                    const tooltip = document.getElementById('word-tooltip');
                    if (tooltip) tooltip.style.display = 'block';
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById('word-tooltip');
                    if (tooltip) tooltip.style.display = 'none';
                  }}
                />
                <HoverInfo id="word-tooltip">
                  <TooltipTest>
                    <Row>{wordList.map((item, key) => (
                      <>
                        <Col span={22}>
                          <ColItem key={key}>
                            {item.word}
                          </ColItem>
                        </Col>
                        <Col span={2}>
                          <ImageItem
                            src={icons.achievements}
                            alt="speak"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          />
                        </Col>
                      </>
                    ))}
                    </Row>
                  </TooltipTest>
                </HoverInfo>
              </HoverWrapper>
            ) : (
              <InstructImg src={images.jaxDang6} alt="instruction" />
            )}
            <InstructTitle>
              {checked ? (
                <p>Chạm vào mình đi, có cái này hay lắm đó!</p>
              ) : (
                <p>Nối hình ảnh miêu tả đúng cho các từ/ cụm từ</p>
              )}
              <InstructTitleImg src={icons.messVector} alt="" />
            </InstructTitle>
          </Instruct>

          <Row gutter={320}>
            <Col span={12}>
              {imgList.map(item => {
                const isSelected = selectedImage === item.id;
                const isConnected = connections.some(c => c.imageId === item.id);

                return (
                  <motion.div
                    key={item.id}
                    ref={el => (imageRefs.current[item.id] = el)}
                    onClick={() => selectImg(item.id)}
                    style={{
                      cursor: checked ? 'not-allowed' : 'pointer',
                      position: 'relative'
                    }}
                    variants={animationVariants}
                    animate={isSelected ? 'pulse' : ''}
                  >
                    <MatchCard
                      selected={isSelected}
                      disabled={checked && !isSelected && !isConnected}
                      as={motion.div}
                      whileHover={!checked ? { scale: 1.02 } : {}}
                      whileTap={!checked ? { scale: 0.98 } : {}}
                    >
                      <ImageWord src={item.url} />
                      {isSelected || isConnected ? (
                        <ImageSelectedRight
                          src={images.choose}
                          alt="selected"
                        />
                      ) : (
                        <RadioCircle />
                      )}
                    </MatchCard>
                  </motion.div>
                );
              })}
            </Col>
            <Col span={12}>
              {wordList.map(item => {
                const connection = connections.find(c => c.wordId === item.id);
                const isSelected = selectedWord === item.id;
                const isConnected = connections.some(c => c.wordId === item.id);
                const isCorrect = connection?.isCorrect;

                return (
                  <motion.div
                    key={item.id}
                    ref={el => (wordRefs.current[item.id] = el)}
                    onClick={() => selectWord(item.id)}
                    style={{
                      cursor: checked ? 'not-allowed' : 'pointer',
                      position: 'relative'
                    }}
                    variants={animationVariants}
                    animate={
                      checked
                        ? isCorrect
                          ? "correct"
                          : "wrong"
                        : isSelected
                          ? "pulse"
                          : ""
                    }
                  >
                    <MatchCard
                      selected={isSelected}
                      disabled={checked && !isSelected && !isConnected}
                      as={motion.div}
                      whileHover={!checked ? { scale: 1.02 } : {}}
                      whileTap={!checked ? { scale: 0.98 } : {}}
                    >
                      {checked && connection ? (
                        <CardCorrect isCorrect={isCorrect}>
                          {isCorrect ? '✓' : '✗'}
                        </CardCorrect>
                      ) : isSelected || isConnected ? (
                        <ImageSelectedLeft
                          src={images.choose}
                          alt="selected"
                        />
                      ) : (
                        <RadioCircle />
                      )}
                      <TextWord>
                        {item.word}
                      </TextWord>
                    </MatchCard>
                  </motion.div>
                );
              })}
            </Col>
          </Row>
        </QuestionBlock>
      </EX.content>

      {
        checked ?
          <>
            {correctCount === totalQuestions ? (
              <FooterBackgroundCorrect>
                <FooterCorrect src={images.trueblue}>
                  Bạn đã làm đúng {correctCount}/{totalQuestions} câu
                  <ContinueText>Tiếp tục cố gắng nhé!</ContinueText>
                </FooterCorrect>
                <EX.buttonSubmit title="Tiếp tục" />
              </FooterBackgroundCorrect>
            ) : (
              <FooterBackgroundFalse>
                <FooterFalse src={images.falsered}>
                  Bạn đã làm đúng {correctCount}/{totalQuestions} câu
                  <ContinueText>Tiếp tục cố gắng nhé!</ContinueText>
                </FooterFalse>

                <EX.buttonSubmit title={isLastSet ? "Hoàn thành" : "Tiếp tục"} onClick={onContinue} disabled={!checked} />
              </FooterBackgroundFalse>
            )}
          </>
          : <>
            <EX.footer>
              <EX.buttonCancel title="Bỏ qua" />
              <EX.buttonSubmit title="Kiểm tra" onClick={checkAnswer} />
            </EX.footer>
          </>
      }
    </Wrapper>
  );
};
export default ConnectionWord;
