import React, { useEffect, useMemo, useState } from "react";
import { CircleCheck } from "lucide-react";
import { get } from "lodash";
import { POP } from "./style";
import { useDetailUser } from "@/hooks/useDetailUser";
import { getCookieStorage, setOneCookieStorage } from "@/helper/storage";
import { LOCAL_STORAGE_DATA } from "@/utils/constants";
import { BaseTag } from "@/utils/baseTagHTML";
import { images } from "@/assets";
import { PATHS } from "@/routers/path";

const PopupVerifyEmail: React.FC = () => {
  const userId = getCookieStorage(LOCAL_STORAGE_DATA.USER_ID) || "";
  const { data: dataDetail, isLoading } = useDetailUser(userId);
  const isVerifyEmail = getCookieStorage(
    LOCAL_STORAGE_DATA.IS_OPEN_POPUP_VERIFY
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOneCookieStorage(
      LOCAL_STORAGE_DATA.IS_OPEN_POPUP_VERIFY,
      !e.target.checked
    );
  };

  const isVerify = useMemo(() => {
    const userVerifyEmail = get(
      dataDetail,
      "data.user.emailVerify.verified",
      false
    );

    // Chỉ true khi cookie = true và userVerifyEmail = false
    if (isVerifyEmail === "true" && userVerifyEmail === false) {
      return true;
    }

    return false;
  }, [isVerifyEmail, dataDetail]);

  useEffect(() => {
    setIsModalOpen(isVerify);
  }, [dataDetail, isLoading]);

  return (
    <>
      <POP.AntModal
        onCancel={handleCancel}
        centered
        closable={false}
        open={isModalOpen}
        footer={false}
      >
        <POP.PopupWrapper>
          <POP.PopupImag>
            <BaseTag.img src={images.emailVerify} alt="" />
            <BaseTag.p>Vui lòng xác thực Email</BaseTag.p>
          </POP.PopupImag>
          <POP.TextContent>
            <BaseTag.p>Xác thực Email giúp bạn:</BaseTag.p>
            <POP.TextContentItem>
              <CircleCheck size={20} color="green" />
              <BaseTag.p>Tránh mất tài khoản</BaseTag.p>
            </POP.TextContentItem>
            <POP.TextContentItem>
              <CircleCheck size={20} color="green" />
              <BaseTag.p>
                Sử dụng được đầy đủ các chức năng của ứng dụng
              </BaseTag.p>
            </POP.TextContentItem>
          </POP.TextContent>
          <POP.Dismiss htmlFor="dismiss">
            <POP.CheckboxInput
              onChange={onChanges}
              id="dismiss"
              type="checkbox"
            />
            <BaseTag.p> Không hiển thị lại trong lần đăng nhập này</BaseTag.p>
          </POP.Dismiss>

          <POP.ConfirmButton>
            <BaseTag.div>
              {" "}
              <POP.ConfirmButtonItem onClick={handleCancel} title="Để sau" />
            </BaseTag.div>
            <BaseTag.div>
              <BaseTag.a href={PATHS.private.user.verifyEmail()}>
                <POP.ConfirmButtonItem title="Xác thực ngay" />
              </BaseTag.a>
            </BaseTag.div>
          </POP.ConfirmButton>
        </POP.PopupWrapper>
      </POP.AntModal>
    </>
  );
};

export default PopupVerifyEmail;
