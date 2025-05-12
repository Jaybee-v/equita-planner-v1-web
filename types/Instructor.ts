import { Gender } from "@/enums/Gender";
import Stable from "./Stable";

export type Instructor = {
  id: string;
  userId: string;
  name: string;
  familyName: string;
  gender: Gender;
  phone: string;
  isIndependent: boolean;
  stableId: string | null;
  color: string | null;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;

  stable: Stable | null;
};
