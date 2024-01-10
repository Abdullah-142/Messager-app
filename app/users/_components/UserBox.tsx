"use client";
import Avatar from "@/app/components/SideBar/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoaded(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((res) => {
        router.push(`/conversation/${res.data.id}`);
      })
      .finally(() => setIsLoaded(false));
  }, [data, router]);
  return (
    <div
      onClick={handleClick}
      className="
      w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          gap-2
          transition
          cursor-pointer
  "
    >
      <Avatar user={data} />
      <div className="flex-1">
        <div className="flex  items-center  min-w-0 mb-1">
          <span className="text-sm font-medium text-gray-900">{data.name}</span>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
