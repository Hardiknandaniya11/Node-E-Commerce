import mongoose from "mongoose";
import logger from "../utils/Logger";
import {MONGO_URI} from "./Constant"


class MongoConnection {

    async connect(): Promise<void> {
        
        mongoose.connect(MONGO_URI).then((result: any) => {
            logger.info('MongoDB Connected Successfully')
        }).catch((error: any) => {
            logger.error(`*** MongoConnection connect *** ERROR => ${error}`)
        })
    }

}

export default MongoConnection;


