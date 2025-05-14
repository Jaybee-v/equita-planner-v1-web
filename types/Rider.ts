import { Gender } from "../enums/Gender";
import { RiderLevel } from "../enums/RiderLevel";
import ActivityParticipant from "./ActivityParticipant";
import AffiliationRequest from "./AffiliationRequest";
import SlotRequest from "./SlotRequest";

type Rider = {
  id: string;
  userId: string;
  name: string;
  familyName: string;
  level: RiderLevel;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  affiliationRequests: AffiliationRequest[];
  slotRequests: SlotRequest[];
  activityParticipants: ActivityParticipant[];
};

export default Rider;
