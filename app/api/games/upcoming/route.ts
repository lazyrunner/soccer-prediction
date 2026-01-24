import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { GameRepository } from '@/lib/db/games'

const gameRepo = new GameRepository()

export async function GET() {
  try {
    const cookieStore = cookies()
    const userIdCookie = cookieStore.get('user_id')
    const userId = userIdCookie ? parseInt(userIdCookie.value) : null
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const games = await gameRepo.getUpcomingGamesWithPredictions(userId)

    return NextResponse.json(games)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch upcoming matches' },
      { status: 500 }
    )
  }
}
