"use client";
import { UserRole } from "@/enums/UserRole";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import { logout } from "@/lib/cookies";
import { Instructor } from "@/types/Instructor";
import Rider from "@/types/Rider";
import Stable from "@/types/Stable";
import User from "@/types/User";
import {
  BarChart,
  Calendar,
  Home,
  LogOut,
  LucideLayoutDashboard,
  MessageSquare,
  PlusCircle,
  Search,
  Settings,
  Ticket,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { FaHelmetSafety } from "react-icons/fa6";
import { PiUserFocusDuotone } from "react-icons/pi";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Logo } from "./Logo";
import { RiderAvatar } from "./RiderAvatar";
import { SidebarMenuLinkItem } from "./SidebarMenuLinkItem";

type SidebarProps = {
  auth: {
    user: User | null;
    rider: Rider | null;
    stable: Stable | null;
    instructor: Instructor | null;
  };
};

const riderItems = [
  {
    title: "Accueil",
    url: "/app",
    icon: <Home />,
  },
  {
    title: "Mes Cours",
    url: "/app/activities",
    icon: <Calendar />,
  },
  {
    title: "Explorer",
    url: "/app/explore",
    icon: <Search />,
  },
  {
    title: "Réserver",
    url: "/app/booking#reservation-card",
    icon: <PlusCircle />,
  },
  {
    title: "Mes Réservations",
    url: "/app/booking",
    icon: <Ticket />,
  },
];

const stableItems = [
  {
    title: "Accueil",
    url: "/app",
    icon: <LucideLayoutDashboard />,
  },
  {
    title: "Mon Planning",
    url: "/app/activities",
    icon: <Calendar />,
  },
  {
    title: "Mes moniteurs",
    url: "/app/instructors",
    icon: <PiUserFocusDuotone />,
  },
  {
    title: "Réservations",
    url: "/app/booking",
    icon: <Ticket />,
  },
  {
    title: "Mes cavaliers",
    url: "/app/riders",
    icon: <FaHelmetSafety />,
  },
];

const instructorItems = [
  {
    title: "Accueil",
    url: "/app",
    icon: <LucideLayoutDashboard />,
  },
  {
    title: "Planning du club",
    url: "/app/activities",
    icon: <Calendar />,
  },
  {
    title: "Mon planning",
    url: "/app/my-calendar",
    icon: <Calendar />,
  },
];

export const AppSidebar = ({ auth }: SidebarProps) => {
  const { user, rider, stable, instructor } = auth;

  if (!user) return null;

  return (
    <Sidebar className="z-50">
      <SidebarHeader className="flex items-center gap-2">
        <Logo name size={50} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          {user.role === UserRole.RIDER && rider && (
            <SidebarGroupContent>
              <SidebarMenu>
                {riderItems.map((item) => (
                  <SidebarMenuLinkItem key={item.title} item={item} />
                ))}
              </SidebarMenu>
              <SidebarGroupLabel>Rider</SidebarGroupLabel>
            </SidebarGroupContent>
          )}
          {user.role === UserRole.STABLE && stable && (
            <SidebarGroupContent>
              <SidebarMenu>
                {stableItems
                  .filter((i) => i.url !== "/app/booking")
                  .map((item) => (
                    <SidebarMenuLinkItem key={item.title} item={item} />
                  ))}
                {stableItems
                  .filter((item) => item.url === "/app/booking")
                  .map((item) => (
                    <section
                      key={item.title}
                      className="relative flex items-center gap-2"
                    >
                      {stable.slotRequests.length > 0 && (
                        <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-1 animate-pulse">
                          {stable.slotRequests.length}
                        </span>
                      )}
                      <SidebarMenuLinkItem item={item} />
                    </section>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
          {user.role === UserRole.INSTRUCTOR && instructor && (
            <SidebarGroupContent>
              <SidebarMenu>
                {instructorItems.map((item) => (
                  <SidebarMenuLinkItem key={item.title} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
        {user.role === UserRole.STABLE && (
          <SidebarGroup>
            <SidebarGroupLabel>Statistiques</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuLinkItem
                  item={{
                    title: "Mes statistiques",
                    url: "/app/statistics",
                    icon: <BarChart />,
                  }}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Chat</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuLinkItem
                item={{
                  title:
                    rider && rider.affiliationRequests.length > 0
                      ? rider?.affiliationRequests[0].stable.name
                      : "",
                  url: "/app/chat",
                  icon: <MessageSquare />,
                }}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Paramètres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user.role === UserRole.RIDER && (
                <SidebarMenuLinkItem
                  item={{
                    title: "Mon profil cavalier",
                    url: "/app/account",
                    icon: <UserIcon />,
                  }}
                />
              )}
              {user.role === UserRole.STABLE && (
                <SidebarMenuLinkItem
                  item={{
                    title: "Mon écurie",
                    url: "/app/account",
                    icon: <UserIcon />,
                  }}
                />
              )}
              {user.role === UserRole.INSTRUCTOR && (
                <SidebarMenuLinkItem
                  item={{
                    title: "Mon profil",
                    url: "/app/account",
                    icon: <UserIcon />,
                  }}
                />
              )}
              <SidebarMenuLinkItem
                item={{
                  title: "Paramètres",
                  url: "/app/account/settings",
                  icon: <Settings />,
                }}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="text-sm font-semibold p-6 bg-white shadow-md">
            <div className="flex items-center gap-2">
              {stable && stable.logoUrl && (
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_URL + stable.logoUrl}
                  alt={stable.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              {rider && <RiderAvatar gender={rider.gender} size={32} />}
              {instructor && (
                <RiderAvatar gender={instructor.gender} size={32} />
              )}
              <section className="">
                <p className="text-sm font-semibold">
                  {stable
                    ? stable.name
                    : rider
                    ? rider.name
                    : instructor
                    ? instructor.name
                    : user.email}
                </p>
                {rider && (
                  <p className="text-xs text-muted-foreground">
                    {riderLevelTransformer(rider.level)}
                  </p>
                )}
              </section>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-full text-red-600"
              type="button"
              onClick={async () => await logout()}
            >
              <LogOut />
              <span className="text-sm font-semibold hidden md:block">
                Déconnexion
              </span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
