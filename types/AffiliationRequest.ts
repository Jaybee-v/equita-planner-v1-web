import { AffiliationRequestStatus } from "../enums/AffiliationRequest";
import Rider from "./Rider";
import Stable from "./Stable";

type AffiliationRequest = {
  id: string;
  riderId: string;
  stableId: string;
  status: AffiliationRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  stable: Stable;
  rider: Rider;
};

export default AffiliationRequest;
