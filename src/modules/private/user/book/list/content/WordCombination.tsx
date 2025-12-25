import ProcessCompleteEng from "../ProcessComEng";
import CombinationLesson from "../CombinationLesson";
import {CommonBreadcrumb}from "../../../../../../components/Breadcrumb";
import {PATHS}from "@/routers/path";
import {learnedTopics,progressPercentage,totalTopics}from "@/utils/constants";
import {images}from "@/assets";
import {BookStyles}from "@/modules/private/user/book/list/style";
import {CommunicateWrapper,ImgBeae,ImgCommunicate,LearnedProgressWrapper,LearnedText,ProgressBarContainer,ProgressBarFill,ProgressText,TextCommunicate}from "./style";

const WordCombination=()=> {
        return (
            <BookStyles.BookPageContainer>
                <BookStyles.MainContent>
                    <CommonBreadcrumb
                        items={[
                            { label: "Sách công nghệ", path: PATHS.private.user.comTopic() },
                            { label: "Complete English", path: PATHS.private.user.completeEnglish() },
                            { label: "Cụm kết hợp từ" }
                        ]}
                    />
                    <CombinationLesson/>
                </BookStyles.MainContent>
                <BookStyles.SidebarContainer>
                    <CommunicateWrapper>
                        <ImgCommunicate src={images.bgcommunicate} preview={false} />
                        <TextCommunicate>TỪ LOẠI</TextCommunicate>
                        <ImgBeae src={images.beae} preview={false}/>
                        <LearnedProgressWrapper>
                            <LearnedText>Đã học:</LearnedText>
                            <ProgressBarContainer>
                                <ProgressBarFill $percentage={progressPercentage} />
                            </ProgressBarContainer>
                            <ProgressText>{learnedTopics}/{totalTopics}</ProgressText>
                        </LearnedProgressWrapper>
                    </CommunicateWrapper>
                    <ProcessCompleteEng />
                </BookStyles.SidebarContainer>
    
            </BookStyles.BookPageContainer>
        )
}
export default WordCombination