import React from 'react';
import RouterApp from './RouterApp';
import AuthProvider from '@/context/authContext';


const AppRouters: React.FC = () => {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
};
export default AppRouters;
