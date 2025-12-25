import { useNavigate } from "react-router-dom";
import { BackgroundStepImage, ImgStep, StepCard, Timeline, StepWrapper, ImgStepGr2, ImgGroupGr2 } from "./content/style";
import { BookStyles } from "@/modules/private/user/book/list/style";
import { Topic, useGetTopicsByBookId } from "@/hooks/useTopic";
import { PATHS } from "@/routers/path";
import { useAllBook } from "@/hooks/useBookQuery";

interface StepCompleteEngProps {
    bookId: string;
    code: string;
}

const StepCompleteEng = ({ bookId, code }: StepCompleteEngProps) => {
    const {
        CourseCard
    } = BookStyles
    const navigate = useNavigate();
    const { data: topicsData } = useGetTopicsByBookId(bookId);
    const topicsToRender: Topic[] = Array.isArray(topicsData?.data) ? topicsData.data : [topicsData?.data].filter(Boolean);
    // const topicId = useParams()
    const { data: bookData } = useAllBook();
    const book = bookData?.data?.find(book => {
        const bookCode = book.code?.toLowerCase().replace(/_/g, '-');
        const bookPath = book.path?.toLowerCase().replace('/book/', '');
        return bookCode === code?.toLowerCase() || bookPath === code?.toLowerCase();
    });
    const background_url = book?.backgroundSrc || book?.background_url;
    const road_url = book?.roadSrc || book?.road_url;

    return (
        <CourseCard>
            <StepWrapper>
                <BackgroundStepImage
                    src={background_url}
                />
                <ImgGroupGr2 src={road_url} />
                <Timeline>
                    {topicsToRender.map((topic) => (
                        <StepCard key={topic._id}>
                            {code === "complete-grammar-2" ? (<ImgStepGr2
                                src={topic.image}
                                alt={topic.name}
                                onClick={() => navigate(topic._id)}
                            />) :
                                (<ImgStep
                                    src={topic.image || topic.imageSrc}
                                    alt={topic.name}
                                    onClick={() => navigate(PATHS.private.user.comTopic())}
                                />)}
                            {/* <TextTopic>
                                {topic.name}
                            </TextTopic> */}
                        </StepCard>
                    ))}
                </Timeline>
            </StepWrapper>
        </CourseCard>
    )
}
export default StepCompleteEng
