"use client";

import { useState } from 'react';
import { useUser } from '@/app/(main)/context/UserContext';

interface ScoreBoxProps {
  gameId: number;
  homeTeam: string;
  homeScore?: number;
  awayTeam: string;
  awayScore?: number;
  startTime?: string;
  lockedIn?: boolean;
}

export default function ScoreBox({
  gameId,
  homeTeam,
  homeScore: initialHomeScore,
  awayTeam,
  awayScore: initialAwayScore,
  startTime,
  lockedIn: initialLockedIn,
}: ScoreBoxProps) {
  const { userId } = useUser();
  const [homeScore, setHomeScore] = useState<string>(initialHomeScore?.toString() || '');
  const [awayScore, setAwayScore] = useState<string>(initialAwayScore?.toString() || '');
  const [lockedIn, setLockedIn] = useState<boolean>(initialLockedIn || false);

  const formatDateTime = (timestamp?: string): string => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      return timestamp;
    }
  };

  const handleScoreChange = (homeScoreValue: string, awayScoreValue: string) => {
    if (lockedIn) return;
    console.log('Score changed:', { homeScore: homeScoreValue, awayScore: awayScoreValue });
    fetch('/api/scores/prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, userId, homeScore: homeScoreValue, awayScore: awayScoreValue }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error updating prediction:', error);
    });
  };

  const handleHomeScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (lockedIn) return;
    const value = e.target.value;
    setHomeScore(value);
    handleScoreChange(value, awayScore);
  };

  const handleAwayScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (lockedIn) return;
    const value = e.target.value;
    setAwayScore(value);
    handleScoreChange(homeScore, value);
  };

  const handleLockIn = () => {
    if (!homeScore || !awayScore) {
      alert('Please enter both scores before locking in');
      return;
    }
    fetch('/api/scores/prediction', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, userId }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        setLockedIn(true);
      }
    })
    .catch(error => {
      console.error('Error locking prediction:', error);
      alert('Failed to lock prediction');
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex-1 text-center">
          <p className="font-bold text-lg">{homeTeam}</p>
          <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mt-2">
            <input
              type="number"
              value={homeScore}
              onChange={handleHomeScoreChange}
              disabled={lockedIn}
              className={`text-3xl font-bold w-12 h-12 text-center bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 ${lockedIn ? 'cursor-not-allowed opacity-60' : ''}`}
              min="0"
            />
          </div>
        </div>

        <div className="px-4 text-center flex flex-col items-center gap-2">
          <span className="text-lg font-bold text-gray-500">vs</span>
          <div className="text-sm font-bold text-gray-500">{formatDateTime(startTime)}</div>
          {lockedIn ? (
            <div className="flex items-center gap-1 text-gray-600 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Locked</span>
            </div>
          ) : (
            <button
              onClick={handleLockIn}
              className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors"
            >
              Lock In
            </button>
          )}
        </div>

        <div className="flex-1 text-center">
          <p className="font-bold text-lg">{awayTeam}</p>
          <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mt-2">
            <input
              type="number"
              value={awayScore}
              onChange={handleAwayScoreChange}
              disabled={lockedIn}
              className={`text-3xl font-bold w-12 h-12 text-center bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 ${lockedIn ? 'cursor-not-allowed opacity-60' : ''}`}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
