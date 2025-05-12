import { Instructor } from "@/types/Instructor";
import { User } from "lucide-react";
import Image from "next/image";

type InstructorCardProps = {
  instructor: Instructor;
};

export const InstructorCard = ({ instructor }: InstructorCardProps) => {
  return (
    <div
      className={`rounded-xl shadow-md shadow-gray-400 drop-shadow-xl p-2 h-fit space-y-2 md:space-y-4 w-full flex items-center gap-6`}
      style={{
        borderWidth: 6,
        borderBottomColor: instructor.color ?? "var(--border)",
        borderLeftColor: instructor.color ?? "var(--border)",
      }}
    >
      {instructor.picture ? (
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_URL + instructor.picture}
          alt={`${instructor.name} ${instructor.familyName}`}
          width={100}
          height={100}
        />
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
      )}
      <h2>
        {instructor.name} {instructor.familyName}
      </h2>
    </div>
  );
};
