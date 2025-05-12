import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rider from "@/types/Rider";

type RiderAvatarProps = {
  rider: Rider;
};

export const RiderAvatar = ({ rider }: RiderAvatarProps) => {
  return (
    <div>
      <Avatar className="w-12 h-12">
        {rider.imageUrl && <AvatarImage src={rider.imageUrl} />}
        <AvatarFallback>{rider.name.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
};
