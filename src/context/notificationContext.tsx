import { createContext, useMemo } from "react";

export const NotificationContext = createContext({ name: "Default" });
const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;
