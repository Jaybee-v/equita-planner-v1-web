import { Gender } from "@/enums/Gender";
import Image from "next/image";

type RiderAvatarProps = {
  gender?: Gender;
  size?: number;
};
export const RiderAvatar = ({ gender, size = 30 }: RiderAvatarProps) => {
  if (gender === Gender.F)
    return <Image src="/svg/girl.svg" alt="male" width={size} height={size} />;

  if (gender === Gender.M)
    return <Image src="/svg/boy.svg" alt="male" width={size} height={size} />;
  return <div className="rounded-full bg-gray-200 w-10 h-10"></div>;
};
