import styled from "styled-components";
import { icons } from "@/assets";
import { PATHS } from "@/routers/path";
import { ROLE_ACCOUNT } from "./constants";

export interface MenuItemType {
  label: string;
  key: string;
  icon?: any;
  children?: MenuItemType[];
  allowed_roles?: string[];
  to?: string;
}

const IconImage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const userMenuList: MenuItemType[] = [
  {
    key: "book",
    to: PATHS.private.user.book(),
    icon: (
      <IconImage>
        <img src={icons.book} />
      </IconImage>
    ),
    label: "SÁCH CÔNG NGHỆ",
    // khi khi nào muốn check role thì thêm cái này vào
    // còn không có thì tất cả để thấy được
    // allowed_roles: [ROLE_ACCOUNT.ADMIN, ROLE_ACCOUNT.MANAGER],
  },
  {
    key: "speak",
    to: PATHS.private.user.pronounce(),
    icon: (
      <IconImage>
        <img src={icons.mount} />
      </IconImage>
    ),
    label: "PHÁT ÂM",
  },
  {
    key: "courses",
    to: "/courses",
    icon: (
      <IconImage>
        <img src={icons.note} />
      </IconImage>
    ),
    label: "KHOÁ HỌC",
  },
  {
    key: "setting",
    to: PATHS.private.user.setting(),
    icon: (
      <IconImage>
        <img src={icons.setting} />
      </IconImage>
    ),
    label: "TIỆN ÍCH",
  },
  {
    key: "groupProfile",
    label: "CÁ NHÂN",

    icon: (
      <IconImage>
        <img src={icons.usernavbar} />
      </IconImage>
    ),
    children: [
      {
        key: "active",
        label: "Hoạt động",
        to: PATHS.private.user.active(),
        icon: (
          <IconImage>
            <img src={icons.userblue} alt="" />
          </IconImage>
        ),
      },
      {
        key: "goal-time",
        label: "Mục tiêu và thời gian học",
        to: PATHS.private.user.goalTime(),

        icon: (
          <IconImage>
            <img src={icons.goals} alt="" />
          </IconImage>
        ),
      },
      {
        key: "group",
        label: "Cộng đồng",
        to: PATHS.private.user.group(),
        icon: (
          <IconImage>
            <img src={icons.groupUser} alt="" />
          </IconImage>
        ),
      },
      {
        key: "academic-advisor",
        label: "Cố vấn học tập",
        to: PATHS.private.user.academicAdvisor(),

        icon: (
          <IconImage>
            <img src={icons.userPlus} alt="" />
          </IconImage>
        ),
      },
      {
        key: "profile-info",
        label: "Thông tin cá nhân",
        to: PATHS.private.user.profile(),
        icon: (
          <IconImage>
            <img src={icons.notePage} alt="" />
          </IconImage>
        ),
      },
      {
        key: "change-password",
        label: "Đổi mật khẩu",
        to: PATHS.private.user.changePassword(),
        icon: (
          <IconImage>
            <img src={icons.lock} alt="" />
          </IconImage>
        ),
      },
      {
        key: "privacy-policy",
        label: "Privacy Policy",
        to: PATHS.private.user.privacyPolicy(),
        icon: (
          <IconImage>
            <img src={icons.notePage} alt="" />
          </IconImage>
        ),
      },
    ],
  },
];

const adminMenuList: MenuItemType[] = [
  {
    key: "Dashboard",
    to: PATHS.private.admin.dashboard(),
    icon: (
      <IconImage>
        <img src={icons.book} />
      </IconImage>
    ),
    label: "Dashboard",
  },
  {
    key: "book",
    label: "Quản lý sách",
    icon: (
      <IconImage>
        <img src={icons.book} />
      </IconImage>
    ),
    to: PATHS.private.admin.book.bookList(),
    children: [
      {
        key: "listbook",
        label: "Danh sách sách",
        to: PATHS.private.admin.book.bookList(),
        icon: (
          <IconImage>
            <img src={icons.userblue} alt="" />
          </IconImage>
        ),
      },
    ],
  },
  {
    key: "topic",
    label: "Quản lý chủ đề",
    icon: (
      <IconImage>
        <img src={icons.book} />
      </IconImage>
    ),
    to: PATHS.private.admin.topic.list(),
    children: [
      {
        key: "active",
        label: "Danh sách chủ đề",
        to: PATHS.private.admin.topic.list(),
        icon: (
          <IconImage>
            <img src={icons.userblue} alt="" />
          </IconImage>
        ),
      },
    ],
  },
];

const courseDetailNavbar = [
  {
    label: "Chương trình",
    key: "programme",
    icon: <img src={icons.menuList} alt="" />,
  },
  {
    label: "Thống kê",
    key: "statistical",
    icon: <img src={icons.chart} alt="" />,
  },
  {
    label: "Thông tin khoá học",
    key: "courseInfo",
    icon: <img src={icons.notePage} alt="" />,
  },
];
export { userMenuList, adminMenuList, courseDetailNavbar };
