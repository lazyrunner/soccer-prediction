import { NextResponse } from 'next/server'
import { ScoreRepository } from '@/lib/db/scores'
import { UserScoreTracker } from '@/app/models/userScoreTracker';

const scoreRepo = new ScoreRepository()

export async function GET() {
  try {
    const scores = await scoreRepo.getLivePredictionResults();
    let liveTable = getLiveTable(scores)
    let response = Array.from(liveTable.entries()).map(([userId,tracker])=> ({
      userId, 
      name: tracker.name,
      ...tracker.getMethodCounts(),
      total: tracker.getTotalScore()
    }))
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

function getLiveTable (scores: any){
  let liveScore: Map<number, UserScoreTracker> = new Map();
  for (const [key, score] of scores.entries()) {
    if(!liveScore.has(score.user_id)){
      liveScore.set(score.user_id, new UserScoreTracker(score.name))
    }
    let track = liveScore.get(score.user_id)
    track?.evaluatePrediction(score.home_score,score.away_score, score.phs, score.pas);
  }
  return liveScore;

}
