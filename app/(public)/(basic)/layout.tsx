import { NavBar, NavBarLink } from "@/app/components/navbar";

export default async function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar>
        <NavBarLink href="/" exact>
          Home
        </NavBarLink>
        <NavBarLink href="/players/ibos">IBOs</NavBarLink>
        <NavBarLink href="/players" exact>
          Market
        </NavBarLink>
        <NavBarLink href="/players/starred">Starred</NavBarLink>
        <NavBarLink href="/players/my">My Ballers</NavBarLink>
      </NavBar>

      <div className="p-4 grow relative">{children}</div>
    </>
  );
}
