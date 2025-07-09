require("dotenv").config();

module.exports = {
    app: {
        env: process.env.APP_ENV || 'development',
        name: process.env.APP_NAME || 'App name'
    },
    modules: typeof process.env.APP_MODULES !== 'undefined' ? process.env.APP_MODULES.split(',') : [],
    database: {
        use_env_variable: 'development',
        development: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log
        },
        staging: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log
        },
        test: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log
        },
        production: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00'
        }
    },
    redis: {
        cache: {
            host: process.env.REDIS_CACHE_HOST || 'xxx',
            port: process.env.REDIS_CACHE_PORT || 'xxx',
            auth: process.env.REDIS_CACHE_AUTH || 'xxx',
            db: process.env.REDIS_CACHE_DB || 'xxx'
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'xxx',
        algorithm: process.env.JWT_ALGORITHM || 'xxx',
        ttl: process.env.JWT_TTL || 30 * 24 * 60 * 60, // default: 30 days
        secret_refresh: process.env.JWT_SECRET_REFRESH || 'xxx',
        algorithm_refresh: process.env.JWT_ALGORITHM_REFRESH || 'xxx',
        ttl_refresh: 365, // days
        expiresIn: 365 // days
    }
}
