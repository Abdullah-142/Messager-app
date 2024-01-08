"use client";

import useRoutes from "@/app/Hooks/useRoutes";
import { useState } from "react";
import DestopItem from "./DestopItems";

export default function DesktopSidebar() {
  const route = useRoutes();
  const [isopen, setisopen] = useState(false);
  return (
    <div
      className="hidden lg:fixed lg:inset-y-0
    lg:left-0 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col lg:justify-between
    "
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul className="flex flex-col items-center space-y-1" role="list">
          {route.map((item) => (
            <DestopItem
              lable={item.lable}
              icon={item.icon}
              href={item.href}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
