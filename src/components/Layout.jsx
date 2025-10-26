import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="museum-root">
      {/* Thêm các thành phần chung như Header, Footer ở đây nếu cần */}
      <Outlet />
    </div>
  );
}