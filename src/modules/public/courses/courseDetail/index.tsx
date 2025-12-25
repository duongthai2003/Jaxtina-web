import { useState } from "react";
import { Col, Row } from "antd";
import ProgressOverview from "@/components/courses/ProgressOverview";
import { CommonBreadcrumb } from "@/components/Breadcrumb";
import CourseInfo from "@/components/courses/CourseInfo";
import Programme from "@/components/courses/Programme";
import Statistical from "@/components/courses/Statistical";
import { CD } from "./style";
import { courseDetailNavbar } from "@/utils/menuList";
import { PATHS } from "@/routers/path";
import { MenuInfo } from "rc-menu/lib/interface";
const courseHeaderMapping = {
  programme: "Starter",
  statistical: "Thống kê",
  courseInfo: "Thông tin khoá học",
};
const componentMapping = {
  programme: <Programme />,
  statistical: <Statistical />,
  courseInfo: <CourseInfo />,
};
const CourseDetail = () => {
  const [current, setCurrent] = useState("programme");

  const onClick = (e: MenuInfo) => {
    console.log(e.key);
    setCurrent(e.key);
  };
  return (
    <CD.wrapper>
      <CommonBreadcrumb
        items={[
          { label: "Khoá học", path: PATHS.private.user.course() },
          {
            label:
              courseHeaderMapping[current as keyof typeof courseHeaderMapping],
          },
        ]}
      />

      <CD.navbar>
        <CD.navbarMenu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={courseDetailNavbar}
        />
      </CD.navbar>
      <Row>
        <Col span={16}>
          <CD.wrapperContent>
            <CD.CourseHeader>
              {courseHeaderMapping[current as keyof typeof courseHeaderMapping]}
            </CD.CourseHeader>
            <CD.content>
              {componentMapping[current as keyof typeof componentMapping]}
            </CD.content>
          </CD.wrapperContent>
        </Col>

        <Col span={8}>
          <ProgressOverview />
        </Col>
      </Row>
    </CD.wrapper>
  );
};
export default CourseDetail;
