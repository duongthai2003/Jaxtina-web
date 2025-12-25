import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Pagination as AntPagination, Skeleton } from "antd";
import { useAllBook, useAllBookPagination } from "@/hooks/useBookQuery";
import FeaturedCourse from "@/modules/private/user/book/list/FeaturedCourse";
import { getCircularProgress } from "@/utils/func/circularProgress";
import { progressItems } from "@/utils/constants";
import { Book, Pagination as BookPaginationMeta} from "./type";
import { icons } from "@/assets";
import { BookStyles } from "./style";


const ITEMS_PER_PAGE = 10;
const PREVIEW_LIMIT = ITEMS_PER_PAGE;

const getPaginationMeta = (
  pagination?: BookPaginationMeta | BookPaginationMeta[]
): BookPaginationMeta | undefined => {
  if (!pagination) {
    return undefined;
  }
  return Array.isArray(pagination) ? pagination[0] : pagination;
};

const BookPage = () => {
  const {
    BookPageContainer,
    MainContent,
    HeaderSection,
    CategoryLabel,
    MainTitle,
    Subtitle,
    CourseCard,
    CourseCardImage,
    SidebarContainer,
    SidebarSection,
    SidebarHeader,
    SidebarIcon,
    SidebarTitle,
    ProgressItem,
    ProgressIcon,
    ProgressContent,
    ProgressCourseName,
    ProgressLessonName,
    CircularProgressWrapper,
    CircularProgressBackground,
    CircularProgressBar,
    CircularProgressText,
  } = BookStyles;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: previewBooks, isLoading: previewLoading } = useAllBook();
  const previewBookList: Book[] = previewBooks?.data ?? [];
  const shouldUsePagination = previewBookList.length > ITEMS_PER_PAGE;
  const {
    data: paginatedBooks,
    isLoading: paginatedLoading,
  } = useAllBookPagination(currentPage, ITEMS_PER_PAGE, "");
  const isLoading = previewLoading || paginatedLoading;

  useEffect(() => {
    if (!shouldUsePagination && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [shouldUsePagination, currentPage]);

  const paginatedBookList: Book[] = paginatedBooks?.data ?? [];
  const booksToRender: Book[] = shouldUsePagination
    ? paginatedBookList
    : previewBookList.slice(0, ITEMS_PER_PAGE);
  const paginationMeta = getPaginationMeta(paginatedBooks?.pagination);
  const shouldRenderPagination = shouldUsePagination && Boolean(paginationMeta);

  return (
    <BookPageContainer>
      <MainContent>
        <HeaderSection>
          <CategoryLabel>Sách công nghệ</CategoryLabel>
          <MainTitle>Sách Công Nghệ</MainTitle>
          <Subtitle>Giao Tiếp Tự Tin, Ngữ Pháp Toàn Diện!</Subtitle>
        </HeaderSection>
        <CourseCard>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} loading={true} />
            ))
          ) : (
            booksToRender.map((book) => (
              <CourseCardImage
                key={book._id}
                src={book.imageSrc || book.url}
                alt={book.name}
                onClick={() => navigate(`${book.path}/${book._id}`)}
                style={{ cursor: 'pointer' }}
              />
            ))
          )}

        </CourseCard>
        {shouldRenderPagination && paginationMeta && (
          <AntPagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={paginationMeta.total}
            onChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        )}
      </MainContent>

      <SidebarContainer>
        <SidebarHeader>
          <SidebarIcon>
            <img src={icons.progressStudy} alt="Tiến độ học tập" />
          </SidebarIcon>
          <SidebarTitle>Tiến độ học tập</SidebarTitle>
        </SidebarHeader>
        <SidebarSection>
          {progressItems.map((item, index) => {
            const progress = getCircularProgress(item.percentage);
            const gradientId = `progressGradient${index + 1}`;
            return (
              <div key={item.id}>
                <ProgressItem>
                  <ProgressIcon>
                    <img src={icons.noteBook} alt="Book icon" />
                  </ProgressIcon>
                  <ProgressContent>
                    <ProgressLessonName>{item.lessonName}</ProgressLessonName>
                    <ProgressCourseName>{item.courseName}</ProgressCourseName>
                  </ProgressContent>
                  <CircularProgressWrapper>
                    <BookStyles.CircularProgressSvgBlue viewBox="0 0 64 64">
                      <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="40%" stopColor="#ACC6FF" />
                          <stop offset="100%" stopColor="#4F9AF0" />
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
                    </BookStyles.CircularProgressSvgBlue>
                    <CircularProgressText>{item.percentage}%</CircularProgressText>
                  </CircularProgressWrapper>
                </ProgressItem>
                {index < progressItems.length - 1 && (
                  <Divider style={{ margin: "-20px 0px -10px 0px" }} />
                )}
              </div>
            );
          })}
        </SidebarSection>
        <SidebarHeader>
          <SidebarIcon>
            <img src={icons.note} alt="Khoá học nổi bật" />
          </SidebarIcon>
          <SidebarTitle>Khoá học nổi bật</SidebarTitle>
        </SidebarHeader>
        <FeaturedCourse />
      </SidebarContainer>
    </BookPageContainer>
  );
};

export default BookPage;
