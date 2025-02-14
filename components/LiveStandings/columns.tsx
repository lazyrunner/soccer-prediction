"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Score = {
  userId: number;
  standing: number;
  name: string;
  exactScoreline: number;
  goalDifference: number;
  outcome: number;
  singleTeamScore: number;
  reverseGoalDiff: number;
  total: number;
};

const getSortingIcon = function (sortOrder: false | "asc" | "desc") {
  if (sortOrder === "asc") return <ArrowDown className="ml-2 h-4 w-4" />;
  if (sortOrder === "desc") return <ArrowUp className="ml-2 h-4 w-4" />;
  return <ArrowUpDown className="ml-2 h-4 w-4" />;
};

export const columns: ColumnDef<Score>[] = [
  {
    accessorKey: "standing",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Standings
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
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
  {
    accessorKey: "exactScoreline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Exact Scoreline
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    },
  },
  {
    accessorKey: "goalDifference",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Goal Difference
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    }
  },
  {
    accessorKey: "outcome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Outcome
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    }
  },
  {
    accessorKey: "singleTeamScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Single Team Score
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    }
  },
  {
    accessorKey: "reverseGoalDiff",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reverse Goal Difference
          {getSortingIcon(column.getIsSorted())}
        </Button>
      );
    }
  },
  {
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
    }
  },
];
