import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { icons } from "@/assets";

const NotFound = () => {
  return (
    <Wrapper>
      <Gif src={icons.jaxSadGif} alt="" />
      <Text>Không tìm thấy khóa học</Text>
    </Wrapper>
  );
};
export default NotFound;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${convertPixelToRem(16)};
  height: 100%;
`;
const Gif = styled.img`
  width: ${convertPixelToRem(200)};
  height: ${convertPixelToRem(300)};
`;
const Text = styled.div`
  font-size: ${convertPixelToRem(20)};
  font-weight: bold;
  color: ${(p) => p.theme.$tw_black};
`;
