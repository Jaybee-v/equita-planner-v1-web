import NotificationStatus from "@/enums/NotificationStatus";
import { NotificationType } from "@/enums/NotificationType";
import User from "./User";

type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  status: NotificationStatus;
  type: NotificationType;
  createdAt: Date;
  updatedAt: Date;
  watchedAt?: Date;

  user?: User;
};

export default Notification;
