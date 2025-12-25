import { images } from "@/assets";
import { ST } from "../login/style";
import { BaseTag } from "@/utils/baseTagHTML";

export default function ImageSignUp() {
  return (
    <ST.PanelLogin>
      <BaseTag.div>
        <ST.Logo src={images.LogoWhite} alt="LogoWhite" />
      </BaseTag.div>
      <ST.PanelContent>
        <ST.PanelContentText>
          <BaseTag.p>Phát triển toàn diện 4 kỹ năng</BaseTag.p>
          <BaseTag.p>NGHE NÓI ĐỌC VIẾT</BaseTag.p>
        </ST.PanelContentText>
        <ST.FourSkillsBg>
          <BaseTag.img src={images.loginPanelcontent} alt="" />
        </ST.FourSkillsBg>
      </ST.PanelContent>
    </ST.PanelLogin>
  );
}
