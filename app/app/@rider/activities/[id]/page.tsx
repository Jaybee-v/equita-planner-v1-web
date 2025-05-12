import { ActivityType } from "@/enums/ActivityType";
import { Gender } from "@/enums/Gender";
import { RiderActivityMenu } from "@/features/activity/components/RiderActivityMenu";
import getActivityById from "@/features/activity/services/get-activity-by-id";
import { activityTypeTransformer } from "@/features/activity/utils/activity-type-transformer";
import { activityValidationOptionTransformer } from "@/features/activity/utils/activity-validation-option-transformer";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import { RiderTable } from "@/features/rider/components/RiderTable";
import { riderLevelTransformer } from "@/features/rider/utils/rider-level-transformer";
import Rider from "@/types/Rider";
import { redirect } from "next/navigation";
import { GiTrophyCup } from "react-icons/gi";
import { TiUser } from "react-icons/ti";

export default async function RiderActivityByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user, rider } = await isAuthenticated();
  if (!rider || !user) {
    redirect("/app");
  }

  const { id } = await params;

  const activity = await getActivityById(id);

  if ("error" in activity) {
    return <div>{activity.error}</div>;
  }

  const participants = activity.participants?.map((participant) => {
    return {
      id: participant.id,
      name: participant.rider?.name,
      familyName: participant.rider?.familyName,
      level: participant.rider?.level,
    };
  });

  const colorText =
    activity.type === ActivityType.PRIVATE
      ? "text-[#d97706]"
      : activity.type === ActivityType.PUBLIC
      ? "text-[#16a34a]"
      : activity.type === ActivityType.EVENT
      ? "text-[#075985]"
      : activity.type === ActivityType.STABLE_EVENT
      ? "text-[#8b5cf6]"
      : "text-[#636e72]";

  const colorBackground =
    activity.type === ActivityType.PRIVATE
      ? "bg-[#d97706]"
      : activity.type === ActivityType.PUBLIC
      ? "bg-[#16a34a]"
      : activity.type === ActivityType.EVENT
      ? "bg-[#075985]"
      : activity.type === ActivityType.STABLE_EVENT
      ? "bg-[#8b5cf6]"
      : "bg-[#636e72]";

  return (
    <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto">
      <aside className="col-span-2 space-y-4">
        <section className="bg-white p-6 rounded drop-shadow-2xl">
          <article>
            <h1 className={`text-2xl font-bold ${colorText}`}>
              {activity.title}
            </h1>
            <p className="text-sm text-gray-500">
              {activityTypeTransformer(activity.type)}
            </p>
          </article>
          <article className="flex flex-col justify-center items-center">
            <h2 className="capitalize text-lg font-semibold">
              {new Date(activity.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <p className="text-xl text-gray-500">
              {new Date(activity.startDate).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(activity.endDate).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </article>
          <p className="text-sm text-gray-500 text-end">
            {participants?.length} inscrit
            {participants && participants?.length > 1 ? "s" : ""} sur{" "}
            {activity.maxParticipants} maximum
          </p>
        </section>
        <section className="bg-white p-4 rounded relative">
          <p>{activity.description}</p>
          <p
            className={`${colorBackground} text-white w-fit px-2 py-1 rounded-md shadow-md absolute top-2 right-2 text-xs tracking-wide`}
          >
            {activityTypeTransformer(activity.type)}
          </p>
          <article className="flex items-center gap-2">
            <GiTrophyCup />
            <p> {riderLevelTransformer(activity.requiredLevel)}</p>
          </article>
          {activity.instructorId && activity.instructor && (
            <section className="flex items-center gap-1">
              <TiUser size={20} />
              <span className="text-sm">
                {activity.instructor.gender === Gender.M
                  ? "Moniteur :"
                  : activity.instructor.gender === Gender.F
                  ? "Monitrice :"
                  : ""}
              </span>
              <span className="text-lg text-muted-foreground">
                {activity.instructor.name}
              </span>
            </section>
          )}
          <p>
            Inscription / validation :{" "}
            {activityValidationOptionTransformer(
              activity.validationParticipantOption
            )}
          </p>
        </section>
        <section className="bg-white p-4 rounded-md">
          {participants && participants.length > 0 ? (
            <section>
              <h2>Participants</h2>
              <RiderTable riders={participants as Rider[]} />
            </section>
          ) : (
            <section className="bg-gray-200 p-4 rounded-md">
              <p className="text-center italic font-extralight">
                Aucun participant inscrit
              </p>
            </section>
          )}
        </section>
      </aside>
      <aside>
        <section className="bg-white p-4 rounded">
          <h2>Que faire ?</h2>
          <RiderActivityMenu a={activity} rider={rider} />
        </section>
      </aside>
    </div>
  );
}
