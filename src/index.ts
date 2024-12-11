import express from 'express';
import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname+'/.env' });
import contentRouter from './routes/content';
import { userMiddleWare } from './middleware/userMiddleWare';
dotenv.config({path: '/Users/nandeeswarbadugu/Documents/web_dev/brainly/src/.env'});

const app = express();
import mongoose from 'mongoose';
import userRouter from './routes/user';

app.use('/api/v1/user',userRouter);
app.use('/api/v1/content',userMiddleWare,contentRouter);


console.log(process.env.MONGO_URL);
(async () => {
    // const mongo_uri = process.env.MONGO_URL;
    const mongo_uri = "mongodb+srv://nandeeswar7421:z2PImVuyH2iL51bZ@cluster0.odvpz.mongodb.net/brainly"
    if (!mongo_uri)
        throw new Error("MONGO URI is not defined");
    try {
        await mongoose.connect(mongo_uri);
        console.log("connected to mongodb");
    } catch(error) {
        console.error("Error connecting to MongoDB:", error);
    }
    app.listen(3000,() => console.log("listening"));
})();



