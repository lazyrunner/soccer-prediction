import { useState, useEffect } from "react";

// Sample data
const initialGames = [
  {
    gameId: 1,
    hs: 1,
    aw: 2,
    homeTeam: "Germany",
    awayTeam: "France",
    predictions: [
      { name: "Joshua", hs: 1, as: 1, score: 10 },
      { name: "Joanne", hs: 0, as: 1, score: 5 },
      { name: "Sam", hs: 0, as: 3, score: 0 },
    ],
  },
  {
    gameId: 2,
    hs: 0,
    aw: 0,
    homeTeam: "Spain",
    awayTeam: "Italy",
    predictions: [
      { name: "Joshua", hs: 2, as: 1, score: 0 },
      { name: "Joanne", hs: 0, as: 0, score: 10 },
      { name: "Sam", hs: 1, as: 0, score: 0 },
    ],
  },
  {
    gameId: 3,
    hs: 3,
    aw: 1,
    homeTeam: "England",
    awayTeam: "Netherlands",
    predictions: [
      { name: "Joshua", hs: 2, as: 0, score: 5 },
      { name: "Joanne", hs: 1, as: 1, score: 0 },
      { name: "Sam", hs: 3, as: 1, score: 10 },
    ],
  },
  {
    gameId: 4,
    hs: 3,
    aw: 1,
    homeTeam: "England",
    awayTeam: "Netherlands",
    predictions: [
      { name: "Joshua", hs: 2, as: 0, score: 5 },
      { name: "Joanne", hs: 1, as: 1, score: 0 },
      { name: "Sam", hs: 3, as: 1, score: 10 },
    ],
  },
];

// LiveIndicator component for the blinking effect
const LiveIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1">
      <div
        className={`h-2 w-2 rounded-full bg-red-500 ${
          isVisible ? "opacity-100" : "opacity-30"
        }`}
      />
      <span className="text-xs font-medium text-red-500">LIVE</span>
    </div>
  );
};

// Main component
export default function OngoingGames() {
  const [games, setGames] = useState(initialGames);

  return (
    <div className="mx-auto p-4 bg-slate-100 mt-4 rounded-md">
      <h1 className="text-2xl font-bold mb-6">Live Game Predictions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div
            key={game.gameId}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Game Header with Live Indicator */}
            <div className="bg-gray-100 p-3 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Game #{game.gameId}</h3>
              <LiveIndicator />
            </div>

            {/* Score Section */}
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1 text-center">
                  <p className="font-bold text-lg">{game.homeTeam}</p>
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mt-2">
                    <span className="text-2xl font-bold">{game.hs}</span>
                  </div>
                </div>

                <div className="px-4">
                  <span className="text-lg font-bold text-gray-500">vs</span>
                </div>

                <div className="flex-1 text-center">
                  <p className="font-bold text-lg">{game.awayTeam}</p>
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mt-2">
                    <span className="text-2xl font-bold">{game.aw}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictions Section */}
            <div className="border-t border-gray-200">
              <div className="bg-gray-50 px-4 py-2">
                <h4 className="text-sm font-semibold text-gray-600">
                  User Predictions
                </h4>
              </div>

              <div className="divide-y divide-gray-100">
                {game.predictions.map((prediction, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-blue-600">
                          {prediction.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium">{prediction.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="font-semibold">
                          {prediction.hs} - {prediction.as}
                        </span>
                      </div>

                      <div className="bg-green-100 rounded-full px-3 py-1 text-xs font-medium text-green-800">
                        {prediction.score} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
