import { Status } from "../enums/Status";
import Activity from "./Activity";
import Rider from "./Rider";

type ActivityParticipant = {
  id: string;
  activityId: string;
  riderId: string;
  status: Status;
  createdAt: Date;
  rider?: Rider;
  activity: Activity;
};

export default ActivityParticipant;
