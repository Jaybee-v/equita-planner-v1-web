"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

type SidebarMenuLinkItemProps = {
  item: {
    title: string;
    url: string;
    icon: React.ReactNode;
  };
};

export const SidebarMenuLinkItem = ({ item }: SidebarMenuLinkItemProps) => {
  const pathname = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          pathname === item.url && "bg-primary text-white font-semibold"
        )}
      >
        <Link href={item.url}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
