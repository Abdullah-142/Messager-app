import { getCurrentUser } from "@/app/actions/getCurrentuser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentuser={user!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
