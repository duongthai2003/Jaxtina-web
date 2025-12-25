import {useState} from "react";
import {Divider,Row} from "antd";
import {getCircularProgress} from "@/utils/func/circularProgress";
import {icons} from "@/assets";
import {completeLesson,incompleteLesson,stateBook} from "@/utils/constants";
import {themes} from "@/configs/theme";
import {SU} from "@/modules/public/auth/signup/style";
import { BookStyles } from "./style";
import { ColFinish, DeviderProcess, HoverInfo, HoverWrapper, ImgFinish, SegmentedProcess } from "./content/style";


const ProcessCompleteEng=()=> {
    const {
        SidebarSection,
        ProgressItem,
        ProgressIcon,
        ProgressContent,
        ProgressLessonName,
        CircularProgressWrapper,
        CircularProgressBackground,
        CircularProgressBar,
        CircularProgressText,
        CircularProgressSvgBlue,
        CircularProgressSvgGreen,
        EnrollButton
    } = BookStyles
    const [active, setActive] = useState(1);

    const checkStateBook = active === 1 ? completeLesson : incompleteLesson;

    return (
        <>
            <SegmentedProcess
                options={stateBook.map((item) => ({ label: item.title, value: item.id }))}
                value={active}
                onChange={(val) => setActive(Number(val))}
            />
            <SidebarSection>
                {active === 1 ? completeLesson.map((item, index) => {
                    const progress = getCircularProgress(item.percentage);
                    const gradientId = `progressGradient${index + 1}`;
                    return (
                        <div key={item.id}>
                            <HoverWrapper>
                                <ProgressItem>
                                    <ProgressIcon>
                                        <img src={icons.noteBook} alt="Book icon" />
                                    </ProgressIcon>
                                    <ProgressContent>
                                        <ProgressLessonName>{item.title}</ProgressLessonName>
                                    </ProgressContent>
                                    <CircularProgressWrapper>
                                        <CircularProgressSvgGreen viewBox="0 0 64 64">
                                            <defs>
                                                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="50%" stopColor={themes.book.$color_green_50} />
                                                    <stop offset="100%" stopColor={themes.book.$color_green_200} />
                                                </linearGradient>
                                            </defs>
                                            <CircularProgressBackground cx="32" cy="32" r="26" />
                                            <CircularProgressBar
                                                cx="32"
                                                cy="32"
                                                r="26"
                                                $dasharray={progress.circumference}
                                                $dashoffset={progress.offset}
                                                $gradientId={gradientId}
                                            />
                                        </CircularProgressSvgGreen>
                                        <CircularProgressText>{item.percentage}%</CircularProgressText>
                                    </CircularProgressWrapper>
                                </ProgressItem>
                                <HoverInfo>
                                    <SU.Text>{item.title}</SU.Text>
                                    <Row>
                                        <ColFinish>
                                            <CircularProgressWrapper>
                                                <CircularProgressSvgBlue viewBox="0 0 64 64">
                                                    <defs>
                                                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="40%" stopColor={themes.book.$stroke_sky_300} />
                                                            <stop offset="100%" stopColor={themes.book.$stroke_sky_600} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CircularProgressBackground cx="32" cy="32" r="26" />
                                                    <CircularProgressBar
                                                        cx="32"
                                                        cy="32"
                                                        r="26"
                                                        $dasharray={progress.circumference}
                                                        $dashoffset={progress.offset}
                                                        $gradientId={gradientId}
                                                    />
                                                </CircularProgressSvgBlue>
                                                <CircularProgressText>{item.percentage}%</CircularProgressText>
                                            </CircularProgressWrapper>
                                        </ColFinish>
                                        <ColFinish>
                                            <Row>
                                                <ImgFinish src={icons.correct} />
                                                {item.correct} câu đúng
                                            </Row>
                                            <Row>
                                                <ImgFinish src={icons.error} />
                                                {item.incorrect} câu sai
                                            </Row>
                                        </ColFinish>
                                    </Row>
                                    <EnrollButton>Học tiếp</EnrollButton>
                                </HoverInfo>
                            </HoverWrapper>
                            {index < checkStateBook.length - 1 && (
                                <Divider style={{ margin: "-20px 0px -10px 0px" }} />
                            )}
                        </div>
                    );
                }) : incompleteLesson.map((item, index) => {
                    const progress = getCircularProgress(item.percentage);
                    const gradientId = `progressGradient${index + 1}`;
                    return (
                        <div key={item.id}>
                            <HoverWrapper>
                                <ProgressItem>
                                    <ProgressIcon>
                                        <img src={icons.noteBook} alt="Book icon" />
                                    </ProgressIcon>
                                    <ProgressContent>
                                        <ProgressLessonName>{item.title}</ProgressLessonName>
                                    </ProgressContent>
                                    <CircularProgressWrapper>
                                        <CircularProgressSvgBlue viewBox="0 0 64 64">
                                            <defs>
                                                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="40%" stopColor={themes.book.$stroke_sky_300} />
                                                    <stop offset="100%" stopColor={themes.book.$stroke_sky_600} />
                                                </linearGradient>
                                            </defs>
                                            <CircularProgressBackground cx="32" cy="32" r="26" />
                                            <CircularProgressBar
                                                cx="32"
                                                cy="32"
                                                r="26"
                                                $dasharray={progress.circumference}
                                                $dashoffset={progress.offset}
                                                $gradientId={gradientId}
                                            />
                                        </CircularProgressSvgBlue>
                                        <CircularProgressText>{item.percentage}%</CircularProgressText>
                                    </CircularProgressWrapper>
                                </ProgressItem>
                                <HoverInfo>
                                    <SU.Text>{item.title}</SU.Text>
                                    <Row>
                                        <ColFinish>
                                            <CircularProgressWrapper>
                                                <CircularProgressSvgBlue viewBox="0 0 64 64">
                                                    <defs>
                                                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="40%" stopColor={themes.book.$stroke_sky_300} />
                                                            <stop offset="100%" stopColor={themes.book.$stroke_sky_600} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CircularProgressBackground cx="32" cy="32" r="26" />
                                                    <CircularProgressBar
                                                        cx="32"
                                                        cy="32"
                                                        r="26"
                                                        $dasharray={progress.circumference}
                                                        $dashoffset={progress.offset}
                                                        $gradientId={gradientId}
                                                    />
                                                </CircularProgressSvgBlue>
                                                <CircularProgressText>{item.percentage}%</CircularProgressText>
                                            </CircularProgressWrapper>
                                        </ColFinish>
                                        <ColFinish>
                                            <Row>
                                                <ImgFinish src={icons.unfinish}/>
                                                {item.notAttempted} câu chưa làm
                                            </Row>
                                            <Row>
                                                <ImgFinish src={icons.correct} />
                                                {item.correct} câu đúng
                                            </Row>
                                            <Row>
                                                <ImgFinish src={icons.error} />
                                                {item.incorrect} câu sai
                                            </Row>
                                        </ColFinish>
                                    </Row>
                                    <EnrollButton>Học tiếp</EnrollButton>
                                </HoverInfo>
                            </HoverWrapper>
                            {index < incompleteLesson.length - 1 && (
                                <DeviderProcess/>
                            )}
                        </div>
                    );
                })
                }
            </SidebarSection>
        </>

    )
}
export default ProcessCompleteEng
