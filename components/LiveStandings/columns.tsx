"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { SCORING_METHODS } from "@/app/models/scoringMethods";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Score = {
  userId: number;
  name: string;
  total: number;
};

const getSortingIcon = function (sortOrder: false | "asc" | "desc") {
  if (sortOrder === "asc") return <ArrowDown className="ml-2 h-4 w-4" />;
  if (sortOrder === "desc") return <ArrowUp className="ml-2 h-4 w-4" />;
  return <ArrowUpDown className="ml-2 h-4 w-4" />;
};

const columns: ColumnDef<Score>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
];

Object.keys(SCORING_METHODS).forEach((element) => {
  columns.push({
    accessorKey: element,
    header: ({ column }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                {SCORING_METHODS[element].displayName}
                {getSortingIcon(column.getIsSorted())}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{SCORING_METHODS[element].description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  });
});
columns.push({
  accessorKey: "total",
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        {getSortingIcon(column.getIsSorted())}
      </Button>
    );
  },
});

export { columns };
