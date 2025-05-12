import { Gender } from "../enums/Gender";
import { RiderLevel } from "../enums/RiderLevel";
import AffiliationRequest from "./AffiliationRequest";

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
};

export default Rider;
