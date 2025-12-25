import { featuredCourses } from "@/utils/constants"
import { BookStyles } from "./style";

const FeaturedCourse = () => {
    const {
      FeaturedCoursesGrid,
      FeaturedCourseCard,
      FeaturedCourseImage,
      FeaturedCourseContent,
      FeaturedCourseCode,
      FeaturedCourseDetails,
      FeaturedCourseDetail,
      EnrollButton,
    } = BookStyles
    return (
        <FeaturedCoursesGrid>
            {featuredCourses.map((course) => (
              <FeaturedCourseCard key={course.id}>
                <FeaturedCourseImage $imageUrl={course.imageUrl} />
                <FeaturedCourseContent>
                  <FeaturedCourseCode>{course.code}</FeaturedCourseCode>
                  <FeaturedCourseDetails>
                    <FeaturedCourseDetail><b>Kind:</b> {course.kind}</FeaturedCourseDetail>
                    <FeaturedCourseDetail><b>Level:</b> {course.level}</FeaturedCourseDetail>
                  </FeaturedCourseDetails>
                  <EnrollButton>Vào học</EnrollButton>
                </FeaturedCourseContent>
              </FeaturedCourseCard>
            ))}
          </FeaturedCoursesGrid>
    )
}
export default FeaturedCourse;