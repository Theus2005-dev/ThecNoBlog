import mysql,{ Connection } from 'mysql2/promise'

export  async function connectDB(): Promise<Connection>{
    const connection = await mysql.createConnection({
        
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'technoblog',
        port: 3306

    })
    return connection;

}