import FeaturedCourse from '@/modules/private/user/book/list/FeaturedCourse';
import StepCompleteEng from '@/modules/private/user/book/list/StepCompleteEng';
import ProcessCompleteEng from './ProcessComEng';
import {CommonBreadcrumb} from '@/components/Breadcrumb';
import {PATHS}from '@/routers/path';
import {icons}from '@/assets';
import { BookStyles } from './style';
import { useParams } from 'react-router-dom';

const CompleteEnglish = () => {
    const {
        BookPageContainer,
        MainContent,
        SidebarContainer,
        SidebarHeader,
        SidebarIcon,
        SidebarTitle,
    } = BookStyles;

    const { bookId, code,} = useParams();
    return (
        <BookPageContainer>
            <MainContent>
                <CommonBreadcrumb
                    items={[
                        { label: "Sách công nghệ", path: PATHS.private.user.book() },
                        {label: `${code}` }
                    ]}
                />
            <StepCompleteEng bookId={bookId!} code = {code!}/>
            </MainContent>
            <SidebarContainer>
                <ProcessCompleteEng/>
                <SidebarHeader>
                    <SidebarIcon>
                        <img src={icons.note} alt="Khoá học nổi bật" />
                    </SidebarIcon>
                    <SidebarTitle>Khoá học nổi bật</SidebarTitle>
                </SidebarHeader>
                <FeaturedCourse />
            </SidebarContainer>
        </BookPageContainer>
    )
}

export default CompleteEnglish;
