import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ScoreRepository } from '@/lib/db/scores'
import { GameRepository } from '@/lib/db/games'

const scoreRepo = new ScoreRepository()
const gameRepo = new GameRepository()

export async function POST(request: Request) {
  const { gameId, userId, homeScore, awayScore, groupId } = await request.json();
  try {
    // check if game is started or prediction is locked
    const game = await gameRepo.getGame(gameId);
    if (game.starttime < new Date() || game.isover) {
      return NextResponse.json({ error: 'Game has already started or is over' }, { status: 400 });
    }
    const prediction = await scoreRepo.getPrediction(gameId, userId, groupId || 1);
    if (prediction[0] && prediction[0].locked_in) {
      return NextResponse.json({ error: 'Prediction is locked' }, { status: 400 });
    }
    await scoreRepo.updatePrediction(gameId, userId, homeScore||0, awayScore||0, groupId || 1);
    return NextResponse.json({ message: 'Prediction updated' });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to update prediction' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const { gameId, userId, groupId } = await request.json();
  try {
    // check if game is started
    const game = await gameRepo.getGame(gameId);
    if (game.starttime < new Date() || game.isover) {
      return NextResponse.json({ error: 'Game has already started or is over' }, { status: 400 });
    }
    const prediction = await scoreRepo.getPrediction(gameId, userId, groupId || 1);
    if (!prediction[0]) {
      return NextResponse.json({ error: 'Prediction not found' }, { status: 404 });
    }
    if (prediction[0].locked_in) {
      return NextResponse.json({ error: 'Prediction is already locked' }, { status: 400 });
    }
    await scoreRepo.lockPrediction(gameId, userId, groupId || 1);
    return NextResponse.json({ message: 'Prediction locked' });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to lock prediction' },
      { status: 500 }
    )
  }
}