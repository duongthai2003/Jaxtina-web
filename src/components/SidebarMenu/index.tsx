import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import _, { get } from "lodash";
import { ListIndentDecrease, ListIndentIncrease, LogOut } from "lucide-react";
import { SB } from "./style";
import { useAuth } from "@/hooks/useAuth";
import {
  getCookieStorage,
  removeStorageJwtToken,
  setOneCookieStorage,
} from "@/helper/storage";
import { LOCAL_STORAGE_DATA, ROLE_ACCOUNT } from "@/utils/constants";
import { BaseTag } from "@/utils/baseTagHTML";
import { images } from "@/assets";
import { PATHS } from "@/routers/path";
import { MenuInfo } from "rc-menu/lib/interface";
import { MenuItemType } from "@/utils/menuList";
import { device } from "@/utils/deviceBreakpoint";
type RoleAccountType = (typeof ROLE_ACCOUNT)[keyof typeof ROLE_ACCOUNT];

const filterMenuByRole = (
  menuList: MenuItemType[],
  userRoles: RoleAccountType[]
): MenuItemType[] => {
  return menuList
    .filter((item) => {
      // Không có allowedRoles => hiển thị cho mọi role
      if (!item.allowed_roles) return true;

      // Kiểm tra nếu có ít nhất 1 role chung giữa item.allowed_roles và userRoles
      return item.allowed_roles.some((role) => userRoles.includes(role));
    })
    .map((item) => {
      // Nếu có children thì lọc tiếp
      if (item.children) {
        return {
          ...item,
          children: filterMenuByRole(item.children, userRoles),
        };
      }
      return item;
    });
};

const SidebarMenu = ({ menuList }: { menuList: MenuItemType[] }) => {
  const getMenuCurrent = getCookieStorage(
    LOCAL_STORAGE_DATA.MENU_CURRENT
  ) as string;
  const menuState = getMenuCurrent ? JSON.parse(getMenuCurrent) : [];
  const defaultSelectedKeys = get(menuState, "keyPath", ["1"]);
  const collapsedStatusInit = get(menuState, "collapsed", false);
  const navigate = useNavigate();
  const { roles, setAuth, isLoadingRole } = useAuth();
  const { width } = useWindowSize();
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);
  const [collapsed, setCollapsed] = useState(collapsedStatusInit);
  const isRolesLoaded = !isLoadingRole && Array.isArray(roles);

  const normalizedRoles = useMemo(
    () => (Array.isArray(roles) ? roles : []),
    [roles]
  );

  const toggleCollapsed = () => {
    setCollapsed((prev: boolean) => {
      const newValue = !prev;
      setOneCookieStorage(LOCAL_STORAGE_DATA.MENU_CURRENT, {
        ...menuState,
        collapsed: newValue,
      });

      return newValue;
    });
  };

  const getPathByKeyMenu = (
    menuItems: MenuItemType[],
    key: string
  ): string | undefined => {
    for (const item of menuItems) {
      if (item.key === key) {
        return item.to; // trả luôn khi tìm thấy
      }
      if (item.children) {
        const found = getPathByKeyMenu(item.children, key); // tìm trong children
        if (found) return found; // phải return từ đệ quy
      }
    }
    return undefined; // không tìm thấy
  };

  const filteredMenu = useMemo(() => {
    if (!isRolesLoaded) {
      return menuList;
    }
    return filterMenuByRole(menuList, normalizedRoles);
  }, [menuList, normalizedRoles, isRolesLoaded]);
  // console.log('filteredMenu', filteredMenu)

  const handleClickMenu = (e: MenuInfo) => {
    const keyPath = get(e, "keyPath", []);
    const menuCurrent = { collapsed, keyPath };
    const pathRoute = getPathByKeyMenu(filteredMenu, e.key) as string;
    setOneCookieStorage(LOCAL_STORAGE_DATA.MENU_CURRENT, menuCurrent);
    setSelectedKeys([e.key]);
    navigate(pathRoute);
  };
  const handleLogout = () => {
    removeStorageJwtToken();
    setAuth(false);
    navigate(PATHS.public.login());
  };
  return (
    <SB.Wrapper>
      <SB.layoutSider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        width={width < device.laptop ? 200 : 300}
      >
        <BaseTag.div>
          <SB.Category $collapsed={collapsed}>
            <SB.Logo
              onClick={() => {
                navigate(PATHS.public.home());
                const menuCurrent = {
                  collapsed,
                  keyPath: [PATHS.public.home()],
                };
                setOneCookieStorage(
                  LOCAL_STORAGE_DATA.MENU_CURRENT,
                  menuCurrent
                );
                setSelectedKeys([]);
              }}
            >
              <SB.LogoImg
                src={collapsed ? images.logoShort : images.logoColor}
                alt=""
              />
            </SB.Logo>
            <SB.ToggleButton onClick={toggleCollapsed}>
              {collapsed ? <ListIndentIncrease /> : <ListIndentDecrease />}
            </SB.ToggleButton>
          </SB.Category>

          {isRolesLoaded ? (
            <SB.MenuList
              defaultSelectedKeys={defaultSelectedKeys}
              defaultOpenKeys={
                defaultSelectedKeys[1]
                  ? [defaultSelectedKeys[1]]
                  : collapsed
                    ? [""]
                    : [""]
              }
              selectedKeys={selectedKeys}
              mode="inline"
              inlineCollapsed={collapsed}
              items={filteredMenu}
              onClick={(e) => {
                handleClickMenu(e);
              }}
            />
          ) : (
            <SB.CustomSkeleton
              active
              paragraph={{
                rows: 6,
                width: ["80%", "70%", "90%", "60%", "75%", "85%"],
              }}
              title={false}
            />
          )}
        </BaseTag.div>
        <SB.LogOutWrapper>
          <SB.LogOut $collapsed={collapsed} onClick={handleLogout}>
            <LogOut size={24} />
            {!collapsed && <BaseTag.p>Đăng xuất</BaseTag.p>}
          </SB.LogOut>
        </SB.LogOutWrapper>
      </SB.layoutSider>
    </SB.Wrapper>
  );
};
export default SidebarMenu;
