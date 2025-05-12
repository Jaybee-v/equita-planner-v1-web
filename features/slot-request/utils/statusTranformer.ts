import { Status } from "@/enums/Status";

const statusTranformer = (status: Status) => {
  switch (status) {
    case Status.APPROVED:
      return "Acceptée";
    case Status.REJECTED:
      return "Refusée";
    case Status.PENDING:
      return "En attente";
    default:
      return status;
  }
};

export default statusTranformer;
