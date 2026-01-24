import { NextResponse } from 'next/server'
import { SCORING_METHODS } from '../../../models/scoringMethods'

export async function GET() {
    let columns = Object.keys(SCORING_METHODS)
    return NextResponse.json({columns})

}