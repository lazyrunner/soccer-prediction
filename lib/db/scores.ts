import sql  from './index'

  export class ScoreRepository {
    async getLivePredictionResults(gameId?:number): Promise<[]> {
      if(gameId){
        return sql<[]>`
        select p.user_id, u."name",p.home_score as phs, p.away_score as pas, g.home_score , g.away_score
        from predictions p 
        join game g 
        on g.game_id = p.game_id
        join users u
        on u.user_id = p.user_id 
        where g.game_id = ${gameId}
      `  
      }
      return sql<[]>`
        select p.user_id, u."name",p.home_score as phs, p.away_score as pas, g.home_score , g.away_score
        from predictions p 
        join game g 
        on g.game_id = p.game_id
        join users u
        on u.user_id = p.user_id 
        where NOW() > g.starttime
      `
    }

    async getLiveMatches(): Promise<[]>{
      return sql<[]>`
        select g.game_id,g.hometeam,g.awayteam,g.home_score,g.away_score, g.stage
        from game g 
        where NOW() > g.starttime and g.isover = false
      ` 
    }

    async getPrediction(gameId: number, userId: number, groupId: number): Promise<any>{
      return sql<[]>`
        select * from predictions where game_id = ${gameId} and user_id = ${userId} and group_id = ${groupId}
      `
    }

    async updatePrediction(gameId: number, userId: number, homeScore: number, awayScore: number, groupId: number): Promise<any> {
      return sql<[]>`
        INSERT INTO predictions (game_id, user_id, home_score, away_score, group_id)
        VALUES (${gameId}, ${userId}, ${homeScore}, ${awayScore}, ${groupId})
        ON CONFLICT (game_id, user_id)
        DO UPDATE SET 
          home_score = ${homeScore}, 
          away_score = ${awayScore}
      `
    }

    async lockPrediction(gameId: number, userId: number, groupId: number): Promise<any> {
      return sql<[]>`
        UPDATE predictions 
        SET locked_in = true
        WHERE game_id = ${gameId} 
        AND user_id = ${userId} 
        AND group_id = ${groupId}
      `
    }

    async getGamesWithLockedPredictions(userId: number, groupId: number = 1): Promise<any> {
      return sql<[]>`
        (
          select distinct g.game_id, g.hometeam, g.awayteam, g.home_score, g.away_score, g.stage, g.isover, g.starttime
          from game g
          inner join predictions p on g.game_id = p.game_id
          where p.user_id = ${userId}
          and p.locked_in = true
          and p.group_id = ${groupId}
          and NOW() < g.starttime
        )
        UNION
        (
          select distinct g.game_id, g.hometeam, g.awayteam, g.home_score, g.away_score, g.stage, g.isover, g.starttime
          from game g
          where NOW() >= g.starttime
        )
        order by starttime
      `
    }

    async getAllPredictionsForGame(gameId: number): Promise<any> {
      return sql<[]>`
        select p.user_id, u."name", p.home_score as phs, p.away_score as pas, g.home_score, g.away_score
        from predictions p
        join game g on g.game_id = p.game_id
        join users u on u.user_id = p.user_id
        where g.game_id = ${gameId}
        and (g.isover = true or p.locked_in = true)
      `
    }
  }