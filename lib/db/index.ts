import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, {
  // Number of connections
  max: 10,
  // Idle connection timeout in seconds
  idle_timeout: 20,
  // Connection attempt timeout in seconds
  connect_timeout: 10,
})

export default sql;