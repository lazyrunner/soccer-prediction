"use client"; // Required for client-side components

import ScoreBox from "@/components/ScoreBox/ScoreBox";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

const initialGames:any[] = [];

export default function Predict() {


  const [games, setGames] = useState(initialGames);

  useEffect(() => {
    fetch('/api/games/upcoming')
      .then(response => response.json())
      .then(data => {setGames(data); console.log(data)})
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  const { userId, name } = useUser();
  return (
    <>
      <h1 className="py-3 text-3xl font-bold tracking-tight text-gray-900">
        Upcoming Games
      </h1>
      {games.map((game) => (
        <ScoreBox
          key={game.game_id}
          gameId={game.game_id}
          homeTeam={game.hometeam}
          awayTeam={game.awayteam}
          startTime={game.starttime}
          homeScore={game.home_score}
          awayScore={game.away_score}
          lockedIn={game.locked_in}
        />
      ))}
    </>
  );
}
