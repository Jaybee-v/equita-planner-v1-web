import Stable from "./Stable";

type Price = {
  id: string;
  stableId: string;
  label: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  stable?: Stable;
};

export default Price;
