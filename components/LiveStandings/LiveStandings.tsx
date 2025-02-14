"use client";

import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import {Score, columns} from "./columns";

export function LiveStandings() {
  async function getData(): Promise<Score[]> {
    return [
      {
        userId: 1,
        standing: 1,
        name: "Joshua",
        exactScoreline: 1,
        goalDifference: 0,
        outcome: 1,
        singleTeamScore: 3,
        reverseGoalDiff: 1,
        total: 30,
      },
      {
        userId: 2,
        standing: 2,
        name: "Joanne",
        exactScoreline: 0,
        goalDifference: 0,
        outcome: 1,
        singleTeamScore: 3,
        reverseGoalDiff: 1,
        total: 20,
      },
      {
        userId: 3,
        standing: 3,
        name: "Sam",
        exactScoreline: 0,
        goalDifference: 0,
        outcome: 0,
        singleTeamScore: 3,
        reverseGoalDiff: 1,
        total: 15,
      },
    ];
  }
  const [data, setData] = useState<Score[]|null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getData();
      setData(res);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="py-3 text-3xl font-bold tracking-tight text-gray-900">Live Standings</h1>
      <div className="py-7">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

