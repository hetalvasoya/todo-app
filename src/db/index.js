import mongoose from "mongoose";
import { DB_NAME } from "./../constants.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${conn.connection.host}`);        
    } catch(err) {
        console.log("MONGODB CONNECTION FAILED: ", err);
        process.exit(1);
    }
}

export default connectDB;

// app.on('error', (error) => {
//     console.log("ERROR: ", error);
//     throw error;
// })
