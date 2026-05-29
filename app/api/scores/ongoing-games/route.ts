import { NextResponse } from 'next/server'
import { ScoreRepository } from '@/lib/db/scores'
import { UserScoreTracker } from '@/app/models/userScoreTracker';

const scoreRepo = new ScoreRepository()

interface LiveGame {
  game_id: number;
  hometeam: string;
  awayteam: string;
  home_score: number | null;
  away_score: number | null;
  stage: string;
}

interface PredictionResult {
  user_id: number;
  name: string;
  phs: number;
  pas: number;
  home_score: number | null;
  away_score: number | null;
}

export async function GET() {
  try {
    const liveGames = await scoreRepo.getLiveMatches() as LiveGame[];
    let response: any[] = [];
    
    for (const game of liveGames) {
      const allPredictions = await scoreRepo.getLivePredictionResults(game.game_id) as PredictionResult[];
      let predictions: { name: string; hs: number; as: number; score: number }[] = []
      
      for (const userPrediction of allPredictions) {
        const points = UserScoreTracker.evaluateSingleGamePrediction(
          userPrediction.home_score || 0,
          userPrediction.away_score || 0,
          userPrediction.phs,
          userPrediction.pas
        )
        predictions.push({
          name: userPrediction.name,
          hs: userPrediction.phs,
          as: userPrediction.pas,
          score: points.points
        })
      }
      
      response.push({
        gameId: game.game_id,
        homeTeam: game.hometeam,
        awayTeam: game.awayteam,
        hs: game.home_score || 0,
        aw: game.away_score || 0,
        predictions,
      })
    }

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch ongoing games' },
      { status: 500 }
    )
  }
}
