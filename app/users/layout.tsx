import { getUsers } from "../actions/getUser";
import SideBar from "../components/SideBar/SideBar";
import UserList from "./_components/UserList";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </SideBar>
  );
}
