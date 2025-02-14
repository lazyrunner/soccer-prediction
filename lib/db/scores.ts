import sql  from './index'

interface Score {
  userId: number;
  standing: number;
  name: string;
  exactScoreline: number;
  goalDifference: number;
  outcome: number;
  singleTeamScore: number;
  reverseGoalDiff: number;
  total: number;
  }
  
  export class ScoreRepository {
    // Search users by name or email
    async search(query: string): Promise<[]> {
      return sql<[]>`
        SELECT user_id, email, name, created_at 
        FROM users
        WHERE 
          email ILIKE ${`%${query}%`} OR 
          name ILIKE ${`%${query}%`}
        ORDER BY created_at DESC
        LIMIT 10
      `
    }
  }