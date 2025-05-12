"use server";
import { fetcher } from "@/features/auth/utils/fetcher";
import { Instructor } from "@/types/Instructor";
import { z } from "zod";
import { instructorFormSchema } from "../schemas/instructorFormSchema";

const createInstructorForStable = async (
  createInstructorDto: z.infer<typeof instructorFormSchema>
) => {
  const validatedInstructor = instructorFormSchema.parse(createInstructorDto);

  const {
    stableId,
    name,
    familyName,
    gender,
    phone,
    email,
    isIndependent,
    color,
  } = validatedInstructor;
  console.log("STABLE ID AVNT LE POST ===", stableId);
  const request = await fetcher("/instructors/stable", {
    method: "POST",
    body: JSON.stringify({
      stableId,
      name,
      familyName,
      gender,
      phone,
      email,
      isIndependent,
      color,
    }),
  });

  const response:
    | {
        instructor: Instructor;
      }
    | { error: string } = request;

  return response;
};

export default createInstructorForStable;
