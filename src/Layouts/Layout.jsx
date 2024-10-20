import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="pt-[100px]">
      <Outlet />
      </main>
    </div>
  );
}
