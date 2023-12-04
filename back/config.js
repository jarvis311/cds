import dotenv from 'dotenv'
dotenv.config('.env')

export default {
    PORT: process.env.PORT,
    DB_CONECTION_URL: process.env.DB_CONECTION_URL,
    JWT_SECRET: process.env.JWT_SECRET

}