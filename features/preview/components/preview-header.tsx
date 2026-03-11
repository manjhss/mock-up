import Image from "next/image";
import { User } from "./user";
import { useTheme } from "next-themes";

export default function PreviewHeader() {
  const { theme } = useTheme()
  let imgUrl = theme === "dark" || theme === "system" ? "/light-logo.png" : "/dark-logo.png";
  
  return (
    <header className="sticky top-0 z-10 bg-sidebar p-2 flex gap-2 items-center justify-between border-b border-sidebar-border">
      <Image src={imgUrl} alt="Logo" width={32} height={32} />
      <User />
    </header>
  );
}
