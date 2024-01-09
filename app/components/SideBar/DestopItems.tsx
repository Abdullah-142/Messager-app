"use client";
import clsx from "clsx";
import Link from "next/link";
interface Props {
  lable: string;
  icon: any;
  href: string;
  active?: boolean;
  onClick?: () => void;
}
export default function DestopItem({
  lable,
  icon: Icon,
  href,
  active = false,
  onClick,
}: Props) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} key={lable}>
      <Link
        href={href}
        className={clsx(
          `group 
        flex
        gap-x-3 
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-500
        hover:text-black
        hover:bg-gray-100
        `,
          active && "bg-gray-100 text-slate-950",
        )}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{lable}</span>
      </Link>
    </li>
  );
}
