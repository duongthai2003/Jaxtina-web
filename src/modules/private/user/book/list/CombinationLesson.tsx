import { icons, images } from "@/assets";
import { StepWrapper,CombinationBg,
  CombinationList,
  CombinationCard,
  CombinationImage,
  CombinationIllustration,
  CombinationContent,
  CombinationTitle,
  CombinationLessonInfo,
  CombinationLessonIcon,
  CombinationLessonCount,
  CombinationMetaRow,
  CombinationProgressTrack,
  CombinationProgressFill, } from "./content/style";
import { combinationLessons } from "@/modules/public/courses/course/datafake";
import { BookStyles } from "./style";

const imgCombLesson = [
  { id: 1, img: images.combination1 },
  { id: 2, img: images.combination2 },
  { id: 3, img: images.combination3 },
  { id: 4, img: images.combination4 },
];

const CombinationLesson = () => {
  const { CourseCard } = BookStyles;
  return (
    <CourseCard>
      <StepWrapper>
        <CombinationBg>
          <CombinationList>
            {combinationLessons.map((lesson, index) => {
              const illustration =
                imgCombLesson[index]?.img ??
                imgCombLesson[imgCombLesson.length - 1]?.img;

              return (
                <CombinationCard key={lesson.id}>
                  <CombinationImage src={images.BgComb} alt={lesson.title} />
                  {illustration && (
                    <CombinationIllustration
                      src={illustration}
                      alt={lesson.title}
                    />
                  )}
                  <CombinationContent>
                    <CombinationTitle>
                      {lesson.title}
                      <CombinationProgressTrack>
                        <CombinationProgressFill
                          $percentage={lesson.progress}
                        />
                      </CombinationProgressTrack>
                    </CombinationTitle>
                    <CombinationMetaRow>
                      <CombinationLessonInfo>
                        <CombinationLessonIcon
                          src={icons.noteBookpurple}
                          alt="Notebook"
                        />
                        <CombinationLessonCount>
                          {lesson.lessonCount} Bài học
                        </CombinationLessonCount>
                      </CombinationLessonInfo>
                    </CombinationMetaRow>
                  </CombinationContent>
                </CombinationCard>
              );
            })}
          </CombinationList>
        </CombinationBg>
      </StepWrapper>
    </CourseCard>
  );
};
export default CombinationLesson;
