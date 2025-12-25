import { forwardRef, useRef } from "react";
import { useAudio } from "react-use";
import { animate } from "framer-motion";
import { icons, images } from "@/assets";
import { BaseTag } from "@/utils/baseTagHTML";
import { EXI } from "./style";

type Choice = string | null;
interface ItemRefs {
  [key: string]: HTMLElement | null;
}
interface lessonItem {
  id: number;
  question: string;
  answerOptions: string[];
  sound: any;
}
type QuizQuestionProps = {
  question: string;
};
type ExerciseListeningProps = {
  data: lessonItem;
  setSelectedAnswer: (answer: string) => void;
  selectedAnswer: string | null;
};

const QuizQuestion = forwardRef<HTMLSpanElement, QuizQuestionProps>(
  ({ question }, ref) => {
    const parts = question.split(/(_+)/g);
    return (
      <EXI.QuestionContentTitle>
        {parts.map((part, i) => {
          if (/^_+$/.test(part)) {
            return (
              <BaseTag.span key={i} ref={ref}>
                {part}
              </BaseTag.span>
            );
          }
          return part;
        })}
      </EXI.QuestionContentTitle>
    );
  }
);

const ExerciseListening = ({
  data,
  setSelectedAnswer,
  selectedAnswer,
}: ExerciseListeningProps) => {
  const blankRef = useRef(null);
  const itemRefs = useRef<ItemRefs>({});
  const [audio, state, controls, audioRef] = useAudio({
    src: "https://app.jaxtina.com/course-assets/4SKILLS_PRE_S_L1/sounds/normal/Normal_Speaking.mp3",
    autoPlay: false,
  });

  const handleClick = (choice: Choice): void => {
    const itemEl = choice ? (itemRefs.current as ItemRefs)[choice] : null;
    const blankEl = blankRef.current as HTMLSpanElement | null;

    if (!itemEl || !blankEl) return;

    const itemRect = itemEl.getBoundingClientRect();
    const blankRect = blankEl.getBoundingClientRect();

    const blankCenterX = blankRect.left + blankRect.width / 2;
    const itemCenterX = itemRect.left + itemRect.width / 2;

    const dx = blankCenterX - itemCenterX;
    const dy = blankRect.top - itemRect.top - 25;

    const animations: Promise<any>[] = [];

    // item mới bay lên blank
    animations.push(
      animate(itemEl, { x: dx, y: dy }, { duration: 0.3, ease: "easeInOut" })
        .finished
    );

    // item cũ bay về
    if (selectedAnswer && selectedAnswer !== choice) {
      const prevEl = (itemRefs.current as ItemRefs)[selectedAnswer];
      if (prevEl) {
        animations.push(
          animate(prevEl, { x: 0, y: 0 }, { duration: 0.3, ease: "easeInOut" })
            .finished
        );
      }
    }

    setSelectedAnswer(choice as string);
  };

  const handleAudio = () => {
    if (audioRef.current) {
      if (state.playing) return;
      audioRef.current.playbackRate = 1;
      controls.seek(0);
      controls.play();
    }
  };
  const handleSlowAudio = () => {
    if (audioRef.current) {
      if (state.playing) return;
      audioRef.current.playbackRate = 0.5;
      controls.seek(0);
      controls.play();
    }
  };

  return (
    <EXI.Wrapper>
      <EXI.Instruct>
        <EXI.InstructImg src={images.jaxDang6} alt="" />
        <EXI.InstructTitle>
          <BaseTag.p>
            {" "}
            Nghe và lựa chọn từ còn thiếu trong câu sau nhé!
          </BaseTag.p>
          <EXI.InstructTitleImg src={icons.messVector} alt="" />
        </EXI.InstructTitle>
      </EXI.Instruct>
      <EXI.Question>
        <EXI.QuestionContent>
          <QuizQuestion ref={blankRef} question={data.question} />
          <EXI.Media>
            <EXI.MediaImg $isPlaying={state.playing} onClick={handleAudio}>
              <BaseTag.img src={icons.volume} alt="" />
            </EXI.MediaImg>
            <EXI.MediaImg $isPlaying={state.playing} onClick={handleSlowAudio}>
              <BaseTag.img src={icons.snail} alt="" />
            </EXI.MediaImg>
          </EXI.Media>
        </EXI.QuestionContent>
        <EXI.Answer>
          {data.answerOptions.map((choice) => (
            <EXI.AnswerItemWrapper key={choice}>
              <EXI.AnswerItem
                ref={(el) => {
                  return (itemRefs.current[choice] = el);
                }}
                onClick={() => handleClick(choice)}
              >
                {choice}
              </EXI.AnswerItem>
            </EXI.AnswerItemWrapper>
          ))}
        </EXI.Answer>
      </EXI.Question>
      {audio}
    </EXI.Wrapper>
  );
};
export default ExerciseListening;
