import { NavbarMenuLink } from "@/components/shared/NavbarMenuLink";
import { Calendar, Home, PlusCircle, Search, User } from "lucide-react";

export const NavbarMenu = () => {
  return (
    <nav className="md:hidden flex gap-4 justify-between items-center w-full md:w-1/2 px-2 md:px-6 py-2">
      <NavbarMenuLink href={"/app"} icon={<Home />} label="Accueil" />
      <NavbarMenuLink
        href={"/app/activities"}
        icon={<Calendar className="w-8 h-8" />}
        label="Mes Cours"
      />
      <NavbarMenuLink
        href={"/app/explore"}
        icon={<Search className="w-8 h-8" />}
        label="Explorer"
      />
      <NavbarMenuLink
        href={"/app/booking#reservation-card"}
        icon={<PlusCircle className="w-8 h-8" />}
        label="Réserver"
      />
      <NavbarMenuLink
        href={"/app/account"}
        icon={<User className="w-8 h-8" />}
        label="Mon compte"
      />
    </nav>
  );
};
