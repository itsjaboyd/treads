module.exports = {
    HOST: "treads-database-dev",
    PORT: 5432,
    USER: "postgres",
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: "treadsdb",
    dialect: "postgres",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};