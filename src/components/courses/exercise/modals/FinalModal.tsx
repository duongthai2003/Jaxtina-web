import styled from "styled-components";
import { POP } from "@/components/PopupVerifyEmail/style";
import { convertPixelToRem } from "@/utils/func/convertRem";
import { ExerciseModalProps } from "@/utils/type";
import { BaseTag } from "@/utils/baseTagHTML";
import { PATHS } from "@/routers/path";
import { icons } from "@/assets";

const FinalModal = ({ isOpen, setIsOpen }: ExerciseModalProps) => {
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <POP.AntModal
      centered
      open={isOpen}
      closable={false}
      footer={false}
      onCancel={handleCancel}
    >
      <POP.PopupWrapper>
        <FinalContent>
          <Star>
            <StarImage src={icons.achievements} alt="" />
            <BaseTag.p>+0</BaseTag.p>
          </Star>
          <BaseTag.p>Bạn tiếp tục nỗ lực hơn nhé!</BaseTag.p>
        </FinalContent>
        <POP.ConfirmButton>
          <BaseTag.div>
            <POP.ConfirmButtonItem onClick={handleCancel} title="Học lại" />
          </BaseTag.div>
          <BaseTag.div>
            <BaseTag.a href={PATHS.private.user.lesson("courseId", "lessonId")}>
              <POP.ConfirmButtonItem title="Tiếp tục" />
            </BaseTag.a>
          </BaseTag.div>
        </POP.ConfirmButton>
      </POP.PopupWrapper>
    </POP.AntModal>
  );
};

export default FinalModal;
const FinalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${convertPixelToRem(10)};
  margin-bottom: ${convertPixelToRem(20)};
`;
const Star = styled.div`
  display: flex;
  align-items: center;
  gap: ${convertPixelToRem(12)};
  font-weight: bold;
  font-size: ${convertPixelToRem(20)};
  gap: ${convertPixelToRem(50)};
  justify-content: center;
  color: ${(p) => p.theme.auth.$score_progress};
`;
const StarImage = styled.img`
  width: ${convertPixelToRem(40)};
  height: ${convertPixelToRem(40)};
`;
