import { NextResponse } from 'next/server'
import { ScoreRepository } from '@/lib/db/scores'
import { UserScoreTracker } from '@/app/models/userScoreTracker';

const scoreRepo = new ScoreRepository()

export async function GET() {
  try {
    const liveGames = await scoreRepo.getLiveMatches();
    let response: any[] = [];
    await liveGames.forEach(async game=>{
        console.log(game)
        const allPredictions = await scoreRepo.getLivePredictionResults(game["game_id"])
        console.log(allPredictions)
        let predictions: { name: never; hs: never; as: never; score: number; }[] = []
        await allPredictions.forEach(userPrediction=>{
            console.log(userPrediction)
            let points = UserScoreTracker.evaluateSingleGamePrediction(userPrediction["home_score"],userPrediction["away_score"],userPrediction["phs"],userPrediction["pas"])
            console.log(points)
            predictions.push({
                name:userPrediction["name"],
                hs: userPrediction["phs"],
                as: userPrediction["pas"],
                score: points.points
            })
        })
        response.push({
            gameId: game["game_id"],
            homeTeam: game["hometeam"],
            awayTeam: game["awayteam"],
            hs: game["home_score"],
            aw: game["away_score"],
            predictions,
        })
    })
    console.log(response)


    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch live standings' },
      { status: 500 }
    )
  }
}
