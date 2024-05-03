import { ProjectScoutLogo } from "@/app/components/icons";
import Link from "next/link";

export default async function HeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="relative bg-cover bg-center h-[300px]"
        style={{ backgroundImage: "url(/images/hero-mask.jpg)" }}
      >
        <div className="absolute inset-0 bg-brand-950 bg-opacity-90 backdrop-blur-[1px] flex items-center justify-center">
          <Link href="/">
            <ProjectScoutLogo />
          </Link>
        </div>
      </div>

      <div className="p-4 grow relative">{children}</div>
    </>
  );
}
