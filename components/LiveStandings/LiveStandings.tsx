"use client";

import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { Score, columns } from "./columns";

export function LiveStandings() {
  async function getData() {
    try {
      const response = await fetch(`/api/scores/live-standings`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  const [data, setData] = useState<Score[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getData();
      setData(res);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-slate-100 rounded-md p-3 mt-3">
        <h1 className="py-3 text-3xl font-bold tracking-tight text-gray-900">
          Live Standings
        </h1>
        <div className="my-7 bg-white">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
