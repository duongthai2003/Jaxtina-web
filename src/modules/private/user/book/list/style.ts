import styled from "styled-components";
import { Button } from "antd";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { device } from "@/utils/deviceBreakpoint";
import { themes } from "@/configs/theme";

const BookPageContainer = styled.div`
  display: flex;
  gap: ${convertPixelToRem(24)};
  max-width: auto;
  margin: auto;
  @media (max-width: ${device.laptop}px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(24)};
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(8)};
  margin-bottom: ${convertPixelToRem(16)};
`;

const CategoryLabel = styled.p`
  font-size: ${convertPixelToRem(14)};
  color: ${(props) => props.theme.auth.$input_label};
  margin: 0;
  font-weight: ${convertPixelToRem(500)};
`;

const MainTitle = styled.h1`
  font-size: ${convertPixelToRem(32)};
  font-weight: ${convertPixelToRem(700)};
  color: ${(props) => props.theme.auth.$btn_color_primary};
  padding-top: ${convertPixelToRem(10)};
  margin-bottom: ${convertPixelToRem(-8)};
`;

const Subtitle = styled.p`
  font-size: ${convertPixelToRem(20)};
  color: ${(props) => props.theme.book.$subtitle};
  margin: 0;
  font-weight: ${convertPixelToRem(500)};
`;

const CourseCard = styled.div`
  border-radius: ${convertPixelToRem(16)};
  padding: ${convertPixelToRem(0)};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:hover {
    transform: translateY(${convertPixelToRem(-4)});
  }
`;

const CourseCardImage = styled.img`
  width: 100%;
  padding-bottom: ${convertPixelToRem(30)};
  height: auto;
  display: block;
  object-fit: contain;
  border-radius: ${convertPixelToRem(16)};
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(4)};
  width: ${convertPixelToRem(360)};
  flex-shrink: 0;
  @media (max-width: ${device.laptop}px) {
    width: 100%;
  }
`;

const SidebarSection = styled.div`
  background-color: ${(props) => props.theme.$bg_white};
  border-radius: ${convertPixelToRem(16)};
  padding: ${convertPixelToRem(1)};
  border: ${convertPixelToRem(2)} solid ${(props) => props.theme.$border_signup};
`;

const SidebarHeader = styled.div<{ $hasBackground?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(12)};
  margin-bottom: ${convertPixelToRem(12)};
  margin-top: ${convertPixelToRem(30)};
  border-radius: ${(props) =>
    props.$hasBackground ? convertPixelToRem(8) : "0"};
`;

const SidebarIcon = styled.div`
  width: ${convertPixelToRem(20)};
  height: ${convertPixelToRem(20)};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SidebarTitle = styled.h3`
  font-size: ${convertPixelToRem(18)};
  font-weight: bold;
  color: ${(props) => props.theme.$color_text};
  margin: 0;
`;

const ProgressItem = styled.div`
  border-radius: ${convertPixelToRem(12)};
  padding: ${convertPixelToRem(16)};
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(16)};
  margin-bottom: ${convertPixelToRem(12)};
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProgressIcon = styled.div`
  width: ${convertPixelToRem(40)};
  height: ${convertPixelToRem(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: ${convertPixelToRem(1)} solid ${(props) => props.theme.$tw_red_200};
  border-radius: 50%;
  background-color: ${(props) => props.theme.$tw_red_50};
  img {
    width: ${convertPixelToRem(24)};
    height: ${convertPixelToRem(24)};
    object-fit: contain;
  }
`;

const ProgressContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(4)};
`;

const ProgressLessonName = styled.p`
  font-size: ${convertPixelToRem(14)};
  font-weight: ${convertPixelToRem(500)};
  color: ${(props) => props.theme.$color_text};
  margin: 0;
`;

const ProgressCourseName = styled.p`
  font-size: ${convertPixelToRem(12)};
  color: ${(props) => props.theme.$tw_stone_500};
  margin: 0;
`;

const CircularProgressWrapper = styled.div`
  position: relative;
  width: ${convertPixelToRem(64)};
  height: ${convertPixelToRem(64)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  order: 3;
`;

const CircularProgressSvgBlue = styled.svg`
  transform: rotate(90deg);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const CircularProgressSvgGreen = styled.svg`
  transform: rotate(60deg);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const CircularProgressBackground = styled.circle`
  fill: none;
  stroke: ${(props) => props.theme.$tw_stone_200};
  stroke-width: 4;
`;

const CircularProgressBar = styled.circle<{ $dasharray: number; $dashoffset: number; $gradientId: string }>`
  fill: none;
  stroke: url(#${(props) => props.$gradientId});
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: ${(props) => props.$dasharray};
  stroke-dashoffset: ${(props) => props.$dashoffset};
  transition: stroke-dashoffset 0.3s ease;
`;

const CircularProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${convertPixelToRem(12)};
  font-weight: ${convertPixelToRem(600)};
  color: ${(props) => props.theme.book.$tw_stone_600};
  z-index: 1;
`;

const FeaturedCoursesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${convertPixelToRem(12)};
  border-radius: ${convertPixelToRem(16)};
`;

const FeaturedCourseCard = styled.div`
  background-color: ${(props) => props.theme.$bg_white};
  border-radius: ${convertPixelToRem(12)};
  border: ${convertPixelToRem(2)} solid ${(props) => props.theme.$border_signup};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(${convertPixelToRem(-2)});
    box-shadow: ${convertPixelToRem(0)} ${convertPixelToRem(4)}
      ${convertPixelToRem(12)} ${themes.$border_color};
  }
`;

const FeaturedCourseImage = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  height: ${convertPixelToRem(120)};
  background-image: ${(props) =>
    props.$imageUrl ? `url(${props.$imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
`;

const FeaturedCourseContent = styled.div`
  padding: ${convertPixelToRem(12)};
`;

const FeaturedCourseTitle = styled.h4`
  font-size: ${convertPixelToRem(14)};
  font-weight: ${convertPixelToRem(600)};
  color: ${themes.$color_white};
  margin: ${convertPixelToRem(0)};
  line-height: 1.3;
`;

const FeaturedCourseCode = styled.p`
  font-size: ${convertPixelToRem(12)};
  font-weight: ${convertPixelToRem(500)};
  color: ${(props) => props.theme.$color_text};
  margin: ${convertPixelToRem(8)} 0 ${convertPixelToRem(4)} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight:bold;
`;

const FeaturedCourseDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(4)};
  margin-bottom: ${convertPixelToRem(8)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FeaturedCourseDetail = styled.p`
  font-size: ${convertPixelToRem(12)};
  color: ${(props) => props.theme.auth.$title};
  margin: ${convertPixelToRem(0)};
  line-height: ${convertPixelToRem(16)};
`;

const EnrollButton = styled(Button)`
  width: 100%;
  height: ${convertPixelToRem(32)};
  background-color: ${themes.$tw_red_500};
  border: none;
  border-radius: ${convertPixelToRem(20)};
  color: ${themes.$color_white};
  font-size: ${convertPixelToRem(12)};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${themes.$tw_red_500};
    color: ${themes.$color_white};
  }
`;

export const BookStyles = {
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
  FeaturedCoursesGrid,
  FeaturedCourseCard,
  FeaturedCourseImage,
  FeaturedCourseContent,
  FeaturedCourseTitle,
  FeaturedCourseCode,
  FeaturedCourseDetails,
  FeaturedCourseDetail,
  EnrollButton,
  CircularProgressSvgBlue,
  CircularProgressSvgGreen
};

