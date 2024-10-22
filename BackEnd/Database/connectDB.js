import mongoose from "mongoose";
 
export const connect = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Mongoose server   at " , conn.connection.host);
    } catch (error) {
        console.error("Error connecting to Mongoose server " , error.message);
        process.exit(1);
    }
};