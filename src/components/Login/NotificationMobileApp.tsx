import styled from "styled-components";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { BaseTag } from "@/utils/baseTagHTML";
import { icons, images } from "@/assets";

const NotificationMobileApp = () => {
  return (
    <UseMobileApp>
      <UseMobileImg>
        <BaseTag.img src={images.jaxUserChibi} alt="" />
      </UseMobileImg>
      <BaseTag.p>Hãy sử dụng app để có những trải nghiệm tốt nhất</BaseTag.p>
      <DownWrapper>
        <UseMobileImgDown href="https://play.google.com/store/apps/details?id=com.jax.english&pli=1">
          <BaseTag.img src={icons.dowAndroi} alt="" />
        </UseMobileImgDown>
        <UseMobileImgDown href="https://apps.apple.com/gb/app/jaxtina-english-h%E1%BB%8Dc-ti%E1%BA%BFng-anh/id1579005327">
          <BaseTag.img src={icons.downIos} alt="" />
        </UseMobileImgDown>
      </DownWrapper>
    </UseMobileApp>
  );
};

export default NotificationMobileApp;

const UseMobileApp = styled.div`
  background-color: ${(props) => props.theme.$tw_red_600};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 ${convertPixelToRem(20)};
  & p {
    text-align: center;
    color: ${(props) => props.theme.$tw_white};
  }
`;
const UseMobileImg = styled.div`
  & img {
    max-width: ${convertPixelToRem(200)};
    object-fit: contain;
  }
`;
const UseMobileImgDown = styled.a`
  & img {
    max-width: ${convertPixelToRem(140)};
    height: ${convertPixelToRem(50)};
    object-fit: contain;
  }
`;
const DownWrapper = styled.div`
  display: flex;
  gap: ${convertPixelToRem(20)};
  margin-top: ${convertPixelToRem(40)};
`;
