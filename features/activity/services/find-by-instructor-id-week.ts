"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import Activity from "@/types/Activity";

const findActivitiesByInstructorIdAndWeek = async (data: {
  instructorId: string;
  date: Date;
}) => {
  const response = await fetcher(
    `/activities/instructor/${
      data.instructorId
    }?date=${data.date.toISOString()}`,
    {}
  );

  return response as Activity[] | { error: string };
};

export default findActivitiesByInstructorIdAndWeek;
