import mongoose from "mongoose"
import path from "path"
import winston from "winston"

// Singleton design pattern
class ServerGlobal {
    private readonly _logger: winston.Logger

    private static _instance: ServerGlobal

    private constructor() {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: path.join(__dirname, '../logs.log'),
                    level: 'info',
                }),
            ]
        })
        mongoose.connect(`mongodb://localhost:27017/shopdb`)
            .then(() => this._logger.info(' MongoDb connection established succesfully'))
            .catch((e: mongoose.Error) => this._logger.error(`Mongo connection failed with error: ${e}`))
    }

    static getInstance() {
        if (this._instance) {
            console.log(this._instance,'instance')
            return this._instance
        }
        this._instance = new ServerGlobal()
        return this._instance
    }

    public get logger() {
        return this._logger
    }

}

export default ServerGlobal