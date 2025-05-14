import Activity from "./Activity";
import AffiliationRequest from "./AffiliationRequest";
import { Instructor } from "./Instructor";
import Price from "./Price";
import SlotRequest from "./SlotRequest";

type Stable = {
  id: string;
  userId: string;
  logoUrl: string;
  name: string;
  picture1: string;
  picture2: string;
  picture3: string;
  slug: string;
  numStreet: number;
  street: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
  website: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;

  activities: Activity[];
  affiliationRequests: AffiliationRequest[];
  instructors: Instructor[];
  slotRequests: SlotRequest[];
  prices: Price[];
};

export default Stable;
