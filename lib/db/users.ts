import sql  from './index'

interface User {
    user_id: number
    email: string
    name: string
  }
  
  interface CreateUserData {
    email: string
    name: string
    password: string
  }
  
  export class UserRepository {
    // Get a single user by ID
    async findById(user_id: number): Promise<User | null> {
      const [user] = await sql<User[]>`
        SELECT user_id, email, name 
        FROM users 
        WHERE user_id = ${user_id}
      `
      return user || null
    }
  
    // Get a user by email
    async findByEmail(email: string): Promise<User | null> {
      const [user] = await sql<User[]>`
        SELECT user_id, email, name 
        FROM users 
        WHERE email = ${email}
      `
      return user || null
    }
  
    // Create a new user
    async create(data: CreateUserData): Promise<User> {
      const [user] = await sql<User[]>`
        INSERT INTO users (email, name, password)
        VALUES (${data.email}, ${data.name}, ${data.password})
        RETURNING user_id, email, name, created_at
      `
      return user
    }
  
    // Update user details
    async update(user_id: number, data: Partial<CreateUserData>): Promise<User | null> {
      const setValues = []
      const values = []
  
      if (data.email) {
        setValues.push('email = ${data.email}')
        values.push(data.email)
      }
      if (data.name) {
        setValues.push('name = ${data.name}')
        values.push(data.name)
      }
  
      if (setValues.length === 0) return null
  
      const [user] = await sql<User[]>`
        UPDATE users 
        SET ${sql(setValues.join(', '))}
        WHERE user_id = ${user_id}
        RETURNING user_id, email, name
      `
      return user
    }
  
    // Delete a user
    async delete(user_id: number): Promise<boolean> {
      const result = await sql`
        DELETE FROM users 
        WHERE user_id = ${user_id}
      `
      return result.count > 0
    }
  

    // Search users by name or email
    async search(query: string): Promise<User[]> {
      return sql<User[]>`
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