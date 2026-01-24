import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ScoreRepository } from '@/lib/db/scores'
import { UserScoreTracker } from '@/app/models/userScoreTracker'

const scoreRepo = new ScoreRepository()

export async function GET() {
  try {
    const cookieStore = cookies()
    const userIdCookie = cookieStore.get('user_id')
    const userId = userIdCookie ? parseInt(userIdCookie.value) : null

    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const games = await scoreRepo.getGamesWithLockedPredictions(userId)
    let response: any[] = []

    for (const game of games) {
      const allPredictions = await scoreRepo.getAllPredictionsForGame(game.game_id)
      
      const now = new Date()
      const startTime = new Date(game.starttime)
      const isOver = game.isover
      const isOngoing = !isOver && now > startTime
      const hasStarted = isOver || isOngoing

      let predictions: { name: string; hs: number; as: number; score: number }[] = []

      for (const userPrediction of allPredictions) {
        let score = 0
        if (hasStarted) {
          const points = UserScoreTracker.evaluateSingleGamePrediction(
            userPrediction.home_score,
            userPrediction.away_score,
            userPrediction.phs,
            userPrediction.pas
          )
          score = points.points
        }
        predictions.push({
          name: userPrediction.name,
          hs: userPrediction.phs,
          as: userPrediction.pas,
          score
        })
      }

      response.push({
        gameId: game.game_id,
        homeTeam: game.hometeam,
        awayTeam: game.awayteam,
        hs: game.home_score || 0,
        aw: game.away_score || 0,
        stage: game.stage,
        isOver,
        isOngoing,
        hasStarted,
        starttime: game.starttime,
        predictions,
      })
    }

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch locked predictions' },
      { status: 500 }
    )
  }
}