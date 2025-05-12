"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarMenuLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export const NavbarMenuLink = ({ href, icon, label }: NavbarMenuLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 text-xs",
        isActive && "text-white bg-primary/30 rounded-md p-2"
      )}
    >
      {icon}
      <span className="hidden md:block">{label}</span>
    </Link>
  );
};
