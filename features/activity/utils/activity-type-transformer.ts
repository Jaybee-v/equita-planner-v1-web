import { ActivityType } from "../../../enums/ActivityType";

export const activityTypeTransformer = (type: ActivityType) => {
  switch (type) {
    case ActivityType.PRIVATE:
      return "Cours particulier";
    case ActivityType.PUBLIC:
      return "Cours collectif";
    case ActivityType.EVENT:
      return "Concours";
    case ActivityType.STABLE_EVENT:
      return "Activité aux écuries";
  }
};
