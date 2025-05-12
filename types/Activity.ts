import { ActivityType } from "../enums/ActivityType";
import { ActivityVisibility } from "../enums/ActivityVisibility";
import { CreatedByOption } from "../enums/CreatedByOption";
import { RiderLevel } from "../enums/RiderLevel";
import { ValidationOption } from "../enums/ValidationOption";
import ActivityParticipant from "./ActivityParticipant";
import { Instructor } from "./Instructor";

type Activity = {
  id: string;
  stableId: string;
  title: string;
  description: string;
  date: Date;
  startDate: Date;
  endDate: Date;
  type: ActivityType;
  visibility: ActivityVisibility;
  requiredLevel: RiderLevel;
  maxParticipants: number;
  createdBy: CreatedByOption;
  createdFromRequestId: string;
  validationParticipantOption: ValidationOption;
  participants?: ActivityParticipant[];
  openToMoreLevel: boolean;
  openToPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  instructorId: string;
  instructor?: Instructor;
};

export default Activity;
