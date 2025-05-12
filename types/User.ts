import { UserRole } from "../enums/UserRole";
import Notification from "./Notification";
import Rider from "./Rider";
import { UserSetting } from "./UserSetting";

type User = {
  id: string;
  email: string;
  role: UserRole;
  lastSeen: Date;
  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
  mustChangePassword: boolean;
  notifications: Notification[];
  rider?: Rider;
  userSetting?: UserSetting;
};

export default User;
