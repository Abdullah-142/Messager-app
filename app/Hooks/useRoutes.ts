import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

export default function useRoutes() {
  const { conversationId } = useConversation();
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        lable: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        lable: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        lable: "Logout",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
        href: "#",
      },
    ],
    [pathname, conversationId]
  );

  return routes;
}
