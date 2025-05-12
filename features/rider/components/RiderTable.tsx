import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Rider from "@/types/Rider";
import Link from "next/link";
import { IoEyeOutline, IoMedalOutline } from "react-icons/io5";
import { riderLevelTransformer } from "../utils/rider-level-transformer";

type RiderTableProps = {
  riders: Rider[];
};

export const RiderTable = ({ riders }: RiderTableProps) => {
  return (
    <Table className=" w-full">
      <TableHeader className=" w-full">
        <TableRow className="w-full">
          <TableHead className="">Nom prénom</TableHead>
          <TableHead>Niveau</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {riders.map((rider) => (
          <TableRow key={rider.id}>
            <TableCell className="font-medium">
              {rider.familyName} {rider.name}
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <IoMedalOutline size={20} />
              <span className="hidden md:block">
                {riderLevelTransformer(rider.level)}
              </span>
              <span className="block md:hidden">
                {rider.level.charAt(rider.level.length - 1).toUpperCase() ===
                "R"
                  ? "0"
                  : rider.level.charAt(rider.level.length - 1).toUpperCase()}
              </span>
            </TableCell>
            <TableCell className="">
              <Link
                href={`/app/riders/${rider.id}`}
                className="flex justify-end"
              >
                <Button variant="outline" size="icon">
                  <IoEyeOutline />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
