import { Instructor } from "@/types/Instructor";

type InstructorDataCardProps = {
  instructor: Instructor;
};

export const InstructorDataCard = ({ instructor }: InstructorDataCardProps) => {
  return <div>{instructor.familyName}</div>;
};
