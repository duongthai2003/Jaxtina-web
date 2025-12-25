import { Col, Row } from "antd";
import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { icons } from "@/assets";
import RadarChart from "../RadarChart/idex";
import { BaseTag } from "@/utils/baseTagHTML";
import { device } from "@/utils/deviceBreakpoint";

const ProgressOverview = () => {
  return (
    <BaseTag.div>
      <Progress>
        <Row gutter={[16, 16]}>
          <Col md={24} lg={12}>
            <ProgressItem>
              <ProgressItemTitle>
                <ProgressItemTitleNum>199</ProgressItemTitleNum>
                <BaseTag.p>Đã hoàn thành</BaseTag.p>
              </ProgressItemTitle>
              <BaseTag.div>
                <ProgressIcon src={icons.noteTick} alt="" />
              </BaseTag.div>
            </ProgressItem>{" "}
          </Col>

          <Col md={24} lg={12}>
            <ProgressItem>
              <ProgressItemTitle>
                <ProgressItemTitleNum>6.6%</ProgressItemTitleNum>
                <BaseTag.p>Làm bài thành công</BaseTag.p>
              </ProgressItemTitle>
              <BaseTag.div>
                <ProgressIcon src={icons.progress} alt="" />
              </BaseTag.div>
            </ProgressItem>{" "}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col md={24} lg={12}>
            <ProgressItem>
              <ProgressItemTitle>
                <ProgressItemTitleNum>
                  34 <ProgressItemSubTitle>phút</ProgressItemSubTitle>{" "}
                </ProgressItemTitleNum>
                <BaseTag.p>Thời gian tự học</BaseTag.p>
              </ProgressItemTitle>
              <BaseTag.div>
                <ProgressIcon src={icons.hourglass} alt="" />
              </BaseTag.div>
            </ProgressItem>{" "}
          </Col>
          <Col md={24} lg={12}>
            <ProgressItem>
              <ProgressItemTitle>
                <ProgressItemTitleNum>10%</ProgressItemTitleNum>
                <BaseTag.p>Hoàn thành khoá học</BaseTag.p>
              </ProgressItemTitle>
              <BaseTag.div>
                <ProgressIcon src={icons.noteTick} alt="" />
              </BaseTag.div>
            </ProgressItem>
          </Col>
        </Row>
        <RadarChart />
      </Progress>
    </BaseTag.div>
  );
};
export default ProgressOverview;
const Progress = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${convertPixelToRem(16)};
`;

const ProgressItem = styled.div`
  padding: ${convertPixelToRem(16)};
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(16)};
  border-radius: ${convertPixelToRem(16)};
  border: ${convertPixelToRem(1)} solid ${(p) => p.theme.$border_signup};
  background-color: ${(p) => p.theme.auth.$progressItem_bg};
  height: 100%;
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    padding: ${convertPixelToRem(14)};
  }
`;
const ProgressItemTitle = styled.div`
  flex-direction: column;
  display: flex;
  gap: ${convertPixelToRem(12)};
  font-size: ${convertPixelToRem(14)};
  font-weight: 500;
  color: ${(p) => p.theme.$tw_black};
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    font-size: ${convertPixelToRem(12)};
    gap: ${convertPixelToRem(8)};
    flex: 1;
  }
`;
const ProgressItemTitleNum = styled.p`
  font-size: ${convertPixelToRem(24)};
  font-weight: bold;
  line-height: ${convertPixelToRem(32)};
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    font-size: ${convertPixelToRem(20)};
    line-height: ${convertPixelToRem(25)};
  }
`;
const ProgressItemSubTitle = styled.span`
  font-size: ${convertPixelToRem(18)};
`;
const ProgressIcon = styled.img`
  @media (max-width: ${convertPixelToRem(device.tablet)}) {
    width: ${convertPixelToRem(30)};
  }
`;
