import { notification } from 'antd';
import type { ArgsProps, NotificationInstance } from 'antd/es/notification/interface';
import { ReactNode } from 'react';

type NotifyType = 'success' | 'info' | 'warning' | 'error';

type NotifyOptions = Omit<ArgsProps, 'message'> & {
  message: ReactNode;
};

type NotifyFn = (options: NotifyOptions) => void;

const createNotifyHandler = (api: NotificationInstance, type: NotifyType): NotifyFn => {
  return (options) => {
    api[type]({
      placement: 'topRight',
      duration: 3,
      ...options,
    });
  };
};

export const useNotify = () => {
  const [api, contextHolder] = notification.useNotification();

  return {
    notifySuccess: createNotifyHandler(api, 'success'),
    notifyInfo: createNotifyHandler(api, 'info'),
    notifyWarning: createNotifyHandler(api, 'warning'),
    notifyError: createNotifyHandler(api, 'error'),
    contextHolder,
  };
};

