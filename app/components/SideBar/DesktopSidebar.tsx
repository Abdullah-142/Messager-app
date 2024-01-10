"use client";
import useRoutes from "@/app/Hooks/useRoutes";
import { useState } from "react";
import DestopItem from "./DestopItems";
import { User } from "@prisma/client";
import Avatar from "./Avatar";
interface Props {
  currentuser: User;
}
export default function DesktopSidebar({ currentuser }: Props) {
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
              key={item.href}
              lable={item.lable}
              icon={item.icon}
              href={item.href}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav
        className="
      flex mt-4 flex-col justify-between items-center
      "
      >
        <div
          onClick={() => setisopen(true)}
          className="cursor-pointer hover:opacity-75 transition"
        >
          <Avatar user={currentuser} />
        </div>
      </nav>
    </div>
  );
}
