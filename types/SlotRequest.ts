import { Status } from "@/enums/Status";
import Rider from "./Rider";
import Stable from "./Stable";

type SlotRequest = {
  id: string;
  stableId: string;
  riderId: string;
  message: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  preferredStartDate: Date;
  preferredEndDate: Date;
  rider: Rider;
  stable: Stable;
};

export default SlotRequest;
