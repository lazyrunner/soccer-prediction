import { NextResponse } from 'next/server'
import { UserRepository } from '@/lib/db/users'

const userRepo = new UserRepository()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userRepo.findById(parseInt(params.id))
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}