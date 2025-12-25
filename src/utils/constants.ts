import { images } from "@/assets";
import { PATHS } from "@/routers/path";

export const LOCAL_STORAGE_DATA = {
  ACCESS_TOKEN: "access_token",
  EXPIRED_TOKEN: "expired_token",
  VERIFY_TOKEN: "verify_token",
  USERNAME: "name",
  PHONE: "phoneNumber",
  SYSTEM_ROLES: "systemRoles",
  VERIFY: "isVerified",
  USER_ID: "userId",
  OPEN_KEYS: "openKeys",
  COLLAPSE: "collapse",
  THEME_MODE: "theme-mode",
  IS_OPEN_POPUP_VERIFY: "isOpenPopUpVerify",
  MENU_CURRENT: "menuCurrent",
};
//fake
export const ROLE_ACCOUNT = {
  ADMIN: "admin",
  MANAGER: "manager",
  TEACHER: "teacher",
  GUEST: "guest",
};

export const ERROR_LOGIN = {};

export const FORMAT_DATE = {
  DATE: "DD/MM/YYYY",
  TIME: "HH:mm",
  DATE_TIME: "DD/MM/YYYY HH:mm",
  DATE_TIME_SECONDS: "DD/MM/YYYY HH:mm:ss",
  TIME_DATE: "HH:mm:ss DD/MM/YYYY",
};
export const STATUS_CODE_RESPONSE = {
  SUCCESS: 200,
  BAD_REQUEST: 500,
};

type FileExtensions = {
  IMAGE: string[];
  VIDEO: string[];
  AUDIO: string[];
  DOCUMENT: string[];
  CSV: string[];
  EXCEL: string[];
  TEXT: string[];
  ARCHIVE: string[];
  UNKNOWN: string[];
};

export const fileExtensions: FileExtensions = {
  IMAGE: [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".tiff",
    ".webp",
    ".svg",
    ".ico",
    ".heic",
    ".jp2",
    ".dds",
    ".raw",
  ],
  VIDEO: [
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".mkv",
    ".flv",
    ".webm",
    ".ogg",
    ".3gp",
    ".m4v",
    ".ts",
    ".mpeg",
    ".mpg",
    ".vob",
    ".rm",
    ".asf",
    ".f4v",
    ".mxf",
    ".divx",
    ".mts",
    ".m2ts",
    ".amv",
    ".rmvb",
    ".dv",
    ".ogv",
    ".svi",
  ],
  AUDIO: [
    ".mp3",
    ".wav",
    ".ogg",
    ".aac",
    ".flac",
    ".m4a",
    ".wma",
    ".mid",
    ".midi",
    ".amr",
    ".opus",
    ".ra",
    ".aiff",
    ".caf",
    ".oga",
  ],
  DOCUMENT: [
    ".docx",
    ".pdf",
    ".ppt",
    ".pptx",
    ".txt",
    ".json",
    ".rtf",
    ".doc",
    ".odt",
    ".xlsm",
    ".pages",
    ".epub",
    ".mobi",
    ".wps",
    ".csvx",
  ],
  CSV: [".csv"],
  EXCEL: [".xls", ".xlsx", ".ods", ".xlsb"],
  TEXT: [".txt", ".md", ".log", ".ini", ".yaml", ".toml"],
  ARCHIVE: [
    ".zip",
    ".tar",
    ".tar.gz",
    ".rar",
    ".7z",
    ".gz",
    ".bz2",
    ".xz",
    ".iso",
    ".dmg",
    ".apk",
    ".cab",
  ],
  UNKNOWN: [],
};

export const ZERO = 0;
export const ONE = 1;
export const SKIP = ONE;
export const LIMIT = 10;
export const MobileScreenWidth = 768;
export const TabletScreenWidth = 1025;
export const MIN_LENGTH_PASSWORD = 6;
export const SIDE_BAR_WIDTH = 300;
export const DEFAULT_HEIGHT_SCREEN = 1080;
export const HEIGHT_CONFIG_SUBTRACTION = 60;

export const TARGET_LIST = [
  {
    image: images.icMucTieu1,
    target: "Thành thạo Nghe-Nói-Đọc-Viết",
  },
  {
    image: images.icMucTieu2,
    target: "Đạt IELTS 5.5 - 8.0+",
  },
  {
    image: images.icMucTieu3,
    target: "Đạt TOEIC 600 - 900+",
  },
  {
    image: images.icMucTieu4,
    target: "Mục tiêu khác",
  },
];
export enum EmailErrorKeyType {
  NOT_FOUND = "BAD_REQUEST_NOT_FOUND_EMAIL",
  EMAIL_CONFLICT = "CONFLICT_EMAIL_USER",
  USERNAME_NOT_FOUND = "UNAUTHORIZED_USERNAME_NOT_FOUND",
}
export enum CaptchaErrorCode {
  WRONG_TOKEN = "WRONG_TOKEN",
  MAX_CAPTCHA_TIME = "MAX_CAPTCHA_TIME",
  WRONG_CAPTCHA = "WRONG_CAPTCHA",
}
export enum verifyEmailErrorKeyType {
  BAD_REQUEST_EMAIL_VERIFIED = "BAD_REQUEST_EMAIL_VERIFIED",
  BAD_REQUEST_CODE_EXPIRY = "BAD_REQUEST_CODE_EXPIRY",
  BAD_REQUEST_CODE_WRONG = "BAD_REQUEST_CODE_WRONG",
  BAD_REQUEST_CODE_EXISTS = "BAD_REQUEST_CODE_EXISTS",
}
export const progressItems = [
  {
    id: "progress-1",
    lessonName: "Quốc gia và quốc tịch",
    courseName: "Complete English",
    percentage: 46,
  },
  {
    id: "progress-2",
    lessonName: "SIMPLE SENTENCES",
    courseName: "Complete Grammar 1",
    percentage: 46,
  },
  {
    id: "progress-3",
    lessonName: "Quốc gia và quốc tịch",
    courseName: "Complete English",
    percentage: 46,
  },
];

export const featuredCourses = [
  {
    id: "et3",
    imageUrl: images.et3,
    code: "ENGAGE TALK 3 (ET3)",
    kind: "ENGAGE TALK",
    level: "ET3",
  },
  {
    id: "efb1",
    imageUrl: images.efb1,
    code: "ENGLISH FOR BANKING 1 (EFB1)",
    kind: "ENGLISH FOR BANKING 1 (EFB1)",
    level: "EFB1",
  },
];

export const breadcrumbMap = {
  [PATHS.public.home()]: "Trang chủ",
  [PATHS.private.user.book()]: "Sách công nghệ",
  [PATHS.private.user.pronounce()]: "Phát âm",
  [PATHS.private.user.setting()]: "Tiện ích",
  [PATHS.private.user.course()]: "Khóa học",
  [PATHS.private.user.active()]: "Hoạt động",
  [PATHS.private.user.goalTime()]: "Mục tiêu",
  [PATHS.private.user.group()]: "Cộng đồng",
  [PATHS.private.user.academicAdvisor()]: "Cố vấn học tập",
  [PATHS.private.user.profile()]: "Thông tin cá nhân",
  [PATHS.private.user.changePassword()]: "Đổi mật khẩu",
  [PATHS.private.user.privacyPolicy()]: "Chính sách bảo mật",
  "/complete-english": "Complete English", // hoặc “Tiếng Anh Hoàn Chỉnh”
};

export const completeLesson = [
  {
    id: "1",
    typeGame: 'connect-word',
    gameId: '1',
    title: "Sự khác biệt về đuôi -our vs. -or, -se vS. -ze/-ce",
    percentage: 100,
    correct: 13,
    incorrect: 0,
    requiresPayment: false,
  },
  {
    id: "2",
    typeGame: 'flip-card-word',
    gameId: '2',
    title: "Chào hỏi và giới thiệu bản thân",
    percentage: 100,
    correct: 13,
    incorrect: 0,
    requiresPayment: false,
  },
  {
    id: "3",
    typeGame: 'flip-card-word',
    gameId: '3',
    title: "Nguyên âm /I/",
    percentage: 100,
    correct: 8,
    incorrect: 0,
    requiresPayment: false,
  },
];

export const incompleteLesson = [
  {
    id: "4",
    typeGame: 'flip-card-word',
    gameId: '4',
    title: "Sự khác biệt về đuôi -our vs. -or, -se vS. -ze/-ce",
    percentage: 46,
    notAttempted: 13,
    correct: 6,
    incorrect: 7,
    requiresPayment: false,
  },
  {
    id: "5",
    typeGame: 'flip-card-word',
    gameId: '5',
    title: "Chào hỏi và giới thiệu bản thân",
    percentage: 46,
    notAttempted: 5,
    correct: 3,
    incorrect: 6,
    requiresPayment: false,
  },
  {
    id: "6",
    typeGame: 'flip-card-word',
    gameId: '5',
    title: "Nguyên âm /I/",
    percentage: 46,
    notAttempted: 2,
    correct: 4,
    incorrect: 8,
    requiresPayment: false,
  },
];

export const comTopicList = [...completeLesson, ...incompleteLesson];

export const stateBook = [
  {
    id: 1,
    title: "Đã hoàn thành",
  },
  {
    id: 2,
    title: "Chưa hoàn thành",
  },
];

export const totalTopics = comTopicList.length;
export const learnedTopics = comTopicList.filter(
  (topic) => topic.percentage === 100
).length;
export const progressPercentage =
  totalTopics > 0 ? (learnedTopics / totalTopics) * 100 : 0;

export const reportMessage = [
  {
    id: 1,
    message: "Không thể thu âm được",
  },
  {
    id: 2,
    message: "Không xem được video/ Không nghe được audio",
  },
  {
    id: 3,
    message: "Nội dung câu hỏi/câu trả lời bị sai",
  },
  {
    id: 4,
    message: "Không chuyển tiếp sang bài khác được",
  },
  {
    id: 5,
    message: "Thiếu phần giải thích đáp án",
  },
  {
    id: 6,
    message: "Xảy ra lỗi khác",
  },
];
