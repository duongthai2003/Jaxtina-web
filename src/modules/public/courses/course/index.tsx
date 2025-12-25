import { useNavigate } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import { LockKeyhole } from "lucide-react";
import { Row, Col } from "antd";
import { get } from "lodash";
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import NotFound from "@/components/courses/NotFound";
import { courseItem, useGetCourseList } from "@/hooks/useGetCourseList";
import { CL } from "./style";
import { BaseTag } from "@/utils/baseTagHTML";
import { icons, images } from "@/assets";

const CoursePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetCourseList({
    page: currentPage,
    limit: 10,
  });
  const navigate = useNavigate();
  const courseList = get(data, "data", []);

  const handleClick = (id: string) => {
    navigate(`./${id}`);
  };
  return (
    <CL.CourseWrapper>
      <BaseTag.div>
        <CommonBreadcrumb items={[{ label: "Khoá học" }]} />
        <CL.CourseListBanner>
          <BaseTag.div>
            <CL.CourseListBannerContent>
              <CL.CourseListBannerTitle>
                <CL.CourseListBannerTitleHead>
                  Xin chào Emma!
                </CL.CourseListBannerTitleHead>
                <CL.CourseListBannerTitleImg src={icons.hand} alt="" />
              </CL.CourseListBannerTitle>
              <p>Chào mừng bạn đến với các khoá học của Jaxtina</p>
            </CL.CourseListBannerContent>
          </BaseTag.div>
        </CL.CourseListBanner>
        {isLoading ? (
          <SkeletonCourse />
        ) : courseList.length < 1 ? (
          <NotFound />
        ) : (
          <Row gutter={[20, 20]}>
            {courseList.map((item: courseItem, index: number) => {
              const dateCourseExpire = dayjs(item.end_date, "DD/MM/YYYY")
                .add(30, "day")
                .valueOf();
              const isCourseExpired = dateCourseExpire < dayjs().valueOf();

              return (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <CL.CourseItem>
                    <CL.Thumbnail src={images.et3} alt={item.class_name} />
                    <CL.CourseInfo>
                      <CL.CourseName>
                        <CL.Title>{item.class_name}</CL.Title>
                        {isCourseExpired && <LockKeyhole size={14} />}
                      </CL.CourseName>
                      <CL.Coursedes>
                        <BaseTag.p>
                          <BaseTag.span>Kind: </BaseTag.span>
                          {item.kind_of_course}
                        </BaseTag.p>
                        <BaseTag.p>
                          <BaseTag.span>Level:</BaseTag.span> {item.level}
                        </BaseTag.p>
                      </CL.Coursedes>
                      <CL.ActionButton
                        onClick={() => {
                          handleClick(item.id);
                        }}
                        title="Vào học"
                      />
                    </CL.CourseInfo>
                  </CL.CourseItem>
                </Col>
              );
            })}
          </Row>
        )}
      </BaseTag.div>
      {courseList.length > 1 && (
        <CL.PaginationAnt
          current={currentPage}
          total={data?.pagination.totalPages}
          pageSize={1}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </CL.CourseWrapper>
  );
};
export default CoursePage;
const SkeletonCourse = () => {
  return (
    <Row gutter={[20, 20]}>
      {new Array(10).fill(1).map((_, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={index}>
          <CL.CourseItem>
            <CL.SkeletonThum active />

            <CL.CourseInfo>
              <BaseTag.div>
                <CL.SkeletonList paragraph={{ rows: 3 }} active />
              </BaseTag.div>
              <CL.SkeletonButton active />
            </CL.CourseInfo>
          </CL.CourseItem>
        </Col>
      ))}
    </Row>
  );
};
