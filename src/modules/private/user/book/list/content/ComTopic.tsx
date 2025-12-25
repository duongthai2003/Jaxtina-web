import { useTheme } from 'styled-components';
import { getCircularProgress } from '@/utils/func/circularProgress';
import { comTopicList, learnedTopics, progressPercentage, totalTopics } from '@/utils/constants';
import { themes } from '@/configs/theme';
import { PATHS } from '@/routers/path';
import { CommonBreadcrumb } from '../../../../../../components/Breadcrumb';
import ProcessCompleteEng from '../ProcessComEng';
import { images, icons } from '@/assets';
import { BookStyles } from '../style';
import {
    BackgroundStepImage,
    CircularProgressWrapper,
    StepWrapper,
    ComTopicList,
    TopicCard,
    CircularProgressText,
    TopicTitle,
    TopicIcon,
    CommunicateWrapper,
    ImgCommunicate,
    TextCommunicate,
    ImgBeae,
    LearnedProgressWrapper,
    LearnedText,
    ProgressBarContainer,
    ProgressBarFill,
    ProgressText,
    Timeline
} from './style';
import { useNavigate } from 'react-router-dom';

const ComTopic = () => {
    const theme = useTheme();
    const {
        BookPageContainer,
        MainContent,
        CourseCard,
        CircularProgressBackground,
        SidebarContainer
    } = BookStyles
    const navigate = useNavigate()
    return (
        <BookPageContainer>
            <MainContent>
                <CommonBreadcrumb
                    items={[
                        { label: "Sách công nghệ", path: PATHS.private.user.book() },
                        { label: "Complete English", path: PATHS.private.user.completeEnglish() },
                        { label: "Chủ đề giao tiếp" }
                    ]}
                />
                <CourseCard>
                    <StepWrapper>
                        <BackgroundStepImage src={images.bgBook} />
                        <Timeline>
                            {comTopicList.map((topic, index) => {
                                const progress = getCircularProgress(topic.percentage);
                                const gradientId = `topicProgressGradient${index}`;
                                const isComplete = topic.percentage === 100;
                                const isLocked = (topic as any).requiresPayment === true;
                                let iconSrc;
                                if (isLocked) {
                                    iconSrc = icons.lock;
                                } else if (isComplete) {
                                    iconSrc = icons.correct;
                                } else {
                                    iconSrc = icons.rowCommunicate;
                                }
                                const textColor = isLocked ? theme.book.$color_bluegray_400 : (isComplete ? theme.book.$color_green_500 : (topic.percentage > 0 ? theme.book.$stroke_sky_600 : theme.book.$color_bluegray_400));

                                const ProgressSvg = isComplete ? BookStyles.CircularProgressSvgGreen : BookStyles.CircularProgressSvgBlue;
                                const handleNavigateByTypeGame = (typeGame: string, gameId: string) => {
                                    navigate(PATHS.private.user.game(typeGame, gameId));
                                };

                                return (
                                    <ComTopicList key={index} onClick={() => handleNavigateByTypeGame(topic.typeGame, topic.gameId)}>
                                        <TopicCard>
                                            <CircularProgressWrapper>
                                                <ProgressSvg viewBox="0 0 64 64">
                                                    <defs>
                                                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                                            {isLocked ? (
                                                                <>
                                                                    <stop offset="0%" stopColor={themes.book.$color_bluegray_400} />
                                                                    <stop offset="100%" stopColor={themes.book.$color_bluegray_400} />
                                                                </>
                                                            ) : isComplete ? (
                                                                <>
                                                                    <stop offset="50%" stopColor={themes.book.$color_green_50} />
                                                                    <stop offset="100%" stopColor={themes.book.$color_green_200} />
                                                                </>
                                                            ) : topic.percentage > 0 ? (
                                                                <>
                                                                    <stop offset="40%" stopColor={themes.book.$stroke_sky_300} />
                                                                    <stop offset="100%" stopColor={themes.book.$stroke_sky_600} />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <stop offset="0%" stopColor={themes.book.$color_bluegray_400} />
                                                                    <stop offset="100%" stopColor={themes.book.$color_bluegray_400} />
                                                                </>
                                                            )}
                                                        </linearGradient>
                                                    </defs>
                                                    <CircularProgressBackground cx="32" cy="32" r="26" />
                                                    {!isLocked && topic.percentage > 0 && (
                                                        <BookStyles.CircularProgressBar
                                                            cx="32"
                                                            cy="32"
                                                            r="26"
                                                            $dasharray={progress.circumference}
                                                            $dashoffset={progress.offset}
                                                            $gradientId={gradientId}
                                                        />
                                                    )}
                                                </ProgressSvg>
                                                <CircularProgressText $color={textColor}>
                                                    {topic.percentage}%
                                                </CircularProgressText>
                                            </CircularProgressWrapper>
                                            <TopicTitle>{topic.title}</TopicTitle>
                                            <TopicIcon>
                                                <img src={iconSrc} alt={isLocked ? 'Locked' : isComplete ? 'Complete' : 'Continue'} />
                                            </TopicIcon>
                                        </TopicCard>
                                    </ComTopicList>
                                );
                            })}
                        </Timeline>
                    </StepWrapper>
                </CourseCard>
            </MainContent>
            <SidebarContainer>
                <CommunicateWrapper>
                    <ImgCommunicate src={images.bgcommunicate} preview={false} />
                    <TextCommunicate>CHỦ ĐỀ GIAO TIẾP</TextCommunicate>
                    <ImgBeae src={images.beae} preview={false} />
                    <LearnedProgressWrapper>
                        <LearnedText>Đã học:</LearnedText>
                        <ProgressBarContainer>
                            <ProgressBarFill $percentage={progressPercentage} />
                        </ProgressBarContainer>
                        <ProgressText>{learnedTopics}/{totalTopics}</ProgressText>
                    </LearnedProgressWrapper>
                </CommunicateWrapper>
                <ProcessCompleteEng />
            </SidebarContainer>
        </BookPageContainer>
    )
}
export default ComTopic