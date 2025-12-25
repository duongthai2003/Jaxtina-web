import { BaseTag } from "@/utils/baseTagHTML";
import { EXI } from "./style";
import { icons, images } from "@/assets";
import { useAudio } from "react-use";
interface lessonItem {
  id: number;
  icons: string;
  answer: string;
  transcription: string;
  sound: string;
  status: string;
  wordType: string;
}
type ExerciseLearnVocabProps = {
  data: lessonItem;
  setSelectedAnswer: (answer: string) => void;
  selectedAnswer: string | null;
};
const ExerciseLearnVocab = ({
  data,
  setSelectedAnswer,
  selectedAnswer,
}: ExerciseLearnVocabProps) => {
  const [audio, state, controls, audioRef] = useAudio({
    src: icons.audio,
    autoPlay: false,
  });

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
          <BaseTag.p>Nghe và viết từ vựng cùng mình nhé!</BaseTag.p>
          <EXI.InstructTitleImg src={icons.messVector} alt="" />
        </EXI.InstructTitle>
      </EXI.Instruct>
      <EXI.Question>
        <EXI.QuestionContent>
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
          {/* {data.answerOptions.map((choice) => (
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
          ))} */}
        </EXI.Answer>
      </EXI.Question>
      {audio}
    </EXI.Wrapper>
  );
};

export default ExerciseLearnVocab;
