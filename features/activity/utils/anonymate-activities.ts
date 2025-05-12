import { ActivityVisibility } from "@/enums/ActivityVisibility";
import Activity from "@/types/Activity";

const anonymatePrivateActivity = (activity: Activity) => {
  if (activity.visibility === ActivityVisibility.PRIVATE) {
    const anonymizedActivity: Activity = {
      ...activity,
      title: "Cours particulier",
      description: "Ce créneau est réservé à un cavalier",
    };
    return anonymizedActivity;
  }
  return activity;
};

const anonymateActivities = (activities: Activity[]) => {
  return activities.map(anonymatePrivateActivity);
};

export default anonymateActivities;
