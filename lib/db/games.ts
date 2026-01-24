import sql  from './index'

export class GameRepository {
  async getGame(gameId: number): Promise<any>{
    return sql<[]>`
      select * from game where game_id = ${gameId}
    ` 
  }
  async getUpcomingMatches(): Promise<[]>{
    return sql<[]>`
      select g.game_id,g.hometeam,g.awayteam,g.starttime, g.stage
      from game g 
      where NOW() < g.starttime
    ` 
  }

  async getUpcomingGamesWithPredictions(userId: number): Promise<[]>{
    return sql<[]>`
      select g.game_id,g.hometeam,g.awayteam,g.starttime, g.stage, p.home_score, p.away_score, p.locked_in
      from game g 
      left join predictions p on g.game_id = p.game_id and p.user_id = ${userId}
      where NOW() < g.starttime
    ` 
  }
  
}