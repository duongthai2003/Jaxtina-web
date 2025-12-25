import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EX } from "./style";
import { PATHS } from "@/routers/path";
import { icons } from "@/assets";

import { BaseTag } from "@/utils/baseTagHTML";
import { exercise, exerciseLearnVocab } from "./fakeData";
import { useAudio } from "react-use";
import QuestionMenu from "@/components/courses/QuestionMenu";
import ExerciseLearnVocab from "@/components/courses/exercise/ExerciseLearnVocab";
import PopupSuccess from "@/components/courses/exercise/modals/PopupSuccess";
import PopupFail from "@/components/courses/exercise/modals/PopupFail";
import FinalPopup from "@/components/courses/exercise/modals/FinalModal";

const Exercise = () => {
  const navigate = useNavigate();
  const [errorSoundAudio, state, errorSoundControls] = useAudio({
    src: icons.errorSound,
    autoPlay: false,
  });
  const [correctSoundAudio, correctSoundState, correctSoundControls] = useAudio(
    {
      src: icons.correctSound,
      autoPlay: false,
    }
  );
  const [finalSoundAudio, finalSoundState, finalSoundControls] = useAudio({
    src: icons.finalSound,
    autoPlay: false,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFinalPopup, setIsOpenFinalPopup] = useState(false);

  const handleCheckAnswer = () => {
    if (exercise.exerciseList[currentQuestionIndex].answer === selectedAnswer) {
      setIsOpenSuccess(true);
      setSelectedAnswer(null);
      correctSoundControls.play();
    } else {
      setIsOpenFail(true);
      errorSoundControls.play();
    }
  };
  const handleSkip = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setIsOpenFail(false);
  };
  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setIsOpenSuccess(false);
    setIsOpenFinalPopup(true);
    finalSoundControls.play();
  };

  return (
    <BaseTag.div>
      <EX.wrapper>
        <EX.header>
          <p>Thực hành nghe</p>
          <EX.headerClose
            onClick={() => {
              navigate(PATHS.private.user.lesson("courseId", "lessonId"));
            }}
          >
            <EX.headerCloseIcon size={24} />
          </EX.headerClose>
        </EX.header>
        <EX.content>
          <BaseTag.div>
            <QuestionMenu
              current={currentQuestionIndex}
              setCurrent={setCurrentQuestionIndex}
            />
            <EX.progressBlock>
              <EX.progressBar>
                <EX.progressAntd percent={exercise.progress} showInfo={false} />
                <BaseTag.p>
                  {exercise.done}/{exercise.total}
                </BaseTag.p>
              </EX.progressBar>
              <EX.star>
                <EX.starImage src={icons.achievements} alt="" />
                <BaseTag.p>+0</BaseTag.p>
              </EX.star>
            </EX.progressBlock>
          </BaseTag.div>
          <EX.questionBlock>
            {/* <ExerciseListening
              data={exercise.exerciseList[currentQuestionIndex]}
              setSelectedAnswer={setSelectedAnswer}
              selectedAnswer={selectedAnswer}
            /> */}
            {/* <ExerciseReading
              data={exerciseReading.exerciseList[currentQuestionIndex]}
              setSelectedAnswer={setSelectedAnswer}
              selectedAnswer={selectedAnswer}
            /> */}
            {/* <ExerciseWriting
              data={exercise.exerciseList[currentQuestionIndex]}
              setSelectedAnswer={setSelectedAnswer}
              selectedAnswer={selectedAnswer}
            /> */}
            <ExerciseLearnVocab
              data={exerciseLearnVocab.exerciseList[currentQuestionIndex]}
              setSelectedAnswer={setSelectedAnswer}
              selectedAnswer={selectedAnswer}
            />
          </EX.questionBlock>
        </EX.content>
        <div>
          <EX.footer>
            {/* <EX.buttonCancel title="Bỏ qua" /> */}
            <BaseTag.div></BaseTag.div>
            <EX.buttonSubmit onClick={handleCheckAnswer} title="Kiểm tra" />
          </EX.footer>
          <div>
            <PopupSuccess
              onClick={handleNext}
              isOpen={isOpenSuccess}
              setIsOpen={setIsOpenSuccess}
            />

            <PopupFail
              onClick={handleSkip}
              isOpen={isOpenFail}
              setIsOpen={setIsOpenFail}
            />
            <FinalPopup
              setIsOpen={setIsOpenFinalPopup}
              isOpen={isOpenFinalPopup}
            />
            {errorSoundAudio}
            {correctSoundAudio}
            {finalSoundAudio}
          </div>
        </div>
      </EX.wrapper>
    </BaseTag.div>
  );
};
export default Exercise;
