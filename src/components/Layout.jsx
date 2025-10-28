import React from 'react';
import { Outlet } from 'react-router-dom';
import Background3D from './Background3D';

export default function Layout() {
  return (
    <>
      <Background3D />
      <div className="museum-root">
        <Outlet />
      </div>
    </>
  );
}