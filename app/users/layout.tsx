import SideBar from "../components/SideBar/SideBar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <SideBar>{children}</SideBar>
    </div>
  );
}
