"use client";

import { FullMessageType } from "@/app/types";

interface BodyProps {
  initialmessage: FullMessageType[];
}
function Body({ initialmessage }: BodyProps) {
  return <div className="flex-1 overflow-y-auto"></div>;
}

export default Body;
